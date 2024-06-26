<template>
	<uni-popup ref="confirm" :mask-background-color="'rgba(0, 0, 0, 0.3)'" background-color="#fff" type="bottom"
		:class="['theme-' + themeColor.name]">
		<view class="confirm-box">
			<view class="confirm-div">
				<view class="header">
					<view class="title">
						{{title}}
					</view>
					<view class="period">{{ showRoundInfo.nextNo }}期</view>
				</view>
				<view class="list-box">
					<scroll-view scroll-y class="list-row">
						<view class="list-item" v-for="(item, index) in orderList">
							<view class="played">
								{{ item.methodName }}
							</view>
							<view class="number">
								@[{{ item.name }}]
							</view>
							<view class="note-box">
								<text class="note">{{ item.stakeCount }}注</text>
								<text class="money">{{ setAmount(item.totalPrice) }}元</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="count-box">
					<text>共</text>
					<text class="note-total">{{ orderTotal.count }}</text>
					<text>注</text>
					<text class="moeney-total">{{ setAmount(orderTotal.price) }}</text>
					<text>元</text>
				</view>
				<view class="submit-btns">
					<view class="submit" v-if="showRoundInfo.stampType === 3 || showRoundInfo.stampType === 1"
						:style="setStyle()">
						封单中
					</view>
					<view class="submit" v-else @click="toBuyOrder" :style="setStyle()">
						{{ isBetting ? "注单中" : "确定" }}
					</view>
					<view class="cancel-confirm" @click="cancelBtn">
						取消
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import Playing from "../../../utils/common/playing";
	import {
		mapGetters
	} from 'pinia';

	export default {
		props: {
			title: {},
			showRoundInfo: {},
			orderList: {},
			orderTotal: {},
			isBetting: {},
		},
		computed: {
			...mapGetters(["themeColor"])
		},
		data() {
			return {
				playing: new Playing()
			}
		},
		methods: {
			setStyle() {
				if (this.showRoundInfo.stampType === 3 || this.showRoundInfo.stampType === 1) {
					return {
						backgroundColor: this.themeColor.themeAuxiliaryColorDefault
					}
				} else {
					return {
						backgroundColor: this.themeColor.themeColor
					}
				}
			},
			cancelBtn() {
				this.$emit('cancelBtn')
			},
			toBuyOrder() {
				if (this.isBetting) {
					return
				}
				this.$emit('toBuyOrder')
			},
			close() {
				this.$nativeBridge.setStatusBarColor('#fff')
				this.$refs.confirm.close()
			},
			open() {
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
				this.$refs.confirm.open("bottom");
			},
			setAmount(num) {
				return this.playing.setAmount(num, 2, '.', ',')
			},
		}
	}
</script>
<style scoped lang="scss">
	/deep/ .content-box {
		border-radius: 40rpx 40rpx 0px 0px !important;
	}

	/deep/ .uni-popup__wrapper {
		border-radius: 40rpx 40rpx 0px 0px !important;
	}

	.uni-popup {
		max-width: 480px;

		/deep/ .content-box {
			max-width: 480px;
			margin: auto;
		}
	}


	.confirm-box {
		width: 100%;
		display: flex;
		flex-direction: column;

		.confirm-div {
			width: 100%;
			height: 1014rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding-bottom: var(--safe-area-inset-bottom);

			.header {
				width: 100%;
				height: 88rpx;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				border-radius: 40rpx 40rpx 0px 0px;
				background: var(--theme-auxiliary-color-default);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.cancel {
					flex: 1;
				}

				.title {
					flex: 1;
					color: #404040;
					text-align: left;

					font-size: 34rpx;
					font-weight: 500;
				}

				.period {
					color: var(--theme-auxiliary-color-remind);

					font-size: 30rpx;
					font-weight: 400;
				}

				.submit {
					flex: 1;
					text-align: center;

					font-size: 30rpx;
					font-weight: 400;
					text-align: right;
				}
			}

			.list-box {
				flex: 1;
				height: 0;
				box-sizing: border-box;

				.list-row {
					height: 100%;

					.list-item {
						display: flex;
						padding: 28rpx;
						box-sizing: border-box;
						justify-content: space-between;
						align-items: center;
						border-top: 1rpx dashed var(--theme-auxiliary-color-default);
						box-sizing: border-box;
						width: 100%;
						&:last-child {
							padding-bottom: 80rpx;
						}
							.played {
								color: #404040;
								font-size: 30rpx;
								font-weight: 400;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								// max-width: 100rpx;
								flex: 1;
								min-width: 0;
							}

							.number {
								color: var(--theme-color);
								font-size: 30rpx;
								font-weight: 400;
								width: 380rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								flex: 2;
								min-width: 0;
							}

						.note-box {
							font-weight: 400;
							font-size: 28rpx;
							line-height: 39rpx;
							color: #404040;
							flex: 0 0 auto;
							.note {
								margin-right: 20rpx;
								color: #404040;

								font-size: 28rpx;
								font-weight: 400;
							}

							.money {
								color: #404040;

								font-size: 28rpx;
								font-weight: 400;
							}
						}
					}
				}

			}

			.count-box {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 28rpx;
				background: #FFFFFF;
				width: 100%;
				height: 80rpx;
				color: #404040;
				box-sizing: border-box;

				font-size: 30rpx;
				font-weight: 400;

				.note-total,
				.moeney-total {
					margin: 0 8rpx 0 8rpx;
					color: var(--theme-auxiliary-color-remind);
				}
			}

			.submit-btns {
				padding: 0 28rpx;

				.submit {
					width: 100%;
					border-radius: 16rpx;
					background: var(--theme-color);
					color: #FFF;

					font-size: 34rpx;
					font-weight: 400;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 88rpx;
					box-sizing: border-box;
					margin-bottom: 20rpx;
				}

				.cancel-confirm {
					border-radius: 16rpx;
					border: 2rpx solid var(--theme-auxiliary-color-default);
					color: #404040;

					font-size: 34rpx;
					font-weight: 400;
					gap: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 88rpx;
					box-sizing: border-box;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
