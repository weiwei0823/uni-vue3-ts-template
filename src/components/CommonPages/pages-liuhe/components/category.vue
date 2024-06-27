<template>
  <view class="category" :style="{ marginTop: isTop ? '0rpx' : 0 }" :class="{ isHand: this.isHand }"
        @touchmove="onTouchMove" @touchstart="onTouchBegin" @touchend="onTouchEnd">
    <!-- 100rpx -->
    <!--左侧category-->
    <scroll-view :scroll-y="useScrollLeft" class="cate-items" :style="{ height: height }" @scroll="onLeftMenuScroll">
      <view :style="{ paddingBottom: isGameHall ? 0 : $config.station === $config.enumMgr.STATION.ALL ? '120rpx' : '120rpx' }">
        <view class="item" @click="recommend">
          <image class="icon" mode="aspectFit" src="@/static/imgs-liuhe/index_02/reccomended.png"></image>
          <view class="name">本站推荐</view>
        </view>
        <view class="item" :class="{ selected: index === selected }" v-for="(item, index) in data" :key="index"
              @click="handleCateChange(index)">
          <image v-if="item.gameCategoryId === 0"
                 class="icon" mode="aspectFit"
                 :src="index === selected ? '@/static/imgs-liuhe/index_02/selectedIcon.png' : '@/static/imgs-liuhe/index_02/unSelectedIcon.png'"
          ></image>
          <lazy-image v-else
                      class="lazy-image icon"
                      :scrollTop="useScrollLeft ? (leftMenuScrollY + scrollTop) : scrollTop"
                      :src="index === selected ? item.selectedIcon : item.unSelectedIcon"
                      :width="'100%'"
                      mode="aspectFit">
            <template #loading>
              <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
            </template>
          </lazy-image>
          <view class="name">{{ item.name }}</view>
        </view>
      </view>
    </scroll-view>
    <!--右侧game-->
    <scroll-view :scroll-y="useScroll" scroll-with-animation :scrollTop="rightPageScrollY" lower-threshold="500"
                 @scrolltolower="queryLower" v-if="data.length" :style="{ height: `calc(${height})` }" ref="rightScrollContent"
                 @scroll="onScroll">
      <view :style="{ paddingBottom: isGameHall ? 0 : $config.station === $config.enumMgr.STATION.ALL ? '140rpx' : '140rpx' }">
        <categoryItem name="cate"
                      :key="`${swiperCurrent}_${selected}`"
                      :isLoading="loading"
                      :showFlagList="showFlagList"
                      :data="list"
                      :scrollTop="useScroll ? (lastScrollTop + scrollTop) : scrollTop"
                      showStar/>
      </view>
    </scroll-view>
    <view :class="{ showTopClass: isTopIconY > 100, isAppShowTop: isApp }">
      <topicon :iconWidth="110" :iconHeight="100" iconPath="@/static/img/top2.png" :marginBottom="50" :marginLeft="130"
               :marginRight="0" @tapIcon="backTop"> </topicon>
    </view>
  </view>
</template>

<script>
import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
import {gameListByPlatformCateId} from "@/utils/lottery/list";
import categoryItem from "./categoryItem.vue";
import Playing from '@/utils/common/playing';
import lazyImage from "@/components/lazy-image/index.vue";

