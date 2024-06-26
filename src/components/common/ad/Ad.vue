<template>
	<view name="ad-box" class="vant-swiper-body-mini" :class="['theme-' + themeColor.name]">
		<view class="nice-text">
			<view>
				{{ lotteryTypeText }}{{ $t('components.common.ad.text0') }}
				<text style="font-size: 28rpx;color: var(--theme-auxiliary-color-remind);" @click="jump(adInfo)">
					{{ adInfo.content }}
				</text>
				{{ $t('components.common.ad.text1') }}
			</view>
			<label v-if="$config.station !== 'LUNTAN'">
				<view class="adtext" @click="jump(adInfo)">
					{{ $t('components.common.ad.text2') }}
				</view>
			</label>
		</view>
		<!--轮播图-->
		<uni-swiper-dot :info="listPicture" class="swiper-box" :current="current" field="content"
			:dotsStyles="{ bottom: 10, backgroundColor: 'rgb(235,237,240,0.7)', selectedBackgroundColor: 'white', selectedBorder: 'white' }">
			<swiper :autoplay="true" @change="changeSwiper" style="height: 260rpx;width: 694rpx;">
				<swiper-item v-for="(item, index) in listPicture" :key="index">
					<view class="swiper-item" :id="'content-wrap' + index" @click="">
						<image mode="aspectFill" style="height: 260rpx;width: 694rpx;" :src="item.img"
							@click="openUrl(item)" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import {
		advertList,
		buttonInfo
	} from '../../../utils/common/index.js'
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Ad",
		props: {
			listPicture: {
				type: Array,
				default: []
			},
			bindLotteryType: {
				type: Number,
				default: -1
			},
		},
		data() {
			return {
				current: 0,
				//滑块的高度(单位px)
				swiperHeight: 160,
				adInfo: {}
			}
		},
		computed: {
			...mapGetters(["themeColor"]),

			lotteryTypeText() {
				if (this.bindLotteryType == -1 || this.bindLotteryType == undefined) {
					console.error("ad compoment bindLotteryId is undefined")
					return "";
				}
        console.warn("lottery Text",this.bindLotteryType)
				if ([1, 2, 3, 4, 5].indexOf(+this.bindLotteryType) == -1) return "";
				return this.$t(`components.common.ad.lotteryTypeName_${this.bindLotteryType}`);
			},
		},
		mounted() {
			//动态设置swiper的高度
      this.buttonInfo();
    },
		methods: {
			jump(item) {
				openUrl(item)
			},
			//手动切换题目
			changeSwiper(e) {
				this.current = e.detail.current;
				//动态设置swiper的高度，使用nextTick延时设置
			},
			//广告 顶部标题文本 projectType = 1 论坛 code = 5 详情按钮
			buttonInfo: function() {
				let prams = {
					projectType: 1,
					code: 5,
				}
				advertList(prams).then(res => {
					this.adInfo = res.result&&res.result.length>0?res.result[0]:{};
				}).catch(err => {

				})
			},
			openUrl: function(item) {
				openUrl(item)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		// padding: 0 28rpx;
		position: relative;

		.swiper-item {
			border-radius: 12rpx;
			overflow: hidden;
			height: 100%;
		}
	}

	/*::v-deep .uni-swiper__dots-item {*/
	/*	height: 6rpx !important;*/
	/*	width: 29rpx !important;*/
	/*	!*background: linear-gradient(180deg, #FFF 9.60%, var(--dot-bg-rgba) 53.12%, var(--dot-bg-rgba) 100%);*!*/
	/*	!*background-color: rgba(235, 237, 240, 0.7) !important;*!*/
	/*	box-shadow: none;*/
	/*	transition: all .3s;*/
	/*	flex-shrink: 0;*/
	/*	border-radius: 1px !important;*/
	/*}*/

	/*::v-deep .uni-swiper__selected {*/
	/*	width: 48rpx !important;*/
	/*	background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
	/*	border-radius: 1px !important;*/
	/*}*/
	$swiper-size: 14rpx;
	$swiper-active-width: 40rpx;

	::v-deep .uni-swiper__dots-item {
		width: $swiper-size !important;
		height: $swiper-size !important;
		border-radius: calc( #{$swiper-size} / 2 ) !important;
		background: rgba(0, 0, 0, 0.5) !important;
		background-color: rgba(0, 0, 0, 0.5) !important;
		box-shadow: none;
		transition: all .3s;
		flex-shrink: 0;
		/*border-radius: 1px !important;*/
	}

	::v-deep .uni-swiper__selected {
		/*width: 48rpx !important;*/
		/*background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
		/*border-radius: 1px !important;*/
		width: $swiper-active-width !important;
		height: $swiper-size;
		border-radius: calc( #{$swiper-size} / 2 ) !important;
		background: white !important;
	}

	.vant-swiper-body-mini {
		background: #fff;
		padding: 20rpx 0;
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
<style scoped>
	.interaction {
		position: relative;
	}

	.van-col--18 {
		width: 75%;
	}

	.interaction .tool-item {
		margin-right: 15px;
		color: #888;
		font-size: 13px;
	}

	.van-col--6 {
		width: 25%;
	}

	.vant-swiper-body-mini .nice-text {
		/* height: 54rpx; */
		height: auto;
		padding: 0 28rpx;
		color: #404040;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		width: 694rpx;
	}

	.nice-text span {
		color: var(--theme-auxiliary-color-remind);
	}

	.uni-label-pointer {
		width: 136rpx;
		height: 54rpx;
		white-space: nowrap;
		color: var(--theme-auxiliary-color-remind) !important;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12rpx !important;
		border: 1px solid var(--theme-auxiliary-color-remind);
		box-sizing: border-box;
	}
</style>
