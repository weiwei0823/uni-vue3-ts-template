<template>
	<view :class="['theme-' + themeColor.name]" class="pc-max-width" style="background-color: #fff;"
		:style="{ position: `fixed`, height:`calc(${uWindowHeight}px)`, marginTop: safeHeight,width:'100%'  }">


		<Header :title="title" :header-style="{borderRadius:0}" :isFixed="true">
			<block slot="right">
				<view class="tip_block">

					<svg @click="openTip" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
						fill="none">
						<path
							d="M10.5548 13.7587C9.59444 13.7587 9.40238 13.9508 9.40238 14.9111C9.40238 15.8714 9.59444 16.0635 10.5548 16.0635C11.419 16.0635 11.7071 15.8714 11.7071 14.9111C11.7071 13.8548 11.419 13.7587 10.5548 13.7587ZM10.4587 5.5C9.69048 5.5 8.92222 5.59603 8.25 5.78809V7.42063C8.82619 7.22857 9.49841 7.13254 10.1706 7.13254C11.419 7.13254 11.8032 7.3246 11.8032 8.38095C11.8032 9.14921 11.6111 9.34127 10.9389 9.91746C9.97857 10.6857 9.69048 11.1659 9.69048 12.0302V12.7024H11.323V12.3183C11.323 11.7421 11.5151 11.454 12.3794 10.7817C13.3397 10.2056 13.7238 9.34127 13.8198 8.09286C13.8198 6.07619 12.7635 5.5 10.4587 5.5Z"
							fill="#A1A1A1" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M11 20.35C16.1639 20.35 20.35 16.1639 20.35 11C20.35 5.83614 16.1639 1.65 11 1.65C5.83614 1.65 1.65 5.83614 1.65 11C1.65 16.1639 5.83614 20.35 11 20.35ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z"
							fill="#A1A1A1" />
					</svg>
					<!-- <view class="tip" @click="openTip">
						?
					</view> -->
				</view>
			</block>
		</Header>
		<view class=""
			:style="{overflow:'hidden', height:`calc(${uWindowHeight}px`, borderTopLeftRadius:'24rpx',borderTopRightRadius:'24rpx',}">


			<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${uWindowHeight}px - ${isApp?88:88}rpx)`}"
				:enhanced="true" :bounces="false" :show-scrollbar="false">
				<view class="invation-wrap" :style="{ marginTop: safeHeight,minHeight:`calc(${uWindowHeight}px)` }"
					:class="['theme-' + themeColor.name]">

					<!-- <NavBar :title="title">
			<view slot="right" class="tip" @click="openTip">
				?
			</view>
			</NavBar> -->
					<view class="main-body">
						<image src="@/static/img/user/yqhy-bg.png" mode="widthFix" class="tupian"></image>
						<!-- <view class="tupian"></view> -->
						<view class="code-info">
							<view class="code">
								<uqrcode size="370" sizeUnit="rpx" class="code" ref="uqrcode" canvas-id="qrcode"
									:value="getAddress + linkText +parameters" v-if="promotionData.channel.address"
									borderRadius="24">
								</uqrcode>
								<!-- <image :src="shareObj.qrCodePath" /> -->
							</view>
							<view class="text">
								{{ $t('pages.common.userCenter.invite.DownloadApp') }}
								<!-- <br>
								<view style="width:370rpx;white-space: wrap;word-break:break-all;">
									{{getAddress + linkText +parameters}}
								</view> -->
								<!-- {{getAddress + linkText}} -->
								<!-- {{ shareObj.inviteUrl }} -->
							</view>
							<view class="text-code">
								{{ $t('pages.common.userCenter.invite.YourInvitationCode') }}
								{{ userInfo && userInfo.inviteCode }}
								<!-- {{ shareObj.inviteCode }} -->
							</view>
						</view>
					</view>
					<!-- <view class="bottom-btn-group">
						<view class="bottom-btn-group-btn" @click="onShare">
							<image src="@/static/img/common/userCenter/wechat.png" mode=""></image>

							{{ $t('pages.common.userCenter.invite.WechatFriend') }}
						</view>
						<view class="bottom-btn-group-btn" @click="onShare">
							<image src="@/static/img/common/userCenter/frend.png" mode=""></image>
							{{ $t('pages.common.userCenter.invite.WechatMoment') }}
						</view>
					</view> -->
					<view class="bottom-btn-share" @click="newShare">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
							<path
								d="M18.5 8C20.1569 8 21.5 6.65685 21.5 5C21.5 3.34315 20.1569 2 18.5 2C16.8431 2 15.5 3.34315 15.5 5C15.5 6.65685 16.8431 8 18.5 8Z"
								stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M6.5 15C8.15685 15 9.5 13.6569 9.5 12C9.5 10.3431 8.15685 9 6.5 9C4.84315 9 3.5 10.3431 3.5 12C3.5 13.6569 4.84315 15 6.5 15Z"
								stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M18.5 22C20.1569 22 21.5 20.6569 21.5 19C21.5 17.3431 20.1569 16 18.5 16C16.8431 16 15.5 17.3431 15.5 19C15.5 20.6569 16.8431 22 18.5 22Z"
								stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M9.08997 13.5098L15.92 17.4898" stroke="white" stroke-width="2"
								stroke-linecap="round" stroke-linejoin="round" />
							<path d="M15.91 6.50977L9.08997 10.4898" stroke="white" stroke-width="2"
								stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<view class="text-share">分享</view>
					</view>
					<!-- 		<view class="bottom-sy">
				<uni-row class="van-row">
					<uni-col :span="12" class="van-col van-col--12">
						<image
							src="data:image/png;base64,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"
							@click="onShare" />
						<view @click="onShare">{{ $t('pages.common.userCenter.invite.WechatFriend') }}</view>
					</uni-col>
					<uni-col :span="12" class="van-col van-col--12">
						<image
							src="data:image/png;base64,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"
							@click="onShare" />
						<view @click="onShare">{{ $t('pages.common.userCenter.invite.WechatMoment') }}</view>
					</uni-col>
				</uni-row>
			</view> -->
					<AlertInjectLayer />
				</view>
			</scroll-view>
		</view>

		<!-- 普通弹窗 -->
					<uni-popup ref="popup" background-color="#fff" type="dialog"
						:mask-background-color="'rgba(0, 0, 0, 0.3)'" @maskClick="clostPop">
						<view class="pop-tip-box">
							<view class="close" @click="clostPop">
								<!-- <image src="@/static/img/user/close.png" mode=""></image> -->
								<filterIcon src="@/static/img/user/close.png" :width="30" :height="30" />
							</view>
							<view class="title">{{ $t('pages.common.userCenter.invite.ShareReward') }}</view>
							<view class="text-box">
								<view>1、{{ $t('pages.common.userCenter.invite.ShareApp') }}</view>
								<view>2、{{ $t('pages.common.userCenter.invite.DirectInvite') }}</view>
								<view>3、{{ $t('pages.common.userCenter.invite.ExpiryNote') }}</view>
							</view>
							<view class="shuom">{{ $t('pages.common.userCenter.invite.ClaimSteps') }}</view>
							<view class="shuom" style="margin-top: 8rpx;">
								{{ $t('pages.common.userCenter.invite.ClaimSteps2') }}
							</view>
							<view class="btn" @click="setApply">
								{{ $t('pages.common.userCenter.invite.ApplySpokesperson') }}
							</view>
						</view>
					</uni-popup>
	</view>


</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import {
		share,
		applySpoke
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import Header from "@/components/common/header/index";
	import {
		mapGetters
	} from 'pinia';
	import {
		myPromotion
	} from "@/utils/ptp";
	import defaultTemplate from '@/utils/defaultTemplate';
	export default {
		name: "invite",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar,
			Header
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight", "downloadShow"]),
			userInfo() {

				return this.$store.state.appInfoStore.userInfo;
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
			},
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.invite.InviteFriends'),
				shareObj: {
					inviteCode: "",
					inviteUrl: "",
					qrCodePath: ""
				},
				winHeight: 0,
				promotionData: {
					inviteCode: '',
					channel: {
						address: ''
					}
				},
				agentPromotionConfigs: [],
				isApp: false
			}
		},
		onReady() {
			this.shareToFriends()
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.shareToFriends();
		},
		methods: {
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
			//邀请好友
			// shareToFriends() {
			// 	share().then(res => {
			// 		if (res.code === 200) {
			// 			this.shareObj = res.result
			// 		}
			// 	})
			// },
			//申请代言人
			setApply() {
				uni.navigateTo({
					url: '/pages/common/promoteEarn/index',
					success: () => {
						this.clostPop()
					}
				})
			},
			onShare() {
				uni.showToast({
					title: this.$t('pages.common.userCenter.invite.DownloadApp'),
					icon: "none"
				})
			},
			newShare() {
				if (!this.isApp) {
					uni.showToast({
						title: "请下载APP进行分享",
						icon: "none"
					})
					return
				}
				window.flutter_inappwebview.callHandler("shareText", this.getAddress + this.linkText + this.parameters)

			},
			openTip() {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open("center")
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			clostPop() {
				console.log(123)
				this.$refs.popup.close()
				this.$nativeBridge.setStatusBarColor('#fff')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-btn-share {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 694rpx;
		height: 88rpx;
		border-radius: 16rpx;
		background: #FAD062;
		margin-top: 400rpx;
		box-sizing: border-box;
		margin-left: auto;
		margin-right: auto;

		.text-share {
			margin-left: 20rpx;
			color: #FFF;
			font-family: MiSans;
			font-size: 36rpx;
			font-weight: 600;
		}
	}

	.tip_block {
		width: 100%;
		text-align: right;
		display: flex;
		justify-content: flex-end;
	}

	.invation-wrap {
		min-height: var(--vh);
		position: relative;
		background-image: url("@/static/img/user/yq-bg.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;

		.bottom-btn-group {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-top: 400rpx;
			padding: 0 28rpx;
			box-sizing: border-box;
			padding-bottom: 68rpx;

			.bottom-btn-group-btn {
				display: flex;
				width: 338rpx;
				height: 88rpx;
				justify-content: center;
				align-items: center;
				border-radius: 16rpx;

				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}

				&:first-child {
					border: 1px solid var(--theme-color);
					background: #FFF;
					color: var(--theme-color);

					font-size: 28rpx;
					font-weight: 500;
				}

				&:last-child {
					background: var(--theme-color);
					color: #fff;

					font-size: 28rpx;
					font-weight: 500;
				}
			}
		}



		.tip {
			color: rgb(102, 102, 102);
			border-radius: 50%;
			border: 1px solid rgb(102, 102, 102);
			width: 28rpx;
			height: 28rpx;
			text-align: center;
			line-height: 28rpx;
		}

		.main-body {
			// position: absolute;
			// top: 92rpx;
			// bottom: 200rpx;
			width: 100%;
			// height: 600rpx;

			.tupian {
				// margin-top: 40rpx;
				background-image: url("@/static/img/user/yqhy-bg.png");
				background-repeat: no-repeat;
				background-size: 100%;
				// height: 100%;
				width: 100%;
			}

			.code-info {
				background: #fff;
				padding: 40rpx;
				position: absolute;
				top: 440rpx;
				border-radius: 20rpx;
				text-align: center;
				left: 50%;
				transform: translateX(-50%);
			}

			.code {
				width: 370rpx;
				height: 370rpx;
				background: #eee;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 24rpx;
				color: #666;
				padding: 20rpx 0;
			}

			.text-code {
				font-weight: 600;
			}
		}

		.bottom-sy {
			height: 200rpx;
			position: fixed;
			width: 100%;
			background: #fff;
			bottom: 0;
			text-align: center;
			font-size: 28rpx;

			.van-row {
				.van-col {
					image {
						width: 84rpx;
						height: 84rpx;
						margin-top: 40rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}

.pop-tip-box {
	width: 600rpx;

	.close {
		position: absolute;
		right: 30rpx;
		top: 20rpx;

		// image {
		// 	width: 40rpx;
		// 	height: 40rpx;
		// }


	}

	.title {
		padding: 40rpx;
		padding-bottom: 30rpx;
		color: #404040;
		text-align: center;

		font-size: 34rpx;
		font-weight: 400;

	}

	.text-box {
		padding: 0 40rpx;
		color: #666;
		line-height: 56rpx;
		color: #404040;

		font-size: 30rpx;
		font-weight: 400;

		/* 190.118% */
		view {
			padding-bottom: 20rpx;
		}
	}

	.shuom {
		font-weight: 500;
		line-height: 56rpx;
		padding: 0 40rpx;
		color: #404040;

		font-size: 30rpx;
	}

	.btn {
		height: 88rpx;
		width: 100%;
		font-size: 34rpx;

		font-weight: 400;
		color: var(--theme-color);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		// background-image: url('@/static/img/user/yqhybtn.png');
		background-size: 100% 100%;
		margin-top: 28rpx;
		border-top: 1px solid var(--theme-auxiliary-color-default);
	}
}
</style>
