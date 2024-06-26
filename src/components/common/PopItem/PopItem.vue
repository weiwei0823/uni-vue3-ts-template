<template>
	<view class="pop-box">
		<view class="title">温馨提示</view>
		<view class="top">
			{{ msg }}
		</view>
		<view class="btn-box">
			<view class="forget" @click="close">关闭</view>
			<view class="retry" @click="forget">联系客服</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "PopItem",
		props: {
			msg: {
				type: String,
				default: ''
			}
		},
		methods: {
			forget() {
				uni.navigateTo({
					url: '/pages/common/userCenter/service/index'
				})
			},
			close() {
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box {
		width: 640rpx;
		border-radius: 24rpx;
		background: #FFFFFF;

		.title {
			color: #404040;
			text-align: center;

			font-size: 34rpx;
			font-style: normal;
			font-weight: 400;
			text-align: center;
			padding: 20rpx 0;
		}

		.top {
			height: 180rpx;
			padding: 0 50rpx;
			border-bottom: 1px solid #EBEBEB;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			color: #404040;
			text-align: center;

			font-size: 30rpx;
		}

		.btn-box {
			height: 100rpx;
			display: flex;

			.forget {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 600;
				font-size: 34rpx;
				// color: var(--theme-color);
				color: #404040;
				border-right: 1px solid #EBEBEB;
			}

			.retry {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 600;
				font-size: 34rpx;
				color: var(--theme-color);
			}
		}
	}
</style>