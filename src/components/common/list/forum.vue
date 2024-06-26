<template>
	<view class="van-list">
		<ul class="forum-list">
			<li v-for="(item, index) in dataList" :key="index">
				<view class="heads van-row">
					<view class="van-col van-col--20">
						<view class="user-img">
							<view class="left-image">
								<image :src="item.headPic"></image>
							</view>
							<view class="user-info">
								<view class="name red">
									{{ item.username }}
									<span class="reportInfo"></span>
								</view>
								<view class="time">{{ item.updateTime }}</view>
							</view><!---->
						</view>
					</view>
					<view class="van-col van-col--2">
						<image v-show="item.highQuality == 1" mode="aspectFit" class="jin" src="@/static/img/forum/jin_n.png">
						</image>
					</view>
				</view>
				<view class="title van-row" @click="detail(item)">
					<view class="van-col" style="margin-right: 10rpx;" v-show="item.period">
						<label>{{ item.period }}</label>
					</view>
					<view class="van-col van-col--16">
						<view class="txt van-ellipsis"><!---->
							{{ " " + item.title + " " }}
						</view>
					</view>
					<view class="van-col van-col--5"></view>
				</view>
				<view class="text" @click="detail(item)">
					<view class="van-ellipsis" v-for="(val, key) in item.descriptionList" :key="key">
						{{ val }}
					</view>
				</view>
				<view class="img-box">
					<view class="img-box-row">
						<view v-for="(val, key) in item.pictureList.slice(0, 3)" :key="key" style="position: relative">
							<fast-lazy-load :radius="'8rpx'" :src="val" :width="'100%'" :height="'180rpx'" mode="aspectFill"
								@click="previewImg(item.pictureList, val)" :id="`qww${index + 1}`" :isMark="true">
								<template v-slot:loading>
									<image class="lazy-image" :src="loadingImg"></image>
								</template>
								<template v-slot:error>
									<image class="lazy-image" :src="loadingImg"></image>
								</template>
							</fast-lazy-load>
							<view v-if="key == 2 && item.pictureList.length > 3" class="length"
								@click="previewImg(item.pictureList, val)">
								{{ $t('components.common.list.forum.total') }}{{
									item.pictureList.length }}{{ $t('components.common.list.forum.posts') }}
							</view>
						</view>
					</view>


					<!-- 	<uni-row style="display: flex; justify-content: space-between;">
						<uni-col :span="8" v-for="(val, key) in item.pictureList.slice(0, 3)" :key="key"
							style="margin: 0 10rpx;position: relative">
							<fast-lazy-load :radius="'8rpx'" :src="val" :width="'100%'" :height="'180rpx'"
								mode="aspectFill" @click="previewImg(item.pictureList, val)">
								<template v-slot:loading>
									<image class="lazy-image" :src="loadingImg"></image>
								</template>
								<template v-slot:error>
									<image class="lazy-image" :src="loadingImg"></image>
								</template>
							</fast-lazy-load>
							<view v-if="key == 2 && item.pictureList.length > 3" class="length"
								@click="previewImg(item.pictureList, val)">
								{{ $t('components.common.list.forum.total') }}{{
                  item.pictureList.length }}{{ $t('components.common.list.forum.posts') }}
							</view>
						</uni-col>
					</uni-row> -->
				</view>
				<view class="verify-status" v-if="!userId">
					<!-- <view class="verify-status"> -->
					<span class="error" v-if="item.status == 2">{{ $t('components.common.list.forum.reviewFailed') }}</span>
					<span class="error-text" v-if="item.status == 2" @click="lookRemark(item.remark)">{{
						$t('components.common.list.forum.viewReason') }}</span>
					<span class="error" v-if="item.status == 0">{{ $t('components.common.list.forum.underReview') }}</span>
					<span class="open" v-if="item.status == 1">{{ $t('components.common.list.forum.approved') }}</span>
				</view>
				<view class="tool-ft">
					<view class="tool-ft-left">
						<view class="">
							<svg v-if="item.thumbUpCount <= 0" xmlns="http://www.w3.org/2000/svg" width="15" height="16"
								viewBox="0 0 15 16" fill="none">
								<path
									d="M9.88175 5.23257C9.98393 4.76247 10.0379 4.28248 10.0423 3.80007M9.88175 5.23257L13.5373 14.3901C13.3856 14.695 13.1551 14.954 12.8698 15.1401C12.6185 15.3272 12.3131 15.4272 11.9998 15.4251H3.6748V14.6751M9.88175 5.23257H9.6748V5.98257L10.3857 6.22165C10.4124 6.14232 10.4377 6.06262 10.4618 5.98257L9.88175 5.23257ZM10.0423 3.80007C10.0419 3.31331 9.98906 2.82802 9.88481 2.35257V2.30007M10.0423 3.80007L9.29234 3.79316C9.29233 3.79443 9.29231 3.7957 9.2923 3.79697M10.0423 3.80007L9.2923 3.80075C9.2923 3.79949 9.2923 3.79823 9.2923 3.79697M9.88481 2.30007C9.78506 1.89103 9.55003 1.5277 9.21784 1.26904C8.88565 1.01037 8.47581 0.871534 8.0548 0.875066M9.88481 2.30007H9.13481V2.35257V2.40191M9.88481 2.30007L9.66951 2.35257L9.15616 2.47775C9.14992 2.45216 9.14279 2.42686 9.13481 2.40191M8.0548 0.875066C7.81436 0.882529 7.57791 0.938517 7.35964 1.03967C7.14138 1.14081 6.94582 1.28504 6.7847 1.46367C6.62358 1.6423 6.50023 1.85166 6.42206 2.07916C6.34388 2.30667 6.31251 2.54763 6.3298 2.78757V2.84007V2.94507C6.28715 3.83573 5.92851 4.68205 5.31824 5.33219C4.70797 5.98232 3.886 6.39372 2.9998 6.49257H3.6748V7.13151M8.0548 0.875066L8.0611 1.62504C8.06395 1.62502 8.0668 1.625 8.06965 1.625M8.0548 0.875066L8.07807 1.6247C8.07527 1.62479 8.07246 1.62489 8.06965 1.625M3.6748 7.13151C3.48105 7.17991 3.28336 7.21559 3.08295 7.23794L3.0415 7.24257H2.9998H2.9248V11.3676V14.6751H3.6748M3.6748 7.13151V11.3676V14.6751M3.6748 7.13151C4.50914 6.92307 5.27076 6.47862 5.86507 5.84549C6.5974 5.06533 7.02776 4.04974 7.07895 2.98094L7.0798 2.96301V2.94507V2.84007V2.78757V2.76056L7.07786 2.73363C7.06783 2.59451 7.08603 2.4548 7.13135 2.32288C7.17668 2.19096 7.2482 2.06957 7.34162 1.966C7.43505 1.86242 7.54844 1.77879 7.675 1.72014C7.799 1.66268 7.93314 1.63035 8.06965 1.625M3.6748 14.6751H11.9998H12.005V14.6751C12.1551 14.6761 12.3015 14.6282 12.4219 14.5385L12.4406 14.5246L12.4601 14.5119C12.6335 14.3988 12.7736 14.2414 12.8658 14.056L12.8944 13.9986L12.9099 13.9773M12.9099 13.9773L14.235 8.05512L14.2229 7.97528L14.2295 7.88978C14.2484 7.64521 14.1924 7.4007 14.0689 7.1888M12.9099 13.9773L12.9322 13.947C12.9186 13.9655 12.9087 13.9865 12.903 14.0088C12.9024 14.0111 12.9019 14.0134 12.9014 14.0156L12.9029 14.0088L12.9029 14.0088L12.9099 13.9773ZM8.06965 1.625C8.31857 1.62482 8.56052 1.70776 8.75705 1.86079C8.93504 1.99939 9.06642 2.18821 9.13481 2.40191M9.13481 2.40191V2.43382L9.15221 2.5132C9.24467 2.93488 9.29163 3.36527 9.2923 3.79697M9.2923 3.79697C9.28581 4.45902 9.17499 5.11592 8.96393 5.74348L8.63128 6.73257H9.6748H13.2523V6.73258L13.2577 6.73255C13.4213 6.73138 13.5824 6.77307 13.725 6.85348C13.8668 6.93349 13.9853 7.04906 14.0689 7.1888M14.0689 7.1888C14.0685 7.18805 14.068 7.18731 14.0676 7.18656L14.7148 6.80757L14.0702 7.19088C14.0697 7.19018 14.0693 7.18949 14.0689 7.1888Z"
									stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" />
								<mask id="path-2-inside-1_104_49902" fill="white">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M2.25 15.4325H1C0.447715 15.4325 0 14.9848 0 14.4325V7.5C0 6.94772 0.447715 6.5 1 6.5H2.25" />
								</mask>
								<path
									d="M2.25 13.9325H1V16.9325H2.25V13.9325ZM1.5 14.4325V7.5H-1.5V14.4325H1.5ZM1 8H2.25V5H1V8ZM1.5 7.5C1.5 7.77614 1.27614 8 1 8V5C-0.380713 5 -1.5 6.11929 -1.5 7.5H1.5ZM1 13.9325C1.27614 13.9325 1.5 14.1564 1.5 14.4325H-1.5C-1.5 15.8132 -0.380712 16.9325 1 16.9325V13.9325Z"
									fill="#A1A1A1" mask="url(#path-2-inside-1_104_49902)" />
							</svg>

							<svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M14.7146 6.65867C14.3914 6.1317 13.9117 5.86259 13.2543 5.83595C13.2208 5.83149 13.1868 5.82862 13.1518 5.82862L9.67515 5.8171C9.91312 5.10028 10.0434 4.32961 10.0434 3.63711C10.0434 3.15303 9.99 2.66583 9.8854 2.18883L9.86397 2.13205L9.86239 2.13233C9.64638 1.30044 8.91257 0.724609 8.05741 0.724609C7.07357 0.724609 6.3314 1.54602 6.3314 2.63526L6.33034 2.68939L6.3303 2.69105V2.69106C6.3293 2.72996 6.32832 2.768 6.3314 2.79894C6.28173 4.60551 4.8418 6.12729 2.98241 6.33913L2.92276 6.34568L2.90918 11.2198V15.2781L3.15659 15.2782L3.16703 15.2801L3.2235 15.2796L3.22377 15.2782L11.8494 15.2817L12.0037 15.2775C12.3562 15.2775 12.555 15.1881 12.8673 14.9872C13.1554 14.801 13.3887 14.5385 13.5378 14.2356C13.5833 14.1687 13.6162 14.096 13.6366 14.0181L14.974 8.0387C14.9934 7.96366 15.0002 7.88518 14.9944 7.81562C15.0242 7.40685 14.9275 7.00675 14.7146 6.65867ZM1 6.34961C0.447715 6.34961 0 6.79732 0 7.34961V14.3496C0 14.9019 0.447715 15.3496 1 15.3496H1.25C1.80228 15.3496 2.25 14.9019 2.25 14.3496V7.34961C2.25 6.79732 1.80228 6.34961 1.25 6.34961H1Z"
									fill="#EC3232" />
							</svg>
							<!-- <uni-icons type="hand-up" size="15"></uni-icons> -->
							<text class="num">{{ item.thumbUpCount | moneyFormat }}点赞</text>
						</view>

						<view class="">
							<svg v-if="item.clickCount <= 0" width="15" height="8" viewBox="0 0 15 8" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="Group 1000001199">
									<rect id="Rectangle 8538" x="4.67114" y="3.94824" width="1.09721" height="3.07333" rx="0.548605"
										transform="rotate(30 4.67114 3.94824)" fill="#A1A1A1" />
									<rect id="Rectangle 8542" width="1.09721" height="3.07333" rx="0.548605"
										transform="matrix(0.866025 -0.5 -0.5 -0.866026 10.8174 7.07129)" fill="#A1A1A1" />
									<rect id="Rectangle 8539" x="6.71973" y="4.46094" width="1.09721" height="3.07333" rx="0.548605"
										fill="#A1A1A1" />
									<rect id="Rectangle 8540" x="11.5205" y="3.05469" width="1.09721" height="3.38401" rx="0.548605"
										transform="rotate(-60 11.5205 3.05469)" fill="#A1A1A1" />
									<rect id="Rectangle 8541" width="1.09721" height="3.38401" rx="0.548605"
										transform="matrix(0.5 0.866025 0.866025 -0.5 0 3.94824)" fill="#A1A1A1" />
									<path id="Vector"
										d="M1.08521 0.875C1.64962 1.60627 2.2695 2.28647 2.97215 2.88786C3.70518 3.51567 4.50249 4.03826 5.41471 4.37241C6.27717 4.68852 7.16253 4.79638 8.07387 4.66871C8.80954 4.56569 9.49458 4.31386 10.1413 3.95329C10.9003 3.53064 11.5669 2.98912 12.1687 2.36572C12.6116 1.90653 13.0206 1.41916 13.3785 0.889529"
										stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
								</g>
							</svg>
							<image v-else src="@/static/img/common/icon2.png" style="width:30rpx;" mode="widthFix">
							</image>
							<!-- <uni-icons type="eye" size="15"></uni-icons> -->
							<text class="num">{{ item.clickCount | moneyFormat }}</text>
						</view>
						<view class="">
							<!-- <uni-icons custom-prefix="iconfont" type="comment" size="15"></uni-icons> -->
							<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="Group 1420067929">
									<path id="Rectangle 9298"
										d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
										stroke="#A1A1A1" stroke-width="1.5" />
									<path id="Union" fill-rule="evenodd" clip-rule="evenodd"
										d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
										fill="#A1A1A1" />
								</g>
							</svg>

							<text class="num">{{ item.commentCount | moneyFormat }}评论</text>
						</view>
					</view>
					<view class="img">
						<image :src="'/static/img/menu/' + item.lotteryType + '.png'" alt="" />
						<span class="num">{{ lotteryName(item.lotteryType) }}</span>
					</view>

				</view>
				<!-- <view class="tool-ft">
					<uni-row>

						<uni-col class="van-col">
							<uni-icons type="hand-up" size="16"></uni-icons>
							<text class="num">{{ item.thumbUpCount | moneyFormat }}</text>
						</uni-col>
						<uni-col class="van-col">
							<uni-icons type="eye" size="16"></uni-icons>
							<text class="num">{{ item.clickCount | moneyFormat }}</text>
						</uni-col>
						<uni-col class="van-col">
							<uni-icons custom-prefix="iconfont" type="comment" size="16"></uni-icons>
							<text class="num">{{ item.commentCount | moneyFormat }}</text>
						</uni-col>
						<uni-col class="van-col ntool">
							<view class="img">
								<image :src="'/static/img/menu/' + item.lotteryType + '.png'" alt="" />
								<span class="num">{{ lotteryName(item.lotteryType) }}</span>
							</view>
						</uni-col>
					</uni-row>
				</view>
		 -->
			</li>
		</ul>
		<!--图片弹窗-->

	</view>
