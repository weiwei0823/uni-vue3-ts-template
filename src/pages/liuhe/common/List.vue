<template>
	<view class="catroy">
		<view class="list-row">
			<uni-section class="mb-10" :title="data.name">
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
				<template v-slot:right>
					<view class="label">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path
								d="M4.25974 7.55456C4.30367 8.0219 5.04766 9.82019 6.89642 9.82019C7.67313 9.82019 8.70126 9.97908 8.87324 10.953C8.95923 11.4418 8.46012 12.6541 6.78707 12.6541C3.59426 12.6541 4.25974 7.55456 4.25974 7.55456ZM8.81529 5.94227C7.44227 5.94134 6.33002 4.13744 6.33002 1.91294C6.33002 1.67554 6.35526 1.39981 6.40666 1.0867C6.43751 0.89959 6.41071 0.707525 6.32983 0.536006C6.24894 0.364486 6.1178 0.221628 5.95381 0.126398C5.78982 0.0311691 5.60074 -0.0119254 5.41169 0.00283703C5.22263 0.0175995 5.04253 0.0895205 4.89531 0.20905C1.95954 2.59338 0.541652 5.46186 0.641661 8.81636C0.72578 11.6774 4.05972 14 7.39553 14C10.7304 14 13.4344 11.6792 13.4344 8.81636C13.4344 7.49381 12.968 6.08341 12.0352 4.58234C11.9516 4.44797 11.8353 4.33702 11.6972 4.25987C11.559 4.18272 11.4036 4.14191 11.2454 4.14126C11.0871 4.1406 10.9313 4.18013 10.7925 4.25613C10.6538 4.33213 10.5365 4.44212 10.4519 4.5758C9.8752 5.48616 9.33029 5.94227 8.81622 5.94227H8.81529Z"
								fill="white" />
						</svg>
						<view class="text">最高人气</view>
					</view>
				</template>
			</uni-section>
			<scroll-view class="scroll-y" scroll-x="true" scroll-left="120" @scrolltolower="loadMore"
				:scroll-with-animation="true">
				<view class="list-rol">
					<view class="item" name="catory-list-item" v-for="(item, index) in list" @click="detail(item)">
						<image :src="item.logo"></image>
						<view class="text">{{ item.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { games } from "@/utils/lottery/list";
export default {
	name: "List",
	components: {},
	props: {
		title: {
			type: String,
			default: ''
		},
		data: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
	data() {
		return {
			isLoad: false,
			pageNo: 1,
			pageSize: 10,
			list: [],
		}
	},
	mounted() {
		this.getGameList()
	},
	methods: {
		loadMore() {
			if (!this.isLoad) {
				this.isLoad = true
				this.pageNo += 1;
				this.getGameList()
			}
		},
		getGameList() {
			let prams = {
				gameCategoryId: this.data.gameCategoryId,
				platformId: this.data.gamePlatformId,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			pop("加载中...", 2000)
			games(prams).then(res => {
				if (res.result.records.length == 0) {
					pop("没有更多数据了...", 2000)
				} else {
					this.isLoad = false
				}
				this.list.push(...res.result.records)
			}).catch(err => {
				console.log(err)
			})
		},
		detail(item) {
			this.$config.gameRouterMgr.doOpenGameDetails(item, this);
		},
	}
}
</script>

<style lang="scss" scoped>
::v-deep .uni-section-header {
	height: 88rpx;
	box-sizing: border-box;
	padding: 20rpx 0 !important;

	.uni-section__content-title {
		color: #404040 !important;
		font-size: 34rpx !important;
	}
}

.mb-10 {
	.decoration {
		width: 6rpx;
		height: 24rpx;
		border-radius: 24rpx;
		margin-right: 10rpx;
		background-color: var(--theme-color);
	}
}

.list-row {
	// padding: 0 28rpx;
	background: #ffffff;
	border-bottom: 2rpx solid #f4f4f4;
	// margin-bottom: 20rpx;
}

.label {
	width: 154rpx;
	height: 48rpx;
	background: var(--theme-color);
	border-radius: 10rpx;
	font-size: 24rpx;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;

	.text {
		margin-left: 10rpx;
	}
}

.scroll-y {
	width: calc(100vw - 40rpx);
	max-width: calc(480px - 40rpx);
}

.list-rol {
	display: flex;

	.item {
		width: 128rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			height: 128rpx;
			width: 128rpx;
			border-radius: 20rpx;
		}

		.text {
			width: 100%;
			font-weight: 400;
			font-size: 26rpx;
			text-align: center;
			color: #404040;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 20rpx 0;
		}
	}
}
</style>
