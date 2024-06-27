<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight, height: `${uWindowHeight}px - safeHeight)` }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<nav-bar :isBack="false">
			<template #left>
				<svg @click="back" xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22"
					fill="none">
					<path
						d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
						:fill="themeColor.themeColor" />
				</svg>
			</template>
		</nav-bar>
		<view class="login-confirm">
			<image :src="logoUrl" class="login-logo"></image>
			<view class="forms">
				<view class="tablist">
					<view v-for="(item, index) in tab" :key="index"
						:class="isActive == index ? 'tablist-item active' : 'tablist-item'" @click="selectTab(index)">
						<text>{{ item }}</text>
					</view>
					<view class="van-tabs__line" :style="styles[isActive]"></view>
				</view>
				<uni-forms :modelValue="formData" ref="valiForm">
					<uni-forms-item name="phone" class="form-item">
						<LHInput class="item" v-model="formData.phone" icon="user" required
							:placeholder="$t('components.pages-luntan.login.phonePlaceholder')" close>
							<template #left>
								<svg style="margin-right: 20rpx;" xmlns="http://www.w3.org/2000/svg" width="24"
									height="24" viewBox="0 0 24 24" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M4 4C4 1.79086 5.79086 0 8 0H17C19.2091 0 21 1.79086 21 4V20C21 22.2091 19.2091 24 17 24H8C5.79086 24 4 22.2091 4 20V4ZM6 4C6 2.89543 6.89543 2 8 2H17C18.1046 2 19 2.89543 19 4V17C19 18.1046 18.1046 19 17 19H8C6.89543 19 6 18.1046 6 17V4ZM11 22.5C10.4477 22.5 10 22.0523 10 21.5C10 20.9477 10.4477 20.5 11 20.5H14C14.5523 20.5 15 20.9477 15 21.5C15 22.0523 14.5523 22.5 14 22.5H11Z"
										fill="#A1A1A1" />
								</svg>
							</template>
						</LHInput>
					</uni-forms-item>
					<uni-forms-item name="pwd" class="form-item" v-show="isActive == 0">
						<LHInput class="item" v-model="formData.pwd" icon="lock"
							:placeholder="$t('components.pages-luntan.login.passwordPlaceholder')" close
							type="password" />
					</uni-forms-item>
					<uni-forms-item name="msgCode" class="form-item" v-show="isActive == 1">
						<LHInput class="item" v-model="formData.msgCode" icon="security"
							:placeholder="$t('components.pages-luntan.login.codePlaceholder')" close>
							<template #right>
								<view class="code" :class="{ startCode }" @tap="getCode">{{ codeText }}</view>
								<u-verification-code ref="uCode" @change="codeChange" end-text="重新获取验证码"
									@start="startCode = true" @end="startCode = false"></u-verification-code>
							</template>
						</LHInput>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="forgetpwd clearfix" :style="{ color: themeColor.themeColor }">
				<text class="step" @click="registers">{{ $t('components.pages-luntan.login.register') }}</text>
				<text @click="forgotpwd">{{ $t('components.pages-luntan.login.forgotPassword') }}?</text>
			</view>
			<view class="btn primary-btn" style="clear: both" @click="submit('valiForm')">
				{{ $t('components.pages-luntan.login.login') }}
			</view>

		</view>
		<uni-popup ref="confirm" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="img">
					<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
						<circle cx="22" cy="22" r="21" :stroke="themeColor.themeAuxiliaryColorRemind"
							stroke-width="2" />
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
	import {
		login,
		getVCode
	} from "@/utils/common/index.js";
	import {
		checkPhone,
		codeCheck
	} from "@/utils/common.ts"
	import NavBar from "@/components/common/navBar/navBar";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";

	import LHInput from '@/components/common/LHInput/index.vue';
	export default {
		name: "Login",
		components: {
			AlertInjectLayer,
			NavBar,
			LHInput
		},
		computed: {
			...mapGetters(["themeColor","uWindowHeight"]),
			logoUrl() {
				let configInfo = this.$store.state.appInfoStore.contantsConfigTypeMap['22'];
				if (!configInfo) {
					console.warn("警告：当前站点为配置LOGO");
					return "@/static/logo.png";
				}
				return configInfo.url;
			}
		},

		data() {
			return {
				startCode: false,
				codeText: '',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				isActive: 0,
				isShow: false,
				logo: '@/static/logo.png',
				countDown: 60,
				isSend: false,
				sendText: '',
				tab: [this.$t('components.pages-luntan.login.passwordLogin'), this.$t(
					'components.pages-luntan.login.codeLogin')],
				styles: [
					'transform: translateX(70rpx) translateX(-50%);',
					'transform: translateX(260rpx) translateX(-50%);'
				],
				formData: {
					phone: '',
					pwd: '',
					msgCode: '',
					type: 1,
				},
				errMsg: ''
			}
		},
		onShow(option) {
			let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)
			try {
				configData.forEach((item, index) => {
					if (item.type == 22) {
						this.logo = item.url
						throw Error();
					}
				})
			} catch (err) {
				console.log(err)
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			//返回
			back() {
				backPage()
				// uni.navigateBack({
				// 	delta: 1, //返回层数，2则上上页
				// })
			},
			registers: function() {
				uni.navigateTo({
					url: '/pages/common/userCenter/register'
				})
			},
			forgotpwd: function() {
				uni.navigateTo({
					url: '/pages/common/userCenter/forgotpwd'
				})
			},
			selectTab: function(index) {
				this.isActive = index
				if (index == 0) {
					this.formData.type = 1
				} else {
					this.formData.type = 2
				}
			},
			verifyData() {
				return new Promise((resolve, reject) => {
					uni.$emit("showPop", {
						refName: "Verify",
						data: {
							verifyType: 'Slide',
							check_website: false
						},
						success: (response) => {
							if (response.close) response.close();
							resolve(response)
						},
						fail: reject,
					});
				})
			},
			//获取验证码
			getCode: async function() {
				if (!this.$refs.uCode.canGetCode) {
					return
				}
				const phone = this.formData.phone
				if (!checkPhone(phone)) return false
				let prams = {
					phone: this.formData.phone,
					type: 'login'
				}
				const {ticket, randstr} = await this.verifyData()
				prams.ticket = ticket
				prams.randStr = randstr
				uni.showLoading({mask:true})
				getVCode(prams).then(res => {
					if (res.code == 200) {
						this.$refs.uCode.start()
						pop(this.$t('components.pages-luntan.login.sendSuccess'), 1000)
						this.isSend = true
						this.timerId = setInterval(() => {
							this.countDown--;
							this.sendText = this.countDown + this.$t(
								'components.pages-luntan.login.retryAfterSeconds');
							if (this.countDown <= 0) {
								clearInterval(this.timerId);
								this.countDown = 60;
								this.isSend = false
							}
						}, 1000);
					} else {
						pop(res.message, 2000)
					}
				}).finally(()=>{uni.hideLoading()}).catch(err => {
					console.log(err)
				})
			},
			submit: function() {
				const phone = this.formData.phone
				if (!checkPhone(phone)) return false
				if (this.formData.type == 1) {
					if (!this.formData.pwd) {
						pop(this.$t("liuhe.login.pwd.empty"), 2000)
						return false
					}
				} else {
					if (!this.formData.msgCode) {
						uni.showToast({
							title: this.$t('components.pages-luntan.login.enterCode'),
							duration: 2000,
							icon: "none"
						})
						return false
					}
				}
				let prams = this.formData;
				uni.$emit("showPop", {
					refName: "Verify",
					data: {
						verifyType: 'Slide',
						check_website: false
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

						clearInterval(this.timerId);
						this.countDown = 60;
						this.isSend = false
						if (res.code === 538) {
							uni.$emit('showPop', {
								refName: "AlertMsg",
								data: {
									title: '账号不存在',
									content: '您输入的账号不存在，是否立即注册？',
									confirmText: '立即注册'
								},
								confirm: () => {
									this.registers()
								}
							})
							return
						} else if (res.code != 200) {
							this.$refs.confirm.open()
							this.errMsg = res.message
							return false
						}
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_USERINFO, res.result.user);
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_TOKEN, res.result.token);
						// 等store里面的数据初始完成后再进行页面跳转操作
						this.$store.dispatch("initUserInfo").then(()=>{
							const urlMap = {
								ALL: '/pages/common/userCenter/index',
								LIUHE: '/pages/liuhe/indexNew',
								LUNTAN: '/pages/luntan/index'
							};
							uni.reLaunch({
								url: urlMap[this.$config.station]
							});
							location.reload();
						})

					},
					fail: (e) => {},
				});
			},

			known() {
				this.$refs.confirm.close()
			},
		}
	}
