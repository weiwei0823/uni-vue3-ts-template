<template>
	<view class="mint-tab-container-item"
		:style="{ position: `fixed`, height: `${winHeight}px`, marginTop: safeHeight, width: '100%' }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" />
		<view class="search-hd">
			<view class="van-search van-search--show-action" style="background: rgb(255, 255, 255)">
				<view class="search-box">
					<view class="van-search__content van-search__content--round">
						<view class="van-cell van-cell--borderless van-field">
							<view class="van-field__left-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
									fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
										fill="#A1A1A1" />
								</svg>
							</view>
							<view class="van-cell__value van-cell__value--alone van-field__value">
								<view class="van-field__body">
									<input type="search" v-model="keyword" placeholder-style="color:#A1A1A1"
										:placeholder="$t('pages.luntan.masterForum.enterSearchTitleOrAuthor')
                    " class="van-field__control" />
									<uni-icons v-show="keyword.length > 0" @click="keyword = ''"
										custom-prefix="iconfont" type="cuowuguanbiquxiao-yuankuang" size="16"
										style="position: absolute; right: 0; color: #c4bfbf">
									</uni-icons>
								</view>
							</view>
						</view>
					</view>
					<!-- role="button" tabindex="0" -->
					<view class="van-search__action" @click="search">
						<view class="search-btn">{{
              $t("pages.luntan.masterForum.search")
            }}</view>
					</view>
				</view>
			</view>
		</view>
		<!--列表-->
		<LuntanLoading class="loading" v-if="loading" />
		<view class="van-pull-refresh">
			<view class="van-pull-refresh__track" style="transition-duration: 0ms">
				<view class="van-pull-refresh__head"></view><!----><!---->
				<view role="feed" class="van-list" aria-busy="true">
					<ul class="forum-list" v-show="dataList.length > 0">
						<z-paging ref="paging" :height="`calc(${winHeight}px - 200rpx)`" v-model="dataList"
							@query="listLatest" :refresher-enabled="false" :hide-empty-view="true"
							:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
							:hide-no-more-inside="true" :fixed="false">
							<li v-for="(item, index) in dataList">
								<view class="user-info-box">
									<view class="user-img block">
										<view class="left-image">
											<view class="van-image van-image--round">
												<img :src="item.headPic" class="van-image__img" />
											</view><!---->
										</view>
										<view class="user-info">
											<view class="name">
												{{ item.username }}
												<span class="reportInfo"></span>
											</view>
											<view class="time">{{ item.createTime }}</view>
										</view>
										<view class="hot" v-if="item.highQuality == 1">
											<svg xmlns="http://www.w3.org/2000/svg" width="27" height="30"
												viewBox="0 0 27 30" fill="none">
												<path
													d="M0.5 0H26.2143V29.2862C26.2143 29.6141 25.8691 29.8274 25.5758 29.6808L13.5544 23.6701C13.4302 23.608 13.284 23.608 13.1598 23.6701L1.13848 29.6808C0.845138 29.8274 0.5 29.6141 0.5 29.2862V0Z"
													:fill="themeColor.themeAuxiliaryColorRemind" />
												<path
													d="M9.59375 8.09375C9.69792 7.57292 9.82812 7.07812 9.98438 6.60938C10.1406 6.03646 10.2448 5.61979 10.2969 5.35938C10.4531 4.63021 10.9479 4.36979 11.7812 4.57812H15.6875V3.875C16.4167 2.78125 17.1458 2.78125 17.875 3.875V4.57812H21.7812C22.3021 4.63021 22.6146 4.94271 22.7188 5.51562C22.6667 6.14062 22.3802 6.45312 21.8594 6.45312H17.875V7.07812H21.3125C21.7812 7.13021 22.0417 7.41667 22.0938 7.9375C22.0938 8.45833 21.8594 8.71875 21.3906 8.71875H17.875V9.34375H22.0156C22.4844 9.39583 22.7448 9.70833 22.7969 10.2812C22.7969 10.8542 22.5625 11.1406 22.0938 11.1406H11.7812C11.7292 11.7135 11.4427 12 10.9219 12H9.4375V12.625C9.64583 12.6771 10.0104 13.0156 10.5312 13.6406C10.5833 13.7448 10.6615 13.901 10.7656 14.1094C11.1302 14.6302 11.3906 14.9948 11.5469 15.2031C11.8594 15.776 11.7812 16.1927 11.3125 16.4531C10.8438 16.8177 10.4531 16.7917 10.1406 16.375C9.98438 16.2708 9.85417 16.1146 9.75 15.9062C9.64583 15.75 9.54167 15.5938 9.4375 15.4375V20.75C9.38542 21.2708 9.04688 21.5573 8.42188 21.6094C7.79688 21.5573 7.48438 21.2708 7.48438 20.75V16.1406C7.22396 16.8698 6.88542 17.599 6.46875 18.3281C6.05208 19.1094 5.53125 19.3438 4.90625 19.0312C4.38542 18.8229 4.30729 18.3021 4.67188 17.4688C5.71354 15.4375 6.46875 13.6146 6.9375 12H5.375C4.80208 12 4.48958 11.6615 4.4375 10.9844C4.48958 10.3594 4.80208 10.0208 5.375 9.96875H7.48438V4.03125C7.48438 3.51042 7.79688 3.22396 8.42188 3.17188C9.04688 3.22396 9.38542 3.51042 9.4375 4.03125V9.96875H10.6875C10.6354 9.60417 10.9219 9.39583 11.5469 9.34375H15.6875V8.71875H12.4844C12.0156 8.71875 11.7552 8.45833 11.7031 7.9375C11.7031 7.41667 11.9375 7.13021 12.4062 7.07812H15.6875V6.45312H11.7031C11.599 6.71354 11.5208 7.05208 11.4688 7.46875C11.3646 7.9375 11.2865 8.27604 11.2344 8.48438C10.974 9.05729 10.6615 9.29167 10.2969 9.1875C9.72396 9.1875 9.48958 8.82292 9.59375 8.09375ZM6.54688 9.26562C5.97396 9.52604 5.63542 9.23958 5.53125 8.40625C5.42708 8.09375 5.32292 7.625 5.21875 7C5.0625 6.42708 4.95833 5.95833 4.90625 5.59375C4.80208 5.02083 4.98438 4.65625 5.45312 4.5C6.02604 4.34375 6.39062 4.60417 6.54688 5.28125C6.54688 5.48958 6.65104 5.95833 6.85938 6.6875C7.01562 7.41667 7.11979 7.85938 7.17188 8.01562C7.32812 8.74479 7.11979 9.16146 6.54688 9.26562ZM11.7812 20.5938V13.4062C11.6771 12.3125 12.1719 11.7917 13.2656 11.8438H20.1406C21.2344 11.7917 21.7552 12.4167 21.7031 13.7188V19.3438C21.8073 20.75 20.9219 21.4271 19.0469 21.375C17.224 21.4271 16.4167 20.9844 16.625 20.0469C16.625 19.474 17.224 19.2656 18.4219 19.4219C19.151 19.474 19.5156 19.3177 19.5156 18.9531V18.4062H13.9688V20.5938C13.9167 21.1667 13.5521 21.4792 12.875 21.5312C12.1458 21.4792 11.7812 21.1667 11.7812 20.5938ZM19.5156 14.3438V14.0312C19.5156 13.7708 19.4115 13.6406 19.2031 13.6406H14.2812C14.0208 13.6927 13.9167 13.8229 13.9688 14.0312V14.3438H19.5156ZM13.9688 16.0625V16.7656H19.5156V16.0625H13.9688Z"
													fill="white" />
											</svg>
										</view>
									</view>
								</view>
								<view class="title van-row" @click="detail(item)">
									<view class="label">{{ item.period }}</view>
									<view class="zd" v-if="item.top"> 置顶 </view>
									<svg v-if="item.highQuality" style="margin-right: 10rpx"
										xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21"
										fill="none">
										<path
											d="M0.664062 0.5H17.8069V20.0241C17.8069 20.2428 17.5768 20.385 17.3813 20.2872L9.36702 16.2801C9.28422 16.2387 9.18676 16.2387 9.10396 16.2801L1.08971 20.2872C0.894154 20.385 0.664062 20.2428 0.664062 20.0241V0.5Z"
											:fill="themeColor.themeAuxiliaryColorRemind" />
										<path
											d="M6.72656 5.896C6.79601 5.54877 6.88281 5.21891 6.98698 4.90641C7.09115 4.52447 7.16059 4.24669 7.19531 4.07308C7.29948 3.58697 7.62934 3.41336 8.1849 3.55225H10.7891V3.0835C11.2752 2.35433 11.7613 2.35433 12.2474 3.0835V3.55225H14.8516C15.1988 3.58697 15.4071 3.7953 15.4766 4.17725C15.4418 4.59391 15.2509 4.80225 14.9036 4.80225H12.2474V5.21891H14.5391C14.8516 5.25364 15.0252 5.44461 15.0599 5.79183C15.0599 6.13905 14.9036 6.31266 14.5911 6.31266H12.2474V6.72933H15.0078C15.3203 6.76405 15.4939 6.97238 15.5286 7.35433C15.5286 7.73627 15.3724 7.92725 15.0599 7.92725H8.1849C8.15017 8.30919 7.9592 8.50016 7.61198 8.50016H6.6224V8.91683C6.76128 8.95155 7.00434 9.17725 7.35156 9.59391C7.38628 9.66336 7.43837 9.76752 7.50781 9.90641C7.75087 10.2536 7.92448 10.4967 8.02865 10.6356C8.23698 11.0175 8.1849 11.2953 7.8724 11.4689C7.5599 11.712 7.29948 11.6946 7.09115 11.4168C6.98698 11.3474 6.90017 11.2432 6.83073 11.1043C6.76128 11.0002 6.69184 10.896 6.6224 10.7918V14.3335C6.58767 14.6807 6.36198 14.8717 5.94531 14.9064C5.52865 14.8717 5.32031 14.6807 5.32031 14.3335V11.2606C5.1467 11.7467 4.92101 12.2328 4.64323 12.7189C4.36545 13.2397 4.01823 13.396 3.60156 13.1877C3.25434 13.0488 3.20226 12.7016 3.44531 12.146C4.13976 10.7918 4.64323 9.57655 4.95573 8.50016H3.91406C3.53212 8.50016 3.32378 8.27447 3.28906 7.82308C3.32378 7.40641 3.53212 7.18072 3.91406 7.146H5.32031V3.18766C5.32031 2.84044 5.52865 2.64947 5.94531 2.61475C6.36198 2.64947 6.58767 2.84044 6.6224 3.18766V7.146H7.45573C7.42101 6.90294 7.61198 6.76405 8.02865 6.72933H10.7891V6.31266H8.65365C8.34115 6.31266 8.16753 6.13905 8.13281 5.79183C8.13281 5.44461 8.28906 5.25364 8.60156 5.21891H10.7891V4.80225H8.13281C8.06337 4.97586 8.01128 5.20155 7.97656 5.47933C7.90712 5.79183 7.85503 6.01752 7.82031 6.15641C7.6467 6.53836 7.43837 6.69461 7.19531 6.62516C6.81337 6.62516 6.65712 6.38211 6.72656 5.896ZM4.69531 6.67725C4.31337 6.85086 4.08767 6.65988 4.01823 6.10433C3.94878 5.896 3.87934 5.5835 3.8099 5.16683C3.70573 4.78488 3.63628 4.47239 3.60156 4.22933C3.53212 3.84739 3.65365 3.60433 3.96615 3.50016C4.34809 3.396 4.59115 3.56961 4.69531 4.021C4.69531 4.15989 4.76476 4.47239 4.90365 4.9585C5.00781 5.44461 5.07726 5.73975 5.11198 5.84391C5.21615 6.33002 5.07726 6.6078 4.69531 6.67725ZM8.1849 14.2293V9.43766C8.11545 8.7085 8.44531 8.36127 9.17448 8.396H13.7578C14.487 8.36127 14.8342 8.77794 14.7995 9.646V13.396C14.8689 14.3335 14.2786 14.7849 13.0286 14.7502C11.8134 14.7849 11.2752 14.4897 11.4141 13.8647C11.4141 13.4828 11.8134 13.3439 12.612 13.4481C13.0981 13.4828 13.3411 13.3786 13.3411 13.1356V12.771H9.64323V14.2293C9.60851 14.6113 9.36545 14.8196 8.91406 14.8543C8.42795 14.8196 8.1849 14.6113 8.1849 14.2293ZM13.3411 10.0627V9.85433C13.3411 9.68072 13.2717 9.59391 13.1328 9.59391H9.85156C9.67795 9.62864 9.60851 9.71544 9.64323 9.85433V10.0627H13.3411ZM9.64323 11.2085V11.6772H13.3411V11.2085H9.64323Z"
											fill="white" />
									</svg>
									<view class="txt van-ellipsis">
										{{ item.title }}
									</view>
								</view>
								<view class="text" @click="detail(item)">
									<view class="van-ellipsis" v-for="(val, key) in item.descriptionList" :key="key">
										{{ val }}
									</view>
								</view>
								<view class="imgs" v-if="item.pictureEntityList && item.pictureEntityList.length">
									<img v-for="picture in item.pictureEntityList" class="img" :src="picture.pictureUrl"
										alt="" />
								</view>
								<view class="tool-ft van-row">
									<view class="van-col">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
											viewBox="0 0 15 16" fill="none">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M14.7146 6.65867C14.3914 6.1317 13.9117 5.86259 13.2543 5.83595C13.2208 5.83149 13.1868 5.82862 13.1518 5.82862L9.67515 5.8171C9.91312 5.10028 10.0434 4.32961 10.0434 3.63711C10.0434 3.15303 9.99 2.66583 9.8854 2.18883L9.86397 2.13205L9.86239 2.13233C9.64638 1.30044 8.91257 0.724609 8.05741 0.724609C7.07357 0.724609 6.3314 1.54602 6.3314 2.63526L6.33034 2.68939L6.3303 2.69105V2.69106C6.3293 2.72996 6.32832 2.768 6.3314 2.79894C6.28173 4.60551 4.8418 6.12729 2.98241 6.33913L2.92276 6.34568L2.90918 11.2198V15.2781L3.15659 15.2782L3.16703 15.2801L3.2235 15.2796L3.22377 15.2782L11.8494 15.2817L12.0037 15.2775C12.3562 15.2775 12.555 15.1881 12.8673 14.9872C13.1554 14.801 13.3887 14.5385 13.5378 14.2356C13.5833 14.1687 13.6162 14.096 13.6366 14.0181L14.974 8.0387C14.9934 7.96366 15.0002 7.88518 14.9944 7.81562C15.0242 7.40685 14.9275 7.00675 14.7146 6.65867ZM1 6.34961C0.447715 6.34961 0 6.79732 0 7.34961V14.3496C0 14.9019 0.447715 15.3496 1 15.3496H1.25C1.80228 15.3496 2.25 14.9019 2.25 14.3496V7.34961C2.25 6.79732 1.80228 6.34961 1.25 6.34961H1Z"
												:fill="themeColor.themeAuxiliaryColorRemind" />
										</svg>
										<span class="num">{{
                      item.thumbUpCount | moneyFormat
                    }}</span>
									</view>
									<view class="van-col">
										<img style="width: 30rpx; height: 30rpx" src="/static/img/opened eye.png"
											alt="" />
										<span class="num">{{ item.clickCount | moneyFormat }}</span>
									</view>
									<view class="van-col">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
											viewBox="0 0 15 16" fill="none">
											<path
												d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
												stroke="#404040" stroke-width="1.5" />
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
												fill="#404040" />
										</svg>
										<span class="num">{{
                      item.commentCount | moneyFormat
                    }}</span>
									</view>
								</view>
							</li>
						</z-paging>
					</ul>
					<view class="van-list__placeholder"></view>
				</view>
				<view class="empty-box" v-if="!loading&&!dataList.length">
					<empty></empty>
				</view>
			</view>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index.vue";
	import {
		listLatest
	} from "@/utils/forum/index.js";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	import Empty from "@/components/common/empty/empty";
	export default {
		name: "serach",
		components: {
			Header,
			AlertInjectLayer,
			Empty
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("pages.luntan.masterForum.searchAssistant"),
				scrollTop: 0,
				type: 0,
				speak: 0,
				sort: 0,
				lotteryType: 0,
				isLoadMore: false,
				dataList: [],
				keyword: "",
				pageNum: 0,
				pageSize: 10,
				winHeight: 0,
			};
		},
		computed: {
			...mapGetters(["themeColor"]),
		},
		onLoad(option) {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			/*this.lotteryType = option.lotteryType*/
			uni.setNavigationBarTitle({
				title: this.title,
			});
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			back: function() {
				backPage();
			},
			//加载更多
			lower: function(e) {
				if (!this.isLoadMore) {
					//此处判断，上锁，防止重复请求
					this.isLoadMore = true;
					this.pageNum += 1;
				}
			},
			detail: function(item) {
				const that = this;
				uni.navigateTo({
					url: "detail?id=" +
						item.articleId +
						"&type=" +
						item.type +
						"&createTime=" +
						item.createTime,
					success: function(res) {
						res.eventChannel.emit("argParams", {
							lotteryType: that.lotteryType,
						});
					},
				});
			},
			//搜索
			search: function() {
				this.$refs.paging.reload();
			},
			listLatest: function(pageNo, pageSize = 10) {
				this.pageNum = pageNo;
				if (this.keyword == "") {
					return false;
				}
				this.loading = true
				let prams = {
					title: this.keyword,
					lotteryType: this.lotteryType,
					type: this.type,
					sort: this.sort,
					speak: this.speak,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				listLatest(prams)
					.then((res) => {
						this.loading = false
						this.$refs.paging.complete(res.result.records);
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
	}

	/deep/ .header {
		border-radius: 0 !important;
	}

	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);
		height: var(--vh);
	}

	.search-hd {
		border-radius: 0 0 24rpx 24rpx;
		overflow: hidden;
	}

	.search-hd .van-search {
		background: #fff !important;
		padding: 20rpx 28rpx;
		border-radius: 0 0 24rpx;
		height: 116rpx;
		box-sizing: border-box;
	}

	.search-box {
		background: var(--theme-auxiliary-color-default);
		border-radius: 16rpx;
		width: 100%;
		height: 76rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;

	}

	.van-search,
	.van-search__content {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.van-search__content {
		padding-left: 0 !important;
	}

	.van-search {
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		padding: 10px 12px;
		background-color: #fff;
	}

	.search-hd .van-search .van-search__content {}

	.van-search__content--round {
		border-radius: 999px;
	}

	.van-search__content {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		padding-left: 12px;
	}

	.search-hd .van-search .van-cell {
		padding: 0 !important;
		display: flex;
		align-items: center;
	}

	.van-search .van-cell {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.van-cell {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 16px;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
	}

	.van-field__left-icon {
		margin-right: 10rpx;
		line-height: 1;
	}

	.van-field__value {
		overflow: visible;
	}

	.van-cell__value--alone {
		color: #323233;
		text-align: left;
		width: 100%;
	}

	.van-cell__value {
		position: relative;
		overflow: hidden;
		color: #969799;
		text-align: right;
		vertical-align: middle;
		word-wrap: break-word;
	}

	.van-field__body {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.search-hd .van-search .van-field__control {
		font-size: 26rpx;
	}

	.van-cell__value .van-field__body input {
		height: 24px;
	}

	.van-field__control[type="search"] {
		-webkit-appearance: none;
	}

	.van-field__control {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		margin: 0;
		padding: 0;
		color: #323233;
		line-height: inherit;
		text-align: left;
		background-color: transparent;
		border: 0;
		resize: none;
	}

	.van-search__action {
		color: var(--theme-color);
		font-size: 30rpx;
		cursor: pointer;
		-webkit-user-select: none;
		user-select: none;
		margin-left: 10rpx;
		height: 48rpx;
		display: flex;
		align-items: center;

		&:focus-visible {
			border: none;
			outline: 0;
		}

		.search-btn {
			&:focus-visible {
				border: none;
				outline: 0;
			}
		}
	}


	.van-pull-refresh {
		background: var(--theme-auxiliary-color-default);
	}

	.van-pull-refresh {
		overflow: hidden;
		user-select: none;
	}

	.van-pull-refresh__track {
		position: relative;
		height: 100%;
		-webkit-transition-property: -webkit-transform;
		transition-property: -webkit-transform;
		transition-property: transform;
		transition-property: transform, -webkit-transform;
	}

	.van-pull-refresh__head {
		position: absolute;
		left: 0;
		width: 100%;
		height: 50px;
		overflow: hidden;
		color: #969799;
		font-size: 14px;
		line-height: 50px;
		text-align: center;
		-webkit-transform: translateY(-100%);
		transform: translateY(-100%);
	}

	.empty-box {
		text-align: center;
		height: calc(var(--vh) - 180rpx);
		display: grid;
		place-content: center;
	}

	.forum-list li {
		padding: 20rpx 28rpx;
		background-color: #fff;
		border-radius: 24rpx;
		margin-top: 20rpx;
	}

	.forum-list li .user-info-box {
		position: relative;
		height: 96rpx;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.user-img {
		display: inline-block;
		position: relative;
		padding-left: 88rpx;
		display: flex;
		width: 100%;
		align-items: center;
	}

	.user-img .left-image {
		position: absolute;
		left: 0;
		top: 0;
	}

	.user-img .left-image .van-image {
		width: 68rpx;
		height: 68rpx;
	}

	.van-image--round {
		overflow: hidden;
		border-radius: 16rpx;
	}

	.van-image {
		position: relative;
		display: inline-block;
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

	.user-img .user-info {
		flex: 1;
	}

	.user-img .user-info .name {
		font-style: normal;
		font-weight: 700;
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

	.user-img .read {
		position: absolute;
		width: 88rpx;
		height: 48rpx;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		right: 0;
		top: 0;
		background-color: var(--theme-color);
		border-radius: 0 8rpx 0 16rpx;
	}

	.forum-list li .title {
		font-size: 28rpx;
		padding: 20rpx 0;
		height: 46rpx;
		display: flex;
		align-items: center;
	}

	.van-col {
		line-height: 1;

		.uni-label-pointer {
			margin-right: 20rpx;
		}
	}

	.forum-list li .title .label {
		background-color: var(--theme-color);
		color: #fff;
		font-size: 24rpx;
		padding: 0 10rpx;
		border-radius: 8rpx;
		white-space: nowrap;
	}

	.zd {
		margin: 0 10rpx;
		background-color: var(--theme-auxiliary-color-dot);
		color: #fff;
		font-size: 24rpx;
		padding: 0 10rpx;
		border-radius: 8rpx;
		white-space: nowrap;
	}

	.forum-list li .title .txt {
		font-weight: 700;
		width: 75vw;
		max-width: 350px;
		display: inline-block;
		position: relative;
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.van-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.forum-list li .title .hot {}

	.forum-list li .text {
		clear: both;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-bottom: 20rpx;
		color: #404040;
	}

	.forum-list li .tool-ft {
		border-top: 2rpx solid #eee;
		text-align: center;
		padding-top: 20rpx;
		display: flow-root;
		display: flex;
		align-items: center;

		.van-col {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
		}
	}

	.forum-list li .tool-ft .num {
		font-weight: 500;
		font-size: 28rpx;
		margin-left: 10rpx;
		color: #404040;
	}

	.imgs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 20rpx;

		.img {
			width: 218rpx;
			height: 218rpx;
			border-radius: 24rpx;
			margin-top: 20rpx;

			&+.img {
				margin-left: 20rpx;
			}

			&:nth-child(3n + 1) {
				margin-left: 0;
			}

			&:nth-child(-n + 3) {
				margin-top: 0;
			}
		}
	}
</style>
