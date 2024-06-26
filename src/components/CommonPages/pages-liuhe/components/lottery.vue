<template>
	<view class="lottery">
		<view class="title">
			{{ data.typeName }}系列
		</view>
		<view class="items">
      <lotteryItem v-for="(item, index) in data.lotteries"
                   :key="index"
                   :item="item"
                   :scrollTop="scrollTop"
                   @click="detail(item)"/>
		</view>
	</view>
</template>

<script>
import lotteryItem from './lotteryItem.vue'

export default {
	components: {
		lotteryItem,
	},
	props: {
		data: {
			type: Object,
			default: function () {
				return {}
			}
    },
    scrollTop: Number,
	},
	methods: {
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},
	}
}
</script>
<style lang="scss" scoped>
.lottery {
	display: flex;
	flex-direction: column;
	margin-bottom: 20rpx;
	padding: 0 28rpx;

	&:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.title {
		color: var(--theme-color);
		font-size: 34rpx;
		font-weight: 600;
		display: flex;
		align-items: center;

		&::before {
			content: '';
			width: 6rpx;
			height: 24rpx;
			background: var(--theme-color);
			border-radius: 6rpx;
			display: block;
			margin-right: 14rpx;
		}
	}

	.items {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		.item {
			padding: 20rpx;
			border-radius: 24rpx;
			background: var(--theme-auxiliary-color-default);
			display: flex;
			align-items: center;
			margin-top: 20rpx;
		}

		.item:nth-child(odd) {
			margin-right: 20rpx;
		}
	}
}
</style>
