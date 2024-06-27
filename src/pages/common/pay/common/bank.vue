<template>
	<view class="bank-div" name="bank">
		<view class="bank" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
			<Header :title="title" :isBack="false" showBack @back="back" isFixed />
			<scroll-view scroll-y class="scrollY" :style="{height: `calc(${uWindowHeight}px - ${isApp?0:110}rpx)`}">
				<view class="amount-account">
					<view class="title">
						<view class="line"></view>
						{{ $t('pages.common.userCenter.pay.common.bank.PlatformReceivingAccount') }}
					</view>
					<view class="list-box">
						<view class="list-row">
							<view class="left">
								<image :src="info.logoMobile"></image>
							</view>
							<view class="center">
								<text>{{ info.title }}</text>
							</view>
							<view class="right" @click="copyText(info.title)">
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
						<view class="list-row">
							<view class="left">
								<text>{{ $t('pages.common.userCenter.pay.common.bank.CardNumber') }}</text>
							</view>
							<view class="center">
								<text>{{ info.account }}</text>
							</view>
							<view class="right" @click="copyText(info.account)">
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

						<view class="list-row">
							<view class="left">
								<text>{{ $t('pages.common.userCenter.pay.common.bank.AccountName') }}</text>
							</view>
							<view class="center">
								<text>{{ info.realName }}</text>
							</view>
							<view class="right" @click="copyText(info.realName)">
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

						<view class="list-row">
							<view class="left">
								<text>{{ $t('pages.common.userCenter.pay.common.bank.Branch') }}</text>
							</view>
							<view class="center">
								<text>{{ info.openBank }}</text>
							</view>
							<view class="right" @click="copyText(info.remark)">
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
					</view>
				</view>
				<view class="fill-info">
					<view class="title">
						<view class="line"></view>
						{{ $t('pages.common.userCenter.pay.common.bank.FillDepositInformation') }}
					</view>
					<view class="from">
						<view class="from-row">
							<view class="from-rol">
								<view class="left">{{ $t('pages.common.userCenter.pay.common.bank.Name') }}</view>
								<view class="right">
									<uni-easyinput class="input-item" v-model="formData.name" :inputBorder="false"
										@input="name" clearableType="closeempty" primaryColor="var(--theme-color)"
										:styles="styles" primaryColorFocus :placeholderStyle="placeholderStyle2"
										:placeholder="$t('pages.common.userCenter.pay.common.bank.DepositorName')"></uni-easyinput>
								</view>
							</view>
							<view class="from-rol">
								<view class="left">{{ $t('pages.common.userCenter.pay.common.bank.Amount') }}</view>
								<view class="right">
									<uni-easyinput class="input-item" v-model="money" type="number" :inputBorder="false"
										@input="moenys" clearableType="closeempty" primaryColor="var(--theme-color)"
										:styles="styles" primaryColorFocus :placeholderStyle="placeholderStyle2"
										:placeholder="$t('pages.common.userCenter.pay.common.bank.RechargeAmount')"></uni-easyinput>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="next-box">
					<view class="next-btn" :class="isAction ? 'active' : 'next-btn'" @click="confirm()">
						{{ $t('pages.common.userCenter.pay.common.bank.Next') }}
					</view>
				</view>
				<view class="hint">
					<view class="hint-box">
						<text class="hint-title">{{ $t('pages.common.userCenter.pay.common.bank.Prompt') }}</text>
						<view class="content">
							{{ $t('pages.common.userCenter.pay.common.bank.DepositPrompt') }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import uniDrawer from "@/uni_modules/uni-drawer/components/uni-drawer/uni-drawer";
	import {
		debounce,
		throttle
	} from "@/utils/function";
	import {
		incomeCompany,
		incomeOnline
	} from "@/utils/lottery/mine";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "bank",
		components: {
			Header,
			uniDrawer
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
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["uWindowHeight"]),
		},
		mounted() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.pay.common.bank.FillInformation'),
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
				styles: {
					'width': '100%',
					'height': '100%',
					'border': 'none',
					'background': '#FFFFFF',
					'text-align': 'left',
				},
				placeholderStyle2: "font-weight: 400;font-size: 30rpx;",
				isAction: false,
				formData: {
					name: '',
					amount: '',
					date: '',
				},
				isApp: false
			}
		},
		methods: {
			back() {
				this.$emit('closePay');
			},
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: (res) => {
						uni.showToast({
							title: this.$t('pages.common.userCenter.pay.common.bank.CopySuccess')
						})
					}
				})
			},
			nextBtn() {
				uni.$emit('showPop', {
					refName: 'CompleteDeposit',
					confirm: () => {
						uni.switchTab({
							url: this.$config.station === 'ALL' ? '/pages/liuhe/home/index' : '/'
						})
					}
				});
			},
			isAC() {
				if (this.money.length > 0 && this.formData.name.length > 0) {
					this.isAction = true
				} else {
					this.isAction = false
				}
			},
			change(e) {
				this.formData.date = e
				this.isAC()
			},
			name: throttle(function() {
				this.isAC()
			}, 200),
			moenys: throttle(function() {
				this.isAC()
			}, 200),
			confirm() {
				if (this.isAction == false) {
					return false
				}
				let prams = {
					account: this.info.account,
					amount: this.money,
					bankName: this.info.title,
					id: this.info.id,
					realName: this.info.realName,
					userRealName: this.formData.name,
				};
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				incomeCompany(prams).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						pop(this.$t('pages.common.userCenter.pay.common.bank.SubmitSuccess'), 2000)
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
	.bank-div {
		width: 100vw;
		background: rgba(0, 0, 0, 0.1);
	}

	.bank {

		width: 100vw;
		max-width: 480px;
		margin: auto;
		background: var(--theme-auxiliary-color-default);

		.scrollY {
			height: calc(var(--vh) - 110rpx);
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}

		.notice-box {
			.notice-row {
				height: 66rpx;
				padding: 5rpx 20rpx 5rpx 20rpx;
				background: rgba(252, 225, 184, 0.5);
				display: flex;
				align-items: center;

				.icon {
					image {
						height: 48rpx;
						width: 48rpx;
					}
				}

				.desc {
					font-weight: 500;
					font-size: 20rpx;
					line-height: 28rpx;
					color: #CC3333;
					margin-left: 10rpx;
				}
			}
		}

		.amount-account {
			background-color: #FFFFFF;

			.title {
				display: flex;
				align-items: center;
				height: 80rpx;
				padding: 20rpx 28rpx;

				font-style: normal;
				font-weight: 600;
				font-size: 34rpx;
				color: var(--theme-color);

				.line {
					width: 6rpx;
					height: 24rpx;
					background-color: var(--theme-color);
					margin-right: 20rpx;
					border-radius: 20rpx;
				}
			}

			.list-box {
				.list-row {
					font-size: 30rpx;
					line-height: 42rpx;
					color: #404040;
					display: flex;
					align-items: center;
					padding: 16rpx 20rpx;
					background: #FFFFFF;
					border-bottom: 1rpx solid var(--theme-auxiliary-color-default);

					&:last-child {
						border-bottom: 0;
					}

					.left {
						width: 100rpx;

						image {
							height: 68rpx;
							width: 68rpx;
						}
					}

					.center {
						flex: 1;
						font-size: 30rpx;
						line-height: 42rpx;
						color: #404040;
					}

					.right {
						width: 10%;

						image {
							height: 48rpx;
							width: 48rpx;
						}
					}
				}
			}
		}

		.fill-info {
			background-color: #FFFFFF;
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;

			.title {
				display: flex;
				align-items: center;
				height: 80rpx;
				padding: 20rpx 28rpx;

				font-style: normal;
				font-weight: 600;
				font-size: 34rpx;
				color: var(--theme-color);

				.line {
					width: 6rpx;
					height: 24rpx;
					background-color: var(--theme-color);
					margin-right: 20rpx;
					border-radius: 20rpx;
				}
			}

			.from {
				.from-row {
					.from-rol {
						display: flex;
						padding: 10rpx 20rpx 10rpx 20rpx;
						background: #FFFFFF;
						border-bottom: 1rpx solid var(--theme-auxiliary-color-default);
						align-items: center;

						&:last-child {
							border-bottom: none;
						}

						.left {
							width: 15%;
							font-weight: 400;
							font-size: 30rpx;
							line-height: 42rpx;
							color: #404040;
						}

						.right {
							width: 85%;
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
				font-size: 34rpx;
				line-height: 45rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.active {
				width: 705rpx;
				height: 90rpx;
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
					line-height: 60rpx;
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
