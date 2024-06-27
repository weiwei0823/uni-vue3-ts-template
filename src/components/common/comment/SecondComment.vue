<template>
	<view>
		<!--展开更多列表-->
		<view v-show="isShow" class="reply-info-box">
			<view class="reply-info" v-for="(item, index) in SecondCommentList" :key="index">
				<view class="reply-info-user">
					<view class="user-img-to" @click="homepage(item)">
						<view class="left-image">
							<view class="van-image van-image--round" style="width: 48rpx; height: 48rpx">
								<img :src="item.headPic" class="van-image__img" />
							</view>
						</view>
						<view class="user-info van-ellipsis">
							<span class="moren">{{ item.nickname }}</span>
							<span></span>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="text-box" @click="openComment">
						<text class="text1">回复</text>
						<text class="text2">{{ item.toNickname }}：</text>
						<text class="text3">{{ item.content }}</text>
						<text class="text4">{{ item.createTimeStr }}</text>
						<text class="text5" @click="replyComment(item)">
							{{ $t("components.common.comment.SecondComment.reply") }}
						</text>
					</view>


				</view>
				<view class="zan" @click="thumbUp(item)">

					<svg style="width: 30rpx;height: 30rpx;" v-if="item.thumbUp == 0" xmlns="http://www.w3.org/2000/svg"
						width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M17.5991 21.0649H5.11406V15.9389V9.50753C6.36814 9.23895 7.51638 8.59398 8.40094 7.65165C9.43027 6.55509 10.0352 5.12762 10.1071 3.62537L10.1081 3.60565V3.5859V3.4319V3.3549V3.3252L10.1059 3.29558C10.0886 3.05456 10.1201 2.81253 10.1986 2.584C10.2771 2.35547 10.401 2.14518 10.5629 1.96575C10.7247 1.78631 10.9211 1.64144 11.1404 1.53984C11.3568 1.43954 11.591 1.38345 11.8294 1.37482C12.2576 1.37332 12.674 1.51546 13.012 1.77865C13.3286 2.02521 13.5591 2.36454 13.6721 2.74805V2.80629L13.6912 2.8936C13.8311 3.53178 13.9022 4.18313 13.9031 4.83646C13.8934 5.83692 13.726 6.82959 13.4071 7.77791L13.0412 8.8659H14.1891H19.4361V8.86592L19.442 8.86588C19.73 8.86382 20.0135 8.9372 20.2644 9.07872C20.5145 9.2198 20.7234 9.42368 20.8706 9.67021C21.0803 10.0296 21.1756 10.4444 21.1435 10.8593L21.1362 10.9534L21.1504 11.0467C21.1536 11.0677 21.1543 11.089 21.1526 11.1101L19.192 19.8728L19.1919 19.8728L19.1903 19.8803C19.19 19.8818 19.1894 19.8832 19.1884 19.8845L19.1468 19.9413L19.1154 20.0044C18.9583 20.3202 18.7198 20.5882 18.4244 20.7809L18.4029 20.7949L18.3823 20.8102C18.1578 20.9774 17.8848 21.0669 17.6048 21.0649V21.0649H17.5991Z"
							stroke="#A1A1A1" stroke-width="1.65" stroke-miterlimit="10" />
						<mask id="path-2-inside-1_21025_123703" fill="white">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M3.3 21.9008H1.1C0.492486 21.9008 0 21.4083 0 20.8008V9.8998C0 9.29229 0.492487 8.7998 1.1 8.7998H3.3" />
						</mask>
						<path
							d="M3.3 20.2508H1.1V23.5508H3.3V20.2508ZM1.65 20.8008V9.8998H-1.65V20.8008H1.65ZM1.1 10.4498H3.3V7.1498H1.1V10.4498ZM1.65 9.8998C1.65 10.2036 1.40375 10.4498 1.1 10.4498V7.1498C-0.418781 7.1498 -1.65 8.38102 -1.65 9.8998H1.65ZM1.1 20.2508C1.40376 20.2508 1.65 20.497 1.65 20.8008H-1.65C-1.65 22.3196 -0.418785 23.5508 1.1 23.5508V20.2508Z"
							fill="#A1A1A1" mask="url(#path-2-inside-1_21025_123703)" />
					</svg>
					<svg style="width: 30rpx;height: 30rpx;" v-else xmlns="http://www.w3.org/2000/svg" width="22"
						height="22" viewBox="0 0 22 22" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M21.5814 9.03238C21.1073 8.25951 20.4039 7.86481 19.4396 7.82573C19.3905 7.8192 19.3406 7.81499 19.2892 7.81499L14.1902 7.79808C14.5392 6.74675 14.7303 5.61644 14.7303 4.60077C14.7303 3.89078 14.652 3.17623 14.4986 2.47663L14.4672 2.39335L14.4648 2.39375C14.148 1.17366 13.0718 0.329102 11.8175 0.329102C10.3746 0.329102 9.28605 1.53384 9.28605 3.13139L9.2845 3.21077L9.28444 3.21323C9.28297 3.27027 9.28153 3.32607 9.28605 3.37146C9.2132 6.02108 7.10131 8.25303 4.3742 8.56374L4.28671 8.57333L4.2668 15.7221V21.6742L4.62967 21.6743L4.64497 21.6772L4.72779 21.6765L4.72819 21.6744L17.3792 21.6795L17.6054 21.6734C18.1225 21.6734 18.414 21.5422 18.872 21.2476C19.2946 20.9745 19.6368 20.5894 19.8554 20.1453C19.9221 20.0471 19.9705 19.9405 20.0004 19.8261L21.9619 11.0564C21.9903 10.9464 22.0003 10.8313 21.9919 10.7293C22.0355 10.1297 21.8936 9.54291 21.5814 9.03238ZM1.1 8.5791C0.492487 8.5791 0 9.07159 0 9.6791V20.6791C0 21.2866 0.492486 21.7791 1.1 21.7791H2.2C2.80751 21.7791 3.3 21.2866 3.3 20.6791V9.6791C3.3 9.07159 2.80751 8.5791 2.2 8.5791H1.1Z"
							:fill="themeColor.themeAuxiliaryColorRemind" />
					</svg>
					<div class="text" v-if="item.thumbUpCount != 0">{{ item.thumbUpCount }}</div>
				</view>
				<view class="images">
					<view class="img-box-1 van-row">
						<view class="van-col van-col--8" v-for="(val, key) in item.pictureList" :key="key"
							@click="previewImg(item.pictureList, val)">
							<image class="image-body" :src="val" style="object-fit: cover" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view style="clear: both"></view>
			</view>
		</view>
		<!--展开更多-->
		<view class="operate">
			<template v-if="commentCount > 0">
				<view class="m-nus" @click="showMore()" v-if="isShowMore">
					<u-loading size="28" v-if="loading"></u-loading>
					<template v-else>
						{{ $t("components.common.comment.SecondComment.expand") + '更多回复' }}
					</template>
				</view>
				<view v-if="isShow" @click="hidAll()">
					{{
						$t("components.common.comment.SecondComment.collapse")
						+ SecondCommentList.length +
						$t("components.common.comment.SecondComment.replies")
					}}
					<uni-icons type="top" size="14" style="margin-left: 5px"></uni-icons>
				</view>
			</template>
		</view><!---->
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false">
			<view style="width: 100vw; height: var(--vh)">
				<reply-comment ref="replyComment" @closeComent="closeComent" @restComment="restComment"
					:commentId="toCommentId" :relatedId="relatedId" :commentType="type" :toUserId="toUserId"
					:placeholder="placeholder" :createTime="createTime">
				</reply-comment>
			</view>
		</uni-popup>
		<!--评论详情-->
		<uni-popup ref="commentDetail" background-color="#fff" mask-background-color="rgba(0,0,0,.7)"
			:is-mask-click="false">
			<view style="width: 100vw; height: var(--vh)">
				<comment-detail :commentId="commentId" :relatedId="relatedId" :createTime="createTime" :commentType="type"
					@closeCommentDetail="closeCommentDetail"></comment-detail>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {
	listSecondComment
} from "../../../utils/comment/index.js";
import ReplyComment from "./ReplyComment";
import CommentDetail from "./CommentDetail";
import Login from "../login/Login";
import TextOverflow from "@/components/text-over-flow/text-over-flow.vue";
import {
	thumbUp
} from "../../../utils/user";
import {
	mapGetters
} from 'pinia';

