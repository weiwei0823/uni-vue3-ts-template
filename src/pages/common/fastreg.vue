<template>
  <view
    class="all-reg pc-max-width"
    :class="['theme-' + themeColor.name]"
    style="position: fixed; width: 100%"
  >
    <Header ref="header" title="快速注册" isFixed>
      <template #right>
        <view
          class="kefu"
          @click="toUrl('/pages/common/userCenter/service/index')"
        >
          {{ $t("pages.common.reg.text1") }}
        </view>
      </template>
    </Header>
    <scroll-view scroll-y style="height: calc(var(--vh) - 88rpx)">
      <view style="display: flex; flex-direction: column; height: 100%">
        <view class="top">
          <imageSvgUrl
            :width="530"
            :height="120"
            :url="logo"
            class="logo"
            replaceThemeTargetColor="#07C160"
          />
          <view class="title">
            {{ $t("pages.common.reg.text2") }}
          </view>
        </view>
        <view class="inputs" ref="inputs">
          <LHInput
            class="item"
            v-model="formData.phone"
            icon="user"
            isRule
            :rule="rules.phone"
            :placeholder="$t('pages.common.reg.text3')"
            close
          />
          <LHInput
            class="item"
            v-model="formData.pwd"
            icon="lock"
            isRule
            :rule="rules.pwd"
            type="password"
            :placeholder="$t('pages.common.reg.text4')"
            close
            showPasswordLevel
          />
          <LHInput
            class="item"
            v-model="formData.repwd"
            icon="lock"
            isRule
            :rule="rules.repwd"
            type="password"
            :placeholder="$t('pages.common.reg.text5')"
            close
          />
        </view>
        <view class="submit" @click="submit"> 快速注册并登录 </view>
        <view class="bottom">
          <view class="tips">
            {{ $t("pages.common.reg.text11") }}
          </view>
          <view class="pact" @click="toUrl('/pages/liuhe/pact')">
            {{ $t("pages.common.reg.text12") }}
          </view>
        </view>
      </view>
    </scroll-view>
    <AlertInjectLayer />
  </view>
</template>

<script>
import Header from "@/components/common/header/index.vue";
import imageSvgUrl from "@/components/common/imageSvgUrl";
import LHInput from "@/components/common/LHInput/index.vue";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";

