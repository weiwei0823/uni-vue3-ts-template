<template>
	<u-popup v-model="show" mode="center" border-radius="10" :z-index="zIndex" @open="handleOpen" @close="handleClose">
		<view class="logout" :class="['theme-' + themeColor.name]">
			<view class="img">
				<image src="/static/img/liuhe/user.png"></image>
			</view>
			<view class="msg">
				您还未登录账号
			</view>
			<view class="btn-box">
				<view class="jixu" @click="close">继续试玩3</view>
				<view class="reg-btn" @click="toUrl('/pages/common/reg')">
					立即注册
				</view>
			</view>
			<view class="login-box">
				已有账号，去<text class="login-btn" @click="toUrl('/pages/common/login')">登录</text>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import defaultTemplate from '../../../../utils/defaultTemplate'
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Logout",
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			}
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		data() {
			return {
				show: false,
				callback: null,
			}
		},
		methods: {
			open(_, {
				callback
			}) {
				this.show = true
				this.callback = callback
			},
			close() {
				this.show = false
			},
			handleOpen() {
				this.$emit('open')
				this.callback && this.callback({
					type: 'open'
				})
			},
			handleClose() {
				this.$emit('close')
				this.callback && this.callback({
					type: 'close'
				})
			},
			toUrl(url) {
				this.close()
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.logout {
		height: 485rpx;
		width: 620rpx;
		border-radius: 10rpx;
		background: #FFFFFF;

		.img {
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				height: 130rpx;
				width: 118rpx;
				margin-top: 40rpx;
			}
		}

		.msg {
			margin: 38rpx 0 38rpx;
			font-weight: 600;
			font-size: 34rpx;
			color: #404040;
			text-align: center;
		}

		.btn-box {
			display: flex;
			justify-content: space-evenly;

			.jixu,
			.reg-btn {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 255rpx;
				height: 78rpx;
				border-radius: 10rpx;
			}

			.jixu {
				background: #FFFFFF;
				border: 2rpx solid #B3B3B3;
				font-weight: 600;
				font-size: 26rpx;
				color: #666666;
			}

			.reg-btn {
				background: #5199CA;
				font-weight: 600;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}

		.login-box {
			font-weight: 600;
			font-size: 26rpx;
			text-align: center;
			color: #666666;
			margin-top: 29.5rpx;

			.login-btn {
				color: #5199CA;
				text-align: center;
			}
		}
	}
</style>
