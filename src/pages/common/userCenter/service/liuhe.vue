<template>
	<view class="kf-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<view class="kf-content"
			:style="{	background: show?'#fff':'linear-gradient(180deg, #BFE0FF 0%, rgba(191, 224, 255, 0.00) 100%)'}">
			<Header :title="title" :headerStyle="headerStyle" />
			<view class="kf-detail">
				<view class="left">
					<view class="tips">
						<view class="pro">{{ $t("pages.common.userCenter.service.liuhe.text1") }}</view>
						<view class="time">{{ $t("pages.common.userCenter.service.liuhe.text2") }}</view>
					</view>
				</view>
				<view class="right">
					<image src="/static/img/common/userCenter/service/roboto.svg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="menus">
			<button v-for="(item, index) in qqList"
				style="background: #fff;font-size: 30rpx;width: 100%;height: 88rpx;line-height: 88rpx;display: flex; align-items: center; justify-content: center;"
				type="success" @click="handleQq">
				<image style="height: 40rpx;width: 40rpx;margin-right: 10rpx;" src="/static/img/qq.png"></image>
				{{ $t("pages.common.userCenter.service.liuhe.text3") }}{{ index + 1 }}
			</button>
			<view  :text="$t('pages.common.userCenter.service.liuhe.text4')" showUnderLine="false"
				color="#fff">
				<view class="btn" type="default" @click="handleZx">
					<svg class="image" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
						fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M22.5 18V12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12V18H0.5V12C0.5 5.37258 5.87258 0 12.5 0C19.1274 0 24.5 5.37258 24.5 12V18H22.5Z"
							fill="white" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12.5 4.99984C12.5 5.55213 12.9511 5.99111 13.4958 6.0821C16.3356 6.55645 18.5 9.02538 18.5 11.9998C18.5 12.5521 18.9477 12.9998 19.5 12.9998C20.0523 12.9998 20.5 12.5521 20.5 11.9998C20.5 7.91954 17.4453 4.5527 13.498 4.06149C12.95 3.99329 12.5 4.44756 12.5 4.99984Z"
							fill="white" />
						<rect x="1.5" y="16" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
						<rect x="17.4961" y="16" width="6" height="7" rx="1" stroke="white" stroke-width="2" />
					</svg>
					{{ $t("pages.common.userCenter.service.liuhe.text5") }}
				</view>
			</view>
		</view>
		<AlertInjectLayer />
		<u-popup v-model="show" mode="right" width="100%">
			<view class="service-box">
				<Header title="人工客服" :isBack="false" showBack @back="show = false" />
				<web-view class="web-view" :src="serviceUrl" :fullscreen="false" :style="webviewStyles"></web-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		aboutUs
	} from "@/utils/user";
	import {
		mapGetters
	} from 'pinia';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	export default {
		components: {
			AlertInjectLayer,
			Header
		},
		computed: {
			...mapGetters(["themeColor","contantsConfigTypeMap"]),
			serviceUrl() {
				return this.$store?.state?.appInfoStore?.contantsConfigs?.find(item => item.type === '1')?.url
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.$nativeBridge.setStatusBarColor('#BFE0FF')
		},
		data() {
			return {
				show: false,
				webviewStyles: {
					width: '100%',
					height: '100%'
				},
				title: this.$t("pages.common.userCenter.service.liuhe.text6"),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				fontColor: "#fff",
				titleStyle: {
					color: "#fff"
				},
				headerStyle: {
					background: 'transparent',
				},
				qqList: [],
			}
		},
		watch: {
			show(v) {
				this.$nativeBridge.setStatusBarColor(v ? '#FFFFFF' : '#BFE0FF')
			}
		},





		methods: {
			_onShow() {
				this.$nativeBridge.setStatusBarColor(this.show ? '#FFFFFF' : '#BFE0FF')
			},
			handleQq() {
				console.log('点击QQ客服按钮');
			},
			handleZx() {
        let configInfo = this.contantsConfigTypeMap?this.contantsConfigTypeMap['customer_service_setting']:null;
        if( configInfo  &&  parseInt(configInfo.url)==0 ){
          this.$nativeBridge.openUrl(this.serviceUrl)
        }else
          this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .header {
		background: transparent !important;
	}

	.kf-content {
		// background: linear-gradient(180deg, #BFE0FF 0%, rgba(191, 224, 255, 0.00) 100%);

		.kf-detail {
			display: flex;
			justify-content: space-between;
			padding: 0 28rpx;
			align-items: center;
			height: 224rpx;

			.left {
				.tips {
					color: #404040;
					text-align: left;

					font-size: 30rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}
			}

			.right {
				image {
					width: 160rpx;
				}
			}
		}
	}

	.menus {
		margin-top: 60rpx;

		.btn {
			display: flex;
			width: calc(100% - 56rpx);
			height: 88rpx;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			border-radius: 16rpx;
			background: var(--theme-color);
			color: #FFF;

			font-size: 34rpx;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			margin: 0 auto;

			.image {
				margin-right: 20rpx;
			}
		}
	}

	.service-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.web-view {
			flex: 1;

			/deep/ iframe {
				border: none;
			}
		}
	}
</style>
