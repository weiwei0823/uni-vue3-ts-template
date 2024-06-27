<template>

	<view :class="['theme-' + themeColor.name,{ 'is-fixed': isFixed}]" class="account-mess pc-max-width">
		<uni-popup ref="popupCode" background-color="#fff" type="dialog" confirmText="复制链接" cancelText="保存本地"
			@change="handleChange">
			<view class="dialog__content">
				<view class="qrcode-top" @click="closeDialog">
					<filterIcon src="@/static/img/common/userCenter/close.png" :width="30" :height="30" />
					<!-- <image @click="closeDialog" mode="widthFix" src="@/static/img/common/userCenter/close.png" /> -->
				</view>
				<view id="qrcode">
					<uqrcode size="200" sizeUnit="rpx" class="code" ref="uqrcode" canvas-id="qrcode"
						:value="getAddress + linkText + parameters" v-if="promotionData.channel.address"
						borderRadius="24">
					</uqrcode>
				</view>
				<view class="my-code">{{ $t('pages.common.userCenter.index.myInviteCode') }}:
					{{ userInfo && userInfo.inviteCode }}
				</view>
				<view class="footer-btn-group">
					<view class="footer-btn-group-btn footer-btn-group-right" @click="openQrcodeImg">
						<text style="font-size: 16px;">{{ $t('pages.common.userCenter.index.saveToLocal') }}</text>
					</view>
					<view class="footer-btn-group-btn footer-btn-group-right"
						@click="copyText(getAddress + linkText + parameters)">
						<text style="font-size: 16px;">{{ $t('pages.common.userCenter.index.copyLink') }}</text>
					</view>
				</view>
			</view>
		</uni-popup>

		<view class="header">
			<view class="header-left" v-if="isLogin">
				<view class="header-left-avatar">
					<!-- <image :src="userInfo.headImgUrl" mode="" /> -->
					<AvatarBox :avatarUrl="userInfo.headImgUrl" :size="96" />
					<!-- <view class="header-left-level">

						VIP{{ userInfo.userLevel?userInfo.userLevel.toString().split(".")[0]:0}}

					</view> -->
				</view>
				<view class="header-left-mess">
					<view class="header-left-mess-name" :class="userInfo.userType==='reality'?'':'topMargin'">
						<view class="name">
							<image src="@/static/img/common/userCenter/level.png" mode=""></image>
							<view class="name-level">
								<!--								{{userInfo.userLevel?userInfo.userLevel.toString().split(".")[0]:0}}级-->
								{{userInfo.userLevelName?userInfo.userLevelName.toString():""}}
							</view>
							<view class="nickname">{{userInfo.nickname}}</view>

							<!-- {{$t("pages.common.userCenter.index.text1")}} -->

						</view>
						<view class="copy-btn">
							<text id="copycontent" :data-clipboard-text="userInfo.nickname"
								@click="copyText(userInfo.nickname)">{{$t("pages.common.userCenter.index.text2")}}</text>
						</view>
					</view>
					<view class="header-left-mess-invate" v-if="userInfo.userType==='reality'">
						{{ $t('pages.common.userCenter.index.inviteCode') }}: {{ userInfo.inviteCode }}
						<view class="copy-btn">
							<text id="copycontent" :data-clipboard-text="userInfo.inviteCode"
								@click="copyText(userInfo.inviteCode)">{{$t("pages.common.userCenter.index.text2")}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="header-left" style="align-items: center;" v-else @click="toLogin">
				<view class="header-left-avatar">
					<image src="@/static/img/common/userCenter/no-login.png" mode="" />

				</view>
				<view class="no-login">

					{{$t("pages.common.userCenter.index.text3")}}
				</view>
			</view>
			<view class="header-right" v-if="isOpreation">
				<image src="@/static/img/common/userCenter/qr_code.png" mode="" @click="openQrcode"></image>
				<image src="@/static/img/common/userCenter/setting.png" mode=""
					@click="toUrl('/pages/common/setting/index')"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myPromotion
	} from "@/utils/ptp";
	import {
		mapGetters
	} from 'pinia';
	import {
		aboutUs
	} from "@/utils/user/index.js";
	import defaultTemplate from '@/utils/defaultTemplate';
	export default {
		props: {
			isFixed: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			isOpreation: {
				type: Boolean,
				default: function() {
					return true
				}
			},
			// qrcodeImg: {
			// 	type: String,
			// 	default: function() {
			// 		return ""
			// 	}
			// },
			// downloadUrl: {
			// 	type: String,
			// 	default: function() {
			// 		return ""
			// 	}
			// },
			isLogin: {
				type: Boolean,
				default: function() {
					return false
				}
			},

			showUserInfo: {
				type: Object,
				default: function() {
					return null;
				}
			}
		},
		computed: {
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
			},
			...mapState(AppInfoStore, ['themeColor']),
			qrcodeImg() {
				let qrcodeKey = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.QR_CODE;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[qrcodeKey] : null;
				return info ? info.url : "";
			},
			downloadUrl() {
				let downUrl = this.$config.enumMgr.CONTANTS_CONFIGS_ID
					.DOWNLOAD_URL;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state
					.appInfoStore
					.contantsConfigTypeMap[downUrl] : null;
				return info ? info.url : "";
			},
			userInfo() {
				if (this.showUserInfo) {
					return this.showUserInfo;
				}
				return this.$store.state.appInfoStore.userInfo;
			}
		},
		data() {
			return {
				// qrcodeImg: "",
				// downloadUrl: "",
				copyStatus: false,
				promotionData: {
					inviteCode: '',
					channel: {
						address: ''
					}
				},
				agentPromotionConfigs: [],
			}
		},
		mounted() {
			this.shareToFriends();
		},
		methods: {
			shareToFriends() {
				if (!isLogin()) {
					return
				}
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
									if (val.indexOf('http') === -1) {
										val = 'https://' + val
									}
									//#endif
									console.log(val, "val");
									return (val || '') + this.$config.apiUserShareRouter;
								}
							}
						}, res.result)
					}
				})
			},
			getCommonData() {
				aboutUs().then(res => {
					res.result.constants.forEach(element => {
						switch (element.type) {
							case "1":
								break;
							case "2":
								break;
							case "3":
								this.qrcodeImg = element.url
								break;
							case "4":
							case "5":
							case "6":
								this.downloadUrl = element.url
								break;
						}
					});
				})
			},
			copyText(copyText = "") {
				let text = copyText || this.userInfo.inviteCode;
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
			openQrcodeImg() {
				let isApp = browserPlatform() == browserPlatform.FLUTTER_App;
				if (!isApp) {
					// console.log(this.$refs.uqrcode);
					// this.$refs.uqrcode.toTempFilePath({
					// 	success:res=>{
					// 		console.log(res);
					// 	}
					// })

					this.$refs.uqrcode.save({
						success: () => {

						}
					});
					return;
				} else {
					this.$nativeBridge.doGetNativeMessage("screenToGallery");
				}
			},
			copyPath() {
				// console.log(this.promotionData)
				const text = this.getAddress + this.linkText + this.parameters
				// const text = this.getAddress + this.linkText + this.parameters
				// let text = this.downloadUrl;
				uni.setClipboardData({
					data: text,
					success: (res) => {
						this.copyStatus = true
						this.$refs.popupCode.close()
						uni.showToast({
							title: this.$t('pages.common.userCenter.index.copySuccess')
						})
					}
				})
			},
			openQrcode() {
				this.isLogin = global.isLogin()
				if (!this.isLogin || ['demo', 'sign'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return
				}
				if (this.isLogin) {
					this.$refs.popupCode.open()
					return;
				}
				// uni.$emit('showPop', {
				// 	refName: 'AlertMessage'
				// })
			},
			closeDialog() {
				this.$nativeBridge.setStatusBarColor(this.themeColor.themeAuxiliaryColorDefault)
				this.$refs.popupCode.close()
			},
			handleChange({
				show
			}) {
				let color = this.themeColor.themeAuxiliaryColorDefault
				let isLightColor = false
				if (show) {
					color = '#919191'
					isLightColor = true
				}
				setTimeout(() => {
					this.$nativeBridge.setStatusBarColor(color, isLightColor)
				}, 120);
			},
			toUrl(url, popArr = []) {
				let isProEnv = !this.$config.isDebug;
				if (popArr.includes(this.$config.station)) {
					pop(this.$t('pages.common.userCenter.index.pleaseExpect'));
					return
				}
				if (!url) {
					pop(this.$t('pages.common.userCenter.index.pleaseExpect'));
					return
				}
				uni.navigateTo({
					url: url
				})

				/* this.isLogin = global.isLogin()
				if (!this.isLogin) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
				} else {
					if (['sign','demo'].includes(this.userInfo.userType)) {
						uni.$emit('showPop', {
							refName: 'AlertMessage'
						})
						return false
					}
					uni.navigateTo({
						url: url
					})
				} */
			},

			toLogin() { //前往登录页面
				uni.navigateTo({
					url: "/pages/common/login"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .uni-popup__wrapper {
		overflow: hidden;
	}

	* {
		box-sizing: border-box;
	}

	.is-fixed {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
	}

	.header {
		width: 100%;
		padding: 20rpx 28rpx 20rpx 28rpx;
		display: flex;
		justify-content: space-between;
		background-color: var(--theme-auxiliary-color-default);
		max-width: 480px;

		.header-left {
			display: flex;

			.no-login {
				color: #404040;

				font-size: 34rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
				margin-left: 20rpx;
			}

			.header-left-avatar {
				width: 96rpx;
				height: 96rpx;
				position: relative;
				border-radius: 20rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}

				.header-left-level {
					width: 100%;
					height: 32rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background: url("@/static/img/common/userCenter/levelBack.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					color: #FFF;
					text-align: center;

					font-size: 24rpx;
					font-weight: 500;
					display: flex;
					align-items: center;
					padding-left: 34rpx;

				}
			}

			.header-left-mess {
				margin-left: 20rpx;

				.copy-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
					padding: 6rpx 10rpx;
					border: 1px solid;
					border-radius: 14rpx;


					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}

				.topMargin {
					margin: 24rpx 0;
				}

				.header-left-mess-name {
					display: flex;
					align-items: center;
					color: #404040;

					font-size: 30rpx;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					.name {
						text-overflow: ellipsis;
						max-width: 300rpx;
						overflow: hidden;
						white-space: nowrap;
						display: flex;
						align-items: center;

						image {
							min-width: 36rpx;
							width: 36rpx;
							height: 36rpx;

						}

						.name-level {
							color: #404040;

							font-size: 30rpx;
							font-weight: 500;
							margin-left: 10rpx;
							margin-right: 20rpx;
						}

						.nickname {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap
						}
					}

					.copy-btn {
						border-color: #404040;
						color: #404040;
						white-space: nowrap;
					}
				}

				.header-left-mess-invate {
					display: flex;
					align-items: center;
					color: #A0ABA5;

					font-size: 26rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					margin-top: 11rpx;

					.copy-btn {
						border-color: #A0ABA5;
						color: #A0ABA5;
					}
				}
			}
		}

		.header-right {
			image {
				width: 44rpx;
				height: 44rpx;

				&:last-child {
					margin-left: 30rpx;
				}
			}
		}
	}

	.dialog__content {
		// padding: 0 14rpx;
		width: 600rpx;
		// height: 348rpx;
		// padding: 12rpx 12rpx;

		.qrcode-top {
			text-align: right;
			// margin: 14rpx 0;
			margin-top: 20rpx;
			margin-right: 30rpx;
			display: flex;
			justify-content: flex-end;
			// image {
			// 	width: 40rpx !important;
			// 	height: 40rpx !important;
			// }
		}

		#qrcode {
			margin-top: 10rpx;

			::v-deep .uqrcode {
				margin: 0 auto;
			}

			image {
				display: block;
				height: 200rpx;
				width: 200rpx;
				margin: 0 auto;
				border-radius: 48rpx;
				overflow: hidden;
			}
		}

		.my-code {
			margin-top: 2rpx;
			color: #404040;
			text-align: center;

			font-size: 30rpx;
			font-weight: 400;
		}

		.footer-btn-group {
			display: flex;
			margin-top: 28rpx;

			.footer-btn-group-btn {
				color: var(--theme-color);
				background-color: #fff;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 34rpx;
				text-align: center;
				flex: 1;
			}

			.footer-btn-group-left {
				font-size: 34rpx;
				border-top: 1px solid var(--theme-auxiliary-color-default);
				border-right: 1px solid var(--theme-auxiliary-color-default);
				border-bottom-left-radius: 32rpx;

			}

			.footer-btn-group-right {
				font-size: 34rpx;
				border-top: 1px solid var(--theme-auxiliary-color-default);
				border-bottom-right-radius: 32rpx;

			}
		}
	}
</style>
