<template>
	<view class="maintain-page">
		<view class="maintain-content">
			<image src="/static/img/common/maintain/maintain.png" mode="widthFix"></image>
			<view class="title">
				系统正在维护...
			</view>
			<view class="time">
				{{dataString}}
			</view>
			<view class="description" v-html="response.content">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		appStatusConfig,
	} from "@/utils/common/index";

	export default {
		components: {},

		computed: {
			dataString() {
				let response = this.response;
				let startTimeStr = response ? response.startTime : null;
				let endTimeStr = response ? response.endTime : null;
				if (startTimeStr && endTimeStr) {
					let startDate = new Date(startTimeStr);
					let endDate = new Date(endTimeStr);
					if (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() === endDate.getMonth() &&
						startDate.getDate() === endDate.getDate()) {
						startTimeStr = this.getHourString(startDate)
						endTimeStr = this.getHourString(endDate)
					}
				} else {
					startTimeStr = '--';
					endTimeStr = "--";
				}
				return `维护时间:${startTimeStr}至${endTimeStr}`;
			}
		},

		mounted() {
			this.initConfigs();

			uni.$emit("on_page_mounted", this)

		},

		data() {
			return {
				title: '请稍后重试',
				response: null,
			};
		},
		methods: {

			initConfigs() {
				let that = this;
				appStatusConfig({}).then(response => {
					if (response.code == 200) {
						that.response = response.result;
					}
				})
			},

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

			getHourString(dateObj) {
				let h = dateObj.getHours();
				let m = dateObj.getMinutes();
				let s = dateObj.getSeconds();
				return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2,
					'0');
			}
		},
	};
</script>
<style lang="scss" scoped>
	.maintain-page {
		min-height: 100vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.maintain-content {
			margin-top: -100rpx;
			text-align: center;

			.title {
				color: var(--theme-color);
				text-align: center;

				font-size: 48rpx;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
				margin-top: 20rpx;
			}

			.time {
				color: var(--theme-color);
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				margin-top: 20rpx;
				word-break: break-all;
			}

			.description {
				color: var(--theme-color);
				text-align: center;

				font-size: 30rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 40rpx;
				width: 560rpx;
				margin-top: 20rpx;
				/* 133.333% */
				margin-left: auto;
				margin-right: auto;

			}

			image {
				width: 520rpx;
			}
		}
	}
</style>