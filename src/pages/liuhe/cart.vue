<template>
	<view class="cart-page" :style="{ marginTop: safeHeight, height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" @back="setFlag">
			<view slot="right" class="clear-box">
				<view class="clear" @click="clearCart">{{ $t('pages.liuhe.cart.Clear') }}</view>
			</view>
		</Header>
		<view class="cart-page-content">
			<view class="detail-box">
				<view class="detail-box-content">
					<view class="top">
						<view class="time-box">
							<view class="period">
								{{ $t('pages.liuhe.cart.away') }}{{ showRoundInfo.nextNo
								}}{{ $t('pages.liuhe.cart.Period') }}
								{{ $t('pages.liuhe.cart.cutOff') }}
							</view>
							<view class=" time">{{ runtimes }}
							</view>
						</view>
						<view class="line"></view>
						<view class="account">
							<view class="text">{{ $t('pages.liuhe.cart.Balance') }}</view>
							<view class="balance">
								<text style="font-size: 28rpx; margin-right: 10rpx;">
									{{ $t('pages.liuhe.cart.Sysmbal') }}

								</text>

								<u-count-to v-if="$store.state.appInfoStore.userInfo" :decimals="2" :start-val="0"
									:end-val="$store.state.appInfoStore.userInfo.userBalance"
									@end="isEnd = true"></u-count-to>
								<text v-else>-</text>
								<!-- {{ $store.state.appInfoStore.userInfo ? playing.setAmount($store.state.appInfoStore.userInfo.userBalance, 2, '.', ',') : '-'}} -->
								<view :class="{ refresh: true, runRefresh: inRefreshBrance }" @click="refresh">
									<!-- <filterIcon fillColor="#A1A1A1" :useThemeColor="false"
										src="/static/img/liuhe/refresh.png" :width="40" :height="40" /> -->
									<svg xmlns="http://www.w3.org/2000/svg" style="width: 40rpx; height: 40rpx;"
										viewBox="0 0 20 20" fill="none">
										<path
											d="M4.55185 3.6945C6.06398 2.38422 7.9985 1.66421 9.99935 1.667C14.6018 1.667 18.3327 5.39783 18.3327 10.0003C18.3327 11.7803 17.7743 13.4303 16.8244 14.7837L14.166 10.0003H16.666C16.6661 8.69335 16.2821 7.41517 15.5616 6.32471C14.8411 5.23426 13.816 4.37963 12.6137 3.8671C11.4114 3.35457 10.0849 3.20675 8.79931 3.44202C7.51368 3.67728 6.32556 4.28525 5.38268 5.19033L4.55185 3.6945ZM15.4468 16.3062C13.9347 17.6165 12.0002 18.3365 9.99935 18.3337C5.39685 18.3337 1.66602 14.6028 1.66602 10.0003C1.66602 8.22033 2.22435 6.57033 3.17435 5.217L5.83268 10.0003H3.33268C3.33258 11.3073 3.71664 12.5855 4.43713 13.676C5.15762 14.7664 6.18274 15.621 7.38503 16.1336C8.58733 16.6461 9.91375 16.7939 11.1994 16.5587C12.485 16.3234 13.6731 15.7154 14.616 14.8103L15.4468 16.3062Z"
											fill="#A1A1A1" />
									</svg>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="list-box" :style="{ height: `calc(${uWindowHeight}px - 480rpx)` }">
				<view class="list-col" v-for="(item, i) in playList" :key="i">
					<view class="list-item" :style="{ borderLeft: `12rpx solid ${themeColor.themeColor}` }">
						<view class="detail">
							<view class="left">
								<view class="title">{{ item.name }}</view>
								<view class="betting">
									<text>{{ item.methodName }}</text>
									<text>{{ item.stakeCount }}{{ $t('pages.liuhe.cart.note') }}</text>
									<text>{{ item.unitPrice }}{{ $t('pages.liuhe.cart.times') }}</text>
									<text>{{ setAmount(setBetting(item, i)) }}{{ $t('pages.liuhe.cart.Money') }}</text>
								</view>
							</view>
							<view class="right" @click="delItem(i)">
								<image src="@/static/img/liuhe/cart/del.png"></image>
								<view class="text">{{ $t('pages.liuhe.cart.Remove') }}</view>
							</view>
						</view>
						<view class="multiple-box">
							<text>{{ $t('pages.liuhe.cart.invest') }}</text>
							<input :value="item.unitPrice" class="multiple" type="number" inputmode="numeric"
								placeholder="" @input="(e) => onChangeBetting(e, i)" />
							<text>{{ $t('pages.liuhe.cart.times') }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="action-div" v-if="isShow">
				<view class="left-box">
					<text>{{ $t('pages.liuhe.cart.Total') }}{{ total.count
						}}{{ $t('pages.liuhe.cart.note') }}，{{ $t('pages.liuhe.cart.invest') }}{{ $t('pages.liuhe.cart.note') }}<text
							class="amount-text">{{ setAmount(total.price)
							}}</text>{{ $t('pages.liuhe.cart.Money') }}</text>
				</view>
				<view class="rigth-box">
					<view :style="{ backgroundColor: themeColor.themeColor }"
						:class="['theme-' + theme, playList.length === 0 || !roundDataInited ? 'act-btn no-list' : 'act-btn']"
						@click="confirm">
						{{ $t('pages.liuhe.cart.Confirm') }}
					</view>
				</view>
			</view>

			<view class="multiple-box" v-else>
				<view class="multiple-row">
					<view class="multiple-btn">
						{{ $t('pages.liuhe.cart.invest') }}5{{ $t('pages.liuhe.cart.times') }}
					</view>
					<view class="multiple-btn">
						{{ $t('pages.liuhe.cart.invest') }}10{{ $t('pages.liuhe.cart.times') }}
					</view>
					<view class="multiple-btn">
						{{ $t('pages.liuhe.cart.invest') }}20{{ $t('pages.liuhe.cart.times') }}
					</view>
				</view>
			</view>
		</view>

		<order-comfirm ref="orderClass" :title="title" :showRoundInfo="showRoundInfo" :orderList="playList"
			:orderTotal="total" :isBetting="isBetting" @cancelBtn="cancelBtn" @toBuyOrder="submit">
		</order-comfirm>
		<balance-model ref="balance"></balance-model>
		<uni-popup :title="$t('pages.liuhe.common.text13')" type="dialog" ref="result">
			<view class="error-modal">
				<view class="title">
					{{ $t('pages.liuhe.common.text14') }}
					<!-- {{$t('pages.liuhe.cart.Tips')}} -->
				</view>
				<view class="content">
					{{ errorMsg }}
				</view>
				<view class="footer" @click="yes()">
					{{ $t('pages.liuhe.cart.Yes') }}
				</view>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
import NavBar from "@/components/common/navBar/navBar";
import Header from "../../components/common/header/index.vue";
import TabBar from "@/components/common/tabbar/TabBar";
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import LotteryList from "./common/LotteryList";
import Recommend from "./common/Recommend";
import Playing from "@/utils/common/playing";
import _default, {
	mapGetters
} from 'pinia';
import {
	hot,
	lottery,
	getRewardsInfo,
	buyOrder
} from "@/utils/lottery/betting"
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import OrderPopup from "@/components/common/ordersPopup/index.vue";
import {
	websocetObj
} from '@/utils/websocet/websocet.js';
import BalanceModel from '@/pages/liuhe/common/BalanceModal.vue'
import OrderComfirm from "./common/orderComfirm.vue";

export default {
	name: "index",
	components: {
		AlertInjectLayer,
		UniCol,
		UniRow,
		NavBar,
		TabBar,
		LotteryList,
		Recommend,
		OrderPopup,
		OrderComfirm,
		Header,
		BalanceModel
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			playing: new Playing(),
			title: "",
			headerStyle: {
				position: 'fixed',
				top: 0,
				width: '100vw',
				boxSizing: 'border-box'
			},
			titleStyle: {
				'font-weight': 500,
				'font-size': '32rpx',
				'line-height': '45rpx',
				'color': '#FFFFFF'
			},
			errorMsg: '',
			userInfo: null,
			isShow: true,
			playList: [],
			total: {
				count: 0,
				price: 0
			},
			runtimes: '',
			headInfo: {},
			isClosing: false,
			times: null,
			lotteryId: '',
			isBetting: false,
			inRefreshBrance: false
		}
	},
	onUnload() {
		clearInterval(this.times);
		//避免移除未銷毀頁面監聽
		uni.$off("onGetGameInfo", this.onGetGameInfo);
	},
	onLoad(option) {
		let _this = this;
		this.lotteryId = option.id;
		this.getHeadInfo();
		this.$store.dispatch("updateUserBalanceFromServer")
		this.setPlayList(option.code)
		this.title = this.inLotteryGameName;
		this.isLogin = global.isLogin()
		if (!this.isLogin) {
			uni.navigateTo({
				url: "/pages/common/login"
			})
			return;
		} else {
			this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
		}
		if (!option.id) return console.warn("lottery id is error");
		uni.$on("onGetGameInfo", this.onGetGameInfo);
		//如果当前页刷新大概率websocket未连接成功
		this.doCommitUpdateEventBySocket();
		//兼容上方逻辑
		//如果内存中记录有来源游戏id为-1 则赋值 ，app.vue中 检测到网络状态为-1且网络状态变化会重新触发刷新游戏逻辑
		if (this.inLotteryId == -1) {
			this.$store.commit("SET_LOTTERY_STORE_LOTTERY_ID", option.id)
		}


	},
	watch: {
		inLotteryGameName(v) {
			this.title = v;
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
	},
	computed: {
		...mapGetters(['orderList', 'inLotteryId', 'inLotteryGameName', 'themeColor', "uWindowHeight"]),
		showRoundInfo() {
			return this.isClientRun ? this.headInfo['nextRound'] : this.headInfo;
		},
		isClientRun() {
			let roundMsg = Object.assign({}, this.headInfo);
			let nextRound = roundMsg['nextRound'];
			if (nextRound) {

			}
			return !!this.headInfo && !!this.headInfo['nextRound'];
		},
		theme() {
			return getApp().globalData.themeMap[this.$config.station]
		},

		roundDataInited() {
			return !!this.headInfo['lotteryNo'];
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		async refresh() {
			this.isEnd1 = false
			this.inRefreshBrance = true
			await this.$store.dispatch("appInfoStoreInit");
			setTimeout(() => {
				this.inRefreshBrance = false;
			}, 2000);
		},
		onGetGameInfo(resultInfo) {
			console.warn("onGetGameInfo-------------- cartvue");
			this.doUpdateHeaderInfoFromSocket(resultInfo.data)
		},

		setFlag() {
			this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.ORDER_CAR_BACK, true);
		},
		closeModal() {
			this.$refs.balance.closeModal();
		},
		toCharge() {
			if (this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO).userType ==
				'demo') {
				this.closeModal()
				uni.$emit('showPop', {
					refName: 'AlertTestMsg',
				})
			} else {
				uni.navigateTo({
					url: '/pages/common/pay/index'
				})
			}
		},
		delItem(index) {
			let arr = this.playList;
			this.playList = arr.filter((item, i) => i !== index)
			this.setTotalShow(this.playList);
			this.playing.setStorage('playingList', this.playList);
		},
		setAmount(val) {
			return this.playing.setAmount(val, 2, '.', ',')
		},
		submit() {
			this.isBetting = true; //下注时打开注单开关
			if (this.$store.state.appInfoStore.userInfo.userBalance > 0) {
				let menuList = this.playing.getStorage('menuList'); //获取菜单内容，下注时校验快速购买和购物车是否同时开启
				if (!menuList) {
					uni.showToast({
						title: "错误码#CA00246"
					})
					return;
				}

				this.playList.forEach(item => {
					item.chaseNum = 0;
					delete item.code; // true
					delete item.ballChildren; // true
				})
				let param = {
					"lotteryId": this.lotteryId,
					"lotteryNo": this.showRoundInfo.nextNo,
					"orderList": this.playList,
				}
				console.log("购物车下注", param)
				buyOrder(param).then(res => {
					this.isBetting = false; //拿到结果后关闭开关
					if (res.code === 200) {
						this.setFlag()
						this.isBetting = false; //拿到结果后关闭开关
						this.playing.removeStorage('playingList');
						if (menuList.find(item => item.code === 'betting')?.isOpen && menuList.find(item => item.code === 'cart')?.isOpen) {
							let path = '/pages/liuhe/liuhePlaying?id=';
							switch (this.headInfo.lotteryTypeId) {
								case 30:
									path = '/pages/liuhe/shishicai?id='
									break;
								case 29:
									path = '/pages/liuhe/airship?id='
									break;
								case 28:
									path = '/pages/liuhe/kuaisan?id='
									break;
								case 19:
									path = '/pages/liuhe/elevenOutOfFive?id='
									break;
								case 31:
									path = '/pages/liuhe/luckyTwenty?id='
									break;
								case 20:
									path = '/pages/liuhe/arrangementThree?id='
									break;
								case 32:
									path = '/pages/liuhe/luckyFarm?id='
									break;
								case 26:
									path = '/pages/liuhe/pcEgg?id='
									break;
							}
							uni.redirectTo({
								url: path + this.lotteryId +
									"&down=true"
							})



						} else {
							// if (this.headInfo.lotteryTypeId === 30) {
							// 	uni.redirectTo({
							// 		url: '/pages/liuhe/ssc/betting_results?lotteryNo=' + param
							// 			.lotteryNo + '&lotteryId=' + this.lotteryId
							// 	})
							// } else if (this.headInfo.lotteryTypeId === 29) {
							// 	uni.redirectTo({
							// 		url: '/pages/liuhe/airship/betting_results?lotteryNo=' + param
							// 			.lotteryNo + '&lotteryId=' + this.lotteryId
							// 	})
							// } else if (this.headInfo.lotteryTypeId === 19) { //11选5
							// 	uni.redirectTo({
							// 		url: '/pages/liuhe/elevenOutOfFive/betting_results?lotteryNo=' +
							// 			param.lotteryNo + '&lotteryId=' + this.lotteryId
							// 	})
							// } else if (this.headInfo.lotteryTypeId === 28) {
							// 	uni.redirectTo({
							// 		url: '/pages/liuhe/kuaisan/betting_results?lotteryNo=' + param
							// 			.lotteryNo + '&lotteryId=' + this.lotteryId
							// 	})
							// } else if (this.headInfo.lotteryTypeId === 31) { //幸运20
							// 	uni.redirectTo({
							// 		url: '/pages/liuhe/luckyTwenty/betting_results?lotteryNo=' + param
							// 			.lotteryNo + '&lotteryId=' + this.lotteryId
							// 	})
							// } else {
							uni.redirectTo({
								url: '/pages/liuhe/betting_results?lotteryNo=' + param.lotteryNo +
									'&lotteryId=' + this.lotteryId
							})
							// }

						}
						//@mrz 空字符串不弹窗
						if (res.message && res.message.trim() != '') {
							uni.showToast({
								title: res.message,
								icon: "none"
							});
						}
					} else if (res.code === 774) {
						this.$refs.orderClass.close();
						this.$refs.balance.open();
					} else if (res.code === 701) {
						this.errorMsg = res.message;
						// this.$nativeBridge.setStatusBarColor('#B2B2B2')
						this.$refs.result.open()

					} else {
						if (res.message && res.message.trim() != '') uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			} else {
				this.cancelBtn();
				if (this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO)
					.userType == 'demo') {
					uni.$emit('showPop', {
						refName: 'AlertTestMsg',
					})
				} else {
					this.$refs.balance.open();
				}
			}
		},
		yes() {
			this.$refs.result.close()
			// this.$nativeBridge.setStatusBarColor('#fff')
		},
		//获取头部开奖信息
		getHeadInfo() {
			uni.showLoading({
				mask: true
			});
			let timeOutTimer = setTimeout(() => {
				uni.hideLoading();
			}, 3000);
			getRewardsInfo({
				lotteryId: this.lotteryId
			}).then(res => {
				this.headInfo = res.result;
				this.setRewardsTimeOut(this.headInfo.closeTimeStamp)
				this.isClosing = res.result.stampType === 3;
				uni.hideLoading();
				clearTimeout(timeOutTimer);
			})
		},
		// //设置倒计时
		// setRewardsTimeOut(time) {
		//   if (time === 0) {
		//     this.getHeadInfo()
		//   } else {
		//     this.times = setInterval(() => {
		//       time -= 1;
		//       this.runtimes = this.playing.timestampToDate(time)
		//       if (time === 0) {
		//         this.getHeadInfo()
		//         clearInterval(this.times);
		//       }
		//     }, 1000)
		//   }
		// },
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
		doCommitUpdateEventBySocket() {
			let socketInitStruct = {
				event: "getGameInfo",
				lotteryId: this.lotteryId
			};
			websocetObj.sendMsg(socketInitStruct);
		},
		doUpdateHeaderInfoFromSocket(content) {
			this.headInfo = content;
			this.setRewardsTimeOut();
		},

		onChangeBetting(e, i) {
			this.playList[i].unitPrice = Number(e.detail.value);
			this.setTotalShow(this.playList);
		},
		setBetting(item, index) {
			this.playList[index].totalPrice = Number(item.unitPrice) * Number(item.stakeCount);
			return Number(item.unitPrice) * Number(item.stakeCount)
		},

		//从storage取出购物车列表
		setPlayList(code) {
			let list = this.playing.getStorage(code);
			this.playing.removeStorage(code);
			if (list === '') {
				this.playList = this.playing.getStorage('playingList') ? this.playing.getStorage('playingList') : [];
				this.setTotalShow(this.playList);
			} else {
				this.playList = this.playing.getStorage('playingList') ? this.playing.getStorage('playingList') : [];
				this.playList = this.playList.concat(list);
				this.setTotalShow(this.playList);
				this.playing.setStorage("playingList", this.playList);
				this.playList.map(item => {
					if (item.unitPrice === 0) {
						item.unitPrice = 1
					}
				})
			}
		},
		//设置显示列表总注数和价格
		setTotalShow(list) {
			this.total = {
				count: 0,
				price: 0
			}
			list.forEach(item => {
				if (item.unitPrice === 0) {
					item.unitPrice = 1
				}
				this.total.count += item.stakeCount;
				this.total.price += item.stakeCount * item.unitPrice;
			})
		},
		confirm() {
			if (this.playList.length === 0) {
				return;
			}
			if (!this.roundDataInited) {
				return;
			}
			this.playList = this.playList.filter(item => item.totalPrice !== 0);
			this.$refs.orderClass.open();
		},
		cancelBtn() {
			this.$refs.orderClass.close();
		},
		clearCart() {
			this.playing.removeStorage('playingList');
			this.$store.dispatch('setOrderList', []);
			this.playList = [];
			this.total.count = 0;
			this.total.price = 0;
		},
		onBackGame() {
			this.clearCart();
		},
	},
}
</script>

<style lang="scss">
.cart-page {
	background: #EEEEEE;

	height: var(--vh);
	display: flex;
	flex-direction: column;

	.cart-page-content {
		flex: 1;
		height: 0;
		display: flex;
		flex-direction: column;

		.detail-box {
			background: #FFFFFF;
			box-sizing: border-box;
			//height: 176rpx;
			padding: 39rpx 28rpx;
			justify-content: center;
			align-items: center;
			gap: 40rpx;
			border-radius: 24rpx;
			margin-top: 20rpx;
			//position: fixed;
			width: 100%;
			//z-index: 99;
			box-shadow: 0px 8px 10px -15px #000;
			//top: 108rpx;

			.detail-box-content {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;

				.top {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					width: 100%;

					.time-box {
						width: 50%;
						text-align: center;

						.period {
							color: #404040;

							font-size: 28rpx;
							font-weight: 400;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							-o-text-overflow: ellipsis;
						}

						.time {
							color: var(--theme-auxiliary-color-remind);

							font-size: 34rpx;
							font-weight: 500;
						}
					}

					.line {
						border: 1rpx solid var(--theme-auxiliary-color-default);
						height: 60rpx;
					}

					.account {
						width: 50%;
						text-align: center;

						.text {
							color: #404040;

							font-size: 28rpx;
							font-weight: 400;
						}

						.balance {
							color: #404040;

							font-size: 34rpx;
							font-weight: 500;
							display: flex;
							justify-content: center;
							align-items: center;
							line-height: 1;

							/deep/ .u-count-num {
								color: #404040 !important;
								font-family: 'Roboto' !important;
								font-size: 34rpx !important;
								font-weight: 500 !important;
							}

							.refresh {
								width: 40rpx;
								height: 40rpx;
								margin-left: 10rpx;
								overflow: hidden;

								image {
									width: 100%;
									height: 100%;
									display: inline;
									transform: translateX(-40rpx);
									-webkit-transform: translateX(-40rpx);
								}
							}

							@keyframes mymove {
								0% {
									-webkit-transform: rotate(0deg);
								}

								25% {
									-webkit-transform: rotate(90deg);
								}

								50% {
									-webkit-transform: rotate(180deg);
								}

								75% {
									-webkit-transform: rotate(270deg);
								}

								100% {
									-webkit-transform: rotate(360deg);
								}
							}

							.refresh.runRefresh {

								animation: mymove 1s infinite;
								/*Safari 和 Chrome:*/
								-webkit-animation: mymove 1s infinite;
								/*接口时长不一定。不要缓动，时长超长也会一直播放 没有顿挫感*/
								animation-timing-function: linear;
								-webkit-animation-timing-function: linear;
							}
						}
					}
				}

			}



		}

		.list-box {
			width: 100%;
			// height: 0;
			// flex: 1;

			.list-col {
				padding: 20rpx;

				.list-item {
					min-height: 244rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					box-sizing: border-box;
					background: #FFFFFF;


					.detail {
						margin-left: 30rpx;
						margin-right: 20rpx;
						display: flex;
						border-bottom: 2rpx solid #E7E7E7;
						padding-bottom: 20rpx;

						.left {
							flex: 1;

							.title {
								color: var(--theme-auxiliary-color-remind);
								font-size: 32rpx;
								font-weight: 500;
								width: 100%;
								word-break: break-all;
							}

							.betting {
								color: var(--theme-font-default-deep-color);
								font-family: MiSans;
								font-size: 24rpx;
								line-height: 30rpx;
								margin-top: 10rpx;
								font-weight: bold;
								width: 480rpx;
								font-weight: 400;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								-o-text-overflow: ellipsis;

								text {
									margin-right: 20rpx;
								}
							}
						}

						.right {
							//width: 20%;
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								color: #404040;

								font-size: 28rpx;
								font-weight: 400;
							}

							image {
								height: 28rpx;
								width: 28rpx;
								margin-right: 20rpx;
							}
						}
					}

					.multiple-box {
						margin-left: 30rpx;
						display: flex;
						margin-top: 34rpx;
						align-items: center;

						text {
							color: var(--theme-font-default-shallow-color);

							font-size: 28rpx;
							font-weight: 400;
						}

						.multiple {
							width: 176rpx;
							height: 54rpx;
							background: #FFFFFF;
							border: 2rpx solid #E8E8E8;
							border-radius: 10rpx;
							margin: 0 10rpx;
							font-size: 28rpx;
							text-align: center;
							color: #A1A1B6;
						}
					}
				}
			}
		}

		/* 底部阴影 */
		.action-div {
			box-sizing: border-box;
			box-shadow: 0px -1rpx 0 0 var(--theme-auxiliary-color-default);
			width: 100%;
			max-width: 480px;
			padding: 20rpx 28rpx;
			//height: 80rpx;
			border-radius: 40rpx 40rpx 0 0;
			background: #FFF;
			position: fixed;
			bottom: 0;
			padding-bottom: 40rpx;

			.left-box {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				padding: 20rpx 0;
				justify-content: center;
				align-items: center;

				.amount-text {
					color: var(--theme-auxiliary-color-remind);

					font-size: 30rpx;
					font-weight: 400;
				}

				text {
					color: #404040;

					font-size: 30rpx;
					font-weight: 400;
				}
			}

			.rigth-box {
				width: 100%;

				.act-btn {
					width: 100%;
					display: flex;
					height: 88rpx;
					padding: 20rpx;
					justify-content: center;
					align-items: center;
					gap: 20rpx;
					box-sizing: border-box;
					background: var(--theme-color);
					color: #FFF;

					font-size: 34rpx;
					font-weight: 400;
					border-radius: 16rpx;
				}

				.act-btn.no-list {
					opacity: 0.5;
				}
			}
		}

		.multiple-box {
			.multiple-row {
				position: fixed;
				bottom: 11rpx;
				display: flex;
				width: 100%;
				max-width: 480px;
				height: 66rpx;
				justify-content: space-around;

				.multiple-btn {
					width: 234rpx;
					height: 59rpx;
					background: #FFFFFF;
					border: 2rpx solid #E7E7E7;
					border-radius: 30rpx;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 60rpx;
					color: #404040;
					text-align: center;
				}
			}
		}
	}

	.clear-box {
		display: flex;
		justify-content: flex-end;

		.clear {
			color: #404040;
			font-size: 30rpx;
			font-weight: 400;
		}
	}

	.error-modal {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 24rpx;

		.title {
			height: 108rpx;
			font-size: 34rpx;
			color: #404040;
			display: grid;
			place-content: center;
		}

		.content {
			font-size: 30rpx;
			line-height: 56rpx;
			text-align: center;
			color: #404040;
			padding-bottom: 28rpx;
		}

		.footer {
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34rpx;
			color: var(--theme-color);
			display: grid;
			place-content: center;
			border-top: 1px solid var(--theme-auxiliary-color-default);
		}
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
					}

					.note-box {
						font-weight: 400;
						font-size: 28rpx;
						line-height: 39rpx;
						color: #404040;
						margin-bottom: 20rpx;

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
				color: #FF9900;
				margin: 0 2rpx 0 2rpx;
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

			.confirm-act.closing {
				background: #CCCCCC;
			}
		}

	}
}
</style>
