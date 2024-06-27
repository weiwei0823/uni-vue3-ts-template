<template>
	<view class="fiterIcon " :style="`width:${width}${unit};height:${height}${unit};
			background:${color};
			mask-box-image-source: url(${src}) ;
			mask-box-image-repeat: stretch stretch;
			-moz-mask-box-image-source: url(${src}) ;
			-moz-mask-box-image-repeat: stretch stretch;
			-webkit-mask-box-image-source: url(${src}) ;
			-webkit-mask-box-image-repeat: stretch stretch;
			${filterStyle};`">

		<!--
	该方式不兼容IOS 低版本图标
	<image :src="src" mode="" class="filterImg" :style="`width:${width}${unit};height:${height}${unit};-->
		<!--		transform: translateX(-${width}${unit});-->
		<!--			filter: drop-shadow(${width}${unit} 0px ${color});-->
		<!--			-webkit-filter: drop-shadow(${width}${unit} 0px ${color});-->
		<!--			`" />-->
		<!--		<view :style="{'mask-image':`url(${src})`}"></view>-->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			src: String,
			width: Number,
			height: Number,
			unit: {
				type: String,
				default: 'rpx'
			},
			/**
			 * 是否使用主题色
			 */
			useThemeColor: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			/**
			 * 默认色
			 */
			fillColor: {
				type: String,
				default: () => {
					return "#c8c8c8";
				}
			},
			filterStyle: {
				type: String,
				default: () => {
					return "";
				}
			},
			setColor: {
				type: String,
				default: () => {
					return null;
				}
			}

		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			color() {
				return this.setColor ? this.setColor : this.useThemeColor ? this.themeColor.themeColor : this.fillColor;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.fiterIcon {
		/*display: inline-block;*/
		background-position: 0% 0%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		webkit-mask-box-image-repeat: round !important;

		.filterImg {
			// transform: translateY(-44rpx);
			// filter: drop-shadow(#EFE2DA0 0 44rpx);
			// filter: drop-shadow(44rpx 0 var(--theme-color));

		}
	}
</style>
