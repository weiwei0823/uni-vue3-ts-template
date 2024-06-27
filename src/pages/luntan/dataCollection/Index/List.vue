<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<view class="" style="">

			<Header :title="title" :headerStyle="{ borderRadius: 0 }" :headerInnerStyle="{borderRadius:0}" isFixed>
				<block slot="right">
					<view class="header-right" style="display: flex;justify-content: flex-end;margin-top:8rpx;">


						<view class="uni-list-cell-db">
							<picker @change="bindTimeChange" :value="index" :range="array" @cancel="handleCancel">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
									fill="none" @click="iconClick">
									<g clip-path="url(#clip0_22326_67403)">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0016C7.28243 11.0016 7.48763 11.2068 7.48763 11.46V14.21C7.48763 14.4631 7.28243 14.6683 7.0293 14.6683H4.2793C4.02617 14.6683 3.82096 14.4631 3.82096 14.21V11.46C3.82096 11.2068 4.02617 11.0016 4.2793 11.0016H7.0293ZM7.0293 15.8911C7.28243 15.8911 7.48763 16.0963 7.48763 16.3494V19.0994C7.48763 19.3526 7.28243 19.5578 7.0293 19.5578H4.2793C4.02617 19.5578 3.82096 19.3526 3.82096 19.0994V16.3494C3.82096 16.0963 4.02617 15.8911 4.2793 15.8911H7.0293ZM9.7793 11.0016C9.52617 11.0016 9.32096 11.2068 9.32096 11.46V14.21C9.32096 14.4631 9.52617 14.6683 9.7793 14.6683H12.5293C12.7824 14.6683 12.9876 14.4631 12.9876 14.21V11.46C12.9876 11.2068 12.7824 11.0016 12.5293 11.0016H9.7793ZM12.5293 15.8911C12.7824 15.8911 12.9876 16.0963 12.9876 16.3494V19.0994C12.9876 19.3526 12.7824 19.5578 12.5293 19.5578H9.7793C9.52617 19.5578 9.32096 19.3526 9.32096 19.0994V16.3494C9.32096 16.0963 9.52617 15.8911 9.7793 15.8911H12.5293ZM15.2793 11.0016C15.0262 11.0016 14.821 11.2068 14.821 11.46V14.21C14.821 14.4631 15.0262 14.6683 15.2793 14.6683H18.0293C18.2824 14.6683 18.4876 14.4631 18.4876 14.21V11.46C18.4876 11.2068 18.2824 11.0016 18.0293 11.0016H15.2793ZM18.0293 15.8911C18.2824 15.8911 18.4876 16.0963 18.4876 16.3494V19.0994C18.4876 19.3526 18.2824 19.5578 18.0293 19.5578H15.2793C15.0262 19.5578 14.821 19.3526 14.821 19.0994V16.3494C14.821 16.0963 15.0262 15.8911 15.2793 15.8911H18.0293Z"
											:fill="themeColor.themeColor" />
									</g>
									<defs>
										<clipPath id="clip0_22326_67403">
											<rect width="22" height="22" fill="white" />
										</clipPath>
									</defs>
								</svg>

							</picker>

						</view>
						<view class="uni-list-cell-db" @click="search">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M15.6218 15.6218C12.0481 19.1955 6.25396 19.1955 2.68027 15.6218C-0.893423 12.0481 -0.893424 6.25396 2.68027 2.68027C6.25396 -0.893423 12.0481 -0.893423 15.6218 2.68027C19.1955 6.25396 19.1955 12.0481 15.6218 15.6218ZM13.4649 13.4648C11.0824 15.8473 7.21967 15.8473 4.83721 13.4648C2.45475 11.0824 2.45475 7.21964 4.83721 4.83718C7.21967 2.45472 11.0824 2.45472 13.4649 4.83718C15.8473 7.21964 15.8473 11.0824 13.4649 13.4648ZM19.3964 17.2395C18.8007 16.6438 17.8351 16.6438 17.2394 17.2395C16.6438 17.8351 16.6438 18.8008 17.2394 19.3964L19.3964 21.5533C19.992 22.1489 20.9577 22.1489 21.5533 21.5533C22.1489 20.9577 22.1489 19.992 21.5533 19.3964L19.3964 17.2395Z"
									:fill="themeColor.themeColor" />
							</svg>

						</view>
					</view>
				</block>

			</Header>
			<!-- <view class="header" :style="{ marginTop: safeHeight }">
				<view class="box-bg">

					<uni-nav-bar :height="46" :rightWidth="'180rpx'">
						<block slot="left">
							<uni-icons @click="back" type="back" color="#666" size="18"
								style="font-weight: bold;margin-left: 10px" />
						</block>
						<view class="input-view">{{ title }}</view>
						<block slot="right">
							<view class="uni-list-cell-db">
								<picker @change="bindTimeChange" :value="index" :range="array">
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
										fill="none" @click="iconClick">
										<g clip-path="url(#clip0_22326_67403)">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0016C7.28243 11.0016 7.48763 11.2068 7.48763 11.46V14.21C7.48763 14.4631 7.28243 14.6683 7.0293 14.6683H4.2793C4.02617 14.6683 3.82096 14.4631 3.82096 14.21V11.46C3.82096 11.2068 4.02617 11.0016 4.2793 11.0016H7.0293ZM7.0293 15.8911C7.28243 15.8911 7.48763 16.0963 7.48763 16.3494V19.0994C7.48763 19.3526 7.28243 19.5578 7.0293 19.5578H4.2793C4.02617 19.5578 3.82096 19.3526 3.82096 19.0994V16.3494C3.82096 16.0963 4.02617 15.8911 4.2793 15.8911H7.0293ZM9.7793 11.0016C9.52617 11.0016 9.32096 11.2068 9.32096 11.46V14.21C9.32096 14.4631 9.52617 14.6683 9.7793 14.6683H12.5293C12.7824 14.6683 12.9876 14.4631 12.9876 14.21V11.46C12.9876 11.2068 12.7824 11.0016 12.5293 11.0016H9.7793ZM12.5293 15.8911C12.7824 15.8911 12.9876 16.0963 12.9876 16.3494V19.0994C12.9876 19.3526 12.7824 19.5578 12.5293 19.5578H9.7793C9.52617 19.5578 9.32096 19.3526 9.32096 19.0994V16.3494C9.32096 16.0963 9.52617 15.8911 9.7793 15.8911H12.5293ZM15.2793 11.0016C15.0262 11.0016 14.821 11.2068 14.821 11.46V14.21C14.821 14.4631 15.0262 14.6683 15.2793 14.6683H18.0293C18.2824 14.6683 18.4876 14.4631 18.4876 14.21V11.46C18.4876 11.2068 18.2824 11.0016 18.0293 11.0016H15.2793ZM18.0293 15.8911C18.2824 15.8911 18.4876 16.0963 18.4876 16.3494V19.0994C18.4876 19.3526 18.2824 19.5578 18.0293 19.5578H15.2793C15.0262 19.5578 14.821 19.3526 14.821 19.0994V16.3494C14.821 16.0963 15.0262 15.8911 15.2793 15.8911H18.0293Z"
												:fill="themeColor.themeColor" />
										</g>
										<defs>
											<clipPath id="clip0_22326_67403">
												<rect width="22" height="22" fill="white" />
											</clipPath>
										</defs>
									</svg>
									<uni-icons custom-prefix="iconfont" type="rili" :color="themeColor.themeColor"
										size="18"
										style="width:15px;height:15px;margin: auto 10px auto;text-align: center"
										@click="iconClick" />
								</picker>
								<view class="">
									{{ $t('pages.luntan.dataCollection.index.list.year') }}
								</view>
							</view>
							<view class="uni-list-cell-db" @click="search">
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
									fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M15.6218 15.6218C12.0481 19.1955 6.25396 19.1955 2.68027 15.6218C-0.893423 12.0481 -0.893424 6.25396 2.68027 2.68027C6.25396 -0.893423 12.0481 -0.893423 15.6218 2.68027C19.1955 6.25396 19.1955 12.0481 15.6218 15.6218ZM13.4649 13.4648C11.0824 15.8473 7.21967 15.8473 4.83721 13.4648C2.45475 11.0824 2.45475 7.21964 4.83721 4.83718C7.21967 2.45472 11.0824 2.45472 13.4649 4.83718C15.8473 7.21964 15.8473 11.0824 13.4649 13.4648ZM19.3964 17.2395C18.8007 16.6438 17.8351 16.6438 17.2394 17.2395C16.6438 17.8351 16.6438 18.8008 17.2394 19.3964L19.3964 21.5533C19.992 22.1489 20.9577 22.1489 21.5533 21.5533C22.1489 20.9577 22.1489 19.992 21.5533 19.3964L19.3964 17.2395Z"
										:fill="themeColor.themeColor" />
								</svg>
								<uni-icons type="search" :color="themeColor.themeColor" size="18"
									style="width:15px;height:15px;margin: auto 10px auto;" />

								<view class="">
									{{ $t('pages.luntan.dataCollection.index.list.search') }}
								</view>
							</view>
						</block>
					</uni-nav-bar>


				</view>
			</view>
		 -->
			<view class="swipers">
				<view class="colse" @click="swiperShow = false"><uni-icons type="clear" size="20"
						color="#ffffff"></uni-icons>
				</view>
				<view class="web-rol" v-show="listPicture.length > 0" @click.stop="openAd(listPicture[0])">
					<image :src="listPicture[0] ? listPicture[0].img : ''"></image>
				</view>
			</view>
		</view>
		<!--列表-->
		<!-- 	:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
			:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']" -->
		<z-paging :style="{height: getHeight}" auto-show-back-to-top class="paging" :class="{zpLoading: loading}"
			style="background: var(--theme-auxiliary-color-default);z-index: 1" ref="paging" v-model="list"
			@query="searchList" :lower-threshold="10" :refresher-enabled="true" show-refresher-when-reload
			:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
			:refresher-default-text="zpageUIConfig['refresher-default-text']"
			:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
			:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-default-style="'color:' + themeColor.themeAuxiliaryColorDefault"
			:refresher-img-style="zpageUIConfig['refresher-img-style']"
			:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
			:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
			:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
			:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
			:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #A1A1A1', 'font-size': '28rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<!-- <view class="tab-div-bg" style="height:40rpx" />
			<view class="tab-div-radius" /> -->
			<template #backToTop>
				<BackTop :scrollTop="101" />
			</template>
			<template #refresher="{refresherStatus}">
				<LuntanLoading class="loading" :text="zpageUIConfig.getloadingText(refresherStatus)" />
			</template>

			<uni-list class="list-row" v-if="list.length > 0">
				<uni-list-item class="list-item" direction="column" v-for="(item, index) in list"
					:style="{marginTop: index === 0 ? 0 : '20rpx'}">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="list-header" @click="detail(item)">
							<image class="slot-image" :src="item.headPic"></image>
							<view class="cell-top-text">
								<p>{{ item.username }}</p>
								<view class="time">{{ item.createTime }}</view>
							</view>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content-box has-read" @click="detail(item)">
							<p>{{ item.title }}</p>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view class="operation-box clearfix" @click="detail(item)">
							<view class="good">
								<img v-if="item.thumbUpCount > 0" src="@/static/img/zan-fill.png" alt="" class="zan-img">
								<img v-else src="@/static/img/zan-stroke.png" alt="" class="zan-img">
								{{ item.thumbUpCount }}点赞
							</view>
							<view class="comment">
								<svg style="margin-right: 10rpx;" v-if="item.commentCount > 0" data-v-35e41670=""
									xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16"
									fill="none">
									<path data-v-35e41670=""
										d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
										stroke="#404040" stroke-width="1.5"></path>
									<path data-v-35e41670="" fill-rule="evenodd" clip-rule="evenodd"
										d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
										fill="#404040"></path>
								</svg>
								<svg style="margin-right: 10rpx;" v-else data-v-35e41670=""
									xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16"
									fill="none">
									<path data-v-35e41670=""
										d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
										stroke="#A1A1A1" stroke-width="1.5"></path>
									<path data-v-35e41670="" fill-rule="evenodd" clip-rule="evenodd"
										d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
										fill="#A1A1A1"></path>
								</svg>

								{{ item.commentCount }}评论
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- <empty v-else :customStyle="{height: 'calc(var(--vh) - 200rpx)'}"></empty> -->
		</z-paging>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import BackTop from '@/components/common/BackTop.vue';
	import Swipers from "@/components/common/swiper/Swipers";
	import Empty from "@/components/common/empty/empty";
	import {
		searchList,
		wheelAdvertList,
		advertList
	} from "@/utils/data/index.js";
	import {
		listYear
	} from '@/utils/live/index'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	import {
		setPickerStyle
	} from "@/utils/common.ts";
	export default {
		name: "list",
		components: {
			AlertInjectLayer,
			Swipers,
			Empty,
			Header,
			BackTop
		},
		onLoad(option) {
			this.title = option.title
			this.prams.articleTypeId = option.id
			this.prams.type = option.type
			this.years = option.year
			this.wheelAdvertList()
			this.listYear()
			uni.setNavigationBarTitle({
				title: this.title,
				success: () => {
					console.log('修改标题成功')
				},
				fail: () => {
					console.log('修改标题失败')
				},
				complete: () => {
					console.log('修改标题结束')
				},
			});
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight", "windowBottom"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			getHeight() {
				return `calc(${this.uWindowHeight + this.windowBottom}px - 200rpx - ${isApp?80:0}rpx)`
			}
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '',
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true),
				years: '',
				index: 0,
				array: [],
				prams: {
					type: 4,
					articleTypeId: 0,
					pageNum: 1,
					pageSize: 60,
				},
				list: [],
				swiperShow: true,
				listPicture: [], //轮播图列表
				yearsInited: false,
				isApp: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		},
		methods: {
			iconClick() {
				setPickerStyle(this.themeColor.themeColor);
				this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			handleCancel() {
				this.$nativeBridge.setStatusBarColor('#fff')
			},
			//返回
			back: function() {
				uni.navigateBack()
			},
			search: function() {
				const {
					type,
					articleTypeId,
					year
				} = this.prams
				uni.navigateTo({
					url: `serachassistant?type=${type}&articleTypeId=${articleTypeId}&year=${year}`,
				})
			},
			detail: function(item) {
				const that = this
				item.read = 1
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=4&createTime=' + item
						.createTime,
					success: function(res) {
						res.eventChannel.emit('argParams', {
							lotteryType: that.lotteryType
						})
					}
				})
			},
			//时间选择
			bindTimeChange: function(e) {
				this.years = this.array[e.detail.value]
				this.$refs.paging.reload()
			},
			listYear() {
				let that = this;
				let prams = {
					lotteryType: this.lotteryType
				}
				listYear(prams).then(res => {
					this.array = res.result
					that.yearsInited = true;

					if (this.years) {
						this.index = this.array.findIndex(item => item == this.years)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取轮播图
			wheelAdvertList: function() {
				/*let prams = {
				  type:7
				}
				wheelAdvertList(prams).then(res=>{
				  if(res.result.advertList.length > 0){
					this.listPicture = res.result.advertList[0]
				  }else{
					this.listPicture = {imgPath:'',url:''}
				  }
				}).catch(err=>{
				  console.log(err)
				})*/
				let prams = {
					projectType: 1,
					code: 4,
				}
				this.loading = true
				advertList(prams).then(res => {
					this.listPicture = res.result
					this.loading = false
				}).catch(err => {

				})
			},
			//下拉加载更多
			openAd(item) {
				openUrl(item)
			},
			//列表获取
			searchList: async function(pageNo, pageSize = 10) {
				this.prams.pageNum = pageNo
				let prams = this.prams
				let initedSuccess = await this.checkYearIsInited();
				if (this.years) {
					prams.year = this.years
				} else {
					prams.year = initedSuccess ? this.array[0] : (new Date().getFullYear())
				}
				this.loading = true
				searchList(prams).then(res => {
					this.$refs.paging.complete(res.result.list);
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			},

			async checkYearIsInited(timeOut = 3000, interval = 100) {
				let that = this;
				return new Promise(resolve => {
					let t = 0;
					let run = function() {
						if (t += interval);
						if (t >= timeOut || that.yearsInited) {
							resolve(that.yearsInited)
							return true;
						}
					};
					if (run()) {
						resolve(that.yearsInited);
					} else {
						let k = setInterval(() => {
							if (run()) clearInterval(k);
						}, interval);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .list-item:first-child {
		margin-top: 0 !important;
	}

	.list-item:first-child {
		margin-top: 0 !important;
	}

	.tab-div-radius {
		background-color: #fff;
		height: 20rpx;
		width: 100%;
		position: fixed;
		top: 108rpx;
		z-index: 12;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

	}

	::v-deep .tab-div-bg {
		border-radius: 0;
		z-index: 11;
	}

	::v-deep .zp-paging-touch-view {
		background-color: var(--theme-auxiliary-color-default);
	}

	.zpLoading {
		::v-deep .zp-paging-touch-view {
			overflow: hidden;
		}
	}

	.mint-tab-container-item {
		background-color: var(--theme-auxiliary-color-default);
	}

	.header-box,
	.header,
	.box-bg {
		height: 46px;
	}

	.uni-list-cell-db {
		display: inline-block;
		margin-left: 20rpx;
		text-align: center;
	}

	.input-view {
		font-size: 16px;
	}

	.swipers {
		// margin-bottom: 20rpx;
		// position: fixed;
		// top: 88RPX;
		// width: 100%;
		// position: fixed;
		// top: 44px;
		width: 100%;
		box-sizing: border-box;
		// position: relative;
		padding: 0 28rpx 10rpx 28rpx;
		border-radius: 0px 0px 24rpx 24rpx;
		overflow: hidden;
		background-color: #fff;
		z-index: 12;

		.colse {
			position: absolute;
			right: 6px;
			top: 5px;
			z-index: 2;
			border-radius: 50%;
			width: 30rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			color: rgb(255, 255, 255);
		}

		image {
			width: 100%;
			height: 160rpx;
			border-radius: 24rpx;
		}
	}

	.paging {
		margin-top: 20rpx;
		height: calc(var(--vh) - 46px - var(--status-bar-height) - 140rpx);
		border-radius: 24rpx;
		overflow: hidden;
		// padding-top: 20rpx;
	}

	.list-row {
		background-color: var(--theme-auxiliary-color-default);
		// gap: 20rpx 0;

		// margin-top: 180rpx;
		::v-deep .uni-list--border-top {
			display: none;
		}



		.list-item {
			margin-top: 20rpx;
			border-radius: 24rpx;




			::v-deep .border--left {
				display: none;
			}



			.list-header {
				display: flex;

				.slot-image {
					height: 70rpx;
					width: 70rpx;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}

				.cell-top-text {
					display: inline-block;

					p {
						color: #404040;

						font-size: 28rpx;
						font-weight: 500;
					}

					.time {
						color: #404040;

						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}

			.content-box {
				margin: 20rpx 0;
				color: #404040;

				font-size: 34rpx;
				font-weight: 600;
			}

			.operation-box {
				border-top: 2rpx solid var(--theme-auxiliary-color-default);
				padding-top: 20rpx;
				color: #888;
				font-size: 24rpx;
				line-height: 40rpx;

				.good,
				.comment {
					margin-right: 40rpx;
					float: left;
					color: #404040;

					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					display: flex;
					align-items: center;

					/* 142.857% */
					.icon {
						color: #404040 !important;
						margin-right: 10rpx;
					}
				}
			}
		}
	}

	.zan-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
</style>
