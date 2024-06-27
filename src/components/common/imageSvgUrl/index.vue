<template>
	<!-- <svg aria-hidden="true">
		<use :xlink:href="url"></use>
	</svg> -->
	<view class="" :style="{ width: width + 'rpx', height: height + 'rpx' }" v-if="isSvg">
		<view class="docenter" v-if="svgbaseCode" v-html="svgFormartCode">
		</view>
	</view>
	<image :src="url" v-else :style="{ width: width + 'rpx', height: height + 'rpx' }" mode="heightFix"></image>
	<!-- <image class="img" :src="svgUrl" v-if="isSvg"></image> -->
	<!-- <image class="img" :src="svgUrl" v-if="isSvg"></image> -->
</template>

<script>
import {
	mapGetters
} from 'pinia';
import {
	requestSvg
} from '@/utils/common/index.js'
export default {
	props: {
		url: String,
		width: Number,
		height: Number,


		replaceThemeTargetColor: {
			type: String,
			default: null,
		},
		replaceThemeTargetColorArray: {
			type: Array,
			default: () => []
		}
	},
	watch: {
		url(value) {
			this.freshSvgCode();
		}
	},


	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
		isSvg() {
			return this.url && this.url.indexOf(".svg") > -1;
		},
		svgFormartCode() {
			let baseCode = this.svgbaseCode;
			let widthFill = this.width ? `width="${this.width}"` : '';
			let heightFill = this.height ? `height="${this.height}"` : '';
			baseCode = baseCode.replace(/width="\d+"/, widthFill);
			baseCode = baseCode.replace(/width='\d+'/, widthFill);
			baseCode = baseCode.replace(/height="\d+"/, heightFill);
			baseCode = baseCode.replace(/height='\d+'/, heightFill);
			if (this.replaceThemeTargetColor) {
				baseCode = baseCode.replaceAll(this.replaceThemeTargetColor, this.themeColor.themeColor);
			}
			if(this.replaceThemeTargetColorArray.length){
				this.replaceThemeTargetColorArray.forEach(item=>{
					baseCode = baseCode.replaceAll(item, this.themeColor.themeColor);
				})
			}
			return baseCode;
		},
	},
	data() {
		return {
			svgbaseCode: null,


		}
	},
	created() {
		//this.svgUrl()
		this.freshSvgCode();
	},
	methods: {
		async freshSvgCode() {
			if (!this.isSvg) return;
			let that = this;
			this.svgbaseCode = null;
			uni.request({
				url: that.url, //"https://d2mcyo14dlbqje.cloudfront.net/cs100001/manage/a635163eb8664e8e8130190f837268de.svg",
				success: (r) => {
					that.svgbaseCode = r.data;
				}
			});
		}
	}
}
</script>
<style lang="scss" scoped>
.docenter {
	width: 100%;
	height: 100%;
	justify-items: center;
	align-items: center;
	display: flex;
}
</style>
