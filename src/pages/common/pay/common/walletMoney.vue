<template>
	<view class="bank-div" name="walletMoney" :class="['theme-' + themeColor.name]">
		<view class="money" :style="{ marginTop: safeHeight }">
			<!-- <Header :title="title" :isBack="false" :show-back="true" @back="back" /> -->

			<view class="amount-input">
				<view class="amount-title">
					<view class="line"></view>
					<text class="title">
						{{ $t('pages.common.userCenter.pay.common.walletMoney.text1') }}
					</text>
				</view>
				<view class="input-item">
					<view class="input-row">
						<input class="uni-input" :placeholder-style="placeholderStyle" type="number" @input="moeny" v-model="money"
							:adjust-position="false"
							:placeholder="$t('pages.common.userCenter.pay.common.walletMoney.text2') + '（' + info.singleMinLimit + '-' + info.singleMaxLimit + '）'" />
					</view>
				</view>

				<view class="info-box">
					<view class="rate-box">
						<view class="title">
							{{ $t('pages.common.userCenter.pay.common.walletMoney.text3') }}
						</view>
						<view class="num1">{{ info.exchangeRatio }}</view>
					</view>
					<view class="rate-box">
						<view class="title">{{ $t('pages.common.userCenter.pay.common.walletMoney.text4') }}:</view>
						<view class="num2">{{ setNum(getMoney) }}</view>
					</view>
				</view>
			</view>

			<view class="main-network">
				<view class="label-item">
					<view class="line"></view>

					{{ $t('pages.common.userCenter.pay.common.walletMoney.text5') }}
				</view>
				<view class="list-div">
					<view class="list-row">
						<view class="list-item" v-for="(item, index) in info.addressList" :class="{ actives: curr == item.id }"
							@click="selectMoney(item, index)">
							{{ item.type == 1 ? 'TRC20' : item.type == 2 ? 'ERC20' : item.type == 3 ? 'OMNI ' : 'BEP2' }}


							<svg v-show="curr == item.id" style="position: absolute; right: -1px; bottom: 0;" width="31" height="31"
								viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0 31.0001H23C27.4183 31.0001 31 27.4184 31 23.0001V0.00012207L0 31.0001Z"
									:fill="themeColor.themeColor" />
								<path
									d="M20.4996 24.6956L15.8047 19.8049L17.0085 18.8165L19.7233 20.9967C20.8364 19.6431 23.3063 16.9545 26.7143 14.817L27.0008 15.4949C23.8727 18.436 21.312 22.5788 20.4996 24.6956Z"
									fill="white" />
							</svg>

						</view>
					</view>
				</view>
			</view>


			<view class="next-box">
				<view class="next-btn" :class="[isAction ? 'active' : 'next-btn']" @click="nextBtn()">
					{{ $t('pages.common.userCenter.pay.common.walletMoney.text6') }}
				</view>
			</view>
			<view class="hint">
				<view class="hint-box">
					<text class="hint-title">{{ $t('pages.common.userCenter.pay.common.walletMoney.text7') }}：</text>
					<view class="content">
						{{ info.remark }}
					</view>
				</view>
			</view>
			<uni-drawer ref="pay" mode="right" :width="100">
				<Wallet :info="info" :detail="detail" :money="money" @closePay="closePay" />
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
import Wallet from "./Wallet";
import Playing from '@/utils/common/playing.js';
import Header from '@/components/common/header/index.vue';
import {
	mapGetters
} from 'pinia';
export default {
	name: "bankMoney",
	components: {
		NavBar,
		uniDrawer,
		Wallet,
		Header
	},
	props: {
		info: {
			type: Object,
			default: () => {
				return {}
			},
		}
	},
	data() {
		return {
			playing: new Playing(),
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t("pages.common.userCenter.pay.common.walletMoney.text8"),
			headerStyle: {
				backgroundColor: "#FFFFFF"
			},
			titleStyle: {
				color: "#404040"
			},
			placeholderStyle: "font-weight: 400;font-size: 28rpx;line-height: 45rpx; color: #A1A1A1;",
			money: "",
			moneyList: [],
			isAction: false,
			curr: 0,
			detail: null,
		}
	},
	watch: {
		'info.addressList': {
			handler(val) {
				if (val.length) {
					this.selectMoney(val[0])
				}
			},
			immediate: true
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),

		getMoney() {
			if (this.money > 0) {
				return this.money * this.info.exchangeRatio
			} else {
				return 0.00
			}
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
		setNum(num) {
			return this.playing.setAmount(num, 2, ".")
		},
		isAC() {
			let money = Number(this.money)
			if (money >= this.info.singleMinLimit && money <= this.info.singleMaxLimit && this.curr > 0) {
				this.isAction = true
			} else {
				this.isAction = false
			}
		},
		selectMoney(item) {
			this.curr = item.id
			this.detail = item
			this.isAC()

		},
		moeny: throttle(function () {
			this.isAC()
		}, 500),
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
::v-deep .uni-drawer__content {
	max-width: 480px;
}

.bank-div {
	width: 100vw;
	height: fit-content !important;
	background: var(--theme-auxiliary-color-default);
}

.money {

	width: 100vw;
	max-width: 480px;
	margin: auto;
	max-height: var(--vh);
	background: var(--theme-auxiliary-color-default);

	.pay-box {
		.list-row {
			background: #F6F6F6;
			height: 120rpx;

			.list-item {
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
		background-color: #ffffff;
		border-radius: 24rpx;
		padding: 20rpx 28rpx;
		margin-top: 20rpx;

		.amount-title {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.line {
				width: 6rpx;
				height: 24rpx;
				background-color: var(--theme-color);
				border-radius: 10rpx;
			}

			.title {
				color: var(--theme-color);
				font-size: 34rpx;

				font-weight: 500;
				margin-left: 20rpx;
			}
		}

		.input-item {
			width: 100%;
			// height: 130rpx;
			// border-bottom: 2rpx solid #DDDDDD;

			.input-row {
				.uni-input {
					width: 100%;
					height: 96rpx;
					padding: 0rpx 20rpx;
					background: #FFFFFF;
					border: 0;
					text-align: left;
					box-sizing: border-box;
					border-radius: 16rpx;
					border: 2rpx solid var(--theme-auxiliary-color-default);
				}
			}
		}
	}

	.info-box {
		display: flex;
		flex-direction: column;
		// border-bottom: 1px solid rgba(221, 221, 221, 0.5);

		.rate-box {
			display: flex;
			margin-top: 20rpx;
			justify-content: space-between;

			.title {
				font-weight: 400;
				font-size: 28rpx;
				line-height: 36rpx;

				color: #404040;
			}

			.num1 {
				color: #D3D3D3;
				text-align: center;

				font-size: 28rpx;
				font-weight: 400;
			}

			.num2 {
				font-weight: 400;
				font-size: 28rpx;

				line-height: 36rpx;
				color: #404040;
			}
		}
	}

	.main-network {
		border-radius: 24rpx;
		margin-top: 32rpx;
		background-color: #ffffff;

		.label-item {
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;
			font-weight: 500;
			font-size: 34rpx;
			line-height: 45rpx;
			color: var(--theme-color);

			.line {
				width: 6rpx;
				height: 24rpx;
				background-color: var(--theme-color);
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}

		.list-div {
			.line {
				width: 6rpx;
				height: 24rpx;
				background-color: var(--theme-color);
				border-radius: 10rpx;
			}

			.list-row {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				padding: 28rpx;
				padding-top: 0;
				gap: 24rpx;

				.list-item {
					height: 96rpx;
					border-radius: 20rpx;
					background: #FFFFFF;
					border: 1px solid var(--theme-auxiliary-color-default);
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					color: #404040;
					position: relative;
				}

				.actives {
					background: #FFFFFF;
					border: 1px solid var(--theme-color);
				}

				.active-green {
					background: #FFFFFF;
					border: 1px solid var(--theme-color);
					position: relative;
					background: url('@/static/imgs-liuhe/activity/selected.png') no-repeat;
					background-size: 62rpx 62rpx;
					background-position: right bottom;
				}

				.activesBlue {
					background: #FFFFFF;
					border: 1px solid var(--theme-color);
					position: relative;
					background: url('@/static/imgs-liuhe/activity/selected-blue.png') no-repeat;
					background-size: 62rpx 62rpx;
					background-position: right bottom;
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
				margin: 20rpx 6rpx 20rpx 0;
			}
		}
	}

	.confirm-box {
		height: 339rpx;
		width: 540rpx;
		border-radius: 10rpx;
		padding: 20rpx 54rpx 20rpx 54rpx;

		.title {
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
				padding: 10rpx 74rpx;
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
				padding: 10rpx 74rpx;
				background: #FF9900;
				margin-left: 20rpx;
			}
		}
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
