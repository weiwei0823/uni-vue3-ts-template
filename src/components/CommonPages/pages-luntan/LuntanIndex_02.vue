<template>
	<view class="mint-tab-container-item home-div"
		:style="{ backgroundColor: '#fff', marginTop: safeHeight, height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<LuntanIndexHeader :title="title" :lotterytype="lotterytype" />
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" show-scrollbar="true"
			:style="{ backgroundColor: '#f4f4f4', height: `calc(${uWindowHeight}px - 88rpx - ${downloadShow ? 70 : 0}rpx)` }"
			:scroll-with-animation="true" lower-threshold="700" @scrolltolower="lower" @scroll="scroll">
			<view class="" :style="{ backgroundColor: themeColor.themeAuxiliaryColorDefault }">
				<view class="header-box">
					<!--轮播图-->
					<uni-swiper-dot class="swiper-box" :info="listPicture" :current="current" field="content" mode="default">
						<swiper :circular="true" :autoplay="true" :interval="swiperTimer" @change="changeSwiper"
							style="height: 274rpx">
							<swiper-item v-for="(item, index) in listPicture" :key="index">
								<view class="swiper-item" :id="'content-wrap' + index">
									<image mode="aspectFill" v-if="swiperImgLoadList.includes(index)" :src="item.img"
										@click="openAd(item)"></image>
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
							<!-- <filterIcon src="/static/imgs-liuhe/index_02/blue/speaker.png" :width="48" :height="48" /> -->
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<g clip-path="url(#clip0_104_44478)">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M5.26661 6.23786C8.90459 5.94174 16.5613 4.76574 18.0842 2.43067C19.9878 -0.488177 23.2873 0.780885 23.7315 5.03225C24.0897 8.46072 24.0893 12.3114 23.7315 15.7362C23.2873 19.9875 19.9878 21.2566 18.0842 18.3378C16.5613 16.0027 8.90459 14.8267 5.26661 14.5306V6.23786ZM8.56616 22.716C8.30015 22.3909 7.81386 21.6941 7.27402 20.9205C6.65492 20.0333 5.9654 19.0452 5.45696 18.4012C4.88588 17.6431 4.50516 16.7514 5.45696 16.7514C6.40875 16.7514 7.93163 17.3225 9.51796 18.8454C11.1043 20.3683 12.3099 22.716 11.8023 23.0967C11.2946 23.4775 9.13724 23.414 8.56616 22.716ZM3.68028 6.28167C1.64772 6.28167 0 7.92939 0 9.96195V10.5965C0 12.629 1.64772 14.2768 3.68028 14.2768V6.28167Z"
										:fill="themeColor.themeColor" />
								</g>
								<defs>
									<clipPath id="clip0_104_44478">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<view class="noticeScroll">
								<NoticeScroll :list="noticeList" key="luntanNotice"></NoticeScroll>
							</view>

						</view>
					</view>
				</view>
				<!--滚动条消息-->
				<!--开奖号位置-->
				<view class="block-lottery">
					<ul class="platform-list">
						<view v-for="(item, index) in sortLotteryTypeTabs" :key="item.sortIndex" class="item-body" :class="{
							'act': lotterytype == item.lotteryType,
							'last-item': index === sortLotteryTypeTabs.length - 1 && lotterytype == item.lotteryType,
							'first-item': index === 0 && lotterytype == item.lotteryType
						}" :data-inline="sortLotteryTypeTabs.length <= 2" @click="cutover(item, index)">
							<view class="title">{{ item.lotteryName }}</view>
							<view class="time"><span>{{ item.lotteryTimeMilli | getTime }}</span></view>
						</view>
					</ul>
					<view class="border-box">
						<view class="border-box-body" :class="'border-box-body-' + themeColor.name" v-if="lastLottery">
							<lottery :lotteryDetail="lastLottery" :listStyle="{}" :listenNumberListAction="true" live
								:lotteryType="lotterytype" v-on:httpAync="homeAsync" isHttpAsync>
								<template v-slot:header></template>
								<template v-slot:lottery></template>
								<template v-slot:footer></template>
							</lottery>
						</view>
					</view>
				</view>
				<!--导航-->
				<template
					v-if="!$config.configUIMgr.checkPageElementIsHide($config.enumMgr.PAGE_VERSION_ELEMENT_HIDE_KEY.EL_LUNTAN_INDEX_02_CATEGORY_01)">
					<view class="category-tr">
						<view class="category-icon van-row">
							<view class="item-line" v-for="(menu, i) in menulist" :key="i">
								<view v-for="(item, index) in menu" :key="index" class="item" @click="tiaozhuan(item)">
									<image :src="item.icon" style="width: 68rpx; height: 68rpx;"></image>
									<view class="text">{{ item.text }}</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			<BodyImage ref="BodyImage" style="padding-bottom: 120rpx;" :scrollTop="indexScrollTop"
				:luntanLoading="luntanLoading" :nomore="nomore" />
			<view class="" style="width:100%;height:100rpx;"> </view>
			<view style="clear: both"></view>

		</scroll-view>
		<BackTop :scrollTop.sync="scrollTop" />
		<!--底部彩种-->
		<view class="ft-icon-text" :class="`ft-icon-text-${$config.station}`"
			v-if="webSiteConfig.website_home_platform_switch === 1">
			<LotteryTypeTab :showTypeImage="lotteryTime.length <= 4" :lotteryTime="lotteryTime" :lotteryType="lotterytype"
				@onTabClick="cutover" />
		</view>
		<view style="height: 51px;">
			<component :is="componentTabbar" current="0" />
		</view>
		<!--悬浮菜单栏-->
		<fab></fab>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<HomePop :popImageList="popImageList" v-if="homePopVisible" />
		<AlertInjectLayer />
	</view>
