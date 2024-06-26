<template>
	<u-popup class="popClass" v-model="show" mode="center" border-radius="24" :class="['theme-' + themeColor.name]"
		:z-index="zIndex" @open="handleOpen" @close="handleClose" :mask="false">

		<view class="popBox">
			<image class="pop-logo" :src="logo"></image>
			<view class="close" @click="close"></view>
		</view>

		<!-- <view class="pop-box"> -->
			<!-- 	<svg class="arrow_down" xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32"
				fill="none">
				<mask id="mask0_1348_119081" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30"
					height="33">
					<path d="M0 12L14 0.5L30 12V33H0V12Z" fill="#D9D9D9" />
				</mask>
				<g mask="url(#mask0_1348_119081)">
					<path
						d="M3 11.5H-40.5V-51.5H64.5V11.5H27.5H27.2324L27.084 11.7227L14.8485 30.0772L3.42441 11.7357L3.27763 11.5H3Z"
						fill="#F9FCFD" stroke="#9BA39F" />
				</g>
			</svg> -->
			<!-- <image class="logo" :src="logo"></image>
			<view>

				先点击<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
					<path
						d="M13.2168 14.5017L13.2168 4.97657C13.2168 4.14865 12.468 3.47827 11.5433 3.47827L10.4516 3.47827L10.4516 4.39461L11.5433 4.39461C11.9024 4.39461 12.1933 4.65666 12.1933 4.97657L12.1933 14.5017C12.1933 14.8232 11.9006 15.0837 11.5433 15.0837L1.6729 15.0837C1.31378 15.0837 1.0229 14.8216 1.0229 14.5017L1.0229 4.97657C1.0229 4.65505 1.31558 4.39461 1.6729 4.39461L2.76103 4.39461L2.76103 3.47827L1.6729 3.47827C0.74817 3.47827 -0.000593215 4.14865 -0.000593251 4.97657L-0.000593667 14.5017C-0.000593703 15.3296 0.748169 16 1.6729 16L11.5433 16C12.468 16 13.2168 15.3296 13.2168 14.5017Z"
						fill="#3E73FE" />
					<path d="M7.24609 9.48679L7.24609 1.01831L6.31675 1.01831L6.31675 9.48679L7.24609 9.48679Z"
						fill="#3E73FE" />
					<path
						d="M9.38672 2.66821C9.38672 2.54592 9.33944 2.42201 9.2465 2.32908L7.43835 0.522554L7.01118 0.0953804C6.884 -0.0317936 6.67694 -0.0317936 6.54976 0.0953803L6.12259 0.522554L4.31444 2.33071C4.2215 2.42364 4.17422 2.54756 4.17422 2.66984C4.17422 2.78397 4.21498 2.89647 4.29813 2.98614C4.47911 3.1769 4.77911 3.18016 4.96498 2.99592L6.78128 1.17962L8.59596 2.99429C8.7802 3.17853 9.08183 3.17527 9.26281 2.98451C9.34596 2.89647 9.38672 2.78234 9.38672 2.66821Z"
						fill="#3E73FE" />
				</svg><br />在添加到主屏幕
			</view>
		</view> -->
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "Account",
		props: {
			zIndex: {
				type: [Number, String],
				default: () => {
					return 10075
				}
			},
		},
		data() {
			return {
				show: false,
				callback: null,
				title: '',
				notice: '',
				desc: '',
				detailUrl: '',
				stylesTitle: {},
				stylesText: {}
			}
		},
		computed: {
			...mapGetters(['themeColor']),
			contantsConfigs() {
				return this.$store?.state?.appInfoStore?.contantsConfigs || []
			},
			logo() {
				return this.contantsConfigs.find(item => +item.type === 24)?.url
			},
		},
		mounted() {
			// console.log(this.contantsConfigs, "eqwew")
			// let bindPopSession = window.sessionStorage.getItem("bindPopSafari")
			// if (bindPopSession) {
			// 	return
			// }
			// window.sessionStorage.setItem("bindPopSafari", true)
			// uni.$on('getPop', this.getPop)
		},
		methods: {
			open(data, callback) {
				this.show = true;
				this.callback = callback || null;
			},
			close() {
				this.show = false;
				this.handleClose();
			},
			handleOpen() {
				this.$emit('open');
				this.callback && this.callback({
					type: 'open'
				});
			},
			handleClose() {
				// window.sessionStorage.setItem("bindPopSafari", true)
				this.$emit('close')
				this.callback && this.callback({
					type: 'close'
				})
				// uni.$emit('showPop',{refName:'HomePop'})
			},
			detail() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.popBox{
		width: 374rpx;
		height: 170rpx;
		background: url('/static/img/pop-bg.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		.pop-logo{
			width: 100rpx;
			height: 100rpx;
			position: absolute;
			left: 20rpx;
			top: 18rpx;
		}
		.close{
			position: absolute;
			right: 14rpx;
			top: 14rpx;
			width: 20rpx;
			height: 20rpx;
		}
	}
	.logo {
		width: 100rpx;
		height: 100rpx;
		margin: 0 14rpx;
	}

	.u-drawer {
		// bottom: 146rpx;
	}

	::v-deep .u-mode-center-box {
		background-color: unset !important;
		border-radius: 0 !important;
		// box-shadow: 0px 14px 17px 10px rgba(0, 0, 0, 0.2);
		// box-shadow: 0px 12px 20px 13px rgba(0, 0, 0, 0.2);
	}

	::v-deep .u-mask {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	::v-deep .u-drawer-center {
		justify-content: flex-end;
	}

	::v-deep .u-drawer-content {
		background-color: unset;
		padding-bottom: calc(38rpx + var(--safe-area-inset-bottom));
	}

	.popClass {
		// width: 670rpx;
		// height: 688rpx;
		// width: 670rpx;
		// height: 688rpx;
		width: 100%;
		max-width: 480px;
		top: 108rpx;
	}

	.pop-box {
		// overflow: hidden;
		display: flex;
		align-items: center;

		.arrow_down {
			position: absolute;
			bottom: 0;
		}

		.closePop {
			position: absolute;
			top: 18rpx;
			right: 20rpx;
		}

		filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.40));
		// background-image: url('@/static/img/common/backSave.png');
		// background-size: 100% 100%;
		// background-repeat: no-repeat;
		position:relative;
		width: 374rpx;
		height: 128rpx;
		// margin-bottom: 146rpx;
		border-radius: 32rpx;
		border: 2rpx solid #FFF;
		background: #F9FCFD;
		box-shadow: 0px 4rpx 6rpx 0px rgba(0, 0, 0, 0.20),
		0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.04) inset;
		backdrop-filter: blur(8rpx);


		.header {
			padding-top: 35rpx;

			.title {
				color: #404040;
				text-align: center;
				font-family: MiSans;
				font-size: 27rpx;
				font-weight: 500;
			}

			.description {
				color: #9BA39F;
				text-align: center;
				font-family: MiSans;
				font-size: 22rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}

		.img1 {
			width: 622rpx;
			height: 224rpx;
		}

		.img2 {
			width: 100%;
		}

		.imgBlock {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
