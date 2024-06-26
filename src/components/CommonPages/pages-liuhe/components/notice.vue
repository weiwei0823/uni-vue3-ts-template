<template>
	<view class="notice" :class="['theme-' + themeColor.name]">
		<filterIcon src="/static/imgs-liuhe/index_02/blue/speaker.png" :width="48" :height="48" />
		<view class="notice-bar">
			<u-notice-bar mode="horizontal" color="#A1A1A1" :list="list" :volume-icon="false"></u-notice-bar>
		</view>

		<view class="btn" @click="goto('/pages/common/userCenter/service/index')">
			{{ $t("components.CommonPages.pages-liuhe.components.notice.text1") }}
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {}
		},
		computed: {
			...mapGetters(['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			}
		},
		mounted() {},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .fiterIcon {
		min-width: 48rpx;
	}

	.notice {
		background: #FFF;
		height: 88rpx;
		padding: 0 24rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EBF1EE;

		.icon {
			flex-shrink: 0;
			width: 48rpx;
			height: 48rpx;
		}

		.notice-bar {
			flex: 1;
			width: calc(100% - 200rpx);
		}

		::v-deep.u-notice-bar {
			padding: 0 20rpx !important;
		}

		.btn {
			flex-shrink: 0;
			width: 116rpx;
			height: 48rpx;
			box-sizing: border-box;
			line-height: 32rpx;
			padding: 8rpx 10rpx;
			border-radius: 10rpx;
			background: var(--theme-color);
			color: #FFF;
			font-size: 24rpx;
			font-weight: 500;
			/*display: grid;*/
			place-items: center;
		}
	}
</style>
