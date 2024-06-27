<template>
	<view :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<NavBar :title="title"></NavBar>
		<uni-popup ref="dialog" type="dialog" background-color="#fff">
			<uni-popup-dialog message="成功消息" :duration="2000" :before-close="true" @close="close" title=" "
				confirmText="立即退出" cancelText="再考虑一下" @confirm="confirm">
				<view slot="default" class="logout-text">是否要退出登录？</view>
			</uni-popup-dialog>
		</uni-popup>
		<uni-list>
			<uni-list-item showArrow rightText="更换头像" clickable @click="update">
				<view slot="header" class="avatar">
					<image :src='userInfo.headImgUrl' />
				</view>
			</uni-list-item>
			<uni-list-item showArrow :rightText="userInfo.nickname" title="我的昵称" clickable
				@click="toNickname"></uni-list-item>
			<uni-list-item title="更换手机号" showArrow link to="/pages/common/userCenter/setting/phone"></uni-list-item>
			<uni-list-item title="修改密码" showArrow link
				to="/pages/common/userCenter/setting/changePassword"></uni-list-item>
			<uni-list-item title="意见反馈" showArrow link to="/pages/common/userCenter/setting/feedback"></uni-list-item>
			<uni-list-item title="关于我们" showArrow link to="/pages/common/userCenter/setting/aboutUs"></uni-list-item>
			<uni-list-item title="当前版本" :rightText="versioncode"></uni-list-item>
			<uni-list-item title="语言选择" @click="langSelect" clickable
				:rightText="$config.configLanguage.languageSelect.find(item=>item.value === current).name"
				:showArrow="!$config.isForceServerLanguage&&!isEnvLanguage">
			</uni-list-item>

			<uni-list-item :title="$t('common.setting.list6')" @click="themeSelect" clickable
				:showArrow="!$config.isForceServerTheme">

				<template slot="footer">
					<view class="" :style="`font-size: 12px; color:${themeColor.themeColor};`">
						{{$t(`common.setting.${themeColor.name}`)}}
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<button class="logout-btn" @click="logout">退出登录</button>
		<AlertInjectLayer />
		<u-popup ref="multilingual" mode="center" border-radius="24">
			<view class="language-box">
				<view class="title">语言选择</view>
				<view class="radio-list">
					<view class="item" :class="{ active: item.value === current }"
						v-for="(item, index) in $config.configLanguage.languageSelect" @click="current = item.value">
						{{ item.name }}
						<filterIcon :width="48" :height="48" src="@/static/img/liuhe/setting/selected.png"
							v-if="current === item.value" />
						<!-- <image class="img" src="@/static/img/liuhe/setting/selected.png" v-if="current === item.value"> -->
						</image>
					</view>
				</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="langCancel">取消</view>
					<view class="btn confirm-btn" @click="langConfirm">确认</view>
				</view>
			</view>
		</u-popup>

		<u-popup ref="confirmTheme" mode="center" border-radius="24">
			<view class="language-box">
				<view class="title">{{$t("common.setting.list6")}}</view>
				<view class="radio-list">
					<view class="item" :class="{ active: item.id === themeColor.id }"
						v-for="(item, index) in $config.configUIMgr.themeColors" @click="changeTheme(item)">
						{{$t(`common.setting.${item.name}`)}}
						<!-- {{ item.title }} -->

						<filterIcon :width="48" :height="48" src="@/static/img/liuhe/setting/selected.png"
							v-if="item.id === themeColor.id" />
						<!-- <image class="img" src="@/static/img/liuhe/setting/selected.png"
							v-if="item.id === themeColor.id">
						</image> -->
					</view>
				</view>
				<!-- <text>是否立即清空缓存信息？</text> -->
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancelTheme">{{$t(`common.cancel`)}}</view>
					<view class="btn confirm-btn" @click="confirmTheme">{{$t(`common.ok`)}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {
  mapGetters, mapState
} from 'pinia';
	import {
		logout
	} from "@/utils/common/index.js";
	import NavBar from "@/components/common/navBar/navBar";
	import UniFilePicker from "@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker";
	import {
		config
	} from "@/config/config";
	import {
		uploadImg,
		updateAvatar,
		info
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		components: {
			UniFilePicker,
			AlertInjectLayer,
			NavBar
		},
		data() {
			return {
				title: this.$t("liuhe.setting.title"),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				nickname: "186****142616355",
				avatarPath: "",

				current: null,
				isEnvLanguage: false
			}
		},
		onLoad() {
			this.isEnvLanguage = uni.getStorageSync("isEnvLanguage")
			this.current = this.language
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor", "language"]),
			userInfo() {
				return this.$store.state.appInfoStore.userInfo || null;
			},
			versioncode() {
				return this.$store.state.appInfoStore.configs.version_pro || '';
			}
		},
		watch: {
			"$i18n.locale": function() {
				this.title = this.$t("liuhe.setting.title")
			}
		},
		onShow() {

		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			cancelTheme() {
				this.$refs.confirmTheme.close();
			},
			confirmTheme() {
				this.$refs.confirmTheme.close();
			},
			changeTheme(item) {
				this.$store.commit("SET_USER_THEME_ID", item.id);
			},
			themeSelect() {
				if (this.$config.isForceServerTheme) return;
				this.$refs.confirmTheme.open();
			},
			update() {
				let that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: config.me_base_url + '/api/user/upImg',
							header: {
								'X-Access-Token': this.$config.getStorageSync(this.$config.enumMgr
									.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN)
							},
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data);
								this.avatarPath = res.result.pictureUrl
								updateAvatar({
									uname: this.userInfo.nickname,
									headImgUrl: this.avatarPath
								}).then(res => {
									if (res.code === 200) {
										//this.getUserInfo()
										that.$store.dispatch("updateUserInfoProperties", {
											headImgUrl: that.avatarPath
										})
										uni.showToast({
											title: res.message,
										})
									}
								})
							}
						});

						uploadTask.onProgressUpdate((res) => {
							// console.log('上传进度' + res.progress);
							// console.log('已经上传的数据长度' + res.totalBytesSent);
							// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

							// // 测试条件，取消上传任务。
							// if (res.progress > 50) {
							//   uploadTask.abort();
							// }
						});
					}
				});

			},

			toNickname() { //前往我的昵称
				uni.navigateTo({
					url: "/pages/common/userCenter/setting/nickname",
				})
			},
			confirm() {
				logout().then(res => {
					if (res.code === 200) {
						this.$store.dispatch("userLoginOut");
						uni.reLaunch({
							url: "/pages/luntan/home/index/Index"
						});
					} else {
						uni.showToast({
							title: '退出失败',
							duration: 2000,
							icon: "none"
						})
					}
				})
			},
			close() {
				this.$refs.dialog.close()
			},
			logout() { //退出登录
				this.$refs.dialog.open()
				// uni.showModal({
				//   title: '',
				//   content: '是否退出登录',
				//   cancelText:'在考虑一下',
				//   confirmText:'退出',
				//   confirmColor:'rgb(7, 193, 96)',
				//   success: function (res) {
				//     if (res.confirm) {

				//     } else if (res.cancel) {
				//     }
				//   }
				// });


			},
			langSelect() {
				if (this.$config.isForceServerLanguage || this.isEnvLanguage) return;
				// if (this.$config.isForceServerLanguage) return;
				// if (this.$config.station === 'ALL') {
				// 	pop('敬请期待')
				// 	return
				// }

				this.$refs.multilingual.open();
			},
			langCancel() {
				this.current = uni.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE);
				this.$refs.multilingual.close();
			},
			langConfirm() {
				// const l = this.$config.configLanguage.languageSelect.find(item => item.name === this.current)
				uni.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE, this.current);
				uni.setLocale(this.current);
				this._i18n.locale = this.current;
				this.$refs.multilingual.close();
				// location.reload();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.logout-btn {
		margin-top: 14px;
		text-align: center;
		height: 48px;
		line-height: 48px;
		color: #f54545;
		font-size: 16px;
		background: #fff;
	}

	.logout-text {
		font-size: 32rpx;
		color: #404040;
		text-align: center;
		line-height: 44rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.language-box {
		width: 600rpx;
		height: 340rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.title {
			height: 108rpx;
			font-size: 34rpx;
			text-align: center;
			color: #404040;
			display: grid;
			place-items: center;
		}

		.notice {
			flex: 1;
			display: grid;
			align-items: flex-start;
			justify-content: center;
			font-size: 30rpx;
			color: #404040;
			line-height: 56rpx;
		}

		.btn-box {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			.btn {
				display: grid;
				place-content: center;
				font-size: 34rpx;
			}

			.btn+.btn {
				border-left: 1px solid var(--theme-auxiliary-color-default);
			}

			.cancel-btn {
				color: #404040;
			}

			.confirm-btn {
				color: var(--theme-color);
			}
		}
	}

	.language-box {
		height: fit-content;

		.radio-list {
			display: flex;
			flex-direction: column;

			.item {
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				color: #404040;
				font-size: 30rpx;
			}

			.active {
				background: var(--theme-auxiliary-color-default);

				.img {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>