import { fastRegister } from "@/utils/common/index";
import {mapGetters, mapState} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";
export default {
  components: {
    AlertInjectLayer,
    Header,
    LHInput,
    imageSvgUrl,
  },
  data() {
    return {
      winHeight: 0,
      codeText: "",
      formData: {
        phone: "",
        pwd: "",
        repwd: "",
        inviteCode: "",
      },
      rules: {
        phone: {
          required: true,
          rule: /^[0-9A-Za-z]{6,18}$/,
          ruleMessage: this.$t("pages.common.reg.text13"),
          message: this.$t("pages.common.reg.text14"),
          trigger: ["input", "blur"],
        },
        pwd: {
          required: true,
          rule: /^([-_!@#$%^.&*a-zA-Z0-9]){8,16}$/,
          ruleMessage: this.$t("pages.common.reg.text15"),
          trigger: ["input", "blur"],
        },
        repwd: {
          required: true,
          validator: (rule, value, type) => {
            if (!value) {
              return false;
            }
            if (value !== this.formData.pwd) {
              return this.$t("pages.common.reg.text17");
            }
            return true;
          },
          message: this.$t("pages.common.reg.text18"),
          trigger: ["input", "blur"],
        },
      },
    };
  },
  mounted() {
    uni.$emit("on_page_mounted", this);
    followKeybordSetInputStyle(this.$refs.header);
  },

  onShow() {
    this.winHeight = uni.getSystemInfoSync().windowHeight;
    uni.onWindowResize(() => {
      this.winHeight = uni.getSystemInfoSync().windowHeight;
    });
    let getInviteCode = uni.getStorageSync(
      this.$config.enumMgr.STATION_QUERY_STORAGE_KEY.INVITE_CODE
    );
    if (getInviteCode && getInviteCode != "") {
      this.formData.inviteCode = getInviteCode;
    }
  },

  computed: {
    ...mapState(useAppInfoStore, ['themeColor', 'webSiteConfig']),
    theme() {
      return getApp().globalData.themeMap[this.$config.station];
    },
    logo() {
      let contantLogoAndNameId =
        this.$config.enumMgr.CONTANTS_CONFIGS_ID.LOGO_HAD_NAME;
      let info = this.$store.state.appInfoStore.contantsConfigTypeMap
        ? this.$store.state.appInfoStore.contantsConfigTypeMap[
            contantLogoAndNameId
          ]
        : null;
      if (!info) return null;
      return info.url;
    },
  },
  methods: {
    toUrl(url) {
      uni.navigateTo({
        url: url,
      });
    },
    submit() {
      const inputsRef = this.$refs.inputs.$children;
      inputsRef.forEach((input) => {
        input.checkRule("blur");
      });
      this.$nextTick(() => {
        const pass_through_inputs = inputsRef.filter((input) => input.message);
        if (pass_through_inputs.length > 0) {
          return;
        }
        uni.getSystemInfo({
          success: (sys) => {
            let prams = {
              deviceId: sys.deviceId,
              phoneType: sys.deviceType,
              pwd: this.formData.pwd,
              username: this.formData.phone,
              inviteCode: this.formData.inviteCode,
            };
            uni.$emit("showPop", {
              refName: "Verify",
              data: {
                verifyType: "Slide",
              },
              success: async (response) => {
                if (response.close) response.close();
                if (response.ticket && response.randstr) {
                  prams.ticket = response.ticket;
                  prams.randStr = response.randstr;
                }
                prams.phoneType = browserPlatformRegionCode();
                const res = await fastRegister(prams);

                if (res.code == 200) {
                  this.$config.setStorageSync(
                    this.$config.enumMgr.APP_LOCALSTORE_KEYS
                      .LOCAL_STORE_USERINFO,
                    res.result.user
                  );
                  this.$config.setStorageSync(
                    this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN,
                    res.result.token
                  );
                  this.$store.dispatch("initUserInfo");
                  uni.redirectTo({
                    url: "/pages/luntan/toolBox/vector",
                  });
                  uni.removeStorageSync(
                    this.$config.enumMgr.STATION_QUERY_STORAGE_KEY.INVITE_CODE
                  );
                } else {
                  pop(res.message, 2000);
                }
              },
            });
          },
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .header-content-box {
  z-index: 9999 !important;
}
::v-deep .header-box {
  z-index: 99999 !important;
}
.all-reg {
  background: var(--theme-auxiliary-color-default);
  display: flex;
  flex-direction: column;

  .kefu {
    color: #404040;
    font-size: 30rpx;
    text-align: right;
  }

  .top {
    padding-bottom: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 530rpx;
      height: 120rpx;
      margin: 60rpx auto;
    }

    .title {
      color: #404040;
      font-size: 48rpx;
    }
  }

  .inputs {
    padding: 0 32rpx;

    .item {
      ::v-deep .lh-input {
        height: 88rpx;
      }

      margin-bottom: 32rpx;
    }
  }

  .submit {
    height: 88rpx;
    display: grid;
    place-content: center;
    color: #fff;
    font-size: 34rpx;
    border-radius: 10px;
    background: var(--theme-color);
    margin: 0 32rpx;
    flex-shrink: 0;
  }

  .bottom {
    flex: 1;
    padding: 40rpx 0;
    text-align: center;
    font-size: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .tips {
      color: #a1a1a1;
    }

    .pact {
      color: var(--theme-color);
      margin-top: 20rpx;
    }
  }
}
</style>
