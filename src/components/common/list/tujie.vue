<template>
	<view class="feed" :class="['theme-' + themeColor.name]">
		<ul class="forum-list">
			<li v-for="(item, index) in dataList" :key="index">
				<uni-row>
					<uni-col style="width: 100%;" class="van-col">
						<view class="content-jc">
							<span class="content-jc-name" v-if="item.type != 12">竞猜</span>
							<span class="csize">{{ item.title }}</span>
						</view>
						<view class="bsize" @click="detail(item)">
							<view class="text">
								<view class="van-ellipsis" v-for="(val, key) in item.descriptionList" :key="key">
									{{ val }}
								</view>
							</view><!---->
						</view>
						<view class="footer">
							<image :src="item.headPic"></image>
							<span class="span">{{ item.username }}</span>
							<span>{{ item.createTime }}</span>
						</view>
						<view class="verify-status" v-if="!userId">
							<span class="error" v-if="item.status == 2">审核失败</span>
							<span class="error-text" v-if="item.status == 2" @click="lookRemark(item.remark)">查看原因</span>
							<span class="error" v-if="item.status == 0">审核中</span>
							<span class="open" v-if="item.status == 1">审核通过</span>
						</view>
					</uni-col>
				</uni-row>
			</li>
		</ul>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<uni-popup ref="tishi" type="dialog">
			<uni-popup-dialog type="info" mode="base" message="成功消息" :showCancel="false"
				:okStyle="{ color: themeColor.themeColor }" title="失败原因" :content="remark" :confirmText="'我知道了！'">

			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import {
	mapGetters
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
	name: "tujie",
	components: {
		cusPreviewImg
	},
	props: {
		dataList: Array,
		userId: {
			type: String,
			default: ''
		},
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
	},
	data() {
		return {
			ImgList: [],
			remark: ''
		}
	},
	methods: {
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			this.ImgList = imgList
			this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
		},
		//查看原因
		lookRemark: function (remark) {
			this.remark = remark
			this.$refs.tishi.open()
		},
		//跳转
		detail: function (item) {
			if (item.status == 1) {
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=' + item.type,
					success: function (res) {
						res.eventChannel.emit('argParams', {
							lotteryType: item.lotteryType
						})
					}
				})
			} else {
				uni.navigateTo({
					url: '/pages/common/userCenter/homepage/detail?id=' + item.articleId + '&type=' + item
						.type,
					success: function (res) {
						res.eventChannel.emit('argParams', {
							lotteryType: item.lotteryType
						})
					}
				})
			}
		},
		lotteryName: function (lotteryId) {
			let lotteryName = ''
			this.navList.forEach((item, index) => {
				if (item.lotteryType == lotteryId) {
					lotteryName = item.name
					return
				}
			})
			return lotteryName
		},
	}
}
</script>

<style lang="scss" scoped>



.forum-list {
	li {
		padding: 20rpx 28rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 24rpx;

		.van-col {
			box-sizing: border-box;
			min-height: 1px;
		}

		.van-ellipsis {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content-jc {
			display: flex;
			align-items: center;

			.content-jc-name {
				background: var(--theme-color);
				font-size: 24rpx;
				color: #fff;
				border-radius: 10rpx;
				padding: 6rpx 10rpx;
				margin-right: 4rpx;
				height: 26rpx;
				line-height: 26rpx;
			}

			.csize {
				color: var(--theme-auxiliary-color-remind);
				font-size: 34rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				display: -webkit-box;
			}
		}

		.bsize {
			font-size: 28rpx;
			padding: 20rpx 0;
			display: block;
			font-size: 18px;
			color: #404040;

			.text {
				font-size: 26rpx;
				line-height: 40rpx;
			}
		}

		.footer {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			display: flex;
			font-size: 24rpx;
			align-items: center;
			color: #404040;
			padding-top: 20rpx;

			image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 16rpx;
				margin-right: 20rpx;
			}

			.span {
				flex: 1;
			}
		}

		.verify-status {
			padding: 10rpx;

			.error {
				padding-left: 10rpx;
				padding-right: 10rpx;
				height: 46rpx;
				background: var(--theme-auxiliary-color-default);
				color: #666;
				display: inline-block;
				line-height: 46rpx;
				text-align: center;
				font-size: 28rpx;
				border-radius: 8rpx;
				font-weight: 500;
			}

			.open {
				padding-left: 10rpx;
				padding-right: 10rpx;
				height: 46rpx;
				background: var(--theme-auxiliary-color-default);
				border-radius: 8rpx;
				color: var(--theme-color);
				display: inline-block;
				line-height: 46rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
}
</style>
