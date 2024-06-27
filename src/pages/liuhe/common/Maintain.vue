<template>
	<view>
		<uni-popup v-model="show" ref="maintain" type="center" :z-index="zIndex" :class="['theme-' + themeColor.name]">
			<view class="maintain-box" catchtouchmove="catchTouchMove">
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
					<g clip-path="url(#clip0_22326_66882)">
						<path
							d="M41.5898 11.6529L39.3395 13.9126C36.9415 16.3201 33.038 16.3201 30.64 13.9126C28.242 11.5051 28.242 7.58597 30.64 5.17851L32.8903 2.91878C34.1318 1.67105 33.302 0.203322 31.0643 0.552183C28.7052 0.919422 26.525 2.03045 24.8414 3.72336C23.5145 5.05888 22.5408 6.70358 22.0081 8.50923C21.4753 10.3149 21.4003 12.2247 21.7896 14.0666L2.9166 33.0182C1.76467 34.1791 1.11827 35.7483 1.11827 37.3837C1.11827 39.0191 1.76467 40.5883 2.9166 41.7492C3.48686 42.3215 4.16451 42.7756 4.91067 43.0855C5.65684 43.3954 6.45684 43.5549 7.26479 43.5549C8.07273 43.5549 8.87273 43.3954 9.6189 43.0855C10.3651 42.7756 11.0427 42.3215 11.613 41.7492L30.4892 22.7975C31.9879 23.1155 33.5359 23.124 35.0381 22.8226C36.5403 22.5211 37.9651 21.916 39.2251 21.0444C40.4852 20.1728 41.5539 19.053 42.3659 17.7537C43.1778 16.4544 43.7159 15.0029 43.947 13.4883C44.2959 11.2411 42.8344 10.4051 41.5898 11.6529ZM8.71523 38.8357C7.91379 39.6403 6.61578 39.6403 5.81434 38.8357C5.01291 38.0311 5.01291 36.73 5.81434 35.9254C6.20394 35.5591 6.72095 35.3591 7.25562 35.3677C7.7903 35.3764 8.30054 35.5931 8.67805 35.9719C9.05556 36.3506 9.27061 36.8615 9.27755 37.3962C9.28449 37.9309 9.08278 38.4473 8.71523 38.8357ZM6.66607 12.03L13.7721 19.1675L16.673 16.2572L9.56695 9.1197L7.97351 6.06481L2.90089 2.42534L0 5.33566L3.62375 10.4303L6.66607 12.03ZM30.4483 27.1693C30.3534 27.0738 30.2405 26.998 30.1162 26.9463C29.9918 26.8946 29.8585 26.868 29.7239 26.868C29.5892 26.868 29.4559 26.8946 29.3316 26.9463C29.2072 26.998 29.0944 27.0738 28.9994 27.1693L24.6497 31.5379C24.4579 31.7315 24.3504 31.993 24.3504 32.2655C24.3504 32.538 24.4579 32.7995 24.6497 32.9931L34.9112 43.2955C36.5141 44.9015 39.1132 44.9015 40.713 43.2955C42.3158 41.6894 42.3158 39.0808 40.713 37.4717L30.4483 27.1693Z"
							:fill="themeColor.themeAuxiliaryColorRemind" />
					</g>
					<defs>
						<clipPath id="clip0_22326_66882">
							<rect width="44" height="44" fill="white" transform="translate(0 0.5)" />
						</clipPath>
					</defs>
				</svg>
				<view class="name">
					{{ info.name }}
				</view>
				<view class="time-box">
					<view class="time-item">
						<view class="title">北京时间：</view>
						<view class="time"><text>{{ info.startDate }}</text> <text>{{ info.startTime }}</text></view>
						<view class="fg time">--</view>
						<view class="time"><text>{{ info.endDate }}</text> <text>{{ info.endTime }}</text></view>
					</view>
				</view>
				<view class="ok" @click="closeMaintain">我知道了！</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {
	mapGetters
} from 'pinia';
export default {
	name: "Maintain",
	props: {
		zIndex: {
			type: [Number, String],
			default: () => {
				return 10075
			}
		}
	},
	data() {
		return {
			show: false,
			info: {
				name: '',
				timeInfos: []
			}
		}
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
	},
	methods: {
		catchTouchMove: function () {
			return false;
		},
		openMaintain(result) {
			this.info = result
			this.$refs.maintain.open()
		},
		closeMaintain() {
			this.$refs.maintain.close()
		},

		open(params) {
			this.openMaintain(params);
			this.show = true
		},
		close() {
			this.show = false
		},

	}
}
</script>

<style lang="scss" scoped>
.maintain-box {
	width: 600rpx;
	border-radius: 24rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	z-index: 999;
	padding-top: 40rpx;

	image {
		height: 127rpx;
		width: 127rpx;
	}

	.name {
		font-weight: 400;
		font-size: 34rpx;
		color: #404040;
		margin-top: 20rpx;
	}

	.time-box {
		font-weight: 400;
		font-size: 28rpx;
		color: #444444;
		width: 100%;
		justify-content: space-evenly;

		.time-item {
			padding: 0 80rpx;
			font-size: 30rpx;

			.title {
				color: #404040;
				line-height: 57rpx;
				margin: 20rpx 0;
			}

			.time {
				color: #404040;
				display: flex;
				justify-content: space-between;
			}

			.fg {
				justify-content: center;
				margin: 10rpx;
			}
		}
	}

	.ok {
		margin-top: 40rpx;
		width: 100%;
		display: grid;
		place-content: center;
		height: 88rpx;
		background: #FFFFFF;
		border-top: 1px solid var(--theme-auxiliary-color-default);
		font-size: 34rpx;
		text-align: center;
		color: var(--theme-color);
	}
}
</style>
