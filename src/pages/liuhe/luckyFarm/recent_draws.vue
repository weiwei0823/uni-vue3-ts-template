<template>
	<view class="history-draws" :style="{ paddingTop: statusBarH  ,height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="loding" v-if="loading">
			<image src="@/static/img/loading_v1.gif"></image>
			<text class="text">加载中...</text>
		</view>
		<scroll-view scroll-y class="record-list" :style="{ height: `calc(${uWindowHeight}px - 200rpx)` }">
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
									<span class="time">{{ item.lotteryTime }}</span>
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
		<view class="btn-box" v-if="!loading">
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
	import Scroller from "../../../uni_modules/z-paging/components/z-paging/js/modules/scroller";
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
  import useLotteryStore from "@/store/modules/LotteryStore";
	export default {
		name: "recent_draws",
		components: {
			Scroller,
			Header
		},
		data() {
			return {
				title: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYNAMETITLE)
					.title,
				statusBarH: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
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
				loading: true
			}
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
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			setBalls(str) {
				return str.split(',')
			},
			lists() {
				this.loading = true
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
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-list--border-top {
		background-color: transparent !important;
	}

	.history-draws {

		background-color: var(--theme-auxiliary-color-default);
		height: 100vh;
		display: flex;
		flex-direction: column;

		.loding {
			display: flex;
			justify-content: center;
			align-items: center;

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
			height: calc(var(--vh) - 100rpx);

			::v-deep .border--left {
				display: none;
			}

			.list-row {
				background: transparent;

				.list-rol {
					border-radius: 24rpx;
					margin-bottom: 20rpx;

					::v-deep .uni-list-item__container {
						padding: 20rpx 28rpx;
					}

					.slot-box {
						height: 78rpx;
						display: flex;
						align-items: center;
						width: 100%;
						border-bottom:2rpx solid #F4F4F4 ;
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
						margin: 20rpx 0;
						display: flex;

						.draw-item {
							width: 64rpx;
							height: 70rpx;
							background-image: url("@/static/img/liuhe/ssc/ball.svg");
							background-position: center;
							background-size: 100% 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FFF;
							text-align: center;

							font-size: 36rpx;
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
