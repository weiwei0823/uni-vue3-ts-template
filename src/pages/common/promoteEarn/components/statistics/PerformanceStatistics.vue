<template>
	<div class="statistics" :style="{ height: isApp ? '158rpx' : '118rpx' }">
		<view class="item" style="padding-right: 50%;">
			<view class="title">{{ $t('pages.common.promoteEarn.components.statistics.PerformanceStatistics.zhishu') }}
			</view>
			<view class="people-num">{{ statisticsData.directNum }}人</view>
		</view>
		<view class="item">
			<view class="title">{{ $t('pages.common.promoteEarn.components.statistics.PerformanceStatistics.yongjin') }}
			</view>
			<view class="num">{{ statisticsData.commission }}</view>
		</view>
		<view class="item">
			<view class="title">{{ $t('pages.common.promoteEarn.components.statistics.PerformanceStatistics.yeji') }}
			</view>
			<view class="num">{{ statisticsData.performance }}</view>
		</view>
	</div>
</template>
<script>
import defaultTemplate from '@/utils/defaultTemplate'
import {
	myPerformanceBottom
} from '@/utils/ptp/index.js'
export default {
	data() {
		return {
			statisticsData: {},
			isApp: false,
			isInit: false
		}
	},
	mounted() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		uni.$on('getMyPerformanceBottom', this.getMyPerformanceBottom)
	},
	methods: {
		async getMyPerformanceBottom(params) {
			if (this.isInit) return;

			const res = await myPerformanceBottom(params)

			const valFun = (val) => {
				if (!val) {
					return '0.00'
				}
				return Number(val).toFixed(2)
			}
			this.statisticsData = defaultTemplate({
				directNum: (val) => {
					return val || '0'
				},
				commission: valFun,
				performance: valFun
			}, res.result)
			this.isInit = true;
		}
	}
}
</script>

<style lang="scss" scoped>
.statistics {
	width: calc(100% - 56rpx);
	height: 118rpx;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	background: var(--theme-color-bg);
	border-radius: 24rpx 24rpx 0 0;
	padding: 0 28rpx 20rpx;
	justify-content: space-between;
	position: absolute;
	bottom: 0;

	.item {
		margin-top: 20rpx;
		width: 288rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;

		.title {
			color: #404040;
		}

		.num {
			color: var(--theme-color);
		}
	}
}
</style>