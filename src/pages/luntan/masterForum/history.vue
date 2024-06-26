<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" isFixed />
		<!--列表-->
		<div role="feed" class="forum-bd van-list">
			<ul class="forum-list">
				<z-paging :style="{ height: `calc(${uWindowHeight}px - 110rpx)` }" ref="paging" v-model="dataList"
					@query="listLatest" :refresher-enabled="false" :hide-empty-view="true" :empty-view-center="true"
					:empty-view-text="$t('pages.luntan.masterForum.history.noData')" :hide-no-more-inside="true"
					:empty-view-img="'/static/img/wu.png'" :fixed="false" :empty-view-style="{ 'margin-bottom': '170px' }"
					:empty-view-img-style="{ 'width': '128rpx', 'height': '130rpx' }"
					:empty-view-title-style="{ 'color': ' #a0a0a0', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '28rpx' }">
					<li v-for="(item, index) in dataList">
						<view class="user-info-box" @click="homepage(item)">
							<view class="user-img">
								<view class="left-image">
									<view class="van-image van-image--round">
										<img :src="item.headPic" class="van-image__img">
									</view><!---->
								</view>
								<view class="user-info">
									<view class="name">
										{{ item.username }}
										<span class="reportInfo"></span>
									</view>
									<view class="time">{{ $u.timeFormat(item.createTime, 'yyyy.mm.dd hh:MM') }}</view>
								</view><!---->
							</view>
							<svg v-if="item.highQuality == 1" xmlns="http://www.w3.org/2000/svg" width="27" height="30"
								viewBox="0 0 27 30" fill="none">
								<path
									d="M0.5 0H26.2143V29.2862C26.2143 29.6141 25.8691 29.8274 25.5758 29.6808L13.5544 23.6701C13.4302 23.608 13.284 23.608 13.1598 23.6701L1.13848 29.6808C0.845138 29.8274 0.5 29.6141 0.5 29.2862V0Z"
									:fill="themeColor.themeAuxiliaryColorRemind" />
								<path
									d="M9.59375 8.09375C9.69792 7.57292 9.82812 7.07812 9.98438 6.60938C10.1406 6.03646 10.2448 5.61979 10.2969 5.35938C10.4531 4.63021 10.9479 4.36979 11.7812 4.57812H15.6875V3.875C16.4167 2.78125 17.1458 2.78125 17.875 3.875V4.57812H21.7812C22.3021 4.63021 22.6146 4.94271 22.7188 5.51562C22.6667 6.14062 22.3802 6.45312 21.8594 6.45312H17.875V7.07812H21.3125C21.7812 7.13021 22.0417 7.41667 22.0938 7.9375C22.0938 8.45833 21.8594 8.71875 21.3906 8.71875H17.875V9.34375H22.0156C22.4844 9.39583 22.7448 9.70833 22.7969 10.2812C22.7969 10.8542 22.5625 11.1406 22.0938 11.1406H11.7812C11.7292 11.7135 11.4427 12 10.9219 12H9.4375V12.625C9.64583 12.6771 10.0104 13.0156 10.5312 13.6406C10.5833 13.7448 10.6615 13.901 10.7656 14.1094C11.1302 14.6302 11.3906 14.9948 11.5469 15.2031C11.8594 15.776 11.7812 16.1927 11.3125 16.4531C10.8438 16.8177 10.4531 16.7917 10.1406 16.375C9.98438 16.2708 9.85417 16.1146 9.75 15.9062C9.64583 15.75 9.54167 15.5938 9.4375 15.4375V20.75C9.38542 21.2708 9.04688 21.5573 8.42188 21.6094C7.79688 21.5573 7.48438 21.2708 7.48438 20.75V16.1406C7.22396 16.8698 6.88542 17.599 6.46875 18.3281C6.05208 19.1094 5.53125 19.3438 4.90625 19.0312C4.38542 18.8229 4.30729 18.3021 4.67188 17.4688C5.71354 15.4375 6.46875 13.6146 6.9375 12H5.375C4.80208 12 4.48958 11.6615 4.4375 10.9844C4.48958 10.3594 4.80208 10.0208 5.375 9.96875H7.48438V4.03125C7.48438 3.51042 7.79688 3.22396 8.42188 3.17188C9.04688 3.22396 9.38542 3.51042 9.4375 4.03125V9.96875H10.6875C10.6354 9.60417 10.9219 9.39583 11.5469 9.34375H15.6875V8.71875H12.4844C12.0156 8.71875 11.7552 8.45833 11.7031 7.9375C11.7031 7.41667 11.9375 7.13021 12.4062 7.07812H15.6875V6.45312H11.7031C11.599 6.71354 11.5208 7.05208 11.4688 7.46875C11.3646 7.9375 11.2865 8.27604 11.2344 8.48438C10.974 9.05729 10.6615 9.29167 10.2969 9.1875C9.72396 9.1875 9.48958 8.82292 9.59375 8.09375ZM6.54688 9.26562C5.97396 9.52604 5.63542 9.23958 5.53125 8.40625C5.42708 8.09375 5.32292 7.625 5.21875 7C5.0625 6.42708 4.95833 5.95833 4.90625 5.59375C4.80208 5.02083 4.98438 4.65625 5.45312 4.5C6.02604 4.34375 6.39062 4.60417 6.54688 5.28125C6.54688 5.48958 6.65104 5.95833 6.85938 6.6875C7.01562 7.41667 7.11979 7.85938 7.17188 8.01562C7.32812 8.74479 7.11979 9.16146 6.54688 9.26562ZM11.7812 20.5938V13.4062C11.6771 12.3125 12.1719 11.7917 13.2656 11.8438H20.1406C21.2344 11.7917 21.7552 12.4167 21.7031 13.7188V19.3438C21.8073 20.75 20.9219 21.4271 19.0469 21.375C17.224 21.4271 16.4167 20.9844 16.625 20.0469C16.625 19.474 17.224 19.2656 18.4219 19.4219C19.151 19.474 19.5156 19.3177 19.5156 18.9531V18.4062H13.9688V20.5938C13.9167 21.1667 13.5521 21.4792 12.875 21.5312C12.1458 21.4792 11.7812 21.1667 11.7812 20.5938ZM19.5156 14.3438V14.0312C19.5156 13.7708 19.4115 13.6406 19.2031 13.6406H14.2812C14.0208 13.6927 13.9167 13.8229 13.9688 14.0312V14.3438H19.5156ZM13.9688 16.0625V16.7656H19.5156V16.0625H13.9688Z"
									fill="white" />
							</svg>
						</view>
						<view class="title van-row" @click="detail(item)">
							<label v-show="item.period">{{ item.period }}</label>
							<view class="zd" v-if="item.top == 1">置顶</view>
							<svg v-if="item.highQuality == 1" style="flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="18"
								height="21" viewBox="0 0 18 21" fill="none">
								<path
									d="M0.664062 0.5H17.8069V20.0241C17.8069 20.2428 17.5768 20.385 17.3813 20.2872L9.36702 16.2801C9.28422 16.2387 9.18676 16.2387 9.10396 16.2801L1.08971 20.2872C0.894154 20.385 0.664062 20.2428 0.664062 20.0241V0.5Z"
									:fill="themeColor.themeAuxiliaryColorRemind" />
								<path
									d="M6.72656 5.896C6.79601 5.54877 6.88281 5.21891 6.98698 4.90641C7.09115 4.52447 7.16059 4.24669 7.19531 4.07308C7.29948 3.58697 7.62934 3.41336 8.1849 3.55225H10.7891V3.0835C11.2752 2.35433 11.7613 2.35433 12.2474 3.0835V3.55225H14.8516C15.1988 3.58697 15.4071 3.7953 15.4766 4.17725C15.4418 4.59391 15.2509 4.80225 14.9036 4.80225H12.2474V5.21891H14.5391C14.8516 5.25364 15.0252 5.44461 15.0599 5.79183C15.0599 6.13905 14.9036 6.31266 14.5911 6.31266H12.2474V6.72933H15.0078C15.3203 6.76405 15.4939 6.97238 15.5286 7.35433C15.5286 7.73627 15.3724 7.92725 15.0599 7.92725H8.1849C8.15017 8.30919 7.9592 8.50016 7.61198 8.50016H6.6224V8.91683C6.76128 8.95155 7.00434 9.17725 7.35156 9.59391C7.38628 9.66336 7.43837 9.76752 7.50781 9.90641C7.75087 10.2536 7.92448 10.4967 8.02865 10.6356C8.23698 11.0175 8.1849 11.2953 7.8724 11.4689C7.5599 11.712 7.29948 11.6946 7.09115 11.4168C6.98698 11.3474 6.90017 11.2432 6.83073 11.1043C6.76128 11.0002 6.69184 10.896 6.6224 10.7918V14.3335C6.58767 14.6807 6.36198 14.8717 5.94531 14.9064C5.52865 14.8717 5.32031 14.6807 5.32031 14.3335V11.2606C5.1467 11.7467 4.92101 12.2328 4.64323 12.7189C4.36545 13.2397 4.01823 13.396 3.60156 13.1877C3.25434 13.0488 3.20226 12.7016 3.44531 12.146C4.13976 10.7918 4.64323 9.57655 4.95573 8.50016H3.91406C3.53212 8.50016 3.32378 8.27447 3.28906 7.82308C3.32378 7.40641 3.53212 7.18072 3.91406 7.146H5.32031V3.18766C5.32031 2.84044 5.52865 2.64947 5.94531 2.61475C6.36198 2.64947 6.58767 2.84044 6.6224 3.18766V7.146H7.45573C7.42101 6.90294 7.61198 6.76405 8.02865 6.72933H10.7891V6.31266H8.65365C8.34115 6.31266 8.16753 6.13905 8.13281 5.79183C8.13281 5.44461 8.28906 5.25364 8.60156 5.21891H10.7891V4.80225H8.13281C8.06337 4.97586 8.01128 5.20155 7.97656 5.47933C7.90712 5.79183 7.85503 6.01752 7.82031 6.15641C7.6467 6.53836 7.43837 6.69461 7.19531 6.62516C6.81337 6.62516 6.65712 6.38211 6.72656 5.896ZM4.69531 6.67725C4.31337 6.85086 4.08767 6.65988 4.01823 6.10433C3.94878 5.896 3.87934 5.5835 3.8099 5.16683C3.70573 4.78488 3.63628 4.47239 3.60156 4.22933C3.53212 3.84739 3.65365 3.60433 3.96615 3.50016C4.34809 3.396 4.59115 3.56961 4.69531 4.021C4.69531 4.15989 4.76476 4.47239 4.90365 4.9585C5.00781 5.44461 5.07726 5.73975 5.11198 5.84391C5.21615 6.33002 5.07726 6.6078 4.69531 6.67725ZM8.1849 14.2293V9.43766C8.11545 8.7085 8.44531 8.36127 9.17448 8.396H13.7578C14.487 8.36127 14.8342 8.77794 14.7995 9.646V13.396C14.8689 14.3335 14.2786 14.7849 13.0286 14.7502C11.8134 14.7849 11.2752 14.4897 11.4141 13.8647C11.4141 13.4828 11.8134 13.3439 12.612 13.4481C13.0981 13.4828 13.3411 13.3786 13.3411 13.1356V12.771H9.64323V14.2293C9.60851 14.6113 9.36545 14.8196 8.91406 14.8543C8.42795 14.8196 8.1849 14.6113 8.1849 14.2293ZM13.3411 10.0627V9.85433C13.3411 9.68072 13.2717 9.59391 13.1328 9.59391H9.85156C9.67795 9.62864 9.60851 9.71544 9.64323 9.85433V10.0627H13.3411ZM9.64323 11.2085V11.6772H13.3411V11.2085H9.64323Z"
									fill="white" />
							</svg>
							<view class="txt van-ellipsis">
								<span v-if="item.top == 1" class="up">「{{ $t('pages.luntan.masterForum.history.top') }}」</span>
								{{ item.title }}
							</view>
						</view>
						<view class="text van-multi-ellipsis--l3" @click="detail(item)">
							<view class="van-ellipsis" v-for="(val, key) in item.descriptionList" :key="key">
								{{ val }}
							</view>
						</view>
						<view class="img-box">
							<view class="images" v-if="item.pictureList && item.pictureList.length">
								<view class="img" v-for="(val, key) in item.pictureList.slice(0, 3)"
									@click="previewImg(item.pictureList, val)">
									<!--                  <fast-lazy-load :radius="'8rpx'" :src="val" :width="'100%'" :height="'180rpx'" mode="heightFix">-->
									<!--                    <template v-slot:loading>-->
									<!--                      <image class="lazy-image" :src="loadingImg"></image>-->
									<!--                    </template>-->
									<!--                    <template v-slot:error>-->
									<!--                      <image class="lazy-image" :src="loadingImg"></image>-->
									<!--                    </template>-->
									<!--                  </fast-lazy-load>-->
									<view class="image-body">
										<fast-lazy-load @click="previewImg(info.pictureList, val)" radius="16rpx" :id="'content-wrap' + key"
											:src="val" width="calc(100%)" style="width: calc(100%);margin: 0 auto;" mode="widthFix"
											:isMark="true">
											<template v-slot:loading>
												<image class="lazy-image" :src="loadingImg" mode="widthFix"></image>
											</template>
											<template v-slot:error>
												<image class="lazy-image" :src="loadingImg" mode="widthFix"></image>
											</template>
										</fast-lazy-load>
										<!-- <fast-lazy-load :radius="'24rpx'" :src="val" :width="'100%'" :height="'180rpx'"
											mode="aspectFill">
											<template v-slot:loading>
												<image class="lazy-image" :src="loadingImg"></image>
											</template>
											<template v-slot:error>
												<image class="lazy-image" :src="loadingImg"></image>
											</template>
										</fast-lazy-load> -->
										<div v-if="key == 2 && item.pictureList.length > 3" class="length">
											{{ $t('pages.luntan.masterForum.index.total') }}{{
												item.pictureList.length
											}}{{ $t('pages.luntan.masterForum.index.sheets') }}
										</div>
									</view>
								</view>
							</view>
						</view>
						<view class="tool-ft van-row">
							<view class="van-col">
								<img src="/static/img/zan-stroke.png" alt="" class="zan-img">
								<span class="num">{{ item.thumbUpCount | moneyFormat }}</span>
							</view>
							<view class="van-col">
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
									<rect x="4.67188" y="3.94824" width="1.09721" height="3.07333" rx="0.548605"
										transform="rotate(30 4.67188 3.94824)" fill="#A1A1A1" />
									<rect width="1.09721" height="3.07333" rx="0.548605"
										transform="matrix(0.866025 -0.5 -0.5 -0.866026 10.8164 7.0708)" fill="#A1A1A1" />
									<rect x="6.71875" y="4.46045" width="1.09721" height="3.07333" rx="0.548605" fill="#A1A1A1" />
									<rect x="11.5195" y="3.05469" width="1.09721" height="3.38401" rx="0.548605"
										transform="rotate(-60 11.5195 3.05469)" fill="#A1A1A1" />
									<rect width="1.09721" height="3.38401" rx="0.548605"
										transform="matrix(0.5 0.866025 0.866025 -0.5 0 3.94824)" fill="#A1A1A1" />
									<path
										d="M1.08594 0.875C1.65035 1.60627 2.27023 2.28647 2.97288 2.88786C3.70591 3.51567 4.50322 4.03826 5.41544 4.37241C6.2779 4.68852 7.16326 4.79638 8.0746 4.66871C8.81027 4.56569 9.49531 4.31386 10.1421 3.95329C10.9011 3.53064 11.5676 2.98912 12.1694 2.36572C12.6123 1.90653 13.0213 1.41916 13.3793 0.889529"
										stroke="#A1A1A1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
								</svg>
								<span class="num">
									{{ item.clickCount | moneyFormat }}
								</span>
							</view>
							<view class="van-col">
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
									<path
										d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
										stroke="#A1A1A1" stroke-width="1.5" />
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
										fill="#A1A1A1" />
								</svg>
								<span class="num">{{ item.commentCount | moneyFormat }}</span>
							</view>
						</view>
					</li>
					<LuntanLoading class="loading" v-if="loading" />
					<empty v-else-if="dataList.length == 0"> </empty>
				</z-paging>
			</ul>

			<div class="van-list__placeholder"></div>
		</div>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<AlertInjectLayer />
	</view>
