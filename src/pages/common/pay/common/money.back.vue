<template>
	<view class="bank-div" :class="['theme-' + themeColor.name]">
		<view class="money" :style="{ marginTop: safeHeight }">
			<NavBar :isBack="false" :title="info.title" :header-style="headerStyle"
				:bg-color="headerStyle.backgroundColor" :font-color="fontColor" :title-style="titleStyle">
				<block slot="left">
					<view class="" @click="back">
						<filterIcon src="/static/imgs-liuhe/activity/back.png" :width="24" :height="42" />
					</view>
					<!-- <image @click="back" :style="{
            width: '24rpx',
            height: '42rpx',
          }" src="/static/imgs-liuhe/activity/back.png"></image> -->
				</block>
			</NavBar>
			<view class="new-money-list" v-if="info.type == 4">
				<view class="new-money-list-item" v-for="(item, index) in moneyList" :key="index">
					<view class="pay-title">
						{{info.title}}
					</view>
					<view class="pay-money">

						<text>总金额&nbsp; </text>
						￥{{item}}
					</view>
					<view class="pay-btn" @click="newPayMoney(item)">
						充值
					</view>
				</view>
			</view>
			<view class="list-div" v-if="info.fixedAmount != null && info.fixedAmount.length > 0 && info.type != 4">
				<view class="list-row">
					<view class="list-item" v-for="(item, index) in moneyList" :class="{ actives: money == item }"
						@click="selectMoney(item)">
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
									d="M0 31H23C27.4183 31 31 27.4183 31 23V0L0 31Z" :fill="themeColor.themeColor" />
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

						<filterIcon src="/static/img/common/close.png" :width="80" :height="80" />
					</view>
					<image class="rocket-img" src="/static/img/common/rocket.png" mode=""></image>
					<view class="payConfirm-box-title">
						存款订单等待支付中...
					</view>
					<view class="payConfirm-box-description">
						请在10分钟内完成支付后<br /> 点击完成存款
					</view>
					<view class="payConfirm-box-btn" @click="goUser">
						已完成存款
					</view>
					<view class="payConfirm-box-question" @click="closePay">
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
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
				title: this.$t("pages.common.userCenter.pay.common.money.text6"),
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
				payList: []
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
			fontColor(){
				return this.themeColor.themeColor
			}
		},
		mounted() {
			if (this.info.fixedAmount != null && this.info.fixedAmount.length > 0) {
				this.moneyList = this.info.fixedAmount.split(",");
			}
			if (this.info.type == 4) {
				this.queryPayList();
			}
		},
		methods: {
			async queryPayList() {
				const obj = {
					merchantId: this.info.id,
					pageNo: 1,
					pageSize: 999
				}
				const res = await getPayList(obj);
				this.payList = res
			},
			goUser() {
				uni.switchTab({
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
				if (this.money >= this.info.singleMinLimit && this.money <= this.info.singleMaxLimit) {
					this.isAction = true
				} else {
					this.isAction = false
				}
			}, 500),
			nextBtn() {
				if (this.isAction == false) {
					return false
				}
				this.$refs.confirm.open()
			},
			cancel() {
				this.$refs.confirm.close()
			},
			confirm() {
				let prams = {
					amount: this.money,
					id: this.info.id
				};
				this.$refs.confirm.close()
				// window.location.href = res.result
				incomeOnline(prams).then(res => {
					if (res.code == 200) {
						this.$nativeBridge.openUrl(res.result)
						this.$refs.payConfirm.open();
						// window.location.href = res.result
						//#ifdef APP-PLUS
						plus.runtime.openURL(res.result)
						//#endif
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.bank-div {
		width: 100vw;
		background: rgba(0, 0, 0, 0.1);
	}

	.money {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		height: var(--vh);
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
			margin-top: 20rpx;
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
					gap: 24rpx;

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
</style>
