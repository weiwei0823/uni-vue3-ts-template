<template>
	<view class="bet-num" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="content">
			<view class="content-text">
				{{ betNum }}
			</view>
			<view class="btn-box">
				<view class="btn" @click="back">再次下注</view>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"

	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "bet_num",
		components: {
			Header,
			AlertInjectLayer,
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				title: '下注号码',
				betNum: 0,
				headerStyle: {
					backgroundColor: '#03536E',
				},
				titleStyle: {
					color: '#FFFFFF',
				},
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		onLoad(opt) {
			this.betNum = opt.num
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
					success: () => {
						setTimeout(() => {
							('123123');
							uni.$emit('betDetailsToCart', {})
						}, 100);
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.bet-num {
		background-color: var(--theme-auxiliary-color-default);

		.content {
			margin-top: 20rpx;
			height: calc(var(--vh) - 110rpx);

			.content-text {
				background: #fff;
				border-radius: 24rpx;
				padding: 20rpx 28rpx;
				color: #404040;
			}

			.btn-box {
				box-sizing: border-box;
				position: fixed;
				background: #fff;
				border-radius: 24rpx 24rpx 0 0;
				padding: 20rpx 28rpx;
				width: 100%;
				bottom: 0;

				.btn {
					height: 88rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					color: #fff;
					display: grid;
					place-content: center;
				}
			}
		}
	}
</style>
