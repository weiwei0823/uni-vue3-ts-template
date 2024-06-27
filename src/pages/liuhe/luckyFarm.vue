<template>
	<view class="input-fixed-box">
		<view class="elevenOutOfFive-board" :style="{height: uWindowHeight+'px'}">
			<mi-pai ref="mipai" @closeMiPai="closeMiPai" :your-betting-list="yourBettingList" :head-info="headInfo"
				:is-show-mi-pai="isShowMiPai"></mi-pai>
			<view class="top-header" v-if="isShowLive">
				<view class="live-container">
					<!--              &lt;!&ndash; 播放器显示区域 &ndash;&gt;-->
					<liuhe-live-box v-if="isLive" :gameHeaderInfo="headInfo"
						@onClose="isShowLive = false"></liuhe-live-box>
				</view>
			</view>
			<view class="top-header" v-else>
				<nav-bar :nav-bar-height="'80rpx'" :isBack="false" :left-width="220" :right-width="260" :title="''"
					:headerTop="keyBoardHeight" :titleStyle="titleStyle" :font-color="titleStyle.color" :header-style="{
          height: '40px',
          backgroundImage: `url(${this.navBg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'transparent',
          position: 'relative'
        }" class="nav-bar">
					<block slot="left">
						<view class="nav-title" @click="goBack">
							<view class="back">
								<image src="@/static/img/liuhe/back.png"></image>
							</view>
							<view class="title">
								{{ title }}
							</view>
						</view>
					</block>
					<block slot="right">
						<view class="nav-right">
							<view :class="refresh ? 'balance refresh' : 'balance'" @click="refreshBalance">
								<text class="balance-text" v-if="userInfo">
									<text style="margin-right: 4px">¥</text>&nbsp;
									<u-count-to :decimals="2" :start-val="0" :end-val="userBalance"
										@end="isEnd = true"></u-count-to>
								</text>
								<text class="balance-text" style="color: #FFFFFF" v-else>¥{{ setAmount(0) }}</text>
								<image src="@/static/img/liuhe/refresh.png" v-if="userInfo"></image>
							</view>
							<view class="menu" @click="onShowMenu">
								<image src="@/static/img/liuhe/menu.png"></image>
							</view>
						</view>
					</block>
				</nav-bar>
				<view class="board" :style="{paddingTop:`${keyBoardHeight}px`}">
					<nav-menu :is-show-menu="isShowMenu" :user-info="userInfo" :menu-list="menuList"
						@closeMenu="closeMenu" @toUrl="toUrl" @toLogin="toLogin"
						@switch1Change="switch1Change"></nav-menu>
					<view class="board-content">
						<view class="board-content-item-left">
							<view class="top">
								<text v-if="showRoundInfo.stampType === 3">{{ `${$t("pages.liuhe.common.text1")}${showRoundInfo.nextShorNo ? showRoundInfo.nextShorNo :
                    ''}${$t("pages.liuhe.liuhePlaying.text2")}`
                  }}</text>
								<text
									v-else>{{ `${$t("pages.liuhe.common.text1")}${showRoundInfo.shorNo ? showRoundInfo.shorNo : ''}${$t("pages.liuhe.liuhePlaying.text2")}` }}</text>
								<text class="status" @click="toAccount">{{$t("pages.liuhe.common.text3")}}</text>
							</view>
							<view class="ball-list" v-if="headInfo.stampType === 2">
								<view class="ball-list-item"
									v-for="(item, index) in this.headInfo.lotteryResult ? this.headInfo.lotteryResult.split(',') : []"
									:key="index">
									<view class="ball-num">
										<text class="text">{{ item }}</text>
									</view>
								</view>
							</view>
							<view class="close-ball-list" v-if="headInfo.stampType === 3">
								<view class="close-ball-item" v-for="item in closeShowBall">
									<text class="ball-text">?</text>
								</view>
							</view>
							<view class="result-detail" v-if="headInfo.stampType === 2">
								{{ headInfo.resultDetail }}
							</view>
						</view>
						<view class="board-content-item">
							<view class="info">
								<view class="line1" v-if="isLive" @click="isShowLive = true">
									<image src="@/static/img/liuhe/live.png" />
									<text class="live-text">{{$t("pages.liuhe.common.text4")}}</text>
								</view>
								<view class="line2">
									{{$t("pages.liuhe.common.text1")}}<text>{{ showRoundInfo.nextShorNo }}</text>{{$t("pages.liuhe.common.text2")}}
								</view>
								<view class="line3">
									<text v-if="showRoundInfo.stampType === 1">{{$t("pages.liuhe.common.text5")}}</text>
									<text v-if="showRoundInfo.stampType === 2">{{$t("pages.liuhe.common.text6")}}</text>
									<text style="color: #FFFF00"
										v-if="showRoundInfo.stampType === 3">{{$t("pages.liuhe.common.text7")}}</text>
								</view>
								<view class="line4">{{ runtimes }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<order-comfirm ref="confirm" v-if="haveChanglong === false" :title="title" :showRoundInfo="showRoundInfo"
				:orderList="orderList" :orderTotal="orderTotal" :isBetting="isBetting" @cancelBtn="cancelBtn"
				@toBuyOrder="toBuyOrder">

			</order-comfirm>
			<changlong-order-comfirm v-if="haveChanglong" ref="confirm" :changlong="changlong"
				:showRoundInfo="showRoundInfo" :orderList="orderList" :orderTotal="orderTotal" :isBetting="isBetting"
				@cancelBtn="cancelBtn" @toBuyOrder="changlongBuy">
			</changlong-order-comfirm>
			<view :class="isShowRecords ? 'history-div active' : 'history-div'">
				<Records :dataList="dataList" @setShowRecords="setShowRecords" :isShowRecords="isShowRecords"></Records>
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
			<view :class="isShowRecords ? 'tab-content active' : 'tab-content'" :style="setTabStyle">
				<view :class="isShowOrder ? 'bet-list active' : 'bet-list'" v-show="current == 1">
					<betting-area ref="betting" @changlongOrder="changlongOrder" @showBuy="showBuy"
						@setOrders="setOrders" @selected="onTypeSelected" :playList="playList"
						@onSelectedType="onSelectedType" />
				</view>
				<view v-if="current == 2">
					<BetSlip ref="betSlip" :lotteryId="lotteryId" />
				</view>
				<view v-if="isLoadingChatRoom" v-show="current == 3" style="height: 100%;">
					<view v-if="!userInfo" class="chat-room-unlogin">
						<view @click="toLogin"><span
								style="color: blue">{{$t("pages.liuhe.common.text8")}}</span>{{$t("pages.liuhe.common.text9")}}
						</view>
					</view>
					<view v-else-if="!chatRoomUrl || chatRoomCode === 600"
						:style="`width: 100%;height: calc( var(--vh) - 326rpx - 76rpx );border:none;`">
						<view style="color: darkgrey;margin-top: 200rpx;text-align: center">
							{{ chatRoomMessage }}
						</view>
					</view>
					<!--            <web-view v-else :fullscreen="false"  style="width: 100%;height: calc( var(--vh) - 326rpx - 76rpx )" :src="`https://vnlive.club/external/toChatRoom/v1?userId=${userInfo.id}`"></web-view>-->
					<!--          <web-view id="ifreme-chat-room" v-else-if="isLoadingChatRoom && chatRoomUrl" :fullscreen="false"-->
					<!--                    :style="`width: 100%;height: calc( var(--vh) - 326rpx - 76rpx );border:none;`"-->
					<!--                    :src="chatRoomUrl"></web-view>-->
					<ChatRoom :chatRoomUrl="chatRoomUrl" v-on:onInputChange="pageInputChange" :isFullscreen="false"
						v-else-if="isLoadingChatRoom && chatRoomUrl" :style="`width: 100%;height: 100%;border:none;`" />

				</view>

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
			<show-modal :title="modalTitle" ref="show" @submit="clearCartToBack">
				<view slot="content" class="modal-content">
					{{$t("pages.liuhe.common.text11")}}
					<view>{{$t("pages.liuhe.common.text12")}}</view>
				</view>
			</show-modal>
			<uni-popup :title="$t('pages.liuhe.common.text13')" type="dialog" ref="result">
				<view class="error-modal">
					<view class="title">
						{{$t('pages.liuhe.common.text14')}}��提示
					</view>
					<view class="content">
						{{ errorMsg }}
					</view>
					<view class="footer" :style="{color:themeColor.themeColor}" @click="yes()">
						{{$t('pages.liuhe.common.text15')}}�道了！
					</view>
				</view>
			</uni-popup>
			<pre-set-amount ref="preSet" @setValue="setValue"></pre-set-amount>
			<balance-modal ref="balance"></balance-modal>
			<LeftMenu :lotteryId="lotteryId" ref="LeftMenu" />
			<AlertInjectLayer />
		</view>
	</view>
