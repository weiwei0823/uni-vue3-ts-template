<template>
	<!-- <view class="warterMark" :id="`warterMark${id}`" :style="{width:mode&&svgWidth?svgWidth:width,
        height:mode&&svgHeight?svgHeight:height,borderRadius:'16rpx',overflow:'hidden'}">
		<canvas :ref="id" :id="id" :canvas-id="id" type="2d" :style="{width:mode&&svgWidth?svgWidth:width,
        height:mode&&svgHeight?svgHeight:height
       }" />
	</view> -->
	<view class="imgBlock" :style="{width:width,height:height}">
		<image class="imgaa" :src="url" :mode="mode" :style="{width:width,height:height}" @load="load" @error="error">
		</image>
		<view class="text" :style="{fontSize}">{{text}}</view>
		<!-- <view v-if="mode" class="warterMark" :id="`warterMark${id}`" :style="{width:svgWidth,
	    height:svgHeight,borderRadius:'16rpx',overflow:'hidden'}">
			<canvas :ref="id" :id="id" :canvas-id="id" type="2d" :style="{width:svgWidth,
	    height:svgHeight
	   }" />
		</view>
		<view v-else class="warterMark" :id="`warterMark${id}`" :style="{width:width,
	    height:height,borderRadius:'16rpx',overflow:'hidden'}">
			<canvas :ref="id" :id="id" :canvas-id="id" type="2d" :style="{width:width,
	    height:height
	   }" />
		</view> -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';

	export default {
		props: {
			url: String,
			width: String,
			height: String,
			id: String,
			mode: String,
			cus: false
		},
		watch: {
			url(value) {
				// this.freshSvgCode();
			}
		},

		mounted() {


		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			contantsConfigs() {
				return this.$store?.state?.appInfoStore?.contantsConfigs || []
			},
			text() {
				return this.contantsConfigs.find(item => item.type == '21')?.url
			}

		},
		data() {
			return {
				svgbaseCode: null,
				fontSize: null,

			}
		},
		created() {
			//this.svgUrl()
		},
		methods: {
			computeFontSize(str, size) {
				let spanDom = document.createElement("span");
				spanDom.style.fontSize = size;
				spanDom.style.opacity = "0";
				spanDom.style.whiteSpace = "nowrap";
				// spanDom.style.fontFamily = family;
				spanDom.innerHTML = str;
				document.body.append(spanDom);
				let sizeD = {};
				sizeD.width = spanDom.offsetWidth;
				sizeD.height = spanDom.offsetHeight;
				spanDom.remove();
				return sizeD.width;
			},
			countSize() {
				setTimeout(() => {
					let offWidth;
					let text = this.text || "    ";
					if (this.cus) {
						offWidth = document.body.offsetWidth
					} else {
						offWidth = document.querySelector(".imgBlock").offsetWidth;
					}
					// console.log(offWidth)
					// 图片宽度 * 75% * 输入文字个数 = 单个字体大小
					const size = (offWidth * 0.75) / text.length + 'px';
					// console.log("size", size)
					this.fontSize = size
				}, 500)
			},
			// countSize() {
			// 	let offWidth;
			// 	if (this.cus) {
			// 		offWidth = document.body.clientWidth
			// 	} else {
			// 		offWidth = document.querySelector(".text").offsetWidth;
			// 	}
			// 	const size = (offWidth * 0.75) / 2.5 + 'px';

			// 	const sizeD = this.computeFontSize(this.text, size)
			// 	if (sizeD > offWidth * .75) {

			// 	}
			// 	this.fontSize = size
			// 	console.log(size, "sizesize", offWidth, sizeD)
			// },
			load() {
				this.countSize();
				this.$emit("load")
			},
			error() {
				this.$emit("error")
			}

		}
	}
</script>
<style lang="scss" scoped>
	.imgBlock {
		width: 100%;
		height: 100%;
		justify-items: center;
		align-items: center;
		display: flex;
		position: relative;
	}

	.text {
		// font-size: 45rpx; 88
		// font-size: 90rpx; 180
		color: rgba(0, 0, 0, .5);
		position: absolute;
		// white-space: nowrap;
		text-align: center;
		width: 100%;

	}
</style>
