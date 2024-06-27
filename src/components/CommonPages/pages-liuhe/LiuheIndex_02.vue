<template>
	<view id="body_liuhe_index_02" :class="['theme-' + themeColor.name]" :key="debugBoxBodyKey" :style="{ marginTop: safeHeight }">
		<scroll-view
			v-show="freshShow"
			:scroll-top="scrollTop"
			:scroll-with-animation="false"
			:scroll-y="canScrollY"
			class="liuhe-index-02"
			:class="{ 'scroll-is-top': swiperIsTop, ['theme-' + themeColor.name]: true }"
			@scroll="scroll"
			:style="{ backgroundColor: '#fff', height: `${uWindowHeight}px` }"
			@scrolltolower="scrolltolower"
			:refresher-enabled="false"
			:key="debugBoxBScrollKey"
		>
			<!-- backgroundColor: topContent ? '#fff' : themeColor.themeAuxiliaryColorDefault -->
			<view :style="{ backgroundColor: topContent ? '#fff' : themeColor.themeAuxiliaryColorDefault }">
				<view :class="{ 'top-content': true }">
					<view>
            <Header :onlyDownload="$config.station === 'LIUHE'"/>
						<uni-swiper-dot class="swiper-box" :info="swiperList" :current="swiperCurrentIndex" field="content" mode="default">
							<swiper :circular="true" :autoplay="true" :interval="swiperTimer" @change="changeSwiper" style="height: 274rpx">
								<swiper-item v-for="(item, index) in swiperList" :key="index">
									<view class="swiper-item" :id="'content-wrap' + index">
										<image
											v-if="swiperImgLoadList.includes(index)"
											class="swiper-item-image"
											mode="aspectFill"
											:src="item.image"
											@click="openLink(index)"
										></image>
									</view>
								</swiper-item>
							</swiper>
							<view class="online" v-if="onlineShow">
								{{ $t('components.CommonPages.pages-luntan.LuntanIndex_02.online') }}
								{{ $store.state.playingStore.onlineNum }}
							</view>
						</uni-swiper-dot>
						<view class="noticeBlock">
							<view class="notice_list">
								<!-- <filterIcon src="@/static/imgs-liuhe/index_02/blue/speaker.png" :width="48"
                  :height="48" /> -->
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<g clip-path="url(#clip0_104_44478)">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M5.26661 6.23786C8.90459 5.94174 16.5613 4.76574 18.0842 2.43067C19.9878 -0.488177 23.2873 0.780885 23.7315 5.03225C24.0897 8.46072 24.0893 12.3114 23.7315 15.7362C23.2873 19.9875 19.9878 21.2566 18.0842 18.3378C16.5613 16.0027 8.90459 14.8267 5.26661 14.5306V6.23786ZM8.56616 22.716C8.30015 22.3909 7.81386 21.6941 7.27402 20.9205C6.65492 20.0333 5.9654 19.0452 5.45696 18.4012C4.88588 17.6431 4.50516 16.7514 5.45696 16.7514C6.40875 16.7514 7.93163 17.3225 9.51796 18.8454C11.1043 20.3683 12.3099 22.716 11.8023 23.0967C11.2946 23.4775 9.13724 23.414 8.56616 22.716ZM3.68028 6.28167C1.64772 6.28167 0 7.92939 0 9.96195V10.5965C0 12.629 1.64772 14.2768 3.68028 14.2768V6.28167Z"
											:fill="themeColor.themeColor"
										/>
									</g>
									<defs>
										<clipPath id="clip0_104_44478">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
								<view class="noticeScroll">
									<!-- noticeList -->
									<NoticeScroll :list="noticeList" :key="'notice-' + noticeKey" :refName="'liuheNoticeRef'"></NoticeScroll>
								</view>
								<view class="btn" @click="goto('/pages/common/userCenter/service/index')">
									{{ $t('components.CommonPages.pages-liuhe.components.notice.text1') }}
								</view>
							</view>
						</view>
						<!-- <Notice :list="noticeList" :key="'notice-'+noticeKey" /> -->
						<UserOperation ref="userOperation" :status="status" />
					</view>
				</view>
				<view id="category_swiper_scroll">
					<CategorysSwiper
						id="category_swiper_body"
						ref="leftTabs"
						:scrolltolower="is_scrolltolower"
						:categoryList="categoryList"
            :categoryDataList="categoryDataList"
            :categoryGameData="categoryGameData"
            :scrollTop="scrollTop"
						v-on:onIsTopChange="onSwiperIsTopChange"
						v-on:afterTabChange="onAfterTabChange"
						v-on:beforeTabChange="onBeforeTabChange"
						v-on:afterTabAnimationFinished="onAfterTabAnimationFinished"
						:categorySwiperMarginTopRpxInIsTop="0"
						v-on:freshSwiperBoxParent="freshSwiperBoxParent"
						@initTabs="initTabs"
					/>
				</view>
			</view>
		</scroll-view>
		<view id="category_swiper_top"></view>
		<TestLogin ref="testLogin"></TestLogin>
		<AlertInjectLayer />
		<HomePop v-if="$config.station !== 'ALL' && homePopVisible" :popImageList="popImageList" />
	</view>
