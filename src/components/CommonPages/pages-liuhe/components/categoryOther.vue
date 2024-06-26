<template>
	<view class="category" :style="{ marginTop: isTop ? '0rpx' : 0 }" :class="{ isHand: this.isHand }"
		@touchmove="onTouchMove" @touchstart="onTouchBegin" @touchend="onTouchEnd" :key="`category${dataType}`">
		<scroll-view :key="`category${dataType}`" :scroll-y="useScroll" :bounces="false" scroll-with-animation
			:scrollTop="rightPageScrollY" @scrolltolower="queryLower" :style="{ height:height }" @scroll="onScroll">
			<view :style="{paddingBottom:'140rpx'}">
        <template  v-if="[3, 4].includes(+dataType)">
          <categoryItem :clearPlayShow="clearPlayShow"
                        :isLoading="isLoading"
                        :class="{ px: [3, 4].includes(+dataType) }"
                        :columnsNum="4"
                        :data="data"
                        :dataType="dataType"
                        :scrollTop="scrollTop + isTopIconY"
                        v-on:collectSuccess="doColloctStatusUpdate"
                        @refreshPlayData="refreshPlayData"/>
        </template>
        <template v-else>
          <view v-for="(item, index) in data" :key="index">
            <OneItem v-if="+item.styleType === 3"
                     class="data-item"
                     :scrollTop="scrollTop + isTopIconY"
                     :data="item.data"
                     :offsetY="[-4]"
                     @openLoginPop="openLoginPop"
            />
            <styleType1 v-else-if="+item.styleType === 1"
                        class="data-item"
                        :data="item.data"
                        :swiperCurrent="swiperCurrent"
                        :scrollTop="scrollTop + isTopIconY"
                        @openLoginPop="openLoginPop"/>
            <styleType2 v-else-if="+item.styleType === 2"
                        class="data-item"
                        :class="item.class"
                        :data="item.data"
                        :scrollTop="scrollTop + isTopIconY"
                        @openDialog="openDialog"
                        @openLoginPop="openLoginPop"/>
            <lottery v-else-if="+dataType === 1"
                     :data="item"
                     :scrollTop="scrollTop + isTopIconY"
                     @openLoginPop="openLoginPop"/>
          </view>
					</template>
			</view>
		</scroll-view>
		<view :class="{showTopClass:isTopIconY > 100,isAppShowTop:isApp}">
			<topicon :iconWidth="110" :iconHeight="100" iconPath="/static/img/top2.png" :marginBottom="50"
				:marginLeft="130" :marginRight="0" @tapIcon="backTop"> </topicon>
		</view>

	</view>
</template>

<script>
import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
import {gameListByPlatformCateId} from "@/utils/lottery/list";
import categoryItem from "./categoryItem.vue";
import Playing from '@/utils/common/playing';
import OneItem from "@/pages/liuhe/common/OneItem";
import styleType1 from './styleType1.vue'
import styleType2 from './styleType2.vue'
import lottery from './lottery.vue'

