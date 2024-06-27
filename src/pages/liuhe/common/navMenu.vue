<template>
	<view class="nav-menu" v-show="isShowMenu">
		<u-mask name="alert_advert_instance" v-if="opend" :show="isShowMenu" :z-index="10" class="mask"
			:class="['theme-' + themeColor.name]" @click="closeMenu"> </u-mask>

		<!-- <view class="mask" v-if="isShowMenu" @click="closeMenu"></view> -->
		<view class="menus" :style="setHeight()">
			<scroll-view scroll-y class="show-menu" v-if="isShowMenu">
				<view class="show-menu-item user">
					<view class="item-content">
						<view class="item-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<path
									d="M15.5947 13.7518H8.41465C4.37594 13.7518 1.08984 16.8787 1.08984 20.7218C1.08984 22.5307 2.63749 24 4.53494 24H19.4708C21.3718 24 22.9159 22.5273 22.9159 20.7218C22.9195 16.8787 19.6334 13.7518 15.5947 13.7518ZM12.0047 12.3934C15.5946 12.3934 18.5168 9.61277 18.5168 6.19669C18.5168 2.78061 15.5946 0 12.0047 0C8.41469 0 5.49254 2.78061 5.49254 6.19669C5.49254 9.61277 8.41469 12.3934 12.0047 12.3934Z"
									:fill="themeColor.themeColor" />
							</svg>
						</view>
						<view class="item-user" v-if="userInfo"
							@click="toUrl({ url: '/pages/common/setting/userInfo' })">
							{{ userInfo.nickname || userInfo.userName }}
						</view>

						<view class="item-user" v-else @click="toLogin">
							{{ '登录/注册' }}
						</view>
					</view>
				</view>
				<view :class="index % 2 ? 'show-menu-item active' : 'show-menu-item'" v-for="(item, index) in menuList">
					<view class="item-content">
						<view class="item-icon">
							<image v-if="item.imagePath" :src="item.imgPath"></image>
							<svg v-if="item.svgs" class="image" width="24" height="24" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g>
									<template v-for="svgPathInfo in item.svgs">
										<path v-if="svgPathInfo.path" fill-rule="evenodd" clip-rule="evenodd"
											:d="svgPathInfo.path" :fill="themeColor.themeColor" />
									</template>
								</g>
							</svg>
							<svg v-if="item.svgcode" class="image" width="24" height="24" viewBox="0 0 24 24"
								fill="none" xmlns="http://www.w3.org/2000/svg">
								<g v-html="rewriteSvgColor(item.svgcode)">
								</g>
							</svg>

						</view>
						<view class="item-name" @click="toUrl(item)">
							{{ item.name }}
						</view>
						<view class="switch" v-if="item.isSwitch">
							<view class="custom-switch">
								<!--                <switch :checked="item.isOpen" style="transform:scale(0.7)" :color="themeColor.themeColor" @change="switch1Change(item, index)" />-->

								<view class="custom-switch-open" v-if="item.isOpen" @click="switch1Change(item, index)">
									<svg xmlns="http://www.w3.org/2000/svg" width="42" height="25" viewBox="0 0 49 28"
										fill="none">
										<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)"
											:fill="themeColor.themeColor" />
										<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 47 2)" fill="white" />
									</svg>
								</view>
								<view class="custom-switch-close" v-else @click="switch1Change(item, index)">
									<svg xmlns="http://www.w3.org/2000/svg" width="42" height="25" viewBox="0 0 49 28"
										fill="none">
										<rect width="49" height="28" rx="14" transform="matrix(-1 0 0 1 49 0)"
											fill="#DFDFDF" />
										<circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 26 2)" fill="white" />
									</svg>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>
<script>
	import {
		mapGetters
	} from 'pinia';
	export default {

		props: {
			isShowMenu: {},
			userInfo: {},
			menuList: {},
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			}
		},
		data() {
			return {
				opend: false,
				isIOS: false
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor'])
		},
		watch: {
			isShowMenu(val) {
				if (val) {
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query.selectAll(".nav-menu").boundingClientRect((data) => {
							const heights = data.map(item => item.height + item.top - 20)
							this.dotBottom = Math.max(...heights);
						}).exec();
					})
					this.opend = true;
				}
			},
		},

		mounted() {
			this.win = uni.getStorageSync("isWin");
		},
		methods: {
			setHeight() {
				const isIOS = browserPlatform() == browserPlatform.FLUTTER_App;
				if (uni.$sys.screenHeight < 490) {
					return {
						height: '330px',
						top: isIOS ? '80rpx' : 0
					}
				}
				return {
					top: isIOS ? '80rpx' : 0
				}
			},
			switchWin() {
				this.win = !this.win;
				uni.setStorageSync("isWin", this.win);
			},
			closeMenu() {
				this.$emit("closeMenu")
			},
			toUrl(item) {
				this.$emit("toUrl", item)
			},
			toLogin() {
				this.$emit("toLogin")
			},
			switch1Change(item, index) {
				this.$emit("switch1Change", item, index)
			},
			rewriteSvgColor(svgCode) {
				return svgCode.replaceAll("{color}", this.themeColor.themeColor);
			}
		}
	}
</script>
<style scoped lang="scss">
	.nav-menu {
		display: flex;
		flex-direction: column;
    position: relative;
    z-index: 99;
		.mask {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			width: 100%;
			max-width: 480px;
			margin: auto;
			// height: var(--vh);
			z-index: 11;
		}

		.menus {
			position: absolute;
			right: 20rpx;
			z-index: 11;

			.show-menu {
				width: 432rpx;
				background: #FFF;
				box-shadow: 0 4rpx 12rpx 0 rgba(0, 0, 0, 0.15);
				border-radius: 24rpx;
				overflow: hidden;
				height: 100%;

				.show-menu-item.user {
					background: #FFFFFF;
				}

				.show-menu-item.active {
					background: #FFFFFF;
				}

				.show-menu-item {
					background: var(--theme-auxiliary-color-default);
					//height: 108rpx;
					width: 100%;
					//height: 108rpx;
					border-bottom: 2rpx solid #F1F1F1;
					padding: 28rpx 30rpx;
					font-size: 30rpx;
					color: #535353;
					display: flex;
					box-sizing: border-box;

					.item-content {
						display: flex;
						align-items: center;
						width: 100%;
						padding: 0 28rpx;

						.item-name {
							width: 180rpx;
							flex: 1;
							color: #404040;

							font-size: 30rpx;
						}

						.item-user {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.switch {
							display: flex;
							align-items: center;

							.custom-switch {
								//height: 48rpx;
								display: flex;
								align-items: center;
								margin-left: 36rpx;

								.custom-switch-close {
									width: 84rpx;
									height: 48rpx;
								}

								.custom-switch-open {
									width: 84rpx;
									height: 48rpx;
								}
							}
						}

						.item-icon {
							width: 48rpx;
							height: 48rpx;
							margin-right: 20rpx;

							image,
							.image {
								width: 48rpx;
								height: 48rpx;
							}
						}
					}
				}
			}
		}

	}
</style>
