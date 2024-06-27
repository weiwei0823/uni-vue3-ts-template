<template>
	<view class="loading-list" :class="['theme-' + themeColor.name]">
		<svg class="spin" width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle id="Ellipse 669" cx="17.5" cy="17" r="15" :stroke="themeColor.themeColor" stroke-width="4" />
		</svg>
		<view class="loading-text">
			{{ text || '加载中...' }}
		</view>
	</view>
</template>

<script>
import {
	mapGetters
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
	props: {
		text: ''
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor'])
	}
}
</script>

<style lang="scss" scoped>
.loading-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10rpx 0;

	.loading-text {
		color: #A1A1A1;
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
		margin-top: 20rpx;
	}

	.spin {
		animation: spin 1s steps(8) infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
}
</style>
