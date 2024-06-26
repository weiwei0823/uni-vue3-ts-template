<template>
	<div class="statistics" :style="{ height: isApp ? '158rpx' : '118rpx' }">
		<view class="item">
			<view class="title">
				{{ $t("pages.common.promoteEarn.components.statistics.TeamDataStatistics.text1") }}
			</view>
			<view class="num">{{ statisticsData.totalRecharge }}</view>
		</view>
		<view class="item">
			<view class="title">
				{{ $t("pages.common.promoteEarn.components.statistics.TeamDataStatistics.text2") }}
			</view>
			<view class="people-num">{{ statisticsData.firstRechargeNum }}人</view>
		</view>
		<view class="item">
			<view class="title">
				{{ $t("pages.common.promoteEarn.components.statistics.TeamDataStatistics.text3") }}
			</view>
			<view class="num">{{ statisticsData.totalBettingValid }}</view>
		</view>
		<view class="item">
			<view class="title">
				{{ $t("pages.common.promoteEarn.components.statistics.TeamDataStatistics.text4") }}
			</view>
			<view class="num">{{ statisticsData.winTotalAmount }}</view>
		</view>
	</div>
</template>
<script>
import defaultTemplate from '@/utils/defaultTemplate'
import {
	teamDataBottom
} from '@/utils/ptp/index.js'
export default {
	data() {
		return {
			isApp: false,
			isInit: false,
			statisticsData: {}
		}
	},
	mounted() {
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		uni.$on('getTeamDataBottom', this.getTeamDataBottom)
	},
	methods: {
		async getTeamDataBottom(params) {
			if (this.isInit) return;
			const res = await teamDataBottom(params)
			const valFun = (val) => {
				if (!val) {
					return '0.00'
				}
				return Number(val).toFixed(2)
			}
			this.statisticsData = defaultTemplate({
				firstRechargeNum: (val) => {
					return val || '0'
				},
				totalBettingValid: valFun,
				totalRecharge: valFun,
				winTotalAmount: valFun
			}, res.result)
			this.isInit = true;
		}
	}
}
</script>

<style lang="scss" scoped>
.statistics {
	width: calc(100% - 56rpx);
	// height: 118rpx;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	background: var(--theme-color-bg);
	border-radius: 24rpx 24rpx 0 0;
	padding: 0 28rpx 20rpx;
	justify-content: space-between;
	position: absolute;
	bottom: 0;
	z-index: 10;

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