<template>
	<view class="previewImg" v-if="showBox" @touchmove.stop.prevent>
		<view class="mask" @click="close">
			<swiper @change="changeSwiper" class="mask-swiper" :current="currentIndex" :circular="circular"
				:duration="duration">
				<swiper-item class="swiper-item" v-for="(src, i) in list" :key="i">
					<scroll-view scroll-y style="max-height: var(--vh);">
						<Watermark :id="`swiper${i}`" :url="src" :width="'100%'" mode="widthFix" :cus="true" />
						<!-- <image class="mask-swiper-img" :src="src" mode="widthFix" /> -->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="pagebox" v-if="list.length > 0">{{ Number(currentIndex) + 1 }} / {{ list.length }}</view>
	</view>
</template>

<script>
	import Watermark from '../common/watermark/index.vue'
	export default {
		name: 'cus-previewImg',
		components: {
			Watermark
		},
		props: {
			list: {
				type: Array,
				required: true,
				default: () => {
					return [];
				}
			},
			circular: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 500
			}
		},
		data() {
			return {
				currentIndex: 0,
				showBox: false
			};
		},
		watch: {
			list(val) {}
		},
		methods: {
			// 左右切换
			changeSwiper(e) {
				this.currentIndex = e.target.current;
			},
			open(current) {
				if (!current) return;
				this.currentIndex = this.list.indexOf(current)
				this.showBox = true;
			},
			close() {
				this.showBox = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin full {
		width: 100%;
		height: 100%;
	}

	.previewImg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999909;
		@include full;

		.mask {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0, 0, 0, .9);
			z-index: 5;
			@include full;

			&-swiper {
				@include full;
				text-align: center;

				&-img {
					@include full;
					max-width: 600px;
				}
			}

			.swiper-item {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.pagebox {
			position: absolute;
			width: 100%;
			bottom: 20rpx;
			z-index: 6;
			color: #fff;
			text-align: center;
		}
	}
</style>