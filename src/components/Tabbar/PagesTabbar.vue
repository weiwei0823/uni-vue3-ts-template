<template>
	<div class="tabbar tabs" :style="styles">
		<view class="bar" :class="{ selected: current == index }" v-for="(item, index) in barList" :key="index"
			@click="itemClick(item)">
			{{void (barImage =current == index?item.selectedImg : item.img)}}
			<view class="bar-img" v-if="isSvg(barImage)">
				<view v-html="rewriteThemeColor(barImage)"></view>
			</view>
			<image v-else class="bar-img" :src="barImage"></image>
			<!-- <filterIcon :src="current === index ? item.selectedImg : item.img" :width="48" :height="48"
				:filterStyle="'margin-top: 20rpx;'" /> -->
			<text class="text" :style="{color:current == index?themeColor.themeColor:''} ">{{ item.name }}</text>
		</view>
		<!-- <view class="bg-bar"></view> -->
	</div>
</template>

<script>
import {
  mapGetters, mapState
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		data() {
			return {
				enumer: {
					item1: [],
					item2: ['taoliao', 'found'],
					item3: ['my'],

				}
			}
		},
		props: {
			count: {
				type: Number,
				default: () => {
					return 4
				}
			},
			current: {
				type: Number | String,
				default: () => {
					return 0
				}
			},
			barList: {
				type: Array,
				default: () => {
					return []
				}
			},
			activeColor: {
				type: String,
				default: () => {
					return '#01B558'
				}
			},
			bgColor: {
				type: String,
				default: () => {
					return '#9bf7c8'
				}
			},
			textColor: {
				type: String,
				default: () => {
					return "#A1A1A1";
				}
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor", "chatRoomUrl"]),
			styles() {
				return {
					'--activeColor': this.activeColor,
					'--bgColor': this.bgColor,
					'--bgLeft': this.current * 25 + '%',
					'--tabBarCount': this.count,
					'--textColor': this.textColor
				}
			}
		},
		mounted() {
			uni.hideTabBar()
		},
		methods: {
			isSvg(item) {
				let isSvg = false;
				if (item.indexOf('<svg') != -1) isSvg = true;
				return isSvg;
			},

			rewriteThemeColor(svgCode) {
				let afterSvg = svgCode.replaceAll("{color}", this.themeColor.themeColor);
				return afterSvg;
			},

			itemClick(item) {
				if (this.enumer.item1.includes(item.code)) {
					pop('敬请期待', 2000)
					return false
				}
				if (this.$config.is_230720) {
					if (this.enumer.item2.includes(item.code)) {
						pop('敬请期待', 2000)
						return false
					}
				}
				// if ((item.login && !isLogin()) || (this.enumer.item3.includes(item.code) && ['sign','demo'].includes(this.$store.state.appInfoStore.userInfo?.userType))) {
				// 	uni.$emit('showPop', {
				// 		refName: 'AlertMessage'
				// 	})
				// 	return false
				// }
				if (item.path == '') {
					pop('敬请期待', 2000)
					return false
				}
				if (item.code === 'chatRoom') {
					this.$store.dispatch("initOrGetChatRoomInfo").then(charRoomUrl=>{
						if(!charRoomUrl) return console.warn("chatRoom config is null");
						if(charRoomUrl.indexOf("http")!=-1){
							uni.navigateTo({
								url: item.path
							});
						}else {
							pop('聊天室关闭', 2000);
						}
					})
					return
				}
				uni.switchTab({
					url: item.path
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tabbar {
		flex-shrink: 0;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(var(--tabBarCount), 1fr);
		// height: 140rpx;
		position: fixed;
		bottom: 0;
		background-color: #F3F9F6;
		// background-color: #fff;
		z-index: 98;
		max-width: 480px;
		border-top-left-radius: 36rpx;
		border-top-right-radius: 36rpx;
		height: 104RPX;
		padding-bottom: var(--safe-area-inset-bottom);

		.bar {
			display: grid;
			place-items: center;
			color: #646566;
			font-size: 20rpx;
			text-align: center;

			.bar-img {
				width: 48rpx;
				height: 48rpx;
				margin-top: 10rpx;
			}

			.text {
				margin-top: 4rpx;
				// margin-bottom: 12rpx;

				color: var(--textColor);
				text-align: center;

				font-size: 28rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
			}
		}

		.bg-bar {
			content: '';
			position: absolute;
			width: 25%;
			height: 100%;
			border-radius: 20rpx;
			background: var(--bgColor);
			z-index: -1;
			left: var(--bgLeft);
			transition: all .3s;
		}

		.selected {
			color: var(--activeColor);

			.text {
				color: var(--theme-color);
				font-weight: 600;
			}
		}
	}
</style>
