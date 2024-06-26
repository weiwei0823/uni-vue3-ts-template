<template>
	<view class="mint-tab-container-item" :class="['theme-' + themeColor.name]"
		:style="'margin-top:' + safeHeight + `;height:calc(${uWindowHeight}px - ` + safeHeight + ')'">
		<!--顶部导航栏-->
		<view class="header-box">
			<div class="header" :style="{ marginTop: safeHeight }">
				<view class="box-bg">
					<uni-nav-bar backgroundColor="#fff" height="55" color="#ffffff" :border="false" rightWidth="65px">
						<block slot="left">
							<svg @click="back" xmlns="http://www.w3.org/2000/svg" width="12" height="22"
								viewBox="0 0 12 22" fill="none">
								<path
									d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
									:fill="themeColor.themeColor" />
							</svg>
						</block>
						<block slot="right">
							<span v-if="isGetCode == 3" :style="{ marginTop: safeHeight }" class="step"
								@click="tiaoguo()">{{
									$t('pages.common.userCenter.register.skip') }}</span>
						</block>
					</uni-nav-bar>
				</view>
			</div>
		</view>
		<view class="form-box zdy-form-box" v-show="isGetCode == 1">
			<h4>{{ $t('pages.common.userCenter.register.mobileRegister') }}</h4>
			<uni-forms :modelValue="formData" ref="valiForm">
				<uni-forms-item name="phone" class="form-item">
					<LHInput class="item" v-model="formData.phone" icon="user" required
						:placeholder="$t('pages.common.userCenter.register.inputPhoneNumber')" close>
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
						:placeholder="$t('components.pages-luntan.login.codePlaceholder')" close>
						<template #right>
							<view class="code" :class="{ startCode }" @tap="getCode">{{ codeText }}</view>
							<u-verification-code ref="uCode" @change="codeChange" @start="startCode = true"
								@end="startCode = false" end-text="重新获取验证码"></u-verification-code>
						</template>
					</LHInput>
				</uni-forms-item>
				<uni-forms-item name="pwd" class="form-item">
					<LHInput class="item" v-model="formData.pwd" icon="lock"
						placeholder="密码请输入8～12个字符" close type="password" />
				</uni-forms-item>
				<uni-forms-item name="repwd" class="form-item">
					<LHInput class="item" v-model="formData.repwd" icon="lock"
						placeholder="请再次输入密码" close type="password" />
				</uni-forms-item>
			</uni-forms>
			<div class="btn primary-btn" @click="reg">{{ $t('pages.common.userCenter.register.nextStep') }}</div>
		</view>
		<view class="form-box zdy-form-box" v-show="isGetCode == 2">
			<h4>{{ $t('pages.common.userCenter.register.setPassword') }}</h4>
			<uni-forms :modelValue="formData" ref="valiForm1">
				<uni-forms-item name="pwd" class="form-item">
					<LHInput class="item" v-model="formData.pwd" icon="lock"
						placeholder="密码请输入8～12个字符" close type="password" />
				</uni-forms-item>
				<uni-forms-item name="repwd" class="form-item">
					<LHInput class="item" v-model="formData.repwd" icon="lock"
						placeholder="请再次输入密码" close type="password" />
				</uni-forms-item>
			</uni-forms>
			<div class="btn primary-btn" @click="reg">{{ $t('pages.common.userCenter.register.nextStep') }}</div>
		</view>
		<view class="form-box" v-show="isGetCode == 3">
			<h4>{{ $t('pages.common.userCenter.register.completeProfile') }}</h4>
			<uni-forms :modelValue="formData" ref="valiForm1">
				<div class="person-icon" @click="upload">
					<div class="van-uploader">
						<div class="van-uploader__wrapper">
							<div class="van-uploader__input-wrapper">
								<image v-if="headerPic" :src="headerPic"></image>
								<svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48"
									viewBox="0 0 48 48" fill="none">
									<rect width="48" height="48" rx="12" fill="#A1A1A1" />
									<mask id="mask0_21890_60766" style="mask-type:alpha" maskUnits="userSpaceOnUse"
										x="2" y="2" width="44" height="44">
										<rect x="2" y="2" width="44" height="44" rx="12"
											:fill="themeColor.themeColor" />
									</mask>
									<g mask="url(#mask0_21890_60766)">
										<path
											d="M11.2396 48H36.6817C38.5679 47.9977 40.4202 47.4988 42.0525 46.5537C43.6847 45.6085 45.0394 44.2503 45.9803 42.6156C45.678 41.8082 45.2731 41.043 44.7756 40.3388C43.0496 38.0179 32.1676 34.5758 31.6907 34.1873C30.9752 33.4096 30.3085 32.5885 29.6942 31.7287H29.586V29.4716C30.1592 28.7511 30.6538 27.9714 31.0612 27.1457C31.3596 26.2963 31.548 25.4122 31.6218 24.515C33.4117 23.6938 33.633 20.827 33.7067 19.224C33.7362 18.5405 33.4559 18.3979 33.1068 18.4765C33.1806 18.2061 33.2396 17.9602 33.2789 17.7439C33.8184 15.8459 34.0475 13.8732 33.9575 11.9021L34.7148 11.9267C33.623 9.91222 32.0248 8.21733 30.0778 7.00938L30.9924 6.97498C29.0886 5.45856 26.7716 4.55194 24.3442 4.37372L24.8359 4C22.5785 4.39163 20.4781 5.41455 18.7778 6.95038C18.2466 6.70198 17.6867 6.5203 17.1109 6.40947L17.9468 7.13724C16.6214 7.27962 15.3625 7.79068 14.3129 8.61243L15.1144 8.68126C14.0403 9.90337 13.1687 11.2896 12.5328 12.7872L13.3639 12.679C13.7281 14.4982 14.2043 16.2932 14.7899 18.0536C14.7899 18.1225 14.7899 18.1864 14.7899 18.2503C14.7824 18.3305 14.7824 18.4111 14.7899 18.4913C14.485 18.4569 14.2539 18.629 14.2981 19.2535C14.3768 20.8614 14.5932 23.7282 16.388 24.5494C16.4623 25.445 16.6507 26.3274 16.9486 27.1752C17.3463 27.9818 17.8293 28.7434 18.3893 29.447V31.7582H18.2861C17.6698 32.6178 17.0015 33.4389 16.2847 34.2168C15.793 34.6053 4.92579 38.0474 3.19982 40.3683C2.70218 41.0716 2.2988 41.837 2 42.6451C2.93962 44.2657 4.28661 45.6124 5.90737 46.5517C7.52813 47.4911 9.36633 47.9903 11.2396 48Z"
											fill="#FAFAFA" />
									</g>
								</svg>
								<span class="text">{{ $t('pages.common.userCenter.register.setAvatar') }}</span>
							</div>
						</div>
					</div>
				</div>
				<uni-forms-item name="uname" class="form-item">
					<input type="text" v-model="formData.uname"
						:placeholder="$t('pages.common.userCenter.register.setNickname')" />
				</uni-forms-item>
				<uni-forms-item name="inviteCode" class="form-item">
					<input type="text" v-model="formData.inviteCode"
						:placeholder="$t('pages.common.userCenter.register.invitationCode')" />
				</uni-forms-item>
			</uni-forms>
			<div class="btn primary-btn" @click="setData">{{ $t('pages.common.userCenter.register.nextStep') }}</div>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		getVCode,
		regAndLogin,
		checkCode,
		updateUser
	} from '@/utils/common/index.js'
	import {
		checkPhone,
		codeCheck
	} from "@/utils/common.js"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import LHInput from '@/components/common/LHInput/index.vue';
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			AlertInjectLayer,
			LHInput,
		},
		name: "register",
		data() {
			return {
				startCode: false,
				codeText: '',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				countDown: 60,
				isSend: false,
				isGetCode: 1,
				sendText: '',
				headerPic: '',
				formData: {
					phone: '',
					type: 'register',
					code: '',
					pwd: '',
					verificationToken: '',
					repwd: "",
					uname: '',
					inviteCode: '',
					headerPic: '',
					phoneType: ''
				}
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight", "webSiteConfig"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
			this.setPhoneType()
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			setPhoneType() {
				this.formData.phoneType = uni.getSystemInfoSync().deviceModel;
			},
			//返回
			back: function() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			//图像上传
			upload: function() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_TOKEN)
						uni.uploadFile({
							url: this.$config.me_base_url + '/api/user/upImg', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'X-Access-Token': token
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data);
								if (data.code == 200) {
									this.headerPic = data.result.pictureUrl
									this.formData.headerPic = data.result.pictureUrl
								} else {
									pop(data.message, 2000)
								}
							}
						});
					}
				});

			},
			//获取验证码
			getCode: function() {
				if (!this.$refs.uCode.canGetCode) {
					return
				}
				const phone = this.formData.phone
				if (!checkPhone(phone)) {
					pop("请检查手机格式", 2000)
					return false
				}
				let prams = {
					phone: this.formData.phone,
					type: this.formData.type
				}
				uni.$emit("showPop", {
					refName: "Verify",
					data: {
						verifyType: 'Slide',
						check_website: false
					},
					success: async (response) => {
						this.$refs.uCode.start()
						if (response.close) response.close();
						if (response.ticket && response.randstr) {
							prams.ticket = response.ticket
							prams.randStr = response.randstr
						}
						uni.showLoading({mask:true})
						const res = await getVCode(prams).finally(()=>{uni.hideLoading()})

						if (res.code == 200) {
							pop('发送成功', 1000)
							this.isSend = true
							let timerId = setInterval(() => {
								this.countDown--;
								this.sendText = this.countDown + "秒后重试";
								if (this.countDown <= 0) {
									clearInterval(timerId);
									this.countDown = 60;
									this.isSend = false
								}
							}, 1000);
						} else {
							pop(res.message, 2000)
						}
					},
					fail: (e) => {},
				});
			},
			nextBtn: async function() {
				const phone = this.formData.phone
				const code = this.formData.code
				if (!checkPhone(phone)) return false
				if (!codeCheck(code)) return false
				let prams = {
					phone: this.formData.phone,
					type: this.formData.type,
					code: this.formData.code,
				}
				uni.showLoading({mask:true})
				const res = await checkCode(prams).finally(()=>{uni.hideLoading()})
				pop(res.message, 2000)
				if (res.code == 200) {
					this.formData.verificationToken = res.result.verificationToken
					return true
				}
				return false
			},
			verifyData() {
				return new Promise((resolve, reject) => {
					uni.$emit("showPop", {
						refName: "Verify",
						data: {
							verifyType: 'Slide'
						},
						success: (response) => {
							if (response.close) response.close();
							resolve(response)
						},
						fail: reject,
					});
				})
			},
			reg: async function() {
				if(!await this.nextBtn()){
					return
				}
				if (this.formData.pwd != this.formData.repwd) {
					pop('两次输入的密码不一致', 2000)
					return false
				}
				let prams = {
					phone: this.formData.phone,
					pwd: this.formData.pwd,
					phoneType: this.formData.phoneType,
				}
				prams.phoneType = browserPlatformRegionCode()
				prams.verificationToken = this.formData.verificationToken
				const {ticket, randstr} = await this.verifyData()
				prams.ticket = ticket
				prams.randStr = randstr
				uni.showLoading({mask:true})
				regAndLogin(prams).then(res => {
					if (res.code == 200) {
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
							.LOCAL_STORE_USERINFO, res.result.user);
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN,
							res.result.token);
						this.$store.dispatch("initUserInfo");
						this.isGetCode = 3
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				}).finally(()=>{uni.hideLoading()})
			},
			//跳过
			tiaoguo: function() {
				const urlMap = {
					ALL: '/pages/luntan/home/index/Index',
					LIUHE: '/pages/liuhe/indexNew',
					LUNTAN: '/pages/luntan/index'
				}

				uni.reLaunch({
					url: urlMap[this.$config.station] // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			//设置资料
			setData: function() {
				let prams = {
					uname: this.formData.uname,
					inviteCode: this.formData.inviteCode,
					headImgUrl: this.formData.headerPic
				}
				if (prams.uname == '' && prams.inviteCode == '' && prams.headImgUrl == '') {
					this.tiaoguo()
					return
				}
				if ((prams.uname || prams.inviteCode) && prams.headImgUrl == '') {
					pop('请上传头像', 2000)
					return false;
				}
				updateUser(prams).then(res => {
					if (res.code == 200) {
						this.tiaoguo()
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style scoped>
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

	.step {
		color: var(--theme-color);
		font-size: 30rpx;
	}

	.person-icon {
		margin-bottom: 10rpx;
	}

	.van-uploader {
		position: relative;
		display: inline-block;
	}

	.van-uploader__wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.person-icon .van-uploader__input-wrapper {
		height: 116rpx;
		color: #404040;
		font-size: 34rpx;
		display: flex;
		align-items: center;
	}

	.person-icon .van-uploader__input-wrapper .text {
		margin-left: 20rpx;
	}

	.van-uploader__input-wrapper {
		position: relative;
	}

	.person-icon .van-uploader__input-wrapper image,
	.person-icon .van-uploader__input-wrapper span {
		float: left;
	}

	.person-icon .van-uploader__input-wrapper image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 24rpx;
	}
</style>

<style lang="scss" scoped>
	.form-box {
		/deep/ .uni-forms-item__content {
			display: flex;
			align-items: center;
			border-bottom-color: var(--theme-auxiliary-color-default);

			.lh-input-box {
				width: 100%;
			}

			.uni-input-placeholder {
				color: #A1A1A1 !important;
			}
		}
	}

	.zdy-form-box {
		/deep/ .uni-forms-item {
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
				}
			}
		}
	}

	.startCode {
		color: #A1A1A1;
	}
</style>
