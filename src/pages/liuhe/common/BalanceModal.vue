<template>
	<uni-popup ref="balance" background-color="#fff" :class="['theme-' + themeColor.name]">
		<view class="balance-box">
			<view class="image-item">
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M26.4868 41.5261C26.1744 40.9895 25.5643 40.6766 24.9508 40.7722C23.9892 40.9222 23.0037 41 22 41C11.5066 41 3 32.4934 3 22C3 11.5066 11.5066 3 22 3C32.4934 3 41 11.5066 41 22C41 23.0037 40.9222 23.9892 40.7722 24.9508C40.6766 25.5643 40.9895 26.1744 41.5261 26.4868C42.3742 26.9805 43.5379 26.6138 43.6993 25.6458C43.8971 24.46 44 23.242 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44C23.242 44 24.46 43.8971 25.6458 43.6993C26.6138 43.5379 26.9805 42.3742 26.4868 41.5261Z"
						:fill="themeColor.themeAuxiliaryColorRemind" />
					<path
						d="M28.2351 24.1836C29.2097 24.1836 29.9999 24.9605 29.9999 25.9206C29.9999 26.8789 29.2097 27.6576 28.2351 27.6576H24.7058V29.8287C24.7058 31.028 23.7183 32 22.4999 32C21.2815 32 20.294 31.0281 20.294 29.8287V27.6576H16.7646C15.79 27.6576 15 26.8789 15 25.9206C15 24.9604 15.7901 24.1836 16.7646 24.1836H20.294V22.4466H16.7646C15.79 22.4466 15 21.6681 15 20.7097C15 19.7496 15.7901 18.9727 16.7646 18.9727H20.294V18.8539L16.3778 14.9999C15.6837 14.3163 15.6837 13.2087 16.3778 12.5259C17.0718 11.8431 18.1967 11.8431 18.8908 12.5259L22.4702 16.0482L26.0635 12.5114C26.7575 11.8295 27.8825 11.8295 28.5765 12.5114C29.2706 13.195 29.2706 14.3027 28.5765 14.9855L24.7059 18.7953V18.9726H28.2353C29.2099 18.9726 30 19.7496 30 20.7096C30 21.6681 29.2099 22.4465 28.2353 22.4465H24.7059V24.1836L28.2351 24.1836Z"
						:fill="themeColor.themeAuxiliaryColorRemind" />
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M36 44C40.4183 44 44 40.4183 44 36C44 31.5817 40.4183 28 36 28C31.5817 28 28 31.5817 28 36C28 40.4183 31.5817 44 36 44ZM32.0184 32.0202C32.4089 31.6296 33.0421 31.6296 33.4326 32.0202L36.3262 34.9138L39.2198 32.0202C39.6103 31.6296 40.2434 31.6296 40.634 32.0202C41.0245 32.4107 41.0245 33.0439 40.634 33.4344L37.7404 36.328L40.6322 39.2198C41.0227 39.6103 41.0227 40.2435 40.6322 40.634C40.2417 41.0245 39.6085 41.0245 39.218 40.634L36.3262 37.7422L33.4343 40.634C33.0438 41.0245 32.4106 41.0245 32.0201 40.634C31.6296 40.2435 31.6296 39.6103 32.0201 39.2198L34.912 36.328L32.0184 33.4344C31.6278 33.0439 31.6278 32.4107 32.0184 32.0202Z"
						:fill="themeColor.themeAuxiliaryColorRemind" />
				</svg>
			</view>
			<view class="tips">您的账户余额不足！</view>
			<view class="tips-desc">请充值后完成投注。</view>
			<view class="btn-box">
				<view class="give-up" @click="closeModal">放弃投注</view>
				<view class="recharge" @click="toCharge" :style="setStyle()">立即充值</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		computed: {
			...mapGetters(["themeColor", "userInfo"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			setStyle() {
				return {
					color: this.themeColor.themeColor
				}
			},
			closeModal() {
				this.$refs.balance.close();
			},
			toCharge() {
				uni.navigateTo({
					url: '/pages/common/pay/index'
				})
			},
			open() {
				console.log('this.userInfo',this.userInfo);
				if (['sign'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage',
						data: 'demo'
					})
					return
				}
				this.$refs.balance.open("center");
			}
		}
	}
</script>
<style lang="scss" scoped>
	.balance-box {
		width: 600rpx;
		height: 392rpx;
		box-sizing: border-box;
		padding: 40rpx;
		position: relative;
		border-radius: 40rpx;

		.image-item {
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;

			image {
				height: 160rpx;
				width: 160rpx;
			}
		}

		.tips {
			color: #404040;
			text-align: center;

			font-size: 30rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 56rpx;
		}

		.tips-desc {
			color: #404040;

			font-size: 30rpx;
			font-weight: 400;
			line-height: 56rpx;
			text-align: center;
		}

		.btn-box {
			border-radius: 0 0 20rpx 20rpx;
			border-top: 2rpx solid var(--theme-auxiliary-color-default);
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 88rpx;

			.give-up {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 20rpx;
				color: #404040;
				text-align: center;

				font-size: 34rpx;
				font-weight: 400;
				width: 260rpx;
				height: 48rpx;
				border-right: 1rpx solid var(--theme-auxiliary-color-default);
			}

			.recharge {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 10rpx;
				gap: 10rpx;
				width: 260rpx;
				height: 48rpx;

				font-size: 34rpx;
				font-weight: 400;
			}
		}
	}
</style>
