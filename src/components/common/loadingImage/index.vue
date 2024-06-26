<template>
	<view class="">
		<image v-show="isLoad" :src="src" :mode="mode" @load="onSuccessImg(index)"
			@error="onImageError('newData', index)" :style="`width:${width+unit};height:${height+unit};`"></image>
		<image v-show="!isLoad" :src="loadingImg" :mode="mode" :style="`width:${width+unit};height:${height+unit};`">
		</image>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isLoad: false,
				loadingImg: require("@/static/img/loadingImg.png")
			}
		},
		props: {
			src: String,
			width: Number,
			height: Number,
			mode: {
				type: String,
				default: 'aspectFill'
			},
			unit: {
				type: String,
				default: 'rpx'
			},
		},
		methods: {
			//监听image加载完成
			onSuccessImg(item) {
				this.isLoad = true;

			},
			//监听image加载失败
			onImageError(key, index) {},
		}
	}
</script>

<style>
</style>