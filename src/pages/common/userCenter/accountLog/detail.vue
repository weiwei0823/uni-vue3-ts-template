<template>
	<view class="log-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<scroll-view scroll-y class="scroll-Y">
			<view class="step-box">
				<view class="step-item">
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-if="detail.status >= -1">
						<circle cx="22" cy="22" r="22" :fill="themeColor.themeColor" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-else>
						<circle cx="22" cy="22" r="22" fill="#A1A1A1" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<view class="title" :class="{ 'hui-title': detail.status < 0 }">{{ detail.type ==
						$t('pages.common.userCenter.accountLog.detail.Recharge') ?
						$t('pages.common.userCenter.accountLog.detail.InitiateRecharge') :
						$t('pages.common.userCenter.accountLog.detail.InitiateWithdrawal') }}
					</view>
					<view class="time">{{ detail.createTime }}</view>
					<view class="line" :class="{ 'hui-line': detail.status < -1 }"></view>
				</view>
				<view class="step-item">
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-if="detail.status >= 0">
						<circle cx="22" cy="22" r="22" :fill="themeColor.themeColor" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-else>
						<circle cx="22" cy="22" r="22" fill="#A1A1A1" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<view class="title" :class="{ 'hui-title': detail.status < 0 }">
						{{ $t('pages.common.userCenter.accountLog.detail.Processing') }}
					</view>
					<view class="time">{{ detail.lockTime }}</view>
					<view class="line" :class="{ 'hui-line': detail.status < 1 }"></view>
				</view>
				<view class="step-item">
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-if="detail.status == 1">
						<circle cx="22" cy="22" r="22" :fill="themeColor.themeColor" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-else-if="detail.status == 2">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M13.6542 27.7899C12.9032 28.541 12.9032 29.7586 13.6542 30.5096C14.4052 31.2606 15.6228 31.2606 16.3738 30.5096L22.5146 24.3688L28.6407 30.495C29.3917 31.246 30.6093 31.246 31.3603 30.495C32.1113 29.7439 32.1113 28.5263 31.3603 27.7753L25.2342 21.6492L31.3318 15.5516C32.0829 14.8005 32.0829 13.5829 31.3318 12.8319C30.5808 12.0809 29.3632 12.0809 28.6122 12.8319L22.5146 18.9296L16.4023 12.8173C15.6513 12.0663 14.4337 12.0663 13.6826 12.8173C12.9316 13.5683 12.9316 14.7859 13.6826 15.5369L19.7949 21.6492L13.6542 27.7899Z"
							:fill="themeColor.themeAuxiliaryColorRemind" />
						<circle cx="22" cy="22" r="21" :stroke="themeColor.themeAuxiliaryColorRemind"
							stroke-width="2" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"
						v-else>
						<circle cx="22" cy="22" r="22" fill="#A1A1A1" />
						<path d="M31.75 16L19.1872 28.9231L11.75 21.2726" stroke="white" stroke-width="4"
							stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<view class="title" :class="{ 'hui-title': detail.status !== 1, 'hong-title': detail.status == 2 }">
						{{ getText }}
					</view>
					<view class="time">{{ detail.confirmTime }}</view>
				</view>
			</view>
			<view class="detail-row">
				<template v-if="detail.drawStyle === 2">
					<view class="detail-item">
						<view class="title">出售方式</view>
						<view class="right">{{ detail.izSplit === 1 ? '可拆分' : '不拆分' }}</view>
					</view>
					<view class="detail-item" v-if="detail.izSplit === 1">
						<view class="title">最小金额</view>
						<view class="right">{{ Number(detail.splitMinAmount).toFixed(2) }}</view>
					</view>
					<view class="detail-item">
						<view class="title">完成金额</view>
						<view class="right">{{ Number(detail.finishAmount).toFixed(2) }}</view>
					</view>
					<view class="detail-item">
						<view class="title">优惠金额</view>
						<view class="right">{{ Number(detail.disAmount).toFixed(2) }}</view>
					</view>
					<view class="detail-item">
						<view class="title">优惠比例</view>
						<view class="right">{{ detail.disRatio + '%' }}</view>
					</view>
				</template>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.OrderAmount') }}</view>
					<view class="right">
						{{ detail.amount }}{{ $t('pages.common.userCenter.accountLog.detail.Currency') }}
					</view>
				</view>
				<view class="detail-item"
					v-if="detail.type == $t('pages.common.userCenter.accountLog.detail.Recharge')">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.DepositBonus') }}</view>
					<view class="right">{{ detail.discountAmount }}元</view>
				</view>
				<view class="detail-item"
					v-if="detail.type == $t('pages.common.userCenter.accountLog.detail.Withdrawal')">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.WithdrawalFee') }}</view>
					<view class="right">{{ detail.fee }}元（{{ detail.feeRatio }}%）</view>
				</view>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.OrderTime') }}</view>
					<view class="right">{{ detail.createTime }}</view>
				</view>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.PaymentMethod') }}</view>
					<view class="right">{{ detail.childType }}</view>
				</view>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.Reference') }}</view>
					<view class="right">{{ detail.remark }}</view>
				</view>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.OrderNumber') }}</view>
					<view class="right">{{ detail.orderNo }}</view>
				</view>
				<view class="detail-item">
					<view class="title">{{ $t('pages.common.userCenter.accountLog.detail.OrderSource') }}</view>
					<view class="right">
						<image src="@/static/img/user/accountlog/h5.png"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import Common from "./common/common";
	import {
		accessInfo
	} from "@/utils/lottery/mine";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			Common
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.accountLog.detail.OrderDetails'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				detail: null,
				formData: {
					createTime: '',
					id: '',
					source: 1,
				}
			}
		},
		onLoad(option) {
			//方式二：接收参数
			// #ifdef APP-NVUE
			var eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			var eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('argParams', function(data) {
				option = data
			})
			this.detail = option
			this.formData.createTime = option.createTime
			this.formData.id = option.id
			this.formData.source = option.source
			this.getInfo()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor"]),
			getText() {
				if (this.detail.type == this.$t('pages.common.userCenter.accountLog.detail.Recharge')) {
					if (this.detail.status == 1) {
						return this.$t('pages.common.userCenter.accountLog.detail.PaymentSuccess');
					} else if (this.detail.status == 2) {
						return this.$t('pages.common.userCenter.accountLog.detail.RechargeFailed');
					} else {
						return this.$t('pages.common.userCenter.accountLog.detail.PaymentSuccess')
					}
				} else {
					if (this.detail.status == 1) {
						return this.$t('pages.common.userCenter.accountLog.detail.WithdrawalSuccess');
					} else if (this.detail.status == 2) {
						return this.$t('pages.common.userCenter.accountLog.detail.WithdrawalFailed');
					} else {
						return this.$t('pages.common.userCenter.accountLog.detail.WithdrawalSuccess')
					}
				}

				this.$store.dispatch("updateUserBalanceFromServer")
			}
		},
		methods: {
			getInfo: function() {
				let prams = this.formData
				accessInfo(prams).then(res => {
					this.detail = res.result
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		height: calc(var(--vh) - 120rpx);
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
	}

	.log-box {


		.step-box {
			height: 340rpx;
			border-radius: 24rpx;
			left: 0px;
			background: #FFFFFF;
			display: flex;
			align-items: center;

			.step-item {
				width: 33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;

				image {
					height: 50rpx;
					width: 50rpx;
				}

				.title {
					font-weight: 400;
					font-size: 28rpx;
					text-align: center;
					margin-top: 20rpx;
					color: var(--theme-color);
				}

				.hui-title {
					color: #404040;
				}

				.hong-title {
					color: var(--theme-auxiliary-color-remind);
				}

				.time {
					font-weight: 400;
					font-size: 24rpx;
					text-align: center;
					color: #404040;
					margin-top: 10rpx;
					width: 130rpx;
					height: 32rpx;
				}

				.line {
					position: absolute;
					height: 6rpx;
					width: 110rpx;
					background: var(--theme-color);
					border-radius: 4rpx;
					top: 44rpx;
					right: -60rpx;
				}

				.hui-line {
					background: #CCCCCC;
				}
			}
		}

		.detail-row {
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			.detail-item {
				display: flex;
				justify-content: space-between;
				min-height: 96rpx;
				padding: 0 28rpx;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.title {
					width: 27%;
					font-weight: 400;
					font-size: 30rpx;
					color: #404040;
					display: flex;
					align-items: center;
				}

				.right {
					width: 73%;
					text-align: end;
					font-weight: 400;
					font-size: 28rpx;
					color: #404040;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					image {
						height: 48rpx;
						width: 48rpx;
					}
				}

				.remark {
					color: var(--theme-auxiliary-color-remind);
				}
			}
		}
	}
</style>
