<template>
	<view class="ptp-promotion" :class="['theme-' + themeColor.name]">
		<view class="item">
			<view class="line title no-bot">
				<view class="name">
					{{$t("pages.common.promoteEarn.components.Promotion.text1")}}
				</view>
			</view>
			<view class="link">
				<view class="name">
					{{$t("pages.common.promoteEarn.components.Promotion.text2")}}
				</view>
				<view class="input">
					<view class="text">{{ getAddress + linkText + parameters }}</view>


					<svg :data-clipboard-text="getAddress + linkText + parameters"
						@click="copyText(getAddress + linkText + parameters)" width="20" height="20" viewBox="0 0 20 20"
						fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M4.5 4H3.5C2.39543 4 1.5 4.89543 1.5 6V18C1.5 19.1046 2.39543 20 3.5 20H12.5C13.6046 20 14.5 19.1046 14.5 18V17H12.5C12.5 17.5523 12.0523 18 11.5 18H4.5C3.94772 18 3.5 17.5523 3.5 17V7C3.5 6.44772 3.94772 6 4.5 6V4Z"
							:fill="themeColor.themeColor" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12.3076 0H7.5C6.39543 0 5.5 0.895431 5.5 2V14C5.5 15.1046 6.39543 16 7.5 16H16.5C17.6046 16 18.5 15.1046 18.5 14V6.19238L12.3076 0ZM12.5 2L16.5 6H12.5V2ZM7.6 8C7.26863 8 7 8.26863 7 8.6C7 8.93137 7.26863 9.2 7.6 9.2H14.4C14.7314 9.2 15 8.93137 15 8.6C15 8.26863 14.7314 8 14.4 8H7.6ZM7.6 10.7C7.26863 10.7 7 10.9686 7 11.3C7 11.6313 7.26863 11.9 7.6 11.9H14.4C14.7314 11.9 15 11.6313 15 11.3C15 10.9686 14.7314 10.7 14.4 10.7H7.6ZM7 13.9999C7 13.6685 7.26863 13.3999 7.6 13.3999H11.4C11.7314 13.3999 12 13.6685 12 13.9999C12 14.3313 11.7314 14.5999 11.4 14.5999H7.6C7.26863 14.5999 7 14.3313 7 13.9999Z"
							:fill="themeColor.themeColor" />
					</svg>
				</view>
			</view>
			<view class="qr-code">
				<view class="code-box">
					<!-- <view id="qrcode">
						<image :src="qrcodeAddress" style="height:150rpx;width:150rpx;" />
					</view> -->

					<uqrcode size="150" sizeUnit="rpx" class="code" ref="uqrcode" canvas-id="qrcode"
						:value="getAddress + linkText + parameters" v-if="promotionData.channel.address">
					</uqrcode>
				</view>
				<view class="save" @click="saveQrCode">
					{{$t("pages.common.promoteEarn.components.Promotion.text3")}}
				</view>
				<div class="img-box">
					<image @click="openApp(item)" v-for="(item, index) in agentPromotionConfigs" class="img"
						:key="index" mode="widthFix" :src="item.icon" />
				</div>
			</view>
		</view>
		<view class="item">
			<view class="line title">
				<view class="name blue">
					{{$t("pages.common.promoteEarn.components.Promotion.text4")}}
				</view>
				<view class="more" @click="$emit('updateNavActive', 'Commission')">
					<view class="text">{{$t("pages.common.promoteEarn.components.Promotion.text5")}}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
						<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</view>
			</view>
			<view class="line">
				<view class="name" sub-name>
					{{$t("pages.common.promoteEarn.components.Promotion.text6")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.totalCommission > 0 }">
					{{ promotionData.totalCommission }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text7")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.receivedCommission > 0 }">
					{{ promotionData.receivedCommission }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text8")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.lastCommission > 0 }">
					{{ promotionData.lastCommission }}
				</view>
			</view>
		</view>
		<view class="item">
			<view class="line title">
				<view class="name">{{$t("pages.common.promoteEarn.components.Promotion.text9")}}</view>
				<view class="more" @click="$emit('updateNavActive', 'Performance')">
					<view class="text">{{$t("pages.common.promoteEarn.components.Promotion.text10")}}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
						<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text11")}}
				</view>
				<view class="num">
					{{ promotionData.teamTotalNum }}{{$t("pages.common.promoteEarn.components.Promotion.text12")}}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text13")}}
				</view>
				<view class="num">
					{{ promotionData.teamDirectNum }}{{$t("pages.common.promoteEarn.components.Promotion.text12")}}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text14")}}
				</view>
				<view class="num">
					{{ promotionData.teamOtherNum }}{{$t("pages.common.promoteEarn.components.Promotion.text12")}}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text15")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.bettingTotalAmount > 0 }">
					{{ promotionData.bettingTotalAmount }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text16")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.bettingDirectAmount > 0 }">
					{{ promotionData.bettingDirectAmount }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text17")}}
				</view>
				<view class="num green" :class="{ 'red': promotionData.bettingOtherAmount > 0 }">
					{{ promotionData.bettingOtherAmount }}
				</view>
			</view>
		</view>
		<view class="item">
			<view class="line title">
				<view class="name">
					{{$t("pages.common.promoteEarn.components.Promotion.text18")}}
				</view>
				<view class="more" @click="$emit('updateNavActive', 'TeamData')">
					<view class="text">{{$t("pages.common.promoteEarn.components.Promotion.text5")}}</view>
					<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
						<path d="M1.5 1.5L7 7L1.5 12.5" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text19")}}
				</view>
				<view class="num">
					{{ promotionData.totalRecharge }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text23")}}
				</view>
				<view class="num">
					{{ promotionData.totalWithdrawals || '0.00' }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text22")}}
				</view>
				<view class="num">
					{{ promotionData.totalGift || '0.00' }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name">
					{{$t("pages.common.promoteEarn.components.Promotion.text20")}}
				</view>
				<view class="num">
					{{ promotionData.bettingTotalValid }}
				</view>
			</view>
			<view class="line">
				<view class="name sub-name"> {{$t("pages.common.promoteEarn.components.Promotion.text21")}}</view>
				<view class="num green" :class="{ 'red': promotionData.winTotalAmount > 0 }">
					{{ promotionData.winTotalAmount }}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		myPromotion
	} from "@/utils/ptp";
	import defaultTemplate from '@/utils/defaultTemplate';
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		data() {
			return {
				agentPromotionConfigs: [],
				promotionData: {
					inviteCode: '',
					channel: {
						address: ''
					}
				},
				copyStatus: false,
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			qrcodeAddress() {
				let qrcodeKey = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.QR_CODE;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[qrcodeKey] : null;
				return info ? info.url : "";
			},
			linkText() {
				return this.promotionData.inviteCode
			},
			getAddress() {
				return this.promotionData.channel.address
			},
			agentDefaultRedirectAddress() {
				let agentDefaultRedirectAddress = this.$config.enumMgr.CONTANTS_CONFIGS_ID.AGENT_DEFAULT_REDIRECT_ADDRESS;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state.appInfoStore
					.contantsConfigTypeMap[agentDefaultRedirectAddress] : null;
				if (!info) return null;
				return info.url;
			},

			parameters() {
				let shareUrl = btoa(this.agentDefaultRedirectAddress + "/pages/common/login")
				return `?domain=${shareUrl}`
			}

		},
		mounted() {
			this.shareToFriends()
		},
		methods: {
			openApp(item) {
				let jumpUrl;
				if (uni.getSystemInfoSync().platform === 'ios') {
					jumpUrl = item.wakeIosStr
				} else {
					jumpUrl = item.wakeAndroidStr
				}


				//#ifdef H5
				/**
				 * 使用此封装打开第三方链接 避免IOS 及安卓webview打开外展后无法返回
				 */
				this.$nativeBridge.openUrl(jumpUrl);
				// 旧版本 20231117
				// window.location.href = jumpUrl
				// #endif

				//#ifdef APP-PLUS
				plus.runtime.openURL(jumpUrl)
				//#endif
			},
			copyText(copyText = "") {
				let text = copyText
				if (this.copyStatus) {
					uni.showToast({
						title: "已复制"
					})
					return;
				}
				this.copy(text);
				// uni.setClipboardData({
				// 	data: text,
				// 	success: (res) => {
				// 		uni.showToast({
				// 			title: this.$t('pages.common.userCenter.index.copySuccess')
				// 		})
				// 	}
				// })
			},
			copy(text, callback) {
				var copyInput = document.getElementById('copyInput');
				if (copyInput) {
					copyInput.parentNode.removeChild(copyInput)
					this.copy(text, callback);
					return;
				}
				if (!copyInput) {
					var copyInput = document.createElement('input');
					copyInput.setAttribute('id', 'copyInput');
					copyInput.style.position = 'fixed';
					copyInput.style.left = '-100%';
					copyInput.style.top = '0';
					copyInput.style.zIndex = -100;
					copyInput.style.opacity = 0;
					document.body.appendChild(copyInput);
				}
				copyInput.value = text;
				copyInput.setAttribute('readonly', 'readonly')
				copyInput.focus();
				copyInput.select();
				this.copyStatus = true
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					uni.showToast({
						title: this.$t('components.common.pages-liuhe.LiuheWallet.copySuccess')
					})
					setTimeout(() => {
						this.copyStatus = false
					}, 1500)
				}

				copyInput.blur();
				// setTimeout(() => {
				// 	copyInput.removeAttribute('readonly')
				// }, 1000);
				callback && callback(true);
			},
			// copyText(text) {
			// 	console.log(text)
			// 	console.log(this.getAddress)
			// 	uni.setClipboardData({
			// 		data: text
			// 	});
			// },
			saveQrCode() {
				let isApp = browserPlatform() == browserPlatform.FLUTTER_App;
				if (!isApp) {
					this.$refs.uqrcode.save();
				} else {
					this.$nativeBridge.doGetNativeMessage("screenToGallery");
				}
			},
			shareToFriends() {
				myPromotion().then(res => {
					if (res.code === 200) {
						//只显示配置了图片的项目
						res.result.agentPromotionConfigs && (this.agentPromotionConfigs = res.result
							.agentPromotionConfigs.filter(item => item.icon));
						this.promotionData = defaultTemplate({
							inviteCode: '',
							totalCommission: 0,
							receivedCommission: 0,
							lastCommission: 0,
							teamTotalNum: '',
							teamDirectNum: '',
							teamOtherNum: '',
							bettingTotalAmount: 0,
							bettingDirectAmount: 0,
							bettingOtherAmount: 0,
							totalRecharge: 0,
							bettingTotalValid: 0,
							winTotalAmount: 0,
							totalGift:0,
							totalWithdrawals:0,
							channel: {
								address: (val) => {
									//客户端暂时不填本站点页面地址
									// if (val) {
									//     return val.replace(/([\w\W]+)\/$/, "$1")
									// }
									//#ifdef H5
									// if (!val) {
									val = window.location.host
									// }
									//测试地址 使用测试地址
									if (val.indexOf("localhost") != -1) {
										val = this.$config.apiUserShareDebugStation;
									}
									if (val && val[val.length - 1] == '/') {
										val = val.substring(0, val.length - 1);
									}
									//#endif
									return (val || '') + this.$config.apiUserShareRouter;
								}
							}
						}, res.result)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	.code-box {
		overflow: hidden;
	}

	.ptp-promotion {
		display: flex;
		flex-direction: column;

		/*gap: 20rpx;*/
		.item:not(:first-child) {
			margin-top: 20rpx;
		}

		.item {
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 0 20rpx;

			.line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				height: 88rpx;
				box-sizing: border-box;
				border-bottom: 1px dashed var(--theme-auxiliary-color-default);

				.name {
					font-size: 30rpx;
					display: flex;
					align-items: center;
				}

				.sub-name {
					font-size: 28rpx;
					color: #404040;
				}

				.blue {
					color: #1794FF;
				}

				.green {
					color: var(--theme-color)
				}

				.red {
					color: #EC3232;
				}

				.more {
					font-size: 28rpx;
					color: #404040;
					display: flex;
					align-items: center;

					.text {
						margin-right: 20rpx;
					}
				}
			}

			.title {
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.name {
					color: var(--theme-color);

					&::before {
						content: '';
						width: 6rpx;
						height: 24rpx;
						background: var(--theme-color);
						border-radius: 6rpx;
						margin-right: 14rpx;
					}
				}
			}

			.no-bot {
				border-bottom: none;
			}

			.link {

				.name {
					font-size: 28rpx;
					color: #404040;
					margin-top: 4rpx;
				}

				.input {
					display: flex;
					align-items: center;
					margin-top: 10rpx;

					.text {
						flex: 1;
						font-size: 24rpx;
						height: 30rpx;
						line-height: 30rpx;
						color: #404040;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}

			.qr-code {
				padding: 20rpx 0;
				border-radius: 12rpx;
				background: var(--theme-auxiliary-color-default);
				margin: 20rpx 0;
				display: flex;
				flex-direction: column;
				align-items: center;

				.code {
					width: 200rpx;
					height: 200rpx;
				}

				.save {
					width: 200rpx;
					height: 58rpx;
					background: var(--theme-color);
					border-radius: 12rpx;
					margin: 20rpx 0;
					font-size: 28rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					// display: grid;
					// place-content: center;
				}

				.img-box {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 20rpx;

					.img {
						width: 48rpx;
						height: 48rpx;
						border-radius: 12rpx;

						&+.img {
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
