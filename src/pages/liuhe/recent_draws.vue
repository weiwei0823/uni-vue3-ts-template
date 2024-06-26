<template>
	<view class="history-draws" :style="{ paddingTop: statusBarH ,height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="loding" v-if="loading">
			<image src="/static/img/loading_v1.gif"></image>
			<text class="text">加载中...</text>
		</view>
		<scroll-view scroll-y class="record-list"
			:style="{height: `calc(${uWindowHeight}px - 100rpx - 140rpx - ${isApp?20:0}rpx)`}">
			<uni-list class="list-row" :border="false">
				<uni-list-item class="list-rol" direction="column" v-for="(item, index) in dataList">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box">
							<uni-row class="header-row">
								<uni-col class="header-col" :span="14">
									<span class="period">第{{ item.lotteryNo }}期</span>
								</uni-col>
								<uni-col class="header-col time-box" :span="10">
									<span
										class="time">{{ $u.timeFormat(item.lotteryTime, 'yyyy.mm.dd hh:MM:ss') }}</span>
								</uni-col>
							</uni-row>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="draws">
							<draws :lotteryDetail="item.numberList"></draws>
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</scroll-view>
		<view class="btn-box" v-if="!loading" :style="{paddingBottom:isApp?'40rpx':'20rpx'}">
			<view class="btn" @click="back()" :style="{ backgroundColor: themeColor.themeColor }">投注{{ title }}
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import Draws from "@/components/common/lottery/Draws";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import {
		getHistoryList
	} from "@/utils/lottery/betting";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "recent_draws",
		components: {
			Header,
			AlertInjectLayer,
			UniCol,
			UniRow,
			Draws
		},
		computed: {
			...mapGetters(["inLotteryGameName", "themeColor", "uWindowHeight"]),
		},
		watch: {

		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				loading: true,
				title: "",
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
				isApp: false
			}
		},
		onShow() {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			// this.$nativeBridge.setTopSpace(0)
			uni.$emit("forceUpdateWinsize");
		},
		onLoad(option) {
			this.lotteryId = option.id;
			this.title = option.lotteryName;
			this.lists()
		},
		methods: {
			back() {
				uni.navigateBack()
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
	/deep/ .uni-list--border-top {
		background-color: transparent !important;
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
			height: calc(var(--vh) - 100rpx);

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
						padding-top: 20rpx;
						border-top: 1px solid var(--theme-auxiliary-color-default);
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
