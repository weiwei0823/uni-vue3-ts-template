<template>
  <view
    class="all-reg pc-max-width"
    :class="['theme-' + themeColor.name]"
    style="position: fixed; width: 100%"
  >
    <Header ref="header" title="补充账号信息" isFixed>
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
            v-model="formData.truename"
            icon="edit"
            isRule
            :rule="rules.truename"
            required
            :placeholder="$t('pages.common.reg.text6')"
            close
          />
          <template v-if="showReg">
            <LHInput
              class="item"
              v-model="formData.mobile"
              icon="cellphone"
              isRule
              :rule="rules.mobile"
              required
              :placeholder="$t('pages.common.reg.text7')"
              close
            />
            <LHInput
              class="item"
              v-model="formData.code"
              icon="security"
              isRule
              :rule="rules.code"
              :placeholder="$t('pages.common.reg.text8')"
              close
            >
              <template #right>
                <view class="code" @tap="getCode">{{ codeText }}</view>
                <u-verification-code
                  ref="uCode"
                  @change="codeChange"
                ></u-verification-code>
              </template>
            </LHInput>
          </template>
        </view>
        <view class="submit" @click="submit"> 提交 </view>
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

import { signUserAppendInfo, getVCode, checkCode } from "@/utils/common/index";
import {mapGetters, mapState} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
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
        truename: "",
        mobile: "",
        code: "",
      },
      rules: {
        phone: {
          required: true,
          rule: /^[0-9A-Za-z]{6,18}$/,
          ruleMessage: this.$t("pages.common.reg.text13"),
          message: this.$t("pages.common.reg.text14"),
          trigger: ["input", "blur"],
        },
        truename: {
          validator: (rule, value, type) => {
            if (type === "blur" && value) {
              return true;
            }
            return this.$t("pages.common.reg.text19");
          },
          trigger: ["focus", "blur"],
        },
        mobile: {
          required: true,
          rule: /^1[3456789]\d{9}$/,
          ruleMessage: this.$t("pages.common.reg.text20"),
          validator: (rule, value, callback) => {
            return true;
          },
          message: this.$t("pages.common.reg.text21"),
          trigger: ["input", "blur"],
        },
        code: {
          required: true,
          message: this.$t("pages.common.reg.text22"),
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
  },

  computed: {
    ...mapState(useAppInfoStore, ["themeColor", "webSiteConfig"]),
    showReg() {
      return this.webSiteConfig.website_register_phone_check === 1;
    },
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
    codeChange(text) {
      this.codeText = text;
    },
    async getCode() {
      if (!this.$refs.uCode.canGetCode) {
        return;
      }
      uni.$emit("showPop", {
        refName: "Verify",
        data: {
          verifyType: "Slide",
          check_website: false
        },
        success: async (response) => {
          if (response.close) response.close();
          uni.showLoading({
            title: this.$t("pages.common.reg.text23"),
          });
          const { code, message } = await getVCode({
            phone: this.formData.mobile,
            type: "register",
            ticket: response.ticket,
            randStr: response.randstr,
          });
          pop(message, 2000);
          uni.hideLoading();
          if (code === 200) {
            this.$refs.uCode.start();
          }
        },
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
          success: async (sys) => {
            if (this.showReg) {
              const { code, message } = await checkCode({
                code: this.formData.code,
                phone: this.formData.mobile,
                type: "register",
              });
              if (code !== 200) {
                pop(message, 2000);
                return;
              }
            }
            let prams = {
              phone: this.formData.mobile,
              realName: this.formData.truename,
              verifyCode: this.formData.code,
            };
            const res = await signUserAppendInfo(prams);

            if (res.code == 200) {
              const user = this.$config.getStorageSync(
                this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
              );
              user.userType = "reality";
              this.$config.setStorageSync(
                this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
                user
              );
              this.$store.dispatch("initUserInfo");
              backPage();
            } else {
              pop(res.message, 2000);
            }
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

      .code {
        color: var(--theme-color);
        font-size: 30rpx;
      }
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
