<template>
  <view class="bank-div">
    <view
      class="bank-box"
      :style="{ marginTop: safeHeight }"
      :class="['theme-' + themeColor.name]"
    >
      <Header :title="title" :isBack="false" :showBack="showBack" @back="back">
        <block slot="right">
          <view
            style="text-align: right"
            @click="$router.push('/pages/common/userCenter/bank/index')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5 0C11.6716 0 11 0.671573 11 1.5V11H1.5C0.671573 11 0 11.6716 0 12.5C0 13.3284 0.671573 14 1.5 14H11V22.5C11 23.3284 11.6716 24 12.5 24C13.3284 24 14 23.3284 14 22.5V14H22.5C23.3284 14 24 13.3284 24 12.5C24 11.6716 23.3284 11 22.5 11H14V1.5C14 0.671573 13.3284 0 12.5 0Z"
                :fill="themeColor.themeColor"
              ></path>
            </svg>
          </view>
        </block>
      </Header>
      <scroll-view class="scroll-view-box"scroll-y="true">
        <view class="bank-list">
          <view
            class="list-item"
            v-for="(item, index) in bankList"
            @click="setBank(item)"
          >
            <view class="left">
              <view class="top" :class="{ 'is-qrcode': item.type == 3 }">
                <view class="img">
                  <image
                    :src="item.logoMobile || '@/static/img/user/bank/usdt.png'"
                  ></image>
                </view>
                <view class="title">
                  <view class="name">
                    {{ item.type == 4 ? "USDT地址" : item.bankName }}
                  </view>
                  <view class="desc" v-if="item.type == 1">
                    {{ $t("pages.common.userCenter.withdraw.common.list.SavingsCard") }}
                  </view>
                  <view class="desc" v-if="item.type == 4">
                  {{ item.bankBranchName  }}
                  </view>
                </view>
                <view class="qrcode" v-if="item.type == 3">
                  <image :src="item.bankNumber"></image>
                </view>
              </view>
              <view class="card-1" v-if="item.type == 1">
                <text style="margin-top: 20rpx; margin-right: 10rpx"
                  >**** **** ****</text
                >
                {{ " " + item.bankNumber.substr(-4) }}
              </view>
              <view class="card-bt" v-if="item.type == 2 || item.type == 4">
                {{ item.bankNumber }}
              </view>
            </view>
            <view class="right">
              <view class="untie-btn" @click.stop="untie(item)">
                {{ $t("pages.common.userCenter.withdraw.common.list.Unbind") }}
              </view>
            </view>
          </view>
        </view>

        <view class="card">
          <view class="item1" v-if="!izBindMk">
            <view class="left">
              <view class="title">M钱包账户</view>
              <view class="tip">请先绑定一个M钱包账户，用于收款</view>
            </view>
            <view class="right" @click="addBank">+添加</view>
          </view>
          <view class="item2">
            <view class="item">
              <SvgIcon icon="icon5" class="icon" />
              <view class="title">无汇率差</view>
              <view class="tip">随时足额取款</view>
            </view>
            <view class="item">
              <SvgIcon icon="icon6" class="icon" />
              <view class="title">快速存取</view>
              <view class="tip">取款款无延迟</view>
            </view>
            <view class="item">
              <SvgIcon icon="icon4" class="icon" />
              <view class="title">便捷游戏</view>
              <view class="tip">自由畅享存取</view>
            </view>
          </view>
          <view class="item3">
            <SvgIcon icon="icon7" class="icon" />
            <view class="title">M钱包 0手续费 秒到账</view>
            <view class="btn" @click="openMPayUrl">下载Mpay</view>
          </view>
        </view>

        <view class="hint" v-if="MPayData.url && MPayData.status === 1">
          <view class="hint-box">
            <view class="hint-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="7"
                  transform="matrix(1 0 0 -1 0 14)"
                  :fill="themeColor.themeAuxiliaryColorRemind"
                />
                <path
                  d="M6.80208 8.27669C6.32083 8.27669 6 7.95587 6 7.55482V4.10587C6 3.70482 6.32082 3.38398 6.80208 3.38398C7.28332 3.38398 7.60415 3.7048 7.60415 4.10586V7.55481C7.60415 7.95586 7.28333 8.27669 6.80208 8.27669ZM6.80208 9.47982C7.28332 9.47982 7.60415 9.80064 7.60415 10.2819C7.60415 10.7632 7.28333 11.084 6.80208 11.084C6.32083 11.084 6 10.7632 6 10.2819C6 9.80065 6.32082 9.47982 6.80208 9.47982Z"
                  fill="white"
                />
              </svg>
              <view class="text">
                {{ $t("pages.common.userCenter.withdraw.common.list.Tip") }}
              </view>
            </view>
            <view class="hint-text">
              M钱包永久网站：{{ MPayData.url.replace(/^https?:\/\//i, "") }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <uni-popup ref="popup" type="center" :mask-click="false">
      <view class="pwd-box">
        <view class="top-box">
          <view class="title"
            >{{
              $t(
                "pages.common.userCenter.withdraw.common.list.EnterPaymentPassword"
              )
            }}
          </view>
          <svg
            class="close"
            @click="closed"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.0649 13.9916C0.674377 14.3821 0.674376 15.0153 1.0649 15.4058C1.45543 15.7963 2.08859 15.7963 2.47911 15.4058L7.85795 10.027L13.3788 15.5479C13.7694 15.9384 14.4025 15.9384 14.793 15.5479C15.1836 15.1573 15.1836 14.5242 14.793 14.1337L9.27216 8.61276L15.207 2.67789C15.5976 2.28736 15.5976 1.6542 15.207 1.26368C14.8165 0.873151 14.1833 0.873151 13.7928 1.26368L7.85795 7.19855L2.06513 1.40573C1.6746 1.0152 1.04144 1.0152 0.650912 1.40573C0.260388 1.79625 0.260388 2.42942 0.650912 2.81994L6.44373 8.61276L1.0649 13.9916Z"
              fill="#A1A1A1"
            />
          </svg>
        </view>
        <one-input
          v-model="pwd"
          :maxlength="6"
          :isPwd="true"
          @finish="finishedOne"
          ref="hi"
          type="xin"
        >
        </one-input>
        <view
          class="forget"
          @click="toUrl('/pages/common/userCenter/service/index')"
        >
          {{
            $t("pages.common.userCenter.withdraw.common.list.ForgotPassword")
          }}
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="err" type="center" :mask-click="false">
      <PopItem @close="close" :msg="msg"></PopItem>
    </uni-popup>
  </view>
</template>

<script>
import Header from "@/components/common/header/index.vue";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import oneInput from "@/components/myp-one/myp-one";
import { bankCardList, unbindBank } from "@/utils/lottery/mine";
import PopItem from "@/components/common/PopItem/PopItem";
import { mapGetters } from 'pinia';
import SvgIcon from "@/components/svg-icon/index.vue";
import AppInfoStore from "@/store/modules/appInfoStore";
import SystemInfoStore from "@/store/modules/systemInfoStore";
export default {
  name: "list",
  components: {
    SvgIcon,
    oneInput,
    UniCol,
    UniRow,
    Header,
    PopItem,
  },
  props: {
    bankList: {
      type: Array,
      default: [],
    },
    showBack: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    izBindMk: Boolean,
  },
  computed: {
    ...mapState(AppInfoStore, ["themeColor"]),
    ...mapState(SystemInfoStore, ["uWindowHeight"]),
    MPayData() {
      let configData = this.$config.getStorageSync(
        this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG
      );
      const data = configData?.find((item) => item.type === "mcoin");
      console.log("data", data);
      return data;
    },
  },
  data() {
    return {
      safeHeight:
        this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO
        ).safeArea.top + "px",
      title: this.$t(
        "pages.common.userCenter.withdraw.common.list.SelectWithdrawalAccount"
      ),
      headerStyle: {
        backgroundColor: "#fff",
        "border-radius": "0 0 20rpx 20rpx",
        height: "88rpx",
      },
      fontColor: "#FFFFFF",
      titleStyle: {
        color: "#404040",
        "font-weight": 600,
      },
      pwd: "",
      msg: "请联系客服处理",
    };
  },
  onLoad() {},
  mounted() {
    uni.$emit("on_page_mounted", this);
  },
  methods: {
    addBank() {
      uni.navigateTo({
        url: "/pages/common/userCenter/bank/wallet",
      });
    },
    openMPayUrl() {
      if (browserPlatform() == browserPlatform.IOS) {
        window.open(this.MPayData.url);
      } else {
        this.$nativeBridge.openUrl(this.MPayData.url);
      }
    },
    toUrl(url) {
      uni.navigateTo({
        url: url,
      });
    },
    back() {
      this.$emit("closePay");
    },
    //解绑
    untie(item) {
      this.$refs.err.open();
    },
    closed() {
      this.pwd = "";
      this.$refs.popup.close();
    },
    setBank(item) {
      this.$emit("setBank", item);
      this.back();
    },
    errPwd() {
      this.$refs.err.open();
    },
    close() {
      this.$refs.err.close();
    },
    finishedOne(val) {
      let prams = {
        id: this.unId,
        pinCode: val,
      };
      this.$refs.popup.close();
      this.pwd = "";
      unbindBank(prams)
        .then((res) => {
          if (res.code == 200) {
            pop(res.message, 2000);
            this.$emit("refresh");
          } else {
            this.errPwd();
            this.msg = res.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bank-div {
  width: 100vw;
}

.bank-box {
  width: 100vw;
  max-width: 480px;
  background: var(--theme-auxiliary-color-default);
  display: flex;
  flex-direction: column;
  height: var(--vh);
  .kefu {
    font-weight: 500;
    font-size: 28rpx;
    line-height: 39rpx;
    color: #ffffff;
  }

  .filter-box {
    width: 100%;
    max-width: 480px;

    .filter-row {
      width: 100%;
      max-width: 480px;
      position: fixed;
      z-index: 20;
      height: var(--vh);
      background: rgba(0, 0, 0, 0.5);

      .filter-list {
        height: 158rpx;
        background: #f6f6f6;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 28rpx;
        gap: 20rpx;

        .filter-item {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 83rpx;
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 10rpx;
          padding: 10rpx;
          gap: 10rpx;
          font-weight: 400;
          font-size: 16rpx;
          line-height: 22rpx;
          text-align: center;
          color: #000000;
        }

        .act {
          background: #8bb1c9;
          color: #ffffff;
        }
      }

      .filter-btn {
        margin-top: -1px;
        display: flex;
        background: #ffffff;
        border-radius: 0px 0px 30rpx 30rpx;
        font-weight: 400;
        font-size: 24rpx;
        text-align: center;

        .cancel-btn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10rpx;
          width: 50%;
          height: 80rpx;
          color: #949494;
        }

        .confirm-btn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10rpx;
          width: 50%;
          height: 80rpx;
          color: #a6c4d6;
        }
      }
    }
  }

  .scroll-view-box {
    flex: 1;
    height: 0;
  }

  .bank-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 28rpx 0;

    .list-item {
      width: 100%;
      border-radius: 24rpx;
      overflow: hidden;
      display: flex;
      margin-bottom: 20rpx;
      height: 178rpx;

      .left {
        flex: 1;
        padding: 0 28rpx;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .top {
          display: flex;
          align-items: center;

          .img {
            margin-right: 20rpx;

            image {
              height: 68rpx;
              width: 68rpx;
            }
          }

          .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .name {
              font-weight: 400;
              font-size: 28rpx;
              color: #404040;
              margin-bottom: 10rpx;
            }

            .desc {
              font-weight: 600;
              font-size: 24rpx;
              line-height: 24rpx;
              color: #404040;
            }
          }

          .qrcode {
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row-reverse;

            image {
              height: 60rpx;
              width: 60rpx;
            }
          }
        }

        .is-qrcode {
          height: 100%;
          align-items: center;
        }

        .card-1 {
          font-weight: 600;
          margin-top: 20rpx;
          font-size: 40rpx;
          color: #3e4347;
        }

        .card-bt {
          font-weight: 500;
          line-height: 48rpx;
          margin-top: 20rpx;
          width: 90%;
          overflow: hidden;
          font-size: 28rpx;
          color: #404040;
        }
      }

      .right {
        width: 74rpx;
        border-top-right-radius: 10rpx;
        border-bottom-right-radius: 10rpx;

        .untie-btn {
          height: 100%;
          background: #a1a1a1;
          font-size: 28rpx;
          color: #ffffff;
          display: grid;
          place-content: center;
          writing-mode: tb-rl;
          width: 100%;
        }

        .disabled {
          background: #d7d7d7;
        }
      }
    }
  }

  .btn-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 76rpx;

    .btn {
      width: 674rpx;
      height: 90rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10rpx;
      background: #ffffff;
      border: 1px solid #3881a8;
      border-radius: 10rpx;
      font-weight: 400;
      font-size: 30rpx;
      line-height: 40rpx;
      color: #3881a8;
      margin-bottom: 30rpx;
    }
  }

  .hint {
    display: flex;
    justify-content: center;

    .hint-box {
      width: 705rpx;

      .hint-title {
        font-weight: 500;
        font-size: 30rpx;
        color: #4d4d4d;
        display: flex;
        align-items: center;

        .text {
          margin-left: 10rpx;
        }
      }

      .content {
        font-size: 26rpx;
        color: #a1a1a1;

        .label {
          display: flex;
          align-items: center;
          line-height: 44rpx;
          margin-left: 28rpx;

          &::before {
            content: "";
            width: 12rpx;
            height: 12rpx;
            border-radius: 12rpx;
            background: var(--theme-color);
            margin-right: 10rpx;
          }
        }
      }
    }
  }

  .pwd-box {
    height: 262rpx;
    width: 684rpx;
    border-radius: 24rpx;
    background: #ffffff;
    padding: 20rpx 28rpx;
    box-sizing: border-box;

    .top-box {
      margin-bottom: 20rpx;

      .title {
        font-size: 30rpx;
        text-align: center;
        color: #404040;
        text-align: center;
      }

      .close {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        width: 34rpx;
        height: 34rpx;
      }
    }

    ::v-deep .code-box {
      .item {
        border-radius: 24rpx;

        .dot-xin {
          font-size: 24rpx;
        }
      }
    }

    .forget {
      margin-top: 20rpx;
      font-weight: 400;
      font-size: 28rpx;
      text-align: center;
      color: var(--theme-color);
    }
  }
}

::v-deep .header {
  border-radius: 0 0 20rpx 20rpx;
  overflow: hidden;

  .uni-navbar__header {
    padding: 0 28rpx;
  }
}

.card {
  background: #fff;
  border-radius: 24rpx;
  margin: 0 28rpx 20rpx;
  padding: 40rpx 28rpx;
  .item1 {
    display: flex;
    align-items: center;
    background: #f8f8f8;
    padding: 20rpx;
    border-radius: 24rpx;
    margin-bottom: 40rpx;
    .left {
      display: flex;
      flex-direction: column;
      flex: 1;
      .title {
        color: #4d4d4d;
        font-size: 34rpx;
        font-weight: 600;
      }
      .tip {
        color: #8e8e8e;
        font-size: 26rpx;
      }
    }
    .right {
      background: #fff;
      border-radius: 24rpx;
      height: 56rpx;
      display: grid;
      place-content: center;
      color: var(--theme-color);
      font-size: 28rpx;
      font-weight: 500;
      padding: 0 20rpx;
    }
  }
  .item2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .item {
      background: var(--theme-auxiliary-color-default);
      margin-left: 25rpx;
      border-radius: 24rpx;
      padding: 28rpx 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
        margin-left: 0;
      }
      .icon {
        width: 88rpx;
        height: 88rpx;
      }
      .title {
        color: #4d4d4d;
        font-size: 30rpx;
      }
      .tip {
        color: #a1a1a1;
        font-size: 26rpx;
        margin-top: 10rpx;
        white-space: nowrap;
      }
    }
  }
  .item3 {
    display: flex;
    align-items: center;
    background: var(--theme-auxiliary-color-default);
    margin-top: 30rpx;
    border-radius: 24rpx;
    padding: 20rpx;
    .icon {
      width: 68rpx;
      height: 68rpx;
      color: #0051ef;
    }
    .title {
      margin-left: 20rpx;
      color: #4d4d4d;
      font-size: 30rpx;
      font-weight: 500;
      flex: 1;
    }
    .btn {
      color: #fff;
      background: #0051ef;
      border-radius: 40rpx;
      height: 56rpx;
      display: grid;
      place-content: center;
      padding: 0 20rpx;
      font-size: 26rpx;
    }
  }
}
.hint-text {
  background-color: var(--theme-color);
  border-radius: 40rpx;
  height: 54rpx;
  display: grid;
  place-content: center;
  padding: 0 20rpx;
  width: fit-content;
  color: #fff;
  margin: 20rpx 0;
  font-size: 26rpx;
}
</style>
