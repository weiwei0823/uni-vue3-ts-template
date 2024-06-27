<template>
	<view class="page-disable" :class="['theme-' + themeColor.name]">
		<view class="page-disable-info">
			<view class="info-header">
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M41 22C41 32.4934 32.4934 41 22 41C11.5066 41 3 32.4934 3 22C3 11.5066 11.5066 3 22 3C32.4934 3 41 11.5066 41 22ZM44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22ZM20 12C20 10.8954 20.8954 10 22 10C23.1046 10 24 10.8954 24 12V22.8534L29.9697 26.3C30.9263 26.8523 31.2541 28.0755 30.7018 29.032C30.1495 29.9886 28.9263 30.3164 27.9697 29.7641L21.0415 25.7641C20.9536 25.7133 20.871 25.6569 20.7939 25.5956C20.3116 25.2304 20 24.6516 20 24V12Z"
						:fill="themeColor.themeAuxiliaryColorRemind" />
				</svg>
			</view>
			<view class="info-content">
				<view class="line1">{{ headInfo.msgTitle }}</view>
				<view class="line2">{{ headInfo.msgDetail }}</view>
			</view>
			<view class="info-footer" @click="yes()" :style="setColor()">
				我知道了！
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'pinia';

	export default {
		props: {
			headInfo: {}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),

		},
		methods: {
			setColor() {
				return {
					color: this.themeColor.themeColor
				}
			},
			yes() {
				this.$emit("yes")
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-disable {
		border-radius: 24rpx;
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 6;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.page-disable-info {
			width: 620rpx;
			height: 492rpx;
			padding: 64rpx 84.5rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 10rpx;
			position: relative;

			.info-header {
				text-align: center;
				margin-bottom: 30rpx;

				image {
					width: 127rpx;
					height: 127rpx;
				}
			}

			.info-content {
				color: #404040;
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;

				.line1 {
					margin-bottom: 39.2rpx;
				}
			}

			.info-footer {
				position: absolute;
				box-sizing: border-box;
				width: 100%;
				height: 88rpx;
				background: #FFFFFF;
				border-top: 1rpx solid var(--theme-auxiliary-color-default);
				text-align: center;
				letter-spacing: -1rpx;
				bottom: 0;
				left: 0;
				color: var(--theme-color);
				text-align: center;

				line-height: 88rpx;
				font-size: 34rpx;
				font-weight: 400;
				border-radius: 0 0 24rpx 24rpx;
			}
		}
	}
</style>
