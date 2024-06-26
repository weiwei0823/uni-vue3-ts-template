<template>
	<view class="report-detail" :style="{ marginTop: safeHeight }">
		<Header :title="title" isFixed></Header>
		<uni-popup ref="popup" type="center">
			<view>
				<image mode="aspectFit" :src="pic" />
			</view>
		</uni-popup>
		<view class="tab-div-bg" style="height:40rpx" />
		<view class="tab-div-radius" />
		<view class="content">
			<view class="top">
				<view class="top-title">标题：</view>
				<view class="top-text">{{ detail.title }}</view>
			</view>
			<view class="bottom">
				<view class="bottom-title">举报理由：</view>
				<view class="bottom-text">{{ detail.reason }}</view>
			</view>
			<view class="pic-list">
				<view class="pic-list-item" v-for="(item, index) in detail.pictureList">
					<image mode="aspectFill" :src='item.smallPictureUrl' @click="openPic(item)"></image>
				</view>

				<view v-if="detail&&detail.pictureList&&detail.pictureList.length % 3 !==0" class="pic-list-item"
					v-for="(item, index) in 3 - (detail&&detail.pictureList?detail.pictureList.length % 3:0)">
				</view>
			</view>
			<view class="status">
				<text class="status-title">处理结果：</text>
				<view :class="setStasusClass(detail.status)">{{ setResult(detail.status) }}</view>
				<!-- <view class="status-content">{{detail.status === 0 ? "未处理" : "已处理"}}</view> -->
			</view>
		</view>

		<AlertInjectLayer />
	</view>
</template>
<script>
	import Header from '@/components/common/header/index.vue';
	import {
		reportDetail
	} from '@/utils/user';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	export default {
		name: "reportDetail",
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "举报详情",
				id: "",
				detail: {},
				pic: ""
			}
		},
		components: {
			AlertInjectLayer,
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
			this.id = option.id;
			this.getFeedbackDetail()
		},
		methods: {
			setResult(status) {
				switch (status) {
					case 0:
						return "审核中"
					case 2:
						return "审核拒绝"
					case 1:
						return "审核成功"
				}
			},
			setStasusClass(status) {
				switch (status) {
					case 0:
						return "status-content doing"
					case 1:
						return "status-content fail"
					case 2:
						return "status-content done"
				}
			},
			openPic(item) {
				this.$refs.popup.open()
				this.pic = item.pictureUrl
			},
			getFeedbackDetail() {
				reportDetail({
					id: this.id
				}).then(res => {
					if (res.code === 200) {
						this.detail = res.result
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tab-div-radius {
		background-color: #fff;
		height: 20rpx;
		width: 100%;
		position: fixed;
		top: 108rpx;
		z-index: 12;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

	}

	/deep/ .tab-div-bg {
		border-radius: 0;
		z-index: 11;
		top: 84rpx;
	}

	.report-detail {
		background: var(--theme-auxiliary-color-default);
		height: var(--vh);
	}

	.content {
		margin-top: 20rpx;
		padding: 20rpx 28rpx;
		position: relative;
		gap: 20rpx;
		border-radius: 24rpx;
		background: #FFF;

		.top {
			border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
			line-height: 50rpx;
			padding-bottom: 18rpx;

			.top-title {
				color: #404040;

				font-size: 30rpx;
				font-weight: 500;
			}

			.top-text {
				color: #404040;

				font-size: 28rpx;
				font-weight: 400;
				// white-space: nowrap;
				// overflow: hidden;
				// text-overflow: ellipsis;
			}
		}

		.bottom {
			margin-top: 20rpx;
			margin-bottom: 50rpx;
			line-height: 50rpx;
			border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
			padding-bottom: 18rpx;

			.bottom-title {
				color: #404040;

				font-size: 30rpx;
				font-weight: 500;
			}

			.bottom-text {
				color: #404040;

				font-size: 28rpx;
				font-weight: 400;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
			}
		}

		.pic-list {
			display: flex;
			gap: 15rpx 0;
			border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
			padding-bottom: 18rpx;
			flex-wrap: wrap;
			// justify-content: space-around;
			justify-content: space-between;

			.pic-list-item {
				min-width: 218rpx;
				width: 218rpx;
				height: 218rpx;
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					height: 100%;
					width: 100%;
					border-radius: 24rpx;
				}
			}
		}

		.status {
			line-height: 50rpx;
			padding: 20rpx 0 0 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.status-title {
				font-weight: bold;
				font-size: 28rpx;
			}

			.status-content {
				// position: absolute;
				// top: 8rpx;
				// right: 8rpx;
				float: right;
				font-size: 28rpx;
				border-radius: 8rpx;
				background: var(--theme-auxiliary-color-default);
				gap: 20rpx;
				display: flex;
				height: 40rpx;
				padding: 0 6rpx;
				align-items: center;
			}

			.status-content.doing {
				color: var(--theme-color);

				font-size: 28rpx;
				font-weight: 500;
			}

			.status-content.done {
				color: var(--theme-color);

				font-size: 28rpx;
				font-weight: 500;
			}

			.status-content.fail {
				color: var(--theme-auxiliary-color-remind);

				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
</style>