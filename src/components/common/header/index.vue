<template>
	<view class="header-content-box" :class="{'header-content-box-downshow':downloadShow && onlyDownload}">
		<view class="header-box" :class="{ 'is-fixed': isFixed, blueNav: !!isBlueNav }" :style="headerStyle">
			<Download :onlyDownload="onlyDownload" v-if="downloadShow && onlyDownload"/>
			<view class="header" :style="headerInnerStyle">
				<slot name="left">
					<view>
						<svg class="left-icon" @click="handleBack" v-if="(isBack || showBack) && !isForceHideBack"
							xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
							<path
								d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
								:fill="themeColor.themeColor" />
						</svg>
					</view>
				</slot>
				<slot name="center">
					<view class="center">{{ title }}</view>
				</slot>
				<slot name="right"> </slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import Download from "./download.vue";
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			Download
		},
		props: {
			title: String,
			// 是否显示返回按钮 在不可返回时可配置显示返回按钮
			showBack: Boolean,
			// 是否可返回 默认为true 即显示返回按钮并可直接点击返回
			headerInnerStyle: {
				type: Object,
				default: () => {}
			},
			headerStyle: {
				type: Object,
				default: () => {}
			},
			useCustomBack: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isBack: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			isBlueNav: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isFixed: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			nullBackTo: String,
			onlyDownload: {
				type: Boolean,
				default: () => {
					return false;
				}
			}
		},

		mounted() {
			let that = this;
			this.$nextTick(() => {
				// tabbar
				const query = uni.createSelectorQuery();
				query.select('.tabbar').boundingClientRect(data => {
					if (!!data) that.isForceHideBack = true;
				}).exec();

			})

		},

		data() {
			return {
				iconMap: {
					blue: require('@/static/img/all/header/light-blue.png'),
					green: require('@/static/img/all/header/light-green.png')
				},
				isForceHideBack: false
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["downloadShow"]),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			leftIcon() {
				return this.iconMap[this.themeColor.name]
			}
		},
		methods: {
			handleBack() {
				if (this.useCustomBack) {
					this.$emit('back');
					return;
				}
				if (this.isBack) {
					const pages = getCurrentPages();
					const isHaveBack = pages[pages.length - 2];
					if (isHaveBack) {
						backPage();
					} else {
						if (this.nullBackTo) {
							console.log("nyllBack")
							uni.redirectTo({
								url: this.nullBackTo
							})
						} else {
							location.href = '/';
						}

						// location.href = '/'
					}
				}
				this.$emit('back')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.is-fixed {
		position: fixed !important;

		&:has(.downloadShow) {
			z-index: 10000;
		}
	}

	.header-content-box-downshow {
		height: 197rpx !important;
	}

	.header-content-box {
		width: 100%;
		max-width: 480px;
		height: 89rpx;

		/*&:has(.downloadShow) {*/
		/*	background: red;*/
		/*}*/
		.header-box {
			width: 100%;
			max-width: 480px;
			overflow: hidden;

			.header {
				display: grid;
				grid-template-columns: repeat(3, 25% 50% 25%);
				align-items: center;
				justify-content: space-between;
				background: #fff;
				border-radius: 0px 0px 24rpx 24rpx;
				height: 89rpx;
				padding: 0 28rpx;
				position: sticky;
				width: 100%;
				max-width: 480px;
				box-sizing: border-box;
				top: -1rpx;
				z-index: 10;
				flex-shrink: 0;

				.left-icon {
					width: 24rpx;
					height: 42rpx;
				}

				.center {
					color: #404040;
					font-size: 34rpx;
					font-weight: 500;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
