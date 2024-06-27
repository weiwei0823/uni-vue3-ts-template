<template>
	<view class="setting" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="content">
			<view class="title"><u-icon class="icon" name="error-circle-fill"
					:color="themeColor.themeAuxiliaryColorRemind"
					size="26"></u-icon>{{$t('common.setting.setNickname.title1')}}
			</view>
			<view class="input-box">
				<input class="uni-input" v-model="nickname" :placeholder="$t('common.setting.setNickname.title1')"
					@input="onInput" />
			</view>
			<view class="btn-box" @click="confirmBtn">{{$t('common.ok')}}</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		updateUsername
	} from "@/utils/user/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		limitstr
	} from "@/utils/function";
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "setNickname",
		components: {
			Header,
			AlertInjectLayer
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.setNickname.title"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				nickname: '',
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ['themeColor'])
		},
		mounted() {

			uni.$emit("on_page_mounted", this)

			this.nickname = this.$store.state.appInfoStore.userInfo.nickname
		},
		methods: {
			confirmBtn() { //提交表单
				if (this.nickname == '') {
					pop(this.$t("common.setting.setNickname.pop1"), 2000)
					return false
				}
				updateUsername({
					uname: this.nickname
				}).then(res => {
					if (res.code === 200) {
						uni.$emit('setSucc', {
							msg: this.$t("common.setting.setNickname.setSuccess"),
						})
						backPage()
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
					this.nickname = limitstr(this.nickname, 18);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		background: var(--theme-auxiliary-color-default);
		min-height: var(--vh);


		.content {
			padding: 20rpx 28rpx;

			.title {
				color: #A1A1A1;
				font-size: 26rpx;
				line-height: 44rpx;

				.icon {
					margin: 10rpx;
				}
			}

			.input-box {
				margin-top: 22rpx;
				border-radius: 24rpx;
				background: #fff;
				padding: 0 28rpx;

				.uni-input {
					width: 100%;
					height: 96rpx;
					background: #fff;
					border: none;
					text-align: left;
					color: #404040;
					font-size: 28rpx;
				}
			}

			.btn-box {
				height: 88rpx;
				display: grid;
				place-content: center;
				border-radius: 16rpx;
				background: var(--theme-color);
				color: #FFF;
				font-size: 34rpx;
				margin-top: 60rpx;
			}
		}
	}
</style>
