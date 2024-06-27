<template>
	<view>
		<Download :onlyDownload="onlyDownload" />
		<view class="header">
<!--			<image @click="showDrawer" class="left" :src="`/static/imgs-liuhe/index_02/more.png`"></image>-->
			<!--        <uni-drawer class="left-menu" ref="showLeft" mode="left" :width="80">-->
			<!--			<header-drawer @close="closeDrawer" />-->
			<!--		</uni-drawer>-->

				<view @click="showDrawer" class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_1853_110044)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								  d="M0 3.27279C0 2.6703 0.488417 2.18188 1.09091 2.18188L22.9091 2.18189C23.5116 2.18189 24 2.6703 24 3.2728C24 3.87529 23.5116 4.3637 22.9091 4.3637L1.09091 4.3637C0.488417 4.3637 0 3.87529 0 3.27279ZM0 12.0001C0 11.3976 0.488417 10.9092 1.09091 10.9092L22.9091 10.9092C23.5116 10.9092 24 11.3976 24 12.0001C24 12.6026 23.5116 13.091 22.9091 13.091L1.09091 13.091C0.488417 13.091 0 12.6026 0 12.0001ZM1.09091 19.6364C0.488417 19.6364 0 20.1248 0 20.7273C0 21.3298 0.488417 21.8183 1.09091 21.8183L22.9091 21.8183C23.5116 21.8183 24 21.3298 24 20.7273C24 20.1248 23.5116 19.6364 22.9091 19.6364L1.09091 19.6364Z"
								  fill="#404040" />
						</g>
						<defs>
							<clipPath id="clip0_1853_110044">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
			<view class="logo">
				<imageSvgUrl :url="logo" :width="268" :height="60" replaceThemeTargetColor="#07C160" />
			</view>
			<view class="right">
				<view class="img-box" @click="goto('/pages/liuhe/activity/index', true)">
					<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="34" height="34" rx="17" :fill="themeColor.themeAuxiliaryColorDefault" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M14.3713 9.35143C13.7577 8.64763 12.5996 9.08157 12.5996 10.0153C12.5996 10.4685 12.9015 10.8663 13.338 10.9883L15.7911 11.6737C15.935 11.7139 16.0815 11.6189 16.1036 11.4712C16.1143 11.3992 16.0929 11.3262 16.0451 11.2714L14.3713 9.35143ZM10.5996 10.0153C10.5996 7.23306 14.0506 5.93998 15.8789 8.03716L17.1063 9.44507L18.3337 8.03716C20.162 5.93998 23.6129 7.23306 23.6129 10.0153C23.6129 11.3658 22.7135 12.551 21.4128 12.9145L18.9596 13.5999C18.2977 13.7849 17.6296 13.6537 17.1063 13.3045C16.583 13.6537 15.9148 13.7849 15.2529 13.5999L12.7998 12.9145C11.4991 12.551 10.5996 11.3658 10.5996 10.0153ZM19.8412 9.35143C20.4548 8.64763 21.6129 9.08157 21.6129 10.0153C21.6129 10.4685 21.3111 10.8663 20.8746 10.9883L18.4214 11.6737C18.2776 11.7139 18.131 11.6189 18.109 11.4712C18.0983 11.3992 18.1196 11.3262 18.1674 11.2714L19.8412 9.35143Z"
							:fill="themeColor.themeColor" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M9 12.4009C7.89543 12.4009 7 13.2963 7 14.4009V16.0009C7 17.0701 7.83909 17.9434 8.89472 17.9981V24.0008C8.89472 25.6576 10.2379 27.0008 11.8947 27.0008H22.1051C23.762 27.0008 25.1051 25.6576 25.1051 24.0008V17.9981C26.1608 17.9434 26.9999 17.0701 26.9999 16.0009V14.4009C26.9999 13.2963 26.1044 12.4009 24.9999 12.4009H9ZM23.1051 18.0008H17.8999L17.8999 25.0008H22.1051C22.6574 25.0008 23.1051 24.5531 23.1051 24.0008V18.0008ZM10.8947 18.0009L16.0999 18.0008L16.0999 25.0008H11.8947C11.3424 25.0008 10.8947 24.5531 10.8947 24.0008V18.0009ZM24.9999 16.0009V14.4009L17.8999 14.4009V16.0008H24.1051L24.9999 16.0009ZM16.0999 14.4009L9 14.4009V16.0008H9.89472H16.0999V14.4009Z"
							fill="#A1A1A1" />
					</svg>

					<!-- <image class="img" :src="`/static/imgs-liuhe/index_02/${themeColor.name}/Group.png`"></image> -->
				</view>
				<view class="img-box" @click="goto('/pages/common/userCenter/service/index')">
					<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="34" height="34" rx="17" :fill="themeColor.themeAuxiliaryColorDefault" />
						<g clip-path="url(#clip0_23463_152006)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M25 22V17C25 12.5817 21.4183 9 17 9C12.5817 9 9 12.5817 9 17V22H7V17C7 11.4772 11.4772 7 17 7C22.5228 7 27 11.4772 27 17V22H25Z"
								fill="#A1A1A1" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M17 11.3333C17 11.8856 17.453 12.3222 17.9927 12.4391C20.0932 12.8941 21.6667 14.7633 21.6667 17C21.6667 17.4602 22.0398 17.8333 22.5 17.8333H22.8333C23.2936 17.8333 23.6667 17.4602 23.6667 17C23.6667 13.6567 21.2057 10.8883 17.9965 10.4073C17.4503 10.3254 17 10.781 17 11.3333Z"
								:fill="themeColor.themeColor" />
							<rect x="8" y="20.5" width="4.66667" height="5.5" rx="1" stroke="#A1A1A1"
								stroke-width="2" />
							<rect x="21.3301" y="20" width="4.66667" height="5.5" rx="1" stroke="#A1A1A1"
								stroke-width="2" />
						</g>
						<defs>
							<clipPath id="clip0_23463_152006">
								<rect width="20" height="20" fill="white" transform="translate(7 7)" />
							</clipPath>
						</defs>
					</svg>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerDrawer from './drawer';
	import imageSvgUrl from '@/components/common/imageSvgUrl'
	import {
		mapGetters
	} from 'pinia';
	import Download from "@/components/common/header/download.vue";
	export default {

		props: {
			onlyDownload: {
				type: Boolean,
				default: () => {
					return false;
				}
			}
		},
		data() {
			return {}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),

			//是否登录
			isLogin() {
				return this.$store.state.appInfoStore.userInfo != null;
			},
			logo() {
				let config = this.$store?.state?.appInfoStore?.contantsConfigs?.filter(item => item.type == '26');
				return config && config.length > 0 ? config[0].url : "";
			}
		},
		components: {
			headerDrawer,
			imageSvgUrl,
			Download
		},

		methods: {
			goto(url, isTestPop) {
				if (isTestPop && ['sign','demo'].includes(this.$store.state.appInfoStore.userInfo?.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				uni.navigateTo({
					url
				})
			},
			showDrawer() {
				uni.$emit("open-liuhe-left-menu");
				// this.$refs.showLeft.open();
				this.isEdit = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	/*::v-deep .uni-drawer__content{*/
	/*    width: 80% !important;*/
	/*}*/

	/*::v-deep .uni-drawer{*/
	/*    position: fixed;*/
	/*    width: 100%;*/
	/*    max-width: 480px;*/
	/*    height: 100vh;*/
	/*    margin:0px auto;*/
	/*    z-index: 999;*/
	/*}*/
	.header {
		background: #FFF;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		height: 88rpx;
		padding: 0 28rpx;

		.left {
			width: 48rpx;
			height: 48rpx;

		}

		.logo {
			height: 60rpx;

			/*width: 268rpx;*/
			.img {
				width: 268rpx;
				height: 60rpx;
			}
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.img-box {
				display: grid;
				place-items: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 68rpx;
				background: var(--theme-auxiliary-color-default);

				.img {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.img-box+.img-box {
				margin-left: 28rpx;
			}
		}
	}
</style>
