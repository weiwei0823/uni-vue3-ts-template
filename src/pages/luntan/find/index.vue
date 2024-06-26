<template>
  <view class="body" :style="{
    paddingTop: statusBarH,
    height: `${uWindowHeight}px`,
    position: 'fixed',
  }" :class="['theme-' + themeColor.name]">
    <Header isFixed :isBack="false" :headerStyle="{ top: 0 }" :headerInnerStyle="{ borderRadius: 0 }" :title="title">
    </Header>
    <view class="search-row" v-show="curr == 0">
      <uni-search-bar :bgColor="themeColor.themeAuxiliaryColorDefault" radius="19" v-model="searchValue"
        :placeholder-style="'color:#A1A1A1'" :placeholder="$t('pages.luntan.find.index.SearchPlaceholder')"
        :cancelStyle="{
          'font-weight': 600,
          color: themeColor.themeColor,
          'text-align': 'right',
          'font-size': '30rpx',
        }" cancelButton="always" :cancelText="$t('pages.luntan.find.index.Search')" @confirm="search" @cancel="search">
        <template v-slot:searchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
              fill="#A1A1A1" />
          </svg>
        </template>
      </uni-search-bar>
    </view>
    <view>
      <u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
        :active-color="themeColor.themeColor">
        <template #tab="{ item }">{{ item.name }}</template>
      </u-tabs-swiper>
    </view>
    <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
      :style="{ height: `calc(${uWindowHeight}px - 260rpx)` }">
      <swiper-item class="swiper-item">
        <List ref="list01" :sort="0">
          <template v-slot:footer>
            <view style="height: 100rpx;width: 100%"></view>
          </template>
        </List>
      </swiper-item>
      <swiper-item class="swiper-item">
        <List ref="list02" :sort="1">
          <template v-slot:footer>
            <view style="height: 100rpx;width: 100%"></view>
          </template>
        </List>
      </swiper-item>
    </swiper>

    <tab-bar :current="'3'"></tab-bar>
    <fab></fab>
    <view class="fabu" @click="add">
      <svg width="80" height="102" viewBox="0 0 80 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="10" width="48" height="48" rx="24" fill="white" fill-opacity="0.7" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M40 22.5C39.1716 22.5 38.5 23.1716 38.5 24V32.5H30C29.1716 32.5 28.5 33.1716 28.5 34C28.5 34.8284 29.1716 35.5 30 35.5H38.5V44C38.5 44.8284 39.1716 45.5 40 45.5C40.8284 45.5 41.5 44.8284 41.5 44V35.5H50C50.8284 35.5 51.5 34.8284 51.5 34C51.5 33.1716 50.8284 32.5 50 32.5H41.5V24C41.5 23.1716 40.8284 22.5 40 22.5Z"
          :fill="themeColor.themeColor" />
        <rect x="16" y="63" width="48" height="29" rx="14.5" fill="white" fill-opacity="0.7" />
        <path
          d="M37.018 73.452C36.2247 72.9573 35.408 72.4673 34.568 71.982L35.1 71.1C35.8373 71.52 36.6493 72.0007 37.536 72.542L37.018 73.452ZM38.6 83.938C36.7147 83.3687 35.1793 82.664 33.994 81.824C33.406 82.216 32.7293 82.58 31.964 82.916C31.1987 83.252 30.284 83.6067 29.22 83.98L28.744 82.958C30.5733 82.3607 32.0247 81.7447 33.098 81.11C32.2487 80.3633 31.53 79.4113 30.942 78.254C30.5407 79.1687 30.0507 80.046 29.472 80.886C28.8933 81.7167 28.184 82.58 27.344 83.476L26.742 82.398C27.778 81.3527 28.6273 80.2327 29.29 79.038C29.962 77.8433 30.4893 76.4807 30.872 74.95H27.554V74.04L28.212 71.38L29.304 71.632L28.744 73.956H31.096C31.264 73.0973 31.404 72.164 31.516 71.156L32.608 71.254C32.5053 72.1593 32.37 73.06 32.202 73.956H38.992V74.95H31.992C31.852 75.5847 31.6933 76.168 31.516 76.7H37.55V77.708C37.1767 78.4453 36.78 79.0893 36.36 79.64C35.94 80.1907 35.4687 80.6853 34.946 81.124C35.9913 81.796 37.3587 82.3607 39.048 82.818L38.6 83.938ZM31.838 77.708C32.398 78.8187 33.1307 79.7427 34.036 80.48C35.0347 79.724 35.8047 78.8 36.346 77.708H31.838ZM45.726 73.984C45.306 74.8893 44.8207 75.7527 44.27 76.574H47.014V74.796H48.05V76.574H52.082V81.124C52.082 81.544 52.0307 81.866 51.928 82.09C51.8253 82.314 51.6573 82.4727 51.424 82.566C51.2 82.65 50.878 82.692 50.458 82.692H49.072L48.862 81.684H50.136C50.5093 81.684 50.7567 81.6233 50.878 81.502C50.9993 81.3713 51.06 81.1427 51.06 80.816V77.638H48.05V83.938H47.014V77.638H43.962V82.832H42.954V78.268C42.5247 78.772 41.96 79.3647 41.26 80.046L40.798 78.94C41.6287 78.184 42.3473 77.4093 42.954 76.616C43.5607 75.8227 44.102 74.9453 44.578 73.984H41.19V72.934H45.054C45.3247 72.318 45.5767 71.66 45.81 70.96L46.804 71.198C46.608 71.7767 46.398 72.3553 46.174 72.934H53.076V73.984H45.726Z"
          :fill="themeColor.themeColor" />
      </svg>
    </view>
    <AlertInjectLayer />
		<!-- <ColorSwitch /> -->
  </view>
