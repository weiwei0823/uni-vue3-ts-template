<template>
	<view class="bank-div" name="wallet" :class="['theme-' + themeColor.name]">
		<view class="bank" :style="{ marginTop: safeHeight }">
			<Header :title="title" :isBack="false" :show-back="true" @back="back" />
			<scroll-view class="scroll-view-box" scroll-y="true">
				<view class="qrcode">
					<image :src="detail.qrCode"></image>
				</view>
				<view class="pay-info">
					<view class="title">
						<view class="line"></view>
						{{ $t("pages.common.userCenter.pay.common.wallet.text1") }}
					</view>
					<view class="list-box">
						<view class="list-item">
							<view class="item">
								<view class="name">
									{{ $t("pages.common.userCenter.pay.common.wallet.text2") }}
								</view>
								<view class="num">{{ money }}</view>
							</view>

						</view>
						<view class="list-item">
							<view class="item">
								<view class="name">
									{{ $t("pages.common.userCenter.pay.common.wallet.text3") }}

								</view>
								<view class="num">{{ info.exchangeRatio }}</view>
							</view>

						</view>
						<view class="list-item">
							<view class="item">
								<view class="name">{{ $t("pages.common.userCenter.pay.common.wallet.text4") }}</view>
								<view class="num">{{ setNum(money * info.exchangeRatio) }}</view>
							</view>

						</view>
						<view class="list-item">
							<view class="item">
								<view class="name">{{ $t("pages.common.userCenter.pay.common.wallet.text5") }}</view>
								<view class="num" @click="copyText(detail.address)">
									<!-- <image class="copy" src="@/static/img/pay/copy.png"></image> -->
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
										fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M4.5 4H3.5C2.39543 4 1.5 4.89543 1.5 6V18C1.5 19.1046 2.39543 20 3.5 20H12.5C13.6046 20 14.5 19.1046 14.5 18V17H12.5C12.5 17.5523 12.0523 18 11.5 18H4.5C3.94772 18 3.5 17.5523 3.5 17V7C3.5 6.44772 3.94772 6 4.5 6V4Z"
											:fill="themeColor.themeColor" />
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M12.3076 0H7.5C6.39543 0 5.5 0.895431 5.5 2V14C5.5 15.1046 6.39543 16 7.5 16H16.5C17.6046 16 18.5 15.1046 18.5 14V6.19238L12.3076 0ZM12.5 2L16.5 6H12.5V2ZM7.6 8C7.26863 8 7 8.26863 7 8.6C7 8.93137 7.26863 9.2 7.6 9.2H14.4C14.7314 9.2 15 8.93137 15 8.6C15 8.26863 14.7314 8 14.4 8H7.6ZM7.6 10.7C7.26863 10.7 7 10.9686 7 11.3C7 11.6313 7.26863 11.9 7.6 11.9H14.4C14.7314 11.9 15 11.6313 15 11.3C15 10.9686 14.7314 10.7 14.4 10.7H7.6ZM7 13.9999C7 13.6685 7.26863 13.3999 7.6 13.3999H11.4C11.7314 13.3999 12 13.6685 12 13.9999C12 14.3313 11.7314 14.5999 11.4 14.5999H7.6C7.26863 14.5999 7 14.3313 7 13.9999Z"
											:fill="themeColor.themeColor" />
									</svg>
								</view>
							</view>
							<view class="address">{{ detail.address }}</view>
						</view>
					</view>
					<view class="title">
						<view class="line"></view>

						{{ $t("pages.common.userCenter.pay.common.wallet.text6") }}
					</view>
					<view class="input-row">
						<input class="uni-input" :placeholder-style="placeholderStyle" @input="moeny" v-model="payNo"
							:placeholder="$t('pages.common.userCenter.pay.common.wallet.text7')" />
					</view>
				</view>

				<view class="next-box">
					<view class="next-btn" :class="[isAction ? 'active' : 'next-btn']" @click="confirm()">
						{{ $t("pages.common.userCenter.pay.common.wallet.text8") }}
					</view>
				</view>
				<view class="hint">
					<view class="hint-box">
						<text class="hint-title">
							{{ $t("pages.common.userCenter.pay.common.wallet.text9") }}
						</text>
						<view class="content">
							<view class="label">
								１．<view class="text">
									{{ $t("pages.common.userCenter.pay.common.wallet.text10") }}
								</view>
							</view>
							<view class="label">
								２．<view class="text">
									{{ $t("pages.common.userCenter.pay.common.wallet.text11") }}

								</view>
							</view>
							<view class="label">
								３．<view class="text">
									{{ $t("pages.common.userCenter.pay.common.wallet.text12") }}

								</view>
							</view>
							<view class="label">
								４．<view class="text">
									{{ $t("pages.common.userCenter.pay.common.wallet.text13") }}

								</view>
							</view>
							<view class="label">５．
								<view class="text">
									{{ $t("pages.common.userCenter.pay.common.wallet.text14") }}

								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import Header from '@/components/common/header/index.vue';

	import uniDrawer from "@/uni_modules/uni-drawer/components/uni-drawer/uni-drawer";
	import {
		debounce,
		throttle
	} from "@/utils/function";
	import {
		incomeWallet
	} from "@/utils/lottery/mine";
	import Playing from '@/utils/common/playing.js';
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "Wallet",
		components: {
			NavBar,
			uniDrawer,
			Header
		},
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				},
			},
			money: {
				type: String,
				default: ''
			},
			detail: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},

		data() {
			return {
				playing: new Playing(),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "填写信息",
				headerStyle: {
					backgroundColor: "#FFFFFF"
				},
				titleStyle: {
					color: "#404040"
				},
				placeholderStyle: "font-weight: 400;font-size: 28rpx;line-height: 45rpx; color: #A1A1A1;",
				styles: {
					'width': '100%',
					'height': '100%',
					'border': 'none',
					'background': '#FFFFFF',
					'text-align': 'left',
				},
				isAction: true,
				payNo: '',
				formData: {
					name: '',
					amount: '',
					date: '',
				}
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.detail.izOrderId == 1 ? this.isAction = false : this.isAction = true
		},
		methods: {
			back() {
				this.$emit('closePay');
			},
			setNum(num) {
				return this.playing.setAmount(num, 2, ".")
			},
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: (res) => {
						uni.showToast({
							title: "复制成功"
						})
					}
				})
			},
			nextBtn() {
				uni.$emit('showPop', {
					refName: 'CompleteDeposit',
					confirm: () => {
						if (this.$config.station === 'ALL') {
							uni.switchTab({
								url: '/pages/liuhe/home/index'
							})
						} else {
							uni.switchTab({
								url: '/pages/liuhe/my'
							})
						}

					}
				})
			},
			moeny: throttle(function() {
				if (this.detail.izOrderId == 1) {
					if (this.payNo !== '') {
						this.isAction = true
					} else {
						this.isAction = false
					}
				}
			}, 200),
			confirm() {
				if (!this.payNo) {
					return pop('请输入交易ID')
				}
				if (this.isAction == false) {
					return false
				}
				let prams = {
					id: this.detail.id,
					num: this.money,
					payNo: this.payNo,
				};
				uni.showLoading({mask: true, title: '加载中'})
				incomeWallet(prams).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						pop("提交成功", 2000)
						this.nextBtn()
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
  ::v-deep .qrcode{
    img{
      opacity: 1 !important;
    }
  }
	.bank-div {
		width: 100vw;
		background: rgba(0, 0, 0, 0.1);
	}

	.bank {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		height: var(--vh);
		// background: #ffffff;

		.scroll-view-box {
			height: calc(var(--vh) - 110rpx);
			background-color: var(--theme-auxiliary-color-default);
			overflow: hidden;
			border-radius: 24rpx;
			margin-top: 20rpx;
		}

		.qrcode {
			// margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 20rpx 10rpx 10rpx;
			height: 250rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			image {
				height: 220rpx;
				width: 220rpx;
			}
		}

		.pay-info {
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			padding-bottom: 20rpx;

			.title {
				padding: 20rpx 28rpx;

				font-style: normal;
				font-weight: 400;
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

			.list-box {
				display: flex;
				flex-direction: column;
				// height: 360rpx;
				background: #FFFFFF;

				.list-item {

					margin: 24rpx 30rpx 0 30rpx;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					padding-bottom: 20rpx;

					.item {
						display: flex;
						justify-content: space-between;

						.name {
							font-weight: 400;
							font-size: 28rpx;
							line-height: 36rpx;

							color: #404040;
						}

						.num {
							font-weight: 400;
							font-size: 28rpx;
							line-height: 36rpx;
							color: #404040;


							image {
								height: 48rpx;
								width: 48rpx;
							}
						}
					}

					.address {
						font-weight: 400;
						font-size: 28rpx;
						line-height: 42rpx;
						color: var(--theme-color);

						margin: 24rpx 30rpx 0 0;
					}
				}
			}



			.input-row {
				.uni-input {
					width: 93%;
					height: 96rpx;
					padding: 20rpx;
					background: #FFFFFF;
					text-align: left;
					border-radius: 16rpx;
					border: 1px solid var(--theme-auxiliary-color-default);
					margin: 0 30rpx 0 30rpx;
					box-sizing: border-box;
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
					margin: 6rpx 6rpx 0 0;

					.label {
						display: flex;

						.text {
							width: 90%;
						}
					}
				}
			}
		}
	}
</style>
