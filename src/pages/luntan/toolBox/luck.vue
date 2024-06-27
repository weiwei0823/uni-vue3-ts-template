<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight,height:pageHeight}">
		<Header :title="title"></Header>
		<scroll-view scroll-y class="scroll-Y" :style="{height:`${uWindowHeight}px`}">
			<view class="luck-body">
				<image mode="widthFix" src="@/static/img/toolbox/luck/luck-title.svg" class="luck-title"></image>
				<view class="result-box">
					<span v-for="(item, index) in numberList" :class="setClass(item.color)">
						<svg v-if="item.number === '+'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							viewBox="0 0 24 24" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
								fill="#AB0CEB" />
						</svg>
						<template v-else>{{ item.number }}</template>
					</span>
				</view>
				<view class="luck-content">
					<image style="width: 100%;" mode="widthFix" src="@/static/img/toolbox/luck/luck-round_v2.png"
						:class="{ 'active': isTurn }">
					</image>
					<image class="btn" @click="prizeWheel" mode="widthFix" src="@/static/img/toolbox/luck/btn.png">
					</image>
				</view>
				<image mode="widthFix" src="@/static/img/toolbox/luck/luck-sjx.svg" class="luck-j"></image>
				<view class="footer-text"><text class="text">提示：</text>{{ $t('pages.luntan.toolBox.luck.text1') }}
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import {
		prizeWheel
	} from "@/utils/toolbox/index"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "luck",
		components: {
			AlertInjectLayer,
			Header
		},
		computed: {
      ...mapState(useSystemInfoStore, ["uWindowHeight"])
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.luck.title'),
				isTurn: false,
				list: [],
				numberList: [],
				timer: null,
				pageHeight: '100%'
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
		    // 检查 plus 对象是否可用
		    if (typeof plus !== 'undefined') {
		      plus.navigator.setFullscreen(true);
		    } else {
		      document.addEventListener('plusready', () => {
		        plus.navigator.setFullscreen(true);
		      });
		    }
		  },
		methods: {
			setClass(type) {
				if (type == 1) {
					return 'red'
				} else if (type == 2) {
					return 'green'
				} else if (type == 3) {
					return 'blue'
				} else {
					return 'add'
				}
			},
			async prizeWheel() {
				let prams = {}
				if (this.isTurn) {
					return false
				}
				await prizeWheel(prams).then(res => {
					this.list = res.result.animalList
					this.startTurn()
				}).catch(err => {
					console.log(err)
				})
			},
			startTurn() {
				this.isTurn = true
				this.numberList = []
				var i = 0;
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					//TODO
					this.numberList.push(this.list[i])
					if (i == 5) {
						this.numberList.push({
							'color': 0,
							'number': '+'
						})
					}
					if (i >= 6) {
						clearInterval(this.timer)
						this.isTurn = false
					}
					i++
				}, 1000);
			},

		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {
		height: 94vh;
		background: #fff;
	}

	.scroll-Y {
		height: calc(var(--vh) - 90rpx);
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
		background: #6D1F9F;

		.luck-body {
			position: relative;
			height: 1448rpx;
			background: #fff;
			background-image: url('@/static/img/toolbox/luck/luck-bg.png');
			background-size: 100% 100%;

			.luck-title {
				width: 654rpx;
				display: block;
				margin: 0 auto;
				padding-top: 60rpx;
			}

			.result-box {
				margin-top: 10rpx;
				position: relative;
				width: 654rpx;
				height: 164rpx;
				background-image: url('@/static/img/toolbox/luck/luck-top.svg');
				background-size: 100% 100%;
				margin: 10rpx auto;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				overflow: auto;

				image {
					width: 100%;
					position: absolute;
					top: 0;
					left: 48rpx;
				}

				@keyframes toright {
					0% {
						transform: translate(-60px);
						opacity: 0;
					}

					100% {
						transform: translate(0);
						opacity: 1;
					}
				}

				span {
					float: left;
					width: 68rpx;
					height: 68rpx;
					position: relative;
					z-index: 2;
					text-align: left;
					font-size: 34rpx;
					color: #000;
					animation: toright .6s ease-in-out;
					display: grid;
					place-content: center;
					flex-shrink: 0;
					font-weight: 600;

					&+span {
						margin-left: 8rpx;
					}
				}

				.red {
					background: url('@/static/img/qiu/1.svg') no-repeat;
					background-size: contain;
				}

				.blue {
					background: url('@/static/img/qiu/2.svg') no-repeat;
					background-size: contain;
				}

				.green {
					background: url('@/static/img/qiu/3.svg') no-repeat;
					background-size: contain;
				}

				.add {
					text-indent: 0;
					width: 8%;
					color: #fff;
					font-size: 48rpx;
					transform: none;
					animation: none;
					top: 0;
				}
			}

			.luck-content {
				width: 580rpx;
				position: absolute;
				bottom: 420rpx;
				left: 50%;
				z-index: 1;
				transform: translate(-50%);

				.btn {
					width: 180rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}

				.active {
					transition: all 8s;
					transform: rotate(12turn);
				}

				span {
					position: absolute;
					width: 74PX;
					height: 74PX;
					text-align: center;
					padding: 10PX;
					font-weight: 700;
					color: #f5822b;
					border-radius: 50%;
					border: 8rpx solid #f17124;
					box-sizing: border-box;
					font-size: 16PX;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.luck-person {
				width: 65PX;
				position: absolute;
				bottom: 64PX;
				left: 20PX;
			}

			.luck-women {
				width: 104PX;
				position: absolute;
				bottom: 64PX;
				right: 8PX;
			}

			.luck-money {
				width: 61PX;
				position: absolute;
				bottom: 50PX;
				left: 85PX;
			}

			.luck-j {
				width: 580rpx;
				position: absolute;
				bottom: 280rpx;
				left: 50%;
				transform: translate(-50%);
			}

			.footer-text {
				position: absolute;
				padding: 0 28rpx;
				width: 94%;
				color: #fff;
				font-size: 26rpx;
				bottom: 214rpx;
				box-sizing: border-box;

				.text {
					color: var(--theme-auxiliary-color-dot);
				}
			}
		}
	}
</style>