</script>

<style scoped>
	.mint-tab-container-item {
		background: #fff;
		height: var(--vh);
		display: flex;
		flex-direction: column;
	}

	.login-confirm {
		flex: 1;
		height: 80vh;
		position: relative;
		background: #fff;
		padding: 0 28rpx;
	}

	.login-confirm .login-logo {
		display: block;
		margin: 0 auto;
		width: 176rpx;
		height: 176rpx;
	}

	.forms .tablist {
		width: 362rpx;
		margin-top: 60rpx;
		height: 88rpx;
		overflow: hidden;
		box-sizing: content-box;
		display: flex;
		background-color: #fff;
		user-select: none;
		position: relative;
		margin-bottom: 20rpx;
	}

	.tablist .tablist-item {
		padding: 0;
		font-size: 28rpx;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		box-sizing: border-box;
		line-height: 40rpx;
		cursor: pointer;
		text-align: center;
		color: #404040;
		font-size: 34rpx;
	}


	.tablist .tablist-item+.tablist-item {
		margin-left: 40rpx;
	}

	.tablist .tablist-item.active {
		color: var(--theme-color);
	}

	.tablist .tablist-item text {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.van-tabs__line {
		background: var(--theme-color);
		position: absolute;
		bottom: 20rpx;
		left: 0;
		z-index: 1;
		width: 36rpx;
		height: 6rpx;
		border-radius: 6rpx;
		transition-duration: 0.3s;
	}

	.form-item {
		position: relative;
	}

	.code {
		color: var(--theme-color);
		font-size: 30rpx;
	}

	.startCode {
		color: #A1A1A1;
	}

	.login-confirm .forgetpwd {
		display: inline-block;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.login-confirm .forgetpwd text {
		float: right;
		color: #A1A1A1;
		font-size: 28rpx;
	}

	.login-confirm .forgetpwd .step {
		color: var(--theme-color);
		font-size: 30rpx;
	}

	.btn.primary-btn {
		margin: 0 auto;
		background: var(--theme-color);
		height: 88rpx;
		line-height: 88rpx;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		width: 100%;
		border-radius: 16rpx;
		margin-top: 40rpx !important;
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

<style lang="scss" scoped>
	::v-deep .uni-forms-item {
		border: 1px solid var(--theme-auxiliary-color-default);
		border-radius: 20rpx;
		margin-bottom: 32rpx;

		.uni-forms-item__content {
			border: none !important;
		}

		.lh-input {
			height: 108rpx;

			.input {
				font-size: 30rpx;

				.uni-input-placeholder {
					color: #A1A1A1;
				}
			}
		}
	}
</style>
