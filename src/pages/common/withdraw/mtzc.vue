<template>
	<view class="bank-box pc-max-width"
		:style="{ position: `fixed`, height: `${winHeight}px`, marginTop: safeHeight, width: '100%' }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<scroll-view scroll-y="true" :style="{ height: `calc( ${winHeight}px - 108rpx)`, marginTop: '20rpx' }">
			<view class="bank-row">
				<view style="display: flex;align-items: center;">
					{{ $t('pages.common.userCenter.withdraw.mtzc.DirectChargeArrivalAmount') }}{{ dz }}
					<template v-if="yh > 0 || !money">
						+<text style="color: #F00;">{{ parseFloat(yh).toFixed(2) }}
							<template v-if="this.init.discountRatio">{{ `(${this.init.discountRatio * 100}%)` }}</template>
						</text>
					</template>
				</view>
			</view>
			<view class="withdraw-box">
				<view class="title-t">{{ $t('pages.common.userCenter.withdraw.mtzc.WithdrawalAmount') }}</view>
				<view class="input-box" :class="{
					focus: isFocus,

				}">
					<input class="uni-input" :placeholder-class="'input-placeholder-text'" :placeholder-style="placeholderStyle"
						type="number" v-model="money" :placeholder="'单笔可提' + init.minAmount + '-' + init.maxAmount + ''"
						@focus="isFocus = true" @blur="isFocus = false" />
					<text class="label-text" @click="allBtn" :class="{

					}">{{ $t('pages.common.userCenter.withdraw.mtzc.AllWithdrawal')
						}}</text>
				</view>
				<view class="notice">
					{{ $t('pages.common.userCenter.withdraw.mtzc.AvailableWithdrawalAmount') }}<text>{{ init.drawAmount
						}}</text>
				</view>
			</view>
			<view class="detail">
				<view class="title-t" style="margin: 0;padding-left: 0;">
					{{ $t('pages.common.userCenter.withdraw.mtzc.ReceiverInformation') }}
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.userCenter.withdraw.mtzc.Receiver') }}</view>
					<view class="desc">{{ init.realName || '****' }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.userCenter.withdraw.mtzc.AccountBalance') }}</view>
					<view class="desc">{{ init.balance }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.userCenter.withdraw.mtzc.CurrentNonWithdrawableAmount') }}
					</view>
					<view class="desc">{{ init.noDrawAmount }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.withdraw.mtzc.ExtractRequiresValidBets') }}</view>
					<view class="desc">{{ init.bettingAmount }}</view>
				</view>
				<view class="item">
					<view class="title">{{ $t('pages.common.userCenter.withdraw.mtzc.WithdrawalLimitRemaining') }}
					</view>
					<view class="desc">{{ init.drawCount }}</view>
				</view>
			</view>
			<view class="next">
				<view class="next-btn"
					:class="{ disable: !money || Number(money) < Number(init.minAmount) || Number(init.minAmount) == 0 }"
					@click="actBtn">
					{{ $t('pages.common.userCenter.withdraw.mtzc.NextStep') }}</view>
			</view>

			<view class="hint">
				<view class="hint-box">
					<text class="hint-title">
						<view class="text">{{ $t('pages.common.userCenter.withdraw.mtzc.Tip') }}</view>
					</text>
					<view class="content">
						<view class="label">
							1.{{ $t('pages.common.userCenter.withdraw.mtzc.WithdrawableAmountNote') }}
						</view>
						<view class="label">
							2.{{ $t('pages.common.userCenter.withdraw.mtzc.UpdatedAutomatically') }}
						</view>
						<view class="label">
							3.{{ formartStrs($t('pages.common.userCenter.withdraw.mtzc.DailyWithdrawalLimit'), this.init &&
								this.init.totalDrawCount ? this.init.totalDrawCount : 0)
							}}
							<!--							3.{{ $t('pages.common.userCenter.withdraw.mtzc.DailyWithdrawalLimit') }}-->
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="pwd-box">
				<view class="top-box">
					<view class="title">{{ $t('pages.common.userCenter.withdraw.mtzc.EnterPaymentPassword') }}</view>
					<svg class="close" @click="closePopup" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
						viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M1.0649 13.9916C0.674377 14.3821 0.674376 15.0153 1.0649 15.4058C1.45543 15.7963 2.08859 15.7963 2.47911 15.4058L7.85795 10.027L13.3788 15.5479C13.7694 15.9384 14.4025 15.9384 14.793 15.5479C15.1836 15.1573 15.1836 14.5242 14.793 14.1337L9.27216 8.61276L15.207 2.67789C15.5976 2.28736 15.5976 1.6542 15.207 1.26368C14.8165 0.873151 14.1833 0.873151 13.7928 1.26368L7.85795 7.19855L2.06513 1.40573C1.6746 1.0152 1.04144 1.0152 0.650912 1.40573C0.260388 1.79625 0.260388 2.42942 0.650912 2.81994L6.44373 8.61276L1.0649 13.9916Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<one-input v-model="pwd" :maxlength="6" :isPwd="true" @finish="finishedOne" ref="hi" type="xin">
				</one-input>
				<view class="forget" @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t('pages.common.userCenter.withdraw.mtzc.ForgetPassword') }}
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="err" type="center" :mask-click="false">
			<PopItem @close="close" :msg="msg"></PopItem>
		</uni-popup>

		<uni-drawer ref="ok" mode="right" :width="100">
			<Success :title="title" :msg="$t('pages.common.userCenter.withdraw.mtzc.DirectChargeProcessing')" />
		</uni-drawer>
		<AlertInjectLayer />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import List from "./common/list";
import Success from "./common/success";
import oneInput from '@/components/myp-one/myp-one'
import PopItem from "@/components/common/PopItem/PopItem";

import {
	incomeDirect,
	inits
} from "@/utils/lottery/mine";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
export default {
	name: "mtzc",
	components: {
		Header,
		AlertInjectLayer,
		UniCol,
		UniRow,
		List,
		oneInput,
		Success,
		PopItem
	},

	data() {
		return {
			isFocus: false,
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.common.userCenter.withdraw.mtzc.DirectCharge'),
			headerStyle: {
				backgroundColor: "#1794FF"
			},
			fontColor: "#FFFFFF",
			titleStyle: {
				color: "#FFFFFF"
			},
			placeholderStyle: "'font-weight': '400';'font-size': '45rpx';'color': '#CCCCCC';",
			info: null,
			init: {
				minAmount: '0.00',
				maxAmount: "0.00"
			},
			money: '',
			pwd: '',
			msg: '',
			winHeight: 0
		}
	},
	watch: {
		money(val) {
			if (parseFloat(val) > this.init.drawAmount) {
				setTimeout(() => {
					this.money = parseInt(this.init.drawAmount)
				});
			}
		}
	},
	onLoad() {
		this.getInit()
	},
	onShow() {
		this.winHeight = uni.getSystemInfoSync().windowHeight;
	},
	computed: {
		...mapGetters(["themeColor"]),

		dz() {
			if (this.money != '') {
				const money = this.money * 1
				return parseFloat(money).toFixed(2)
			} else {
				return parseFloat(0).toFixed(2)
			}
		},
		yh() {
			if (!this.money) {
				return 0.00
			}
			const yh = this.money * this.init.discountRatio
			if (yh > this.init.discountLimit * 1) {
				return this.init.discountLimit
			}
			return yh
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	methods: {
		formartStrs(str, ...args) {
			for (let i = 0; i < args.length; i++) {
				let v = args[i];
				let k = `{$${i}}`;
				str = str.replaceAll(k, v);
			}
			return str;
		},
		toUrl(url) {
			uni.navigateTo({
				url: url
			})
		},
		onClick() {
			this.$refs.pay.open()
		},
		closePay() {
			this.$refs.pay.close()
		},
		setBank(item) {
			this.info = item
		},
		allBtn() {
			this.money = this.init.balance
		},
		getInit() {
			inits().then(res => {
				if (res.code == 200) {
					this.init = res.result
				}
			}).catch(err => {
				console.log(err)
			})
		},
		closePopup() {
			this.pwd = ''
			this.$refs.popup.close();
		},
		//提现
		actBtn() {
			if(!this.money || Number(this.money) < Number(this.init.minAmount) || Number(this.init.minAmount) == 0 )return;
			if (!this.money || (parseFloat(this.money) < parseFloat(this.init.minAmount))) {
				pop(this.$t('pages.common.userCenter.withdraw.mtzc.MinimumWithdrawalAmount') + this.init.minAmount,
					2000)
				return false
			}
			/*if(this.money > this.init.maxAmount){
				pop("提现金额不能大于" + this.init.maxAmount,2000)
				return false
			}*/
			this.$refs.popup.open();
		},
		finishedOne() {
			let prams = {
				amount: this.money,
				pinCode: this.pwd
			};
			incomeDirect(prams).then(res => {
				this.pwd = '';
				if (res.code == 200) {
					this.$refs.popup.close()
					this.$refs.ok.open()
				} else if (res.code == 600) {
					this.msg = res.message
					this.$refs.popup.close()
					this.$refs.err.open()
				} else {
					pop(res.message, 2000)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		close() {
			this.$refs.err.close()
		},

	}
}
</script>

<style lang="scss" scoped>
/deep/.uni-popup {
	z-index: 999;
}

.disable {
	background: #c0c0c0 !important;
}

.bank-box {
	font-family: 'PingFang SC';

	.bank-row {
		// margin-top: 20rpx;
		height: 148rpx;
		border-radius: 24rpx;
		background: #fff;
		display: grid;
		place-content: center;
		color: #404040;
		font-size: 34rpx;

		.list-row {
			.list-item {
				height: 148rpx;

				.slot-box {
					margin-right: 20rpx;
					height: 100%;
					display: flex;

					.slot-image {
						height: 90rpx;
						width: 90rpx;
					}
				}

				.slot-text {
					display: flex;
					font-weight: 400;
					font-size: 36rpx;
					color: #404040;

					.card {
						font-weight: 400;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						color: var(--theme-auxiliary-color-remind);
						margin-top: 10rpx;
					}
				}
			}
		}
	}

	.withdraw-box {
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 20rpx 28rpx;
		box-sizing: border-box;
		border-radius: 24rpx;

		.input-box {
			display: flex;
			align-items: center;
			height: 96rpx;
			border-radius: 24rpx;
			border: 1px solid var(--theme-auxiliary-color-default);
			padding: 0 20rpx;

			.uni-input {
				width: 80%;
				height: 80rpx;
				border: 0;
				background: #fff;
				text-align: left;
			}

			.label-text {
				width: 20%;
				font-weight: 400;
				font-size: 30rpx;
				text-align: right;
				color: var(--theme-auxiliary-color-remind);
			}

			.input-placeholder-text {
				font-weight: 400;
				font-size: 32rpx;
				color: #CCCCCC;
			}
		}

		.focus {
			border: 1px solid var(--theme-color);
		}

		.notice {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #404040;

			text {
				color: var(--theme-auxiliary-color-remind);
			}
		}
	}

	.detail {
		padding-top: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;

		.item {
			display: flex;
			justify-content: space-between;
			font-weight: 400;
			font-size: 28rpx;
			color: #404040;
			// padding: 20rpx 28rpx;
			padding: 20rpx 0;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
		}

		.item:last-child {
			border: none;
		}
	}

	.title-t {
		font-weight: 400;
		font-size: 34rpx;
		color: var(--theme-color);
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		&::before {
			content: '';
			width: 6rpx;
			height: 24rpx;
			border-radius: 6rpx;
			background: var(--theme-color);
			display: block;
			margin-right: 20rpx;
		}
	}

	.next {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;

		.next-btn {
			margin: 0 28rpx;
			width: 100%;
			height: 88rpx;
			display: grid;
			place-content: center;
			border-radius: 16rpx;
			background: var(--theme-color);
			color: #FFF;
			font-size: 34rpx;
		}
	}

	.hint {
		display: flex;
		justify-content: center;

		.hint-box {
			width: 705rpx;
			margin-top: 42rpx;

			.hint-title {
				font-weight: 500;
				font-size: 26rpx;
				color: var(--theme-auxiliary-color-remind);
				display: flex;
				align-items: center;
			}

			.content {
				font-size: 26rpx;
				color: var(--theme-auxiliary-color-remind);

				.label {
					display: flex;
					align-items: center;
					color: #c0c0c0;
				}
			}
		}
	}

	.pwd-box {
		height: 262rpx;
		width: 684rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		padding: 20rpx 28rpx;
		box-sizing: border-box;

		.top-box {
			margin-bottom: 20rpx;

			.title {
				font-size: 30rpx;
				text-align: center;
				color: #404040;
				text-align: center;
			}

			.close {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				width: 34rpx;
				height: 34rpx;
			}
		}

		/deep/ .code-box {
			.item {
				border-radius: 24rpx;
			}
		}

		.forget {
			margin-top: 20rpx;
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: var(--theme-color);
		}
	}
}
</style>
