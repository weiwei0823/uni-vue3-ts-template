<template>
	<view class="care-box" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="control-box">
			<view class="search">
				<uni-search-bar bgColor="#f7f8fa" v-model="searchValue" :placeholder="searchTitle"
					:placeholderStyle="'color:#A1A1A1'" cancelButton="always"
					:cancelText="$t('pages.common.userCenter.homepage.search')" @confirm="search" @cancel="search"
					@clear="clear">
					<template v-slot:searchIcon>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
								fill="#A1A1A1" />
						</svg>
					</template>
				</uni-search-bar>
			</view>
		</view>
		<view class="loading" v-show="loading">
			<ltLoading />
		</view>
		<z-paging v-show="!loading" style="background: var(--theme-auxiliary-color-default);margin-top: 14rpx;"
			:height="'85vh'" ref="paging" v-model="dataList" @query="myFans" show-refresher-when-reload
			:lower-threshold="10" :refresher-enabled="false" :refresherAnimated="false"
			:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
			:refresher-default-text="zpageUIConfig['refresher-default-text']"
			:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
			:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']" :refresher-default-style="'#EEEEEE'"
			:refresher-img-style="zpageUIConfig['refresher-img-style']"
			:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
			:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
			:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
			:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': '#EFF6FE' }"
			:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
			:show-loading-more-no-more-view="false"
			:loading-more-no-more-text="$t('components.CommonPages.pages - liuhe.LiuheActivity.NoMoreData')"
			:hide-empty-view="false" :empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '443rpx', 'height': '443rpx' }"
			:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="list-box">
				<fans v-for="(item, index) in dataList" :item="item"></fans>
			</view>
		</z-paging>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import Fans from '@/components/common/fans/Fans.vue';
	import {
		myFans
	} from "@/utils/user/index"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import ltLoading from "@/components/common/loading/LuntanLoading.vue";
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Header,
			Fans,
			ltLoading
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.common.userCenter.fans.myFans'),
				userId: '',
				searchValue: "",
				searchTitle: this.$t('pages.common.userCenter.homepage.search2'),
				dataList: [],
				pageNum: 1,
				pageSize: 10,
				loading: false

			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapGetters(["themeColor"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
		},
		onLoad(option) {
			if (option.userId) {
				this.title = this.$t('pages.common.userCenter.fans.fansOfTa')
				this.userId = option.userId
			}
		},
		methods: {
			//搜索
			search: function() {
				this.pageNum = 1
				this.$refs.paging.reload()
			},
			//我的关注
			myFans: function(pageNo, pageSize = 10) {
				this.pageNum = pageNo
				let prams = {
					concernUserId: this.userId,
					name: this.searchValue,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}
				if (pageNo == 1) this.loading = true;
				myFans(prams).then(res => {

					// let test=[{headPic:'https://d3nwyhpina0iix.cloudfront.net/mk-public/headImg/Frame%2030.png','username':'123123123'}];
					this.$refs.paging.complete(res.result.records);
					if (pageNo == 1) this.loading = false;
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		margin-top: 200rpx;
	}

	::v-deep .header {
		border-radius: 0px !important;
		top: 0px !important;
		border: none !important;
	}

	.care-box {
		width: 100%;
		height: var(--vh);
		position: absolute;
		display: flex;
		flex-direction: column;
		background: var(--theme-auxiliary-color-default);

		.control-box {
			background: white;
			padding: 20rpx 0rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
		}

		.search {
			width: 694rpx;
			height: 76rpx;
			margin-left: auto;
			margin-right: auto;
			background: var(--theme-auxiliary-color-default);
			border-radius: 16rpx;
			overflow: hidden;

			::v-deep .uni-searchbar {
				height: 76rpx;
				padding: 0px !important;

				.uni-searchbar__box {
					height: 100% !important;
					background-color: var(--theme-auxiliary-color-default) !important;
				}

				.uni-searchbar__box-icon-search .uni-icons {
					font-size: 40rpx !important;
					font-weight: bold;
				}

				.uni-searchbar__cancel {
					padding: 0rpx 20rpx !important;
					color: var(--theme-color);
					font-size: 30rpx;
				}
			}
		}

		.list-box {
			.list-item {
				width: 100%;
				overflow: hidden;
				color: #323233;
				font-size: 14px;
				line-height: 24px;
				background-color: #fff;
			}
		}
	}
</style>
