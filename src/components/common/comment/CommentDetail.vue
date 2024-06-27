<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }">
		<!--顶部导航栏-->
		<view class="header-box">
			<view class="header">
				<view class="box-bg">
					<Header title="评论详情" :isBack="false" showBack @back="back" />
				</view>
			</view>
		</view>
		<!--评论详情-->
		<z-paging class="" :height="'85vh'" ref="paging" v-model="dataList" @query="listSecondComment"
			:refresher-enabled="false" :hide-empty-view="false" :empty-view-center="true" :empty-view-text="'暂无数据'"
			:hide-no-more-inside="false" :empty-view-img="'@/static/img/wu.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '128rpx', 'height': '130rpx' }"
			:empty-view-title-style="{ 'color': ' #a0a0a0', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '28rpx' }">
			<view class="comment-two-body">
				<view class="comment-item comment-item-hd" v-if="firstComment.headPic">
					<view class="user-img">
						<view class="left-image">
							<image model="widthFix" :src="firstComment.headPic"></image>
						</view>
						<view class="user-info">
							<view class="name">
								{{ ' ' + firstComment.username + ' ' }}
								<span class="reportInfo"></span>
							</view>
							<view class="time">

							</view>
						</view>
					</view>
					<view class="zan" @click="thumbUp()">
						<svg style="width: 30rpx;height: 30rpx;" v-if="firstComment.thumbUp == 0"
							xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<path
								d="M17.5991 21.0649H5.11406V15.9389V9.50753C6.36814 9.23895 7.51638 8.59398 8.40094 7.65165C9.43027 6.55509 10.0352 5.12762 10.1071 3.62537L10.1081 3.60565V3.5859V3.4319V3.3549V3.3252L10.1059 3.29558C10.0886 3.05456 10.1201 2.81253 10.1986 2.584C10.2771 2.35547 10.401 2.14518 10.5629 1.96575C10.7247 1.78631 10.9211 1.64144 11.1404 1.53984C11.3568 1.43954 11.591 1.38345 11.8294 1.37482C12.2576 1.37332 12.674 1.51546 13.012 1.77865C13.3286 2.02521 13.5591 2.36454 13.6721 2.74805V2.80629L13.6912 2.8936C13.8311 3.53178 13.9022 4.18313 13.9031 4.83646C13.8934 5.83692 13.726 6.82959 13.4071 7.77791L13.0412 8.8659H14.1891H19.4361V8.86592L19.442 8.86588C19.73 8.86382 20.0135 8.9372 20.2644 9.07872C20.5145 9.2198 20.7234 9.42368 20.8706 9.67021C21.0803 10.0296 21.1756 10.4444 21.1435 10.8593L21.1362 10.9534L21.1504 11.0467C21.1536 11.0677 21.1543 11.089 21.1526 11.1101L19.192 19.8728L19.1919 19.8728L19.1903 19.8803C19.19 19.8818 19.1894 19.8832 19.1884 19.8845L19.1468 19.9413L19.1154 20.0044C18.9583 20.3202 18.7198 20.5882 18.4244 20.7809L18.4029 20.7949L18.3823 20.8102C18.1578 20.9774 17.8848 21.0669 17.6048 21.0649V21.0649H17.5991Z"
								stroke="#404040" stroke-width="1.65" stroke-miterlimit="10" />
							<mask id="path-2-inside-1_21025_123703" fill="white">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M3.3 21.9008H1.1C0.492486 21.9008 0 21.4083 0 20.8008V9.8998C0 9.29229 0.492487 8.7998 1.1 8.7998H3.3" />
							</mask>
							<path
								d="M3.3 20.2508H1.1V23.5508H3.3V20.2508ZM1.65 20.8008V9.8998H-1.65V20.8008H1.65ZM1.1 10.4498H3.3V7.1498H1.1V10.4498ZM1.65 9.8998C1.65 10.2036 1.40375 10.4498 1.1 10.4498V7.1498C-0.418781 7.1498 -1.65 8.38102 -1.65 9.8998H1.65ZM1.1 20.2508C1.40376 20.2508 1.65 20.497 1.65 20.8008H-1.65C-1.65 22.3196 -0.418785 23.5508 1.1 23.5508V20.2508Z"
								fill="#404040" mask="url(#path-2-inside-1_21025_123703)" />
						</svg>
						<svg style="width: 30rpx;height: 30rpx;" v-else xmlns="http://www.w3.org/2000/svg" width="22"
							height="22" viewBox="0 0 22 22" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M21.5814 9.03238C21.1073 8.25951 20.4039 7.86481 19.4396 7.82573C19.3905 7.8192 19.3406 7.81499 19.2892 7.81499L14.1902 7.79808C14.5392 6.74675 14.7303 5.61644 14.7303 4.60077C14.7303 3.89078 14.652 3.17623 14.4986 2.47663L14.4672 2.39335L14.4648 2.39375C14.148 1.17366 13.0718 0.329102 11.8175 0.329102C10.3746 0.329102 9.28605 1.53384 9.28605 3.13139L9.2845 3.21077L9.28444 3.21323C9.28297 3.27027 9.28153 3.32607 9.28605 3.37146C9.2132 6.02108 7.10131 8.25303 4.3742 8.56374L4.28671 8.57333L4.2668 15.7221V21.6742L4.62967 21.6743L4.64497 21.6772L4.72779 21.6765L4.72819 21.6744L17.3792 21.6795L17.6054 21.6734C18.1225 21.6734 18.414 21.5422 18.872 21.2476C19.2946 20.9745 19.6368 20.5894 19.8554 20.1453C19.9221 20.0471 19.9705 19.9405 20.0004 19.8261L21.9619 11.0564C21.9903 10.9464 22.0003 10.8313 21.9919 10.7293C22.0355 10.1297 21.8936 9.54291 21.5814 9.03238ZM1.1 8.5791C0.492487 8.5791 0 9.07159 0 9.6791V20.6791C0 21.2866 0.492486 21.7791 1.1 21.7791H2.2C2.80751 21.7791 3.3 21.2866 3.3 20.6791V9.6791C3.3 9.07159 2.80751 8.5791 2.2 8.5791H1.1Z"
								:fill="themeColor.themeAuxiliaryColorRemind" />
						</svg>
						<div class="label" style="margin-left: 10rpx;margin-top: -4rpx;">{{ firstComment.thumbUpCount }}
						</div>
					</view>
					<view class="comment-item-bd">
						<view class="text" v-if="firstComment.content.length > 0">
							<TextOverflow :text="firstComment.content" />
						</view>
						<view class="images-box">
							<view class="images">
								<uni-row class="van-row">
									<uni-col v-for="(item, index) in firstComment.pictureList" :span="8"
										style="padding: 0 3px;">
										<image class="image-body" :src="item" style="object-fit: cover;"
											@click="previewImg(firstComment.pictureList, item)" mode="aspectFill">
										</image>
									</uni-col>
								</uni-row>
							</view>
						</view>
					</view>
					<view>
						<view class="firstComment-box" v-for="item in scoundList">
							<!-- <view class="firstComment-box" v-for="item in firstComment.subCommentList"> -->
							<view class="left">
								<image style="width: 48rpx;height: 48rpx;border-radius: 16rpx;" :src="item.headPic">
								</image>
							</view>
							<view class="center">
								<view class="name">{{ item.nickname }}</view>
								<view class="text-box">
									<text class="text1">回复</text>
									<text class="text2">{{ item.toNickname }}：</text>
									<text class="text3">{{ item.content }}</text>
									<text class="text4">{{ item.createTimeStr }}</text>
									<text class="text5" @click="replyComment(item)">
										{{ $t("components.common.comment.SecondComment.reply") }}
									</text>
								</view>
							</view>
							<view class="right" @click="thumbUp(item)">
								<svg style="width: 30rpx;height: 30rpx;" v-if="item.thumbUp == 0"
									xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
									fill="none">
									<path
										d="M17.5991 21.0649H5.11406V15.9389V9.50753C6.36814 9.23895 7.51638 8.59398 8.40094 7.65165C9.43027 6.55509 10.0352 5.12762 10.1071 3.62537L10.1081 3.60565V3.5859V3.4319V3.3549V3.3252L10.1059 3.29558C10.0886 3.05456 10.1201 2.81253 10.1986 2.584C10.2771 2.35547 10.401 2.14518 10.5629 1.96575C10.7247 1.78631 10.9211 1.64144 11.1404 1.53984C11.3568 1.43954 11.591 1.38345 11.8294 1.37482C12.2576 1.37332 12.674 1.51546 13.012 1.77865C13.3286 2.02521 13.5591 2.36454 13.6721 2.74805V2.80629L13.6912 2.8936C13.8311 3.53178 13.9022 4.18313 13.9031 4.83646C13.8934 5.83692 13.726 6.82959 13.4071 7.77791L13.0412 8.8659H14.1891H19.4361V8.86592L19.442 8.86588C19.73 8.86382 20.0135 8.9372 20.2644 9.07872C20.5145 9.2198 20.7234 9.42368 20.8706 9.67021C21.0803 10.0296 21.1756 10.4444 21.1435 10.8593L21.1362 10.9534L21.1504 11.0467C21.1536 11.0677 21.1543 11.089 21.1526 11.1101L19.192 19.8728L19.1919 19.8728L19.1903 19.8803C19.19 19.8818 19.1894 19.8832 19.1884 19.8845L19.1468 19.9413L19.1154 20.0044C18.9583 20.3202 18.7198 20.5882 18.4244 20.7809L18.4029 20.7949L18.3823 20.8102C18.1578 20.9774 17.8848 21.0669 17.6048 21.0649V21.0649H17.5991Z"
										stroke="#404040" stroke-width="1.65" stroke-miterlimit="10" />
									<mask id="path-2-inside-1_21025_123703" fill="white">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M3.3 21.9008H1.1C0.492486 21.9008 0 21.4083 0 20.8008V9.8998C0 9.29229 0.492487 8.7998 1.1 8.7998H3.3" />
									</mask>
									<path
										d="M3.3 20.2508H1.1V23.5508H3.3V20.2508ZM1.65 20.8008V9.8998H-1.65V20.8008H1.65ZM1.1 10.4498H3.3V7.1498H1.1V10.4498ZM1.65 9.8998C1.65 10.2036 1.40375 10.4498 1.1 10.4498V7.1498C-0.418781 7.1498 -1.65 8.38102 -1.65 9.8998H1.65ZM1.1 20.2508C1.40376 20.2508 1.65 20.497 1.65 20.8008H-1.65C-1.65 22.3196 -0.418785 23.5508 1.1 23.5508V20.2508Z"
										fill="#404040" mask="url(#path-2-inside-1_21025_123703)" />
								</svg>
								<svg style="width: 30rpx;height: 30rpx;" v-else xmlns="http://www.w3.org/2000/svg"
									width="22" height="22" viewBox="0 0 22 22" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M21.5814 9.03238C21.1073 8.25951 20.4039 7.86481 19.4396 7.82573C19.3905 7.8192 19.3406 7.81499 19.2892 7.81499L14.1902 7.79808C14.5392 6.74675 14.7303 5.61644 14.7303 4.60077C14.7303 3.89078 14.652 3.17623 14.4986 2.47663L14.4672 2.39335L14.4648 2.39375C14.148 1.17366 13.0718 0.329102 11.8175 0.329102C10.3746 0.329102 9.28605 1.53384 9.28605 3.13139L9.2845 3.21077L9.28444 3.21323C9.28297 3.27027 9.28153 3.32607 9.28605 3.37146C9.2132 6.02108 7.10131 8.25303 4.3742 8.56374L4.28671 8.57333L4.2668 15.7221V21.6742L4.62967 21.6743L4.64497 21.6772L4.72779 21.6765L4.72819 21.6744L17.3792 21.6795L17.6054 21.6734C18.1225 21.6734 18.414 21.5422 18.872 21.2476C19.2946 20.9745 19.6368 20.5894 19.8554 20.1453C19.9221 20.0471 19.9705 19.9405 20.0004 19.8261L21.9619 11.0564C21.9903 10.9464 22.0003 10.8313 21.9919 10.7293C22.0355 10.1297 21.8936 9.54291 21.5814 9.03238ZM1.1 8.5791C0.492487 8.5791 0 9.07159 0 9.6791V20.6791C0 21.2866 0.492486 21.7791 1.1 21.7791H2.2C2.80751 21.7791 3.3 21.2866 3.3 20.6791V9.6791C3.3 9.07159 2.80751 8.5791 2.2 8.5791H1.1Z"
										:fill="themeColor.themeAuxiliaryColorRemind" />
								</svg>
								<div class="label" style="margin-left: 10rpx;">{{ item.thumbUpCount }}</div>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
		<!---->
		<view class="footer">
			<view class="comment-two-ft" @click="replyComment(firstComment)">
				<label for="commentTowInput">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M2.93386 12.7977L4.15272 12.6877C4.6516 12.6389 5.1244 12.4178 5.47702 12.0652L14.7181 2.82443C15.3632 2.1792 15.3632 1.13255 14.7181 0.483921C14.0684 -0.161307 13.0219 -0.161307 12.3733 0.483921L3.13681 9.72012C2.77966 10.0773 2.55856 10.5456 2.51434 11.0491L2.40436 12.2681C2.37715 12.5675 2.62886 12.8238 2.93386 12.7977ZM0.799976 14.4005C0.358161 14.4005 0 14.7586 0 15.2005C0 15.6423 0.358161 16.0004 0.799976 16.0004H15.1995C15.6414 16.0004 15.9995 15.6423 15.9995 15.2005C15.9995 14.7586 15.6414 14.4005 15.1995 14.4005H0.799976Z"
							fill="#A1A1A1" />
					</svg>
					<view class="text">想说点什么...</view>
				</label>
				<view class="right">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M15.4 16.2248H15.0583L14.8166 16.4664L11 20.2831L7.18336 16.4664L6.94173 16.2248H6.6H3.3C1.93309 16.2248 0.825 15.1167 0.825 13.7498V3.8498C0.825 2.4829 1.9331 1.3748 3.3 1.3748H18.7C20.0669 1.3748 21.175 2.4829 21.175 3.84981V13.7498C21.175 15.1167 20.0669 16.2248 18.7 16.2248H15.4Z"
							stroke="#404040" stroke-width="1.65" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M7.14766 8.7999C7.14766 9.71117 6.40893 10.4499 5.49766 10.4499C4.58639 10.4499 3.84766 9.71117 3.84766 8.7999C3.84766 7.88863 4.58639 7.1499 5.49766 7.1499C6.40893 7.1499 7.14766 7.88863 7.14766 8.7999ZM12.6477 8.7999C12.6477 9.71117 11.9089 10.4499 10.9977 10.4499C10.0864 10.4499 9.34766 9.71117 9.34766 8.7999C9.34766 7.88863 10.0864 7.1499 10.9977 7.1499C11.9089 7.1499 12.6477 7.88863 12.6477 8.7999ZM16.4977 10.4499C17.4089 10.4499 18.1477 9.71117 18.1477 8.7999C18.1477 7.88863 17.4089 7.1499 16.4977 7.1499C15.5864 7.1499 14.8477 7.88863 14.8477 8.7999C14.8477 9.71117 15.5864 10.4499 16.4977 10.4499Z"
							fill="#404040" />
					</svg>

					<view class="text">
						{{ scoundList && scoundList.length? scoundList.length: scoundList.thumbUpCount }}
						<!-- {{ firstComment.subCommentList && firstComment.subCommentList.length? firstComment.subCommentList.length: firstComment.thumbUpCount }} -->
					</view>
					<!-- <view class="text">{{ firstComment.thumbUpCount }}</view> -->
				</view>
			</view>
		</view>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--评论弹窗-->
		<uni-popup ref="comentPopup" background-color="#fff" mask-background-color="rgba(0,0,0,.7)"
			:is-mask-click="false">
			<view style="width: 100vw;height: var(--vh)">
				<reply-comment ref="replyComment" @closeComent="closeComent" @restComment="restComment"
					:commentId="toCommentId" :relatedId="relatedId" :createTime="createTime" :commentType="commentType"
					:toUserId="toUserId" :placeholder="placeholder">
				</reply-comment>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import TextOverflow from '@/components/TextOverflow/index.vue'
	import Login from "../../../components/common/login/Login";
	import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";
	import {
		listSecondComment
	} from "../../../utils/comment/index.js"
	import ReplyComment from "./ReplyComment";
	import {
		thumbUp
	} from "../../../utils/user";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "CommentDetail",
		components: {
			Header,
			UniCol,
			UniRow,
			TextOverflow,
			ReplyComment,
			Login,
		},
		props: {
			relatedId: {
				type: Number,
				default: 0,
			},
			createTime: {
				type: String,
				default: ''
			},
			commentId: {
				type: Number,
				default: 0
			},
			commentType: {
				type: Number,
				default: 3,
			}
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
				pageNum: 1,
				firstComment: {
					content: ''
				},
				dataList: [],
				ImgList: [],
				toCommentId: 0,
				toUserId: '',
				placeholder: '', //回复人昵称
				scoundList: []
			}
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		mounted() {
		},
		methods: {
			back() {
				this.$emit('closeCommentDetail')
			},
			//点赞接口
			thumbUp: function(item) {
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
			//打开评论
			replyComment: function(item) {
				this.toCommentId = this.commentId
				this.toUserId = item.userId
				this.placeholder = "回复@" + (item.nickname || item.username)
				this.$refs.comentPopup.open('right')
			},
			//关闭评论
			closeComent: function() {
				this.$refs.comentPopup.close()
				this.$refs.paging.reload()
			},
			restComment: function() {
				this.$refs.paging.reload()
			},
			previewImg: function(imgList, url) { // 点击预览图片
				const list = []
				imgList.forEach((item, index) => {
					list.push(item)
				})
				this.ImgList = list
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			//获取更多评论
			listSecondComment: function(pageNo, pageSize = 10) {
				this.pageNum = pageNo
				let prams = {
					commentId: this.commentId,
					pageNum: this.pageNum
				}
				listSecondComment(prams).then(res => {
					this.$refs.paging.complete(res.result.list);
					this.scoundList.push(...res.result.list);
					if (this.pageNum == 1) {
						this.firstComment = res.result.firstLevelComment;
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mint-tab-container-item {
		background-color: #fff;
		position: relative;
		height: var(--vh);
		max-width: 480px;
		margin: auto;
	}

	.header-box {
		height: 46px;

		.header {
			height: 46px;

			.box-bg {
				height: 46px;
			}
		}
	}

	.comment-two-body {

		.comment-item {
			background-color: #fff;
			padding: 20rpx;
			position: relative;

			.user-img {
				display: inline-block;
				position: relative;
				padding-left: 88rpx;

				.left-image {
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 80rpx;
						height: 80rpx;
						overflow: hidden;
						border-radius: 16rpx;
						position: relative;
						display: inline-block;
					}
				}

				.user-info {
					.name {
						margin-right: 10rpx;
						font-style: normal;
						font-weight: 700;
						font-size: 24rpx;
						color: #A1A1A1;

						.reportInfo {
							padding: 4px 0 3px 0;
							margin-right: 10rpx;
							font-size: 15px;
							color: #ec0808;
						}

						.user-img-to-text {
							.moren {
								color: #999;
								font-style: normal;
								font-weight: 700;
								font-size: 28rpx;
							}
						}
					}

					.time {
						font-size: 12px;
						color: #888;
					}
				}
			}

			.zan {
				right: 40rpx;
				position: absolute;
				color: #666;
				font-size: 24rpx;
				top: 30rpx;
				display: flex;
				align-items: center;
			}

			.comment-item-bd {
				padding: 10px 0 0 88rpx;
				width: 512rpx;

				.text {
					font-size: 26rpx;
					line-height: 40rpx;
					overflow: hidden;
					word-break: break-all;
				}

				.images-box {
					padding-top: 16rpx;

					.images {
						.image-body {
							width: 100%;
							height: 180rpx;
							border-radius: 8rpx;
						}
					}
				}
			}
		}

		.comment-item-for {
			border-bottom: 1px solid #e8e8e8;
		}

		.comment-item-hd {
			border-radius: 24rpx;
		}

		.myfot {
			justify-content: space-between;
			margin-left: 86rpx;
			display: flex;
			align-items: center;

			.fotright {
				display: flex;
				align-items: center;
			}

			.etime {
				margin-right: 20rpx;
				font-size: 12px;
				color: #666;
			}

			.pot {
				position: relative !important;
				right: inherit !important;
				top: inherit !important;
			}

			.zan {
				color: #666;
				font-size: 24rpx;

				.reply-btn {
					font-size: 24rpx;
					padding: 4rpx 20rpx;
					background-color: #d8d8d8;
					display: inline-block;
					border-radius: 30rpx;
				}
			}

		}
	}

	.footer {
		width: 100%;
		max-width: 480px;
		position: fixed;
		display: block;
		bottom: 0;

		.comment-two-ft {
			border-radius: 20px 20px 0px 0px;
			background: #FFF;
			box-shadow: 0px -0.5px 0px 0px var(--theme-auxiliary-color-default);
			padding: 20rpx 28rpx 68rpx;
			display: flex;
			justify-content: space-between;

			label {
				line-height: 76rpx;
				width: 544rpx;
				box-sizing: border-box;
				height: 76rpx;
				background-color: var(--theme-auxiliary-color-default);
				border: 0;
				border-radius: 16rpx;
				font-size: 28rpx;
				padding: 0 20rpx;
				display: block;
				color: #A1A1A1;
				display: flex;
				align-items: center;

				.text {
					margin-left: 10rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.text {
					font-size: 26rpx;
					columns: #404040;
					margin-left: 10rpx;
				}
			}
		}
	}

	.text-box {
		font-size: 26rpx;
		line-height: 40rpx;

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

	.firstComment-box {
		display: flex;
		padding-left: 88rpx;
		padding-bottom: 20rpx;

		.center {
			width: 444rpx;
			margin-left: 20rpx;

			.name {
				font-size: 24rpx;
				color: #A1A1A1;
				margin-bottom: 10rpx;
			}
		}

		.right {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: flex-start;
			color: #666;
			font-size: 24rpx;
			padding-right: 20rpx;
		}
	}
</style>
