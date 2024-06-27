<template>
	<view class="bank-div" name="money" :class="['theme-' + themeColor.name]">
		<view class="money" :style="{ marginTop: safeHeight }">

			<scroll-view scroll-y
				style="height: calc(var(--vh) - 110rpx); margin-top: 20rpx; border-radius: 24rpx 24rpx 0 0;">
				<view class="input-amount">
					<view class="title">
						<view class="line"></view>
						{{$t("pages.common.userCenter.pay.common.money.text1")}}

					</view>
					<view class="list-div" v-if="info.fixedAmount != null && info.fixedAmount.length > 0">
						<view class="list-row">
							<view class="list-item" v-for="(item, index) in moneyList"
								:class="{ actives: money == item }" @click="selectMoney(item)">
								{{ item + $t("pages.common.userCenter.pay.common.money.text2") }}
								<view class="check">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11"
										fill="none">
										<path
											d="M5.49963 10.6955L0.804688 5.80485L2.00846 4.81645L4.72332 6.99662C5.83638 5.64305 8.30629 2.95441 11.7143 0.816895L12.0008 1.49481C8.87268 4.43596 6.31202 8.57876 5.49963 10.6955Z"
											fill="white" />
									</svg>
								</view>
								<view class="triangle">
									<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31"
										fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M0 31H23C27.4183 31 31 27.4183 31 23V0L0 31Z"
											:fill="themeColor.themeColor" />
									</svg>
								</view>
							</view>
						</view>
					</view>

					<view class="input-item" v-else>
						<view class="input-row">
							<input class="uni-input" :placeholder-style="placeholderStyle" type="number" @input="moeny"
								v-model="money"
								:placeholder="$t('pages.common.userCenter.pay.common.money.text3')+'（' + info.singleMinLimit + '-' + info.singleMaxLimit + '）'" />
						</view>
					</view>
				</view>


				<view class="next-box">
					<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="nextBtn()">下一步</view>
				</view>
				<view class="hint">
					<view class="hint-box">
						<text class="hint-title"> {{$t("pages.common.userCenter.pay.common.money.text4")}}：</text>
						<view class="content">
							{{ info.remark }}
						</view>
					</view>
				</view>
			</scroll-view>
			<uni-popup ref="confirm" type="center" background-color="#fff">
				<view class="confirm-box">
					<view class="title">{{$t("pages.common.userCenter.pay.common.money.text4")}}</view>
					<view class="notice">
						{{$t("pages.common.userCenter.pay.common.money.text5")}}
					</view>
					<view class="btn-box">
						<view class="cancel-btn" @click="cancel">{{$t("common.cancel")}}</view>
						<view class="confirm-btn" @click="confirm">{{$t("common.ok")}}</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="payConfirm" type="center" background-color="#fff">

				<view class="payConfirm-box">
					<view class="close-img" @click="closePay">

						<filterIcon src="@/static/img/common/close.png" :width="80" :height="80" />
					</view>
					<image class="rocket-img" src="@/static/img/common/rocket.png" mode=""></image>
					<view class="payConfirm-box-title">
						存款订单等待支付中...
					</view>
					<view class="payConfirm-box-description">
						请在10分钟内完成支付后<br /> 点击完成存款
					</view>
					<view class="payConfirm-box-btn" @click="goUser">
						已完成存款
					</view>
					<view class="payConfirm-box-question" @click="haveQuestion">
						遇到问题未完成存款？
					</view>
				</view>
			</uni-popup>
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
	import {
		incomeOnline,
		getPayList
	} from "@/utils/lottery/mine";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "money",
		components: {
			NavBar,
			uniDrawer
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
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.common.userCenter.pay.common.money.text6"),
				headerStyle: {
					backgroundColor: "#FFFFFF",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				titleStyle: {
					color: "#404040"
				},
				placeholderStyle: "font-weight: 400;font-size: 28rpx;line-height: 45rpx; color: #A1A1A1;",
				money: "",
				moneyList: [],
				isAction: false,
				payList: [],
				openUrl: ''
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			fontColor() {
				return this.themeColor.themeColor
			}
		},
		watch: {
			info: {
				handler(val) {
					if (val.fixedAmount != null && val.fixedAmount.length > 0) {
						this.moneyList = val.fixedAmount.split(",");
					}
				},
				immediate: true
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			// this.$refs.payConfirm.open();


		},
		methods: {
			haveQuestion() {
				uni.navigateTo({
					url: '/pages/common/userCenter/service/index'
				})
			},
			goUser() {

				uni.reLaunch({
					url: "/pages/common/userCenter/index"
				})
			},
			closePay() {
				this.$refs.payConfirm.close();
			},
			newPayMoney(item) {
				this.selectMoney(item);
				this.nextBtn();
			},
			async queryPayList() {
				const obj = {
					merchantId: this.info.id,
					pageNo: 1,
					pageSize: 999
				}
				const res = await getPayList(obj);
				this.payList = res.result;
			},
			back() {
				this.$emit('closePay');
			},
			onClick() {
				this.$refs.test.open()
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
				if (this.money >= this.info.singleMinLimit && this.money <= this.info.singleMaxLimit && this.money > 0) {
					this.isAction = true
				} else {
					this.isAction = false
				}
			}, 500),
			async nextBtn() {
				if (this.isAction == false) {
					return false
				}
				let prams = {
					amount: this.money,
					id: this.info.id,
					isMark: this.info.type == 4
				};
				uni.showLoading({title: '加载中'})
				const res = await incomeOnline(prams)
				uni.hideLoading()
				if (res.code == 200) {
					this.$refs.confirm.open()
					this.openUrl = res.result
				} else {
					pop(res.message, 2000)
				}
			},
			cancel() {
				this.$refs.confirm.close()
			},
			confirm() {
				this.$refs.confirm.close()

				if (browserPlatform() == browserPlatform.IOS) {
					window.open(this.openUrl)
				} else {
					this.$nativeBridge.openUrl(this.openUrl);
				}
				//#ifdef APP-PLUS
				plus.runtime.openURL(this.openUrl)
				//#endif

				uni.$emit('showPop', {
					refName: 'CompleteDeposit',
					confirm: () => {
						uni.switchTab({
							url: this.$config.station === 'ALL' ? '/pages/liuhe/home/index' : '/'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-div {
		width: 100vw;
		height: fit-content !important;
	}

	.payConfirm-box {
		border-radius: 24rpx;
		overflow: hidden;
		background-color: #fff;
		width: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40rpx 0;
		position: relative;

		.close-img {
			position: absolute;
			top: 0rpx;
			right: 0;
		}

		.rocket-img {
			width: 520rpx;
			height: 520rpx;
		}

		.payConfirm-box-title {
			color: #3E4347;
			text-align: center;

			font-size: 40rpx;
			font-weight: 500;
		}

		.payConfirm-box-description {
			color: #c0c0c0;
			text-align: center;

			font-size: 30rpx;
			font-weight: 400;
			margin-top: 10rpx;
		}

		.payConfirm-box-btn {
			display: flex;
			width: 520rpx;
			height: 88rpx;
			justify-content: center;
			align-items: center;
			color: #FFF;
			text-align: center;

			font-size: 34rpx;
			font-weight: 400;
			background-color: var(--theme-color);
			border-radius: 16rpx;
			margin-top: 20rpx;
		}

		.payConfirm-box-question {
			color: var(--theme-color);
			text-align: center;

			font-size: 30rpx;
			font-weight: 400;
			margin-top: 20rpx;
		}
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

		.line {
			height: 10rpx;
			border-radius: 0px;
			background: #F6F6F6;
		}

		.input-item {
			width: 100%;
			padding: 0 28rpx 0 28rpx;

			.input-row {
				.uni-input {
					width: 93%;
					height: 96rpx;
					padding: 10rpx;
					background: #FFFFFF;
					text-align: left;
					border-radius: 16rpx;
					border: 1px solid var(--theme-auxiliary-color-default);
					box-sizing: border-box;
				}
			}
		}

		.input-amount {
			background: #FFFFFF;
			border-radius: 24rpx;
			padding-bottom: 20rpx;

			.title {
				padding: 20rpx 28rpx;

				font-style: normal;
				font-weight: 600;
				font-size: 34rpx;
				color: var(--theme-color);

				display: flex;
				align-items: center;

				.line {
					width: 6rpx;
					height: 24rpx;
					background-color: var(--theme-color);
					border-radius: 20rpx;
					margin-right: 20rpx;
				}
			}

			.list-div {
				.top-box {
					height: 130rpx;
					border-radius: 0px;
				}

				.list-row {
					// border-top: 2rpx solid #DDDDDD;
					display: flex;
					flex-wrap: wrap;
					padding: 20rpx;

					.list-item {
						height: 100rpx;
						width: 30%;
						border-radius: 20rpx;
						background: #FFFFFF;
						border: 1px solid #E6E6E6;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						&:nth-child(3n - 1) {
							margin: 0 24rpx;
						}

						&:nth-child(n + 4) {
							margin-top: 24rpx;
						}

						.triangle {
							display: none;
						}

						.check {
							display: none;
						}
					}

					.actives {
						background: #FFFFFF;
						border: 1px solid var(--theme-color);
						position: relative;

						.triangle {
							display: block;
							position: absolute;
							right: 0;
							bottom: 0;
							width: 31px;
							height: 31px;
						}

						.check {
							display: block;
							position: absolute;
							right: 3px;
							bottom: 10px;
							width: 12px;
							height: 11px;
							z-index: 2;
						}
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
				height: 90rpx;
				background: #C8C9CC;
				border-radius: 16rpx;
				font-weight: 500;
				font-size: 32rpx;
				line-height: 45rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.active {
				width: 705rpx;
				background: var(--theme-color);
				border-radius: rpx;
				font-weight: 500;
				font-size: 32rpx;
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
			height: 340rpx;
			width: 600rpx;
			border-radius: 24rpx;
			background: #fff;
			box-sizing: border-box;

			.title {
				height: 80rpx;
				font-weight: 400;
				font-size: 34rpx;
				line-height: 80rpx;
				text-align: center;

				color: #404040;
			}

			.notice {
				height: 160rpx;
				font-weight: 400;

				font-size: 30rpx;
				line-height: 140rpx;
				text-align: center;
				color: #404040;
			}

			.btn-box {
				display: flex;
				color: #FFFFFF;
				font-weight: 400;
				font-size: 26rpx;
				border-top: 1px solid var(--theme-auxiliary-color-default);
				justify-content: space-between;
				width: 100%;

				.cancel-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #404040;
					font-size: 34rpx;
					width: 100%;
					height: 88rpx;
					border-right: 1px solid var(--theme-auxiliary-color-default);
				}

				.confirm-btn {
					display: flex;
					width: 100%;
					height: 88rpx;
					font-size: 34rpx;
					align-items: center;
					justify-content: center;
					color: var(--theme-color);
				}
			}
		}
	}

	::v-deep .input-view {
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.new-money-list-item {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 40rpx 28rpx;
		border-radius: 24rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.pay-title {
			color: #3E4347;

			font-size: 30rpx;
			font-weight: 400;
		}

		.pay-money {
			flex: 1;
			color: #3E4347;

			font-size: 34rpx;
			font-weight: 600;

			text {

				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.pay-btn {
			background-color: var(--theme-color);
			display: flex;
			width: 136rpx;
			height: 60rpx;
			justify-content: center;
			align-items: center;
			color: #FFF;

			font-size: 28rpx;
			font-weight: 400;
			border-radius: 16rpx;
		}
	}
</style>