</template>

<script>
import {
	userPublish
} from '@/utils/forum/index.js'

import empty from "@/components/common/empty/empty.vue";
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import Header from '@/components/common/header/index.vue';
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';

export default {
	name: "history",
	components: {
		AlertInjectLayer,
		empty,
		cusPreviewImg,
		Header
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.luntan.masterForum.history.historyPosts'),
			loadingImg: '/static/img/zw.png',
			userId: 0,
			type: 3,
			speak: 0,
			sort: 0,
			lotteryType: 1,
			pageNum: 0,
			pageSize: 10,
			dataList: [],
			ImgList: [],
			loading: true,
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
	},
	onLoad(option) {
		this.userId = option.userId
		this.lotteryType = option.lotteryType
		this.type = option.type
		uni.setNavigationBarTitle({
			title: this.title
		});
		let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG)
		this.loadingImg = configData.find(item => item.type == 23)?.url
	},
	methods: {
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			this.ImgList = imgList
			this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
		},
		detail: function (item) {
			const that = this
			item.read = 1
			uni.navigateTo({
				url: 'detail?id=' + item.articleId + '&type=' + item.type + '&createTimeStr=' + item.createTimeStr,
				success: function (res) {
					res.eventChannel.emit('argParams', {
						lotteryType: that.lotteryType
					})
				}
			})
		},
		//用户主页
		homepage: function (item) {
			uni.navigateTo({
				url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
			})
		},
		listLatest: function (pageNo, pageSize = 10) {
			this.pageNum = pageNo
			let prams = {
				lotteryType: this.lotteryType,
				type: this.type,
				sort: this.sort,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				toUserId: this.userId
			}
			userPublish(prams).then(res => {
				this.$refs.paging.complete(res.result?.records || []);
				this.loading = false
			}).catch(err => {
				console.log(err)
			})
		},
	}
}
</script>

