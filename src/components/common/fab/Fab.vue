<template>
	<view class="float-box" :class="['theme-' + themeColor.name]">
		<div class="van-overlay" style="z-index: 9998; display: none;" v-show="isOpen" @click="isOpen = false"></div>
		<div class="float-bnt"
			v-if="$config.stationVersionCode != $config.enumMgr.STATION_VERSION_CODE.BETA_LUNTAN_20230720">
			<svg @click="switchBtn" class="icon-btn" :class="{ oft0: isOpen }" width="48" height="48"
				viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="48" height="48" rx="24" :fill="themeColor.themeColor" fill-opacity="0.9" />
				<path v-if="!isOpen" fill-rule="evenodd" clip-rule="evenodd"
					d="M24 12.5C23.1716 12.5 22.5 13.1716 22.5 14V22.5H14C13.1716 22.5 12.5 23.1716 12.5 24C12.5 24.8284 13.1716 25.5 14 25.5H22.5V34C22.5 34.8284 23.1716 35.5 24 35.5C24.8284 35.5 25.5 34.8284 25.5 34V25.5H34C34.8284 25.5 35.5 24.8284 35.5 24C35.5 23.1716 34.8284 22.5 34 22.5H25.5V14C25.5 13.1716 24.8284 12.5 24 12.5Z"
					fill="white" />
				<path v-else
					d="M34 22.5C34.8284 22.5 35.5 23.1716 35.5 24C35.5 24.8284 34.8284 25.5 34 25.5L14 25.5C13.1716 25.5 12.5 24.8284 12.5 24C12.5 23.1716 13.1716 22.5 14 22.5L34 22.5Z"
					fill="white" />
			</svg>
			<div v-show="isOpen" :class="isOpen ? 'icon-tool-btn oft' + (index + 1) : 'icon-tool-btn'"
				v-for="(item, index) in menulist" :key="index" @click="tiaozhuan(item.url)">
				<image :src="item.icon"></image>
				<label>{{ item.text }}</label>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Fab",
		data() {
			return {
				isOpen: false,
				//菜单栏
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
			menulist() {
				let data = [{
						icon: '@/static/img/index/kaijiangxianchang.svg',
						text: this.$t('components.common.fab.Fab.lotteryLive'),
						url: '/pages/luntan/live/Live'
					},
					{
						icon: '@/static/img/index/jiaoliudating.svg',
						text: this.$t('components.common.fab.Fab.masterForum'),
						url: '/pages/luntan/masterForum/index'
					},
					{
						icon: '@/static/img/index/tlsc.svg',
						text: this.$t('components.common.fab.Fab.materialMarket'),
						url: 'taoliao'
					},
					{
						icon: '@/static/img/index/zixuntongji.svg',
						text: this.$t('components.common.fab.Fab.infoStats'),
						url: '/pages/common/informationCount/liuhe'
					},
					{
						icon: '@/static/img/index/home.svg',
						text: this.$t('components.common.fab.Fab.backHome'),
						url: '/'
					},
				]
				return data
			}
		},
		watch: {
			isOpen(val) {
				let color = '#ffffff'
				let isLightColor = false
				if (val) {
					color = '#4c4c4c'
					isLightColor = true
				}
				this.$nativeBridge.setStatusBarColor(color, isLightColor)
			}
		},
		methods: {
			switchBtn: function() {
				this.isOpen = !this.isOpen
			},
			refresh: function() {
				var pages = getCurrentPages(); //获取所有页面的数组对象
				var currPage = pages[pages.length - 1]; //当前页面
				uni.reLaunch({
					url: currPage.$page.fullPath
				})
			},
			//跳转方法
			tiaozhuan: function(url) {
				if (url === 'taoliao') {
					const urlMap = {
						'LUNTAN': '/pages/luntan/taoliao',
						'ALL': '/pages/luntan/market/index'
					}
					url = urlMap[this.$config.station]
				}
				if (this.$route.fullPath === '/' && url === '/') {
					uni.reLaunch({
						url
					});
					return
				}
				uni.switchTab({
					url: url
				})
				uni.navigateTo({
					url: url,
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.van-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 18;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
	}

	.float-box {
		position: fixed;
		width: 100%;
		max-width: 480px;
		z-index: 998999;
		bottom: 0;
	}

	.float-bnt,
	.shuaxin-btn {
		position: absolute;
		right: 32rpx;
		width: 96rpx;
		height: 96rpx;
		z-index: 9999;
	}

	.float-bnt {
		bottom: 352rpx;

		.btn-img {
			width: 120rpx;
		}
	}

	.shuaxin-btn {
		bottom: 105px;
	}

	.float-bnt .icon-btn.oft0 {
		// transform: rotate(180deg);
	}

	.float-bnt .icon-btn {
		width: 96rpx;
		height: 96rpx;
		transition: all .4s;
		position: absolute;
		z-index: 2;
	}

	.float-bnt .icon-tool-btn {
		position: absolute;
		top: 0;
		right: 0;
		text-align: center;
		transition: all .4s;
		opacity: 0;
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
	}

	.float-bnt .icon-tool-btn image {
		width: 96rpx;
		height: 96rpx;
	}

	.float-bnt .icon-tool-btn uni-label {
		color: #fff;
		white-space: nowrap;
		font-size: 28rpx;
		margin-right: 10rpx;
	}

	.float-bnt .icon-tool-btn.oft1 {
		right: 6rpx;
		top: -260rpx;
		opacity: 1;
	}

	.float-bnt .icon-tool-btn.oft2 {
		right: 180rpx;
		top: -170rpx;
		opacity: 1;
	}

	.float-bnt .icon-tool-btn.oft3 {
		right: 260rpx;
		top: -20rpx;
		opacity: 1;
	}

	.float-bnt .icon-tool-btn.oft4 {
		right: 200rpx;
		top: 120rpx;
		opacity: 1;
	}

	.float-bnt .icon-tool-btn.oft5 {
		right: 40rpx;
		top: 220rpx;
		opacity: 1;
	}
</style>