</template>
<script>
import BackTop from '@/components/common/BackTop.vue';
import TabBarLuntan from '@/components/Tabbar/Luntan'
import TabBarAll from "@/components/common/tabbar/TabBar";
import NavBar from "@/components/common/navBar/navBar.vue";
import Fab from "@/components/common/fab/Fab";
import Lottery from '@/components/common/lottery/Lottery'
import Empty from '@/components/common/empty/empty'
import Login from "@/components/common/login/Login";
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import Placard from "@/components/common/placard/placard";
import NoticeScroll from "@/components/common/noticeScroll/index.vue"
import LotteryTypeTab from "@/components/common/luntan/LotteryTypeTab.vue";
import HomePop from "@/pages/liuhe/common/HomePop";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import lazyImage from '@/components/lazy-image/index.vue'
import LuntanIndexHeader from "./LuntanIndexHeader.vue";
import BodyImage from './BodyImage.vue';

import { list, lt_init } from '@/utils/home/index.js';
import { lastLotteryRecord, lastLotteryRecordWithCalculate } from "@/utils/lottery/index.js"
import { concern } from '@/utils/user/index.js'
import { config } from '@/config/config'
import { mapGetters } from 'pinia';

export default {
	name: "LuntanIndex02",
	components: {
		BackTop,
		AlertInjectLayer,
		TabBarLuntan,
		TabBarAll,
		Fab,
		Lottery,
		Empty,
		Login,
		cusPreviewImg,
		NavBar,
		Placard,
		HomePop,
		lazyImage,
		LuntanIndexHeader,
		BodyImage,
		NoticeScroll,
		LotteryTypeTab
	},
	data() {
		return {
			popImageList: [],
			componentTabbar: 'TabBarAll',
			componentTabbarMap: {
				'ALL': 'TabBarAll',
				'LUNTAN': 'TabBarLuntan'
			},
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			current: 0,
			scrollTop: 0,
			title: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.sixGallery'),
			swiperHeight: 180,
			old: {
				scrollTop: 0,
				myScroll: 0,
			},
			navHeight: 0,
			curr: 0,
			isTop: 0, //吸附判断
			status: 'more', //触底加载状态
			page: 1, //记录当前页码
			lotterytype: 2, //彩票默认选中项
			lotteryType: 2,
			isLoadMore: false, //是否加载中
			nomore: false,
			//公告
			noticeList: [],
			//轮播图
			listPicture: [],
			//彩票类型
			lotteryTime: [],
			//菜单栏
			menulist: [
				[{
					icon: '/static/img/index/kaijiangxianchang.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.liveDraw'),
					// #ifdef APP-PLUS
					url: '/pages/luntan/applive/Live', //打包app解开此行注释
					// #endif
					// #ifdef H5
					url: '/pages/luntan/live/Live', //打包h5解开此行注释
					// #endif
					type: 1,
				},
				{
					icon: '/static/img/index/jiaoliudating.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.masterForum'),
					url: '/pages/luntan/masterForum/index',
					type: 1,
				},
				{
					icon: '/static/img/index/ziliaodaquan.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.dataCollection'),
					url: '/pages/luntan/dataCollection/Index/Index',
					type: 1,
				},
				{
					icon: '/static/img/index/chaxunzhushou.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.queryAssistant'),
					url: '/pages/luntan/queryHelper/index',
					type: 1,
				},
				],
				[{
					icon: '/static/img/index/ymjc.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.humorousGuess'),
					url: '/pages/luntan/humorousGuessing/index',
					type: 1,
				},
				{
					icon: '/static/img/index/liuhetuku.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.sixGallery'),
					url: '/pages/luntan/liuhePicture/index?show=1',
					type: 1,
				},
				{
					icon: '/static/img/index/zixuntongji.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.infoStats'),
					url: '/pages/common/informationCount/liuhe',
					type: 1,
				},
				{
					icon: '/static/img/index/gongjubaoxiang.svg',
					text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.toolbox'),
					url: '/pages/luntan/toolBox/index',
					type: 1,
				},
				]
			],
			sortList: [this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.comprehensive'), this.$t(
				'components.CommonPages.pages-luntan.LuntanIndex_02.essence'), this.$t(
					'components.CommonPages.pages-luntan.LuntanIndex_02.mostLikes'), this.$t(
						'components.CommonPages.pages-luntan.LuntanIndex_02.newest')],
			navList: [{
				lotteryType: 0,
				name: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.all')
			},
			{
				lotteryType: 2,
				name: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.australiaLottery')
			},
			{
				lotteryType: 1,
				name: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.hongKongLottery')
			},
			{
				lotteryType: 3,
				name: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.taiwanLottery')
			},
			{
				lotteryType: 4,
				name: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.newLottery')
			}
			],
			sort: 0,
			//列表
			leftArr: [],
			rightArr: [],
			list: [],
			ImgList: [],
			//开奖信息
			lastLottery: {}, //最后一次开奖信息
			indexScrollTop: 0,
			dicListPictureId: {},
			luntanLoading: false,
			hideTop: false,
			topTrue: false,
			winHeight: 0,
			homePopVisible: false,
			// 轮播图加载完成的列表，默认加载第一张图
			swiperImgLoadList: [0],
			// swiper循环定时器
			swiperTimer: 5000
		}
	},
	computed: {
		...mapGetters(["webSiteConfig", "themeColor", "uWindowHeight", 'downloadShow']),
		onlineShow() {
			return this.webSiteConfig.website_online_switch
		},
		sortLotteryTypeTabs() {
			let buildAr = [];
			for (let key in this.lotteryTime) {
				let lotteryInfo = this.lotteryTime[key];
				let copyLotteryInfo = Object.assign({}, lotteryInfo);
				copyLotteryInfo.sortIndex = this.$config.lotterTimesTabsSort && Array.isArray(this.$config.lotterTimesTabsSort) ? this.$config.lotterTimesTabsSort.indexOf(Number(copyLotteryInfo.lotteryType)) : 0;
				buildAr.push(copyLotteryInfo);
			}
			return buildAr;
		}
	},
	methods: {
		homeAsync: function () {
			let prams = {
				lotteryType: this.lotterytype
			}
			lastLotteryRecordWithCalculate(prams).then((res) => {
				if (!res?.result) return;
				let data = res.result;
				this.lastLottery = data;
				this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery))
			})
		},
		_onLoad() {
			this.componentTabbar = this.componentTabbarMap[config.station || 'ALL']
			let _this = this;
			this.luntanLoading = true;
			// init方法在这里删除，APP.vue里预加载了接口请求，这里只做数据回调处理
			uni.$on("preloadLuntanHomeData", res => {
        this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
          this.doUpdateUiAfterInited(netResp);
        }, this);
				this.doUpdateUiAfterInited(res);
			});
			this.init();
			this.getSystem();
			this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE, 2);
			this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this
				.lotterytype);
			this.$nextTick(() => {
				this.setSwiperHeight();
			});
			this.loadCurrentAndGetNextSwiperImage(this.current);
			this.listLatest();
			this.$refs?.BodyImage.clear();
			uni.$off("on-homepage-freshbyconfig");
			uni.$on("on-homepage-freshbyconfig", () => {
				_this.freshUIByConfigData();
			});
			this.freshUIByConfigData();
			// 首页暂缓渲染弹窗，做延迟1秒处理
			setTimeout(() => {
				uni.$emit('showPop', {
					refName: 'SaveH5',
					callback: ({ type }) => {
						if (type === "close") {
							this.homePopVisible = true;
						}
					}
				});
			}, 1000);
		},
		_onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight + 30;
			uni.hideTabBar()
			this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE, 2);
		},
		//从 服务器读取config 信息之后刷新页面
		freshUIByConfigData() {
			let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG);
			if (!configData) return console.warn("config data is not loaded");
			configData.forEach((item) => {
				if (item.type == 21) {
					this.title = item.url
					uni.setNavigationBarTitle({
						title: this.title
					});
				}
			})
		},


		//获取设备信息
		getSystem() {
			uni.getSystemInfo().then(res => {
				uni.$system = res[1];
			})
		},
		bindSee(status = 0) {
			if (status == 1) {
				this.setCache('bindSee', 1, 60 * 60 * 1000);
			}
			this.$refs.placard.close()
		},
		/**
		 *
		 * @param {缓存key} key
		 * @param {需要存储的缓存值} value
		 * @param {过期时间，默认0表示永久有效} expire
		 */
		setCache(key, value, expire = 0) {
			let obj = {
				data: value, //存储的数据
				time: Date.now() / 1000, //记录存储的时间戳
				expire: expire //记录过期时间，单位秒
			}
			uni.setStorageSync(key, JSON.stringify(obj))
		},
		/**
		 *
		 * @param {缓存key} key
		 */
		getCache(key) {
			let val = uni.getStorageSync(key)
			if (!val) {
				return null
			}
			val = JSON.parse(val)
			if (val.expire && Date.now() / 1000 - val.time > val.expire) {
				uni.removeStorageSync(key)
				return null
			}
			return val.data
		},
		openAd(item) {
			openUrl(item)
		},
		init() {
			let prams = {
				lotteryType: this.lotterytype
			}
			this.luntanLoading = true;
			lt_init(prams).then((res) => {
				this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
					this.doUpdateUiAfterInited(netResp);
				}, this);
				this.doUpdateUiAfterInited(res);
			}).catch(err => {
				this.luntanLoading = false;
				console.log(err);
			})
		},
		doUpdateUiAfterInited(res) {
			if (!res?.result) return;
			let data = res.result;
			this.popImageList = data.popImageList;
			this.noticeList = data.noticeList.map(item => item.noticeContent.replace(/\n/g, ""));
			this.listPicture = data.advertList;
			let lotteryTime = data.lotteryTimeList;
			if (lotteryTime.length >= 2 && lotteryTime[0].lotteryType == 1) {
				let tm1 = lotteryTime[0];
				lotteryTime[0] = lotteryTime[1];
				lotteryTime[1] = tm1;
			}
			this.lotteryTime = lotteryTime;
			if (this.lotteryTime.length >= 1) {
				let memLotteryId = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, 2);
				let inLottery = this.lotteryTime.find((item) => {
					return item.lotteryType == memLotteryId;
				})
				if (!inLottery) {
					this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this.lotteryTime[0].lotteryType);
					this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this.lotteryTime[0].lotteryType);
				}
			}

			this.$refs.BodyImage.clear();
			this.setArr(data?.listPicture || []);
			this.lastLottery = data.lastLotteryRecord;
			this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LASTLOTTERY, this.lastLottery);
			this.luntanLoading = false;
			this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery));
		},

		setArr(data) {
			this.isLoadMore = false;
			if (!data.length) {
				this.nomore = true;
				return
			}
			this.$refs.BodyImage.complete(data);
		},
		GetList: function () {
			if (this.isLoadMore || this.nomore) return;
			this.luntanLoading = true
			let prams = {
				pageNum: this.page,
				lotteryType: this.lotterytype
			}
			this.isLoadMore = true
			list(prams).then((res) => {
				this.luntanLoading = false
				this.setArr(res?.result?.records || [])
			}).catch(err => {
				console.log(err)
			})
		},
		//信息
		xinxi: function () {
			uni.navigateTo({
				url: '/pages/liuhe/notice/index',
			})
		},
		//选择彩票
		selectLottery: function (item) {
			this.lotteryType = item.lotteryType
			this.page = 1;
			this.list = [];
			this.dicListPictureId = {};
			// this.listLatest()
		},
		selectSort: function (index) {
			this.sort = index
			this.page = 1;
			this.list = [];
			this.dicListPictureId = {};
			// this.listLatest()
		},
		//开奖信息
		lastLotteryRecord: function () {
			let prams = {
				lotteryType: this.lotterytype
			}
			lastLotteryRecord(prams).then(res => {
				this.lastLottery = res.result
			}).catch(err => {
				console.log(err)
			})
		},
		listLatest: function () {
			// let prams = {
			// 	lotteryType: this.lotteryType,
			// 	type: 3,
			// 	sort: this.sort,
			// 	speak: 0,
			// 	pageNum: this.page,
			// 	pageSize: 10
			// }
			// listLatest(prams).then(res => {
			// 	if (res.result.records.length > 0) {
			// 		this.list.push(...res.result.records)
			// 	}
			// 	this.isLoadMore = false
			// }).catch(err => {
			// })
		},
		detail: function (item) {
			const that = this
			item.read = 1
			uni.navigateTo({
				url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=' + item.type +
					"&createTime=" + item.createTime,
				success: function (res) {
					res.eventChannel.emit('argParams', {
						lotteryType: that.lotteryType
					})
				}
			})
		},
		//用户主页
		homepage: function (item) {
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
			})
		},
		lotteryName: function (lotteryId) {
			let lotteryName = ''
			this.lotteryTime.forEach((item, index) => {
				if (item.lotteryType == lotteryId) {
					lotteryName = item.name
					return
				}
			})
			return lotteryName
		},
		//关注接口
		concern: function (item) {
			let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN);
			if (!token) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				userId: item.userId
			}
			concern(prams).then(res => {
				uni.showToast({
					title: res.message,
					duration: 2000,
					icon: 'none'
				})
				if (res.code == 200) {
					item.concern = !item.concern
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			this.ImgList = imgList
			this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
		},
		//年跳转
		picture: function (item) {
			let url = "/pages/luntan/liuhePicture/index?year=" + item.year + "&color=" + item.color
			uni.navigateTo({
				url: url,
			})
		},
		//图库详情
		pictureDetail: function (item) {
			let url = "/pages/luntan/liuhePicture/detail?id=" + item.pictureId
			uni.navigateTo({
				url: url,
			})
		},
		//跳转方法
		tiaozhuan: function (item) {
			var lotterytype = this.lotterytype
			uni.navigateTo({
				url: item.url,
				success: function (res) {
					res.eventChannel.emit('argParams', {
						lotteryType: lotterytype,
					})
				}
			})
		},
		//跳转方法
		tiaozhuan1: function (item) {
			var lotterytype = this.lotterytype
			uni.navigateTo({
				url: item,
				success: function (res) {
					res.eventChannel.emit('argParams', {
						lotteryType: lotterytype,
					})
				}
			})
		},
		//切换彩种
		cutover: function (item, index) {
			this.scrollTop = 0;
			this.$refs.BodyImage.clear();
			this.page = 1;
			this.lotterytype = item.lotteryType;
			this.lotteryType = item.lotteryType;
			this.curr = index;
			this.init();
			this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this.lotteryType);
			this.page = 1;
			this.list = [];
			this.leftArr = [];
			this.rightArr = [];
			this.dicListPictureId = {};
		},
		//加载更多
		lower: function (e) {
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.page += 1
				this.GetList()
				// this.listLatest()
			}
		},
		//滚动条监听
		scroll: function (e) {
			if (e.detail.scrollTop == 0) {
				this.hideTop = true
			}
			if (e.detail.scrollTop >= 586) {
				this.hideTop = true
			} else {
				this.hideTop = false;
			}
			this.indexScrollTop = this.old.scrollTop = e.detail.scrollTop
			this.scrollTop = e.detail.scrollTop
			if ((this.old.scrollTop) >= this.old.myScroll) {
				this.isTop = 1
			} else {
				this.isTop = 0
			}
		},
		//轮播图事件
		changeSwiper(e) {
			this.current = e.detail.current;
			this.loadCurrentAndGetNextSwiperImage(this.current);
			//动态设置swiper的高度，使用nextTick延时设置
			/*this.$nextTick(() => {
				this.setSwiperHeight();
			});*/
		},
		// 懒加载轮播图，获取轮播图当前图片并加载下一张图片
		loadCurrentAndGetNextSwiperImage(index) {
			if (!this.swiperImgLoadList.includes(index)) {
				this.swiperImgLoadList.push(index);
			}
			// 下一张图片
			let tempNext = index + 1;
			if (tempNext === this.listPicture.length) {
				tempNext = 0;
			}
			if (!this.swiperImgLoadList.includes(tempNext)) {
				// 如果未加载, 3秒后加载下一张图片
				setTimeout(() => {
					this.swiperImgLoadList.push(tempNext);
				}, this.swiperTimer - 1000);
			}
		},
		//动态设置swiper的高度
		setSwiperHeight() {
			let element = "#content-wrap" + this.current;
			let query = uni.createSelectorQuery().in(this);
			query.select(element).boundingClientRect();
			query.exec((res) => {
				if (res && res[0]) {
					this.swiperHeight = res[0].height;
				}
			});
		},
	},
	beforeDestroy() {
		uni.$off("preloadLuntanHomeData");
	},
}
</script>

