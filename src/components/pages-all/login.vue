<template>
	<!-- :headerInnerStyle="{position:'fixed',top:0}"
			:headerStyle="{height:'88rpx',top:0,position:'fixed'}" -->
	<view class="all-login pc-max-width" :class="['theme-' + themeColor.name]" style="width: 100%;"
		:style="{ marginTop: safeHeight, height: `calc(${oldHeight}px)`, position: 'fixed' }">
		<!-- :headerInnerStyle="{position:'fixed',top:0}" -->
		<Header ref="header" fixed>
			<template #right>
				<view class="kefu" @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t("components.pages-all.login.text1") }}
				</view>
			</template>
		</Header>
		<scroll-view scroll-y="true" show-scrollbar="true" scroll-with-animation="true"
			:style="{ height: `calc(${oldHeight}px)` }">
			<view class="content">
				<view class="logo-box">
					<view class="logo">
						<image v-if="logo" mode="widthFix" class="logo-image" :src="logo"></image>
					</view>
					<image class="logo-back" :src="logoBack"></image>
				</view>
				<LHInput class="item" v-model="formData.phone" icon="user" :placeholder="$t('components.pages-all.login.text2')"
					close />
				<LHInput class="item" v-model="formData.pwd" icon="lock" :placeholder="$t('components.pages-all.login.text3')"
					close type="password" />
				<view class="item password-item">
					<LHRadio v-model="rememberPassword" class="remember-password" :style="{ color: themeColor.themeColor }">

						{{ $t("components.pages-all.login.text4") }}
					</LHRadio>
					<view class="forgot-password" @click="toUrl('/pages/common/userCenter/service/index')"
						:style="{ color: themeColor.themeColor }">
						{{ $t("components.pages-all.login.text5") }}
					</view>
				</view>
				<view class="item submit" @click="submit" :style="{ background: themeColor.themeColor }">
					{{ $t("components.pages-all.login.text6") }}
				</view>
				<view class="item btns">
					<view class="demo" @click="testLogin">{{ $t("components.pages-all.login.text7") }}</view>
					<view class="register" @click="toUrl('/pages/common/reg')">
						{{ $t("components.pages-all.login.text8") }}
					</view>
				</view>
			</view>
			<view class="bottom">
				<text @click="toUrl('/')">
					{{ $t("components.pages-all.login.text9") }}
				</text>
				<u-line margin="0 40rpx" color="#A1A1A1" direction="col" length="24" />
				<text @click="toUrl('/pages/common/userCenter/service/index')">
					{{ $t("components.pages-all.login.text10") }}
				</text>
			</view>
		</scroll-view>
		<uni-popup ref="confirm" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="img">
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
						<circle cx="22" cy="22" r="21" :stroke="themeColor.themeAuxiliaryColorRemind" stroke-width="2" />
						<path
							d="M21.3763 17.9892C19.8638 17.9892 18.8555 18.9975 18.8555 20.2579V31.0975C18.8555 32.3579 19.8638 33.3663 21.3763 33.3663C22.8888 33.3663 23.8971 32.358 23.8971 31.0975V20.258C23.8971 18.9975 22.8888 17.9892 21.3763 17.9892ZM21.3763 14.2079C22.8888 14.2079 23.8971 13.1996 23.8971 11.6871C23.8971 10.1746 22.8888 9.16626 21.3763 9.16626C19.8638 9.16626 18.8555 10.1746 18.8555 11.6871C18.8555 13.1996 19.8638 14.2079 21.3763 14.2079Z"
							:fill="themeColor.themeAuxiliaryColorRemind" />
					</svg>
				</view>
				<view class="btn-content">{{ errMsg }}</view>
				<view class="btn-box" @click="known">
					{{ $t("components.pages-all.login.text11") }}
				</view>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
import {
	mapGetters
} from 'pinia';
import Header from '@/components/common/header/index.vue';
import LHInput from '@/components/common/LHInput/index.vue';
import LHRadio from '@/components/common/LHRadio/index.vue';
import defaultTemplate from "@/utils/defaultTemplate";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	login
} from "@/utils/common/index"
import {
	formartObjectToQueryString
} from "@/utils/dataFormartter"