export default {
		components: {
			categoryItem,
			topicon,
			OneItem,
			styleType1,
			styleType2,
			lottery
		},
		props: {
			clearPlayShow: false,
			isGameHall: false,
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			isTop: {
				type: Boolean,
				default: false
			},

			pageStyle: {
				type: Object,
				default: function() {
					return {}
				}
			},
			pageScroll: {
				type: Boolean,
				default: function() {
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
			swiperCurrent: null,
			dataType: null,
      isLoading: Boolean,
      scrollTop: Number,
		},

		data() {
			return {
				playing: new Playing(),
				isHand: false,
				list: [],
				selected: 0,
				lastBeginTouchPointY: -1,

				rightPageScrollY: 0,
				leftMenuScrollY: 0,
				touchBeginX: -1,
				mouseDowned: false,
				useScroll: true,
				winHeight: 0,
				pageIndex: 1,
				paddingHeight: '100rpx',
				isTopIconY: 0,
				bounceTop: false,
				isApp: false,
			}
		},
		mounted() {
			this.winHeight = uni.getSystemInfoSync().windowHeight + 30;
			this.useScroll = this.scrolltolower;
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			// alert(browserPlatform())
			const userAgent = navigator.userAgent.toLowerCase();
			if (!this.isApp && +this.dataType === 0) this.paddingHeight = "56rpx";
		},
		watch: {
			height(newHeight, oldHeight) {
				console.log(newHeight, "newHeight");
			},
			scrolltolower(newV) {
				this.useScroll = newV;
				this.bounceTop = false;
			},
      'data': {
        handler(val) {
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
			topBox(newVal) {
				this.useScroll = !newVal;
			}
		},
		computed: {
			systemInfo() {
				return uni.getSystemInfoSync();
			}
		},

		methods: {
      openLoginPop() {

      },
      openDialog() {

      },
			doColloctStatusUpdate(){

      },
			refreshPlayData() {
				this.$emit("newGetList", 7)
			},
			backTop() {
				this.rightPageScrollY = this.isTopIconY;
				this.$nextTick(() => {
					this.rightPageScrollY = 0
				})
				// this.rightPageScrollY = 0
				// this.$refs.rightScrollContent.scrollTop
			},
			queryLower() {
				// this.newGetList();
			},
			recommend() {
				uni.navigateTo({
					url: '/pages/liuhe/recommend'
				})
			},
			async newGetList() {
        if (!item?.hasOwnProperty("gameCategoryId") || !item?.hasOwnProperty("gamePlatformId")) {
          return;
        }
        const item = this.data[this.selected];
				let prams = {
					gameCategoryId: item.gameCategoryId,
					platformCateId: item.gamePlatformId,
					pageNo: this.pageIndex,
					pageSize: 20
				}
				if (item.gameCategoryIds) {
					prams.gameCategoryIds = item.gameCategoryIds
				}
				this.$loading(true);
				const {
					result: {
						records
					}
				} = await gameListByPlatformCateId(prams);
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
          this.handleGetListResult(records);
        }, this);
        this.handleGetListResult(records);
			},
      // 处理数据返回结果
      handleGetListResult(records) {
        this.$loading(false);
        this.list = this.list.concat(records);
        this.pageIndex++;
        // this.$refs.paging.complete(records)
        setTimeout(() => {
          this.$emit('getCurrentSwiperHeight')
        }, 200);
      },
			async getList(pageNo) {
        const item = this.data[this.selected] || {};
				let prams = {
					gameCategoryId: item.gameCategoryId,
					platformCateId: item.gamePlatformId,
					pageNo: pageNo,
					pageSize: 20
				}
				if (item.gameCategoryIds) {
					prams.gameCategoryIds = item.gameCategoryIds
				}
				this.$loading(true);
				const {
					result: {
						records
					}
				} = await gameListByPlatformCateId(prams);
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
          this.handleGetListResult(records);
        }, this);
        this.handleGetListResult(records);
			},
			handleCateChange(index) {
				this.selected = index
				this.pageIndex = 1;
				this.list = [];
				// this.newGetList();
				// this.$refs.paging.reload()
			},
			onScroll(event) {
				if (event.detail.scrollTop <= 0) {
					if (event.detail.scrollTop < 0) this.bounceTop = true;
				}
				if (this.systemInfo.model === "PC" && event.detail.scrollTop <= 0) {
					return this.$emit("drageTop");
				}
				this.isTopIconY = event.detail.scrollTop;
			},

			onLeftMenuScroll(event) {
				if (this.systemInfo.model == "PC" && event.detail.scrollTop == 0) {
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
				let touch = e.changedTouches[0];
				let touchY = touch.clientY;
				if (touchY - this.lastBeginTouchPointY > 0 && this.bounceTop) {
					this.$emit("drageTop");
				}
				if (touchY - this.lastBeginTouchPointY < 0) {
					this.bounceTop = false
				}
				// if (touchY < this.lastBeginTouchPointY) {
				// }
				this.lastBeginTouchPointY = -1;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.isAppShowTop {
		/deep/ .fixedView {
			bottom: 200rpx;
		}
	}

	.showTopClass {
		/deep/ .fixedView {
			opacity: 1 !important;
		}
	}

	/deep/ .fixedView {
		right: 30rpx;
		left: unset !important;
		top: unset !important;
		bottom: calc(140rpx + var(--safe-area-inset-bottom));
		opacity: 0;
		position: absolute !important;
	}

	.data-item {
		padding: 10rpx 28rpx 10rpx;

		&:last-child {
			padding-bottom: 0;
		}
	}

	.first-style-type-2 {
		border-radius: 20rpx 20rpx 0 0;
		padding-top: 10rpx;
	}

	.last-style-type-2 {
		border-radius: 0 0 20rpx 20rpx;
		/*margin-bottom: 10rpx;*/
	}

	/deep/ .fixedView {
		right: 60rpx;
		left: unset !important;
	}

	/deep/ .zp-absoulte {
		width: 100%;
	}



	.category {
		display: flex;
		// padding: 0 28rpx;
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
					flex-shrink: 0;
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