</template>

<script>
import Header from './components/header.vue';
import Notice from './components/notice.vue';
import UserOperation from './components/userOperation.vue';
import CategorysSwiper from './components/categorysSwiper';
import AlertInjectLayer from '@/components/common/alert/AlertInjectLayer.vue';
import TestLogin from '@/components/common/PopItem/TestLogin';
import NoticeScroll from '@/components/common/noticeScroll/index.vue';
import {bindStatus} from '@/utils/lottery/mine';
import {demoLogin} from '@/utils/common/index';
import {cp_init} from '@/utils/home/index.js';
import {mapGetters, mapMutations, mapState} from 'pinia';
import defaultTemplate from '@/utils/defaultTemplate';
import HomePop from '@/pages/liuhe/common/HomePop';
import AppInfoStore from "@/store/modules/appInfoStore";
import SystemInfoStore from "@/store/modules/systemInfoStore";
import preloadDataStore from "@/store/modules/preloadDataStore";
import usePreloadDataStore from "@/store/modules/preloadDataStore";

export default {
	components: {
		Header,
		Notice,
		UserOperation,
		CategorysSwiper,
		AlertInjectLayer,
		TestLogin,
		HomePop,
		NoticeScroll
	},
	props: {},
	watch: {
		scrollTop(v) {},
		swiperIsTop(newO, oldO) {
			this.$refs.leftTabs.positionLeft();
			if (this.swiperIsTop) {
				// document.querySelector(".tabsShow").style.display = "block";
				// document.querySelector(".tabsShow").style.zIndex = "6";
				// document.querySelector(".tabsa").style.zIndex = "4";
				// document.querySelector(".tabsShow").style.top = "0";
				// this.$nextTick(() => {
				// 	document.querySelector(".tabsShow").style.display = "none";
				// })
			} else {
				// document.querySelector(".tabsShow").style.display = "none";;
				// document.querySelector(".tabsShow").style.zIndex = "0";
				// document.querySelector(".tabsa").style.zIndex = "5";
				// document.querySelector(".tabsShow").style.top = "-1000px";
			}
		}
	},

	data() {
		return {
			popImageList: [],
			swiperData: [],
			noticeList: [],
			categoryList: [],
      // 左侧category数据列表
      categoryDataList: [],
      // 右侧game数据
      categoryGameData: {},
			scrollTop: 0,
			memscrollTop: 0,
			is_scrolltolower: true,
			msg: '',
			status: 0,
			swiperList: [],
			category: {},
			activity: false,
			swiperIsTop: false,
			swiperTopDateType: '0',
			topContentHeight: 0,
			nowCurrentDataType: '0',
			rememberScrollTops: {},
			canScrollY: true,
			lastScrollTopAfterAnimation: 0,
			testTimer: -1,
			lastTouchMoveY: -1,
			topBox: false,
			topContent: false,
			noticeKey: 1,
			freshShow: true,
			winHeight: 0,
			debugBoxBodyKey: 0,
			debugBoxBScrollKey: 0,
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + 'px',
			homePopVisible: false,
			dotsStyles: {
				//轮播图指示点样式
				width: 3,
				height: 3,
				bottom: 5,
				backgroundColor: 'rgba(235, 237, 240, 0.5)',
				border: '0px rgba(235, 237, 240, 0.5) solid',
				color: '#fff',
				selectedBackgroundColor: 'rgba(255, 255, 153, 0.9)',
				selectedBorder: '0px rgba(255, 255, 153, 0.9) solid'
			},
			// 当前轮播图下标
			swiperCurrentIndex: 0,
			// 轮播图加载完成的列表，默认加载第一张图
			swiperImgLoadList: [0],
			// swiper循环定时器
			swiperTimer: 5000
		};
	},
	computed: {
    ...mapState(AppInfoStore, ["themeColor", "webSiteConfig"]),
    ...mapState(SystemInfoStore, ["uWindowHeight"]),
		...mapState(usePreloadDataStore, ['liuhePreload']),
		isAllPaageScrollData() {
			let swiperTopDataType = this.swiperTopDateType;
			return false;
			// return (swiperTopDataType == '0' || swiperTopDataType == '1' || swiperTopDataType == '3' ||
			// 	swiperTopDataType == '4')
		},

		topContentBoxNeedHide() {
			let swiperIsTop = this.swiperIsTop;
			let swiperTopDateType = this.swiperTopDateType;
			let topContentBoxNeedHide = swiperIsTop && !this.isAllPaageScrollData;

			// !((!swiperIsTop && (swiperTopDateType != '0' && swiperTopDateType != '1' &&
			// 		swiperTopDateType != '3' && swiperTopDateType != '4')) || (
			// 		swiperTopDateType == '0' || swiperTopDateType == '1' || swiperTopDateType == '3' ||
			// 		swiperTopDateType == '4'));

			this.topBox = topContentBoxNeedHide;
			this.topContent = swiperIsTop;
			if (topContentBoxNeedHide) this.noticeKey++;
			return topContentBoxNeedHide;
		},

		topContentBoxIsLockHeight() {
			let swiperTopDateType = this.swiperTopDateType;
			// return (swiperTopDateType != '0' && swiperTopDateType != '1');
			return true;
		},

		onlineShow() {
			return this.webSiteConfig?.website_online_switch === 1;
		}
	},
	mounted() {
		this.winHeight = uni.getSystemInfoSync().windowHeight;
		uni.onWindowResize(() => {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		});

	},
	methods: {
    initTabs() {
    },
		goto(url) {
			uni.navigateTo({
				url
			});
		},
		//广告图切换事件
		changeSwiper(e) {
			this.swiperCurrentIndex = e.detail.current;
			this.loadCurrentAndGetNextSwiperImage(this.swiperCurrentIndex);
		},
		// 懒加载轮播图，获取轮播图当前图片并加载下一张图片
		loadCurrentAndGetNextSwiperImage(index) {
			if (!this.swiperImgLoadList.includes(index)) {
				this.swiperImgLoadList.push(index);
			}
			// 下一张图片
			let tempNext = index + 1;
			if (tempNext === this.swiperList.length) {
				tempNext = 0;
			}
			if (!this.swiperImgLoadList.includes(tempNext)) {
				// 如果未加载, 3秒后加载下一张图片
				setTimeout(() => {
					this.swiperImgLoadList.push(tempNext);
				}, this.swiperTimer - 1000);
			}
		},
		// 跳转
		openLink(index) {
			const item = this.swiperData[index];
			if (+item.jumpType === 1) {
				uni.reLaunch({
					url: item.jumpUrl
				});
			} else {
				this.$nativeBridge.openUrl(item.jumpUrl);
			}
		},
		scroll({ detail: { scrollTop, height } }) {
			let that = this;
			if (!this.swiperIsTop) {
				// if (!this.swiperIsTop && this.nowCurrentDataType != '0' && this.nowCurrentDataType != '1') {
				clearTimeout(this.testTimer);
				this.testTimer = setTimeout(function () {
					that.scrollTop = scrollTop;
					that.memscrollTop = scrollTop;
					that.is_scrolltolower = false;

					clearTimeout(that.testTimer);
					that.testTimer = -1;
					that.freshShow = false;
					that.$nextTick(() => {
						that.freshShow = true;
					});
				}, 100);
			}
			if (!this.swiperIsTop || this.isAllPaageScrollData) {
				this.$refs.leftTabs && !this.$refs.leftTabs.onEmit('on_liuhe_page_02_scroll', scrollTop);
			}
		},
		scrolltolower() {
			setTimeout(() => {
				// this.is_scrolltolower = true
			}, 200);
		},
		_onShow() {
			this.$store.dispatch('initDetailInfo');
			let that = this;
			this.noticeKey++;
			this.activity = true;
			if (isLogin()) {
				this.getInit();
			}
			if (this.msg) {
				pop(this.msg, 2000);
				this.msg = '';
			}

			//测试兼容IOS 部分设备重新打开后自动回滚到顶部的设定
			setTimeout(() => {
				that.$nextTick(() => {
					that.onAfterTabChange(that.swiperIsTop, that.nowCurrentDataType);
				});
			}, 100);
			setTimeout(() => {
				let that = this;
				let systemInfo = uni.getSystemInfoSync();
				let systemHeight = systemInfo.safeArea && systemInfo.safeArea['height'] ? systemInfo.safeArea['height'] : systemInfo.height;
				that.$store.dispatch('updateWindowSize', {
					width: systemInfo.windowWidth,
					height: systemHeight
				});
			}, 1000);
			this.$refs.userOperation.freshUserBanlance(); //游戏返回后，刷新用户余额
		},
		_onHide() {
			this.activity = false;
		},
		_onLoad(option) {
      // init方法在这里删除，APP.vue里预加载了接口请求，这里只做数据回调处理
      uni.$on("preloadLiuheHomeData", res => {
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindDataSuccess, this);
        this.bindDataSuccess(res);
      });
			this.init();
			uni.hideTabBar();
			uni.$on('emitParams', (data) => {
				this.msg = data.msg;
			});
			if (option.isTest && isLogin()) {
				if (['sign', 'demo'].includes(this.$store.state.appInfoStore.userInfo.userType)) {
					this.$refs.testLogin.showPop();
				}
			} else if (option.isTest && !isLogin()) {
				this.testLogin();
			}
			if (this.$config.station !== 'ALL') {
				uni.$emit('showPop', {
					refName: 'SaveH5',
					callback: ({ type }) => {
						if (type === 'close') {
							this.homePopVisible = true;
						}
					}
				});
			}
			this.loadCurrentAndGetNextSwiperImage(this.swiperCurrentIndex);
		},
		async init() {
			let _this = this;
			cp_init().then((res) => {
				_this.$requestCache.bindLastCacheUpdateApiCallBack(res, this.bindDataSuccess, this);
				_this.bindDataSuccess(res);
			});
		},
		bindDataSuccess(res) {
      const {popImageList, advertList, noticeList, categoryList} = defaultTemplate(
				{
					popImageList: [],
					advertList: [],
					noticeList: [],
					categoryList: [],
				},
				res.result
			);
			this.popImageList = popImageList;
			this.swiperData = advertList;
			this.swiperList = advertList.map((item) => {
				return {
					image: item.img,
					title: item.name
				};
			});
			this.noticeList = noticeList.map((item) => item.noticeContent.replace(/\n/g, ''));
			this.categoryList = categoryList;
      // 为2时用的category组件，有左右数据
      if (this.categoryList?.length && +this?.categoryList[0]?.dataType === 2) {
        this.categoryDataList = JSON.parse(JSON.stringify(res?.result?.categoryData?.left || []));
        this.categoryGameData = JSON.parse(JSON.stringify(res?.result?.categoryData?.right || {}));
      } else {
        this.categoryDataList = JSON.parse(JSON.stringify(res?.result?.categoryData || []));
      }
		},

		//试玩登录
		testLogin() {
			let _this = this;
			let sys = {};
			uni.getSystemInfo({
				success: function (res) {
					sys = res;
				}
			});
			let prams = {
				deviceId: sys.deviceId,
				phoneType: sys.deviceType
			};
			demoLogin(prams)
				.then((res) => {
					if (res.code == 200) {
						uni.setStorageSync('userInfo', res.result.user);
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN, res.result.token);
						this.$refs.testLogin.showPop();
						// this.isLogin = global.isLogin()
						// this.userInfo = res.result.user
						_this.$store.dispatch('initUserInfo');
						return false;
					} else {
						pop(res.message, 2000);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async getInit() {
			if (!isLogin()) {
				return;
			}
			const res = await bindStatus();
			this.status = res.result?.status || 0;
			//如果有六合属性则刷新speedInfo
			this.$config.compriseLiuheStation() && this.$store.dispatch('updateUserInfoLiuheVip');
		},
		//判当类是否为整滚
		checkCurrentTypeScrollPage(current) {
			// return current == '0' || current == '1';
			return false;
		},

		onSwiperIsTopChange(isTop, currentType, forceTop) {
			if (forceTop && !this.isAllPaageScrollData) {
				this.scrollTop = 0;
			}
			this.swiperIsTop = isTop;
			this.swiperTopDateType = currentType;

			/**
			 * 此处暂时没做环境判断
			 */

			this.freshSwiperBoxParent();
		},
		absolutTabs() {
			let element = document.querySelector('.tabsa');
			element.style.position = 'absolute';
			if (document.querySelector('#body_liuhe_index_02') == element.parentNode) {
				document.querySelector('#body_liuhe_index_02').removeChild(element);
				document.querySelector('.tabs_block').appendChild(element);
			}
		},
		freshSwiperBoxParent() {
			let isAllPageScroll = false;
			if (this.isAllPaageScrollData) isAllPageScroll = true;

			if (this.$refs.leftTabs && !this.$refs.leftTabs.getUseTabsFollowPageScrollElemetSelector()) {
				if (this.swiperIsTop) {
					let element = document.querySelector('.tabsa');
					element.style.position = 'fixed';
					if (document.querySelector('.tabs_block') == element.parentNode) {
						document.querySelector('.tabs_block').removeChild(element);
						document.querySelector('#body_liuhe_index_02').appendChild(element);
					}
				} else {
					let element = document.querySelector('.tabsa');
					element.style.position = 'absolute';
					if (document.querySelector('#body_liuhe_index_02') == element.parentNode) {
						document.querySelector('#body_liuhe_index_02').removeChild(element);
						document.querySelector('.tabs_block').appendChild(element);
					}
				}
			}

			if (isAllPageScroll) {
				let element = document.getElementById('category_swiper_body');
				if (document.getElementById('category_swiper_top') == element.parentNode) {
					document.getElementById('category_swiper_top').removeChild(element);
					document.getElementById('category_swiper_scroll').appendChild(element);
				}
			} else {
				let element = document.getElementById('category_swiper_body');
				if (this.swiperIsTop) {
					if (document.getElementById('category_swiper_scroll') == element.parentNode) {
						document.getElementById('category_swiper_scroll').removeChild(element);
						document.getElementById('category_swiper_top').appendChild(element);
					}
				} else {
					if (document.getElementById('category_swiper_top') == element.parentNode) {
						document.getElementById('category_swiper_top').removeChild(element);
						document.getElementById('category_swiper_scroll').appendChild(element);
					}
				}
			}
		},

		onBeforeTabChange({ isTop, currentDataType }) {
			this.swiperTopDateType = currentDataType;
			this.freshSwiperBoxParent();
			if (!isTop) return;
			this.rememberScrollTops[currentDataType] = this.memscrollTop;
		},

		onAfterTabChange(isTop, nowCurrentDataType) {
			let _this = this;
			this.nowCurrentDataType = nowCurrentDataType;
			this.lastScrollTopAfterAnimation = -1;
			if (isTop) {
				if (!this.topContentHeight) {
					try {
						uni.createSelectorQuery()
							.in(this)
							.select('.top-content')
							.boundingClientRect((res) => {
								if (!res) return;
								_this.scrollTop = res.height;
								_this.topContentHeight = res.height;
							})
							.exec();
					} catch (e) {
						console.warn(e);
					}
				} else {
					this.scrollTop = this.topContentHeight + Math.random();
				}
			}

			if (nowCurrentDataType == '3' || nowCurrentDataType == '4') {
				// this.freshSwiperBoxParent()
				// this.absolutTabs();
			}
			this.$nextTick(() => {
				//_this.canScrollY=true;
			});
		},
		onAfterTabAnimationFinished(isTop, nowCurrentDataType, seed) {
			// if(isTop)
			//     this.canScrollY=this.checkCurrentTypeScrollPage(nowCurrentDataType);
			// else
			//     this.canScrollY=true;
		},

		async testClick() {
			this.$nativeBridge.doGetNativeCallHandler(
				'getWindowBottom',
				'getWindowBottomCallback',
				(response) => {
					//alert("调回" + response);
				},
				this
			);
			this.$nativeBridge.on(
				'getWindowBottomCallback',
				function (data) {
					//alert("监回成" + data);
				},
				this,
				false,
				false
			);
			// let response = await  this.$nativeBridge.doAwaitGetNativeCallHandler("getWindowBottom",'getWindowBottomCallback');
		}
	}
};
</script>
<style>
.fixedTabs {
	position: fixed;
}
</style>
<style lang="scss" scoped>
$swiper-size: 14rpx;
$swiper-active-width: 40rpx;
::v-deep .uni-swiper__dots-item {
	width: $swiper-size !important;
	height: $swiper-size !important;
	border-radius: calc(#{$swiper-size} / 2) !important;
	background: rgba(0, 0, 0, 0.5) !important;
	background-color: rgba(0, 0, 0, 0.5) !important;
	box-shadow: none;
	transition: all .3s;
	flex-shrink: 0;
	/*border-radius: 1px !important;*/
}
::v-deep .uni-swiper__selected {
	/*width: 48rpx !important;*/
	/*background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
	/*border-radius: 1px !important;*/
	width: $swiper-active-width !important;
	height: $swiper-size;
	border-radius: calc(#{$swiper-size} / 2) !important;
	background: white !important;
}
.btn {
	flex-shrink: 0;
	width: 116rpx;
	height: 48rpx;
	box-sizing: border-box;
	line-height: 32rpx;
	padding: 8rpx 10rpx;
	border-radius: 10rpx;
	background: var(--theme-color);
	color: #fff;
	font-size: 24rpx;
	font-weight: 500;
	/*display: grid;*/
	place-items: center;
}

.noticeBlock {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	width: 100%;
	background-color: #fff;
	padding: 0 28rpx;

	.notice_list {
		padding: 20rpx 0;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--theme-auxiliary-color-default);
		width: 100%;

		.noticeScroll {
			width: calc(100% - 200rpx);
			min-width: calc(100% - 200rpx);
		}
	}
}

.scroll-is-top {
	::v-deep .uni-scroll-view {
		-webkit-overflow-scrolling: touch;
	}
}

#body_liuhe_index_02 {
	height: calc(100%);
	position: relative;
}

#category_swiper_top {
	position: absolute;
	top: 0px;
	width: 100%;
	max-width: var(--maxWidth);
}

.top-content {
}

.top-content-lock {
	position: relative;
	height: calc(328rpx + 137px);
	/*overflow: hidden;*/
	transition: 0.5s;
}

.top-content-lock-hide {
	position: relative;
	// overflow: hidden;
	height: 0rpx !important;

	// display: none;
	/*transition: 2s;*/
	.swiper-box {
		// height: 0 !important;
		display: none;
	}
}

.top-animation-box {
	position: absolute;
	bottom: 0px;
	width: 100%;
	height: 100%;
}

.liuhe-index-02 {
	// height: calc(var(--vh));

	/*height: calc(var(--vh) - 100px);*/
	-webkit-overflow-scrolling: auto;
	background: #fff;
	// background: var(--theme-auxiliary-color-default);

	.swiper-box {
    background-color: #fff;
		position: relative;

		.swiper-item {
			height: 100%;
			display: flex;
			justify-content: center;
      background-color: #fff;
			image {
				border-radius: 24rpx;
				width: calc(100% - 56rpx);
				height: 274rpx;
				margin: 0 auto;
				overflow: hidden;
			}
		}

		.swiper {
			padding: 0 28rpx;
			background: #fff;

			::v-deep {
				uni-swiper,
				uni-swiper .uni-swiper-wrapper {
					height: 137px !important;
					border-radius: 10px;
					overflow: hidden;
				}

				.u-swiper-indicator {
					padding: 0 !important;
					bottom: 10px !important;
					width: calc(100% - 28px);

					.u-indicator-item-round {
						width: 29rpx;
						height: 6rpx;
						background: linear-gradient(180deg, #fff 9.6%, var(--dot-bg-rgba) 53.12%, var(--dot-bg-rgba) 100%);
						/*background-color: rgba(0, 0, 0, 0.7) !important;*/
						box-shadow: none;
						transition: all 0.3s;
						flex-shrink: 0;
						border-radius: 1px;
					}

					.u-indicator-item-round-active {
						width: 24px;
						width: 48rpx !important;
						/*background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
						/*background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
						border-radius: 1px;
					}
				}
			}
		}

		.online {
			position: absolute;
			right: 48rpx;
			top: 10rpx;
			color: #404040;
		}
	}
}
</style>
