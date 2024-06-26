<template>
	<view class="betting-results" :style="{height:'var(--vh)', marginTop: safeHeight + 'px' }"
		:class="['theme-' + themeColor.name]" :key="resultsKey">

		<Header :title="title">
			<block slot="right">
				<view class="nav-right">
					<view :class="refresh ? 'balance refresh' : 'balance'" @click="refreshBalance">
						<text class="balance-text">
							¥&nbsp;<u-count-to :decimals="2" :start-val="0"
								:end-val="$store.state.appInfoStore.userInfo.userBalance"
								@end="isEnd = true"></u-count-to>
						</text>
						<!-- <text
						class="balance-text">¥&nbsp;{{ this.playing.setAmount($store.state.appInfoStore.userInfo.userBalance) }}</text> -->
						<!--            <image class="refresh-icon" src="@/static/img/liuhe/refresh.png"></image>-->
						<!-- <filterIcon class="refresh-icon" :useThemeColor="false" src="/static/img/liuhe/refresh.png"
							:width="35" :height="35" /> -->
						<svg class="refresh-icon" xmlns="http://www.w3.org/2000/svg"
							style="width: 35rpx; height: 35rpx;" viewBox="0 0 20 20" fill="none">
							<path
								d="M4.55185 3.6945C6.06398 2.38422 7.9985 1.66421 9.99935 1.667C14.6018 1.667 18.3327 5.39783 18.3327 10.0003C18.3327 11.7803 17.7743 13.4303 16.8244 14.7837L14.166 10.0003H16.666C16.6661 8.69335 16.2821 7.41517 15.5616 6.32471C14.8411 5.23426 13.816 4.37963 12.6137 3.8671C11.4114 3.35457 10.0849 3.20675 8.79931 3.44202C7.51368 3.67728 6.32556 4.28525 5.38268 5.19033L4.55185 3.6945ZM15.4468 16.3062C13.9347 17.6165 12.0002 18.3365 9.99935 18.3337C5.39685 18.3337 1.66602 14.6028 1.66602 10.0003C1.66602 8.22033 2.22435 6.57033 3.17435 5.217L5.83268 10.0003H3.33268C3.33258 11.3073 3.71664 12.5855 4.43713 13.676C5.15762 14.7664 6.18274 15.621 7.38503 16.1336C8.58733 16.6461 9.91375 16.7939 11.1994 16.5587C12.485 16.3234 13.6731 15.7154 14.616 14.8103L15.4468 16.3062Z"
								fill="#A1A1A1" />
						</svg>
					</view>
				</view>
			</block>
		</Header>
		<view class="lists">
			<scroll-view scroll-y class="result-list"
				:style="{height: `calc(${uWindowHeight}px - 330rpx + var(--safe-area-inset-bottom))`}">
				<view class="result-list-item" v-for="(item, index) in results" :key="index">
					<!--        <view class="label-type">-->
					<!--          <view class="label-type-text">普通</view>-->
					<!--        </view>-->
					<view class="item-top">
						<view>
							<view class="title">{{ item.lotteryName }}</view>
							<view class="num">
								{{ $t('pages.liuhe.bettingResult.No') }}{{ item.lotteryNo }}{{ $t('pages.liuhe.bettingResult.Period') }}
							</view>
						</view>
						<view>
							<view class="item-right">
								<view class="date">
									{{ formatDate(item.createTime) }}
								</view>
							</view>
						</view>
					</view>
					<view class="item-center">
						<view class="item-center-content">
							<view class="left">
								<view class="bet-value">{{ item.betValue }}</view>
								<view class="bet-info">
									<text class="play-name">{{ item.playName }}</text>
									<text
										class="bet-num">{{ item.betNum }}{{ $t('pages.liuhe.bettingResult.Note') }}</text>
									<text
										class="bet-amount">{{ item.betAmount }}{{ $t('pages.liuhe.bettingResult.Times') }}</text>
									<text
										class="amount">{{ setAmount(item.betAmount * item.betNum) }}{{ $t('pages.liuhe.bettingResult.Money') }}</text>
								</view>
							</view>
							<view class="item-center-right">
								<view class="withdraw" :style="{backgroundColor: themeColor.themeColor}"
									@click="setWithdraw(item)" v-if="item.status == 0">
									<image src="@/static/img/liuhe/withdraw.png"></image>
									{{ $t('pages.liuhe.bettingResult.cancelOrder') }}
								</view>
								<image src="@/static/img/liuhe/detail/cedan.png" mode="heightFix"
									v-if="item.status == 3">
								</image>
							</view>
						</view>
					</view>
					<view class="item-bottom">
						<text class="order-num-label">{{ $t('pages.liuhe.bettingResult.betNum') }}</text>
						<text class="order-num">{{ item.orderNo }}</text>
					</view>
				</view>
			</scroll-view>
			<view class="footer">
				<view class="total-count">

					<view :span="12">
						{{ $t('pages.liuhe.bettingResult.No') }}{{ results[0] ? results[0].lotteryNo : null }}{{ $t('pages.liuhe.bettingResult.Period') }}
					</view>
					<view :span="12">
						{{ $t('pages.liuhe.bettingResult.total') }}{{ totalBetNo }}{{ $t('pages.liuhe.bettingResult.Note') }}，<text>{{ setAmount(totalPrice) }}</text>{{ $t('pages.liuhe.bettingResult.Money') }}
					</view>

				</view>
				<view class="btn-group">
					<view class="btn-group-btn" @click="onToNav(2)" :style="{backgroundColor: themeColor.themeColor}">
						{{ $t('pages.liuhe.bettingResult.goOn') }}
					</view>
					<view class="btn-group-btn" @click="onToNav(1)"
						:style="{color: themeColor.themeColor,border:`1rpx solid ${themeColor.themeColor}`}">
						{{ $t('pages.liuhe.bettingResult.reccord') }}
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="confirm" background-color="#fff">
			<view class="confirm-box">
				<view class="conftrm-text">
					{{ $t('pages.liuhe.bettingResult.cancelConfirm') }}
				</view>
				<view class="confirm-content">
					<view>
						<view>
							{{ itemDetail.lotteryName }}{{ $t('pages.liuhe.bettingResult.No') }}{{ itemDetail.lotteryNo }}{{ $t('pages.liuhe.bettingResult.Period') }}
						</view>
						<view>{{ itemDetail.playName }}{{ itemDetail.betNum }}{{ $t('pages.liuhe.bettingResult.Note') }}
						</view>
						<view>
							{{ $t('pages.liuhe.bettingResult.bet') }}{{ setAmount(itemDetail.betAmount) }}{{ $t('pages.liuhe.bettingResult.Money') }}
						</view>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="cancel" @click="cancelBtn">{{ $t('pages.liuhe.bettingResult.cancel') }}</view>
					<view class="confirm-act" @click="submit" :style="setBtnStyle()">
						{{ $t('pages.liuhe.bettingResult.confirm') }}
					</view>
				</view>
			</view>
		</uni-popup>

		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import {
		list,
		cancel
	} from "@/utils/lottery/betting";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import Playing from "@/utils/common/playing";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import Header from "../../components/common/header/index.vue";
	import filterIcon from "@/components/common/filterIcon"

	export default {
		name: "betting_results",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			Header,
			filterIcon
		},
		data() {
			this.playing = new Playing();

			return {
				title: this.$t('pages.liuhe.bettingResult.title'),
				refresh: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top,
				headerStyle: {
					backgroundColor: 'rgb(23, 148, 255)',
				},
				titleStyle: {
					'font-weight': 500,
					'font-size': '32rpx',
					'line-height': '45rpx',
					'color': '#FFFFFF'
				},
				results: [],
				totalBetNo: 0,
				totalPrice: 0,
				itemDetail: {},
				lotteryId: '',
				listParam: {
					type: 1,
					lotteryNo: '',
					pageSize: 999
				},
				windowHeight: "",
				resultsKey: 1
			}
		},
		computed: {
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			userBalance() {
				let num = 0;
				num = this.$store.state.appInfoStore.userInfo ? parseFloat(this.$store.state.appInfoStore.userInfo
					.userBalance) : 0;
				return num;
			},
			userInfo() {
				return this.$store.state.appInfoStore.userInfo
			},
			...mapGetters(['orderList', "websocketTimeInterval", "inLotteryId", "inLotteryGameName", "themeColor",
				"uWindowHeight"
			]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)

			this.windowHeight = uni.$sys.windowHeight + "px"
		},
		onLoad(param) {
			if (param.lotteryNo) {
				uni.showToast({
					title: this.$t("pages.liuhe.common.text19"),
					icon: "success"
				})
				this.listParam.lotteryNo = param.lotteryNo;
				this.listParam.lotteryId = param.lotteryId;
			}
			// this.loadingBalance();
			this.getBettingList();

		},
		methods: {
			formatDate(currentDate) { //定义日期格式化函数
				return this.playing.formatDate(currentDate) //拼接成yyyymmdd形式字符串
			},
			setBtnStyle() {
				return {
					color: this.themeColor.themeColor
				}
			},
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',')
			},
			// //获取余额
			// async loadingBalance() {
			// 	await this.$store.dispatch("updateUserBalanceFromServer")
			// 	this.refresh = false;
			// },
			//额度刷新
			async refreshBalance() {
				this.isEnd1 = false;
				this.refresh = true;
				await this.$store.dispatch("appInfoStoreInit");
				setTimeout(() => {
					this.refresh = false;
				}, 2000);
			},
			getBettingList() {
				let _this = this;
				list(this.listParam).then(res => {
					if (res.code === 200) {
						_this.results = res.result.page.records;
						uni.setStorageSync('bettingList', _this.results);
						/**
						 * TODO
						 * BUG 4220 兼容可能会出现的报错点 onLoad已赋值 此处在赋值
						 * 猜测能是 不带参数加载时 重新赋值
						 * 另外优化方案 借用localstore 锁定 当前正在进行游戏的lotteryId
						 */
						if (_this.results instanceof Array == false || _this.results.length < 1) {
							return;
						}
						_this.lotteryId = res.result.page.records && res.result.page.records.length > 0 ? res
							.result.page.records[0].lotteryId : _this.lotteryId;
						_this.totalBetNo = res.result.page.total
						_this.totalPrice = res.result.betAmount;
						// _this.results.forEach(item => {
						// 	_this.totalBetNo += item.betNum;
						// 	_this.totalPrice += item.betNum * item.betAmount * item.baseAmount;
						// })
						this.resultsKey = this.resultsKey + 1
					}
				})
			},
			setWithdraw(item) {
				this.itemDetail = item;
				// this.$nativeBridge.setStatusBarColor('#666666', true)
				this.$nativeBridge.setStatusBarColor('#b2b2b2')
				this.$refs.confirm.open('center')
			},
			cancelBtn() {
				this.$nativeBridge.setStatusBarColor('#fff')
				this.$refs.confirm.close()
			},
			submit() {
				if (this.itemDetail.status === 0) {
					cancel({
						betId: this.itemDetail.id,
						createTime: this.itemDetail.createTime
					}).then(res => {
						if (res.code === 200) {
							this.cancelBtn()
							this.getBettingList()
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				}
			},
			onToNav(index) {
				let path = '';
				switch (this.results[0].lotteryTypeId) {
					case 30:
						path = "shishicai";
						break;
					case 4:
						path = "liuhePlaying";
						break;
					case 28: //MRZ  遗漏快三类型跳转逻辑
						path = "kuaisan";
						break;
					case 29:
						path = "airship"
						break;
					case 10:
						path = "PK"
						break;
					case 28:
						path = "kuaisan"
						break;
					case 19:
						path = "elevenOutOfFive"
						break;
					case 31:
						path = "luckyTwenty"
						break;
					case 26:
						path = "pcEgg"
						break;
					case 32:
						path = "luckyFarm"
						break;
					case 20:
						path = "arrangementThree"
						break;
				}
				let url = '';
				if (index === 1) {
					url = '/pages/liuhe/' + path + '?records=true' + '&id=' + this.listParam.lotteryId;
				} else {
					url = '/pages/liuhe/' + path + '?id=' + this.listParam.lotteryId
				}
				uni.redirectTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.betting-results {
		//background-color: #EEEEEE;
		position: relative;
		display: flex;
		flex-direction: column;

		/deep/ .header {
			grid-template-columns: repeat(3, 25% 50% 25%);
		}

		.balance {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 28rpx;
			right: 30rpx;
			z-index: 99;

			.balance-text {
				color: #404040;

				font-size: 28rpx;
				font-weight: 600;
				margin-right: 20rpx;

				/deep/ .u-count-num {
					color: #404040 !important;
					font-family: 'Roboto' !important;
					font-size: 28rpx !important;
					font-weight: 600 !important;
				}
			}

			.refresh-icon {
				width: 24rpx;
				height: 24rpx;
				transition: 1s;
				margin-left: 5rpx;
			}
		}

		.balance.refresh {
			.refresh-icon {
				animation: mymove 1s infinite;
				/*Safari 和 Chrome:*/
				-webkit-animation: mymove 1s infinite;
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

		.nav-right {
			display: flex;
			align-items: center;


			.menu {
				height: 40rpx;
				width: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.confirm-box {
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			box-sizing: border-box;

			.conftrm-text {
				padding: 35rpx 232rpx;
				text-align: center;
				color: #404040;
				text-align: center;

				font-size: 34rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;
				border-top-left-radius: 24rpx;
				border-top-right-radius: 24rpx;
				height: 108rpx;
				box-sizing: border-box;
			}

			.confirm-content {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #404040;
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;
				/* 190.118% */
				height: 172rpx;
				padding-bottom: 28rpx;
			}

			.bottom-btn {
				display: flex;
				justify-content: space-around;
				height: 88rpx;
				width: 100%;
				border-top: 1rpx solid var(--theme-auxiliary-color-default);

				.cancel {
					color: #404040;
					text-align: center;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 1rpx solid var(--theme-auxiliary-color-default);
					width: 100%;
				}

				.confirm-act {
					text-align: center;

					font-size: 34rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
				}
			}
		}

		.lists {
			height: 0;
			//margin-bottom: 300rpx;
			flex: 1;
			border-radius: 24rpx;

			.result-list {
				border-radius: 24rpx;
				width: 100%;
				margin: 20rpx 0;
				overflow: hidden;

				.result-list-item {
					margin-bottom: 20rpx;
					box-sizing: border-box;
					width: 100%;
					/*border-top: 6rpx solid #3881A8;*/
					background-color: #FFFFFF;
					position: relative;
					border-radius: 24rpx;
					background: #FFF;
					box-sizing: border-box;

					&:last-child {
						margin-bottom: 0;
					}

					.label-type {
						position: absolute;
						left: 0;
						top: -4rpx;
						background-image: url("@/static/img/liuhe/Vector.png");
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-position: center;
						width: 84rpx;
						height: 92rpx;

						.label-type-text {
							font-weight: 400;
							font-size: 24rpx;
							line-height: 40rpx;
							color: #FFFFFF;
							transform: rotate(-45deg);
						}
					}

					.item-top {
						padding: 20rpx 28rpx;
						border-bottom: 1rpx solid #E7E7E7;
						display: flex;
						justify-content: space-between;

						.title {
							color: #404040;

							font-style: normal;
							font-weight: 400;
						}

						.num {
							color: #404040;

							font-size: 28rpx;
							font-weight: 400;
						}

						.item-right {
							position: relative;
							height: 100%;
							width: 100%;
							display: flex;
							align-items: flex-end;

							.date {
								color: #404040;

								font-size: 28rpx;
								font-weight: 400;
							}
						}
					}

					.item-center {
						padding: 20rpx 0;
						margin: 0 28rpx;
						border-bottom: 1rpx solid #E7E7E7;

						.item-center-content {
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
							align-items: center;
							overflow: hidden;
							.left{
								flex: 1;
								overflow: hidden;
							}
							.bet-value {
								color: var(--theme-auxiliary-color-remind);
								overflow: hidden;
								text-overflow: ellipsis;
								font-weight: 400;
								font-size: 35rpx;
							}

							.bet-info {
								color: #404040;

								font-size: 28rpx;
								font-weight: 400;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								width: 480rpx;
								padding-bottom: 20rpx;

								.play-name {}

								.bet-num {
									font-weight: 400;
									font-size: 26rpx;
									line-height: 36rpx;
									color: #404040;
									margin-left: 16rpx;
								}

								.bet-amount {}

								.amount {
									margin-left: 16rpx;
								}
							}

						}

						.item-center-right {
							width: 220rpx;
							height: 100%;
							position: relative;
							display: flex;
							align-items: center;

							.withdraw {
								position: absolute;
								right: 12rpx;
								width: 112rpx;
								height: 36rpx;
								padding: 10rpx 20rpx;
								background: var(--theme-color);

								border-radius: 16rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: #FFFFFF;
								display: flex;
								justify-content: center;
								align-items: center;

								image {
									width: 36rpx;
									height: 36rpx;
									margin-right: 20rpx;
								}
							}

							image {
								width: 120rpx;
								height: 96rpx;
							}
						}
					}

					.item-bottom {
						padding: 20rpx 28rpx;
						color: #404040;

						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						line-height: normal;

						.order-num-label {}

						.order-num {}
					}
				}
			}

			.footer {
				position: fixed;
				bottom: 0;
				width: 100%;
				background: #FFFFFF;
				border-top-left-radius: 40rpx;
				border-top-right-radius: 40rpx;
				max-width: 480px;
				height: 290rpx;
				padding-bottom: var(--safe-area-inset-bottom);

				.total-count {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #FFFFFF;
					border-top-left-radius: 40rpx;
					border-top-right-radius: 40rpx;
					height: 60rpx;
					width: 100%;
					font-size: 30rpx;
					color: #404040;
					font-style: normal;
					font-weight: 400;
					padding: 0 28rpx;
					box-sizing: border-box;

					text {
						color: var(--theme-auxiliary-color-remind);

						font-size: 30rpx;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
					}
				}

				.btn-group {

					padding: 10rpx 28rpx;
					// padding-bottom: 10px;
					box-sizing: border-box;
					padding-bottom: 0;

					.btn-group-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						background: var(--theme-color);
						border-radius: 16rpx;
						width: 100%;
						height: 88rpx;
						color: #FFFFFF;
						font-size: 34rpx;
						margin-bottom: 20rpx;

						font-weight: 400;
					}

					.btn-group-btn:nth-child(2) {
						background: #FFFFFF;
						border-radius: 16rpx;
						border: 2rpx solid var(--theme-color);
						width: 100%;
						height: 88rpx;
						color: var(--theme-color);
						font-size: 34rpx;
						text-align: center;
					}
				}
			}
		}



	}
</style>