<style scoped>
::v-deep .back-top-icon {
	bottom: calc(180rpx + var(--safe-area-inset-bottom));
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
	color: #FFF;
	font-size: 24rpx;
	font-weight: 500;
	/*display: grid;*/
	place-items: center;
}

.home-div {
	/*height: 100vh;*/
	overflow: hidden;
}

.swiper-box {
	position: relative;
}

.swiper-box .online {
	position: absolute;
	right: 48rpx;
	top: 10rpx;
	color: #404040;
}

.header {
	height: 46px;
}

.scroll-Y {
	/* background-color: var(--theme-auxiliary-color-default) !important; */
}

.input-view {
	margin: auto;
	color: #323233;
	font-weight: 500;
	font-size: 16px;
}

.block-lottery {
	position: relative;
	padding: 20rpx 28rpx;
	border-radius: 24rpx;
	background: #FFF;
	margin: 20rpx 0;
}

.block-lottery .platform-list {
	background: #fff;
	display: flex;
	justify-content: space-between;
	border-radius: 24rpx 24rpx 0 0;
	height: 96rpx;
}

.block-lottery .platform-list .item-body {
	flex: 1;
	color: #404040;
}

.block-lottery .platform-list .item-body[data-inline='true'] {
	display: flex;
	vertical-align: center;
	align-items: center;
	justify-content: center;

	.title,
	.time {
		margin: 0rpx 10rpx;
	}
}

