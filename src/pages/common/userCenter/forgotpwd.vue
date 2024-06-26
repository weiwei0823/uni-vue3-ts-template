<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<view class="header-box">
			<div class="header" :style="{ marginTop: safeHeight }">
				<view class="box-bg">
					<uni-nav-bar backgroundColor="#fff" height="46" color="#ffffff" :border="false" rightWidth="65px">
						<block slot="left">
							<svg @click="back" xmlns="http://www.w3.org/2000/svg" width="12" height="22"
								viewBox="0 0 12 22" fill="none">
								<path
									d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
									:fill="themeColor.themeColor" />
							</svg>
						</block>
					</uni-nav-bar>
				</view>
			</div>
		</view>
		<view class="form-box" v-show="!isGetCode">
			<h4>{{ $t("pages.common.userCenter.forgotpwd.text1") }}</h4>
			<uni-forms :modelValue="formData" ref="valiForm">
				<uni-forms-item name="phone" class="form-item">
					<LHInput class="item" v-model="formData.phone" icon="user" required
						:placeholder="$t('pages.common.userCenter.forgotpwd.text2')" close>
						<template #left>
							<svg style="margin-right: 20rpx;" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
								viewBox="0 0 24 24" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M4 4C4 1.79086 5.79086 0 8 0H17C19.2091 0 21 1.79086 21 4V20C21 22.2091 19.2091 24 17 24H8C5.79086 24 4 22.2091 4 20V4ZM6 4C6 2.89543 6.89543 2 8 2H17C18.1046 2 19 2.89543 19 4V17C19 18.1046 18.1046 19 17 19H8C6.89543 19 6 18.1046 6 17V4ZM11 22.5C10.4477 22.5 10 22.0523 10 21.5C10 20.9477 10.4477 20.5 11 20.5H14C14.5523 20.5 15 20.9477 15 21.5C15 22.0523 14.5523 22.5 14 22.5H11Z"
									fill="#A1A1A1" />
							</svg>
						</template>
					</LHInput>
				</uni-forms-item>
				<uni-forms-item name="msgCode" class="form-item">
					<LHInput class="item" v-model="formData.code" icon="security"
						:placeholder="$t('components.pages-luntan.login.enterCode')" close>
						<template #right>
							<view class="code" :class="{ startCode }" @tap="getCode">{{ codeText }}</view>
							<u-verification-code ref="uCode" @change="codeChange" change-text="X秒后重试" end-text="重新获取验证码"
								@start="startCode = true" @end="startCode = false"></u-verification-code>
						</template>
					</LHInput>
				</uni-forms-item>
			</uni-forms>
			<div class="btn primary-btn" @click="nextBtn">{{ $t("pages.common.userCenter.forgotpwd.text5") }}</div>
		</view>
		<view class="form-box" v-show="isGetCode">
			<h4>{{ $t("pages.common.userCenter.forgotpwd.text6") }}</h4>
			<uni-forms :modelValue="formData" ref="valiForm1">
				<uni-forms-item name="phone" class="form-item">
					<LHInput class="item" v-model="formData.pwd" icon="lock"
						placeholder="密码请输入8～12个字符" close type="password" />
				</uni-forms-item>
				<uni-forms-item name="phone" class="form-item">
					<LHInput class="item" v-model="formData.repwd" icon="lock"
						placeholder="请再次输入密码" close type="password" />
				</uni-forms-item>
			</uni-forms>
			<div class="btn primary-btn" @click="update">{{ $t("pages.common.userCenter.forgotpwd.text5") }}</div>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		getVCode,
		findPwd,
		checkCode
	} from '@/utils/common/index.js'
	import {
		checkPhone,
		codeCheck
	} from "@/utils/common.ts"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import LHInput from '@/components/common/LHInput/index.vue';
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			AlertInjectLayer,
			LHInput
		},
		name: "forgotpwd",
		data() {
			return {
				codeText: '',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				countDown: 60,
				isSend: false,
				isGetCode: false,
				sendText: '',
				formData: {
					phone: '',
					type: 'findPwd',
					code: '',
					pwd: '',
					verificationToken: '',
					repwd: ""
				},
				startCode: false
			}
		},
		computed: {
			...mapGetters(["themeColor"]),

		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			//返回
			back: function() {
				if (this.isGetCode) {
					this.isGetCode = false
					this.isSend = false
					this.sendText = ''
				} else {
					backPage()
				}
			},
			verifyData(check_website) {
				return new Promise((resolve, reject) => {
					uni.$emit("showPop", {
						refName: "Verify",
						data: {
							verifyType: 'Slide',
							check_website
						},
						success: (response) => {
							if (response.close) response.close();
							resolve(response)
						},
						fail: reject,
					});
				})
			},
			getCode: async function() {
				if (!this.$refs.uCode.canGetCode) {
					return
				}
				const phone = this.formData.phone
				if (!checkPhone(phone)) return false
				let prams = {
					phone: this.formData.phone,
					type: this.formData.type
				}
				const {ticket, randstr} = await this.verifyData(false)
				prams.ticket = ticket
				prams.randStr = randstr
				getVCode(prams).then(res => {
					if (res.code == 200) {
						this.$refs.uCode.start()
						uni.showToast({
							title: this.$t("pages.common.userCenter.forgotpwd.text9"),
							duration: 1000,
							icon: "none"
						})
						this.isSend = true
						let timerId = setInterval(() => {
							this.countDown--;
							this.sendText = this.countDown + this.$t(
								"pages.common.userCenter.forgotpwd.text10");
							if (this.countDown <= 0) {
								clearInterval(timerId);
								this.countDown = 60;
								this.isSend = false
							}
						}, 1000);
					} else {
						pop(res.message)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			nextBtn: function() {
				const phone = this.formData.phone
				const code = this.formData.code
				if (!checkPhone(phone)) return false
				if (!codeCheck(code)) return false
				let prams = {
					phone: this.formData.phone,
					type: this.formData.type,
					code: this.formData.code
				}
				checkCode(prams).then(res => {
					if (res.code == 200) {
						this.isGetCode = true
						this.formData.verificationToken = res.result.verificationToken
					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			update: function() {
				if (this.formData.pwd != this.formData.repwd) {
					uni.showToast({
						title: this.$t("pages.common.userCenter.forgotpwd.text11"),
						duration: 2000,
						icon: "none"
					})
				}
				let prams = {
					phone: this.formData.phone,
					confirmPwd: this.formData.repwd, //确认密码
					pwd: this.formData.pwd,
					verificationToken: this.formData.verificationToken
				}
				findPwd(prams).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: "/pages/common/login" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
						});
					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {
		background: #fff;
		height: var(--vh);
	}

	.form-box {
		padding: 40rpx 28rpx;
	}

	.form-box h4 {
		font-size: 48rpx;
		color: #404040;
		margin-bottom: 40rpx;
	}

	.code {
		color: var(--theme-color);
		font-size: 30rpx;
	}

	.startCode {
		color: #A1A1A1;
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
