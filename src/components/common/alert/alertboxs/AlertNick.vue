<template>
	<u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex">
		<view class="pop-box" :class="['theme-' + themeColor.name]">
			<view class="notice">{{ title }}</view>
			<view class="top">
				用户昵称必须是中文且在三个字以上,
				请修改后再进行发表
			</view>
			<view class="btn-box">
				<view class="btn forget" @click="close">
					知道了
				</view>
				<view class="btn retry" @click="confirm">
					修改昵称
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 999999
				}
			}
		},
		data() {
			return {
				show: false,
				title: this.$t("pages.liuhe.common.text14"),
				closeText: '取消',
				confirmText: '确定',
				isDemo: false
			}
		},
		computed: {
			...mapGetters(['themeColor'])
		},
		watch: {
			show(val) {
				let color = '#ffffff'
				let isLightColor = false
				if (val) {
					color = '#666666'
					isLightColor = true
				}
				setTimeout(() => {
					this.$nativeBridge.setStatusBarColor(color, isLightColor)
				}, 120);
			}
		},
		methods: {
			open(params) {
				if (params && typeof params === 'object') {
					for (const key in params) {
						if (Object.hasOwnProperty.call(params, key)) {
							this[key] = params[key]
						}
					}
				} else if (params === 'demo') {
					this.isDemo = true
					this.closeText = '继续试玩2'
					this.confirmText = '立即注册'
				}
				this.show = true
			},
			confirm() {
				uni.navigateTo({
					url: `/pages/common/setting/setNickname`,
					success: () => {
						this.close()
					}
				})
			},
			close() {
				this.show = false
			},
			login() {
				uni.navigateTo({
					url: "/pages/common/login",
					success: () => {
						this.show = false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box {
		width: 600rpx;
		height: 340rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.notice {
			height: 108rpx;
			font-size: 34rpx;
			text-align: center;
			color: #404040;
			display: grid;
			place-items: center;
		}

		.top {
			flex: 1;
			display: grid;
			align-items: flex-start;
			justify-content: center;
			font-size: 30rpx;
			color: #404040;
			line-height: 56rpx;
			padding: 0 42rpx;
			text-align: center;


			font-weight: 400;
			line-height: 56rpx;
			/* 190.118% */
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

			.forget {
				color: #404040;
			}

			.retry {
				color: var(--theme-color);
			}
		}
	}
</style>
