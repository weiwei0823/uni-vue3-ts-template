<template>
	<view class="history-draws" :style="{ paddingTop: statusBarH,height:`calc(${uWindowHeight}px)` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="loding" v-if="loading">
			<image src="/static/img/loading_v1.gif"></image>
			<text class="text">加载中...</text>
		</view>
		<scroll-view scroll-y class="record-list" :style="{height:`calc(${uWindowHeight}px - 148rpx)`}">
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
							<view class="draw-item" :style="setBallStyle(item.color)" v-for="item in item.numberList">
								{{ item.number }}
							</view>
						</view>
						<view class="result-detail">{{ item.resultDetail }}</view>
					</template>
				</uni-list-item>
			</uni-list>

		</scroll-view>
		<view class="btn-box">
			<view class="btn" @click="back()" :style="{backgroundColor:themeColor.themeColor}">投注{{ title }}</view>
		</view>
	</view>
</template>

<script>
	import {
		getHistoryList
	} from "@/utils/lottery/betting";
	import Header from '@/components/common/header/index.vue';
	import {
		mapGetters
	} from 'pinia';
	import Playing from './../../../utils/common/playing'

	export default {
		name: "recent_draws",
		components: {
			Header
		},
		data() {
			return {
				title: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYNAMETITLE)
					.title,
				statusBarH: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				playing: new Playing(),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				titleStyle: {
					color: '#FFFFFF',
					fontSize: '34rpx',
				},
				dataList: [],
				lotteryId: 69,
				pageSize: 120,
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			this.lotteryId = option.id
			this.title = option.lotteryName
			this.lists()
		},
		computed: {
			...mapGetters(["inLotteryGameName", "themeColor", "uWindowHeight"]),
		},
		methods: {
			formatDate(currentDate) { //定义日期格式化函数
				return this.playing.formatDate(currentDate) //拼接成yyyymmdd形式字符串
			},
			back() {
				uni.navigateBack()
			},
			setBallStyle(color) {
				return {
					backgroundImage: `url(/static/img/liuhe/detail/bg-${color}.png)`,
					backgroundPosition: "center",
					backgroundSize: "100% 100%"
				}
			},
			lists() {
				let prams = {
					'pageSize': this.pageSize
				};
				if (this.lotteryId > 0) {
					prams.lotteryId = this.lotteryId
				}
				getHistoryList(prams).then(res => {
					if (res.code == 200) {
						this.dataList = res.result
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-list--border-top {
		height: 0;
	}

	.history-draws {

		background: var(--theme-auxiliary-color-default);
		height: 100vh;
		display: flex;
		flex-direction: column;

		.loding {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;

			image {
				width: 100rpx;
				height: 76rpx;
			}

			.text {
				font-weight: 400;
				font-size: 24rpx;
				color: #555555;
			}
		}

		.record-list {
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
			// height: calc(var(--vh) - 100rpx);

			/deep/ .border--left {
				display: none;
			}

			.list-row {
				background: transparent;


				.list-rol {
					border-radius: 24rpx;
					margin-bottom: 20rpx;

					/deep/ .uni-list-item__container {
						padding: 20rpx 28rpx;
					}

					.slot-box {
						height: 78rpx;
						display: flex;
						align-items: center;
						width: 100%;
						border-bottom: 2rpx solid #F4F4F4;

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
								}

								.time {
									color: #404040;

									font-size: 28rpx;
									font-weight: 400;
								}
							}

							.time-box {
								display: flex;
								justify-content: flex-end;
							}
						}
					}

					.draws {
						margin: 20.5rpx 0;
						display: flex;
						flex-flow: row wrap;
						justify-content: start;

						.draw-item {
							width: 60rpx;
							height: 60rpx;
							color: #000;

							font-size: 32rpx;
							font-weight: 600;
							margin-bottom: 20rpx;
							margin-right: 8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}

					.result-detail {
						font-size: 30rpx;
						line-height: 31rpx;
						color: #404040;
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