.block-lottery .platform-list .item-body.act {
	background: var(--theme-color);
	color: #fff;
}

.notic {
	margin-bottom: 0px;
	height: 60rpx;
	padding: 0 20rpx;
	font-size: 24rpx;
}

.block-lottery .platform-list .item-body {
	background: #fff;
	text-align: center;
	position: relative;
	border-radius: 24rpx 24rpx 0 0;
	padding: 12rpx 0;
}

.block-lottery .platform-list .item-body .title {
	font-size: 30rpx;
	font-weight: 400;
}

.block-lottery .platform-list .item-body .time {
	font-size: 24rpx;
	transform: translateZ(0);
}

.block-lottery .platform-list .item-body .time span {
	transform: scale(.9);
	white-space: nowrap;
	transform-origin: 180rpx 0;
	left: 0;
}

.block-lottery .border-box {
	background: #fff !important;
	padding: 0 !important;
	border-radius: 0 0 24rpx 24rpx;
}

.block-lottery .border-box .border-box-body {
	border: 4rpx solid var(--theme-color);
	background-color: #fff;
}

.border-box-body-blue {
	background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
}

.border-box-body-skyblue {
	background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
}

.border-box-body-green {
	background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
}

.border-box-body-ChineseRed {
	background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
}

.border-box .border-box-body {
	position: relative;
	background-size: 100% 100%;
	border-radius: 24rpx;
	height: fit-content;
	padding-bottom: 20rpx;
	box-sizing: border-box;
}

