<template>
	<view id="body_liuhe_index_02" class="pc-max-width"
		:style="{ position: `fixed`, height: `${winHeight}px`, width: '100%' }" :class="['theme-' + themeColor.name]">
		<Header :title="title" :isBack="!showTabBar" @back="gameBack" :useCustomBack="true" />
		<view style="background-color: #f4f4f4;">
			<!-- <view class="" style="background-color: #f4f4f4;width:100%;height:40rpx;" /> -->
			<scroll-view
				:style="{ height: `calc(${winHeight}px - 88rpx - 104rpx + ${showTabBar ? '20rpx' : '80rpx'})`, paddingBottom: '60rpx', backgroundColor: '#fff', marginTop: '20rpx', borderRadius: '24rpx' }"
				:scroll-top="scrollTop" :scroll-with-animation="false" :scroll-y="false" class="liuhe-index-02"
				:class="['theme-' + theme]" @scroll="scroll" @scrolltolower="scrolltolower" :refresher-enabled="false">
        <CategorysSwiper ref="categories"
                         id="category_swiper_body"
                         :optionId="optionId"
                         :fatherScroll="false"
                         :offSetHeightRpx="showTabBar ? -128 : 0"
                         :isGameHall="!showTabBar"
                         :scrolltolower="is_scrolltolower"
                         :fillPageTopY="88"
                         :lockedTopY="true"
                         :fixedTabsY="108"
                         :parent-emit-scroll-event-name="emitCategoryElementScrollEventName"
                         :categoryList="categoryList"
                         :categoryDataList="categoryDataList"
                         :categoryGameData="categoryGameData"
                         :useAllItemsScroll="true"
                         :scrollTop="scrollTop"
                         v-on:onIsTopChange="onSwiperIsTopChange"
                         v-on:afterTabChange="onAfterTabChange"
                         v-on:beforeTabChange="onBeforeTabChange"
                         v-on:afterTabAnimationFinished="onAfterTabAnimationFinished"/>
			</scroll-view>
		</view>
		<TestLogin ref="testLogin"></TestLogin>
		<TabBar :current="2" v-if="showTabBar" />
		<AlertInjectLayer />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import TabBar from '@/components/Tabbar/Liuhe'
import UserOperation from './components/userOperation.vue'
import CategorysSwiper from "./components/categorysSwiper.vue"
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import TestLogin from "@/components/common/PopItem/TestLogin";
import {init} from "@/utils/lottery/mine";
import {advertList, demoLogin} from "@/utils/common/index";
import {cp_init} from '@/utils/home/index.js';
import defaultTemplate from "@/utils/defaultTemplate";
import {mapGetters} from 'pinia';

