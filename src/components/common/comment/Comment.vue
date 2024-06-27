<template>
	<view class="comment-list" :class="['theme-' + themeColor.name]">
		<!--热门评论-->
		<view>
			<view class="hot-list">
				<view class="details-title">{{
					$t("components.common.comment.text0")
				}}</view>
			</view>
			<template v-if="listComment.length > 0">
				<view class="comment-item" v-for="(value, keys) in listComment" :key="keys">
					<view class="user-img" @click="homepage(value)">
						<view class="left-image">
							<view class="van-image van-image--round">
								<img :src="value.headPic" class="van-image__img" />
							</view>
						</view>
						<view class="user-info">
							<view class="name" :class="{ red: value.vip == 1 }">
								{{ value.nickname }}
								<span class="reportInfo"></span>
							</view>
							<view class="time"></view>
						</view><!---->
					</view>
					<view class="comment-item-bd">
						<view class="text">
							<span class="clamp-body" style="overflow: hidden">
								<span style="box-shadow: transparent 0px 0px">
									<TextOverflow :text="value.content" />
								</span>
							</span>
						</view>
						<view class="images-box" v-if="value.pictureList.length">
							<view class="images">
								<view class="img-box-1 van-row">
									<view class="van-col van-col--8" v-for="(val, key) in value.pictureList" :key="key"
										@click="previewImg(value.pictureList, val)">
										<fast-lazy-load :id="'content-wrap' + key" @click="previewImg(value.pictureList, val)"
											class="img-list" :radius="'8rpx'" :src="val" :width="'100%'" :height="'180rpx'" mode="aspectFill"
											:isMark="true">
											<template v-slot:loading>
												<image class="lazy-image" :src="loadingImg"></image>
											</template>
											<template v-slot:error>
												<image class="lazy-image" :src="loadingImg"></image>
											</template>
										</fast-lazy-load>
										<!-- <image class="image-body" :src="val" style="object-fit: cover"
											mode="aspectFill">

										</image> -->
									</view>
								</view><!----><!----><!---->
							</view>
						</view>
						<view style="clear: both"></view>
						<view class="secs">
							<span class="time">{{ value.createTimeStr }}</span>
							<view class="btn-hf" @click="replyComment(value)">
								{{ $t("components.common.comment.text2") }}
							</view>
							<span class="zan post" @click="thumbUp(value)">
								<img v-if="value.thumbUp == 0" src="@/static/img/zan-stroke.png" alt="" class="zan-img">
								<img v-else src="@/static/img/zan-fill.png" alt="" class="zan-img">
								<view class="text">{{ value.thumbUpCount || '' }}</view>
							</span>
						</view>
						<!--二级评论-->
						<second-comment @restComment="restComment" :type="type" :commentId="value.id"
							:commentCount="value.commentCount" :relatedId="relatedId" :createTime="createTime"></second-comment>
					</view>
				</view>
			</template>
			<div class="van-empty" v-else>
				<div class="van-empty__image" style="max-width: 220rpx; height: 200rpx">
					<img mode="heightFix" src="@/static/imgs-liuhe/activity/empty.png" />
				</div>
				<p class="van-empty__description">
					{{ $t("components.common.comment.text7") }}
				</p>
			</div>
		</view>
		<!--最新评论-->
		<view class="new-list">
			<view class="jhs">
				<view class="mc-title">
					<span :class="newPrams.postUserId == '' ? 'active' : ''" @click="postUserId('')">{{
						$t("components.common.comment.text3") }}</span>
					<span :class="newPrams.postUserId != '' ? 'active' : ''" @click="postUserId(userId)" v-if="isShow">{{
						$t("") }}</span>
				</view>
				<view class="mc-tab">
					<span :class="newPrams.sort == 0 ? 'active' : ''" @click="sort(0)">{{
						$t("components.common.comment.text4")
					}}</span>
					<span :class="newPrams.sort == 1 ? 'active' : ''" @click="sort(1)">{{
						$t("components.common.comment.text5")
					}}</span>
				</view>
			</view>
			<view role="feed" class="van-list" v-if="newList.length > 0">
				<view class="comment-item" v-for="(item, index) in newList">
					<view class="user-img" @click="homepage(item)">
						<view class="left-image">
							<view class="van-image van-image--round">
								<img :src="item.headPic" class="van-image__img" />
							</view>
						</view>
						<view class="user-info">
							<view class="name" :class="{ red: item.vip == 1 }">
								{{ item.nickname }}
								<span class="reportInfo"></span>
							</view>
							<div class="time"></div>
						</view><!---->
					</view>
					<view class="comment-item-bd">
						<view class="text">
							<span class="clamp-body" style="overflow: hidden">
								<span style="box-shadow: transparent 0px 0px">
									<span aria-label="">
										<TextOverflow :text="item.content" />
									</span>
								</span>
							</span>
						</view><!---->
						<view class="images-box">
							<view class="images">
								<view class="img-box-1 van-row">
									<view class="van-col van-col--8" v-for="(val, key) in item.pictureList" :key="key"
										@click="previewImg(item.pictureList, val)">
										<image class="image-body" :src="val" style="object-fit: cover" mode="aspectFill">
										</image>
									</view>
								</view><!----><!----><!---->
							</view>
						</view>
						<view class="secs">
							<span class="time">{{ item.createTimeStr }}</span>
							<view class="btn-hf" @click="replyComment(item)">
								{{ $t("components.common.comment.text6") }}
							</view>
							<span class="zan post" @click="thumbUp(item)">
								<img v-if="item.thumbUp == 0" src="@/static/img/zan-stroke.png" alt="" class="zan-img">
								<img v-else src="@/static/img/zan-fill.png" alt="" class="zan-img">
								<view class="text">{{ item.thumbUpCount }}</view>
							</span>
						</view><!----><!----><!---->
						<!--二级评论-->
						<second-comment @restComment="restComment" :commentId="item.id" :commentCount="item.commentCount"
							:relatedId="relatedId" :type="type" :createTime="createTime"></second-comment>
					</view>
				</view>
				<view class="van-list__placeholder"></view>
			</view>

			<div class="van-empty" v-else>
				<div class="van-empty__image" style="max-width: 220rpx; height: 200rpx">
					<img mode="heightFix" src="@/static/imgs-liuhe/activity/empty.png" />
				</div>
				<p class="van-empty__description">
					{{ $t("components.common.comment.text7") }}
				</p>
			</div>
		</view>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)" :is-mask-click="false"
			class="comment-pop">
			<view style="width: 100vw; height: var(--vh)">
				<reply-comment ref="replyComment" @closeComent="closeComent" @restComment="restComment" :commentId="commentId"
					:relatedId="relatedId" :createTime="createTime" :commentType="type" :toUserId="toUserId"
					:placeholder="placeholder">
				</reply-comment>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import cusPreviewImg from "@/components/cus-previewImg/cus-previewImg.vue";