.category-tr {
	display: inline-block;
	height: auto;
	background: transparent;
	width: 100%;
	margin-bottom: 20rpx;
}

.category-icon {
	text-align: center;
	padding: 20rpx 28rpx;
	background: #fff;
	border-radius: 24rpx;
	width: 100%;
	box-sizing: border-box;
}

.category-icon .item-line {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
	height: 116rpx;
}

.category-icon .item-line:first-child {
	margin-top: 0;
}

.category-icon .item {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
}

.category-icon .item .text {
	color: #404040;
	font-size: 28rpx;
}

.van-col--6 {
	width: 25%;
}

.van-col {
	float: left;
	box-sizing: border-box;
	min-height: 1px;
	height: fit-content;
}

.icon-text {
	display: inline-block;
	text-align: center;
	position: relative;
}

.icon-text .text {
	margin-top: 10rpx;
	font-size: 28rpx;
	color: #404040;
}

.body-image {
	background: #fff;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	/* border-radius: 24rpx; */
}

.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.scroll-view-item_year {
	display: inline-block;
	width: 190rpx;
	text-align: center;
}

.van-sticky {
	background: #fff;
	padding-top: 10px;
}

.van-sticky .text {
	padding: 20rpx 0;
	font-size: 28rpx;
	color: #555;
}

