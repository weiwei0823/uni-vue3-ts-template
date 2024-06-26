<template>
	<view class="login-box" :class="['theme-' + themeColor.name]">
		<view class="login-confirm">
			<svg class="close" @click="closed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
				fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M1.0649 13.7924C0.674377 14.1829 0.674376 14.8161 1.0649 15.2066C1.45543 15.5971 2.08859 15.5971 2.47911 15.2066L7.85795 9.82776L13.3788 15.3486C13.7694 15.7392 14.4025 15.7392 14.793 15.3486C15.1836 14.9581 15.1836 14.325 14.793 13.9344L9.27216 8.41355L15.207 2.47867C15.5976 2.08815 15.5976 1.45498 15.207 1.06446C14.8165 0.673933 14.1833 0.673933 13.7928 1.06446L7.85795 6.99933L2.06513 1.20651C1.6746 0.815985 1.04144 0.815985 0.650912 1.20651C0.260388 1.59703 0.260388 2.2302 0.650912 2.62072L6.44373 8.41355L1.0649 13.7924Z"
					:fill="themeColor.themeColor" />
			</svg>
			<image :src="logo" class="login-logo"></image>
			<view class="forms">
				<view class="tablist">
					<view v-for="(item, index) in tab" :key="index"
						:class="isActive == index ? 'tablist-item active' : 'tablist-item'" @click="selectTab(index)">
						<span>{{ item }}</span>
					</view>
					<view class="van-tabs__line" :style="styles[isActive]"></view>
				</view>
				<uni-forms :modelValue="formData" ref="valiForm">
					<uni-forms-item name="phone" class="form-item">
						<LHInput class="item" v-model="formData.phone" icon="user" required
							:placeholder="$t('components.common.login.Login.text2')" close>
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
					<uni-forms-item name="pwd" class="form-item" v-show="isActive == 0">
						<LHInput class="item" v-model="formData.pwd" icon="lock"
							:placeholder="$t('components.common.login.Login.text3')" close type="password" />
					</uni-forms-item>
					<uni-forms-item name="msgCode" class="form-item" v-show="isActive == 1">
						<LHInput class="item" v-model="formData.msgCode" icon="security"
							:placeholder="$t('components.pages-luntan.login.codePlaceholder')" close>
							<template #right>
								<view class="code" :class="{ startCode }" @tap="getCode">{{ codeText }}</view>
								<u-verification-code ref="uCode" @change="codeChange" change-text="X秒后重试" end-text="重新获取验证码"
									@start="startCode = true" @end="startCode = false"></u-verification-code>
							</template>
						</LHInput>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="forgetpwd clearfix">
				<text class="step" @click="registers">{{ $t('components.common.login.Login.text1') }}</text>
				<span @click="forgotpwd">{{ $t("components.common.login.Login.text6") }}</span>
			</view>
			<view class="btn primary-btn" style="clear: both" @click="submit('valiForm')">
				{{ $t("components.common.login.Login.text7") }}
			</view>
		</view>
	</view>
</template>

