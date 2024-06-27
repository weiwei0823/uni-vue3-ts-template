<template>
	<view class="error-page">
		<Header :title="title" />
		<view class="img-box">
			<view class="error-text">服务器忙，请稍后重试...</view>
			<image src="@/static/img/nodata.png" class="center-img"></image>
		</view>
		<view class="btns">
			<view class="btn" @click="refresh"> 刷新 </view>
			<view class="btn" @click="back"> 返回 </view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	export default {
		components: {
			Header,
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				title: '请稍后重试'
			};
		},
		methods: {
			refresh: function() {
				var pages = getCurrentPages(); //获取所有页面的数组对象
				var currPage = pages[pages.length - 1]; //当前页面
				uni.reLaunch({
					url: currPage.$page.fullPath,
				});
			},
			back() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.error-page {
		.img-box {
			text-align: center;
			margin-top: 300rpx;

			.error-text {
				color: var(--theme-color);
				text-align: center;

				font-size: 15px;
				font-style: normal;
				font-weight: 400;
				line-height: 20px;
				/* 133.333% */
			}

			.center-img {
				width: 398rpx;
				height: 398rpx;
			}


		}

		.btns {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
		}

		.btn {
			width: 236rpx;
			height: 80rpx;
			border-radius: 16rpx;
			font-size: 30rpx;
			line-height: 80rpx;
			text-align: center;
			color: #A1A1A1;
			border: 1px solid #A1A1A1;
			margin-right: 30rpx;

			&+.btn {
				margin-left: 30rpx;
				margin-right: 0;
				color: var(--theme-color);
				border: 1px solid var(--theme-color);
			}
		}
	}
</style>