export default {
	name: "SecondComment",
	components: {
		ReplyComment,
		CommentDetail,
		TextOverflow,
		Login
	},
	props: {
		relatedId: {
			type: Number,
			default: 0,
		},
		createTime: {
			type: String,
			default: "",
		},
		commentId: {
			type: Number,
			default: 0,
		},
		commentCount: {
			type: Number,
			default: 0,
		},
		type: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			isShow: false,
			SecondCommentList: [],
			prams: {
				pageNum: 1
			},
			ImgList: [],
			toCommentId: 0,
			toUserId: "",
			placeholder: "", //回复人昵称
			moreImg: false,
			isShowMore: true,
			loading: false
		};
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
	},
	methods: {
		//收起
		hidAll: function () {
			this.isShow = false;
			this.prams.pageNum = 1
			this.isShowMore = true
			this.SecondCommentList = []
		},
		//重置
		restComment: function () {
			this.$emit("restComment");
		},
		//展开更多
		showMore: function () {
			this.listSecondComment();
		},
		//用户主页
		homepage: function (item) {
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId,
			});
		},
		//获取更多评论
		async listSecondComment() {
			this.loading = true
			let prams = {
				commentId: this.commentId,
				pageNum: this.prams.pageNum,
				pageSize: 3,
			};
			try {
				const res = await listSecondComment(prams)
				this.isShow = true;
				this.prams.pageNum++;
				this.SecondCommentList.push(...res.result.list);
				if (this.commentCount <= this.SecondCommentList.length || !res.result.list?.length) {
					this.isShowMore = false
				}
				this.loading = false
			} catch (error) {
				this.isShow = true;
				this.prams.pageNum++;
				if (this.commentCount <= this.SecondCommentList.length || !res.result.list?.length) {
					this.isShowMore = false
				}
				this.loading = false

			}

		},
		//打开评论
		replyComment: function (item) {
			if (!isLogin()) {
				uni.$emit("showPop", {
					refName: "AlertMessage"
				});
				return false;
			}
			this.toCommentId = this.commentId;
			this.toUserId = item.userId;
			this.placeholder = "回复@" + (item.nickname || item.username);
			this.$refs.comentPopup.open("right");
		},
		//关闭评论
		closeComent: function () {
			this.$refs.comentPopup.close();
		},
		previewImg: function (imgList, url) {
			// 点击预览图片
			const list = [];
			imgList.forEach((item, index) => {
				list.push(item);
			});
			this.ImgList = list;
			this.$refs.cusPreviewImg.open(url); // 传入当前选中的图片地址
		},
		//打开评论详情页
		openComment() {
			this.$refs.commentDetail.open("right");
		},
		//关闭评论详情页
		closeCommentDetail() {
			this.$refs.commentDetail.close();
		},
		//点赞接口
		thumbUp: function (item) {
			if (!isLogin()) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let startItem = item || this.firstComment;

			let prams = {
				relatedId: startItem.id,
				type: 6,
				createTime: this.createTime
			}
			thumbUp(prams).then(res => {
				if (res.code == 200) {
					startItem.thumbUp = 1
					startItem.thumbUpCount++
					pop("点赞成功");
				} else {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
				}
			}).catch(err => {
				console.log(err)
			})
		},
	},
};
</script>