export default {
	components: {
		Header,
		TabBar,
		UserOperation,
		CategorysSwiper,
		AlertInjectLayer,
		TestLogin,
	},
	props: {
		showTabBar: Boolean,
		optionId: null
	},
	data() {
		this.emitCategoryElementScrollEventName = "on_liuhe_page_hall_scroll";
		return {
			title: '游戏大厅',
			scrollTop: 0,
			memscrollTop: 0,
			is_scrolltolower: true,
			carousel: [], //轮播图
			msg: '',
			status: 0,
			swiperList: [],
			category: {},
			activity: false,
			swiperIsTop: false,
			swiperTopDateType: '0',
			topContentHeight: 0,
			nowCurrentDataType: "0",
			rememberScrollTops: {},
			canScrollY: true,
			lastScrollTopAfterAnimation: 0,
			testTimer: -1,
			lastTouchMoveY: -1,
			categoryList: [],
      categoryDataList: [],
      categoryGameData: {},
			winHeight: 0,
		}
	},

	computed: {
		...mapGetters(["webSiteConfig", "themeColor", "uWindowHeight"]),
		theme() {
			return getApp().globalData.themeMap[this.$config.station]
		},

		topContentBoxNeedHide() {
			let swiperIsTop = this.swiperIsTop;
			let swiperTopDateType = this.swiperTopDateType;
			let topContentBoxNeedHide = !((!swiperIsTop && (swiperTopDateType != '0' && swiperTopDateType != '1')) || (
				swiperTopDateType == '0' || swiperTopDateType == '1'))
			return topContentBoxNeedHide;
		},

		topContentBoxIsLockHeight() {
			let swiperTopDateType = this.swiperTopDateType;
			return (swiperTopDateType != '0' && swiperTopDateType != '1');
		}
	},
	mounted() {
		//TODO 没有左右滑动的需求 不要用swiper去实现了咯
		//#ifdef H5
		// document.getElementById('body_liuhe_index_02').addEventListener('touchmove', function (event) {
		//     event.preventDefault()
		// }, { passive: false })
		// document.getElementsByClassName('uni-swiper-slide-frame')[1].addEventListener('touchmove', function (event) {
		//     event.stopPropagation()
		// })
		// document.body.addEventListener('touchmove' , function(e){
		//     var e=e||window.event;
		//     e.preventDefault();
		// },{ passive: false })
		//#endif
		let _this = this;
		this.$nextTick(() => {
			_this.$refs.categories.updateCatagorysTopStatus(true);
		});
	},
	methods: {
		gameBack() {
			if (this.$config.station === 'LIUHE') {
				uni.reLaunch({
					url: "/"
				});
				return;
			}
			uni.reLaunch({
				url: "/pages/liuhe/home/index"
			});
			return;
			const pages = getCurrentPages();
			const prePage = pages[pages.length - 2];
			if (prePage) {
				backPage();
			} else {
				const backUrl = uni.getStorageSync("bannerOpenUrl");
				if (backUrl) {
					uni.removeStorageSync("bannerOpenUrl");
					// uni.redirectTo({
					// 	url: backUrl
					// })
					location.href = "/#/" + backUrl
					return;
				}
				// location.go(-1);
				window.history.go(-1)
			}
		},
		jump(res) {
			const item = this.swiperData[res];
			if (item && item.jumpUrl) {
				this.$nativeBridge.openUrl(item.jumpUrl);
				//#ifdef APP-PLUS
				plus.runtime.openURL(item.jumpUrl)
				//#endif
			}
		},
		scroll({
			detail: {
				scrollTop,
				height
			}
		}) {
			let that = this;
			if (!this.swiperIsTop && this.nowCurrentDataType != '0' && this.nowCurrentDataType != '1') {
				clearTimeout(this.testTimer);
				this.testTimer = setTimeout(function () {
					that.scrollTop = scrollTop;
					that.memscrollTop = scrollTop
					that.is_scrolltolower = false;

					clearTimeout(that.testTimer);
					that.testTimer = -1;
				}, 100);
			}
			// uni.$emit("on_liuhe_page_02_scroll");
			uni.$emit("emitCategoryElementScrollEventName");
		},
		scrolltolower() {
			setTimeout(() => {
				// this.is_scrolltolower = true
			}, 200);
		},
		_onShow() {
			this.activity = true;
			if (isLogin()) {
				this.getInit()
			}
			if (this.msg) {
				pop(this.msg, 2000)
				this.msg = ''
			}
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			setTimeout(() => {
				let that = this;
				let systemInfo = uni.getSystemInfoSync();
				let systemHeight = systemInfo.safeArea && systemInfo.safeArea['height'] ? systemInfo.safeArea[
					'height'] : systemInfo.height;
				that.$store.dispatch("updateWindowSize", {
					width: systemInfo.windowWidth,
					height: systemHeight
				});
			}, 1000)
		},
		_onHide() {
			this.activity = false;
		},
		_onLoad(option) {
			uni.hideTabBar()
			uni.$on('emitParams', data => {
				this.msg = data.msg
			})
			this.getAd()
			this.init_cp()
			if (option.isTest && isLogin()) {
				if (['sign', 'demo'].includes(this.$store.state.appInfoStore.userInfo.userType)) {
					this.$refs.testLogin.showPop()
				}
			} else if (option.isTest && !isLogin()) {
				this.testLogin()
			}
		},
		//试玩登录
		testLogin() {
			let _this = this;
			let sys = {}
			uni.getSystemInfo({
				success: function (res) {
					sys = res
				}
			})
			let prams = {
				deviceId: sys.deviceId,
				phoneType: sys.deviceType
			}
			demoLogin(prams).then(res => {
				if (res.code == 200) {
					this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
						res.result.user);
					this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN, res
						.result.token);
					this.$refs.testLogin.showPop()
					// this.isLogin = global.isLogin()
					// this.userInfo = res.result.user
					_this.$store.dispatch("initUserInfo");
					return false
				} else {
					pop(res.message, 2000)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		async getAd() {
			const res = await advertList({
				projectType: 2,
				code: 7
			})
			if (res.code !== 200) {
				pop(res.message, 2000)
				return
			}
			this.swiperData = res.result;
			this.swiperList = res.result.map(item => {
				return {
					image: item.img,
					title: item.name
				}
			})
		},
		async init_cp() {
			let that = this;
			cp_init().then(res => {
				that.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindCpDataSuccess, this);
				that.bindCpDataSuccess(res);
			})
		},
		bindCpDataSuccess(res) {
			let that = this;
			const {
				categoryList,
			} = defaultTemplate({
				categoryList: [],
			}, res.result);
			this.categoryList = categoryList;
      // 为2时用的category组件，有左右数据
      if (this.categoryList?.length && +this?.categoryList[0]?.dataType === 2) {
        this.categoryDataList = JSON.parse(JSON.stringify(res?.result?.categoryData?.left || []));
        this.categoryGameData = JSON.parse(JSON.stringify(res?.result?.categoryData?.right || {}));
      } else {
        this.categoryDataList = JSON.parse(JSON.stringify(res?.result?.categoryData || []));
      }
			this.$nextTick(function () {
				that.$emit("onInitDataSuccess");
			})
		},

		async getInit() {
			if (!isLogin()) {
				return
			}
			const res = await init()
			this.status = res.result.status;
			//如果有六合属性则刷新speedInfo
			this.$config.compriseLiuheStation() && this.$store.dispatch("updateUserInfoLiuheVip");
		},
		//判当类是否为整滚
		checkCurrentTypeScrollPage(current) {
			return current == '0' || current == '1';
		},

		onSwiperIsTopChange(isTop, currentType, forceTop) {
			if (forceTop) {
				this.scrollTop = 0;
			}
			this.swiperIsTop = isTop;
			this.swiperTopDateType = currentType;

		},
		onBeforeTabChange({
			isTop,
			currentDataType
		}) {
			if (!isTop) return;
			this.rememberScrollTops[currentDataType] = this.memscrollTop;
			//this.canScrollY=false;
		},

		onAfterTabChange(isTop, nowCurrentDataType) {

			let _this = this;
			this.nowCurrentDataType = nowCurrentDataType;
			this.lastScrollTopAfterAnimation = -1;
			if (isTop) {
				if (nowCurrentDataType == "0" || nowCurrentDataType == "1") {
					let top = this.rememberScrollTops[nowCurrentDataType];
					this.lastScrollTopAfterAnimation = top;
					if (!isNaN(top)) this.$nextTick(() => {
						_this.scrollTop = parseInt(top);
					})
				} else {
					if (!this.topContentHeight) {
						uni.createSelectorQuery().in(this).select(".top-content").boundingClientRect(res => {
							if (!res) return;
							_this.scrollTop = res.height;
							_this.topContentHeight = res.height;
						}).exec();
					} else {
						this.scrollTop = this.topContentHeight;
					}
				}
			}

			this.$nextTick(() => {
				//_this.canScrollY=true;
			})
		},
		onAfterTabAnimationFinished(isTop, nowCurrentDataType, seed) {
			// if(isTop)
			//     this.canScrollY=this.checkCurrentTypeScrollPage(nowCurrentDataType);
			// else
			//     this.canScrollY=true;
		}
	},
}
</script>
<style></style>
<style lang="scss" scoped>
#body_liuhe_index_02 {
	height: calc(100% + 1px);

}