export default {
  components: {
    lazyImage,
    categoryItem,
    topicon
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    isTop: {
      type: Boolean,
      default: false
    },

    pageStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    pageScroll: {
      type: Boolean,
      default: function () {
        return true;
      }
    },
    scrolltolower: Boolean,
    height: {
      type: String,
      default: null
    },
    drageTopOffset: {
      type: Number,
      default: 30
    },
    topBox: Boolean,
    isGameHall: false,
    scrollTop: Number,
    swiperCurrent: Number,
    categoryGameData: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  data() {
    return {
      playing: new Playing(),
      isHand: false,
      loading: false,
      list: [],
      // showList:[],
      selected: 0,
      lastBeginTouchPointY: -1,
      rightPageScrollY: 0,
      leftMenuScrollY: 0,
      touchBeginX: -1,
      mouseDowned: false,
      useScroll: true,
      useScrollLeft: true,
      winHeight: 0,
      pageIndex: 1,
      paddingHeight: '100rpx',
      isTopIconY: 0,
      isApp: false,
      lastScrollTop: 0,
      showFlagList: [],
      inited: false,
      loadingImg: this.$store.state.appInfoStore.contantsConfigTypeMap['23']?.url,
    }
  },
  mounted() {
    this.winHeight = uni.getSystemInfoSync().windowHeight + 30;
    this.useScroll = this.scrolltolower;
    this.useScrollLeft = this.scrolltolower;
    this.isApp = browserPlatform() === browserPlatform.FLUTTER_App;
    this.handleCateChange(this.selected);
  },
  watch: {
    scrolltolower(newV, oldV) {
      this.useScroll = newV;
      this.useScrollLeft = newV;
    },
    'data': {
      handler(val) {
        this.selected = 0;
        this.pageIndex = 1;
        this.list = [];
        this.newGetList(true);
      },
      deep: true,
    },
    '$route.path': {
      handler() {
        this.isHand = this.playing.getStorage('isHand')
      },
      immediate: true
    },
    topBox(newVal, oldVal) {
      this.useScroll = !newVal
    }
  },
  computed: {
    systemInfo() {
      return uni.getSystemInfoSync();
    }
  },
  methods: {
    backTop() {
      this.rightPageScrollY = this.isTopIconY;
      this.$nextTick(() => {
        this.rightPageScrollY = 0
      })
    },
    queryLower() {
      this.newGetList(true);
    },
    recommend() {
      uni.navigateTo({
        url: '/pages/liuhe/recommend'
      })
    },
    async newGetList(isAddPage = false) {
      if (this.loading) return;
      const item = this.data[this.selected] || {};
      if (!item?.hasOwnProperty("gameCategoryId") || !item?.hasOwnProperty("gamePlatformId")) {
        return;
      }
      let prams = {
        gameCategoryId: item?.gameCategoryId,
        platformCateId: item?.gamePlatformId,
        pageNo: this.pageIndex,
        pageSize: 20
      };
      if (item?.gameCategoryIds) {
        prams.gameCategoryIds = item?.gameCategoryIds;
      }
      this.$loading(true);
      this.loading = true;
      let tempRecords = [];
      // swiper第一个并且category取第一个时，用默认数据
      if (this.swiperCurrent === 0 && this.selected === 0) {
        tempRecords = this.categoryGameData?.records;
      } else {
        const res = await gameListByPlatformCateId(prams);
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
          this.handleGetListResult(res?.result?.records || [], isAddPage);
        }, this);
        tempRecords = res?.result?.records || [];
      }
      this.handleGetListResult(tempRecords, isAddPage);
    },
    // 处理数据返回结果
    handleGetListResult(records, isAddPage) {
      this.$loading(false);
      this.loading = false;
      this.inited = true;
      const targetList = this.list.concat(records);
      this.$set(this, 'list', targetList);
      if (this.list.length > 60) {
        this.showFlagList = this.list.map((obj, index) => {
          return this.list.length - 60 < index;
        });
      } else {
        this.showFlagList = this.list.map(ele => {
          return true
        });
      }
      isAddPage && this.pageIndex++;
      setTimeout(() => {
        this.$emit('getCurrentSwiperHeight')
      }, 200);
    },
    handleCateChange(index) {
      if (this.loading) {
        return;
      }
      this.selected = index;
      this.pageIndex = 1;
      this.list = [];
      this.newGetList(true);
    },
    onScroll(event) {
      if (event.detail.scrollTop <= 0) {
        this.useScroll = false;
        setTimeout(() => {
          this.useScroll = true;
        }, 100)
      }
      if (this.systemInfo.model === "PC" && event.detail.scrollTop <= 0) {
        return this.$emit("drageTop");
      }
      this.isTopIconY = event.detail.scrollTop;
      const scrollTop = event.target.scrollTop

      // 新增字段，用于判断是否是向上滚动
      const isScrollTop = this.lastScrollTop < scrollTop
      this.lastScrollTop = scrollTop;
      if (!isScrollTop) {
        const arr = this.list
        this.showFlagList = this.list.map(element => {
          return true
        });
      }
    },
    onLeftMenuScroll(event) {
      if (event.detail.scrollTop <= 0) {
        this.useScrollLeft = false;
        setTimeout(() => {
          this.useScrollLeft = true;
        }, 100);
      }
      if (this.systemInfo.model == "PC" && event.detail.scrollTop <= 0) {
        return this.$emit("drageTop");
      }
      this.leftMenuScrollY = event.detail.scrollTop;
    },
    onTouchBegin(e) {
      let touch = e.touches[0];
      if (!touch) return console.warn("touch lose");
      let touchY = touch.clientY;
      let touchX = touch.clientX;
      this.touchBeginX = touchX;
      this.lastBeginTouchPointY = touchY;
    },

    onTouchMove(e) {
      if (this.lastBeginTouchPointY == -1 || this.touchBeginX == -1) return;
      let touch = e.touches[0];
      if (!touch) return console.warn("touch lose");
      let touchY = touch.clientY;
      let _sysInfo = uni.getSystemInfoSync();
      let screenWidth = _sysInfo.screenWidth;
      //210 左侧菜单预测值210rpx
      let leftPx = 210 * screenWidth / 750;
      let isTouchMoveInLeftMenu = this.touchBeginX <= leftPx;
      let drageTop = false;
      if (!isTouchMoveInLeftMenu && this.rightPageScrollY <= 0 && touchY > this.lastBeginTouchPointY + this
          .drageTopOffset) {
        drageTop = true;
      }
      if (isTouchMoveInLeftMenu && this.leftMenuScrollY <= 0 && touchY > this.lastBeginTouchPointY + this
          .drageTopOffset) {
        drageTop = true;
      }
      if (drageTop) {
        this.$emit("drageTop");
      }
    },


    onTouchEnd(e) {
      this.lastBeginTouchPointY = -1;
    },
  }
}
</script>
<style lang="scss" scoped>
.isAppShowTop {
  ::v-deep .fixedView {
    bottom: 200rpx;
  }
}

