<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :isFixed="true" :headerStyle="{borderRadius:0,borderBottom:0}">
			<block slot="right">
				<view class="uni-list-cell-db" style="display:flex;justify-content: flex-end;">
					<text class="uni-subtitle">{{ $t('pages.common.informationCount.sxtm.text0') }}</text>
					<input class="uni-input" v-model="period" @blur="tailStat" @confirm="tailStat" />
				</view>
			</block>
		</Header>
		<scroll-view scroll-y class="scroll-y"
			:style="{height:`calc(${winHeight}px - 260rpx - var(--safe-area-inset-bottom))`,background: '#fff'}" :enhanced="true"
			:bounces="false" :show-scrollbar="false">
			<LuntanLoading class="loading" v-if="loading" />
			<!--饼图-->
			<view class="mint-tab-container-item" style="margin-top:-4rpx;background: #f4f4f4;">
				<view class="tab-wrap">
					<view :class="isActive == 0 ? 'active' : ''" @click="tab(0)">
						{{ $t('pages.common.informationCount.sxtm.text1') }}
					</view>
					<view :class="isActive == 1 ? 'active' : ''" @click="tab(1)">
						{{ $t('pages.common.informationCount.sxtm.text2') }}
					</view>
				</view>
				<view class="mint-tab-container-item">
					<view class="title-box">
						<h4>{{ $t('pages.common.informationCount.sxtm.text3') }}：{{ period }}</h4>
					</view>
					<view id="chart" class="chart" v-show="isActive == 0">
						<l-echart ref="chart"></l-echart>
					</view>
					<view id="chartCold" class="chart" v-show="isActive == 1">
						<l-echart ref="chartCold"></l-echart>
					</view>
				</view>
			</view>
		</scroll-view>
		<!--底部-->
		<view class="footer">
			<count-fab :lotterytype="lotteryType"></count-fab>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import CountFab from "@/components/common/fab/CountFab"
	import {
		tailStat
	} from "@/utils/zxcount";
	import echarts from '@/static/js/echarts.min.js';
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "zmws",
		components: {
			AlertInjectLayer,
			CountFab,
			Header
		},
		data() {
			return {
				loading: true,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: 1,
				title: this.$t('pages.common.informationCount.zmws.title'),
				period: 100,
				isInt: false,
				type: 1,
				isActive: 0,
				colorList: ['#FB9902', '#FABC02', '#FEFE33', '#D0EA2B', '#66B032', '#0391CE', '#0247FE', '#3D01A4',
					'#8601AF', '#A7194B',
					'#E35517', '#F00'

				],
				hotData: {},
				coldData: {},
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
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
			setTimeout(() => {
				this.getDeviceEchart();
			}, 600);
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			//返回
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			getDeviceEchart() {
				const optionHot = this.hotData
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(optionHot);
				});
				this.tailStat()
			},
			tab(key) {
				this.isActive = key
				if (key == 0) {
					this.$refs.chart.setOption(this.hotData)
				} else {
					if (this.isInt == false) { //判断是否初始化
						this.$refs.chartCold.init(echarts, chart => {
							chart.setOption(this.coldData)
						})
						this.isInt = true
					} else {
						this.$refs.chartCold.setOption(this.coldData)
					}
				}
			},
			tailStat: function() {
				this.loading = true
				let prams = {
					period: this.period,
					type: this.type
				}
				tailStat(prams).then(res => {
					this.loading = false
					let data = res.result
					let hot = data.hot.series.data
					let cold = data.cold.series.data
					hot.forEach((item, index) => {
						hot[index].label = {
							color: this.colorList[index]
						};
					})
					cold.map((item, index) => {
						cold[index].label = {
							color: this.colorList[index]
						};
					})
					this.setOption(hot, 1)
					this.setOption(cold, 2)
				}).catch(err => {
					console.log(err)
				})
			},
			setOption: function(data, type = 1) {
				const option = {
					backgroundColor: "#fff",
					tooltip: {
						trigger: 'item'
					},
					color: this.colorList,
					legend: {
						orient: "horizontal",
						bottom: "10%",
						padding: [5, 5, 5, 5],
						borderWidth: 0,
						borderRadius: [5, 5, 5, 5],
						shadowColor: "#ccc",
						textStyle: {
							rich: {
								oneone: {
									color: '#404040',
									fontSize: 13,
									width: 195,
									height: 21,
									padding: [0, 0, 0, 1]
								},
							}
						},
						formatter: function(name) {
							var total = 0;
							var tarValue;
							for (var i = 0, l = data.length; i < l; i++) {
								total += data[i].value;
								if (data[i].name == name) {
									name = data[i].name
									tarValue = data[i].value;
								}
							}
							return `{oneone|${name}${tarValue}}`;
						},
					},
					series: [{
						type: "pie",
						label: {
							rich: {
								b: {
									color: '#404040',
									fontSize: '12px',
									fontWeight: 500
								},
								d: {
									color: '#404040',
									fontSize: '12px',
									fontWeight: 500
								},
								c: {
									color: '#07C160',
									fontSize: '12px',
									fontWeight: 500
								},
								k: {
									color: '#404040',
									fontSize: '12px',
									fontWeight: 500
								}
							},
							formatter: '{b|{b}:} {d|{d}%}\n{k|(}{c|{c}次}{k|)}',
							// normal: {
							// 	show: true,
							// 	formatter: '{b}:{d}%\n({c}次)' //自定义显示格式(b:name, c:value, d:百分比)
							// }
						},
						labelLine: {
							lineStyle: {
								color: '#404040'
							}
						},
						emphasis: {
							disabled: false,
							scale: true,
							scaleSize: 10,
							label: {
								fontWeight: 800,
								fontSize: 13
							}
						},
						radius: ['25%', '50%'],
						center: ["50%", "35%"],
						tooltip: {
							formatter: function(param) {
								return param.marker + " " + param.name + "：" + param.value;
							},
							borderWidth: 0,
							backgroundColor: "rgba(0,0,0,0.5)",
							textStyle: {
								color: "#fff",
							}
						},
						data: data
					}]
				}
				if (type == 1) {
					this.hotData = option
					this.$refs.chart.setOption(option)
				} else {
					this.coldData = option
					this.$refs.chartCold.setOption(option)
				}
			}
		}
	}