</template>
<script>
import List from "./List.vue";
import Fab from "@/components/common/fab/Fab";
import TabBar from "@/components/common/tabbar/TabBar";
import Header from "@/components/common/header/index.vue";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
import ColorSwitch from '@/components/common/colorSwitch/index.vue';

import { mapGetters } from 'pinia';

export default {
  components: {
    Fab,
    List,
    TabBar,
    Header,
    AlertInjectLayer,
    ColorSwitch
  },
  data() {
    return {
      msg: "",
      curr: 0,
      searchValue: "",
      statusBarH:
        this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO
        ).safeArea.top + "px",
      list: [
        {
          name: this.$t("pages.luntan.find.index.All"),
        },
        {
          name: this.$t("pages.luntan.find.index.Recommended"),
        },
      ],
      current: 0,
      swiperCurrent: 0,
      lastLotteryType: 0,
      lotteryType: 1,

    };
  },
  onShow() {
    this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
      .LOCAL_STORE_LOTTERYTYPE)
    console.log("onShow")
    uni.hideTabBar();
    if (this.msg) {
      pop(this.msg, 2000);
      this.msg = "";
    }

    let nowLotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE);
    if (nowLotteryType != this.lastLotteryType) {
      this.$refs.list01 && this.$refs.list01.initData();
      this.$refs.list02 && this.$refs.list02.initData();
      this.lastLotteryType = nowLotteryType;
    }
    // console.log( this.lotteryType)
    // console.log(nowLotteryType)

  },
  onLoad() {
    // this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
    // 			.LOCAL_STORE_LOTTERYTYPE)
    // console.log("onShow")
    // uni.hideTabBar();
    // if (this.msg) {
    //   pop(this.msg, 2000);
    //   this.msg = "";
    // }
    // let nowLotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG);
    // if(nowLotteryType!=this.lastLotteryType){
    //   this.$refs.list01&&this.$refs.list01.initData();
    //   this.$refs.list02&&this.$refs.list02.initData();
    //   this.lastLotteryType = nowLotteryType;
    // }
    uni.$on("emitParams", (data) => {
      this.msg = data.msg;
    });
  },
  computed: {
    ...mapGetters(["themeColor", "uWindowHeight"]),
    title() {
      return this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.$t('pages.luntan.find.index.Title')
    },
    userInfo() {
      return this.$store.state.appInfoStore?.userInfo || {}
    },
  },
  mounted() {
    uni.$emit("on_page_mounted", this);
  },
  methods: {
    search() {
      console.log("search");
    },
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },

    add: function () {
      if (!isLogin() || ['sign'].includes(this.userInfo.userType)) {
        uni.$emit('showPop', {
          refName: 'AlertMessage'
        })
        return false
      }
      uni.navigateTo({
        url: '/pages/luntan/find/find-add'
      })
    }

  },
};
</script>
<style lang="scss" scoped>
::v-deep .u-tabs {
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}

::v-deep .u-scroll-bar {
  bottom: 0rpx;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
}

.body {
  max-width: 480px;
  width: 100%;
  margin: auto;

  .search-row {
    background: #fff;
    padding: 8rpx 28rpx;

    ::v-deep .uni-searchbar {
      background: var(--theme-auxiliary-color-default);
      border-radius: 16rpx;
      height: 76rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .uni-searchbar__box-icon-search {
        padding: 0 20rpx 0 0;
      }
    }
  }

  .fabu {
    position: absolute;
    right: 0;
    bottom: 560rpx;
    z-index: 12;

    image {
      width: 160rpx;
    }
  }
}
</style>