.showTopClass {
  ::v-deep .fixedView {
    opacity: 1 !important;
  }
}

::v-deep .fixedView {
  right: 30rpx;
  left: unset !important;
  top: unset !important;
  bottom: calc(140rpx + var(--safe-area-inset-bottom));
  opacity: 0;
  position: absolute !important;
}

::v-deep .zp-absoulte {
  width: 100%;
}



.category {
  display: flex;
  padding: 0 28rpx;
  // margin-top: 44rpx;

  .cate-items {
    width: fit-content;
    display: flex;
    flex-direction: column;
    margin-right: 20rpx;
    flex-shrink: 0;

    .item {
      width: 160rpx;
      height: 104rpx;
      padding: 16rpx;
      box-sizing: border-box;
      border-radius: 16rpx;
      background: var(--theme-auxiliary-color-default);
      display: grid;
      place-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .icon {
        height: 44rpx;
        max-width: 100%;
        flex-shrink: 0;
      }

      .lazy-image {
        ::v-deep {
          .loading-img, .origin-img {
            width: 44rpx;
            height: 44rpx;

            img {
              object-fit: contain;
            }
          }
        }
      }
      .name {
        color: #404040;
        text-align: center;
        font-size: 24rpx;
      }
    }

    .selected {
      background: var(--theme-color);

      .name {
        color: #FFF;
      }
    }

  }
}

.isHand {
  flex-direction: row-reverse;

  .cate-items {
    margin-right: 0;
    margin-left: 20rpx;
  }
}
</style>