<style scoped>
.forum-bd {
	margin-top: 20rpx;
	border-radius: 24rpx;
	overflow: hidden;
}

.forum-list li {
	padding: 20rpx 28rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	border: 2rpx solid #eee;
	border-radius: 24rpx;
}

.forum-list li .user-info-box {
	position: relative;
	height: 96rpx;
	display: flex;
	align-items: center;
}

.icon {
	width: 32rpx;
	height: 32rpx;
	margin-left: 20rpx;
}

.user-img {
	display: inline-block;
	position: relative;
	padding-left: 90rpx;
	flex: 1;
}

.user-img .left-image {
	position: absolute;
	left: 0;
	top: 0;
}

.user-img .left-image .van-image {
	width: 74rpx;
	height: 74rpx;
}

.van-image--round {
	overflow: hidden;
	border-radius: 24rpx;
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

.user-img .user-info .name {
	font-style: normal;
	font-weight: 600;
	font-size: 24rpx;
	color: #404040;
}

.user-img .user-info .name .reportInfo {
	padding: 4px 0 3px 0;
	margin-right: 10rpx;
	font-size: 15px;
	color: #ec0808;
}

.user-img .user-info .time {
	font-size: 24rpx;
	color: #404040;
}

.forum-list li .title {
	font-size: 28rpx;
	padding: 20rpx 0;
	display: flex;
	align-items: center;
}

.forum-list li .title label {
	background-color: var(--theme-color);
	color: #fff;
	font-size: 24rpx;
	padding: 4rpx 6rpx;
	border-radius: 8rpx;
	margin-right: 20rpx;
}

.zd {
	width: 68rpx;
	padding: 0 6rpx;
	height: 100%;
	display: grid;
	place-content: center;
	color: #404040;
	font-size: 28rpx;
	background-color: var(--theme-auxiliary-color-dot);
	border-radius: 8rpx;
	flex-shrink: 0;
	margin-right: 10rpx;
}

.van-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.forum-list li .title .txt {
	font-weight: 600;
	max-width: 100%;
	display: inline-block;
	position: relative;
	font-size: 34rpx;
}

.forum-list li .title .txt .up {
	color: var(--theme-color);
}

.forum-list li .text {
	font-size: 26rpx;
	margin-bottom: 20rpx;
	clear: both;
	color: #404040;
}

.van-multi-ellipsis--l3 {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.images .img-box-1 .image-body,
.images .img-box-2 .image-body,
.images .img-box-3 .image-body {
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
	border-radius: 8rpx;
	overflow: hidden;
}

.forum-list li .tool-ft {
	clear: both;
	border-top: 2rpx solid var(--theme-auxiliary-color-default);
	text-align: center;
	padding-top: 20rpx;
	display: flow-root;
}

.forum-list li .tool-ft .van-col {
	display: flex;
	align-items: center;
	margin-right: 20rpx;
}

.forum-list li .tool-ft .num {
	font-weight: 500;
	font-size: 28rpx;
	margin-left: 10rpx;
	color: #404040;
	font-size: 28rpx;
}

.lazy-image {
	max-width: 80rpx;
	max-height: 80rpx;
	width: 50%;
	height: 50%;
}

.zan-img {
	width: 30rpx;
	height: 30rpx;
}

.images .img-box-1 .image-body,
.images .img-box-2 .image-body,
.images .img-box-3 .image-body {
	height: 180rpx;
	border-radius: 10rpx;
}

.images .image-body {
	margin-bottom: 10rpx;
	position: relative;
}

.images .image-body .van-image__img {
	border-radius: 10rpx;
	overflow: hidden;
}

.lazy-image {
	max-width: 80rpx;
	max-height: 80rpx;
	width: 50%;
	height: 50%;
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
	height: 180rpx;
	border-radius: 30rpx;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.images {
	display: flex;
	margin-bottom: 20rpx;

	.img {
		width: 218rpx;
		height: 218rpx;
		border-radius: 24rpx;
		overflow: hidden;

		&+.img {
			margin-left: 20rpx;
		}
	}
}
</style>
