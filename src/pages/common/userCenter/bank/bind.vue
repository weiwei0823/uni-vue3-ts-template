<template>
  <view
    class="bind-box"
    :style="{ marginTop: safeHeight }"
    :class="['theme-' + themeColor.name]"
  >
    <Header :title="title" :isBack="false" showBack @back="backPage" />
    <view class="img-box">
      <image src="/static/imgs-liuhe/bank/empty.png" mode="widthFix"></image>
    </view>
    <view class="btn-box">
      <view
        class="btn"
        @click="toUrl(item.url)"
        v-for="item in btnList"
        v-show="bindType.includes(item.key)"
      >
        <text class="name">{{ item.name }}</text>
        <image class="img" src="/static/imgs-liuhe/bank/right.png"></image>
      </view>
    </view>
    <AlertInjectLayer />
  </view>
</template>

<script>
import Header from "@/components/common/header/index.vue";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import { bankListInit } from "@/utils/lottery/mine";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
import { mapGetters } from 'pinia';
export default {
  name: "bind",
  components: {
    AlertInjectLayer,
    UniCol,
    UniRow,
    Header,
  },
  mounted() {
    uni.$emit("on_page_mounted", this);
  },
  data() {
    return {
      safeHeight:
        this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO
        ).safeArea.top + "px",
      title: this.$t("pages.common.userCenter.bank.bind.Bind"),
      headerStyle: {
        backgroundColor: "#fff",
        "border-radius": "0 0 20rpx 20rpx",
        height: "88rpx",
      },
      fontColor: "#FFFFFF",
      titleStyle: {
        color: "#404040",
      },
      btnList: [
        {
          name: this.$t("pages.common.userCenter.bank.bind.BindBankCard"),
          url: "/pages/common/userCenter/bank/add",
          key: 1,
        },
        {
          name: this.$t("pages.common.userCenter.bank.bind.BindUSDTAddress"),
          url: "/pages/common/userCenter/bank/usdt",
          key: 4,
        },
        {
          name: this.$t(
            "pages.common.userCenter.bank.bind.BindThirdPartyWallet"
          ),
          url: "/pages/common/userCenter/bank/wallet",
          key: 2,
        },
        {
          name: this.$t("pages.common.userCenter.bank.bind.BindReceiptQRCode"),
          url: "/pages/common/userCenter/bank/qrcode",
          key: 3,
        },
      ],
      option: {},
      bindType: [],
    };
  },
  onLoad(option) {
    this.option = option;
    this.getBankCardList();
  },
  computed: {
    ...mapGetters(["themeColor"]),
  },
  methods: {
    async getBankCardList() {
      const res = await bankListInit();
      const { bindType = [] } = res.result;
      this.bindType = bindType.map((i) => Number(i));
    },
    backPage() {
      backPage();
    },
    toUrl(url) {
      uni.navigateTo({
        url: url + "?" + new URLSearchParams(this.option),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bind-box {
  background: var(--theme-auxiliary-color-default);
  height: var(--vh);

  .img-box {
    width: 596rpx;
    margin: auto;
    margin-top: 40rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .msg {
    font-weight: 400;
    font-size: 32rpx;
    line-height: 42rpx;
    text-align: center;
    color: #666666;
  }

  .btn-box {
    display: flex;
    flex-direction: column;
    padding: 0 28rpx;

    .btn {
      margin-bottom: 20rpx;
      // width: 694rpx;
      width: 100%;
      height: 128rpx;
      background: #fff;
      border-radius: 24rpx;
      font-size: 30rpx;
      color: var(--theme-font-default-deep-color);
      display: flex;
      align-items: center;
      padding: 20rpx 28rpx;
      box-sizing: border-box;

      .name {
        flex: 1;
        display: flex;
        align-items: center;

        &::before {
          content: "";
          display: block;
          width: 6rpx;
          height: 24rpx;
          border-radius: 6rpx;
          margin-right: 20rpx;
          background: var(--theme-color);
        }
      }

      .img {
        width: 11rpx;
        height: 22rpx;
      }
    }
  }
}

/deep/ .header {
  border-radius: 0 0 20rpx 20rpx;
  overflow: hidden;
}
</style>