.van-sticky--fixed {
	position: fixed;
	top: 46px;
	z-index: 2;
	max-width: 480px;
}

.van-sticky .gray {
	background: #d8d8d8 !important;
}

.van-sticky .icon-bg {
	width: 86rpx;
	height: 86rpx;
	background: #20d497;
	border-radius: 100%;
	text-align: center;
	display: inline-block;
	line-height: 112rpx;
	margin-bottom: 10rpx;
}

.van-list {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}

.van-list .image-item {
	width: 100%;
	text-align: center;
	border-radius: 12rpx 12rpx 0 0;
	overflow: hidden;
	position: relative;
	height: auto;
	display: inline-block;
	display: flex;
	flex-direction: column;
	line-height: 0.7;
	margin-bottom: 20rpx;
	background: #fff;

}

.van-list .image-item ::v-deep .origin-img {
	border-radius: 12rpx 12rpx 0 0 !important;
}

.van-list .image-item-title {
	border-radius: 0px 0px 12rpx 12rpx;
	background: var(--theme-auxiliary-color-default);
	padding: 20rpx;
	box-sizing: border-box;
	color: #404040;

	font-weight: 400;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 28rpx;
}

.ft-icon-text {
	display: flex;
	position: fixed;
	padding: 0rpx 28rpx;
	box-sizing: border-box;
	width: 100%;
	max-width: 480px;
	background: transparent;
	/*height: 108rpx;*/
	/*background: #fff;*/
	border-radius: 12rpx 12rpx 0 0;
	z-index: 1;
}

.ft-icon-text-ALL {
	/* bottom: 128rpx; */
	bottom: calc(114rpx + var(--safe-area-inset-bottom));
}

.ft-icon-text-LUNTAN {
	bottom: 114rpx;
	/* bottom: 130rpx; */
}

.ft-icon-text .ft-icon-text-item {
	flex: 1;
	display: flex;
	height: 60rpx;
	border: 1px solid;
	border-radius: 5px;
	background: #fff;
	font-size: 13px;
	justify-content: center;
	align-items: center;
	margin-right: 20rpx;

	&:last-child {
		margin-right: 0;
	}
}

