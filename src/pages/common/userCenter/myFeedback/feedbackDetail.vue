<template>
	<view class="feedback-detail" :style="{ marginTop: safeHeight }">
		<navBarVue :title="title"></navBarVue>
		<view class="content">
			<view class="top">
				<view class="top-title">标题：</view>
				<view class="top-text">{{ detail.title }}</view>
			</view>
			<view class="bottom">
				<view class="bottom-title">内容：</view>
				<view class="bottom-text">{{ detail.description }}</view>
			</view>
		</view>
		<view class="status">
			<text class="status-title">客服回复：</text>
			<text :class="detail.status == 0 ? 'status-content red' : 'status-content green'">{{ detail.status == 0 ? "未处理"
                :
                "已处理" }}</text>
		</view>

		<view v-if="detail.pictureIdList" class="image-inputs">
			<text class="image-title">截图记录：</text>
			<view class="image-details">

				<view v-for="image in detail.pictureIdList" class="image-box">
					<image class="img" model="widthFix" :src="image.smallPictureUrl" @click="showImages(image)"></image>
				</view>
			</view>
		</view>

		<AlertInjectLayer />
	</view>
</template>
<script>
	import navBarVue from '@/components/common/navBar/navBar.vue';
	import {
		feedbackDetail
	} from '@/utils/user';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';

	export default {
		name: "feedbackDetail",
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "反馈详情",
				id: "",
				detail: {}
			}
		},
		computed: {
			...mapGetters(["MEM_WILL_SHOW_FEED_BACK_DETAIL"]),
		},

		components: {
			AlertInjectLayer,
			navBarVue
		},
		onLoad(option) {
			this.id = option.id;
			//点击事件新增内存写入 加快首屏渲染内容速度，避免干等
			if (this.MEM_WILL_SHOW_FEED_BACK_DETAIL) {
				this.detail = this.MEM_WILL_SHOW_FEED_BACK_DETAIL;
				this.id = this.detail.id;
			}
			if (!this.id) {
				pop("服务器忙，请稍后重试", 1000, null, function() {
					this.$routerUtils.toUrl("/pages/common/userCenter/myFeedback/index");
				}, this);
				return;
			}

			this.getFeedbackDetail()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			getFeedbackDetail() {
				feedbackDetail({
					id: this.id
				}).then(res => {
					if (res.code === 200) {
						this.detail = res.result
					}
				})
			},

			showImages(currentImageInfo) {
				let images = this.detail.pictureIdList;
				let currentIndex = images.indexOf(currentImageInfo);
				let allImageUrls = images.map(info => info.pictureUrl);
				uni.previewImage({
					urls: allImageUrls,
					current: currentIndex
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.feedback-detail {
		background-color: #fff;
		height: var(--vh);
	}

	.content {
		margin-top: 20rpx;
		padding: 0 20rpx;
		background-color: #fff;
		position: relative;

		&::before {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			content: " ";
			pointer-events: none;
			top: 0;
			border-top: 1px solid #ebedf0;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}

		.top {
			border-bottom: 1px solid rgb(238, 238, 238);
			line-height: 50rpx;

			.top-title {
				font-weight: bold;
				font-size: 28rpx;
			}

			.top-text {
				font-size: 24rpx;
				color: rgb(170, 170, 170);
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.bottom {
			margin-bottom: 50rpx;
			line-height: 50rpx;

			.bottom-title {
				font-weight: bold;
				font-size: 28rpx;
			}

			.bottom-text {
				font-size: 24rpx;
				color: rgb(170, 170, 170);
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.status {
		line-height: 50rpx;
		padding: 0 20rpx;

		.status-title {
			font-weight: bold;
			font-size: 28rpx;
		}

		.status-content {
			font-size: 28rpx;
		}

		.status-content.red {
			color: red;
		}

		.status-content.green {
			color: rgb(7, 193, 96);
		}
	}

	.image-inputs {
		margin-top: 30rpx;

		.image-title {
			font-weight: bold;
			font-size: 28rpx;
			margin-left: 20rpx;
			color: #3c3c3c;
		}
	}

	.image-details {
		margin-top: 15rpx;
		display: flex;
		justify-content: space-around;

		.image-box {
			width: 30%;
			height: 150rpx;
			overflow: hidden;
			border-radius: 5rpx;

			.image {
				width: auto;
				height: 200rpx;
			}
		}

	}
</style>
