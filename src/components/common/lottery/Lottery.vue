<template>
	<view class="lottery-box" :style="[_listStyles]" v-if="lotteryDetail"
		:class="['theme-' + themeColor.name,'border-box-body-' + themeColor.name]" :id="randomID">
		<slot name="header" v-if="headerStyle===1">
			<header class="lottery-header">
				<view class="period-item">
					{{ $t('components.common.lottery.text0') }}
					<span>
						{{ animationLotteryDetail?(animationLotteryDetail.id + '').substr(0, (animationLotteryDetail.id + '').length - 1):(lotteryDetail.id ? ((lotteryDetail.id + '').substr(0, (lotteryDetail.id + '').length - 1)) : "")
						}}
					</span>
					{{ $t('components.common.lottery.text1') }}
				</view>
				<view class="history-item" style="color: #FF0000;" @click="xianchang"
					v-if="live && [1, 2].includes(lotteryDetail.lotteryType)">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M18.0455 6.41857C18.9145 5.88766 20 6.55038 20 7.60948V13.2031C20 14.264 18.9118 14.9267 18.0427 14.3958L16.4209 13.4086V14.0495C16.4209 15.1131 15.5964 15.9849 14.5864 15.9849H1.83455C0.827273 15.9849 0 15.1149 0 14.0486V6.10311C0 5.03948 0.824545 4.16675 1.83455 4.16675H14.5891C15.5964 4.16675 16.4227 5.03675 16.4227 6.10311V7.40584L18.0445 6.41857H18.0455ZM7.33273 7.00402C6.90364 6.69129 6.36636 7.0822 6.36364 7.70766V12.4413C6.36364 13.0695 6.90364 13.4595 7.33273 13.1477L10.5873 10.7804C11.0164 10.4677 11.0164 9.68402 10.5873 9.37129L7.33273 7.00402Z"
							:fill="themeColor.themeAuxiliaryColorRemind" />
					</svg>
					<text class="text">{{ $t('components.common.lottery.text2') }}</text>
				</view>
				<view class="history-item" @click="lishi">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM9.09091 5.45455C9.09091 4.95247 9.49792 4.54545 10 4.54545C10.5021 4.54545 10.9091 4.95247 10.9091 5.45455V10.3879L13.6226 11.9545C14.0574 12.2056 14.2064 12.7616 13.9554 13.1964C13.7043 13.6312 13.1483 13.7802 12.7135 13.5291L9.56433 11.711C9.52438 11.6879 9.48684 11.6622 9.4518 11.6344C9.23256 11.4684 9.09091 11.2053 9.09091 10.9091V5.45455Z"
							:fill="themeColor.themeColor" />
					</svg>
					<text class="text">{{ $t('components.common.lottery.text3') }}</text>
				</view>
			</header>
		</slot>
		<view class="body-hd-2" v-else-if="headerStyle===2">
			{{
				animationLotteryDetail?
			animationLotteryDetail.year:
			(lotteryDetail.id ? lotteryDetail.year : "")
									}}
			{{$t('pages.luntan.humorousGuessing.text2')}}
			{{$t('pages.luntan.humorousGuessing.text3')}}{{ animationLotteryDetail?animationLotteryDetail.period:lotteryDetail.period }}{{$t('pages.luntan.humorousGuessing.text4')}}
		</view>
		<view style="background: #fff;width: calc(100% - 40rpx);height: 1px;margin: 0 auto;"></view>
		<slot name="lottery">
			<main class="lottery-center">
				<view class="van-col" v-for="(item, index) in numberList" :key="index">
					<view class="icon-text">
						<view :class="'slot-icon bg-amage-' + (isNaN(item.number)?0:item.color)">
							{{ item.number }}
						</view>
						<view class="slot-text">
							<view v-if="item.shengXiao&&item.wuXing">
								{{ item.shengXiao }}<span>/{{ item.wuXing }}</span>
							</view>
						</view>
					</view>
				</view>
				<view class="van-col">
					<view class="icon-text">
						<uni-icons type="plusempty" size="30" color="rgb(172, 172, 172)"
							class="add-margin-top"></uni-icons>
					</view>
				</view>
				<view class="van-col">
					<view class="icon-text">
						<view :class="'slot-icon bg-amage-' + (isNaN(sixNumber.number)?0:sixNumber.color)">
							<svg class="icon-t" width="16" height="16" viewBox="0 0 16 16" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<circle cx="8" cy="8" r="8" :fill="themeColor.themeAuxiliaryColorDot" />
								<path
									d="M8.95215 5.15771V14.3999H7.21289V5.15771H8.95215ZM11.8213 5.15771V6.53516H4.37549V5.15771H11.8213Z"
									fill="#404040" />
							</svg>

							{{ sixNumber.number }}
						</view>
						<view class="slot-text">
							<view v-if="sixNumber.shengXiao&&sixNumber.wuXing">
								{{ sixNumber.shengXiao }}<span>/{{ sixNumber.wuXing }}</span>
							</view>
						</view>
					</view>
				</view>
			</main>
		</slot>
		<slot name="footer">
			<footer class="lottery-footer" v-if="lotteryFooterShow">
				<view class="calendar" v-if="lotteryFooterShowCalendar">
					<view class="calendar-btn" @click="toUrl(0)">{{$t("components.common.lottery.text4")}}</view>
				</view>
				{{ lotteryDetail.title }}
				<view class="pick" v-if="lotteryFooterShowPick">
					<view class="pick-code" @click="toUrl(1)">{{$t("components.common.lottery.text5")}}</view>
				</view>
			</footer>
		</slot>
	</view>