.ft-icon-text .text-item-0 {
	border-color: rgb(12 193 96);
	color: rgb(12 193 96);
}

.ft-icon-text .text-act-item-0 {
	background-color: rgb(12 193 96);
	color: #fff;
	border: 2rpx solid rgb(12 193 96);
}

.ft-icon-text .text-item-1 {
	border-color: #c10707;
	color: #c10707;
}

.ft-icon-text .text-act-item-1 {
	background-color: #c10707;
	color: #fff;
	border: 2rpx solid #c10707;
}

.ft-icon-text .text-item-2 {
	border-color: #0755c1;
	color: #0755c1;
}

.ft-icon-text .text-act-item-2 {
	background-color: #0755c1;
	color: #fff;
	border: 2rpx solid #0755c1;
}

.ft-icon-text .text-item-3 {
	border-color: #b907c1;
	color: #b907c1;
}

.ft-icon-text .text-act-item-3 {
	background-color: #b907c1;
	color: #fff;
	border: 2rpx solid #b907c1;
}

.ft-icon-text .ft-icon-text-item .ft-text {
	margin-left: 5px;
	text-align: center;

	font-size: 28rpx;
	font-weight: 400;
}

.notice-bar {
	flex: 1;
}

.van-notice-bar {
	padding: 0;
	color: #404040 !important;
	font-size: 26rpx !important;
	height: 88rpx !important;
	align-items: center;
}

.van-notice-bar {
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	height: 60rpx;
	color: #ed6a0c;
	font-size: 26rpx;
	line-height: 48rpx;
	background-color: #fffbe8;
}

.van-notice-bar__wrap {
	display: flex;
	align-items: center;
	height: 100%;
	animation: scroll 30s linear infinite;
	/*滚动动画*/
}

.van-notice-bar__content {
	font-size: 24rpx;
	white-space: nowrap;
	display: inline-block;
	height: 100%;
	line-height: 60rpx;
	margin-right: 594rpx;
}

@keyframes scroll {
	from {
		transform: translateX(300px);
		/*div多宽就写多宽*/
	}

	to {
		transform: translateX(-100%);
	}
}

.forum-body-bd {
	padding: 0 0rpx;
}

.forum-list {
	padding: 20rpx 0;
	background-color: #fff;
	margin-bottom: 20rpx;
	border: 1px solid #eee;
	position: relative;
}

.forum-list .user-info-box {
	padding: 0 20rpx 20rpx;
	position: relative;
}

.user-img {
	display: inline-block;
	position: relative;
	padding-left: 48px;
}

.user-img .left-image {
	position: absolute;
	left: 0;
	top: 0;
}

.user-img .left-image .van-image {
	width: 72rpx;
	height: 72rpx;
}

.van-image--round {
	overflow: hidden;
	border-radius: 50%;
}

.van-image {
	position: relative;
	display: inline-block;
}

.van-image--round img {
	border-radius: inherit;
}

.van-image__error,
.van-image__img,
.van-image__loading {
	display: block;
	width: 100%;
	height: 100%;
}

.user-img .user-info .name.red {
	color: red !important;
}

.user-img .user-info .name {
	padding: 4px 0 3px 0;
	margin-right: 5px;
	font-style: normal;
	font-weight: 700;
	font-size: 28rpx;
	color: #999;
}

.user-img .user-info .name image {
	width: 28rpx;
	height: 28rpx;
	vertical-align: text-top;
}

.user-img .user-info .name .reportInfo {
	padding: 4px 0 3px 0;
	margin-right: 10rpx;
	font-size: 30rpx;
	color: #ec0808;
}

.user-img .user-info .time {
	font-size: 12px;
	color: #888;
}

.forum-body-bd .forumflow {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0;
	width: 112rpx;
	height: 56rpx;
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
	color: #404040;
	font-weight: 400;
	font-size: 28rpx;
}

.forum-list .title {
	font-size: 28rpx;
	padding: 12rpx 20rpx;
	display: flow-root;
}

.forum-list .slabel {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 16rpx;
	min-width: 62rpx;
	height: 40rpx;
	background: var(--theme-color);
	border-radius: 8rpx;
	font-weight: 400;
	font-size: 24rpx;
	color: #fff;
	line-height: 40rpx;
}

.van-col {
	float: left;
	box-sizing: border-box;
	min-height: 2rpx;
	overflow: hidden;
}

.van-col--21 {
	width: 87.5%;
}

