<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :isFixed="true">
			<block slot="right">
				<view class="uni-list-cell-db" style="display:flex;justify-content: flex-end;">
					<text class="uni-subtitle">{{ $t('pages.common.informationCount.zmls.text0') }}</text>
					<input class="uni-input" v-model="period" @blur="numberStat" @confirm="numberStat" />
				</view>
			</block>
		</Header>
		<scroll-view scroll-y class="scroll-y"
			:style="{height:`calc(${winHeight}px - 88rpx - 152rpx - var(--safe-area-inset-bottom))`}" :enhanced="true"
			:bounces="false" :show-scrollbar="false">
			<!--列表-->
			<LuntanLoading class="loading" v-if="loading" />
			<view class="mint-tab-container-item">
				<view class="title-box">
					<h4>{{ $t('pages.common.informationCount.zmls.text1') }}：{{ period }}</h4>
					<p>{{ $t('pages.common.informationCount.zmls.text2') }}</p>
				</view>
				<view id="chart" class="charts-box">
					<l-echart ref="chart"></l-echart>
				</view>
				<view class="title-box">
					<p style="margin-bottom: 10rpx;">{{ $t('pages.common.informationCount.zmls.text3') }}</p>
				</view>
				<view id="chartCold" class="charts-box">
					<l-echart ref="chartCold"></l-echart>
				</view>
			</view>
			<!--底部-->
		</scroll-view>
		<view class="footer">
			<count-fab :lotterytype="lotteryType"></count-fab>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import CountFab from "@/components/common/fab/CountFab"
	import {
		numberStat,
		summary
	} from "@/utils/zxcount";
	import Empty from "@/components/common/empty/empty";
	import echarts from '@/static/js/echarts.min.js';
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "zmls",
		components: {
			AlertInjectLayer,
			LEchart,
			Empty,
			CountFab,
			Header
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: 1,
				title: this.$t('pages.common.informationCount.zmls.title'),
				type: 1,
				period: 100,
				chartDataHot: {
					backgroundColor: "#fff",
					//dataZoom-inside 内置型数据区域缩放组件 所谓内置 1平移：在坐标系中滑动拖拽进行数据区域平移。2缩放：PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同;移动端：在移动端触屏上，支持两指滑动缩放。
					dataZoom: [{
						type: 'inside', //1平移 缩放
						throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
						minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
						start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
						end: 1, //数据窗口范围的结束百分比。范围是：0 ~ 100。
						zoomLock: true //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
					}],
					//直角坐标系 grid 中的 x 轴，
					xAxis: {
						name: this.$t('pages.common.informationCount.zmls.text4'),
						nameLocation: 'start', //有start  和end 分别为左右
						nameTextStyle: {
							align: "center",
							verticalAlign: "top",
							lineHeight: 50,
							color: "#404040",
							fontWeight: "bold",
							fontSize: '13',
						},
						position: 'bottom',
						axisTick: {
							show: false
						},
						type: 'category', //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
						// 类目数据，在类目轴（type: 'category'）中有效。
						data: [],
						axisLabel: {
							interval: 'auto',
							color: "#404040",
							margin: 20,
							fontWeight: "bold",
							fontSize: '13',
						}
					},
					//直角坐标系 grid 中的 y 轴，
					yAxis: {
						name: this.$t('pages.common.informationCount.zmls.text5'),
						type: 'value', //'value' 数值轴，适用于连续数据。
						nameTextStyle: {
							align: "right"
						},
						axisLabel: {
							color: "#404040"
						}
					},
					series: [{
						type: 'line', //折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势。和全局设置type效果一样,表示折线图
						// 系列中的数据内容数组。数组项通常为具体的数据项。
						data: [],
						// 折线条的样式
						lineStyle: {
							color: '#EC3232',
							width: 3
						},
						label: {
							show: true,
							color: "#EC3232"
						},
						// 折线拐点的样式
						itemStyle: {
							normal: {
								// 静止时：
								color: '#EC3232',
							},
						},
						symbol: 'circle', //拐点样式
						symbolSize: 10 //拐点大小
					}]
				},
				chartDataCold: {
					backgroundColor: "#fff",
					//dataZoom-inside 内置型数据区域缩放组件 所谓内置 1平移：在坐标系中滑动拖拽进行数据区域平移。2缩放：PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同;移动端：在移动端触屏上，支持两指滑动缩放。
					dataZoom: [{
						type: 'inside', //1平移 缩放
						throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
						minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
						start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
						end: 1, //数据窗口范围的结束百分比。范围是：0 ~ 100。
						zoomLock: true //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
					}],
					//直角坐标系 grid 中的 x 轴，
					xAxis: {
						name: this.$t('pages.common.informationCount.zmls.text6'),
						nameLocation: 'start', //有start  和end 分别为左右
						nameTextStyle: {
							align: "center",
							verticalAlign: "top",
							lineHeight: 50,
							color: "#404040",
							fontWeight: "bold",
							fontSize: '13',
						},
						position: 'bottom',
						axisTick: {
							show: false
						},
						type: 'category', //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
						// 类目数据，在类目轴（type: 'category'）中有效。
						data: [],
						axisLabel: {
							interval: 'auto',
							color: "#404040",
							margin: 20,
							fontWeight: "bold",
							fontSize: '13',
						}
					},
					//直角坐标系 grid 中的 y 轴，
					yAxis: {
						name: this.$t('pages.common.informationCount.zmls.text7'),
						type: 'value', //'value' 数值轴，适用于连续数据。
						nameTextStyle: {
							align: "right"
						},
						axisLabel: {
							color: "#404040"
						}
					},
					series: [{
						type: 'line', //折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势。和全局设置type效果一样,表示折线图
						// 系列中的数据内容数组。数组项通常为具体的数据项。
						data: [],
						// 折线条的样式
						lineStyle: {
							color: '#07C160',
							width: 3
						},
						label: {
							show: true,
							color: "#07C160"
						},
						// 折线拐点的样式
						itemStyle: {
							normal: {
								// 静止时：
								color: '#07C160',
							},
						},
						symbol: 'circle', //拐点样式
						symbolSize: 10, //拐点大小
						winHeight: 0,
					}]
				}
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		onLoad(option) {
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('argParams', function(data) {
				this.lotteryType = data.lotteryType
			})
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE)

			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.type = parseInt(option.type)
			this.numberStat()
			setTimeout(() => {
				this.getDeviceEchart();
			}, 600);
		},
		methods: {
			getDeviceEchart() {
				const optionHot = this.chartDataHot
				const optionCold = this.chartDataCold
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(optionHot);
				});
				this.$refs.chartCold.init(echarts, chart => {
					chart.setOption(optionCold)
				})
			},
			//返回
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			numberStat: function() {
				this.loading = true
				let prams = {
					type: this.type,
					period: this.period
				};
				numberStat(prams).then(res => {
					this.chartDataHot.xAxis.data = res.result.hot.xAxis.data
					this.chartDataHot.series[0].data = res.result.hot.series[0].data
					this.chartDataCold.xAxis.data = res.result.cold.xAxis.data
					this.chartDataCold.series[0].data = res.result.cold.series[0].data
					this.$refs.chart.setOption(this.chartDataHot)
					this.$refs.chartCold.setOption(this.chartDataCold)
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.header-box,
	.header,
	.box-bg {
		height: 46px;
	}

	.input-view {
		font-size: 16px;
	}

	.uni-subtitle {
		font-size: 14px;
	}

	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.footer {
		height: 80px;
		z-index: 12;
		position: relative;
	}

	.title-box {
		box-sizing: border-box;
		padding: 10px 0;
		text-align: center;
	}

	.title-box h4 {
		padding-left: 28rpx;
		text-align: left;
		color: var(--theme-color);
		font-size: 30rpx;
		font-weight: 400;


	}

	.title-box p {

		color: #404040;

		font-size: 30rpx;
		font-weight: 400;
		text-align: left;
		padding-left: 28rpx;
		margin-top: 10rpx;
	}

	.charts-box {
		border-radius: 24rpx;
		overflow: hidden;
	}

	.uni-input {
		background-color: var(--theme-auxiliary-color-default);
		border: none;
		color: var(---, #404040);
		font-size: 30rpx;
		font-weight: 500;
	}
</style>