<script>
import LHInput from '@/components/common/LHInput/index.vue';
import {
	login,
	getVCode
} from "@/utils/common/index.js";
import {
	checkPhone,
	codeCheck
} from "@/utils/common.ts";
import {
	mapGetters
} from 'pinia';
export default {
	name: "Login",
	components: {
		LHInput
	},
	data() {
		return {
			startCode: false,
			codeText: '',
			isActive: 0,
			logo: '../../../static/logo.png',
			isShow: false,
			countDown: 60,
			isSend: false,
			sendText: '',
			tab: [this.$t('components.common.login.Login.text8'), this.$t('components.common.login.Login.text9')],
			styles: [
				'transform: translateX(70rpx) translateX(-50%);',
				'transform: translateX(260rpx) translateX(-50%);'
			],
			formData: {
				phone: '',
				pwd: '',
				msgCode: '',
				type: 1,
			}
		}
	},
	computed: {
		...mapGetters(["themeColor"]),
	},
	mounted() {
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
		registers: function () {
			uni.navigateTo({
				url: '/pages/common/userCenter/register'
			})
		},
		forgotpwd: function () {
			uni.navigateTo({
				url: '/pages/common/userCenter/forgotpwd'
			})
		},
		selectTab: function (index) {
			this.isActive = index
			if (index == 0) {
				this.formData.type = 1
			} else {
				this.formData.type = 2
			}
		},
		closed: function () {
			this.$emit('closePopup')
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
		//获取验证码
		getCode: async function () {
			if (!this.$refs.uCode.canGetCode) {
				return
			}
			const phone = this.formData.phone
			if (!checkPhone(phone)) return false
			let prams = {
				phone: this.formData.phone,
				type: 'login'
			}
			const { ticket, randstr } = await this.verifyData(false)
			prams.ticket = ticket
			prams.randStr = randstr
			getVCode(prams).then(res => {
				if (res.code == 200) {
					this.$refs.uCode.start()
					pop(this.$t('components.common.login.Login.text10'), 1000)
					this.isSend = true
					this.timerId = setInterval(() => {
						this.countDown--;
						this.sendText = this.countDown + this.$t(
							'components.common.login.Login.text11');
						if (this.countDown <= 0) {
							clearInterval(this.timerId);
							this.countDown = 60;
							this.isSend = false
						}
					}, 1000);
				} else {
					pop(res.message, 2000)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		submit: async function () {
			const phone = this.formData.phone
			if (!checkPhone(phone)) return false
			if (this.formData.type == 1) {
				if (!this.formData.pwd) {
					uni.showToast({
						title: this.$t('components.common.login.Login.text12'),
						duration: 2000,
						icon: "none"
					})
					return false
				}
			} else {
				if (!this.formData.msgCode) {
					uni.showToast({
						title: this.$t('components.common.login.Login.text13'),
						duration: 2000,
						icon: "none"
					})
					return false
				}
			}
			let prams = this.formData
			prams.phoneType = browserPlatformRegionCode()
			const { ticket, randstr } = await this.verifyData()
			prams.ticket = ticket
			prams.randStr = randstr
			uni.showLoading({ mask: true })
			login(prams).then(res => {
				if (res.code != 200) {
					uni.showToast({
						title: res.message,
						duration: 20000,
						icon: "none"
					})
					return false
				}
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
					res.result.user);
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN, res
					.result.token);
				this.$store.dispatch("initUserInfo");
				this.$emit('closePopup')
			}).finally(() => uni.hideLoading()).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>
<style></style>
<style scoped>
.login-box {
	top: 0px;
	max-width: 480px;
	height: 100vh;
	position: fixed;
	z-index: 23;
	background: rgb(0, 0, 0, 50%);
	width: 100%;
	z-index: 998;
}

.login-confirm {
	background: #fff;
	width: 600rpx;
	box-sizing: border-box;
	overflow-y: inherit !important;
	border-radius: 24rpx;
	position: fixed;
	max-height: 100%;
	-webkit-transition: -webkit-transform .3s;
	transition: -webkit-transform .3s;
	transition: transform .3s;
	transition: transform .3s, -webkit-transform .3s;
	-webkit-overflow-scrolling: touch;
	transform: translate3d(-50%, -50%, 0);
	top: 50%;
	left: 50%;
}

.login-confirm .step {
	color: var(--theme-color);
	font-size: 30rpx;
}

.login-confirm .login-logo {
	display: block;
	margin: 40rpx auto;
	width: 136rpx;
	height: 136rpx;
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

.tablist .tablist-item span {
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

.login-confirm .forgetpwd {
	width: 100%;
	padding: 0 20rpx;
	box-sizing: border-box;
}

.login-confirm .forgetpwd span {
	float: right;
	color: #A1A1A1;
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
	margin: 40rpx 0;
}
</style>

<style lang="scss" scoped>
.startCode {
	color: #A1A1A1;
}

.login-confirm {
	padding: 20rpx;

	.close {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
}

::v-deep .uni-forms-item {
	border: 1px solid var(--theme-auxiliary-color-default);
	border-radius: 20rpx;
	margin-bottom: 32rpx;

	.uni-forms-item__content {
		border: none !important;
	}

	.lh-input {
		height: 88rpx;
		background: var(--theme-auxiliary-color-default);
		border: none;

		.input {
			font-size: 30rpx;

			.uni-input-placeholder {
				color: #A1A1A1;
			}
		}
	}
}
</style>
