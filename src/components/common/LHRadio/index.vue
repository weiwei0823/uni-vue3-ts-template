<template>
	<view class="lh-radio" :class="['theme-' + theme]" @click="handleChange">
		<view class="radio" :style="{border:`1px solid ${themeColor.themeColor}`}">
			<view class="active" v-if="value" :style="{background:`${themeColor.themeColor}`}"></view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	export default {
		props: {
			value: Boolean
		},
		computed: {
			...mapGetters(["themeColor"]),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
		},
		methods: {
			handleChange() {
				this.$emit('input', !this.value)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.lh-radio {
		display: flex;
		align-items: center;

		.radio {
			width: 38rpx;
			height: 38rpx;
			border: 1px solid var(--theme-color);
			border-radius: 50%;
			display: grid;
			place-content: center;
			margin-right: 20rpx;
			flex-shrink: 0;

			.active {
				width: 22rpx;
				height: 22rpx;
				background: var(--theme-color);
				border-radius: 50%;
			}
		}
	}
</style>
