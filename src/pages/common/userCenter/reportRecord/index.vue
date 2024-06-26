<template>
	<view class="report-records" :style="{ marginTop: safeHeight,height: `${uWindowHeight}px` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed>
			<text slot="right" @click="toReport" class="report">{{ $t('pages.common.userCenter.reportRecord.index.report')
			}}</text>
		</Header>

		<scroll-view @scroll="scroll" scroll-y="true" class="content" :enhanced="true" :bounces="false"
			:show-scrollbar="false">
			<LuntanLoading class="loading" v-if="loading" />
			<view class="reports-list" v-else-if="records.length > 0">
				<view class="list-item" v-for="(item, index) in records" @click="toReportDetail(item)">
					<view class="top">
						<view class="left">
							{{ $t('pages.common.userCenter.reportRecord.index.postTitle') }}<text>{{ item.title
								}}</text>
						</view>
						<view :class="setStasusClass(item.status)">
							{{ setStatusText(item.status) }}
						</view>
					</view>
					<view class="bottom">
						<view class="left">
							{{ $t('pages.common.userCenter.reportRecord.index.reportReason') }}<text>{{ item.reason
								}}</text>
						</view>
						<view class="right">
							{{ item.createTime }}
						</view>
					</view>
				</view>
				<uni-load-more :status="status" @clickLoadMore="loadMore" :contentText="contentText"></uni-load-more>
			</view>
			<empty v-else :customStyle="{
			display:'flex',
			flexDirection: 'column',
			alignItems: 'center' ,
			justifyContent: 'center',
			height:`calc(${uWindowHeight}px - 108rpx)` }"> </empty>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import {
		reportList
	} from "@/utils/user/index";
	import Empty from "@/components/common/empty/empty.vue";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "report",
		components: {
			AlertInjectLayer,
			Header,
			Empty
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight"]),
		},
		onLoad() {
			this.getReportRecords()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onReachBottom() {
			if (this.status === "no-more") {
				return
			}
			this.loadMore()
		},

		data() {
			return {
				loading: true,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.my.reportHistory'),
				records: [],
				pageNum: 1,
				status: 'more', //more, loading, no-more
				contentText: {
					contentdown: this.$t('pages.common.userCenter.reportRecord.index.loadMore'),
					contentrefresh: this.$t('pages.common.userCenter.reportRecord.index.loading'),
					contentnomore: this.$t('pages.common.userCenter.reportRecord.index.noMore')
				},
				isTop: false
			}
		},
		methods: {
			scroll(e) {
				this.isTop = (e.detail.scrollTop == 0)
			},
			setStatusText(status) {
				switch (status) {
					case 0:
						return this.$t('pages.common.userCenter.reportRecord.index.pendingReview')
					case 2:
						return this.$t('pages.common.userCenter.reportRecord.index.reviewRejected')
					case 1:
						return this.$t('pages.common.userCenter.reportRecord.index.reviewApproved')
				}
			},
			setStasusClass(status) {
				switch (status) {
					case 0:
						return "right doing"
					case 2:
						return "right fail"
					case 1:
						return "right done"
				}
			},
			loadMore() {
				this.pageNum++
				this.getReportRecords()
			},
			//跳转我要举报
			toReport() {
				uni.navigateTo({
					url: "/pages/luntan/masterForum/index"
				})
			},
			getReportRecords() {
				this.loading = true
				reportList({
					pageNum: this.pageNum
				}).then(res => {
					this.loading = false
					if (res.code === 200) {
						if (res.result.records.length < 10) {
							this.status = "no-more"
						}
						this.records = this.records.concat(res.result.records)
					}
				})
			},
			//前往举报详情
			toReportDetail(item) {
				uni.navigateTo({
					url: '/pages/common/userCenter/reportRecord/reportDetail?id=' + item.id
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.content {
		height: 0;
		flex: 1;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
	}


	/deep/ .uni-load-more__text {
		color: #A1A1A1 !important;
	}

	.report-records {
		background: var(--theme-auxiliary-color-default);
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.report {
		color: var(--theme-color);
		font-size: 28rpx;
		text-align: right;
	}

	.reports-list {
		padding: 30rpx 0;
		padding-top: 0;
		position: relative;
		background: var(--theme-auxiliary-color-default);

		&::before {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			content: " ";
			pointer-events: none;
			top: 0;
			left: 0;
			// border-top: 1px solid #ebedf0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}

		.list-item {
			padding: 20rpx 28rpx;
			margin-bottom: 15rpx;
			border-radius: 24rpx;
			background: #FFF;

			.top {
				// height: 50rpx;
				line-height: 50rpx;
				position: relative;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					// position: absolute;
					// top: 8rpx;
					// left: 8rpx;
					font-weight: bold;
					font-size: 28rpx;
					color: #404040;

					font-size: 34rpx;
					font-weight: 600;
					overflow: hidden;
					text-overflow: ellipsis; //文本溢出显示省略号
					white-space: nowrap; //文本不会换行
					padding-right: 6rpx;
				}

				.right {
					// position: absolute;
					// top: 8rpx;
					// right: 8rpx;
					float: right;
					font-size: 28rpx;
					border-radius: 8rpx;
					background: var(--theme-auxiliary-color-default);
					gap: 20rpx;
					height: 40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 6rpx;
					white-space: nowrap;
				}

				.right.doing {
					color: var(--theme-color);

					font-size: 28rpx;
					font-weight: 500;
				}

				.right.done {
					color: var(--theme-color);

					font-size: 28rpx;
					font-weight: 500;
				}

				.right.fail {
					color: var(--theme-auxiliary-color-remind);

					font-size: 28rpx;
					font-weight: 500;
				}
			}

			.bottom {
				margin-top: 20rpx;
				// height: 60rpx;
				// position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;

				.left {
					color: #404040;

					font-size: 28rpx;
					font-weight: 400;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					line-height: 50rpx;
				}

				.right {
					// position: absolute;
					// top: 8rpx;
					// right: 8rpx;
					color: #404040;

					font-size: 24rpx;
					font-weight: 400;
					white-space: nowrap;
					padding-left: 10rpx;
				}
			}
		}
	}
</style>