</template>

<script>
	import {
		websocetObj
	} from '@/utils/websocet/websocet.js';
	import {
		random
	} from 'nanoid';
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Lottery",
		data: function() {
			return {
				animationNumberList: null,
				animationLotteryDetail: null,
				wsData: {},
				timer: null,
				timerWS: null,
				randomID: ""
			};
		},

		props: {
			headerStyle: {
				type: Number,
				default: 1
			},
			live: Boolean,
			lotteryDetail: {
				type: Object,
				default: function() {
					return {
						numberList: []
					}
				}
			},
			listStyle: {
				type: Object,
				default: function() {
					return null;
				}
			},
			lotteryFooterShow: {
				type: Boolean,
				default: true
			},
			lotteryFooterShowCalendar: {
				type: Boolean,
				default: true
			},
			lotteryFooterShowPick: {
				type: Boolean,
				default: true
			},
			listenNumberListAction: {
				type: Boolean,
				default: false
			},
			isHistoryPage: {
				type: Boolean,
				default: false
			},
			backChangeWithTheme: {
				type: Boolean,
				default: false
			},
			isHttpAsync: {
				type: Boolean,
				default: false
			},
			httpAsyncTime: {
				type: Number,
				default: 10
			},
			/**
			 * 封装结构比较乱 暂时给直播间容器开启强制HTTP刷新 避免直播间容器不刷新
			 */
			isForceHttpAsyncOpend: {
				type: Boolean,
				default: false
			},

			httpAsyncLiveOffsetSecond: {
				type: Number,
				default: 60
			},

		},
		mounted() {
			//#ifdef H5
			this.randomID = this.randomString();

			// this.watchVisible();
			//#endif
			// if (this.isForceHttpAsyncOpend) this.countDownHttp();



			// this.sendWS();

			// this.countDownSendWs();
		},
		computed: {
			...mapGetters(["themeColor", "openLottery", "openLiveLotteryMsg"]),

			numberList() {
				if (this.listenNumberListAction && this.animationNumberList) {
					return this.animationNumberList.slice(0, 6)
				}
				if (this.isHistoryPage && this.animationNumberList) {
					return this.animationNumberList.slice(0, 6)
				}
				if (this.lotteryDetail.numberList) {
					return this.lotteryDetail.numberList.slice(0, 6)
				} else {
					return []
				}
			},
			sixNumber() {

				if (this.listenNumberListAction && this.animationNumberList) {
					return this.animationNumberList[6];
				}
				if (this.isHistoryPage && this.animationNumberList) {
					return this.animationNumberList[6];
				}
				if (this.lotteryDetail.numberList) {
					return this.lotteryDetail.numberList[6]
				} else {
					return {
						color: 1,
						number: 0,
						shengXiao: '',
						wuXing: ''
					}
				}
			},
			_listStyles() {
				if (this.listStyle) return this.listStyle;
				return {
					'border': '2rpx solid var(--theme-color)',
					'border-radius': '24rpx',
				}
			},
		},
		watch: {
			lotteryDetail(newLotteryDetail, oldLotteryDetail) {
				//切换按钮lotteryType变化之后清空socket推送的动画消息
				if (newLotteryDetail.lotteryType != oldLotteryDetail.lotteryType) {
					this.animationLotteryDetail = null;
					this.animationNumberList = null;
					//切换后定时器重置
					this.isForceHttpAsyncOpend && this.countDownHttp();
				}

				this.watchWS();

				this.openTime(newLotteryDetail);
			},

			openLottery: {
				handler: function(
					value
				) {
					let _this = this;
					_this.wsData = value
					if (_this.isHttpAsync) _this.countDownHttp();
					// _this.countDownSendWs();
					_this.watchWS();

				},
				immediate: true,
				deep: true
			},

		},
		destroyed() {
			// console.error("destroyed");
			this.pageClear();
		},
		methods: {
			openTime(newLotteryDetail) {
				if (!newLotteryDetail) {
					return
				}
				let lotteryList = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERY_LIVE)
				const lott = lotteryList.find(item => item.lotteryType === newLotteryDetail.lotteryType);
				if (!lott?.startTime || lott?.endTime) return;
				if (this.checkAuditTime(lott.startTime, lott.endTime)) {
					this.watchVisible();
					if (this.isForceHttpAsyncOpend) this.countDownHttp();
				} else {
					setTimeout(() => {
						this.openTime();
					}, 1000)
				}
			},
			checkAuditTime(beginTime, endTime) {
				const beforeMinue = 10;
				const afterMinue = 10;
				var nowDate = new Date();
				var beginDate = new Date(nowDate);
				var endDate = new Date(nowDate);

				var beginIndex = beginTime.lastIndexOf("\:");
				var beginHour = beginTime.substring(0, beginIndex);
				var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length) - beforeMinue;
				beginDate.setHours(beginHour, beginMinue, 0, 0);

				var endIndex = endTime.lastIndexOf("\:");
				var endHour = endTime.substring(0, endIndex);
				var endMinue = endTime.substring(endIndex + 1, endTime.length) + afterMinue;
				endDate.setHours(endHour, endMinue, 0, 0);
				return nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime();
			},
			randomString(e = 5) {
				let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
					a = t.length,
					n = "";
				for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
				return n
			},
			pageClear() {
				clearInterval(this.timer);
				clearInterval(this.timerWS);
			},
			watchVisible() {
				const _this = this;
				document.addEventListener('visibilitychange', function() {
					const lotteryDocument = document.querySelector(`#${_this.randomID}`);
					const isHidden = document.hidden;
					if (isHidden) {
						_this.pageClear();
					} else {
						if (lotteryDocument) {
							if (_this.isHttpAsync && this.canDoHttpSync()) _this.$emit("httpAync");
							if (_this.isHttpAsync) _this.countDownHttp();
						}
					}
				});
			},
			countDownHttp() {
				//先清零旧的定时器 再置空。避免重复处理
				clearInterval(this.timer);
				let that = this;
				this.timer = null;
				this.timer = setInterval(() => {
					that.canDoHttpSync() && this.$emit("httpAync");
				}, this.httpAsyncTime * 1000)
			},
			countDownSendWs() {
				this.timerWS = null;
				clearInterval(this.timerWS);
				this.timerWS = setInterval(() => {
					this.sendWS();
				}, (this.httpAsyncTime - 10) * 1000)
			},
			sendWS() {
				if (websocetObj.WebsocketStauts.CONNETCTED) {
					let socketInitStruct = {
						event: "getGameInfo",
						lotteryId: this.appInGameLotteryId
					};
					websocetObj.sendMsg(socketInitStruct)
				}
			},
			watchWS() {
				const _this = this;
				const value = this.wsData;
				if (this.listenNumberListAction && _this.lotteryDetail) {
					const data = value["type" + _this.lotteryDetail.lotteryType]
					if (!data) return;
					if (_this.lotteryDetail.lotteryType == data.lotteryType) {
						_this.animationNumberList = data.numberList;
						_this.animationLotteryDetail = data;
					}
				}
				if (this.isHistoryPage && _this.lotteryDetail) {
					const data = value["type" + _this.lotteryDetail.lotteryType]
					if (!data) return;
					if (_this.lotteryDetail.lotteryType == data.lotteryType) {
						let bool = true;
						data.numberList.forEach(item => {
							if (isNaN(parseFloat(item.number))) bool = false;
						})
						if (bool) return

						_this.animationNumberList = data.numberList;
						_this.animationLotteryDetail = data;
					}
				}
			},
			lishi: function() {
				uni.navigateTo({
					url: '/pages/luntan/historyLottery/lottery?lotteryType=' + this.lotteryDetail.lotteryType
					// page.json定义的路径 传url 到webview界面去接收 实现跳转
				})
			},
			xianchang: function() {
				uni.navigateTo({
					url: '/pages/luntan/live/Live'
				})
			},
			toUrl(index) {
				let url = "";
				if (index == 0) {
					url = "/pages/luntan/toolBox/almanac";
				} else {
					url = "/pages/luntan/toolBox/codePicking";
				}
				uni.navigateTo({
					url: url
				})
			},

			/**
			 * 是否可以执行同步信息
			 */
			canDoHttpSync() {
				let lotteyType = this.lotteryDetail?.lotteryType;
				let now = Math.floor(Date.now() / 1000);
				if (lotteyType) {
					let lotteryLiveMsg = this.openLiveLotteryMsg[lotteyType];
					if (!lotteryLiveMsg) return false;

					let startHM = lotteryLiveMsg.startTime;
					let endHM = lotteryLiveMsg.endTime;
					if (!startHM || !endHM) return false;
					let today = this.$utlilCommons.getTime(Date.now(), 5);
					today.indexOf("-") != -1 && (today = today.replace(/\-/g, "/"));
					let startTime = Math.floor(new Date(`${today} ${startHM}`).getTime() / 1000);
					let endTime = Math.floor(new Date(`${today} ${endHM}`).getTime() / 1000);
					if (now >= (startTime - this.httpAsyncLiveOffsetSecond) && now <= (endTime + this
							.httpAsyncLiveOffsetSecond)) {
						return true;
					}
					if (this.$config.isDebug) {
						console.log(`同步消息被拦截  直播开始:${startTime}  结束:${endTime}  当前:${now}`);
					}
				}
				return false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.body-hd-2 {
		text-align: center;
		color: var(--theme-color);
		/* margin-top: -10rpx; */
		padding-top: 20rpx;
		padding-bottom: 16rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lottery-box .lottery-header {
		/* height: 80rpx; */
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #404040;
		box-sizing: border-box;
		padding-top: 0;
		margin-top: 20rpx;
	}

	.period-item span {
		color: var(--theme-color);
		/* color: #404040; */
	}

	.history-item {
		color: var(--theme-color);
		display: flex;
		align-items: center;

		.text {
			margin-left: 20rpx;
		}
	}

	.lottery-box .lottery-center {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}

	.lottery-box .lottery-center .slot-icon {
		width: 68rpx;
		height: 68rpx;
		line-height: 72rpx;
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
		display: grid;
		place-content: center;
	}

	.icon-t {
		position: absolute;
		right: 0;
		top: -20rpx;
	}

	.lottery-box .lottery-center .slot-icon.bg-amage-0 {
		background-image: url("@/static/img/qiu/0.svg");
		background-size: 100% 100%;
	}

	.lottery-box .lottery-center .slot-icon.bg-amage-1 {
		background-image: url("@/static/img/qiu/1.svg");
		background-size: 100% 100%;
	}

	.lottery-box .lottery-center .slot-icon.bg-amage-2 {
		background-image: url("@/static/img/qiu/2.svg");
		background-size: 100% 100%;
	}

	.lottery-box .lottery-center .slot-icon.bg-amage-3 {
		background-image: url("@/static/img/qiu/3.svg");
		background-size: 100% 100%;
	}

	.lottery-box .lottery-center .slot-text {
		font-size: 26rpx;
		padding-top: 10rpx;
		color: #404040;
		text-align: center;
	}

	.lottery-footer {
		text-align: center;
		font-size: 24rpx;
		color: var(--theme-auxiliary-color-remind);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;

		.calendar {
			.calendar-btn {
				border-radius: 8rpx;
				display: flex;
				padding: 4rpx 10rpx;
				justify-content: center;
				align-items: center;
				gap: 20rpx;
				color: #FFF;

				font-size: 24rpx;
				font-weight: 400;
				background-color: var(--theme-color);
			}
		}

		.pick {
			.pick-code {
				border-radius: 8rpx;
				display: flex;
				padding: 4rpx 10rpx;
				justify-content: center;
				align-items: center;
				gap: 20rpx;
				color: #FFF;

				font-size: 24rpx;
				font-weight: 400;
				background-color: var(--theme-auxiliary-color-remind);
			}
		}
	}

	.add-margin-top {
		margin-top: calc(4rpx);
		/*margin-top: 10px;*/
		display: block;
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
</style>
