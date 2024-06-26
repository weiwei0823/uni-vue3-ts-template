<template>
	<view>
		<view class="prv-down" v-show="isShow">
			<view class="down bg"></view>
			<view class="down">
				<view class="down-btn" @click="down" hover-class="navigator-hover">
					{{ $t('components.common.down.text0') }}
				</view>
				<text>{{ $t('components.common.down.text1') }}</text>
				<text class="downClose">{{ $t('components.common.down.text1') }}</text>
				<svg @click="downClose" class="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
					viewBox="0 0 16 16" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M1.20553 13.935C0.815002 14.3255 0.815001 14.9586 1.20553 15.3492C1.59605 15.7397 2.22922 15.7397 2.61974 15.3492L7.99857 9.97034L13.5195 15.4912C13.91 15.8817 14.5431 15.8817 14.9337 15.4912C15.3242 15.1007 15.3242 14.4675 14.9337 14.077L9.41279 8.55612L15.3477 2.62125C15.7382 2.23072 15.7382 1.59756 15.3477 1.20703C14.9571 0.816511 14.324 0.816511 13.9334 1.20703L7.99857 7.14191L2.20575 1.34909C1.81523 0.958564 1.18206 0.958563 0.791537 1.34909C0.401013 1.73961 0.401013 2.37278 0.791537 2.7633L6.58436 8.55612L1.20553 13.935Z"
						fill="white" />
				</svg>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "down",
		data() {
			return {
				isShow: true
			}
		},
		methods: {
			down() {
				this.$nativeBridge.openUrl("/#/pages/common/userCenter/downloadPage");
			},
			downClose() {
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prv-down {
		width: 100%;

		.down {
			width: 100%;
			max-width: 480px;
			position: fixed;
			text-align: center;
			bottom: 0;
			color: white;
			height: 156rpx;
			z-index: 12;
			font-size: 28rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;

			.close {
				position: absolute;
				right: 30rpx;
				top: 40rpx;
			}

			.down-btn {
				width: 166rpx;
				height: 68rpx;
				box-sizing: border-box;
				color: #fff;
				font-size: 28rpx;
				text-decoration: none;
				background: var(--theme-color);
				padding: 20rpx 0;
				border-radius: 12rpx 0 0 12rpx;
				display: grid;
				place-content: center;
			}

			text {
				text-decoration: none;
				background-color: var(--theme-auxiliary-color-remind);
				width: 166rpx;
				height: 68rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				display: grid;
				place-content: center;
			}

			.downClose {
				background-color: var(--theme-color);
				width: 166rpx;
				height: 68rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				display: grid;
				place-content: center;
				border-radius: 0 12rpx 12rpx 0;
			}
		}

		.bg {
			background: rgba(0, 0, 0, 0.8);
		}
	}
</style>