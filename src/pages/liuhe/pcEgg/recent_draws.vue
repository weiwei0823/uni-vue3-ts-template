<template>
	<view class="history-draws" :style="{ paddingTop: statusBarH,height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<scroll-view scroll-y class="record-list"
			:style="{height: `calc(${uWindowHeight}px - 100rpx - 140rpx - ${isApp?20:0}rpx)`}">
			<uni-list class="list-row">
				<uni-list-item class="list-rol" direction="column" v-for="(item, index) in dataList">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box">
							<uni-row class="header-row">
								<uni-col class="header-col" :span="14">
									<span class="period">第{{ item.lotteryNo }}期</span>
								</uni-col>
								<uni-col class="header-col time-box" :span="10">
									<span class="time">{{ formatDate(item.lotteryTime) }}</span>
								</uni-col>
							</uni-row>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="draws">
							<view :key="index" class="draw-item-wrap"
								v-for="(ball, index) in setBalls(item.lotteryResult)">
								<view class="draw-item">
									{{ ball }}
								</view>
								<view class="number-symbol">
									<image v-if="index !== 2" src="@/static/img/liuhe/pcEgg/add.png"></image>
									<image v-else src="@/static/img/liuhe/pcEgg/equal.png"></image>
								</view>
							</view>
							<view class="draw-item"
							:class="item.resultDetail && item.resultDetail.split('_')[0].split(' ')[1] === '1' ? 'ball-red': ( item.resultDetail && item.resultDetail.split('_')[0].split(' ')[1] === '2' ? 'ball-blue' : ( item.resultDetail && item.resultDetail.split('_')[0].split(' ')[1] === '3' ? 'ball-green' : 'ball-gray' ) )"
							>
								{{setResultBalls(item.resultDetail)[0]}}
							</view>
						</view>
						<view class="result-detail">
							{{ item.resultDetail.split('_')[1] }}
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</scroll-view>
		<view class="btn-box" :style="{paddingBottom:isApp?'40rpx':'20rpx'}">
			<view class="btn" @click="back()" :style="{backgroundColor:themeColor.themeColor}">投注{{ title }}</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		getHistoryList
	} from "@/utils/lottery/betting";
	import Playing from './../../../utils/common/playing'

	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
  import useLotteryStore from "@/store/modules/LotteryStore";

	export default {
		name: "recent_draws",
		components: {
			Header
		},
		data() {
			return {
				title: "最近开奖",
				playing: new Playing(),
				statusBarH: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				headerStyle: {
					backgroundColor: "#1794FF",
				},
				titleStyle: {
					color: "#FFFFFF",
					fontSize: "34rpx",
				},
				dataList: [],
				lotteryId: 69,
				pageSize: 120,
				isApp: false
			};
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			// this.$nativeBridge.setTopSpace(0)
			uni.$emit("forceUpdateWinsize");
		},
		onLoad(option) {
			this.lotteryId = option.id;
			this.title = option.lotteryName;
			this.lists();
		},
		computed: {
      ...mapState(useAppInfoStore, ['themeColor']),
      ...mapState(useSystemInfoStore, ['uWindowHeight']),
      ...mapState(useLotteryStore, ['inLotteryGameName']),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			setResultBallsColor(str){

					console.log();
			},
			ballColor() {
				return this.headInfo.lotteryResult && this.headInfo.resultDetail.split('_')[0].split(' ')[1] || null
			},
			formatDate(currentDate) { //定义日期格式化函数
				return this.playing.formatDate(currentDate) //拼接成yyyymmdd形式字符串
			},
			back() {
				uni.navigateBack();
			},
			setBalls(str) {
				return str.split(",");
			},
			setResultBalls(str) {
				return str && str.split(" ") || "";
			},
			lists() {
				let prams = {
					pageSize: this.pageSize
				};
				if (this.lotteryId > 0) {
					prams.lotteryId = this.lotteryId;
				}
				getHistoryList(prams)
					.then((res) => {
						if (res.code == 200) {
							this.dataList = res.result;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .uni-list--border-top {
		height: 0 !important;
	}

	.history-draws {

		background: var(--theme-auxiliary-color-default);
		height: 100vh;
		display: flex;
		flex-direction: column;

		.record-list {
			//background-color: #fff;
			// flex: 1;
			// height: 0;
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
			::v-deep .border--left {
				display: none;
			}

			.list-row {
				background-color: var(--theme-auxiliary-color-default);
				margin-bottom: 40rpx;

				.list-rol:first-child {
					border-radius: 24rpx;
				}

				.list-rol {
					border-radius: 24rpx;
					margin-bottom: 20rpx;

					.slot-box {
						border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
						padding: 20rpx 0;

						.header-row {
							width: 100%;
							color: #404040;
							font-size: 28rpx;

							.header-col {
								font-weight: 400;
								font-size: 24rpx;
								line-height: 34rpx;

								.period {
									color: #404040;

									font-size: 28rpx;
									font-weight: 400;
									width: 100%;
								}

								.time {
									color: #404040;

									font-size: 28rpx;
									font-weight: 400;
									width: 100%;
								}
							}

							.time-box {
								display: flex;
								justify-content: flex-end;
								text-align: right;
							}
						}
					}

					.draws {
						margin: 22rpx 0 0 0;
						display: flex;

						.draw-item-wrap {
							display: flex;
							align-items: center;
							justify-content: center;

							.number-symbol {
								margin-top: 10rpx;
								margin-right: 6rpx;

								image {
									width: 48rpx;
									height: 48rpx;
								}
							}
						}

						.draw-item-wrap:first-of-type {
							.draw-item {
								margin-left: 0;
							}
						}


						.draw-item {
							width: 72rpx;
							height: 80rpx;
							background-image: url("@/static/img/liuhe/ssc/ball.svg");
							background-position: center;
							background-size: 100% 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FFF;
							text-align: center;

							font-size: 40rpx;
							font-weight: 600;
							margin-right: 6rpx;
						}
						.ball-red {
							background-image: url("@/static/img/liuhe/pcEgg/ball-red.png");
						}

						.ball-blue {
							background-image: url("@/static/img/liuhe/pcEgg/ball-blue.png");
						}

						.ball-green {
							background-image: url("@/static/img/liuhe/pcEgg/ball-green.png");
						}

						.ball-gray {
							background-image: url("@/static/img/liuhe/pcEgg/ball-gray.png");
						}
					}

					.result-detail {
						color: #404040;

						font-size: 30rpx;
						font-weight: 400;
					}
				}
			}


		}

		.btn-box {
			// height: 186rpx;
			padding: 20rpx 28rpx;
			padding-bottom: 10px;
			box-sizing: border-box;
			position: sticky;
			bottom: 0;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			box-shadow: 0px -0.5px 0px 0px var(--theme-auxiliary-color-default);

			.btn {
				height: 88rpx;
				border-radius: 16rpx;
				font-weight: 500;
				font-size: 34rpx;
				text-align: center;
				color: #fff;
				display: grid;
				place-content: center;
			}
		}

	}
</style>