.van19 {
	display: flex !important;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.van19 image {
	height: 40rpx !important;
	margin: 0 8rpx;
}

.formtitle {
	font-size: 32rpx;
	font-weight: 700;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	line-height: 40rpx;
}

.reads {
	margin-left: 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 8rpx;
	width: 64rpx;
	height: 40rpx;
	background: rgba(231, 22, 7, .1);
	border-radius: 4rpx;

	font-style: normal;
	font-weight: 400;
	font-size: 24rpx;
	color: #e71607;
}

.forum-list .text {
	font-size: 26rpx;
	line-height: 40rpx;
	padding: 0 20rpx;
	margin-bottom: 10rpx;
}

.forum-list .img-box {
	padding: 0 20rpx;
}

.van-col--8 {
	width: 33.33333333%;
}

.images .img-box-1 .image-body,
.images .img-box-2 .image-body,
.images .img-box-3 .image-body {
	height: 180rpx;
	border-radius: 10rpx;
}

.images .image-body {
	margin-bottom: 10rpx;
	position: relative;
}

.images .image-body .van-image__img {
	border-radius: 10rpx;
	overflow: hidden;
}

.forum-list .tool-ft {
	border-top: 2rpx solid #eee;
	text-align: center;
	padding-top: 20rpx;
	display: flex;
}

.forum-body-bd .tom-col .van-col {
	height: 48rpx;
	padding: 8rpx;
}

.forum-list .tool-ft .num {
	font-weight: 500;
	font-size: 28rpx;
	margin-left: 6rpx;
}

.van-col--6 {
	width: 25%;
}

.forum-body-bd .ntool {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.forum-body-bd .ntool uni-view {
	background: #f5f5f5;
	padding: 8rpx;
	display: flex;
	align-items: center;
}

.forum-body-bd .ntool img {
	height: 30rpx;
}

.rule-text {
	background: #fff;
	padding: 20rpx;
	word-break: break-all;
}

.lazy-image {
	max-width: 80rpx;
	max-height: 80rpx;
	width: 50%;
	height: 50%;
}

.length {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, .2);
	text-align: center;
	color: #fff;
	padding-top: 68rpx;
	font-size: 28rpx;
}

.tab-div-top {
	position: fixed;
	z-index: 1;
	background: #f8f8f8;
	width: 100%;
	top: 46px;
	max-width: 480px;
}

.sort-box {
	background-color: #fff;
	padding: 20rpx 20rpx 10rpx 20rpx;
	font-size: 28rpx;
}

.sort-box span {
	display: inline-block;
	margin-right: 40rpx;
	color: #797979;
}

.sort-box .act {
	color: var(--theme-color);
}

.tab-box {
	padding: 10rpx;
}

.nav {
	box-sizing: border-box;
	height: 60rpx;
	margin: 10rpx 32rpx;
	border: 1px solid var(--theme-color);
	border-radius: 4rpx;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-around;
	background: #fff;
}

.nav .nav-item {
	width: 20%;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	border-right: 1px solid;
	border-color: var(--theme-color);
	font-size: 24rpx;
	color: var(--theme-color);
}

.nav .nav-item:last-child {
	border: 0px;
}

.nav .nav-item.active {
	background-color: var(--theme-color);
	color: #fff;
}

.loading {
	position: relative;
	top: -130rpx;
	text-align: center;
}
</style>

<style lang="scss" scoped>
::v-deep .uni-scroll-view,
.uni-scroll-view-content {
	overscroll-behavior: none;
}

::v-deep .uni-scroll-view-content {
	overscroll-behavior: none;
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
		width: 100%;

		.noticeScroll {
			width: calc(100% - 70rpx);
			min-width: calc(100% - 70rpx);
		}
	}
}

::v-deep .float-bnt {
	bottom: 352rpx !important;
}

::v-deep .header {
	border-radius: 0;
}

.swiper-item {
	display: flex;
	justify-content: center;

	image {
		border-radius: 24rpx;
		width: calc(100% - 56rpx);
		height: 274rpx;
		margin: 0 auto;
		overflow: hidden;
	}
}

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

.header-box {
	background: #FFF;
	border-radius: 0 0 24rpx 24rpx;
	padding-top: 20rpx;
	overflow: hidden;
}

.van-notice-bar {
	margin: 0 28rpx;
	overflow: hidden;

	::v-deep .van-notice-bar__content {
		line-height: 88rpx !important;
		font-size: 26rpx;
	}
}


.act {
	position: relative;

	&::before,
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 30rpx;
		height: 30rpx;
		z-index: 1;
	}

	&::before {
		left: -30rpx;
		background: radial-gradient(circle at 0 0, transparent 29rpx, var(--theme-color) 31rpx);
		// background: radial-gradient(circle at 0 0, transparent 30rpx, var(--theme-color) 30rpx);
	}

	&::after {
		right: -30rpx;
		background: radial-gradient(circle at 100% 0, transparent 29rpx, var(--theme-color) 31rpx);
		// background: radial-gradient(circle at 100% 0, transparent 30rpx, var(--theme-color) 30rpx);
	}
}

.last-item {
	&::after {
		transform: rotate(180deg);
		right: 0;
		bottom: -30rpx
	}
}

.first-item {
	&::before {
		transform: rotate(180deg);
		left: 0;
		bottom: -30rpx
	}
}
</style>