::v-deep .category-swiper {
	margin-top: 0;
}

.top-content {
	margin-bottom: 20rpx;
}

.top-content-lock {
	position: relative;
	height: calc(328rpx + 137px);
	overflow: hidden;
	transition: 0.5s;
}

.top-content-lock-hide {
	position: relative;
	overflow: hidden;
	height: 0rpx !important;
	/*transition: 2s;*/
}

.top-animation-box {
	position: absolute;
	bottom: 0px;
	width: 100%;
	height: 100%;
}

::v-deep .swiper-item-content {
	padding-bottom: 20rpx !important;
}

.liuhe-index-02 {
	height: calc(100vh - 200rpx);
	// background: var(--theme-auxiliary-color-default);
	// background: #fff;
	/*padding-top: 24rpx;*/
	// padding-bottom: 124rpx;


	::v-deep .uni-scroll-view {
		border-radius: 30rpx;
		overflow: hidden;
	}

	::v-deep .category-swiper {
		padding-bottom: 60rpx;
	}

	.swiper {
		padding: 0 14px;
		/*background: #FFF;*/

		::v-deep {
			uni-swiper {
				height: 137px !important;
				border-radius: 10px;
				overflow: hidden;
			}

			.u-swiper-indicator {
				padding: 0 !important;
				bottom: 10px !important;
				width: calc(100% - 28px);

				.u-indicator-item-round {
					width: 14.4px;
					height: 3px;
					border-radius: 1.8px;
					background: linear-gradient(180deg, #FFF 9.60%, #91F4C0 53.12%, #C9FCE2 100%);
					box-shadow: 0px -0.5999995470046997px 0px 0px #ACEABE, 0px 0.5999995470046997px 2px 0px #74B295;
				}

				.u-indicator-item-round-active {
					width: 24px;
					border-radius: 1.8px;
					background: linear-gradient(180deg, #02FF7B 9.60%, #00B556 53.12%, #00E76E 86.98%);
					box-shadow: 0px 2.399998188018799px 2.399998188018799px 0px rgba(174, 254, 212, 0.30), 0px -0.5999995470046997px 0px 0px #D6FFE9, 0px 0.5999995470046997px 2px 0px #038943;
				}
			}
		}
	}
}
</style>
