<template>
	<view class="total-box" :class="['theme-' + themeColor.name,{'total-show': isShow}]">
		<view class="left">
			<view class="img">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
					<g clip-path="url(#clip0_17702_96187)">
						<path
							d="M10.9999 12.4999V13.4999H11.9999H22.8936C22.661 16.0345 21.5497 18.4208 19.7353 20.2353C17.6837 22.2868 14.9012 23.4393 11.9999 23.4393C9.09863 23.4393 6.31615 22.2868 4.26462 20.2353C2.21309 18.1837 1.06055 15.4012 1.06055 12.4999C1.06055 9.59863 2.21309 6.81616 4.26462 4.76462C6.07911 2.95013 8.46538 1.83889 10.9999 1.60632V12.4999Z"
							:stroke="themeColor.themeColor" stroke-width="2" stroke-miterlimit="10" />
						<path
							d="M14.0312 0.560547V10.4684H23.9391C23.9393 9.16726 23.6831 7.87881 23.1853 6.67666C22.6874 5.4745 21.9576 4.38221 21.0375 3.46214C20.1175 2.54208 19.0252 1.81228 17.823 1.31442C16.6209 0.816554 15.3324 0.560388 14.0312 0.560547Z"
							:fill="themeColor.themeColor" />
					</g>
					<defs>
						<clipPath id="clip0_17702_96187">
							<rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
						</clipPath>
					</defs>
				</svg>
			</view>
			<view class="text">合计</view>
		</view>
		<view class="right" :class="total.length <= 2 ? 'center' : ''">
			<view class="list-row">
				<view class="list-item" v-for="(item, index) in total">
					<view class="title">{{ item.title }}</view>
					<view class="money">{{ item.amount }}</view>
				</view>
			</view>
		</view>
		<view class="click-btn" @click="isShow = !isShow" v-if="total.length > 4">
			<svg :class="{ show: isShow }" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
				fill="none">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M24.5607 11.5534C25.1464 12.1392 25.1464 13.0889 24.5607 13.6747C23.9749 14.2605 23.0251 14.2605 22.4393 13.6747L12.8859 4.12132L3.33255 13.6747C2.74676 14.2605 1.79701 14.2605 1.21123 13.6747C0.625439 13.0889 0.625439 12.1392 1.21123 11.5534L11.8253 0.939339C12.4111 0.353554 13.3608 0.353554 13.9466 0.939339L24.5607 11.5534ZM22.2862 20.2722C22.872 20.858 22.872 21.8078 22.2862 22.3936C21.7004 22.9794 20.7506 22.9794 20.1649 22.3936L13.265 15.4937L6.36509 22.3936C5.7793 22.9794 4.82955 22.9794 4.24376 22.3936C3.65798 21.8078 3.65798 20.858 4.24376 20.2722L12.2043 12.3117C12.7901 11.7259 13.7398 11.7259 14.3256 12.3117L22.2862 20.2722Z"
					fill="#A1A1A1" />
			</svg>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "common",
		props: {
			total: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {
			...mapGetters(['themeColor']),
		},
		data() {
			return {
				isShow: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.total-box {
		max-width: 480px;
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		// max-width: calc(480px - 56rpx);
		background: var(--theme-color-bg);
		box-sizing: border-box;
		height: calc(120rpx + var(--safe-area-inset-bottom));
		// height:100rpx;
		z-index: 20;
		animation: 0.3s;
		padding: 10rpx 28rpx;
		padding-right: 0;
		padding-bottom: var(--safe-area-inset-bottom);
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

		// overflow: hidden;

		.click-btn {
			position: absolute;
			z-index: 111;
			right: calc(50%);
			transform: translateX(50%);
			top: -58rpx;

			.show {
				transform: rotate(180deg);
			}
		}

		.left {
			width: 60rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.text {
				font-weight: 400;
				font-size: 30rpx;
				text-align: center;
				color: #404040;
			}
		}

		.center {
			align-items: center !important;
		}

		.right {
			width: 88%;
			display: flex;
			overflow: hidden;
			align-items: start;

			.list-row {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				margin-left: 40rpx;

				.list-item {
					width: calc(50% - 20rpx);
					display: flex;
					justify-content: space-between;
					align-items: center;
					animation: 0.3s;
					font-size: 26rpx;
					margin-bottom: 20rpx;
					line-height: 40rpx;

					.title {
						color: #404040;
					}

					.money {
						color: var(--theme-auxiliary-color-remind);
					}
				}

				.list-item:nth-child(2n) {
					margin-left: 20rpx;
				}

				.list-item:nth-last-of-type(2),
				.list-item:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	.total-show {
		height: auto;
		animation: 0.3s;
	}
</style>