</template>

<script>
import UniCol from "../../../uni_modules/uni-row/components/uni-col/uni-col";
import UniRow from "../../../uni_modules/uni-row/components/uni-row/uni-row";
import {
	mapGetters
} from 'pinia';
export default {
	name: "forum",
	components: {
		UniRow,
		UniCol,
	},
	props: {
		userId: {
			type: String,
			default: ''
		},
		dataList: {
			type: Array,
			default: false
		}
	},
	data() {
		return {
			remark: '',
			loadingImg: '/static/img/zw.png',
			navList: [{
				lotteryType: 0,
				name: this.$t('components.common.list.forum.all')
			},
			{
				lotteryType: 2,
				name: this.$t('components.common.list.forum.australianLottery')
			},
			{
				lotteryType: 1,
				name: this.$t('components.common.list.forum.hongKongLottery')
			},
			{
				lotteryType: 3,
				name: this.$t('components.common.list.forum.taiwanLottery')
			},
			{
				lotteryType: 4,
				name: this.$t('components.common.list.forum.newLottery')
			},
			{
				lotteryType: 5,
				name: '快乐8'
			}
			],
		}
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
	},
	mounted() {

		let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)
		try {
			configData.forEach((item, index) => {
				if (item.type == 23) {
					this.loadingImg = item.url
					throw Error();
				}
			})
		} catch (err) {
			console.log(err)
		}
	},
	methods: {
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			this.$emit('previewImg', imgList, url)
			// this.ImgList = imgList
			// this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
		},
		//查看原因
		lookRemark: function (remark) {
			this.remark = remark
			this.$emit("tishi", remark);
			// this.$refs.tishi.open()
		},
		//跳转
		detail: function (item) {
			if (item.status == 1) {
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=' + item.type + "&createTime=" + item
						.createTime,
					success: function (res) {
						res.eventChannel.emit('argParams', {
							lotteryType: item.lotteryType
						})
					}
				})
			} else {
				uni.navigateTo({
					url: '/pages/common/userCenter/homepage/detail?id=' + item.articleId + '&type=' + item
						.type + "&createTime=" + item
							.createTime,
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
::v-deep .uni-popup {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999999;
}

::v-deep .uni-dialog-title-text {
	color: #404844 !important;
}

::v-deep .uni-dialog-content-text {
	color: #A0ABA5 !important;
}

::v-deep .uni-dialog-button-text {
	color: var(--theme-color) !important;
}

::v-deep .uni-dialog-title {
	color: #404040;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.forum-list {
	li {
		border-radius: 24rpx;
		padding: 20rpx 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border: 2rpx solid #eee;

		.heads {
			display: flex;
			justify-content: space-between;
			// justify-content: space-around;
			position: relative;
			height: 76rpx;

			.user-img {
				display: inline-block;
				position: relative;
				padding-left: 48px;

				.left-image {
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 72rpx;
						height: 72rpx;
						border-radius: 50%;
					}
				}

				.user-info {
					.red {
						color: red !important;
					}

					.name {
						padding: 2px 0 1px 0;
						margin-right: 10rpx;
						font-style: normal;
						font-weight: 700;
						font-size: 28rpx;
						color: #999;

						.reportInfo {
							margin-right: 10rpx;
							font-size: 15px;
							color: #ec0808;
						}
					}

					.time {
						font-size: 12px;
						color: #888;
						height: 13px;
					}
				}
			}

			.jin {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.title {
			font-size: 28rpx;
			// padding: 14rpx 20rpx;
			padding: 14rpx 0;
			display: flex;
			height: 36rpx;

			label {
				background-color: var(--theme-color);
				color: #fff;
				font-size: 24rpx;
				padding: 0 10rpx;
				border-radius: 8rpx;
			}

			.txt {
				font-weight: 700;
				max-width: 100%;
				display: inline-block;
				position: relative;
			}
		}

		.text {
			font-size: 26rpx;
			line-height: 40rpx;
			padding: 0 0;
			margin-bottom: 10rpx;
		}

		.img-box {
			padding: 0 0rpx;

			.img-box-row {
				display: flex;
				// justify-content: space-between;
				justify-content: flex-start;

				&>view {
					width: 32%;
					margin-right: 2%;
				}
			}

			image {
				width: 100%;
				height: 180rpx;
				border-radius: 8rpx;
			}

			.length {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .2);
				text-align: center;
				color: #fff;
				padding-top: 68rpx;
				font-size: 28rpx;
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

			.error-text {
				color: var(--theme-color);
				margin-left: 20rpx;
				font-size: 28rpx;
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

		.tool-ft {
			border-top: 2rpx solid #eee;
			text-align: center;
			padding-top: 20rpx;
			display: flex;
			justify-content: space-between;

			.tool-ft-left {
				display: flex;

				.num {
					color: #404040;

					font-size: 28rpx;

					font-weight: 400;
				}

				&>view {
					display: flex;
					align-items: center;

					&:first-child {
						margin-left: 0;
					}

					margin-left: 20rpx;
				}
			}

			.van-col {
				height: 48rpx;
				padding: 8rpx;
			}

			.img {
				display: flex;
				padding: 10rpx 20rpx;
				align-items: center;
				border-radius: 8rpx;
				background-color: var(--theme-auxiliary-color-default);

				image {
					margin-right: 20rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}

			.num {
				font-weight: 500;
				font-size: 28rpx;
				margin-left: 6rpx;
			}

			.ntool {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.img {
					background: #f5f5f5;
					margin: 0 8rpx;
					padding: 4rpx 8rpx;
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}

}
</style>