export default {
	components: {
		Header,
		LHInput,
		LHRadio,
		AlertInjectLayer
	},
	data() {
		return {
			errMsg: "",
			formData: {
				phone: '',
				pwd: '',
				deviceId: '',
				deviceName: '',
			},
			rememberPassword: false,
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			oldHeight: 0
		}
	},
	mounted() {

		var lastTouchEnd = 0;
		document.documentElement.addEventListener('touchend', function (event) {
			var now = Date.now();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		}, false);
		uni.getSystemInfo({
			success: (res) => {
				this.formData.deviceId = res.deviceId
			}
		})
		this.oldHeight = this.uWindowHeight
		const {
			rememberPassword,
			data
		} = uni.getStorageSync('rememberPasswordConfig')
		if (rememberPassword) {
			this.rememberPassword = rememberPassword
			const {
				phone,
				pwd
			} = data
			this.formData.phone = phone
			this.formData.pwd = pwd
		}
		followKeybordSetInputStyle(this.$refs.header);
	},
	computed: {
		...mapGetters(["themeColor", "windowTop", 'uWindowHeight']),
		theme() {
			return getApp().globalData.themeMap[this.$config.station]
		},
		logoBack() {
			return require('@/static/img/login-general-back.png')
		},
		logo() {
			let contantLogoAndNameId = this.$config.enumMgr.CONTANTS_CONFIGS_ID.LOGIN_LOGO;
			let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state.appInfoStore
				.contantsConfigTypeMap[contantLogoAndNameId] : null;
			if (!info) return null;
			return info.url;

		},

		handleChangeRememberPassword(e) { }
	},
	methods: {
		backPage() {
			backPage(false, "/")
		},
		testLogin() {
			// 预留res 判断登录失败情况
			let that = this;
			// this.$nativeBridge.openUrl("h5");
			//
			// return;
			this.$store.dispatch("doUserLoginDemo").then((res) => {
				let isAllStation = that.$config.station == this.$config.enumMgr.STATION.ALL;
				uni.reLaunch({
					url: isAllStation ? "/pages/liuhe/home/index?isTest=1" :
						"/pages/liuhe/indexNew?isTest=1"
				})
			}).catch((err) => {
				pop(err.message, 2000)
			});

		},
		toUrl(url) {
			uni.navigateTo({
				url,
				fail: (failMsg) => {
					uni.switchTab({
						url
					})
				}
			});
		},
		known() {
			this.$refs.confirm.close()
		},
		//提交登录
		submit() {
			console.log('this.formData', this.formData);
			if (!this.formData.phone) {
				pop(this.$t("components.pages-all.login.text12"), 2000)
				return false
			}
			if (!this.formData.pwd) {
				pop(this.$t("liuhe.login.pwd.empty"), 2000)
				return false
			}
			let prams = this.formData;
			uni.$emit("showPop", {
				refName: "Verify",
				data: {
					verifyType: 'Slide'
				},
				success: async (response) => {
					if (response.close) response.close();
					uni.showLoading({
						mask: true
					});
					if (response.ticket && response.randstr) {
						prams.ticket = response.ticket
						prams.randStr = response.randstr
					}
					prams.phoneType = browserPlatformRegionCode()
					const res = await login(prams)
					uni.hideLoading();

					if (res.code == 600) {
						this.$refs.confirm.open()
						this.errMsg = res.message
						return false
					} else if (res.code == 200) {
						const {
							user,
							token
						} = defaultTemplate({
							user: {
								createType: '',
								id: "",
								userName: "",
								status: 1,
								phone: '',
								nickname: "",
								coin: 0,
								flowers: 0,
								score: 0,
								userLevel: 1,
								headImgUrl: "",
								izAuth: 0,
								expert: 0,
								commentStatus: 1,
								isRoom: 1,
								roomSpeak: 1,
								exchange: 1,
								remark: '',
								black: 0,
								userBlock: Boolean,
								vip: Boolean,
								concernCount: 0,
								fansCount: 0,
								collectCount: 0,
								publishCount: 0,
								thumbUpCount: 0,
								inviteCode: '',
								concern: 0,
								lastTime: '',
								medalList: [{
									conditions: "",
									filePath: "",
									hasMedal: 0,
									id: 0,
									name: "",
									remark: "",
									rewardAmount: 0,
									rewardScore: 0,
									status: 0
								}],
								userType: ""
							},
							token: ""
						}, res.result);
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_USERINFO, user);
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_TOKEN, token);
						uni.$emit('loginUpdate', {});

						this.$nextTick(() => {
							// 等store里面的数据初始完成后再进行页面跳转操作
							this.$store.dispatch("appInfoStoreInit").then(() => {
								const pages = getCurrentPages();
								const isHaveBack = pages[pages.length - 2];
								if (isHaveBack) {
									location.href = "/#/" + isHaveBack.route +
										formartObjectToQueryString(isHaveBack.options);
								} else {
									location.href = "/"
								}
							});
						})
					} else if (res.code === 538) {
						uni.$emit('showPop', {
							refName: "AlertMsg",
							data: {
								title: '账号不存在',
								content: '您输入的账号不存在，是否立即注册？',
								confirmText: '立即注册'
							},
							confirm: () => {
								this.toUrl('/pages/common/reg')
							}
						})
						return
					} else {
						pop(res.message, 2000)
						return false
					}
					if (this.rememberPassword) {
						uni.setStorageSync('rememberPasswordConfig', {
							rememberPassword: this.rememberPassword,
							data: this.formData
						})
					} else {
						uni.removeStorageSync('rememberPasswordConfig')
					}
				},
				fail: (e) => { },
			});
		}
	}
}
</script>
<style lang="scss" scoped>
.all-login {
	background: var(--theme-auxiliary-color-default);
	// display: flex;
	// flex-direction: column;
	// justify-content: space-between;
	box-sizing: border-box;
	max-width: 480px;
	// height: var(--vh);

	.kefu {
		color: #404040;
		font-size: 30rpx;
		text-align: right;
	}


	.content {
		// flex: 1;
		padding: 40rpx 28rpx;
		box-sizing: border-box;
		// height: 100%;

		.logo-box {
			width: 100%;
			height: 216rpx;
			margin-bottom: 10rpx;
			position: relative;
			background-color: var(--theme-color);
			border-radius: 24rpx;
		}

		.logo {
			position: absolute;
			z-index: 2;
			width: 370rpx;
			height: 100%;
			left: 40rpx;
			display: flex;
			align-items: center;

			.logo-image {
				width: 90%;
			}
		}


		.logo-back {
			width: 100%;
			height: 100%;
		}

		.item {
			margin-top: 32rpx;
		}

		.password-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;

			.remember-password {
				color: #404040;
			}

			.forgot-password {
				color: var(--theme-color);
			}
		}

		.submit {
			display: grid;
			place-content: center;
			height: 108rpx;
			border-radius: 24rpx;
			color: #FFF;
			font-size: 34rpx;
			flex: 1;
			background: var(--theme-color);
		}

		.btns {
			display: flex;
		}

		.demo {
			flex: 1;
			display: grid;
			place-content: center;
			border-radius: 24rpx;
			height: 96rpx;
			margin-right: 20rpx;
			color: #404040;
			border: 1px solid #A1A1A1;
		}

		.register {
			flex: 1;
			display: grid;
			place-content: center;
			border-radius: 24rpx;
			height: 96rpx;
			color: var(--theme-color);
			border: 1px solid var(--theme-color);
		}
	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #404040;
		font-size: 28rpx;
		margin-top: 20rpx;
	}
}

::v-deep .header-content-box {
	z-index: 9999 !important;
	// position: fixed !important;
	// top: 0 !important;

}

.confirm-box {
	width: 600rpx;
	border-radius: 24rpx;
	padding-top: 20rpx;
	overflow: hidden;

	.img {
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
	}

	.btn-content {
		margin: 0 29rpx;
		font-weight: 400;
		font-size: 30rpx;
		text-align: center;
		color: #c0c0c0;
	}

	.btn-box {
		display: grid;
		place-content: center;
		height: 88rpx;
		width: 100%;
		background: #FFFFFF;
		border-top: 1px solid var(--theme-auxiliary-color-default);
		font-weight: 500;
		font-size: 34rpx;
		text-align: center;
		color: var(--theme-color);
		margin-top: 40rpx;
	}
}
</style>
