<template>
	<view :class="{'download-box':true,'downloadShow':downloadShow && onlyDownload }">
		<svg @click="close" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
			<g opacity="0.9">
				<path
					d="M1.62272 0.278412C1.2515 -0.0928038 0.649636 -0.0928042 0.278415 0.278412C-0.0928048 0.649628 -0.0928048 1.25149 0.278415 1.6227L5.65564 6.99987L0.278415 12.377C-0.0928053 12.7483 -0.0928049 13.3501 0.278415 13.7213C0.649636 14.0926 1.2515 14.0926 1.62272 13.7213L6.99995 8.34417L12.3773 13.7214C12.7485 14.0927 13.3504 14.0927 13.7216 13.7214C14.0928 13.3502 14.0928 12.7484 13.7216 12.3771L8.34426 6.99987L13.7215 1.62271C14.0927 1.25149 14.0927 0.649628 13.7215 0.278412C13.3503 -0.0928041 12.7484 -0.0928036 12.3772 0.278413L6.99995 5.65558L1.62272 0.278412Z"
					fill="#404040" />
			</g>
		</svg>
		<image class="logo" :src="logo"></image>
		<view class="">
			<view class="text">{{ appName }}</view>
			<view class="description">{{ appDescription }}</view>
		</view>
		<view class="right" ref="download">
			<view class="btn" @click="handleDownload">立即下载</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			onlyDownload: {
				type: Boolean,
				default: () => {
					return false;
				}
			}
		},
		computed: {
			...mapGetters(["themeColor", "downloadShow", "uWindowHeight", "webSiteConfig", "windowBottom"]),
			contantsConfigs() {
				return this.$store?.state?.appInfoStore?.contantsConfigs || []
			},
			logo() {
				return this.contantsConfigs.find(item => item.type == '22')?.url
			},
			appName() {
				return this.contantsConfigs.find(item => item.type == '21')?.url
			},
			appDescription() {
				return this.contantsConfigs.find(item => item.type == 'downloadText')?.url
			},

		},
		mounted() {
			if (this.webSiteConfig.website_app_download_switch === 0 || !this.onlyDownload) {
				this.close()
			}
			if (browserPlatform() === browserPlatform.FLUTTER_App || !/Mobile/i.test(navigator.userAgent)) {
				this.close()
			}
		},
		methods: {
			close() {
				console.log("close")
				this.$store.dispatch("setDownloadShow", false);
			},
			handleDownload() {
				const userAgent = navigator.userAgent;
				let url = ''
				if (/Android/i.test(userAgent)) {
					console.log("android");
					url = this.contantsConfigs.find(item => item.type == '14')?.url
				} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
					console.log("ios",this.contantsConfigs);
					url = this.contantsConfigs.find(item => item.type == '15')?.url
				}
				console.log("url=",url);
				url && this.$nativeBridge.openUrl(url);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.download-box {
		background: var(--theme-auxiliary-color-linear-gradient-end);
		height: 0;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 0 28rpx;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;

		.logo {
			width: 88rpx;
			height: 88rpx;
			margin: 0 20rpx;
		}

		.text {
			color: #404040;
			font-size: 36rpx;
			font-weight: 500;
			margin-right: 20rpx;
		}

		.description {
			width: calc(100vw - 380rpx);
			color: #404040;
			font-family: MiSans;
			font-size: 24rpx;
			font-weight: 400;

			overflow: hidden; //超出隐藏
			white-space: nowrap; //让文字不换行显示
			text-overflow: ellipsis;
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;

			.btn {
				width: 160rpx;
				height: 60rpx;
				background: var(--theme-color);
				display: grid;
				place-content: center;
				border-radius: 10rpx;
				color: #FFF;
				font-size: 30rpx;
			}
		}
	}

	.downloadShow {
		height: 108rpx;
	}
</style>
