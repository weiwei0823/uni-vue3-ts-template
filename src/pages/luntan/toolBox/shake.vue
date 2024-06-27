<template>
	<view class="toolbox-warp1 pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`}" class="content" :enhanced="true"
			:bounces="false" :show-scrollbar="false">
			<view class="shake-body" style="">
				<view class="title-box">
					<p class="sub-title">{{ $t('components.common.notice.notice.text0') }}</p>
					<view class="title">{{ content }}</view>
				</view>
				<!-- <view v-if="!accelerometer" class="tips">{{ $t('pages.luntan.toolBox.shake.text0') }}</view> -->
				<view class="shake-img-box">
					<view class="shake-img" @click="friendShake(true)">
						<!-- <view class="shake-img" @click="friendShake(true)"> -->
						<svg xmlns="http://www.w3.org/2000/svg" width="150" height="165" viewBox="0 0 150 165"
							fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M42.7146 30.6786L83.7654 20.1453C90.182 18.4988 96.7239 22.3693 98.3772 28.7902L120.484 114.645C122.137 121.066 118.276 127.606 111.859 129.252L70.8082 139.786C64.3916 141.432 57.8497 137.562 56.1964 131.141L34.0899 45.2859C32.4366 38.865 36.298 32.3251 42.7146 30.6786ZM92.4618 36.3413L110.541 106.557C110.955 108.162 109.989 109.797 108.385 110.208L64.6495 121.431C63.0453 121.842 61.4098 120.875 60.9965 119.269L42.9169 49.0541C42.5036 47.4489 43.469 45.8139 45.0731 45.4023L88.8088 34.18C90.413 33.7684 92.0485 34.736 92.4618 36.3413ZM56.8534 36.6647L74.2974 32.1835C75.1604 31.9618 75.6799 31.0819 75.4577 30.2182C75.2356 29.3545 74.3559 28.834 73.4929 29.0557L56.049 33.537C55.186 33.7587 54.6665 34.6386 54.8886 35.5023C55.1108 36.366 55.9904 36.8864 56.8534 36.6647ZM94.7153 123.829C95.5374 127.022 93.6187 130.274 90.4299 131.092C87.2411 131.91 83.9896 129.985 83.1676 126.793C82.3455 123.6 84.2642 120.348 87.453 119.53C90.6418 118.712 93.8933 120.637 94.7153 123.829Z"
								fill="#A1A1A1" />
							<path
								d="M41.0672 70.5406L41.0667 70.5402L41.0663 70.5399L41.066 70.5397L38.86 69.0147L39.5315 71.6115L54.6498 130.073C54.5941 130.169 54.5276 130.283 54.451 130.414C54.1904 130.861 53.8126 131.506 53.3448 132.298C52.4091 133.881 51.114 136.052 49.6758 138.4C46.7867 143.116 43.3612 148.481 41.1091 151.276C38.896 154.022 37.1263 154.907 35.729 155.042C34.3079 155.18 32.9999 154.576 31.608 153.702C30.9599 153.295 29.2153 151.933 26.8453 150.005C24.5028 148.1 21.611 145.692 18.709 143.243C12.8865 138.327 7.08254 133.293 5.56615 131.788C4.11002 130.343 3.33909 128.918 3.14423 127.7C2.95647 126.526 3.28748 125.48 4.19331 124.628C6.49336 122.464 16.4591 113.308 23.321 107.753C26.9214 104.838 28.6824 101.74 29.1315 98.5137C29.5759 95.3218 28.7147 92.1504 27.3687 89.1123C26.0771 86.1972 25.0413 83.2218 24.3585 80.5725C23.6702 77.902 23.3606 75.6387 23.4657 74.1196C23.5723 72.5787 24.4096 68.869 25.9411 64.8385C27.4734 60.8058 29.6336 56.6342 32.2903 54.0613C34.988 51.4487 37.4736 50.2878 39.9759 50.1293C42.5062 49.969 45.216 50.822 48.3773 52.5686C51.5847 54.3406 56.6135 57.4585 60.8592 60.1462C62.9779 61.4875 64.8948 62.7173 66.2821 63.6118C66.9757 64.059 67.5368 64.4223 67.9243 64.6738C67.9934 64.7186 68.057 64.7599 68.1148 64.7974C68.1247 65.0153 68.1286 65.3062 68.1111 65.6506C68.0697 66.4661 67.9093 67.5587 67.4419 68.6878C66.5358 70.8765 64.4087 73.3794 59.208 74.1368C53.8624 74.9152 49.3121 74.0075 46.096 72.9037C44.4884 72.3519 43.2184 71.7526 42.3555 71.2946C41.9242 71.0657 41.5953 70.8725 41.3776 70.7388C41.2687 70.6719 41.1877 70.62 41.1356 70.5859C41.1095 70.5689 41.0907 70.5564 41.0793 70.5487L41.0677 70.5408L41.0672 70.5406Z"
								fill="#A1A1A1" stroke="white" stroke-width="2" stroke-miterlimit="10" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M83.4658 45.5329L102.845 40.5589C107.26 39.4257 111.761 42.0884 112.899 46.5062C114.038 50.924 111.381 55.424 106.966 56.5571L87.5873 61.5311C83.1724 62.6643 78.6708 60.0016 77.5327 55.5838C76.3946 51.166 79.0509 46.6661 83.4658 45.5329ZM82.9664 67.2074L108.045 60.7696C112.461 59.6362 116.963 62.2992 118.101 66.7177C119.239 71.1362 116.583 75.6369 112.167 76.7704L87.0881 83.2081C82.6726 84.3416 78.1704 81.6785 77.0322 77.2601C75.8941 72.8416 78.5509 68.3408 82.9664 67.2074ZM113.25 80.9899L92.9299 86.2054C88.5149 87.3387 85.8585 91.8387 86.9966 96.2567C88.1347 100.675 92.6365 103.337 97.0515 102.204L117.371 96.9886C121.786 95.8554 124.443 91.3553 123.304 86.9374C122.166 82.5195 117.665 79.8567 113.25 80.9899ZM100.635 105.406L117.015 101.202C121.429 100.069 125.93 102.731 127.069 107.149C128.207 111.566 125.551 116.065 121.136 117.198L104.756 121.402C100.342 122.535 95.8404 119.873 94.7023 115.455C93.5642 111.038 96.2203 106.539 100.635 105.406Z"
								fill="#A1A1A1" />
							<path
								d="M102.845 40.5589L102.595 39.5903L102.595 39.5903L102.845 40.5589ZM83.4658 45.5329L83.7161 46.5015L83.4658 45.5329ZM112.899 46.5062L111.931 46.754L112.899 46.5062ZM106.966 56.5571L106.716 55.5885L106.966 56.5571ZM87.5873 61.5311L87.337 60.5625L87.5873 61.5311ZM77.5327 55.5838L78.501 55.336L77.5327 55.5838ZM108.045 60.7696L107.795 59.801L108.045 60.7696ZM82.9664 67.2074L83.2167 68.176L82.9664 67.2074ZM112.167 76.7704L112.417 77.739L112.167 76.7704ZM87.0881 83.2081L86.8378 82.2395L87.0881 83.2081ZM77.0322 77.2601L76.0639 77.5078L76.0639 77.5078L77.0322 77.2601ZM92.9299 86.2054L92.6796 85.2368L92.9299 86.2054ZM113.25 80.9899L113.5 81.9585L113.25 80.9899ZM86.9966 96.2567L87.965 96.0089L86.9966 96.2567ZM97.0515 102.204L96.8012 101.236L97.0515 102.204ZM117.371 96.9886L117.621 97.9572L117.371 96.9886ZM123.304 86.9374L124.273 86.6896L124.273 86.6896L123.304 86.9374ZM117.015 101.202L116.764 100.233L117.015 101.202ZM100.635 105.406L100.885 106.374L100.635 105.406ZM127.069 107.149L128.037 106.901L127.069 107.149ZM121.136 117.198L121.386 118.167L121.136 117.198ZM104.756 121.402L105.006 122.371L104.756 121.402ZM94.7023 115.455L95.6707 115.208L94.7023 115.455ZM102.595 39.5903L83.2155 44.5643L83.7161 46.5015L103.095 41.5275L102.595 39.5903ZM113.868 46.2584C112.592 41.3053 107.544 38.3198 102.595 39.5903L103.095 41.5275C106.975 40.5317 110.931 42.8716 111.931 46.754L113.868 46.2584ZM107.217 57.5258C112.166 56.2554 115.144 51.211 113.868 46.2584L111.931 46.754C112.931 50.637 110.597 54.5925 106.716 55.5885L107.217 57.5258ZM87.8376 62.4998L107.217 57.5258L106.716 55.5885L87.337 60.5625L87.8376 62.4998ZM76.5643 55.8316C77.8404 60.7847 82.8877 63.7702 87.8376 62.4998L87.337 60.5625C83.4571 61.5584 79.5013 59.2184 78.501 55.336L76.5643 55.8316ZM83.2155 44.5643C78.2662 45.8346 75.2884 50.879 76.5643 55.8316L78.501 55.336C77.5007 51.453 79.8356 47.4975 83.7161 46.5015L83.2155 44.5643ZM107.795 59.801L82.7161 66.2387L83.2167 68.176L108.296 61.7382L107.795 59.801ZM119.07 66.4699C117.794 61.5161 112.746 58.5302 107.795 59.801L108.296 61.7382C112.176 60.7421 116.133 63.0823 117.133 66.9655L119.07 66.4699ZM112.417 77.739C117.367 76.4684 120.346 71.4232 119.07 66.4699L117.133 66.9655C118.133 70.8492 115.798 74.8055 111.917 75.8018L112.417 77.739ZM87.3384 84.1768L112.417 77.739L111.917 75.8018L86.8378 82.2395L87.3384 84.1768ZM76.0639 77.5078C77.34 82.4617 82.3879 85.4476 87.3384 84.1768L86.8378 82.2395C82.9573 83.2356 79.0009 80.8954 78.0006 77.0123L76.0639 77.5078ZM82.7161 66.2387C77.7661 67.5094 74.7879 72.5546 76.0639 77.5078L78.0006 77.0123C77.0002 73.1286 79.3356 69.1723 83.2167 68.176L82.7161 66.2387ZM93.1802 87.1741L113.5 81.9585L112.999 80.0213L92.6796 85.2368L93.1802 87.1741ZM87.965 96.0089C86.9646 92.1257 89.2996 88.1701 93.1802 87.1741L92.6796 85.2368C87.7302 86.5072 84.7524 91.5518 86.0283 96.5045L87.965 96.0089ZM96.8012 101.236C92.9211 102.231 88.9652 99.8914 87.965 96.0089L86.0283 96.5045C87.3043 101.458 92.3518 104.443 97.3017 103.173L96.8012 101.236ZM117.121 96.02L96.8012 101.236L97.3017 103.173L117.621 97.9572L117.121 96.02ZM122.336 87.1852C123.336 91.0683 121.001 95.0239 117.121 96.02L117.621 97.9572C122.571 96.6868 125.549 91.6423 124.273 86.6896L122.336 87.1852ZM113.5 81.9585C117.38 80.9626 121.336 83.3026 122.336 87.1852L124.273 86.6896C122.997 81.7363 117.949 78.7507 112.999 80.0213L113.5 81.9585ZM116.764 100.233L100.385 104.437L100.885 106.374L117.265 102.17L116.764 100.233ZM128.037 106.901C126.761 101.948 121.714 98.9627 116.764 100.233L117.265 102.17C121.144 101.175 125.1 103.514 126.1 107.396L128.037 106.901ZM121.386 118.167C126.335 116.897 129.313 111.853 128.037 106.901L126.1 107.396C127.101 111.279 124.766 115.234 120.886 116.23L121.386 118.167ZM105.006 122.371L121.386 118.167L120.886 116.23L104.506 120.434L105.006 122.371ZM93.734 115.703C95.01 120.656 100.057 123.641 105.006 122.371L104.506 120.434C100.626 121.429 96.6708 119.09 95.6707 115.208L93.734 115.703ZM100.385 104.437C95.4356 105.707 92.4581 110.751 93.734 115.703L95.6707 115.208C94.6703 111.325 97.005 107.37 100.885 106.374L100.385 104.437Z"
								fill="white" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M39.8459 6.34261C41.3428 5.63232 41.9805 3.84306 41.2702 2.34617C40.5599 0.84929 38.7707 0.211626 37.2738 0.92191C22.9357 7.72544 10.6331 18.1712 1.59436 31.2162C0.65073 32.5781 0.989785 34.447 2.35167 35.3907C3.71355 36.3343 5.58254 35.9953 6.52617 34.6334C14.9672 22.4511 26.4561 12.6962 39.8459 6.34261ZM45.6284 18.6654C47.1264 17.9577 47.7671 16.1695 47.0593 14.6714C46.3515 13.1733 44.5633 12.5327 43.0653 13.2404C30.8713 19.0016 20.4153 27.8814 12.7552 38.9814C11.8142 40.3451 12.1568 42.2134 13.5204 43.1545C14.8841 44.0955 16.7525 43.7529 17.6935 42.3893C24.7533 32.1591 34.3899 23.9751 45.6284 18.6654ZM148.349 129.5C149.703 130.454 150.028 132.326 149.073 133.681C140.067 146.463 127.91 156.701 113.781 163.402C112.284 164.112 110.495 163.474 109.785 161.977C109.075 160.48 109.713 158.69 111.21 157.98C124.404 151.723 135.758 142.162 144.168 130.225C145.123 128.87 146.994 128.546 148.349 129.5ZM137.919 125.946C138.873 124.591 138.548 122.72 137.193 121.766C135.839 120.811 133.967 121.136 133.013 122.491C125.98 132.477 116.476 140.467 105.43 145.68C103.932 146.387 103.29 148.175 103.998 149.674C104.705 151.172 106.493 151.813 107.991 151.106C119.975 145.45 130.287 136.78 137.919 125.946Z"
								fill="#A1A1A1" />
						</svg>
					</view>
					<view v-show="isGet" class="shake-num-list">
						<span v-for="(item, index) in numberList" :class="getClass(item.color)">{{ item.number }}</span>
					</view>
				</view>
				<!-- <view class="footer-text">{{ $t('pages.luntan.toolBox.shake.text1') }}</view> -->
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import Notice from "@/components/common/notice/notice";
	import {
		shake
	} from "@/utils/toolbox/index"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "shake",
		components: {
			AlertInjectLayer,
			Header,
			Notice
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.shake.title'),
				content: this.$t('pages.luntan.toolBox.shake.content'),
				styleContent: {
					'font-size': '24rpx',
					'margin-top': '6rpx',
					'line-height': '28rpx',
					'text-align': 'left',
					'box-sizing': 'border-box',
					padding: '0 20rpx'
				},
				isGet: false,
				numberList: [],
				// 是否成功开启监听加速度
				accelerometer: false,
				winHeight: 0,
				lastMSg: {},
				isApp: false
			}
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor'])
		},
		mounted() {
			uni.$emit("on_page_mounted", this);
			if (browserPlatform() == browserPlatform.FLUTTER_App) {
				window.flutter_inappwebview.callHandler("startShake");
				this.$nativeBridge.on("shakeCallback", (msg) => {
					if (msg) {
						const lastAcc = this.lastMSg;
						const event = JSON.parse(msg)
						const delA = Math.abs(event.y - lastAcc.y);
						const delB = Math.abs(event.x - lastAcc.x);
						const delG = Math.abs(event.z - lastAcc.z);
						if ((delA > 15 && delB > 15) || (delA > 15 && delG > 15) || (delB > 15 || delG > 15)) {

							this.shakeReq()
						}
						this.lastMSg = event;
					}
				}, this);
			}

		},
		methods: {
			getClass(color) {
				if (color == 1) {
					return 'red'
				} else if (color == 2) {
					return 'blue'
				} else {
					return 'green'
				}
			},
			// 开启监听加速度
			startAccelerometer() {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.startAccelerometer({
						success() { //开启成功后也要 添加监听的呀
							_this.accelerometer = true;
							_this.friendShake();
							resolve()
						},
						fail(res) {
							uni.showModal({
								title: "开启监听加速度失败",
								content: res.errMsg
							})
							_this.accelerometer = false
							reject(res)
						}
					})
				})
			},
			async friendShake(boo) {
				if (boo === true && this.isApp) return;
				this.shakeReq()
				let _this = this;
				if (!_this.accelerometer) {
					// 点击按钮 授权 并且手动触发结果
					await this.startAccelerometer();
					// return  _this.shakeReq()
				}
				uni.onAccelerometerChange(async (res) => {
					// 自己根据自己的力度调节 变量大小 满足自己设定的值后触发自己的逻辑
					if (Math.abs(res.x) > 30 || Math.abs(res.y) > 30 || Math.abs(res.z) > 30) {
						// 进入判断后 相当于摇一摇成功
						_this.shakeReq()
					}
				});
			},
			shakeReq() {
				let prams = {
					jpushId: Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000,
					create: 1,
				}
				shake(prams).then(res => {
					this.numberList = res.result.numberList
					this.isGet = true
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.toolbox-warp1 {
		height: 94vh;

		.shake-body {
			position: relative;
			min-height: calc(var(--vh) - 90rpx);
			background: var(--theme-auxiliary-color-default);
			width: 100%;
			box-sizing: border-box;
			padding-top: 20rpx;
			display: flex;
			flex-direction: column;

			.title-box {
				padding: 20rpx 28rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				background: #fff;
				border-radius: 24rpx;
				color: #404040;
				font-size: 28rpx;

				.sub-title {
					font-size: 30rpx;
				}

				.title {
					margin-top: 20rpx;
					text-align: center;
				}
			}

			.tips {
				font-size: 20rpx;
				color: red;
				text-align: center;
				margin-top: 10rpx;
			}

			.shake-img-box {
				flex: 1;
				border-radius: 24rpx 24rpx 0 0;
				background: #fff;
				margin-top: 20rpx;
				position: relative;

				.shake-img {
					display: block;
					margin: 0 auto;
					width: 360rpx;
					height: 360rpx;
					margin-top: 160rpx;
					display: grid;
					place-content: center;
				}

				.shake-num-list {
					width: 520rpx;
					height: 108rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;
					background: var(--theme-auxiliary-color-default);
					border-radius: 24rpx;
					margin-top: 40rpx;

					span {
						height: 68rpx;
						width: 68rpx;
						font-size: 32rpx;
						color: #000;
						display: grid;
						place-content: center;
						font-weight: 600;

						&+span {
							margin-left: 40rpx;
						}
					}

					.red {
						background: url('@/static/img/qiu/1.svg');
						background-size: contain;
					}

					.blue {
						background: url('@/static/img/qiu/2.svg');
						background-size: contain;
					}

					.green {
						background: url('@/static/img/qiu/3.svg');
						background-size: contain;
					}
				}
			}

			.footer-text {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				color: #404040;
				font-size: 24rpx;
				text-align: center;
				line-height: 34rpx;
				bottom: 34rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
