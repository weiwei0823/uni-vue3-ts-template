<template>
	<view v-if="item.show" :style="{ height: item.height + 'px' }" @click="pictureDetail(item)">
		<view class="content" :style="{ height: `calc(${item.height}px - 20rpx)` }">
			<lazy-image class="lazy-image" :scroll-top="scrollTop" :src="item.pictureUrl" :width="'100%'"
				mode="widthFix">
				<template #loading>
					<image mode="widthFix" class="loading-image" :src="loadingImg"></image>
				</template>
			</lazy-image>
			<view class="image-item-title">{{ item.pictureName }}</view>
		</view>
	</view>
</template>

<script>
	import lazyImage from '@/components/lazy-image/index.vue'
	export default {
		components: {
			lazyImage
		},
		props: {
			scrollTop: Number,
			item: Object,
		},
		data() {
			return {
				loadingImg: '/static/img/zw.png',
			}
		},
		mounted() {
			uni.$on("on-homepage-freshbyconfig", () => {
				this.freshUIByConfigData();
			});
			this.freshUIByConfigData();
		},
		methods: {
			freshUIByConfigData() {
				let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG);
				if (!configData) return console.warn("config data is not loaded");
				this.loadingImg = configData.find(item => item.type === '23')?.url
			},
			pictureDetail: function(item) {
				let url = "/pages/luntan/liuhePicture/detail?id=" + item.pictureId
				uni.navigateTo({
					url: url,
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		background: var(--theme-auxiliary-color-default);
		border-radius: 12rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.lazy-image {
			display: flex;
			flex: 1;

			.loading-image {
				width: 100%;
				height: 100%;
			}
		}


		.image-item-title {
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: #404040;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
