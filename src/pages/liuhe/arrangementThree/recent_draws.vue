<template>
	<view class="history-draws" :style="{ paddingTop: statusBarH ,height: `${uWindowHeight}px`}"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<scroll-view scroll-y class="record-list" :style="{height: `calc(${uWindowHeight}px - 250rpx)`}">
			<uni-list class="list-row">
				<uni-list-item class="list-rol" direction="column" v-for="(item, index) in dataList">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box">
							<uni-row class="header-row">
								<uni-col class="header-col" :span="13">
									<span class="period">第{{ item.lotteryNo }}期</span>
								</uni-col>
								<uni-col class="header-col time-box" :span="11">
									<span class="time">{{ formatDate(item.lotteryTime) }}</span>
								</uni-col>
							</uni-row>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="draws">
							<view class="draw-item" v-for="ball in setBalls(item.lotteryResult)">
								{{ ball }}
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
	import Header from '@/components/common/header/index.vue';
	import {
		getHistoryList
	} from "@/utils/lottery/betting";
	import {
		mapGetters
	} from 'pinia';

	import Playing from './../../../utils/common/playing'
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
      ...mapState(useAppInfoStore, ['themeColor']),
      ...mapState(useSystemInfoStore, ['uWindowHeight']),
      ...mapState(useLotteryStore, ['inLotteryGameName']),
		},
		methods: {
			formatDate(currentDate) { //定义日期格式化函数
				return this.playing.formatDate(currentDate) //拼接成yyyymmdd形式字符串
			},
			back() {
				uni.navigateBack()
			},
			setBalls(str) {
				return str.split(',')
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
	::v-deep .uni-list--border-top {
		height: 0 !important;
	}

	.history-draws {
		background-color: var(--theme-auxiliary-color-default);
		// height: var(--vh);
		height: 100vh;

		.record-list {
			// flex: 1;
			// height: 0;
			margin: 20rpx 0;
			border-radius: 24rpx;
			overflow: hidden;
			height: calc(var(--vh) - 300rpx);

			::v-deep .border--left {
				display: none;
			}

			.list-row {
				background-color: var(--theme-auxiliary-color-default);

				&:last-child .list-rol {
					margin-bottom: 20rpx;
				}

				.list-rol {
					border-radius: 24rpx;
					margin-bottom: 20rpx;

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
						margin: 20rpx 0;
						display: flex;

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
							margin-right: 20rpx;
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
			width: 100%;
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
