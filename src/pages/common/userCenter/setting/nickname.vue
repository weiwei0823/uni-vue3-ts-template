<template>
	<view class="nickname-warp" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<NavBar :title="title" :isBack="true"></NavBar>
		<view class="nickname-form">
			<uni-forms :modelValue="userInfo">
				<uni-forms-item class="item">
					<input type="text" v-model="userInfo.nickname" placeholder-style="color: #c9c9cb;"
						placeholder="输入您的昵称" @input="onInput" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn primary-btn" @click="submitForm">保存</button>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		updateUsername
	} from "@/utils/user";
	import NavBar from "@/components/common/navBar/navBar";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		limitstr
	} from "@/utils/function";
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			AlertInjectLayer,
			NavBar
		},
		data() {
			return {
				title: "修改昵称",
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				userInfo: {
					userName: ""
				},
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onReady() {
			this.isLogin = global.isLogin()
			if (this.isLogin) {
				this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		methods: {
			back() { //返回
				uni.navigateBack()
			},
			submitForm() { //提交表单
				let that = this;
				updateUsername({
					uname: this.userInfo.nickname
				}).then(res => {
					if (res.code === 200) {
						this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
							this.userInfo)
						uni.showToast({
							title: '昵称修改成功',
						})
						that.$store.dispatch("updateUserInfoProperties", {
							nickname: this.userInfo.nickname
						})

						uni.navigateBack()
					} else if (res.code === 500) {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			},

			onInput() {
				this.$nextTick(function() {
					this.userInfo.nickname = limitstr(this.userInfo.nickname, 18);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nickname-warp {
		background-color: #F8F8F8;
	}

	.nickname-form {
		margin-top: 12rpx;

		.item {
			background-color: #fff;
			padding: 10px 16px;
			overflow: hidden;
			color: #323233;
			font-size: 28rpx;
			line-height: 48rpx;
			height: 48rpx;
		}

		.primary-btn {
			margin-top: 22px;
		}

		.btn.primary-btn {
			width: calc(100% - 22px);
			background: var(--theme-color);
			margin-top: 80rpx;
			height: 48px;
			line-height: 48px;
			color: #fff;
			font-size: 16px;
			text-align: center;
			border-radius: 20px;
		}
	}
</style>
