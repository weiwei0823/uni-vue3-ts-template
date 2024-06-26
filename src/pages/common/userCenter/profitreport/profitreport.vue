<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" :isFixed="true" />
		<view class="top-box">
			<view class="date-box">
				<view class="pre" @click="pre()">
					<view class="pre-item" v-show="isShowPre">
						<view class="text">
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18"
								fill="none">
								<rect x="0.5" y="18" width="18" height="18" rx="9" transform="rotate(-90 0.5 18)"
									:fill="themeColor.themeAuxiliaryColorDefault" />
								<path d="M11 13L7 9L11 5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
							<view class="te">{{ $t('pages.common.userCenter.accountLog.PreviousDay') }}</view>
						</view>
						<view class="coin-box">
							{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}
							<text class="coin" :class="lastAmount > 0 ? 'red' : lastAmount < 0 ? 'green' : ''">
								{{ lastAmount }}
							</text>
						</view>
					</view>
				</view>
				<view class="time-item">
					<view class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
							<g clip-path="url(#clip0_17702_98016)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M9.5 1.5C9.5 0.670313 8.82969 0 8 0C7.17031 0 6.5 0.670313 6.5 1.5V3H4.25C3.00781 3 2 4.00781 2 5.25V7.5H23V5.25C23 4.00781 21.9922 3 20.75 3H18.5V1.5C18.5 0.670313 17.8297 0 17 0C16.1703 0 15.5 0.670313 15.5 1.5V3H9.5V1.5ZM23 9H2V21.75C2 22.9922 3.00781 24 4.25 24H20.75C21.9922 24 23 22.9922 23 21.75V9ZM8.16669 12.002C8.44283 12.002 8.66669 12.2258 8.66669 12.502V15.502C8.66669 15.7781 8.44283 16.002 8.16669 16.002H5.16669C4.89054 16.002 4.66669 15.7781 4.66669 15.502V12.502C4.66669 12.2258 4.89054 12.002 5.16669 12.002H8.16669ZM8.16675 17.3359C8.44289 17.3359 8.66675 17.5598 8.66675 17.8359V20.8359C8.66675 21.1121 8.44289 21.3359 8.16675 21.3359H5.16675C4.89061 21.3359 4.66675 21.1121 4.66675 20.8359V17.8359C4.66675 17.5598 4.89061 17.3359 5.16675 17.3359H8.16675ZM11.1667 12.002C10.8906 12.002 10.6667 12.2258 10.6667 12.502V15.502C10.6667 15.7781 10.8906 16.002 11.1667 16.002H14.1667C14.4429 16.002 14.6667 15.7781 14.6667 15.502V12.502C14.6667 12.2258 14.4429 12.002 14.1667 12.002H11.1667ZM14.1667 17.3359C14.4428 17.3359 14.6667 17.5598 14.6667 17.8359V20.8359C14.6667 21.1121 14.4428 21.3359 14.1667 21.3359H11.1667C10.8905 21.3359 10.6667 21.1121 10.6667 20.8359V17.8359C10.6667 17.5598 10.8905 17.3359 11.1667 17.3359H14.1667ZM17.1667 12.002C16.8906 12.002 16.6667 12.2258 16.6667 12.502V15.502C16.6667 15.7781 16.8906 16.002 17.1667 16.002H20.1667C20.4429 16.002 20.6667 15.7781 20.6667 15.502V12.502C20.6667 12.2258 20.4429 12.002 20.1667 12.002H17.1667ZM20.1667 17.3359C20.4429 17.3359 20.6667 17.5598 20.6667 17.8359V20.8359C20.6667 21.1121 20.4429 21.3359 20.1667 21.3359H17.1667C16.8906 21.3359 16.6667 21.1121 16.6667 20.8359V17.8359C16.6667 17.5598 16.8906 17.3359 17.1667 17.3359H20.1667Z"
									:fill="themeColor.themeColor" />
							</g>
							<defs>
								<clipPath id="clip0_17702_98016">
									<rect width="24" height="24" fill="white" transform="translate(0.5)" />
								</clipPath>
							</defs>
						</svg>
					</view>
					<view class="time" @click="openTime">
						<view class="time-text">{{ showTime }}</view>
						<view class="coin-text">
							{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}
							<text class="coin" :class="total > 0 ? 'red' : total < 0 ? 'green' : ''">
								{{ total }}
							</text>
						</view>

					</view>
				</view>
				<view class="next" @click="next()">
					<view class="next-item" v-show="isShowNext">
						<view class="text">
							<view class="te">{{ $t('pages.common.userCenter.accountLog.NextDay') }}</view>
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18"
								fill="none">
								<rect x="18.5" width="18" height="18" rx="9" transform="rotate(90 18.5 0)"
									:fill="themeColor.themeAuxiliaryColorDefault" />
								<path d="M8 5L12 9L8 13" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</view>
						<view class="coin-box">
							{{ $t('pages.common.userCenter.accountLog.profitreport.profit') }}
							<text class="coin" :class="nextAmount > 0 ? 'red' : nextAmount < 0 ? 'green' : ''">{{ nextAmount
              }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="tip">
				{{ $t('pages.common.userCenter.accountLog.profitreport.tips') }}
			</view>
		</view>
		<view v-if="loading" class="loading">
			<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
			<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
			</view>
		</view>

		<scroll-view scroll-y class="list-box" v-else>
			<view class="list-item" v-for="(item, index) in list">
				<view class="top">
					<view class="item-top">
						<image class="img" mode="aspectFit" :src="item.logo || '/static/img/lottery.png'"></image>
						<text class="title">{{ item.title }}</text>
					</view>
					<view class="item-top right-item" @click="toUrl(item)">
						<view class="coin" :class="item.todayAmount >= 0 ? 'red' : item.todayAmount < 0 ? 'green' : ''">
							{{
              item.todayAmount }}
						</view>
						<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
							<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</view>
				</view>
				<view class="bottom">
					<view class="row-item active-item">
						<view class="coin">{{ item.bettingAmount }}</view>
						<view class="title">
							{{ $t('pages.common.userCenter.accountLog.profitreport.betting') }}
						</view>
					</view>
					<view class="row-item active-item">
						<view class="coin">{{ item.winAmount }}</view>
						<view class="title">
							{{ $t('pages.common.userCenter.accountLog.profitreport.Winning') }}
						</view>
					</view>
					<view class="row-item">
						<view class="coin">{{ item.rebateAmount }}</view>
						<view class="title">
							{{ $t('pages.common.userCenter.accountLog.profitreport.rebate') }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker @closePay="closePay" @changeTime="changeTime" :line="'.'" :dayStatMap="dayStatMap"
				:startTimes="startTime" :endTimes="endTime">
			</time-picker>
		</uni-drawer>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import TimePicker from "@/components/common/time-picker";
	import {
		getTime,
		isWithinSevenDays
	} from "@/utils/function"
	import {
		winLoseRecord
	} from "@/utils/lottery/mine";
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "profitreport",
		components: {
			Header,
			AlertInjectLayer,
			TimePicker
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.accountLog.profitreport.title'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				dayStatMap: {},
				type: 0,
				start: '',
				end: '',
				startTime: '',
				endTime: '',
				time: '',
				timeStr: '',
				list: [],
				total: 0.00,
				lastAmount: 0.00,
				nextAmount: 0.00,
				loading: false
			}
		},
		mounted() {
			let date = new Date();
			this.today = getTime(date)
			this.startTime = this.today
			this.endTime = this.today
			this.start = this.getDay(-30)
			this.end = this.today
			this.getList()

			uni.$emit("on_page_mounted", this)

		},
		computed: {
			...mapGetters(['themeColor']),
			showTime() {
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let startTime = getTime(start, '.', 2, 'date')
				let endTime = getTime(end, '.', 2, 'date')
				if (startTime == endTime) {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm月dd日'); //;
				} else {
					startTime.indexOf(".") != -1 && (startTime = startTime.replace(/\./g, "/"));
					endTime.indexOf(".") != -1 && (endTime = endTime.replace(/\./g, "/"));
					return this.$u.timeFormat(new Date(startTime), 'yyyy年mm.dd') + "-" + this.$u.timeFormat(new Date(
						endTime), 'mm.dd')
				}
			},
			isShowPre() {
				let startTime = new Date(this.startTime.replace(/\./g, '/'))
				let start = new Date(this.start.replace(/\./g, '/'))
				if (this.startTime == this.start) {
					return false
				} else if (startTime <= start) {
					return false
				} else {
					return true
				}
			},
			isShowNext() {
				let endTime = new Date(this.endTime.replace(/\./g, '/'))
				let end = new Date(this.end.replace(/\./g, '/'))
				if (this.endTime == this.end) {
					return false
				} else if (endTime >= end) {
					return false
				} else {
					return true
				}
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}


		},
		methods: {
			toUrl(item) {
				if (item.type == 0) {
					uni.navigateTo({
						url: '/pages/liuhe/history/index' + `?startTime=${this.startTime}&endTime=${this.endTime}`
					})
				} else {
					uni.navigateTo({
						url: './detail?title=' + item.title + "&platformId=" + item.type +
							`&startTime=${this.startTime}&endTime=${this.endTime}`
					})
				}
			},
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds);

				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "." + tMonth + "." + tDate;
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			openTime() {
				this.$refs.pay.open()
			},
			closePay() {
				this.$refs.pay.close()
			},
			changeTime(time) {
				this.startTime = time.start
				this.endTime = time.end
				this.getList()
			},
			pre() {
				if (!this.isShowPre) return
				let start = new Date(this.startTime.replace(/\./g, '/'))
				let date = start.getTime() - 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.endTime = getTime(date)
				}
				this.startTime = getTime(date)
				this.getList()
			},
			next() {
				if (!this.isShowNext) return
				let end = new Date(this.endTime.replace(/\./g, '/'))
				let date = end.getTime() + 3600 * 1000 * 24
				if (this.startTime == this.endTime) {
					this.startTime = getTime(date)
				}
				this.endTime = getTime(date)
				this.getList()
			},
			getDefaultTemplate(data) {
				return defaultTemplate({
						lastAmount: 0,
						nextAmount: 0,
						statList: [{
							type: '',
							title: "",
							logo: '',
							todayAmount: 0,
							bettingAmount: 0,
							winAmount: 0,
							rebateAmount: 0
						}, ],
						dayStatMap: {}
					},
					data
				)
			},
			getList() {
				this.loading = true
				let _this = this;

				if (this.startTime === this.endTime && isWithinSevenDays(this.startTime)) {
					const data = uni.getStorageSync('profitreport') || {}
					if (data[this.startTime]) {
						const {
							lastAmount,
							nextAmount,
							statList,
							dayStatMap
						} = this.getDefaultTemplate(data[this.startTime])
						let total = 0;
						_this.list = statList
						_this.dayStatMap = dayStatMap
						_this.lastAmount = lastAmount;
						_this.nextAmount = nextAmount; // res.result.nextAmount
						_this.list.forEach((item, index) => {
							total += parseFloat(item.todayAmount);
						})
						_this.total = total.toFixed(2)
						setTimeout(() => {
							this.loading = false
						}, 100);
					}
				}
				let prams = {
					'beginTime': this.startTime,
					'endTime': this.endTime,
				}
				winLoseRecord(prams).then(res => {
					const {
						lastAmount,
						nextAmount,
						statList,
						dayStatMap
					} = this.getDefaultTemplate(res.result)
					let total = 0;
					_this.list = statList
					_this.dayStatMap = dayStatMap
					_this.lastAmount = lastAmount;
					_this.nextAmount = nextAmount; // res.result.nextAmount
					_this.list.forEach((item, index) => {
						total += parseFloat(item.todayAmount);
					})
					_this.total = total.toFixed(2)
					this.loading = false
					if (this.startTime === this.endTime) {
						const data = uni.getStorageSync('profitreport') || {}
						for (const key in data) {
							if (Object.hasOwnProperty.call(data, key)) {
								if (!isWithinSevenDays(key)) {
									delete data[key]
								}
							}
						}
						data[this.startTime] = res.result
						uni.setStorageSync('profitreport', data)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100vh;
		width: 100vw;
		background: var(--theme-auxiliary-color-default);

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.log-box {


		.top-box {
			position: sticky;
			top: 86rpx;
			z-index: 1;
			background: var(--theme-auxiliary-color-default);
			padding-top: 20rpx;
		}

		.date-box {
			display: flex;
			border-radius: 24rpx;
			background: #fff;
			padding: 0 24rpx;

			.pre,
			.next {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 184rpx;
				height: 116rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #404040;

				.pre-item,
				.next-item {
					display: flex;
					align-items: center;
					flex-direction: column;

					.text {
						display: flex;
						align-items: center;
					}

					.te {
						margin: 0 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.coin-box {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 24rpx;
						margin-top: 10rpx;
					}

					.coin {
						display: inline-block;
						font-size: 24rpx;
						max-width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.green {
						// color: var(--theme-color);
						color: var(--theme-color);
					}

					.red {
						color: var(--theme-auxiliary-color-remind);
					}
				}
			}

			.pre {
				.pre-item {
					align-items: flex-start;
				}
			}

			.next {
				.pre-item {
					align-items: flex-end;
				}
			}

			.time-item {
				width: 378rpx;
				background: var(--theme-color-bg);
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;

				.icon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}

				.time {
					text-align: center;
					font-weight: 400;
					text-align: center;
					color: #404040;

					.time-text {
						font-size: 28rpx;
					}

					.coin-text {
						font-size: 24rpx;

						.green {
							// color: var(--theme-color);
							color: var(--theme-color);
						}

						.red {
							color: var(--theme-auxiliary-color-remind);
						}
					}
				}
			}
		}

		.tip {
			height: 52rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: var(--theme-auxiliary-color-remind);
			padding: 0 28rpx;
			background: var(--theme-auxiliary-color-default);
			box-sizing: border-box;
		}

		.list-box {
			background: var(--theme-auxiliary-color-default);
			height: calc(var(--vh) - 280rpx + var(--safe-area-inset-bottom));
			border-radius: 24rpx;
			overflow: hidden;

			.list-item {
				border-radius: 24rpx;
				background: #fff;
				margin-bottom: 20rpx;

				.top {
					height: 88rpx;
					box-sizing: border-box;
					padding: 20rpx 28rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #F5F5F5;

					.item-top {
						display: flex;
						align-items: center;

						.img {
							margin-right: 20rpx;
							height: 48rpx;
							width: 48rpx;
						}

						.title {
							font-size: 28rpx;
							color: #404040;
						}

						.icon-text {
							font-size: 40rpx;
						}

						.coin {
							margin-right: 20rpx;
							font-size: 30rpx;
						}

						.green {
							// color: var(--theme-color);
							color: var(--theme-color);
						}

						.red {
							color: var(--theme-auxiliary-color-remind);
						}

						.right {
							height: 40rpx;
							width: 40rpx;
							margin-right: 30rpx;
						}
					}

					.right-item {
						justify-content: flex-end;
					}
				}

				.bottom {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					place-content: center;
					height: 118rpx;
					box-sizing: border-box;
					padding: 20rpx 28rpx;

					.row-item {
						font-size: 28rpx;
						display: grid;
						place-content: center;

						.coin {
							color: #404040;
							width: 100%;
							text-align: center;
						}

						.green {
							// color: var(--theme-color);
							color: var(--theme-color);
						}

						.red {
							color: var(--theme-auxiliary-color-remind);
						}

						.title {
							font-size: 24rpx;
							color: #404040;
							width: 100%;
							text-align: center;
						}
					}

					.active-item {
						border-right: 1px solid #e8e8e8;
					}
				}
			}
		}
	}
</style>
