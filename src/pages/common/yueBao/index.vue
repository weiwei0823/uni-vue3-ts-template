<template>
	<view class="yeb-index" :class="['theme-' + themeColor.name]">
		<NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
			:font-color="fontColor" :title-style="titleStyle" :isBack="false">
			<block slot="left">
				<svg @click="back" xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22"
					fill="none">
					<path
						d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
						fill="white" />
				</svg>
			</block>
			<block slot="right">
				<view class="yiwen" @click="toUrl('/pages/common/yueBao/kefu')">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M10.5548 13.7587C9.59444 13.7587 9.40238 13.9508 9.40238 14.9111C9.40238 15.8714 9.59444 16.0635 10.5548 16.0635C11.419 16.0635 11.7071 15.8714 11.7071 14.9111C11.7071 13.8548 11.419 13.7587 10.5548 13.7587ZM10.4587 5.5C9.69048 5.5 8.92222 5.59603 8.25 5.78809V7.42063C8.82619 7.22857 9.49841 7.13254 10.1706 7.13254C11.419 7.13254 11.8032 7.3246 11.8032 8.38095C11.8032 9.14921 11.6111 9.34127 10.9389 9.91746C9.97857 10.6857 9.69048 11.1659 9.69048 12.0302V12.7024H11.323V12.3183C11.323 11.7421 11.5151 11.454 12.3794 10.7817C13.3397 10.2056 13.7238 9.34127 13.8198 8.09286C13.8198 6.07619 12.7635 5.5 10.4587 5.5Z"
							fill="white" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M11 20.35C16.1639 20.35 20.35 16.1639 20.35 11C20.35 5.83614 16.1639 1.65 11 1.65C5.83614 1.65 1.65 5.83614 1.65 11C1.65 16.1639 5.83614 20.35 11 20.35ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z"
							fill="white" />
					</svg>
					<text class="text">{{ $t('pages.common.userCenter.yueBao.Question') }}</text>
				</view>
			</block>
		</NavBar>
		<view class="content">
			<view class="monty-card">
				<view class="card">
					<view class="title">{{ $t('pages.common.userCenter.yueBao.Balance') }}</view>
					<view class="money">¥{{ setAmount(data.totalAmount) }}</view>
					<view class="yesterday">{{ $t('pages.common.userCenter.yueBao.YesterdayEarnings') }}{{
						data.yesterdayProfit }}</view>
					<view class="count">
						<view class="item">
							<view class="name">{{ $t('pages.common.userCenter.yueBao.TotalEarnings') }}</view>
							<view class="num">{{ data.totalProfit }}</view>
						</view>
						<view class="item">
							<view class="name">{{ $t('pages.common.userCenter.yueBao.SevenDayAPY') }}</view>
							<view class="num">{{ data.avgProfit }}%</view>
						</view>
					</view>
					<view class="btns">
						<u-button class="btn out" shape="circle" :hair-line="false"
							@click="toUrl(`/pages/common/yueBao/out?totalAmount=${data.totalAmount}`)">{{
								$t('pages.common.userCenter.yueBao.TransferOut') }}</u-button>
						<u-button class="btn enter" shape="circle" :hair-line="false"
							@click="toUrl('/pages/common/yueBao/enter')">{{ $t('pages.common.userCenter.yueBao.TransferIn')
							}}</u-button>
					</view>
				</view>
			</view>
			<view class="center">
				<view class="item">
					{{ $t('pages.common.userCenter.yueBao.PriorEarnings') }}
					<view class="num">{{ data.preProfit }}</view>
				</view>
				<view class="item">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM10 6C10 5.44772 10.4477 5 11 5C11.5523 5 12 5.44772 12 6V11.4267L14.9849 13.15C15.4632 13.4261 15.627 14.0377 15.3509 14.516C15.0747 14.9943 14.4632 15.1582 13.9849 14.8821L10.5208 12.882C10.4768 12.8567 10.4355 12.8285 10.397 12.7978C10.1558 12.6152 10 12.3258 10 12V6Z"
							:fill="themeColor.themeColor" />
					</svg>
					{{ $u.timeFormat(data.preTime,"yyyy-mm-dd hh:MM:ss") }}
				</view>
			</view>
			<view class="jump">
				<view class="item" @click="toUrl('/pages/common/yueBao/earnings')">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M4.91602 0C2.70688 0 0.916016 1.79086 0.916016 4V18C0.916016 20.2091 2.70687 22 4.91601 22H10.732C9.20957 20.6563 8.24935 18.6903 8.24935 16.5C8.24935 12.4499 11.5326 9.16667 15.5827 9.16667C17.773 9.16667 19.739 10.1269 21.0827 11.6493V4C21.0827 1.79086 19.2918 0 17.0827 0H4.91602ZM9.54829 8.33416C9.98145 8.33416 10.3326 8.69023 10.3326 9.13025C10.3326 9.56951 9.98145 9.92639 9.54829 9.92639H7.97969V10.9215C7.97969 11.4712 7.54083 11.9167 6.99928 11.9167C6.45778 11.9167 6.01891 11.4712 6.01891 10.9215V9.92639H4.4503C4.01715 9.92639 3.66602 9.56949 3.66602 9.13025C3.66602 8.69019 4.01717 8.33416 4.4503 8.33416H6.01891V7.53801H4.4503C4.01715 7.53801 3.66602 7.1812 3.66602 6.74194C3.66602 6.30192 4.01717 5.94581 4.4503 5.94581H6.01891V5.89136L4.27835 4.12497C3.96989 3.81165 3.96989 3.304 4.27835 2.99104C4.58682 2.67808 5.08679 2.67811 5.39527 2.99104L6.98611 4.60542L8.58312 2.98441C8.89156 2.67186 9.39157 2.67186 9.70002 2.98441C10.0085 3.29771 10.0085 3.80543 9.70002 4.11834L7.97975 5.86452V5.94579H9.54836C9.98151 5.94579 10.3327 6.3019 10.3327 6.74192C10.3327 7.18122 9.98151 7.53799 9.54836 7.53799H7.97975V8.33414L9.54829 8.33416ZM20.9993 16.5C20.9993 19.5376 18.5369 22 15.4993 22C12.4617 22 9.99931 19.5376 9.99931 16.5C9.99931 13.4624 12.4617 11 15.4993 11C18.5369 11 20.9993 13.4624 20.9993 16.5ZM15.2493 13C14.8351 13 14.4993 13.3358 14.4993 13.75V17.25C14.4993 17.3225 14.5096 17.3926 14.5288 17.4589C14.5768 17.6482 14.6983 17.8187 14.8808 17.924L16.1798 18.674C16.5385 18.8811 16.9972 18.7582 17.2043 18.3995C17.4114 18.0408 17.2885 17.5821 16.9298 17.375L15.9993 16.8378V13.75C15.9993 13.3358 15.6635 13 15.2493 13Z"
							:fill="themeColor.themeColor" />
					</svg>
					{{ $t('pages.common.userCenter.yueBao.EarningsHistory') }}
				</view>
				<view class="item" @click="toUrl('/pages/common/yueBao/capital')">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M4.91602 0C2.70688 0 0.916016 1.79086 0.916016 4V18C0.916016 20.2091 2.70687 22 4.91601 22H10.732C9.20957 20.6563 8.24935 18.6903 8.24935 16.5C8.24935 12.4499 11.5326 9.16667 15.5827 9.16667C17.773 9.16667 19.739 10.1269 21.0827 11.6493V4C21.0827 1.79086 19.2918 0 17.0827 0H4.91602ZM9.54829 8.33416C9.98145 8.33416 10.3326 8.69023 10.3326 9.13025C10.3326 9.56951 9.98145 9.92639 9.54829 9.92639H7.97969V10.9215C7.97969 11.4712 7.54083 11.9167 6.99928 11.9167C6.45778 11.9167 6.01891 11.4712 6.01891 10.9215V9.92639H4.4503C4.01715 9.92639 3.66602 9.56949 3.66602 9.13025C3.66602 8.69019 4.01717 8.33416 4.4503 8.33416H6.01891V7.53801H4.4503C4.01715 7.53801 3.66602 7.1812 3.66602 6.74194C3.66602 6.30192 4.01717 5.94581 4.4503 5.94581H6.01891V5.89136L4.27835 4.12497C3.96989 3.81165 3.96989 3.304 4.27835 2.99104C4.58682 2.67808 5.08679 2.67811 5.39527 2.99104L6.98611 4.60542L8.58312 2.98441C8.89156 2.67186 9.39157 2.67186 9.70002 2.98441C10.0085 3.29771 10.0085 3.80543 9.70002 4.11834L7.97975 5.86452V5.94579H9.54836C9.98151 5.94579 10.3327 6.3019 10.3327 6.74192C10.3327 7.18122 9.98151 7.53799 9.54836 7.53799H7.97975V8.33414L9.54829 8.33416ZM21.0827 16.5C21.0827 19.5376 18.6202 22 15.5827 22C12.5451 22 10.0827 19.5376 10.0827 16.5C10.0827 13.4624 12.5451 11 15.5827 11C18.6202 11 21.0827 13.4624 21.0827 16.5ZM12.741 14.2083C12.2854 14.2083 11.916 14.5777 11.916 15.0333C11.916 15.489 12.2854 15.8583 12.741 15.8583H18.4243C18.88 15.8583 19.2493 15.489 19.2493 15.0333C19.2493 14.5777 18.88 14.2083 18.4243 14.2083H12.741ZM12.741 17.875C12.2854 17.875 11.916 18.2444 11.916 18.7C11.916 19.1556 12.2854 19.525 12.741 19.525H16.591C17.0466 19.525 17.416 19.1556 17.416 18.7C17.416 18.2444 17.0466 17.875 16.591 17.875H12.741Z"
							:fill="themeColor.themeColor" />
					</svg>
					{{ $t('pages.common.userCenter.yueBao.FinancialDetails') }}
				</view>
			</view>
			<view class="tip">{{ $t('pages.common.userCenter.yueBao.DailyEarningsCalculation') }}</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";

	import {
		init
	} from '@/utils/yeb'
	import defaultTemplate from "@/utils/defaultTemplate";
	import Playing from '@/utils/common/playing';
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				playing: new Playing(),
				title: this.$t('pages.common.userCenter.yueBao.BalanceTreasure'),
				headerStyle: {
					backgroundColor: ""
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				data: {}
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		onShow() {
			this.initData()
			this.headerStyle.backgroundColor = this.themeColor.themeColor
			this.$nativeBridge.setStatusBarColor(this.themeColor.themeColor)
		},
		methods: {
			back() {
				backPage()
			},
			toUrl(url) {
				uni.navigateTo({
					url
				})
			},
			async initData() {
				const res = await init()
				const data = defaultTemplate({
					totalAmount: 0,
					yesterdayProfit: 0,
					totalProfit: 0,
					avgProfit: '',
					preProfit: 0,
					preTime: ''
				}, res.result)
				this.data = data
			},
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.yeb-index {
		.yiwen {
			display: flex;
			align-items: center;

			.text {
				margin-left: 20rpx;
				font-size: 30rpx;
			}
		}

		::v-deep .header-box {
			.header {
				height: 88rpx;
			}

			.uni-navbar__header {
				padding: 0 28rpx;
			}
		}

		.mark {
			width: 40rpx;
			height: 40rpx;
		}

		.content {
			display: flex;
			flex-direction: column;

			.monty-card {
				background: linear-gradient(180deg, var(--theme-color) 0%, rgba(7, 193, 96, 0.00) 100%);
				padding: 0 28rpx;

				.card {
					background: #FFFFFF;
					border-radius: 24rpx;
					padding: 40rpx 0;
					display: flex;
					flex-direction: column;
					align-items: center;

					.title {
						font-size: 30rpx;
						color: #404040;
					}

					.money {
						font-size: 60rpx;

						color: #404040;
						margin: 20rpx 0 40rpx;
					}

					.yesterday {
						background: var(--theme-auxiliary-color-default);
						border-radius: 16rpx;
						padding: 20rpx;
						font-size: 30rpx;
						color: #404040;
					}

					.count {
						display: flex;
						width: 100%;
						height: 88rpx;
						justify-content: space-around;
						margin: 20rpx 0;

						.item {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-between;

							.name {
								font-size: 28rpx;
								color: #404040;
							}

							.num {
								font-size: 30rpx;
								color: #404040;
							}
						}
					}

					.btns {
						display: flex;
						justify-content: space-between;
						width: 100%;
						box-sizing: border-box;
						padding: 0 66rpx;

						.btn {
							width: 216rpx;
							height: 76rpx;
							font-size: 30rpx;
							border: unset;
							margin: 0;
							border-radius: 16rpx;
						}

						.out {
							background: var(--theme-auxiliary-color-default);
							color: var(--theme-color);
						}

						.enter {
							background: var(--theme-color);
							color: #FFFFFF;
						}

					}
				}
			}

			.center {
				display: flex;
				justify-content: space-between;
				background: #FFFFFF;
				padding: 0 20rpx;
				margin: 20rpx 28rpx;
				border-radius: 24rpx;
				height: 96rpx;

				.item {
					display: flex;
					align-items: center;
					gap: 10rpx;
					font-size: 30rpx;
					color: #404040;

					.num {
						color: var(--theme-color);
					}
				}
			}

			.jump {
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 0 20rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				margin: 0 28rpx;
				height: 96rpx;

				.item {
					display: flex;
					align-items: center;
					gap: 20rpx;
					color: #404040;
					font-size: 30rpx;
				}
			}

			.tip {
				font-size: 28rpx;
				width: 100%;
				text-align: center;
				color: #404040;
				position: absolute;
				bottom: 50rpx;
			}
		}
	}
</style>
