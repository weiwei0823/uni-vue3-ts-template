<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }">
		<NavBar :title="title"></NavBar>
		<view class="promotion-box-body">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#4cd964"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="gl">
						<uni-row>
							<uni-col :span="8">
								<text>总共邀请：</text>
								<text class="sum">{{ obj.totalInviteCount }}人</text>
							</uni-col>
							<uni-col :span="8">
								<text>有效领取：</text>
								<text class="sum">{{ obj.availableInviteCount }}人</text>
							</uni-col>
							<uni-col :span="8">
								<text>总奖励：</text>
								<text class="sum">{{ obj.totalRewardAmount }}</text>
							</uni-col>
						</uni-row>
					</view>
					<view class="table">
						<uni-table border stripe emptyText="暂无更多数据">
							<!-- 表头行 -->
							<uni-tr>
								<uni-th align="left" width="20">时间</uni-th>
								<uni-th align="center" width="20">昵称</uni-th>
								<uni-th align="center" width="20">状态</uni-th>
								<uni-th align="center" width="20">奖励金额</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr v-for="(item, index) in  firstList" :key="index">
								<uni-td>{{ item.createTime }}</uni-td>
								<uni-td align="center">{{ item.nickname }}</uni-td>
								<uni-td align="center">{{ item.status == 1 ? '有效' : '无效' }}</uni-td>
								<uni-td align="center">{{ item.awardAmount }}</uni-td>
							</uni-tr>
						</uni-table>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="gl">
						<uni-row>
							<uni-col :span="8">
								<text>总共邀请：</text>
								<text class="sum">{{ obj.totalInviteCount }}人</text>
							</uni-col>
							<uni-col :span="8">
								<text>有效领取：</text>
								<text class="sum">{{ obj.availableInviteCount }}人</text>
							</uni-col>
							<uni-col :span="8">
								<text>总奖励：</text>
								<text class="sum">{{ obj.totalRewardAmount }}</text>
							</uni-col>
						</uni-row>
					</view>
					<view class="table">
						<uni-table border stripe emptyText="暂无更多数据">
							<!-- 表头行 -->
							<uni-tr>
								<uni-th align="left" width="20">时间</uni-th>
								<uni-th align="center" width="20">昵称</uni-th>
								<uni-th align="center" width="20">一级用户昵称</uni-th>
								<uni-th align="center" width="20">状态</uni-th>
							</uni-tr>
							<!-- 表格数据行 -->
							<uni-tr v-for="(item, index) in  secondList" :key="index">
								<uni-td>{{ item.createTime }}</uni-td>
								<uni-td align="center">{{ item.nickname }}</uni-td>
								<uni-td align="center">{{ item.downNickname }}</uni-td>
								<uni-td align="center">{{ item.status == 1 ? '有效' : '无效' }}</uni-td>
							</uni-tr>
						</uni-table>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<view class="btn" @click="toShare">马上去推广</view>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar/navBar";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import {
		publicize
	} from "@/utils/user";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	export default {
		name: "promotion",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			NavBar
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "我的推广",
				items: ['一级拉新用户', '二级拉新用户'],
				current: 0,
				firstList: [],
				secondList: [],
				obj: {}
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onReady() {
			this.getPublicizeList()
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					this.getPublicizeList()
				}
			},
			getPublicizeList() {
				publicize({
					level: this.current + 1
				}).then(res => {
					if (this.current === 0) {
						this.obj = res.result;
						this.firstList = res.result.list;
					} else {
						this.obj = res.result;
						this.secondList = res.result.list;
					}
				})
			},
			//跳转分享二维码页面
			toShare() {
				uni.navigateTo({
					url: "/pages/common/userCenter/invite"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .segmented-control {
		height: 80rpx;
		background: #fff;
	}

	::v-deep .segmented-control__text {
		font-weight: 800;
		font-size: 34rpx;
		color: #999 !important;
	}

	::v-deep .segmented-control__item--text {
		color: rgb(76, 217, 100) !important;
	}

	.promotion-box-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: absolute;
	}

	.content {
		flex: 1;
		margin-top: 20rpx;
		overflow: hidden;

		.gl {
			font-weight: 600;
			padding: 30rpx;
			font-size: 28rpx;
			background: #fff;

			.sum {
				color: #ff4545;
			}
		}
	}

	.bottom-btn {
		padding: 30rpx;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		bottom: 16rpx;
		max-width: 480px;

		.btn {
			height: 80rpx;
			background: var(--theme-color);
			border-radius: 52rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #fff;
		}
	}

	.uni-table-th {
		font-size: 24rpx;
	}

	.uni-table-td {
		font-size: 24rpx;
	}
</style>