</template>
<script>
	import NavBar from "@/components/common/navBar/navBar";
	import BallNumbers from "./common/numbers";
	import WebSocketAlert from "./common/WebsocketAlert";
	import BetSlip from "@/components/common/lottery/BetSlip";
	import BettingArea from "./luckyFarm/betting";
	import Buy from "./common/buy";
	import Records from "./luckyFarm/records";
	import BalanceModal from "./common/BalanceModal.vue"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
  import templateSelector from "@/config/templateMemSelector/WholeSelector.js"
	import ChatRoom from "../../components/common/chatRoom/index.vue";


	import {
		getPlayList,
		getPlayMiniList,
		getLotteryStat,
		getRewardsInfo,
		buyOrder,
		list,
		getHistoryList,
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

	// import Lives from '@/components/common/live/live'
	//#ifdef APP_PLUS
	import AppLives from '@/components/common/live/applive'
	//#endif
	import LeftMenu from './common/LeftMenu'
	import LiuheLiveBox from '@/components/common/live/LiuheLiveBox'
	import OrderComfirm from "./common/orderComfirm.vue";
	import NavMenu from "./common/navMenu.vue";
	import PreSetAmount from "./common/preAmountSetting.vue";
	import ChanglongOrderComfirm from "./common/changlongOrderComfirm.vue";
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
  import useLotteryStore from "@/store/modules/LotteryStore";
  import usePlayingStore from "@/store/modules/playIngStore";
  import useWebsocketStore from "@/store/modules/websocketStore";
	const navMenu = new Playing().menuList;
	export default {
		components: {
			ChanglongOrderComfirm,
			PreSetAmount,
			NavMenu,
			OrderComfirm,
			AlertInjectLayer,
			LeftMenu,
			Records,
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
			WebSocketAlert,
			LiuheLiveBox,
			ChatRoom,
			PreSetAmount
			// Lives,
		},
		data() {
			return {
				modalTitle: this.$t("pages.liuhe.common.text14"),
				isShowMiPai: false,
				errorMsg: "",
				yourBettingList: [],
				isShowLive: false,
				dataList: [],
				isRefresh: true,
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
					{
						id: 7
					},
					{
						id: 8
					},
				],
				navBg: require('@/static/img/liuhe/luckyFarm/header-bg.png'),
				numbers: ["05", "45", "49", "39", "12", "40", "10"],
				isShowRecords: false,
				showImg: require('@/static/img/liuhe/show.png'),
				hideImg: require('@/static/img/liuhe/hide.png'),
				isShowOrder: false,
				orders: [],
				tabList: [{
						label: '投注区',
						value: 1,
					},
					{
						label: '今日注单',
						value: 2,
					},
					{
						label: '聊天室',
						value: 3,
					},
				],
				id: 0,
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
				menuList: navMenu,
				orderTotal: {
					count: 0,
					price: 0
				},
				cartList: [],
				userInfo: {
					nickname: ""
				},
				lotteryId: null,
				ballItem: {},
				refresh: false,
				isCloseBuy: false,
				times: null,
				pageSize: 120,
				isLive: false,
				coins: [5, 10, 50, 100, 500],

				//新增MR 避免打开页面立即加载聊天室和主进程抢网络资源。 用户点击菜单后再加载
				isLoadingChatRoom: false,
				chatRoomUrl: null,
				chatRoomCode: '',
				chatRoomMessage: '',
				isBetting: false, //下注时按钮显示注单中，防止网络不好再次点击下注
				//计算的出得 浏览器输入区域和底部占用高度
				otherHeight: 0,
				haveChanglong: false,
				changlong: {
					isChanglong: false,
					nextNo: "",
				},
				currentAmount: 1,
				isOpenHeight: 0,
				previousNextIssue: null
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["windowTop", 'uWindowHeight']),
      ...mapState(useLotteryStore, ["inLotteryGameName", "inLotteryId"]),
      ...mapState(usePlayingStore, ["orderList"]),
      ...mapState(useWebsocketStore, ["websocketTimeInterval"]),
			keyBoardHeight() {
				return this.windowTop + this.isOpenHeight
			},
			menuListStoregeKey() {
				return "menuList:" + this.lotteryId;
			},
			lotteryListKey() {
				return "lotteryList:" + this.lotteryId;
			},
			userBalance() {
				let num = 0;
				num = this.$store.state.appInfoStore.userInfo ? parseFloat(this.$store.state.appInfoStore.userInfo
					.userBalance) : 0;
				return num;
			},
			showRoundInfo() {
				return this.isClientRun ? this.headInfo['nextRound'] : this.headInfo;
			},

			isClientRun() {
				let roundMsg = Object.assign({}, this.headInfo);
				let nextRound = roundMsg['nextRound'];
				return !!this.headInfo && !!this.headInfo['nextRound'];
			}
		},
		onUnload() {
			clearInterval(this.times);
		},
		onReachBottom() {

		},
		onShow() {
			this.$nativeBridge.setTopSpace(0)
			this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
			//购物车返回时会存入一个true的布尔值，这个位置用于取值，判断是在购物车返回时触发
			let cartBack = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.ORDER_CAR_BACK);
			if (cartBack) {
				//购物车返回时触发取消订单的选中，并设置值为false，这样解决了购物车返回清楚选中，也避免切换窗口时取消选中的bug
				this.$store.dispatch('setOrderList', [])
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.ORDER_CAR_BACK, false);
			} else {
				console.warn("cartBack undefined")
			}
			this.getCartList()
			this.isShowMenu = false;
			// this.closeBuy()
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
      this.windowHeight = uni.$sys.windowHeight + "px";
      uni.$on("onWindowResize", function (sizeInfo) {
        _this.windowHeight = sizeInfo.size.windowHeight + "px";
      });
      if (option.id) { //判断id进入后，获取数据
        this.lotteryId = option.id;
        if (this.inLotteryId != -1 && this.inLotteryId == this.lotteryId) { //未在其它区域清理 inlotteryId  先这样处理吧
          this.doCommitUpdateEventBySocket();
        }
        this.$store.commit("SET_LOTTERY_STORE_LOTTERY_ID", this.lotteryId);
        uni.$off("onGetGameInfo");
        uni.$on("onGetGameInfo", function (resultInfo) {
          _this.doUpdateHeaderInfoFromSocket(resultInfo.data)
        })
        let memLotteryListTemplate = await templateSelector.getMemeLotteryByLotteryId(this.lotteryId);
        if (memLotteryListTemplate) {
          this.playList = memLotteryListTemplate;
        } else {
          console.error("当前游戏默认模板未录入，请前往memLiuheLotteryList.js 添加 lotteryId=" + this.lotteryId);
        }
        this.$nextTick(function () {
          _this.getPlayLists()
        });
        this.getHeadInfo();
      }
      //初始化基础信息
      this.initInfo();

      if (option.down) {
        uni.showToast({
          title: this.$t("pages.liuhe.common.text19"),
          icon: "success"
        })
      }
      if (option.cancel == 0) {
        this.current = 2;
        pop(this.$t("pages.liuhe.common.text20"), 1000);
      }
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

      uni.setNavigationBarTitle({
        title: this.title
      });
      this.id = option.id
      this.getLotteryStatus()
      this.lists();
      this.$nextTick(function () {
        _this.closeBuy();
        _this.$store.dispatch('setOrderList', [])
      })
      if (isLogin()) {
        this.initChatRoomUrl();
      }
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
			initInfo() {
				this.systemInfo = uni.$sys;
				this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
				this.title = this.inLotteryGameName;
				uni.hideTabBar()
				uni.$on('getLotteryMsg', this.getLotteryInfo)
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
			closeMiPai() {
				this.isShowMiPai = false;
			},
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
						success: function(res) {
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
							title: this.$t("pages.liuhe.common.text14"),
							content: this.$t("pages.liuhe.common.text23")
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
			clearCartToBack() {
				this.cartList = [];
				this.playing.setStorage('playingList', this.cartList)
				this.toHomePage();
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

				if (item.code === "recent") {
					item.url = "/pages/liuhe/luckyFarm/recent_draws"
					uni.navigateTo({
						url: item.url + "?id=" + this.lotteryId + "&lotteryName=" + this.title
					})
					return;
				}
				uni.navigateTo({
					url: item.url + "?id=" + this.id
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
				var sendCondRun = function(useSecend) {
					time -= useSecend;
					//避免出现-1的情况
					_this.runtimes = _this.playing.timestampToDate(time < 0 ? 0 : time);
					if (time < 0 || time === 0) {
						_this.lists();
						clearInterval(_this.times);
						_this.doCommitUpdateEventBySocket();
						return;
					}
					if (_this.headInfo && Date.now() >= _this.headInfo.nextTime) {
						_this.lists();
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
					height: "40px",
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

				// getPlayMiniList({lotteryId:this.lotteryId}).then(res=>{
				//   if (res.code === 200) {
				//   }
				// });
				getPlayList({
					lotteryId: this.lotteryId
				}).then(res => {
					if (res.code === 200) {
						this.playList = res.result;
						this.setShowChanglong();
					} else {
						uni.showToast({
							title: res.message,
							icon: 'error'
						})
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
			getBettingList() {
				list({
					type: 1,
					lotteryNo: this.headInfo.lotteryNo,
					lotteryId: this.lotteryId
				}).then(res => {
					if (res.code === 200) {
						this.yourBettingList = res.result.page.records
					}
				})
			},
			//ws头部信息更新
			getLotteryInfo(e) {
				let data = e.data;
				let obj = JSON.parse(data.msgTxt);
				if (data.source === 2) {
					if (obj.lotteryId == this.lotteryId) {
						this.headInfo = obj;
						clearInterval(this.times);
						this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
						//stampType为3是封单中，为1是封盘中，1和3都不能下注，1 封盘段 2 购彩段 3封单(关盘)段
						if (this.headInfo.lotteryNo < obj.lotteryNo && this.menuList[7].isOpen && this.headInfo
							.stampType !== 3) {
							this.getBettingList();
							if (this.isShowMiPai) {
								this.$refs.mipai.reset()
							} else {
								this.isShowMiPai = true;
								this.$refs.mipai.init();
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
				getRewardsInfo({
					lotteryId: this.lotteryId
				}).then(res => {
					this.headInfo = res.result;
					if (res.result.stampType === 1) {
						this.isCloseBuy = true;
					}
					this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
					this.playing.setStorage('lotteryNo', {
						lotteryNo: res.result.nextNo
					});
				})
			},

			showBuy() {
				this.isShowOrder = true;
			},

			/**
			 * 处理设置订单
			 */
			setOrders(data) {
				this.isShowOrder = false;
				let {
					selectedIds,
					ball,
					ballChildren,
					ballItem
				} = data;
				this.ballItem = ballItem;
				// if (ball.minNum === 1 || ball.groupOrder) {
				//   this.isShowOrder = this.orderList.length > 0;
				// } else {
				//   this.isShowOrder = this.orderList.length >= ball.minNum;
				// }
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
						// 组合选择情况下 ballChildren 只传入某一个列表的值 所以有错误 建议吧逻辑查分到组件内处理order要么同意在此处理
						if (!item.unRnameFromBallChildren) {
							ballChildren.forEach(b => {
								newArr.forEach(n => {
									if (b.id == n) {
										arr.push(b.name)
										item.name = arr.toString();
									}
								})
							})
						};
						this.isShowOrder = item.stakeCount > 0 ? true : false;
						this.total.stakeCount = item.stakeCount;
						this.total.totalPrice = item.totalPrice;
					} else {
						//todo:已经简化代码，修改逻辑，此处可暂时注释待多个版本测试没问题后，可删除 20230617
						// ballChildren.forEach(b => {
						//   if (b.id == item.playId) {
						//     item.name = b.name;
						//   }
						// })
						this.isShowOrder = this.orderList.length >= ball.minNum;
						this.total.stakeCount += item.stakeCount;
						this.total.totalPrice += item.totalPrice;
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
						if (['sign', 'demo'].includes(this.$config.getStorageSync(this.$config.enumMgr
								.APP_LOCALSTORE_KEYS
								.LOCAL_STORE_USERINFO).userType)) {
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
				if (this.menuList[5].isOpen) { //快速投注下单不跳转
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
								title: this.$t("pages.liuhe.common.text19"),
								icon: "success"
							})
						} else if (res.code === 774) {
							this.$refs.confirm.close();
							if (['sign', 'demo'].includes(this.$config.getStorageSync(this.$config.enumMgr
									.APP_LOCALSTORE_KEYS
									.LOCAL_STORE_USERINFO).userType)) {
								uni.$emit('showPop', {
									refName: 'AlertTestMsg',
								})
							} else {
								this.$refs.balance.open();
							}
						} else if (es.code === 701) {
							this.errorMsg = res.message;
							this.$refs.result.open()
						} else {
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
				this.$refs.confirm.close("center");
			},

			//前往购买
			toBuy(obj) {
				////(this.orderList,obj);
				if (this.headInfo.stampType === 1) {
					this.isCloseBuy = true;
				}
				if (this.userInfo) {
					this.orderTotal = { //打开前清空一次
						count: 0,
						price: 0
					}
					this.orderList.map(item => {
						////(item);
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
						this.$refs.confirm.open("center");
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
				if (item.code === "changlong") {
					this.haveChanglong = true;
				} else {
					this.haveChanglong = false;
				}
				this.closeBuy()
			},
			//二级顶部切换
			onSelectedType() {
				this.closeBuy()
			},
			setCustomAmount(amount) {
				this.playing.setUnitPrice(amount)
			},
			//关闭购物车窗口
			closeBuy() {
        //清空返点
        uni.$emit(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LIUHE_BUY_REBATE_INIT);
				if (this.headInfo.lotteryTypeId === 30) {
					if (this.$refs.betting) {
						this.$refs.betting.reset()
					}
				}
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
				if (orders.length === 0) {
					this.isShowOrder = false;
				}
				this.$store.dispatch('setOrderList', orders);
			},
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
				if (this.headInfo.lotteryNo < content.lotteryNo && this.menuList[7].isOpen && content.stampType !== 3) {
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
					_this.chatRoomCode = res.code
					_this.chatRoomMessage = res.message
				});
				// this.chatRoomUrl = `https://vnlive.club/external/toChatRoom/v1?userId=${10000000 + this.userInfo.id % 10000}`;//"http://192.168.0.106:8082/#/?appKey=i6a5mjyqii0lak7w92&time=123456789&secret=fcbdb3612cefcf9cd3022009478a738a&userId=10005248&roomId=CHAT_8f79c34dbd71475ea6559fe15c72ebee";
			},
			pageInputChange({
				isOpen = false
			}) {
				let systemInfo = uni.getSystemInfoSync();
				let screenHeight = systemInfo.screenHeight;
				let winHegiht = systemInfo.windowHeight;
				this.isOpenHeight = isOpen ? screenHeight - winHegiht - this.otherHeight + this.windowTop : 0;
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
		}
	}
</script>
<style lang="scss" scoped>
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
	}

	.elevenOutOfFive-board {
		overflow: hidden;
		position: relative;
		//height: var(--vh);
		display: flex;
		flex-direction: column;

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

		.modal-content {
			font-size: 28rpx;
			text-align: center;
			letter-spacing: -1rpx;
			color: #404040;
			height: 179rpx;
			padding-top: 79rpx;
		}

		.confirm-div {
			width: 540rpx;
			height: 874rpx;
			padding: 20rpx 38rpx;

			.header {
				width: 100%;
				text-align: center;
				height: 60rpx;
				border-bottom: 2rpx solid #E6E6E6;
				font-weight: 400;
				font-size: 32rpx;
				line-height: 40rpx;
				color: #9A9A9A;
			}

			.list-box {
				padding-top: 20rpx;
				height: 660rpx;

				.title {
					display: flex;
					justify-content: space-between;

					.name {
						font-weight: 400;
						font-size: 28rpx;
						line-height: 39rpx;
						color: #404040;
					}

					.period {
						font-weight: 400;
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: right;
						color: #9A9A9A;
					}
				}

				.list-row {
					padding-top: 30rpx;
					height: 500rpx;

					.list-item {
						margin-bottom: 20rpx;

						.played {
							font-weight: 400;
							font-size: 28rpx;
							line-height: 39rpx;
							color: #404040;
						}

						.number {
							font-weight: 400;
							font-size: 25rpx;
							line-height: 35rpx;
							color: #39788D;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.note-box {
							font-weight: 400;
							font-size: 28rpx;
							line-height: 39rpx;
							color: #404040;

							.note {
								margin-right: 24rpx;
							}
						}
					}
				}

			}

			.count-box {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 64rpx;
				line-height: 64rpx;
				border-top: 2rpx solid #E6E6E6;
				font-weight: 400;
				font-size: 24rpx;
				line-height: 34rpx;
				text-align: center;
				color: #000000;

				.note-total,
				.moeney-total {
					margin: 0 8rpx 0 8rpx;
					color: #FF9900;
				}
			}

			.btn-box {
				display: flex;
				justify-content: space-evenly;

				.cancel,
				.confirm-act {
					border-radius: 264rpx;
					height: 60rpx;
					width: 200rpx;
					text-align: center;
					color: #FFFFFF;
					line-height: 60rpx;
				}

				.cancel {
					background: #8CB2C9;
				}

				.confirm-act {
					background: #FF9900;
				}

				.confirm-act-close {
					border-radius: 264rpx;
					height: 60rpx;
					width: 200rpx;
					text-align: center;
					color: #FFFFFF;
					line-height: 60rpx;
					background: #CCCCCC;
				}
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
						font-style: normal;
						font-weight: 600;
						line-height: normal;
						color: #FFD43D;
						//background: linear-gradient(90deg, #F1CF78 0%, #F6E195 54.17%, #F1CF78 100%);
						background-clip: text;
						//-webkit-background-clip: text;
						//-webkit-text-fill-color: transparent;
						margin-right: 20rpx;
						width: 240rpx;
						text-overflow: ellipsis;
						overflow: hidden;

						::v-deep .u-count-num {
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
						-webkit-animation: mymove 5s infinite;
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
				background-image: url("@/static/img/liuhe/luckyFarm/bg.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: relative;
				height: 245rpx;

				.board-content {
					display: flex;
					width: 100%;
					height: 245rpx;

					.board-content-item-left {
						width: 543rpx;
						flex: 2;

						.top {
							width: 100%;
							box-sizing: border-box;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 39.5rpx 0;

							text {
								font-size: 26rpx;
							}
						}
					}

					.board-content-item {
						flex: 1;
						display: flex;
						align-items: center;
						flex-direction: row-reverse;
						justify-content: space-evenly;
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
					width: 270rpx;
					background: #FFF;
					padding: 0 4rpx 0 4rpx;
					z-index: 11;

					.show-menu-item {
						height: 80rpx;
						width: 100%;
						line-height: 80rpx;
						border-bottom: 2rpx solid #F1F1F1;
						font-size: 28rpx;
						color: #535353;

						.item-content {
							display: flex;

							.item-name {
								width: 118rpx;
							}

							.item-user {
								width: 200rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.switch {
								width: 45rpx;

								.custom-switch {
									margin-left: 36rpx;

									.custom-switch-close {
										width: 45rpx;
										height: 30rpx;
									}

									.custom-switch-open {
										width: 45rpx;
										height: 30rpx;
									}

									image {
										width: 100%;
										height: 100%;
									}
								}
							}

							.item-icon {
								line-height: 80rpx;
								height: 80rpx;
								width: 40rpx;
								margin: 0 15rpx 0 12rpx;
								display: flex;
								justify-content: center;
								align-items: center;

								image {
									width: 40rpx;
									height: 40rpx;
								}
							}
						}
					}
				}

				.ball-list {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					// margin-left: 87.19rpx;
					justify-content: center;
					align-items: center;
					padding: 0 20rpx;

					.ball-list-item {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;

						.ball-num {
							text {
								background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
								background-clip: text;
								text-fill-color: transparent;
								// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
								font-size: 30rpx;
								font-weight: bold;
							}

							width: 65rpx;
							height: 70.5rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-image: url("@/static/img/liuhe/ssc/ball.svg");
							background-position: center;
							background-size: 100% 100%;
						}
					}

				}

				.close-ball-list {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					// margin-left: 87.19rpx;
					justify-content: center;
					align-items: center;
					padding: 0 20rpx;

					.close-ball-item {
						background-image: url("@/static/img/liuhe/ssc/ball.svg");
						background-position: center;
						background-size: 100% 100%;
						font-size: 28rpx;
						width: 65rpx;
						height: 70.5rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #FFFFFF;

						text {
							background: linear-gradient(180deg, #FFFFFF 23.02%, #b5ceee 78.57%);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							background-clip: text;
							text-fill-color: transparent;
							// text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.25);
							font-size: 30rpx;
							font-weight: bold;
						}
					}

					.close-ball-item-add {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 8rpx;

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}

				.result-detail {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					// margin-left: 87.19rpx;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					text-align: center;
					letter-spacing: -0.5px;
					color: rgba(255, 255, 255, 0.6);
				}

				.top {
					color: #fff;
					font-size: 28rpx;
					text-align: center;

					// padding: 42.5rpx;
					.status {
						border: 2rpx solid #fff;
						border-radius: 31rpx;
						padding: 1rpx 19rpx;
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
			height: calc(100% - 500px);
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
			}

		}

	}

	.chat-room-unlogin {
		margin-top: 200rpx;
		text-align: center;
		font-size: 24rpx;
		color: grey;
	}

	::v-deep * {
		font-family: "PingFang SC";
	}
</style>
