<template>
	<view class="content">
		<p class="t1">访问地区受限</p>
		<image class="img" src="@/static/img/service-limitation.png"></image>
		<p class="t2">亲爱的用户，您好！非常抱歉地通知您：<br>
			由于地区限制，暂时不能在您所在的地区提供服务。<br>
			感谢您的理解与支持。</p>
		<p class="t3">
			Service is not available in your region due to<br>
			district restrictions.<br>
			We really appreciate your support and<br>
			understanding.
		</p>
		<!--        <view class="address">-->
		<!--            IP:127.0.0.1-->
		<!--        </view>-->
		<view class="kefu-link" @click="toKefu">联系客服</view>

	</view>
</template>

<script>
	export default {
		name: "ServiceLimitation",
		desc: "服务受限页面",

		methods: {
			toKefu() {
				//TODO 暂时不知道客服页面地址及处理参数

			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		max-width: 480px;
		text-align: center;
		box-sizing: border-box;
		padding-top: 100rpx;

		.t1 {
			font-size: 30rpx;
			font-weight: bold;
		}

		.img {
			width: 280rpx;
			height: 280rpx;
			margin-bottom: 50rpx;
			margin-top: 50rpx;
		}

		.t2,
		.t3 {
			font-size: 24rpx;
			line-height: 50rpx;
			padding: 0rpx 30rpx;
		}

		.address {
			font-size: 24rpx;
			line-height: 50rpx;
			color: grey;
		}

		.kefu-link {
			font-size: 24rpx;
			line-height: 50rpx;
			color: #00a7ff;
		}
	}
</style>