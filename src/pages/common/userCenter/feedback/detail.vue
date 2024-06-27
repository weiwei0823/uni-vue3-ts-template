<template>
	<view :class="['theme-' + themeColor.name]">
		<Header isFixed>
			<!-- :title="title" -->
			<!-- <NavBar :header-style="headerStyle" :bg-color="headerStyle.backgroundColor" :font-color="fontColor" -->
			<!-- :title-style="titleStyle"> -->
			<block slot="center">
				<view class="nav-title">
					<view class="nav-tabs">
						<view v-for="item in headerTab" :key="item.key"
							:class="dataType === item.key ? 'nav-tabs-item active' : 'nav-tabs-item'"
							@click="onChangeTab(item.key)">
							{{ item.value }}
						</view>
					</view>
				</view>
			</block>
		</Header>
		<!-- <NavBar :title="title" :header-style="headerStyle" :bg-color="headerStyle.backgroundColor"
			:font-color="fontColor" :title-style="titleStyle">
		</NavBar> -->

		<view class="detail">
			<view class="title-t" style="margin: 0;padding-left: 28rpx;">
				{{$t("pages.common.userCenter.feedback.detail.text1")}}
			</view>
			<view class="item">
				<view class="content">
					<view class="media-list" v-if="data.pictureIdList&&data.pictureIdList.length">

						<template v-for="(item, index) in data.pictureIdList">
							<image v-if="checkMediaType(item.pictureUrl, 'image')" mode="aspectFill"
								:src="item.pictureUrl" style="width: 218rpx;
				height: 218rpx;
				border-radius: 30rpx;" @click="previewImg(item.pictureUrl, item)" />
							<video v-if="checkMediaType(item.pictureUrl, 'video')" style="width: 218rpx;
				height: 218rpx;
				border-radius: 30rpx;" :src="item.pictureUrl" controls></video>
						</template>
					</view>
					<text class="text">{{ data.description }}</text>
					<view class="replay" v-if="data.reply">
						<text class="replay_title">回复：</text>
						{{data.reply}}
					</view>
					<view class="time">
						{{ data.createTime }}
					</view>
				</view>
			</view>

		</view>

		<!-- 	<view class="content">
			<template v-for="(item, index) in data.pictureIdList">
				<image v-if="checkMediaType(item.pictureUrl, 'image')" mode="widthFix" :src="item.pictureUrl"
					style="width: 100%;" />
				<video v-if="checkMediaType(item.pictureUrl, 'video')" style="width: 100%;height: 300rpx;"
					:src="item.pictureUrl" controls></video>
			</template>
			<text class="text">{{ data.description }}</text>
		</view> -->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'pinia';
	import NavBar from "@/components/common/navBar/navBar";
	import Header from '@/components/common/header/index.vue';
	import {
		feedbackDetail
	} from '@/utils/user/feedback'
	import defaultTemplate from '@/utils/defaultTemplate'
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		components: {
			NavBar,
			Header,
			cusPreviewImg
		},
		data() {
			return {
				dataType: 2,
				headerTab: [{
						key: 1,
						value: this.$t("pages.common.userCenter.feedback.detail.text2"),
					},
					{
						key: 2,
						value: this.$t("pages.common.userCenter.feedback.detail.text3"),
					},
				],
				title: this.$t("pages.common.userCenter.feedback.detail.text4"),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				data: {},
				ImgList: []
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		onLoad(option) {
			this.getFeedbackDetail(option.id)
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			previewImg: function(imgList, url) { // 点击预览图片
				this.ImgList = [imgList]
				this.$refs.cusPreviewImg.open(url.pictureUrl) // 传入当前选中的图片地址
			},
			onChangeTab(index) {
				uni.navigateTo({
					url: `/pages/common/userCenter/feedback/index?dataType=${index}`
				})
			},
			checkMediaType(url, type) {
				// 获取链接的扩展名
				const extension = this.getExtension(url);

				// 根据扩展名判断媒体类型
				if (extension === 'jpg' || extension === 'png' || extension === 'gif' || extension === 'jpeg') {
					return type === 'image';
				} else if (extension === 'mp4' || extension === 'webm' || extension === 'ogg' || extension === 'mov') {
					return type === 'video';
				} else {
					return false;
				}
			},
			getExtension(url) {
				// 从链接中提取扩展名
				const parts = url.split('.');
				return parts[parts.length - 1].toLowerCase();
			},
			async getFeedbackDetail(id) {
				const res = await feedbackDetail({
					id
				})
				const result = defaultTemplate({
					title: "有奖反馈",
					description: "",
					pictureIdList: [{
						id: '',
						pictureUrl: "",
					}],
					createTime: "",
					reply: ""
				}, res.result)
				this.data = result
				this.title = result.title
			}
		}
	}
</script>

<style lang="scss" scoped>
	.replay {
		background: #FFF;
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 28rpx;
		color: #404040;

		.replay_title {
			color: var(--theme-color);
		}
	}

	.title-t {
		font-weight: 500;
		font-size: 34rpx;
		color: #404040;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 20rpx 0;

		&::before {
			content: '';
			width: 6rpx;
			height: 24rpx;
			border-radius: 6rpx;
			background: var(--theme-color);
			display: block;
			margin-right: 20rpx;

		}
	}

	.detail {
		background: #FFFFFF;
		margin-top: 20rpx;
		box-sizing: border-box;
		border-radius: 24rpx;

		.item {
			display: flex;
			justify-content: space-between;
			font-weight: 400;
			font-size: 28rpx;
			color: #6F737B;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);

			align-items: center;

			.slot-text {

				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.item:last-child {
			border: none;
		}
	}

	.nav-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.nav-tabs {
			display: flex;
			border-radius: 16rpx;
			margin: 0 auto;
			border: 1px solid #fff;
			background: var(--theme-auxiliary-color-default);

			.nav-tabs-item {
				font-size: clamp(20rpx, 26rpx, 26rpx);
				width: 140rpx;
				text-align: center;
				display: block;
				padding: 9rpx;
				transition: .3s;
			}

			// .nav-tabs-item:nth-child(1) {
			// 	border-top-left-radius: 50rpx;
			// 	border-bottom-left-radius: 50rpx;
			// }

			// .nav-tabs-item:nth-child(2) {
			// 	border-top-right-radius: 50rpx;
			// 	border-bottom-right-radius: 50rpx;
			// }

			.nav-tabs-item.active {
				background: var(--theme-color);
				color: #fff;
				transition: .3s;
				border-radius: 12rpx;
			}
		}
	}

	.content {
		padding: 0 28rpx 20rpx;
		width: 100%;

		.media-list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
		}

		.text {
			color: #404040;
			font-size: 28rpx;
		}

		.time {
			color: #404040;

			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			border-top: 1px dashed var(--theme-auxiliary-color-default);
			line-height: normal;
			margin-top: 20rpx;
			padding-top: 20rpx;
		}
	}
</style>