import SecondComment from "./SecondComment";
import ReplyComment from "./ReplyComment";
import TextOverflow from '@/components/TextOverflow/index.vue'

import {
	commentList,
	listLatest
} from "../../../utils/comment/index.js";
import {
	thumbUp
} from "../../../utils/user/index.js";
import {
	mapGetters
} from 'pinia';
export default {
	name: "Comment",
	components: {
		cusPreviewImg,
		SecondComment,
		ReplyComment,
		TextOverflow,
	},
	props: {
		//文章ID
		relatedId: {
			type: Number,
			default: 0,
		},
		//类型
		type: {
			type: Number,
		},
		//是否显示
		isShow: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: String,
			default: "",
		},
		createTime: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			//评论请求参数
			commentPrams: {
				pageSize: 10, //每页的数量
				pageNum: 1, //当前页数
			},
			//更多回复请求参数
			listComment: [], //评论
			SecondCommentList: [], //更多回复
			ImgList: [],
			//最新评论
			newPrams: {
				sort: 0,
				postUserId: "",
				pageNum: 0, //当前页数
				pageSize: 10, //每页数量
			},
			//最新评论
			newList: [],
			commentId: 0, //评论ID
			toUserId: "", //回复用户ID
			placeholder: "", //回复人昵称
			loadingImg: '@/static/img/zw.png',
			listTotal: 0,
			init: false
		};
	},
	watch: {
		createTime(val) {
			if (val) {
				this.init = false;
				this.listTotal = 0;
				this.restComment()
				this.commentLists();
				this.listLatest();
			}
		},

	},
	mounted() {
		// this.commentLists();
		// this.listLatest();
	},
	computed: {
		...mapState(AppInfoStore, ['themeColor']),
	},
	methods: {
		//用户主页
		homepage: function (item) {
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId,
			});
		},
		//获取热门评论
		commentLists: function () {
			if (!this.createTime) return;
			let prams = {
				relatedId: this.relatedId,
				type: this.type,
				sort: 1,
				createTime: "",
				createTime: this.createTime,
				pageSize: this.commentPrams.pageSize,
				pageNum: this.commentPrams.pageNum,
			};
			commentList(prams)
				.then((res) => {

					this.listComment = res.result?.records || [];
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//
		postUserId: function (id) {
			this.newPrams.postUserId = id;
			this.newPrams.pageNum = 0;
			this.newList = [];
			this.listLatest();
		},
		//排序
		sort: function (sort) {
			this.newPrams.sort = sort;
			this.newPrams.pageNum = 0;
			this.newList = [];
			this.listLatest();
		},
		//重置评论
		restComment: function () {
			this.listComment = [];
			this.commentLists();
			this.newPrams.pageNum = 0;
			this.newList = [];
			this.listLatest();
		},
		//最新评论
		listLatest: function () {
			if (this.newList.length >= this.listTotal && this.init) return;
			this.newPrams.pageNum++;
			let prams = this.newPrams;
			prams.createTime = this.createTime;
			prams.relatedId = this.relatedId;
			prams.type = this.type;
			listLatest(prams)
				.then((res) => {
					this.newList.push(...[res.result?.records || []]);
					this.listTotal = res.result?.total || 0;
					this.init = true;
					this.$emit("setIsLoadMore");
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//点赞接口
		thumbUp: function (item) {
			if (!isLogin()) {
				this.$emit("openPopup");
				return false;
			}
			let prams = {
				relatedId: item.id,
				type: 6,
				createTime: this.createTime,
			};
			thumbUp(prams)
				.then((res) => {
					if (res.code == 200) {
						item.thumbUp = 1;
						item.thumbUpCount++;
					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: "none",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//打开评论
		replyComment: function (item) {
			if (!isLogin()) {
				this.$emit("openPopup");
				return false;
			}
			this.commentId = item.id;
			this.toUserId = item.userId;
			this.placeholder = "回复@" + item.nickname ? item.nickname : "";
			if (document.querySelector(".top-search-block")?.style) document.querySelector(".top-search-block")
				.style.display = "none";
			if (document.querySelector(".header-content-box")?.style) document.querySelector(".header-content-box")
				.style.display = "none";

			this.$refs.comentPopup.open("right");
		},
		//关闭评论
		closeComent: function () {
			document.querySelector(".top-search-block").style.display = "block";
			document.querySelector(".header-content-box").style.display = "block";
			this.$refs.comentPopup.close();

		},

		previewImg: function (imgList, url) {
			// 点击预览图片
			this.ImgList = imgList;
			this.$refs.cusPreviewImg.open(url); // 传入当前选中的图片地址
		},
	},
};
</script>

<style scoped>
.comment-pop {
	z-index: 99999999999;
	left: 0;
	width: 100vw;
	height: 100vh;
}

::v-deep .content::before {
	height: auto !important;
}

::v-deep .webkit-line-clamp {
	height: auto !important;
}

.comment-list {
	padding: 0 28rpx;
	background-color: #fff;
	padding-bottom: 30rpx;
}

.hot-list {
	border-bottom: 1px solid var(--theme-auxiliary-color-default);
}

.details-title {
	padding: 20rpx 0;
	height: 60rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: fit-content;
	font-size: 30rpx;
	position: relative;
	color: var(--theme-color);
	font-weight: 600;
}

.details-title:after {
	content: "";
	display: block;
	height: 6rpx;
	width: 36rpx;
	border-radius: 6rpx 6rpx 0 0;
	background: var(--theme-color);
}

.comment-item {
	padding-top: 20rpx;
	position: relative;
}

.user-img {
	display: inline-block;
	position: relative;
	padding-left: 88rpx;
}

.user-img .left-image {
	position: absolute;
	left: 0;
	top: 0;
}

.user-img .left-image .van-image {
	width: 70rpx;
	height: 70rpx;
}

.van-image--round {
	overflow: hidden;
	border-radius: 12rpx;
}

.van-image--round img {
	border-radius: inherit;
}

.van-image__error,
.van-image__img,
.van-image__loading {
	display: block;
	width: 100%;
	height: 100%;
}

.user-img .left-image .floor {
	text-align: center;
	font-size: 24rpx;
	color: #888;
	padding-top: 4rpx;
}

.user-img .user-info .name.red {
	color: red !important;
}

.user-img .user-info .name {
	font-style: normal;
	font-weight: 400;
	font-size: 24rpx;
	color: #A1A1A1;
	margin-bottom: 10rpx;
}

.user-img .user-info .name .reportInfo {
	padding: 8rpx 0 6rpx 0;
	margin-right: 10rpx;
	font-size: 30rpx;
	color: #ec0808;
}

.user-img .user-info .time {
	font-size: 24rpx;
	color: #888;
}

.comment-list .comment-item .comment-item-bd {
	padding-left: 88rpx;
}

.comment-list .comment-item .comment-item-bd .text {
	font-size: 26rpx;
}

.clamp-body {
	position: relative;
	word-break: break-all;
	width: 512rpx;
	display: block;
}

.images-box {
	margin-top: 0;
}

.images .img-box-1 .image-body,
.images .img-box-2 .image-body,
.images .img-box-3 .image-body {
	width: 100%;
	height: 180rpx;
	border-radius: 8rpx;
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

.van-col--8 {
	width: 33.33333333%;
	padding: 0 6rpx;
}

.van-image__error,
.van-image__img,
.van-image__loading {
	display: block;
	width: 100%;
	height: 100%;
}

.secs {
	clear: both;
	display: flex;
	align-items: center;
	margin-top: 10rpx;
}

.secs .time {
	font-size: 24rpx;
	color: #A1A1A1;
}

.secs .btn-hf {
	margin-left: 10rpx;
	padding-top: 0 !important;
}

.comment-list .comment-item .comment-item-bd .btn-hf {
	font-size: 24rpx;
	color: #404040;
}

.comment-list .comment-item .zan {
	position: absolute;
	top: 20rpx;
	right: 0;
	color: #666;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 64rpx;
}

.zan .text {
	margin-top: 10rpx;
	color: #404040;
	font-size: 28rpx;
}

.comment-list .new-list {
	margin-top: 20rpx;
}

.comment-list .new-list .jhs {
	display: flex;
	justify-content: space-between;
	height: 68rpx;
	padding-bottom: 20rpx;
	border-bottom: 1px solid var(--theme-auxiliary-color-default);
}

.comment-list .new-list .mc-title {
	display: flex;
	color: var(--theme-color);
}

.comment-list .new-list .mc-title span {
	font-weight: 400;
	font-size: 32rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.comment-list .new-list .mc-title span.active:after {
	content: "";
	display: block;
	width: 36rpx;
	height: 6rpx;
	border-radius: 6rpx 6rpx 0px 0px;
	background: var(--theme-color);
}

.comment-list .new-list .mc-tab {
	display: flex;
	justify-content: space-between;
	background: #eee;
	font-weight: 400;
	font-size: 28rpx;
	color: #404040;
	border-radius: 16rpx;
	align-items: center;
	width: 204rpx;
	height: 68rpx;
	padding: 10rpx 6rpx;
	box-sizing: border-box;
	text-align: center;
}

.comment-list .new-list .mc-tab span {
	width: 96rpx;
	height: 56rpx;
	display: grid;
	place-content: center;
}

.comment-list .new-list .mc-tab span.active {
	color: var(--theme-color);
	background: #fff;
	border-radius: 12rpx;
}

.van-empty {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 32px 0;
}

.van-empty__description {
	margin-top: 16px;
	padding: 0 60px;
	color: #D8D8D8;
	font-size: 28rpx;
	line-height: 20px;
}

.van-empty__image img {
	width: 100%;
	height: 100%;
}

.van-list__placeholder {
	height: 0;
	pointer-events: none;
}

.zan-img {
	width: 30rpx;
	height: 30rpx;
}
</style>
