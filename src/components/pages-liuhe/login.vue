<template>
	<view class="all-login" :class="['theme-' + themeColor.name]">
		<Header @back="backPage">
			<template #right>
				<view class="kefu" @click="toUrl('/pages/common/userCenter/service/index')">联系客服</view>
			</template>
		</Header>
		<view class="content">
			<view class="logo-box">
				<view class="logo">
					<image v-if="logo" mode="widthFix" class="logo-image" :src="logo"></image>
				</view>
				<image class="logo-back" :src="logoBack"></image>
			</view>
			<LHInput class="item" v-model="formData.phone" icon="user" placeholder="请输入账户名称" close />
			<LHInput class="item" v-model="formData.pwd" icon="lock" placeholder="请输入账户密码" close type="password" />
			<view class="item password-item">
				<LHRadio v-model="rememberPassword" class="remember-password">记住密码？</LHRadio>
				<view class="forgot-password" @click="toUrl('/pages/common/userCenter/service/index')">忘记密码？</view>
			</view>
			<view class="item submit" @click="submit">登录</view>
			<view class="item btns">
				<view class="demo" @click="testLogin">试玩</view>
				<view class="register" @click="toUrl('/pages/common/reg')">注册</view>
			</view>
		</view>
		<view class="bottom">
			<text @click="toUrl('/')">先去逛逛</text>
			<u-line margin="0 40rpx" color="#A1A1A1" direction="col" length="24" />
			<text @click="toUrl('/pages/common/userCenter/service/index')">在线客服</text>
		</view>

		<uni-popup ref="confirm" type="center" background-color="#fff">
			<view class="confirm-box">
				<view class="img">
					<image src="@/static/img/liuhe/login/loginErr.png"></image>
				</view>
				<view class="btn-content">{{ errMsg }}</view>
				<view class="btn-box" @click="known">我知道了！</view>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import LHInput from '@/components/common/LHInput/index.vue';
	import LHRadio from '@/components/common/LHRadio/index.vue';
	import defaultTemplate from "@/utils/defaultTemplate";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		login
	} from "@/utils/common/index";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
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
				},
				rememberPassword: false,
				logoMap: {
					blue: require('@/static/img/login-blue-back.png'),
					green: require('@/static/img/login-green-back.png')
				}
			}
		},
		mounted() {
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
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			logoBack() {
				return this.logoMap[this.theme]
			},
			logo() {
				let contantLogoAndNameId = this.$config.enumMgr.CONTANTS_CONFIGS_ID.LOGO_HAD_NAME;
				let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state.appInfoStore
					.contantsConfigTypeMap[contantLogoAndNameId] : null;
				if (!info) return null;
				return info.url;

			},

			handleChangeRememberPassword(e) {
			}
		},
		methods: {
			backPage() {
				backPage()
			},
			testLogin() {
				// 预留res 判断登录失败情况
				this.$store.dispatch("doUserLoginDemo").then((res) => {
					uni.reLaunch({
						url: "/pages/liuhe/home/index?isTest=1"
					})
				}).catch((err)=>{
					pop(err.message,2000)
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
				if (!this.formData.phone) {
					pop('请输入账户名称', 2000)
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
						uni.showLoading({mask:true});
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
							this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO, user);
							this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN, token);
							uni.$emit('loginUpdate', {});
							this.$nextTick(() => {
								// 等store里面的数据初始完成后再进行页面跳转操作
								this.$store.dispatch("appInfoStoreInit").then(()=>{
									this.backPage();
								});
							});
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
					fail: (e) => {
					},
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.all-login {
		height: var(--vh);
		background: var(--theme-auxiliary-color-default);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 120rpx;
		box-sizing: border-box;

		.kefu {
			color: #404040;
			font-size: 30rpx;
			text-align: right;
		}


		.content {
			flex: 1;
			padding: 40rpx 28rpx;
			box-sizing: border-box;

			.logo-box {
				width: 100%;
				height: 216rpx;
				margin-bottom: 10rpx;
				position: relative;
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
		}
	}

	.confirm-box {
		height: 530rpx;
		width: 620rpx;
		border-radius: 10rpx;

		.img {
			display: flex;
			justify-content: center;
			padding: 64rpx 0;

			image {
				height: 136rpx;
				width: 114rpx;
			}
		}

		.btn-content {
			margin: 0 70rpx;
			font-weight: 400;
			font-size: 28rpx;
			line-height: 39rpx;
			text-align: center;
			color: #666666;
		}

		.btn-box {
			height: 60rpx;
			width: 450rpx;
			margin: 64rpx 80rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
			border: 1px solid #3BABAA;
			font-weight: 500;
			font-size: 28rpx;
			line-height: 60rpx;
			text-align: center;
			color: var(--theme-color);
		}
	}
</style>
