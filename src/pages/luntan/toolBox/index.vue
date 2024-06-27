<template>
  <view
    class="mint-tab-container-item"
    :class="['theme-' + themeColor.name]"
    :style="{ marginTop: safeHeight }"
  >
    <Header :title="title" />
    <table>
      <tr v-for="(item, index) in menu" :key="index">
        <td v-for="(val, key) in item" :key="key" @click="toLink(val)">
          <image :src="val.img" mode="widthFix"></image>
          <p :style="{ color: val.color }">{{ val.name }}</p>
        </td>
      </tr>
    </table>
    <AlertInjectLayer />
  </view>
</template>

<script>
import Header from "@/components/common/header/index.vue";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
import { mapGetters } from 'pinia';
export default {
  name: "index",
  components: {
    AlertInjectLayer,
    Header,
  },
  data() {
    return {
      safeHeight:
        this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO
        ).safeArea.top + "px",
      title: this.$t("pages.luntan.toolBox.index.title"),
      menu: [
        [
          {
            name: this.$t("pages.luntan.toolBox.index.text0"),
            img: "@/static/img/toolbox/lrtm.svg",
            url: "/pages/luntan/toolBox/lover",
            color: "#FF5592",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text1"),
            img: "@/static/img/toolbox/sxkp.svg",
            url: "/pages/luntan/toolBox/cnzodiac",
            color: "#376EFF",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text2"),
            img: "@/static/img/toolbox/yyy.svg",
            url: "/pages/luntan/toolBox/shake",
            color: "#F16618",
          },
        ],
        [
          {
            name: this.$t("pages.luntan.toolBox.index.text3"),
            img: "@/static/img/toolbox/xjml.svg",
            url: "/pages/luntan/toolBox/silkbag",
            color: "#A717EB",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text4"),
            img: "@/static/img/toolbox/xycj.svg",
            url: "/pages/luntan/toolBox/luck",
            color: "#F16618",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text5"),
            img: "@/static/img/toolbox/bxzp.svg",
            url: "/pages/luntan/toolBox/turntable",
            color: "#17C71E",
          },
        ],
        [
          {
            name: this.$t("pages.luntan.toolBox.index.text6"),
            img: "@/static/img/toolbox/jzrq.svg",
            url: "/pages/luntan/toolBox/date",
            color: "#03A651",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text7"),
            img: "@/static/img/toolbox/tjcs.svg",
            url: "/pages/luntan/toolBox/secret",
            color: "#376EFF",
          },
          {
            name: this.$t("pages.luntan.toolBox.index.text8"),
            img: "@/static/img/toolbox/tmzs.svg",
            url: "/pages/luntan/toolBox/codePicking",
            color: "#A717EB",
          },
        ],
        [
          {
            name: this.$t("pages.luntan.toolBox.index.text9"),
            img: "@/static/img/toolbox/almanac.svg",
            url: "/pages/luntan/toolBox/almanac",
            color: "#ED2424",
          },
          {
            name: "签到",
            key: "vector",
            img: "@/static/img/toolbox/Vector.svg",
            url: "/pages/luntan/toolBox/vector",
            color: "#07C160",
          },
          {
            name: "兑换",
            key: "frame",
            img: "@/static/img/toolbox/Frame.svg",
            url: "/pages/luntan/toolBox/frame",
            color: "#F16618",
          },
        ],
      ],
    };
  },
  computed: {
    ...mapState(AppInfoStore, ['themeColor']),
    userInfo() {
      return this.$store.state?.appInfoStore?.userInfo || {};
    },
  },
  mounted() {
    uni.$emit("on_page_mounted", this);
  },
  methods: {
    toLink(item) {
      console.log("this.userInfo.userType", this.userInfo.userType);
      if (!isLogin() || this.userInfo.userType === "demo") {
        if (item.key === "vector") {
          if (this.userInfo.userType === "fast") {
            uni.navigateTo({
              url: "/pages/common/supplement",
            });
            return;
          }
          uni.navigateTo({
            url: "/pages/common/fastreg",
          });
          return;
        }
        if (item.key === "frame") {
          uni.$emit("showPop", {
            refName: "AlertMessage",
          });
          return;
        }
      }
      if (this.userInfo?.userType === "sign" && item.key === "frame") {
        uni.navigateTo({
          url: "/pages/common/supplement",
        });
        return;
      }
      uni.navigateTo({
        url: item.url,
      });
    },
  },
};
</script>

<style scoped>
.mint-tab-container-item {
  background: var(--theme-auxiliary-color-default);
}

table {
  margin-top: 20rpx;
  border-radius: 24rpx;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  background: #fff;
  color: #404040;
  font-size: 28rpx;
}

table td {
  border-right: 2rpx solid var(--theme-auxiliary-color-default);
  border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
  padding: 40rpx 46rpx;
}

table td:nth-child(3) {
  border-right: none;
}

table tr:last-child td {
  border-bottom: none;
}

table td image {
  display: block;
  width: 68rpx;
  max-height: 68rpx;
  margin: 0 auto;
}

table td p {
  margin-top: 10rpx;
  color: #404040;
  font-size: 28rpx;
}
</style>
