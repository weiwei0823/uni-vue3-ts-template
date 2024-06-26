<template>
	<view class="input-fixed-box">
		<view class="liuhe-board" :style="{ height: `${uWindowHeight}px` }">
			<mi-pai ref="mipai" :autoCloseTime="10000" @closeMiPai="closeMiPai" :your-betting-list="yourBettingList"
				:head-info="headInfo" :is-show-mi-pai="isShowMiPai"></mi-pai>
			<!-- isCloseBuy   -->
			<page-disable @yes="yes" :headInfo="headInfo" v-if="isCloseBuy"></page-disable>
			<view class="top-header" v-if="isShowLive">
				<view class="live-container">
					<!--              &lt;!&ndash; 播放器显示区域 &ndash;&gt;-->
					<liuhe-live-box v-if="isLive" :gameHeaderInfo="headInfo"
						@onClose="isShowLive = false"></liuhe-live-box>
				</view>
			</view>
			<view class="top-header" v-else>
				<nav-bar :nav-bar-height="'80rpx'" :isBack="false" :left-width="245" :right-width="245" :title="''"
					:headerTop="keyBoardHeight" :titleStyle="titleStyle" :font-color="titleStyle.color" :header-style="{
						height: '40px',
						backgroundImage: `url(${this.navBg})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundColor: 'transparent',
						position: 'relative',
					}" class="nav-bar">
					<block slot="left">
						<view class="nav-title" @click="goBack">
							<view class="back">
								<svg width="11" height="19" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18.0364 0.665382C18.9089 -0.188412 20.324 -0.225209 21.243 0.582001C22.1619 1.38921 22.257 2.75265 21.4584 3.67147L21.3242 3.81451L5.58909 19.1232L21.3103 34.1783C22.1628 34.9947 22.2271 36.3049 21.4584 37.1955L21.3242 37.3397C20.478 38.1623 19.1208 38.224 18.1984 37.4816L18.0491 37.352L0.684034 20.7235C-0.168161 19.9067 -0.232001 18.5966 0.537009 17.7062L0.671299 17.5621L18.0364 0.665382Z" fill="white"/>
								</svg>
							</view>
							<view class="title">
								{{ title }}
							</view>
						</view>
					</block>
					<block slot="right">
						<view class="nav-right">
							<view :class="refresh ? 'balance refresh' : 'balance'" @click="refreshBalance">
								<view class="balance-text" v-if="userInfo">
									<text style="margin-right: 4px">¥</text>
									<u-count-to :decimals="2" :start-val="0" :end-val="userBalance"
										@end="isEnd = true"></u-count-to>
								</view>
								<text class="balance-text" style="color: #FFFFFF" v-else>¥&nbsp;{{ setAmount(0)
									}}</text>
								<svg v-if="userInfo" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
									viewBox="0 0 22 22" fill="none">
									<path
										d="M3.8093 2.67631C5.80531 0.946736 8.35888 -0.00367385 11 1.06729e-05C17.0753 1.06729e-05 22 4.92471 22 11C22 13.3496 21.263 15.5276 20.009 17.314L16.5 11H19.8C19.8001 9.27479 19.2932 7.58759 18.3421 6.14819C17.3911 4.70879 16.0379 3.58068 14.4509 2.90414C12.8639 2.22761 11.113 2.03248 9.41594 2.34303C7.71891 2.65358 6.15059 3.4561 4.90599 4.65081L3.8093 2.67631ZM18.1907 19.3237C16.1947 21.0533 13.6411 22.0037 11 22C4.9247 22 0 17.0753 0 11C0 8.6504 0.736999 6.4724 1.991 4.68601L5.49999 11H2.2C2.19986 12.7252 2.70682 14.4124 3.65787 15.8518C4.60891 17.2912 5.96207 18.4193 7.54909 19.0959C9.13612 19.7724 10.887 19.9675 12.584 19.657C14.2811 19.3464 15.8494 18.5439 17.094 17.3492L18.1907 19.3237Z"
										fill="#47A1C3" />
								</svg>
								<!-- <image src="@/static/img/liuhe/refresh.png" v-if="userInfo"></image> -->

							</view>
							<view class="menu" @click="onShowMenu">
								<image src="@/static/img/liuhe/menu.png"></image>
							</view>
						</view>
					</block>
				</nav-bar>
				<view class="board" :style="{ paddingTop: `${keyBoardHeight}px` }">
					<nav-menu :is-show-menu="isShowMenu" :user-info="userInfo" :menu-list="menuList"
						@closeMenu="closeMenu" @toUrl="toUrl" @toLogin="toLogin"
						@switch1Change="switch1Change"></nav-menu>
					<view class="board-content">
						<view class="board-content-item">
							<hash-info @goHash="toUrl({url: '/pages/liuhe/hashIntro'})" :hash-info="headInfo.hashInfo" :stampType="headInfo.stampType"
								:nextShorNo="headInfo.nextShorNo" :lottery-id="headInfo.lotteryId" v-if="headInfo.hashInfo"></hash-info>
							<view class="top" v-else>
								<text style="position: relative"
									v-if="showRoundInfo.stampType === 3 || showRoundInfo.stampType === 1">{{
										`${$t("pages.liuhe.liuhePlaying.text1")}${showRoundInfo.nextShorNo ?
											showRoundInfo.nextShorNo : ''}${$t("pages.liuhe.liuhePlaying.text2")}` }}
								</text>
								<text v-else>{{
									`${$t("pages.liuhe.liuhePlaying.text1")}${showRoundInfo.shorNo ?
										showRoundInfo.shorNo : ''}${$t("pages.liuhe.liuhePlaying.text2")}` }}</text>
								<text class="status" @click="toTren">

									{{ $t("pages.liuhe.liuhePlaying.text3") }}
								</text>
							</view>
							<ball-numbers v-if="headInfo.stampType === 2 || headInfo.stampType === 1"
								:numbers="this.headInfo.numberList"
								:addStyle="{ width: '20rpx', height: '20rpx', 'postion': 'relative', 'left': '-20rpx' }"
								:addBallStyle="{ width: '20rpx' }" />
							<view class="close-ball-list" v-if="headInfo.stampType === 3">
								<view class="close-ball-item" v-for="item in closeShowBall">?</view>
								<view class="close-ball-item-add">
									<image class="add" src="@/static/img/liuhe/add.png"></image>
								</view>
								<view class="close-ball-item">?</view>
							</view>
							<view class="show-Shengxiao" v-if="headInfo.stampType === 2 || headInfo.stampType === 1">
								<view class="show-Shengxiao-item" :key="k" v-for="(i, k) in headInfo.numberList"
									v-if="k != headInfo.numberList.length - 1">{{ i.shengXiao }}</view>
								<view class="show-Shengxiao-item" style="width: 20rpx"></view>
								<view class="show-Shengxiao-item">
									{{ headInfo.numberList[headInfo.numberList.length - 1].shengXiao }}
								</view>
							</view>
						</view>
						<view class="board-content-item-right">
							<view class="info">
								<view class="line1" v-if="isLive" @click="isShowLive = true">
									<image src="@/static/img/liuhe/live.png" />
									<text class="live-text">
										{{ $t("pages.liuhe.liuhePlaying.text4") }}
									</text>
								</view>
								<view class="line2">
									{{ $t("pages.liuhe.liuhePlaying.text1") }}
									<text>{{ showRoundInfo.nextShorNo }}</text>
									{{ $t("pages.liuhe.liuhePlaying.text2") }}
								</view>
								<view class="line3">
									<text v-if="showRoundInfo.stampType === 1" style="color:#FFFF00">
										{{ $t("pages.liuhe.liuhePlaying.text5") }}
									</text>
									<text v-if="showRoundInfo.stampType === 2">
										{{ $t("pages.liuhe.liuhePlaying.text6") }}
									</text>
									<text style="color: #FFFF00" v-if="showRoundInfo.stampType === 3">
										{{ $t("pages.liuhe.liuhePlaying.text7") }}
									</text>
								</view>
								<view class="line4">{{ runtimes }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<order-comfirm v-if="haveChanglong === false" ref="confirm" :title="title" :showRoundInfo="showRoundInfo"
				:orderList="orderList" :orderTotal="orderTotal" :isBetting="isBetting" @cancelBtn="cancelBtn"
				@toBuyOrder="toBuyOrder">
			</order-comfirm>
			<changlong-order-comfirm v-if="haveChanglong" ref="confirm" :changlong="changlong"
				:showRoundInfo="showRoundInfo" :orderList="orderList" :orderTotal="orderTotal" :isBetting="isBetting"
				@cancelBtn="cancelBtn" @toBuyOrder="changlongBuy">
			</changlong-order-comfirm>
			<view :class="isShowRecords ? 'history-div active' : 'history-div'">
				<history :dataList="dataList" @setShowRecords="setShowRecords" :isShowRecords="isShowRecords"></history>
			</view>
			<view class="tab">
				<view class="show-records">
					<image mode="widthFix" :src="isShowRecords ? hideImg : showImg" @click="setShowRecords"></image>
				</view>
				<view :class="current == item.value ? 'tab-item selected' : 'tab-item'" v-for="item in tabList"
					:key="item.value" @click="onSelectItem(item)">
					{{ item.label }}
				</view>
			</view>
			<view :class="isShowRecords ? 'tab-content  active' : 'tab-content'">
				<view :class="isShowOrder ? 'bet-list active' : 'bet-list'" v-show="current == 1">
					<betting-area v-if='playList.length > 0' ref="betting" @changlongOrder="changlongOrder" @setOrders="setOrders"
						@selected="onTypeSelected" :playList="playList" @onSelectedType="onSelectedType" />
				</view>
				<view v-if="current == 2">
					<BetSlip ref="betSlip" :lotteryId="lotteryId" :isShowRecords="isShowRecords" />
				</view>
				<view v-if="isLoadingChatRoom" v-show="current == 3" name="current-3" style="height: 100%;">
					<view v-if="!userInfo" class="chat-room-unlogin">
						<view @click="toLogin"><span style="color: blue">

								{{ $t("pages.liuhe.liuhePlaying.text8") }}
							</span>

							{{ $t("pages.liuhe.liuhePlaying.text9") }}
						</view>
					</view>
					<view v-else-if="!chatRoomUrl || chatRoomCode === 600"
						:style="`width: 100%;height: calc( var(--vh) - 326rpx - 76rpx );border:none;`">
						<view
							style="margin-top: 100rpx;text-align: center;color: #404040;text-align: center;font-family: MiSans;font-size: 44rpx;font-style: normal;font-weight: 400;line-height: normal;">
							{{ chatRoomMessage }}
						</view>
					</view>
					<ChatRoom :chatRoomUrl="chatRoomUrl" v-on:onInputChange="pageInputChange" :isFullscreen="false"
						v-else-if="isLoadingChatRoom && chatRoomUrl" :style="`width: 100%;height: 100%;border:none;`"
						v-on:backToBet="onSelectItem(tabList[0])" />
				</view>
				<!--
				之前老的方式 headInfo 加入卡0客户端进入下回合逻辑 会导致无法下注 此次修改 客户端兼容卡0 让客户端游戏时间线往后移动
				:stampType="headInfo.stampType" :ballItem="ballItem" @closeBuy="closeBuy" @removeOrder="removeOrder"
				解决问题地址： http://3.0.125.22:8888/zentao/task-view-462.html?tid=egjqt26c  MR
		-->
				<!--由于长龙特殊但是要使用一样的下注，这里利用haveChanglong判断展示另外一直购买弹窗-->
				<view :class="isShowOrder ? 'add-chart up' : 'add-chart'" v-if="haveChanglong === false">
					<buy v-show="isShowOrder" ref="buy" :coins="coins" @setEdit="setEdit" @toBuy="toBuy"
						:is-cart="menuList[4].isOpen" :orders="orderList" :carts="cartList" :total="total"
						:stampType="showRoundInfo.stampType" :ballItem="ballItem" @closeBuy="closeBuy"
						@removeOrder="removeOrder" @setCustomAmount="setCustomAmount" :lotteryId="lotteryId"></buy>
				</view>
				<view :class="isShowOrder ? 'add-chart up' : 'add-chart'" v-if="haveChanglong">
					<buy v-show="isShowOrder" ref="buy" :coins="coins" @setEdit="setEdit" @toBuy="toCLBuy"
						:is-cart="menuList[4].isOpen" :orders="orderList" :carts="cartList" :total="total"
						:ballItem="ballItem" @setAmount="setCusAmount" @closeBuy="closeBuy" @removeOrder="removeOrder"
						@clearAmount="clearAmount" @setCustomAmount="setCustomAmount" :lotteryId="lotteryId"></buy>
				</view>
			</view>
			<uni-popup :title="$t('pages.liuhe.liuhePlaying.text11')" type="dialog" ref="result">
				<view class="error-modal">
					<view class="title">

						{{ $t('pages.liuhe.liuhePlaying.text12') }}
					</view>
					<view class="content">
						{{ errorMsg }}
					</view>
					<view class="footer" :style="{ color: themeColor.themeColor }" @click="yes()">

						{{ $t('pages.liuhe.liuhePlaying.text13') }}
					</view>
				</view>
			</uni-popup>
			<pre-set-amount ref="preSet" @setValue="setValue"></pre-set-amount>
			<balance-modal ref="balance"></balance-modal>
			<!--    <web-socket-alert></web-socket-alert>-->
			<LeftMenu :lotteryId="lotteryId" ref="LeftMenu" />
			<AlertInjectLayer />

		</view>
	</view>
</template>
<script>
import NavBar from "@/components/common/navBar/navBar";
import BallNumbers from "./common/numbers";
// import WebSocketAlert from "./common/WebsocketAlert";
import BetSlip from "@/components/common/lottery/BetSlip";
import BettingArea from "./bettingArea";
import Buy from "./common/buy";
import History from "./common/History";
import BalanceModal from "./common/BalanceModal.vue"
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import templateSelector from "@/config/templateMemSelector/WholeSelector.js"
import loggerUtils from "@/utils/debug/Logger.js"
import OrderComfirm from "./common/orderComfirm.vue";
import ChanglongOrderComfirm from "./common/changlongOrderComfirm.vue";
import PreSetAmount from "./common/preAmountSetting.vue"
import ChatRoom from "../../components/common/chatRoom/index.vue";

import {
	getPlayList,
	getPlayMiniList,
	getLotteryStat,
	getRewardsInfo,
	buyOrder,
	getHistoryList,
	list,
	getChatRoomInfo
} from "@/utils/lottery/betting";
import {
	mapGetters
} from 'pinia';
import Playing from "@/utils/common/playing";
import ShowModal from "./common/showModal";
import MiPai from "./common/MiPai.vue";
import {
	websocetObj
} from '@/utils/websocet/websocet.js';
import {
	getTimes
} from "@/utils/function.js"

import LeftMenu from './common/LeftMenu'
import LiuheLiveBox from '@/components/common/live/LiuheLiveBox'
import PageDisable from "../../components/common/pageDisable/index.vue";
import NavMenu from "./common/navMenu.vue";
import Input from "../../components/common/alert/alertboxs/verify/Input";
import HashInfo from "../../components/hashInfo/index.vue";
const navMenu = new Playing().menuList;
export default {
	components: {
		Input,
		AlertInjectLayer,
		LeftMenu,
		History,
		// UniCol,
		// UniRow,
		NavBar,
		BetSlip,
		BettingArea,
		Buy,
		BallNumbers,
		ShowModal,
		BalanceModal,
		MiPai,
		LiuheLiveBox,
		PageDisable,
		OrderComfirm,
		NavMenu,
		ChatRoom,
		PreSetAmount,
		ChanglongOrderComfirm,
		HashInfo
	},
	data() {
		return {
			modalTitle: this.$t("pages.liuhe.liuhePlaying.text12"),
			liveInfo: "", //直播信息
			isShowLive: false,
			dataList: [],
			isRefresh: true,
			isCloseBuy: false,
			title: "",
			windowHeight: "0px",
			systemInfo: "0px",
			isShowMenu: false,
			playing: new Playing(),
			titleStyle: {
				color: "#E6E9EB",
				fontSize: "32rpx"
			},
			closeShowBall: [{
				id: 1
			},
			{
				id: 2
			},
			{
				id: 3
			},
			{
				id: 4
			},
			{
				id: 5
			},
			{
				id: 6
			},
			],
			navBg: '/static/img/liuhe/bg-nav.svg',
			numbers: ["05", "45", "49", "39", "12", "40", "10"],
			isShowRecords: false,
			showImg: require('@/static/img/liuhe/show.png'),
			hideImg: require('@/static/img/liuhe/hide.png'),
			isShowOrder: false,
			orders: [],
			tabList: [{
				label: this.$t("pages.liuhe.liuhePlaying.text14"),
				value: 1,
			},
			{
				label: this.$t("pages.liuhe.liuhePlaying.text15"),
				value: 2,
			},
			{
				label: this.$t("pages.liuhe.liuhePlaying.text16"),
				value: 3,
			},
			],
			id: 0,
			isApp: false,
			current: 1,
			playList: [],
			lotteryStatus: {},
			headInfo: {
				shorNo: "",
				stampType: null,
				numberList: [],
				nextShorNo: "",
				nextNo: ""
			},
			total: {
				totalPrice: 0,
				stakeCount: 0,
			},
			methodName: "",
			runtimes: '',
			isCart: false,
			orderInfo: {},
			// userBalance: 0,
			menuList: navMenu,
			orderTotal: {
				count: 0,
				price: 0
			},
			cartList: [],
			// userInfo: { nickname: "" },
			lotteryId: null,
			ballItem: {},
			refresh: false,
			times: null,
			pageSize: 120,
			ctx: null,
			width: 0,
			height: 0,
			isShowMiPai: false,
			yourBettingList: [],
			isLive: false,
			errorMsg: '',
			coins: [5, 10, 50, 100, 500],
			//新增MR 避免打开页面立即加载聊天室和主进程抢网络资源。 用户点击菜单后再加载
			isLoadingChatRoom: false,
			chatRoomUrl: null,
			chatRoomCode: '',
			chatRoomMessage: '',
			showNetDebugBox: false,
			showNetDebugClickCount: 0,
			isBetting: false, //下注时按钮显示注单中，防止网络不好再次点击下注
			//计算的出得 浏览器输入区域和底部占用高度
			otherHeight: 0,

			debugScrollTop: 0,
			haveChanglong: false,
			selectedItem: {},
			changlong: {
				isChanglong: false,
				nextNo: "",
			},
			currentAmount: 1,
			isOpenHeight: 0,
			countTime: 5000,
			previousNextIssue: null
		}
	},

	computed: {
		...mapGetters(['orderList', "websocketTimeInterval", "inLotteryId", "inLotteryGameName", "themeColor",
			"windowTop", "uWindowHeight"
		]),
		keyBoardHeight() {
			const data = this.windowTop + this.isOpenHeight
			return data
		},
		menuListStoregeKey() {
			return "menuList:" + this.lotteryId;
		},
		lotteryListKey() {
			return "lotteryList:" + this.lotteryId;
		},
		userBalance() {
			let num = 0;
			console.log("update this.$store.state.appInfoStore.userInfo0", this.$store.state.appInfoStore.userInfo.userBalance)
			num = this.$store.state.appInfoStore.userInfo ? parseFloat(this.$store.state.appInfoStore.userInfo
				.userBalance) : 0;
			return num;
		},
		userInfo() {
			return this.$store.state.appInfoStore.userInfo
		},

		showRoundInfo() {
			return this.isClientRun ? this.headInfo['nextRound'] : this.headInfo;
		},

		isClientRun() {
			let roundMsg = Object.assign({}, this.headInfo);
			let nextRound = roundMsg['nextRound'];
			if (nextRound) {

			}
			return !!this.headInfo && !!this.headInfo['nextRound'];
		}
	},

	onUnload() {
		clearInterval(this.times);
		uni.$off("onWindowResize");
	},
	beforeDesotry() { },
	onReachBottom() {

	},
	onShow() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		this.$nativeBridge.setTopSpace(0)
		//购物车返回时会存入一个true的布尔值，这个位置用于取值，判断是在购物车返回时触发
		let cartBack = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.ORDER_CAR_BACK);
		if (cartBack) {
			// 购物车返回时触发取消订单的选中，并设置值为false，这样解决了购物车返回清楚选中，也避免切换窗口时取消选中的bug
			// this.$store.dispatch('setOrderList', [])
			this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.ORDER_CAR_BACK, false);
		} else {
			console.warn("cartBack undefined")
		}
		this.getCartList()
		this.isShowMenu = false;
		// setTimeout(() => {
		// 	let that = this;
		// 	let systemInfo = uni.getSystemInfoSync();
		// 	let systemHeight = systemInfo.safeArea && systemInfo.safeArea['height'] ? systemInfo.safeArea[
		// 		'height'] : systemInfo.height;
		// 	alert(systemHeight)
		// 	that.$store.dispatch("updateWindowSize", {
		// 		width: systemInfo.windowWidth,
		// 		height: systemHeight
		// 	});
		// }, 1000)
		//this.$store.dispatch('setOrderList', [])
		//this.closeBuy()
	},
	mounted() {
		uni.$emit("on_page_mounted", this)

		let systemInfo = uni.getSystemInfoSync();
		let screenHeight = systemInfo.screenHeight;
		let winHeight = systemInfo.windowHeight;
		this.otherHeight = screenHeight - winHeight;
		uni.$emit("showPop", {
			refName: "AlertAdvert",
		});
	},
	async onLoad(option) {
		let _this = this;
		this.windowHeight = uni.getSystemInfoSync().windowHeight + "px"; //获取内容区高度

		// alert(this.windowHeight)
		uni.$on("onWindowResize", function (sizeInfo) { //时时监听屏幕视窗变化
			_this.windowHeight = sizeInfo.size.windowHeight + "px";
		});

		if (option.id) { //判断id进入后，获取数据
			this.lotteryId = option.id;
			this.$store.commit("SET_LOTTERY_IN_ID", this.lotteryId);
			//this.getLiveData();
			//新增将LotteryId 写入store中去
			this.initWs();
			let memLotteryListTemplate = await templateSelector.getMemeLotteryByLotteryId(this.lotteryId);
			if (memLotteryListTemplate) {
				console.warn("memPlay list", memLotteryListTemplate);
				this.playList = memLotteryListTemplate;
			} else {
				console.error("当前游戏默认模板未录入，请前往memLiuheLotteryList.js 添加 lotteryId=" + this.lotteryId);
			}

			//继续通过接口更新游戏盘
			this.$nextTick(function () {
				_this.getPlayLists()
			});
			this.getHeadInfo();
		}
		//初始化基础信息
		this.initInfo();

		if (option.down) {
			uni.showToast({
				title: this.$t("pages.liuhe.liuhePlaying.text17"),
				icon: "success"
			})
		}
		if (option.cancel == 0) {
			this.current = 2;
			pop(this.$t("pages.liuhe.liuhePlaying.text18"), 1000);
		}
		//进入页面如果正在直播
		if (option.isLive == 1) {
			this.isLive = true;
		}

		//获取右上角菜单
		if (this.playing.getStorage("menuList")) {
			this.menuList = this.playing.getStorage("menuList");
		} else {
			this.playing.saveMenuList(this.menuListStoregeKey, this.lotteryId, this.menuList);
		}

		if (option.records) {
			this.onSelectItem({
				value: 2
			})
		}
		this.getLotteryStatus()
		this.lists()
		this.$nextTick(function () {
			_this.closeBuy();
			_this.$store.dispatch('setOrderList', [])
		})
		if (isLogin()) {
			this.initChatRoomUrl();
		}
	},
	onReady() {
		// this.init()
	},

	watch: {
		inLotteryGameName(v) {
			this.title = v;
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		//兼容账号切换 重新登录登需要刷新参数的逻辑
		userInfo(value, oldValue) {
			if (value) this.initChatRoomUrl();
		}
	},

	methods: {
		getTimes: getTimes,
		initWs() {
			const _this = this;
			if (this.inLotteryId != -1 && this.inLotteryId == this.lotteryId) { //未在其它区域清理 inlotteryId  先这样处理吧
				this.doCommitUpdateEventBySocket();
			}

			this.$store.commit("SET_LOTTERY_STORE_LOTTERY_ID", this.lotteryId);
			uni.$off("onGetGameInfo");
			//获取ws数据推送
			uni.$on("onGetGameInfo", function (resultInfo) {
				_this.doUpdateHeaderInfoFromSocket(resultInfo.data)
			})
		},
		initInfo() {
			this.systemInfo = uni.$sys;
			// this.userInfo = this.setUserInfo();
			this.title = this.inLotteryGameName;
			uni.hideTabBar()
			// uni.$on('getLotteryMsg', this.getLotteryInfo)
			uni.$on('getWin', this.getLotteryInfo)
			uni.setNavigationBarTitle({
				title: this.title
			});
		},

		setEdit() {
			this.$refs.preSet.open();
		},
		setValue(arr) {
			this.coins = arr;
		},
		//获取我的注单
		getBettingList() {
			list({
				type: 1,
				lotteryNo: this.headInfo.lotteryNo,
				// lotteryNo: this.headInfo.nextNo,
				lotteryId: this.lotteryId
			}).then(res => {
				if (res.code === 200) {
					this.yourBettingList = res.result.page.records
				}
			})
		},
		closeMiPai() {
			this.isShowMiPai = false;
		},
		//获取直播信息

		yes() {
			this.isCloseBuy = false;
			this.$refs.result.close()
		},

		lists() {
			let prams = {
				'pageSize': this.pageSize
			};
			prams.lotteryId = this.lotteryId
			getHistoryList(prams).then(res => {
				if (res.code == 200) {
					this.dataList = res.result
				}
			}).catch(err => {
				console.log(err)
			})
		},
		refreshVideo() {
			this.isRefresh = false
			setTimeout(() => {
				this.isRefresh = true
			}, 500);
		},
		toAccount() {
			let lotteryType = this.headInfo.lotteryType
			let lotteryId = this.headInfo.lotteryId;
			let unOpenIds = [64, 55, 73, 56, 69, 72, 74];
			let openTypes = [1, 2, 3, 4];

			if (!isNaN(lotteryId) && (unOpenIds.indexOf(parseInt(lotteryId)) != -1 || openTypes.indexOf(parseInt(
				lotteryType)) == -1)) {
				uni.navigateTo({
					url: '/pages/liuhe/trendChart/index' + "?id=" + this.lotteryId
				})
				// uni.showToast({
				// 	title: this.$t("pages.liuhe.liuhePlaying.text19"),
				// 	icon: "none"
				// })
			} else {
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					lotteryType);
				uni.navigateTo({
					url: '/pages/common/informationCount/liuhe',
					success: function (res) {
						res.eventChannel.emit('argParams', {
							lotteryType: lotteryType,
						})
					}
				})
			}
		},
		toLogin() {
			uni.navigateTo({
				url: '/pages/common/login'
			})
		},
		goBack() {
			if (this.cartList.length > 0) {
				uni.$emit('showPop', {
					refName: 'AlertMsg',
					data: {
						title: this.$t("pages.liuhe.liuhePlaying.text20"),
						content: this.$t("pages.liuhe.liuhePlaying.text21")
					},
					confirm: () => {
						this.cartList = [];
						this.playing.setStorage('playingList', this.cartList)
						this.toHomePage();
					},
				})
			} else {
				this.toHomePage();
			}
		},
		toHomePage() {
			this.$refs.LeftMenu.open()
		},
		setTabStyle() {
			return {
				height: this.systemInfo.windowHeight - this.systemInfo.statusBarHeight - 100 + 'px'
			}
		},
		setAmount(num) {
			return this.playing.setAmount(num, 2, '.', ',')
		},
		//从浏览器储存获取购物车list
		getCartList() {
			this.cartList = this.playing.getStorage('playingList') ? this.playing.getStorage('playingList') : [];
			if (this.cartList.length === 0 && this.orderList.length === 0) {
				this.isShowOrder = false;
			}
		},
		//额度刷新
		async refreshBalance() {
			this.isEnd1 = false
			this.refresh = true
			await this.$store.dispatch("appInfoStoreInit");
			setTimeout(() => {
				this.refresh = false;
			}, 2000);
		},
		//跳转
		toUrl(item) {
			if (!this.userInfo) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return
			}
			if (item.url === "/pages/common/informationCount/liuhe") {
				this.toAccount();
			} else {
				uni.navigateTo({
					url: item.url + "?id=" + this.lotteryId + "&lotteryName=" + this.title
				})
			}
			// // 跳转地址相比name更稳定 多语言版本后 名称需要再处理
			// if (item.url.indexOf("/zxcount/liuhe") != -1 && [64, 66, 55, 73, 56, 69, 72].indexOf(parseInt(this.lotteryId)) != -1) {
			//   return uni.showToast({ title: this.$t("pages.liuhe.common.text21"), icon: "none" });
			// }


		},

		toTren() {
			if (!this.userInfo) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return
			}
			uni.navigateTo({
				url: "/pages/liuhe/trendChart/index?id=" + this.lotteryId + "&lotteryName=" + this.title
			})
		},
		onSelectItem(item) {
			if (!this.checkOpenChatRoom(item)) return;
			this.current = item.value;
			this.closeBuy();
		},
		checkOpenChatRoom(item) {
			if (item.value == 3) {
				if (!this.userInfo || ['sign', 'demo'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false;
				}
				if (this.isLoadingChatRoom == false) {
					this.isLoadingChatRoom = true;
				}
			}
			return true;
		},


		setNavBg() {
			return {
				backgroundImage: `url(${this.navBg})`,
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundColor: 'transparent',
			}
		},
		setShowRecords() {
			this.isShowRecords = !this.isShowRecords;
		},
		//获取玩法
		getPlayLists() {
			let logwathcer = loggerUtils.createLogWatcher("getPlayList").start();
			getPlayList({
				lotteryId: this.lotteryId
			}).then(res => {
				logwathcer.save(res.code, res, "获取玩法列表");
				if (res.code === 200) {
					this.playList = res.result.concat([]);
					console.warn("playList", this.playList);
					this.playing.setStorage(this.lotteryListKey, this.playList);
					// 这个里面写了输出JSON的逻辑 全部补齐后可以移除
					//this.playing.setLongStorage(this.lotteryListKey,this.playList);
					//this.$forceUpdate();

					//获取storage中config数据，用于判断是否显示长龙
					this.setShowChanglong();
				}
			})
		},
		//获取彩票状态
		getLotteryStatus() {
			getLotteryStat().then(res => {
				if (res.code === 200) {
					this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYSTATUS, res.result)
				}
			})
		},
		//ws头部信息更新
		getLotteryInfo(e) {
			let _this = this;
			let data = e.data;
			let obj = JSON.parse(data.msgTxt);
			if (data.source === 2) {
				if (obj.lotteryId == this.lotteryId) {
					this.headInfo = obj;
					clearInterval(this.times);
					this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
					let mipaiObj = this.menuList.find(item => item.code == 'mipai')
					//stampType为3是封单中，为1是封盘中，1和3都不能下注，1 封盘段 2 购彩段 3封单(关盘)段
					if (this.headInfo.lotteryNo < obj.lotteryNo && mipaiObj.isOpen && this.headInfo
						.stampType !== 3) {
						this.getBettingList();
						if (this.isShowMiPai) {
							this.$refs.mipai.reset()
						} else {
							this.isShowMiPai = true;
							this.$nextTick(function () {
								_this.$refs.mipai.init();
							})
						}
					}
				}
			} else if (data.source === 3 && this.playing.getStorage('isWin')) {
				clearInterval(this.times);
				this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
			}
		},
		//获取头部开奖信息
		getHeadInfo() {
			let logwathcer = loggerUtils.createLogWatcher("getRewardsInfo").start();
			getRewardsInfo({
				lotteryId: this.lotteryId
			}).then(res => {
				logwathcer.save(res.code, res, "获取回合头部");
				this.headInfo = res.result;
				//stampType为3是封单中，为1是封盘中/等待开盘，1和3都不能下注，1 封盘段 2 购彩段 3封单(关盘)段
				if (res.result.stampType === 1 && res.result.msgDetail) {
					this.isCloseBuy = true;
				}
				this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
				this.playing.setStorage('lotteryNo', {
					lotteryNo: res.result.nextNo
				});
				console.log("menuList", this.headInfo.hashInfo);
				if (this.headInfo.hashInfo && this.menuList[2].code != 'hash') {// 是否添加hash介绍到右上角菜单
					const newObject = {
						code: "hash",
						isSwitch: false,
						name: "哈希介绍",
						svgs: [
							{ path: "M21.6419 4.8421C20.794 5.87033 18.078 8.8485 15.5422 12.4739C13.9654 12.02 12.3542 11.6953 10.7247 11.5031C12.783 8.0142 15.2972 4.81532 18.2008 1.99091C17.479 1.34986 16.6221 0.879437 15.6938 0.614479C14.6451 1.43378 10.4871 5.59995 7.86942 11.204C6.57901 11.0975 5.31318 11.0279 4.18254 10.9828C5.23535 7.80389 7.26723 4.04327 11.0524 0C11.0524 0 1.67139 1.40511 0.213027 9.95457C0.135193 10.4257 0.077828 10.8804 0.0450558 11.3146C0.0450558 11.4539 0.0204946 11.5932 0.0123016 11.7243C1.08969 11.7243 2.44151 11.7243 3.92446 11.7939C9.40561 11.9987 16.6565 12.7402 18.1845 14.8171C18.8358 15.702 19.098 16.5541 18.9628 17.3406C18.893 17.7265 18.7376 18.0918 18.5081 18.4098C18.4698 17.7754 18.2302 17.1698 17.824 16.6811C17.4817 16.3045 17.0613 16.0071 16.5922 15.8097C16.1231 15.6123 15.6166 15.5196 15.108 15.5381H14.8868C13.031 15.6283 5.57128 16.2673 4.30546 16.3574C3.94496 16.0215 3.58446 15.6774 3.22397 15.3333C1.93356 14.1043 0.716892 12.8754 1.15871e-10 12.0561C1.15871e-10 12.2609 1.15871e-10 12.4616 1.15871e-10 12.6583C1.15871e-10 12.7853 -2.60028e-05 12.9 0.0245532 13.027C0.0491323 13.154 0.0245532 13.2072 0.0245532 13.2973C0.0227729 13.3205 0.0227729 13.3438 0.0245532 13.367C0.0245532 13.6169 0.069641 13.8627 0.102413 14.1003L0.126966 14.2764C0.163835 14.514 0.204824 14.7434 0.253983 14.9687C0.253983 15.0179 0.253965 15.067 0.286737 15.1162C0.339992 15.3456 0.397361 15.5627 0.458809 15.7757L0.495664 15.8945C0.561208 16.1075 0.634954 16.3042 0.708691 16.5172L0.741446 16.6032C0.823376 16.8122 0.905301 17.0129 0.991328 17.1972L1.01593 17.2505C1.10605 17.4471 1.20025 17.6356 1.29857 17.8158C1.85853 18.8932 2.63214 19.8452 3.57216 20.6137C3.18099 19.2393 3.02858 17.808 3.12155 16.382L3.85075 17.0702L3.98591 17.1931H4.16614L5.95632 17.0416C4.59217 25.0503 12.011 24.0057 13.2728 23.8991C14.5345 23.7926 20.2369 22.621 22.6948 17.5086C25.1527 12.3961 23.6083 6.90675 21.6419 4.8421ZM8.56586 22.7357C7.55811 22.1294 7.36963 19.9542 8.32412 16.8613C9.91767 16.7302 11.671 16.5868 13.031 16.4844C12.4536 17.5166 11.9472 18.5869 11.5153 19.6879C10.9254 21.3593 13.2482 22.2442 14.8909 21.6543C14.3788 22.9324 10.8599 24.1081 8.56586 22.7357Z" }
						],
						url: "/pages/liuhe/hashIntro"
					}
					this.menuList.splice(2, 0, newObject);
				}
			})
		},
		//设置倒计时
		setRewardsTimeOut() {

			let time = this.showRoundInfo.closeTimeStamp; // this.headInfo.closeTimeStamp
			let isClientRun = this.isClientRun;
			let _this = this;
			this.runtimes = this.playing.timestampToDate(time);
			//调用清理定时器 避免多域执行 保证单任务
			clearInterval(this.times);
			let roundTime = 0;
			let lastTimerDate = Date.now();
			var sendCondRun = function (useSecend) {
				time -= useSecend;
				//避免出现-1的情况
				_this.runtimes = _this.playing.timestampToDate(time < 0 ? 0 : time);
				if (time < 0 || time === 0) {
					clearInterval(_this.times);
					_this.doCommitUpdateEventBySocket();
					return;
				}
				if (_this.headInfo && Date.now() >= _this.headInfo.nextTime) {
					clearInterval(_this.times);
					_this.doCommitUpdateEventBySocket();
					return;
				}
				if (isClientRun) {
					clearInterval(_this.times);
					_this.doCommitUpdateEventBySocket();
				}
			}
			this.times = setInterval(() => {
				let nowDate = Date.now();
				let frameTime = nowDate - lastTimerDate;
				roundTime += frameTime;
				lastTimerDate = nowDate;
				if (roundTime > 1000) {
					roundTime = roundTime % 1000; //取出余数 经历精准
					sendCondRun(Math.ceil(roundTime / 1000));
				}
			}, 100);
		},
		toCLBuy() {
			if (this.userInfo) {
				this.orderTotal = { //打开前清空一次
					count: 0,
					price: 0
				}
				this.orderList.map(item => {
					if (item.unitPrice === 0) {
						item.unitPrice = 1
					}
					item.unitPrice = Number(this.currentAmount);
					item.totalPrice = Number(this.currentAmount) * Number(item.stakeCount);
					this.orderTotal.count += item.stakeCount;
					this.orderTotal.price += item.stakeCount * Number(this.currentAmount);
				});
				this.$refs.confirm.open();
			} else {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
			}
		},
		setCusAmount(value) {
			this.menuList.forEach(item => {
				if (item.code === "remenber" && item.isOpen === true) {
					uni.setStorageSync("changlongAmount", value);
				}
			})
			this.currentAmount = value;
		},
		clearAmount() {
			uni.removeStorageSync("changlongAmount")
			this.currentAmount = 1;
		},
		setCustomAmount(amount) {
			this.currentAmount = amount;
			this.playing.setUnitPrice(amount)
			this.menuList.forEach(item => {
				if (item.code === "remenber" && item.isOpen === true) {
					uni.setStorageSync("changlongAmount", amount);
				}
			})
		},
		//设置显示长龙
		setShowChanglong() {
			let longQueueBettingTxt = this.$store.state.appInfoStore.contantsConfigTypeMap.longQueueBettingTxt;
			let showLongQueueBetting = this.$store.state.appInfoStore.contantsConfigTypeMap.showLongQueueBetting;
			if (showLongQueueBetting.url == 1) {
				let obj = {
					code: "changlong",
					id: '',
					isDefault: 0,
					isSplit: 1,
					level: 1,
					name: "长龙",
					rule: longQueueBettingTxt
				}
				this.playList.push(obj);
			}
		},
		//接收长龙数据
		changlongOrder(c, item) {
			// this.$refs.buy.clearAmount();
			this.$refs.buy.setChanglongAmount("");
			this.currentAmount = 1;
			this.menuList.forEach(item => {
				if (item.code === "remenber" && item.isOpen === true) {
					if (uni.getStorageSync("changlongAmount")) {
						this.currentAmount = uni.getStorageSync("changlongAmount");
						this.$refs.buy.setChanglongAmount(this.currentAmount);
					}
				}
			})
			this.changlong.nextNo = item.result.nextNo;
			this.changlong.title = item.lottery.name;
			this.changlong.id = item.lottery.id;
			this.changlong.isChanglong = true;
			this.total = {
				totalPrice: 1,
				stakeCount: 1,
			};
			let orderList = [{
				"content": "",
				"methodName": item.playName,
				"name": c.name,
				"mode": 1,
				"isMultiple": false,
				"chaseStop": 0,
				"playId": c.id,
				"rebatePoint": 0,
				"stakeCount": 1,
				"totalPrice": 0,
				"unitPrice": 1,
				"code": "",
				"changlong": this.changlong
			}]
			this.$store.dispatch('setOrderList', orderList);
			this.isShowOrder = c.isSelected;
		},
		changlongBuy() {
			this.orderList.forEach(item => {
				item.chaseNum = 0;
				delete item.changlong; // true
			})
			let param = {
				"lotteryId": this.changlong.id,
				"lotteryNo": this.changlong.nextNo,
				"orderList": this.orderList,
			}
			buyOrder(param).then(res => {
				if (res.code === 200) {
					this.isBetting = false; //拿到结果后关闭开关
					this.refreshBalance()
					this.playing.removeStorage('playingList');
					this.orderList = [];
					this.closeBuy();
					this.$store.dispatch('setOrderList', [])
					this.cancelBtn();
					uni.showToast({
						title: this.$t("pages.liuhe.liuhePlaying.text22"),
						icon: "success"
					})
				} else if (res.code === 774) {
					this.isBetting = false; //拿到结果后关闭开关
					this.$refs.confirm.close();
					if (['sign', 'demo'].includes(this.userInfo.userType)) {
						uni.$emit('showPop', {
							refName: 'AlertTestMsg',
						})
					} else {
						this.$refs.balance.open();
					}
				} else if (res.code === 701) {
					this.isBetting = false; //拿到结果后关闭开关
					this.errorMsg = res.message;
					this.$refs.result.open()
				} else {
					this.isBetting = false; //拿到结果后关闭开关
					uni.showToast({
						title: res.message,
						icon: "none"
					})
				}
			})
		},
		setOrders(data) {
			this.isShowOrder = false;
			let {
				selectedIds,
				ball,
				ballChildren,
				ballItem
			} = data;
			this.ballItem = ballItem;
			if (ball.minNum === 1) {
				this.isShowOrder = selectedIds.length > 0;
			} else {
				/**
				 * 处理胆拖
				 */
				if (this.selectedItem.code === "lhcdt") {
					let otherTypeBetBalls = selectedIds.concat([]);
					let selectedTypeBetBalls = selectedIds.concat([]);
					let selectedTypeBalls = ball.children.map((i) => {
						return i.id;
					})
					otherTypeBetBalls = otherTypeBetBalls.filter(id => selectedTypeBalls.indexOf(id) == -1);
					selectedTypeBetBalls = selectedTypeBetBalls.filter(id => selectedTypeBalls.indexOf(id) != -1);
					//胆-拖 类型都包含：选中数大于最小选中数 切当前选中
					this.isShowOrder = otherTypeBetBalls.length > 0 && selectedTypeBetBalls.length > 0 && selectedIds.length >= ball.minNum;
				} else
					this.isShowOrder = selectedIds.length >= ball.minNum;
				console.log("seted isShowOrder", this.isShowOrder, selectedIds.length, ball.minNum)
			}
			this.$refs.buy.getHistoryAmount();
			this.total = {
				stakeCount: 0,
				totalPrice: 0
			}
			let arr = [];
			if (!this.orderList.length) return null
			this.orderList.forEach(item => {
				if (item.content) {
					let newArr = item.content.split(',');
					if (item.name == "" || !item.name) ballChildren.forEach(b => {
						newArr.forEach(n => {
							if (b.id == n) {
								arr.push(b.name)
								item.name = arr.toString();
							}
						})
					})
					this.total.stakeCount = item.stakeCount;
					this.total.totalPrice = item.totalPrice;
				} else {
					if (item.name == "" || !item.name) ballChildren.forEach(b => {
						if (b.id == item.playId) {
							item.name = b.name;
						}
					})
					this.total.stakeCount += item.stakeCount;
					this.total.totalPrice = item.unitPrice;
				}
			})
			this.$store.dispatch('setOrderList', this.orderList)
		},
		//下注接口
		buy() {
			this.orderList.forEach(item => {
				item.chaseNum = 0;
				delete item.code; // true
			})
			let param = {
				"lotteryId": this.lotteryId,
				"lotteryNo": this.headInfo.nextNo,
				"orderList": this.orderList,
			}
			buyOrder(param).then(res => {
				if (res.code === 200) {
					this.$refs.confirm.close();
					this.refreshBalance()
					this.playing.removeStorage('playingList');
					uni.navigateTo({
						url: '/pages/liuhe/betting_results?lotteryNo=' + param.lotteryNo +
							'&lotteryId=' + this.lotteryId
					})
				} else if (res.code === 774) {
					this.$refs.confirm.close();
					if (['sign', 'demo'].includes(this.userInfo.userType)) {
						uni.$emit('showPop', {
							refName: 'AlertTestMsg',
						})
					} else {
						this.$refs.balance.open();
					}
				} else if (res.code === 701) {
					this.errorMsg = res.message;
					this.$refs.result.open()
				} else {
					uni.showToast({
						title: res.message,
						icon: "none"
					})
				}
			})
		},
		toBuyOrder() {
			this.isBetting = true; //下注时打开注单开关
			if (this.menuList.find(item=>item.code === 'cart')?.isOpen) { //快速投注下单不跳转
				this.orderList.forEach(item => {
					item.chaseNum = 0;
					delete item.code; // true
				})
				let param = {
					"lotteryId": this.lotteryId,
					"lotteryNo": this.headInfo.nextNo,
					"orderList": this.orderList,
				}
				buyOrder(param).then(res => {
					if (res.code === 200) {
						this.isBetting = false; //拿到结果后关闭开关
						this.refreshBalance()
						this.playing.removeStorage('playingList');
						this.orderList = [];
						this.closeBuy();
						this.$store.dispatch('setOrderList', [])
						this.cancelBtn();
						uni.showToast({
							title: this.$t("pages.liuhe.liuhePlaying.text22"),
							icon: "success"
						})
					} else if (res.code === 774) {
						this.isBetting = false; //拿到结果后关闭开关
						this.$refs.confirm.close();
						if (['sign', 'demo'].includes(this.userInfo.userType)) {
							uni.$emit('showPop', {
								refName: 'AlertTestMsg',
							})
						} else {
							this.$refs.balance.open();
						}
					} else if (res.code === 701) {
						this.isBetting = false; //拿到结果后关闭开关
						this.errorMsg = res.message;
						this.$refs.result.open()
					} else {
						this.isBetting = false; //拿到结果后关闭开关
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			} else {
				this.buy();
			}
		},
		cancelBtn() {
			this.$refs.confirm.close();
		},

		//前往购买
		toBuy(obj) {
			if (this.headInfo.stampType === 1) {
				this.isCloseBuy = true;
			}
			if (this.userInfo) {
				this.orderTotal = { //打开前清空一次
					count: 0,
					price: 0
				}
				this.orderList.map(item => {
					if (item.unitPrice === 0) {
						item.unitPrice = 1
					}
					if (obj.unitPrice === "") {
						obj.unitPrice = 1
					}
					item.unitPrice = Number(obj.unitPrice);
					item.rebatePoint = Number(obj.userRebate);
					item.totalPrice = Number(item.unitPrice) * Number(item.stakeCount);
					this.orderTotal.count += item.stakeCount;
					this.orderTotal.price += item.stakeCount * item.unitPrice;
				});
				if (this.menuList.find(item=>item.code === 'cart')?.isOpen) {
					let code = '';
					if (this.orderList[0]) {
						this.playing.setStorage(this.orderList[0].code, this.orderList);
						code = this.orderList[0].code;
					}
					uni.navigateTo({
						url: '/pages/liuhe/cart?code=' + code + '&id=' + this.lotteryId
					})
				} else {
					this.$refs.confirm.open();
				}
			} else {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
			}

		},
		//closeCartWin(){
		//this.isShowOrder = this.cartList.length > 0;
		//},
		//玩法总种类切换
		onTypeSelected(item) {

			this.selectedItem = item
			if (item.code === "changlong") {
				this.haveChanglong = true;
			} else {
				this.haveChanglong = false;
			}
			this.$store.commit("SET_ISHIDEUSERREBETANUM", false);
			this.$store.dispatch('setLotteryUserRebateMum', { id: this.lotteryId, num: 0 })
			this.closeBuy()
		},
		//二级顶部切换
		onSelectedType(v) {
			this.closeBuy()
		},

		//关闭购物车窗口
		closeBuy() {
			//清空返点
			uni.$emit(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT);
			this.$store.dispatch('setOrderList', []);
			if (this.cartList.length > 0) {
				return
			}
			this.isShowOrder = false;
		},
		//滑动删除orders的一个item
		removeOrder(index) {
			let orders = this.orderList;
			orders = orders.filter((item, i) => i !== index);
			this.$store.dispatch('setOrderList', orders);
			if (orders.length === 0) {
				this.isShowOrder = false;
			}
		},
		//右上角菜单开关控制
		switch1Change(item, index) {
			let msg = '';
			let menus = this.menuList;
			if (item.code === "cart") {
				if (this.cartList.length > 0) {
					uni.showToast({
						title: this.$t("pages.liuhe.liuhePlaying.text23"),
						icon: "none"
					})
					return
				}
			}

			for (let i = 0; i < menus.length; i++) {
				if (menus[i].code === item.code) {
					menus[i].isOpen = !item.isOpen
					let text = menus[i].isOpen ? this.$t("pages.liuhe.liuhePlaying.open") : this.$t(
						"pages.liuhe.liuhePlaying.close")
					msg = item.name + text;
					break;
				}
			}
			this.playing.saveMenuList(this.menuListStoregeKey, this.lotteryId, menus);
			uni.showToast({
				title: msg,
				icon: "none"
			})
		},
		onShowMenu() {
			this.isShowMenu = !this.isShowMenu;
			// this.menuList = this.playing.readMenuList(this.menuListStoregeKey, this.lotteryId, this.menuList);
		},
		closeMenu() {
			this.isShowMenu = false;
		},
		setUpdateData(currentIssue, nextIssue) {
			// 如果之前没有记录或当前期数字发生了变化
			if (this.previousNextIssue === null || currentIssue === this.previousNextIssue) {
				// 如果当前期数字等于之前的下一期数字
				if (currentIssue === this.previousNextIssue) {
					this.lists()
				}
				// 更新上一期记录的数字为本次的下一期数字
				this.previousNextIssue = nextIssue;
			}
		},
		/**
		 * websocket 新增区域
		 * */
		doUpdateHeaderInfoFromSocket(content) {
			let mipaiObj = this.menuList.find(item => item.code == 'mipai')
			if (this.headInfo.lotteryNo < content.lotteryNo && mipaiObj.isOpen && content.stampType !== 3) {
				this.headInfo = content;
				this.getBettingList();
				if (this.isShowMiPai) {
					this.$refs.mipai.reset()
				} else {
					this.isShowMiPai = true;
					this.$refs.mipai.init();
				}
			}
			this.setUpdateData(Number(content.shorNo), Number(content.nextShorNo));
			this.headInfo = content;
			if (content.stampType === 1 && content.msgDetail) {
				this.isCloseBuy = true;
			}
			this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
			this.playing.setStorage('lotteryNo', {
				lotteryNo: content.nextNo
			});
		},
		doCommitUpdateEventBySocket() {
			let socketInitStruct = {
				event: "getGameInfo",
				lotteryId: this.lotteryId
			};
			websocetObj.sendMsg(socketInitStruct);
			// this.lists()
		},
		/**
		 * 获取聊天室链接参数
		 */
		initChatRoomUrl() {
			let _this = this;
			getChatRoomInfo({
				lotteryId: this.lotteryId
			}).then((res) => {
				_this.chatRoomUrl = res.result;
				console.log("chatRoomUrl", _this.chatRoomUrl)
				_this.chatRoomCode = res.code
				_this.chatRoomMessage = res.message
			});
		},
		pageInputChange({
			isOpen = false
		}) {
			let systemInfo = uni.getSystemInfoSync();
			let screenHeight = systemInfo.screenHeight;
			let winHegiht = systemInfo.windowHeight;
			this.isOpenHeight = isOpen ? screenHeight - winHegiht - this.otherHeight + this.windowTop : 0;
		}
	}


}
</script>
<style lang="scss" scoped>
/deep/ .uni-navbar__header-btns-right {
	width: 640rpx !important;
}

.nav-bar:before {
	content: "";
	width: 100%;
	height: 80rpx;
	background: linear-gradient(90deg, #00638d 30%, #0a3c77);
	position: absolute;
	z-index: -1
}

.input-fixed-box {
	position: fixed;
	top: 0px;
	width: 100%;
	max-width: 480px;
	padding-bottom: 0 !important;
    margin-bottom: 0 !important;
}

.liuhe-board {
	overflow: hidden;
	position: relative;
	//height: var(--vh);
	display: flex;
	flex-direction: column;
	/*position: fixed;*/
	/*top: 0px;*/

	.error-modal {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*padding: 20rpx 54rpx;*/
		/*gap: 30rpx;*/
		width: 600rpx;
		/*height: 396rpx;*/
		background: #FFFFFF;
		border-radius: 36rpx;

		.title {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;
			gap: 10rpx;
			width: 500rpx;
			height: 108rpx;
			/*border-bottom: 1rpx solid #DDDDDD;*/
			flex: none;
			order: 0;
			flex-grow: 0;
			font-size: 34rpx;
			line-height: 108rpx;
			text-align: center;
			letter-spacing: -1rpx;
			color: #404040;
		}

		.content {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			padding: 10rpx;
			gap: 10rpx;
			width: 406rpx;
			min-height: 144rpx;
			font-size: 30rpx;
			line-height: 50rpx;
			text-align: center;
			letter-spacing: -1rpx;
			color: #404040;
		}

		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			/*padding: 10rpx 74rpx;*/
			/*gap: 20rpx;*/
			/*background: #FF9900;*/
			width: 100%;
			height: 88rpx;
			border-top: 2rpx solid var(--theme-auxiliary-color-default);
			/*border-radius: 264rpx;*/
			font-size: 34rpx;
			line-height: 88rpx;
			text-align: center;
			letter-spacing: -1rpx;
			color: #FFFFFF;
		}
	}

	.top-header {
		.live-container {
			width: 100%;
			height: 326rpx;
			background: #000000;

			.video {
				height: 100%;
			}
		}

		.nav-title {
			color: #FFF;
			text-align: center;

			font-size: 34rpx;
			font-weight: 500;
			display: flex;
			align-items: center;

			.back {
				width: 22rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				margin-left: 20rpx;
				color: #FFF;
				text-align: center;

				font-size: 34rpx;
				font-weight: 500;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 280rpx;
			}
		}

		.nav-right {
			display: flex;

			.balance {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;

				.balance-text {
					text-align: right;
					letter-spacing: -1rpx;

					font-size: 34rpx;
					color: #FFD43D;
					//background: linear-gradient(90deg, #F1CF78 0%, #F6E195 54.17%, #F1CF78 100%);
					background-clip: text;
					//-webkit-background-clip: text;
					//-webkit-text-fill-color: transparent;
					margin-right: 20rpx;
					width: 400rpx;
					text-overflow: ellipsis;
					overflow: hidden;

					/deep/ .u-count-num {
						letter-spacing: -1rpx !important;
						font-family: 'Roboto' !important;
						font-size: 34rpx !important;
						font-style: normal !important;
						font-weight: 600 !important;
						line-height: normal !important;
					}
				}

				image {
					width: 42rpx;
					height: 42rpx;
				}
			}

			.balance.refresh {
				image {
					width: 38rpx;
					height: 38rpx;
					animation: mymove 1s infinite;
					/*Safari 和 Chrome:*/
					-webkit-animation: mymove 1s infinite;
				}
			}

			@keyframes mymove {
				from {
					transform: rotate(0deg);
				}

				to {
					transform: rotate(360deg);
				}
			}

			.menu {
				height: 48rpx;
				width: 48rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.board:before {
			content: "";
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, #00638d 30%, #0a3c77);
			position: absolute;
			z-index: -1
		}

		.board {
			background-size: cover;
			position: relative;
			height: 245rpx;
			background-image: url("@/static/img/liuhe/bg-board.svg");
			background-position: center;
			.board-content {
				display: flex;
				width: 100%;
				height: 245rpx;

				.board-content-item {
					width: 544.5rpx;
					flex: 2;

					.top {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 26rpx;
						}
					}
				}

				.board-content-item-right {
					display: flex;
					align-items: center;
					flex: 1;
					flex-direction: row-reverse;
					justify-content: center;

					.line4 {
						width: 200rpx;
					}
				}
			}

			.mask {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.5);
				width: 100%;
				max-width: 480px;
				margin: auto;
				height: calc(var(--vh) - 40px);
				z-index: 11;
			}

			.show-menu {
				position: absolute;
				right: 0;
				top: 0;
				width: 432rpx;
				background: #FFF;
				z-index: 11;
				box-shadow: 0 4rpx 12rpx 0 rgba(0, 0, 0, 0.15);
				border-radius: 24rpx;
				overflow: hidden;

				.show-menu-item.user {
					background: #FFFFFF;
				}

				.show-menu-item.active {
					background: #FFFFFF;
				}

				.show-menu-item {
					background: var(--theme-auxiliary-color-default);
					height: 108rpx;
					width: 100%;
					height: 108rpx;
					border-bottom: 2rpx solid #F1F1F1;
					font-size: 28rpx;
					color: #535353;
					display: flex;

					.item-content {
						display: flex;
						align-items: center;
						width: 100%;
						padding: 0 28rpx;

						.item-name {
							width: 180rpx;
							flex: 1;
							color: #404040;

							font-size: 30rpx;
						}

						.item-user {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.switch {
							display: flex;
							align-items: center;

							.custom-switch {
								height: 48rpx;
								margin-left: 36rpx;

								.custom-switch-close {
									width: 84rpx;
									height: 48rpx;
								}

								.custom-switch-open {
									width: 84rpx;
									height: 48rpx;
								}
							}
						}

						.item-icon {
							width: 48rpx;
							height: 48rpx;
							margin-right: 20rpx;

							image,
							.image {
								width: 48rpx;
								height: 48rpx;
							}
						}
					}
				}
			}

			.show-Shengxiao {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 21rpx 0 21rpx;

				.show-Shengxiao-item:last-child {
					margin: 0;
				}

				.show-Shengxiao-item {
					font-size: 28rpx;
					width: 58rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: rgba(255, 255, 255, 0.5);
					margin-right: 8rpx;
				}
			}

			.close-ball-list {
				display: flex;
				justify-content: space-between;
				padding: 0 21rpx 0 21rpx;

				.close-ball-item {
					background-image: url("@/static/img/liuhe/ball/2.svg");
					background-position: center;
					background-size: 100% 100%;
					font-size: 28rpx;
					width: 58rpx;
					height: 67rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #0280C9;
					margin-right: 8rpx;
				}

				.close-ball-item-add {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 8rpx;

					image {
						width: 25rpx;
						height: 25rpx;
					}
				}
			}

			.top {
				color: #fff;
				font-size: 28rpx;
				text-align: center;
				padding: 35.5rpx 42.5rpx 35.5rpx 42.5rpx;

				.status {
					border: 2rpx solid #fff;
					border-radius: 26rpx;
					padding: 2rpx 10rpx;
					margin-left: 28rpx;
					font-size: 24rpx;
				}
			}

			.info {
				font-size: 28rpx;
				color: #fff;
				padding-top: 32rpx;
				text-align: center;

				.line1 {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 7rpx;

					.live-text {
						color: #F5A225;
						font-weight: 400;
						font-size: 22.5rpx;
						/* identical to box height */

						text-align: center;
						letter-spacing: -1rpx;
						margin-left: 7.5rpx;
					}

					image {
						width: 41rpx;
						height: 36rpx;
					}
				}

				.line2 {
					font-size: 26rpx;

					text {
						margin: 0 8rpx 0 8rpx;
					}
				}

				.line3 {
					color: #416B9C;
					font-size: 26rpx;
				}

				.line4 {
					letter-spacing: -0.5px;
					text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50), ;
					font-weight: 500;

					font-size: 50rpx;
					margin-bottom: 38rpx;
					color: #F6F6F6;
				}
			}
		}
	}

	.history-div {
		height: 0;
		overflow-y: scroll;
		transition: .3s;
		z-index: 1;
		width: 100%;
		max-width: 480px;
	}

	.history-div.active {
		height: 640rpx;
		transition: .3s;
	}

	.tab {
		display: flex;
		position: relative;
		width: 100%;
		height: 74rpx;
		border-bottom: 2rpx solid #0099CC;

		.show-records {
			position: absolute;
			width: 100%;
			height: 24rpx;
			top: -12rpx;
			display: flex;
			justify-content: center;
			z-index: 1;

			//left: 50%;
			//transform: translate(-50%, 0);
			//background: #404040;
			image {
				width: 150rpx;
			}
		}

		.tab-item {
			flex: 1;
			text-align: center;
			height: 74rpx;
			line-height: 74rpx;
			background-color: #DEEAFA;
			font-size: 28rpx;
			color: #458198;
			font-weight: 400;
		}

		.tab-item.selected {
			font-weight: 500;
			font-size: 30rpx;
			color: #03536E;
			background-image: linear-gradient(to bottom, #FEFEFF, #DFEBFB);
		}
	}

	.tab-content.active {
		height: calc(100% - 1000rpx);
		overflow: hidden;
		transition: .3s;
	}

	.tab-content {
		/*height: 100%;*/
		flex: 1;
		transition: .3s;
		display: flex;
		flex-direction: column;

		.bet-list {
			//height: 100%;
			background: #deeafa;

			flex: 1;
			height: 100%;
		}

		.bet-list.active {
			//height: calc(var(--vh) - 730rpx);
		}

		.add-chart.up {
			height: fit-content;
			width: 100%;
			padding-bottom: var(--safe-area-inset-bottom);
			background: #fff;
			// position: absolute;
			//  bottom: 0;
			// z-index: 2;
			//transition: .3s;
		}

		.add-chart {
			//bottom: -262rpx;
			height: 0rpx;
			width: 100%;
			// position: absolute;
			transition: all .3s linear;
			overflow: hidden;
			//position: fixed;
			//bottom: 0;
		}

	}

}

.chat-room-unlogin {
	margin-top: 200rpx;
	text-align: center;
	font-size: 24rpx;
	color: grey;
}

/deep/ * {
	font-family: "PingFang SC";
}
</style>
