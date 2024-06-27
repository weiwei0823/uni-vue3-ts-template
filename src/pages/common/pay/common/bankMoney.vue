<template>
	<view class="bank-div " name="bankMoney">
		<view class="money" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">


			<view class="amount-input">
				<view class="title">
					<view class="line"></view>
					{{ $t('pages.common.pay.common.bankMoney.InputAmount') }}
				</view>
				<view class="input-item">
					<view class="input-row">
						<input class="uni-input" :placeholder-style="placeholderStyle" type="number" @input="moeny"
							v-model="money"
							:placeholder="$t('pages.common.pay.common.bankMoney.EnterRechargeAmount') + '（' + info.singleMinLimit + '-' + info.singleMaxLimit + '）'" />
					</view>
				</view>
			</view>


			<view class="next-box">
				<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="nextBtn()">
					{{$t('pages.common.pay.common.bankMoney.Next')}}
				</view>
			</view>
			<view class="hint">
				<view class="hint-box">
					<text class="hint-title">{{ $t('pages.common.pay.common.bankMoney.Tip') }}</text>
					<view class="content">
						{{ info.remark }}
					</view>
				</view>
			</view>
			<uni-drawer ref="pay" mode="right" :width="100">
				<Bank :info="info" :money="money" @closePay="closePay" />
			</uni-drawer>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import uniDrawer from "@/uni_modules/uni-drawer/components/uni-drawer/uni-drawer";
	import {
		debounce,
		throttle
	} from "@/utils/function";
	import Bank from "./bank";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "bankMoney",
		components: {
			NavBar,
			uniDrawer,
			Bank
		},
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				},
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),

		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.pay.common.bankMoney.RechargeInputAmount'),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040",
					'font-weight': 600
				},
				placeholderStyle: "font-weight: 400;font-size: 28rpx;line-height: 45rpx; color: #A1A1A1;",
				money: "",
				moneyList: [],
				isAction: false,
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			if (this.info.fixedAmount != null && this.info.fixedAmount.length > 0) {
				this.moneyList = this.info.fixedAmount.split(",");
			}
		},
		methods: {
			back() {
				this.$emit('closePay');
			},
			onClick() {
				this.$refs.test.open()
			},
			closePay() {
				this.$refs.pay.close()
			},
			selectMoney(item) {
				this.money = item + ""
				if (this.money.length > 0) {
					this.isAction = true
				} else {
					this.isAction = false
				}
			},
			moeny: throttle(function() {
				if (this.money >= this.info.singleMinLimit && this.money <= this.info.singleMaxLimit) {
					this.isAction = true
				} else {
					this.isAction = false
				}
			}, 200),
			nextBtn() {
				if (this.isAction == false) {
					return false
				}
				this.$refs.pay.open()
			},
			cancel() {
				this.$refs.confirm.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-drawer__content{
		max-width: 480px;
	}
	.bank-div {
		width: 100vw;
		height: fit-content !important;
	}

	.money {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		background: var(--theme-auxiliary-color-default);

		.pay-box {
			.list-row {
				background: #F6F6F6;

				.list-item {
					height: 120rpx;
					/*margin-top: 10rpx;*/
					background: #FFFFFF;

					.slot-box {
						display: flex;
						align-items: center;

						.slot-image {
							height: 54rpx;
							width: 54rpx;
						}
					}

					.slot-text {
						font-weight: 500;
						font-size: 32rpx;
						line-height: 45rpx;
						display: flex;
						align-items: center;
						color: #404040;
						margin-left: 18rpx;
					}
				}
			}

		}

		.amount-input {
			background-color: #FFFFFF;
			margin-top: 20rpx;
			border-radius: 24rpx;
			padding-bottom: 20rpx;

			.title {
				display: flex;
				color: var(--theme-color);

				font-size: 34rpx;
				font-weight: 500;
				align-items: center;
				padding: 20rpx 28rpx;

				.line {
					height: 24rpx;
					width: 6rpx;
					border-radius: 20rpx;
					background: var(--theme-color);
					margin-right: 20rpx;
				}
			}


			.input-item {
				width: 100%;

				.input-row {
					display: flex;
					justify-content: center;

					.uni-input {
						width: 90%;
						padding: 20rpx;
						background: #FFFFFF;
						text-align: left;
						height: 96rpx;
						border-radius: 16rpx;
						border: 1px solid var(--theme-auxiliary-color-default);
						box-sizing: border-box;
					}
				}
			}
		}


		.next-box {
			clear: both;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;

			.next-btn {
				width: 705rpx;
				height: 88rpx;
				background: #C8C9CC;
				border-radius: 16rpx;
				font-weight: 500;
				font-size: 34rpx;
				line-height: 45rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.active {
				width: 705rpx;
				height: 88rpx;
				background: var(--theme-color);
				border-radius: 16rpx;
				font-weight: 500;
				font-size: 34rpx;
				line-height: 45rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.hint {
			display: flex;
			justify-content: center;
			margin-top: 60rpx;

			.hint-box {
				width: 100%;
				padding: 0 28rpx;

				.hint-title {
					font-weight: 500;
					font-size: 30rpx;
					line-height: 42rpx;
					text-align: center;
					color: var(--theme-auxiliary-color-remind);
				}

				.content {
					font-weight: 400;
					font-size: 26rpx;
					line-height: 34rpx;
					color: #A1A1A1;
					margin: 20rpx 6rpx 0 0;
				}
			}
		}

		.confirm-box {
			height: 299rpx;
			width: 436rpx;
			border-radius: 10rpx;
			padding: 20rpx 54rpx 20rpx 54rpx;
			background: #fff;

			.titles {
				height: 80rpx;
				font-weight: 400;
				font-size: 32rpx;
				line-height: 80rpx;
				text-align: center;
				color: #9A9A9A;
				border-bottom: 2rpx solid #E6E6E6;
			}

			.notice {
				height: 160rpx;
				font-weight: 400;
				font-size: 28rpx;
				line-height: 64rpx;
				text-align: center;
				color: #404040;
			}

			.btn-box {
				display: flex;
				color: #FFFFFF;
				font-weight: 400;
				font-size: 26rpx;

				.cancel-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 60rpx;
					width: 200rpx;
					border-radius: 264rpx;
					background: #8CB2C9;
					margin-right: 20rpx;
				}

				.confirm-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 60rpx;
					width: 200rpx;
					border-radius: 264rpx;
					background: #FF9900;
					margin-left: 20rpx;
				}
			}
		}

		.scroll-view {
			/* #ifndef APP-NVUE */
			width: 100%;
			height: 100%;
			/* #endif */
			flex: 1
		}
	}

	::v-deep .header,
	.header-box {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.uni-navbar__header {
			padding: 0 28rpx;
		}
	}
</style>