</script>

<style scoped>
	::v-deep .header{
		border-radius: unset !important;
	}
	.scroll-y{
		border-radius: 24rpx;
	}
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

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

	.chart {
		width: 100%;
		max-width: 480px;
		height: 67vh;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
		background: #fff;
	}

	.tab-wrap {
		display: flex;
		justify-content: space-between;
		line-height: 50px;
		height: 50px;
		background: #fff;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		padding: 0px 120rpx;
	}

	.tab-wrap>uni-view.active {
		position: relative;
		color: var(--theme-color);
		display: flex;
		justify-content: center;
		text-align: center;

		font-size: 34rpx;
		font-weight: 500;
	}

	.active::after {
		content: '';
		display: block;
		width: 36rpx;
		height: 6rpx;
		border-radius: 6rpx 6rpx 0 0;
		background: var(--theme-color);
		position: absolute;
		bottom: 0;
	}

	.tab-wrap>uni-view {
		flex: 1;
		color: #404040;
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
	}

	.uni-input {
		background-color: var(--theme-auxiliary-color-default);
		border: none;
		color: var(---, #404040);
		font-size: 30rpx;
		font-weight: 500;
	}

	.title-box {
		box-sizing: border-box;
		padding: 9px 14px;
	}

	.title-box h4 {
		text-align: left;
		color: #404040;
		font-size: 16px;
		font-weight: 400;
		line-height: 28px;
	}
</style>
