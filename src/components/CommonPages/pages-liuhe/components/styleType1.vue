<template>
	<view class="style-type-1">
    <lotteryItem v-for="(item, index) in data"
                 :key="index"
                 :item="item"
                 :scrollTop="scrollTop"
                 @click="detail(item)"/>
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
			type: Array,
			default: function () {
				return []
			}
		},
		swiperCurrent: null,
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
.style-type-1 {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: 0 20rpx;

	.item+.item {
		margin-left: 20rpx;
	}
}
</style>