<style scoped>
.reply-info-box {
	margin-top: 20rpx;

}

.reply-info {
	position: relative;
}

.reply-info .reply-info-user {
	position: relative;
}

.user-img-to {
	display: inline-block;
	position: relative;
	padding-left: 68rpx;
}

.user-img-to .left-image {
	position: absolute;
	left: 0;
}

.images .img-box-1 .image-body,
.images .img-box-2 .image-body,
.images .img-box-3 .image-body {
	width: 100%;
	height: 180rpx;
	border-radius: 8rpx;
}

.van-col--8 {
	padding: 0 6rpx;
}

.images .image-body {
	margin-bottom: 10rpx;
	position: relative;
}

.van-image {
	position: relative;
	display: inline-block;
}

.images .image-body .van-image__img {
	border-radius: 10rpx;
	overflow: hidden;
}

.van-image--round {
	overflow: hidden;
	border-radius: 12rpx;
}

.van-image {
	position: relative;
	display: inline-block;
}

.van-image--round img {
	border-radius: inherit;
}

.van-image__img {
	display: block;
	width: 100%;
	height: 100%;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.user-img-to .user-info {}

.user-img-to .moren {
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	color: silver;
}

.user-img-to-text .red {
	color: red !important;
}

.user-img-to-text {
	display: inline-block;
}

.user-img-to-text .iplay {
	margin: 0 8rpx 0 12rpx;
}

.content-box {
	display: flex;
	width: 100%;
	margin-top: 10rpx;
	font-size: 28rpx;
}

.content-box span {
	display: flex;
	color: #404040;
	font-size: 26rpx;
}

.content-box span .text {
	color: #404040;
	margin: 0 10rpx;
}

.content-box .clamp-body {
	margin-left: 70rpx;
	width: 100%;
}

.van-icon,
.van-icon:before {
	display: inline-block;
}

.van-icon {
	position: relative;
	font: normal normal normal 28rpx/1 vant-icon;
	font-size: inherit;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
}

.user-img-to-text .moren {
	color: #999;
	font-style: normal;
	font-weight: 700;
	font-size: 28rpx;
}

.myfot,
.myfot .fotright {
	display: flex;
	align-items: center;
}

.myfot .etime {
	margin-right: 20rpx;
	font-size: 24rpx;
	color: #666;
}

.myfot .reply-btn {
	display: inline-block;
	text-align: center;
	font-size: 24rpx;
	color: #404040;
}

.operate {
	font-size: 28rpx;
	margin-top: 20rpx;
	color: #5C7D99;
	display: flex;
	flex-direction: column;
	margin-left: 66rpx;
}

.operate .m-nus {
	display: flex;
	align-items: center;
}

.operate .minus {
	width: 60rpx;
	height: 2rpx;
	background: #8c8c8c;
	display: inline-block;
}
</style>

<style lang="scss" scoped>
::v-deep .dt-content {
	margin-top: 0 !important;
}

.images {
	margin-top: 20rpx;
}

.content {
	display: flex;
	justify-content: space-between;
}

.zan {
	position: absolute;
	top: 10rpx;
	right: 0;
	color: #666;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 66rpx;
}

.content .zan {}

.zan .text {
	margin-top: 10rpx;
	color: #404040;
	font-size: 28rpx;
}

.text-box {
	padding-left: 68rpx;
	font-size: 26rpx;
	line-height: 40rpx;
	width: 512rpx;
	box-sizing: border-box;

	.text1 {
		color: #404040;
		margin-right: 10rpx;
	}

	.text2 {
		color: #404040;
		margin-right: 10rpx;
	}

	.text3 {
		color: #404040;
		margin-right: 10rpx;
	}

	.text4 {
		color: #A1A1A1;
		font-size: 24rpx;
		margin-right: 10rpx;
	}

	.text5 {
		color: #404040;
		font-size: 24rpx;
		margin-right: 10rpx;
	}
}
</style>
