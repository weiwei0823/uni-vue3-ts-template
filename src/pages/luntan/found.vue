<template>
	<view class="body" :style="{ paddingTop: statusBarH }" :class="['theme-' + themeColor.name]">
		<Header :title="title" :isFixed="true" :isBack="false"
			:headerStyle="{borderRadius:0,top:0}" :headerInnerStyle="{borderRadius:0}">
		</Header>
		<view class="search-row" v-show="curr == 0">
			<uni-search-bar :bgColor="themeColor.themeAuxiliaryColorDefault" radius="19" v-model="dataOne.searchValue"
				:placeholder="searchTitle" :placeholder-style="'color:#A1A1A1'"
				:cancelStyle="{ 'font-weight': 600, 'color': themeColor.themeColor, 'text-align': 'right', 'font-size': '30rpx' }"
				cancelButton="always" :cancelText="$t('pages.luntan.find.index.Search')" @confirm="search1"
				@cancel="search1">
				<template v-slot:searchIcon>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
							fill="#A1A1A1" />
					</svg>
				</template>
			</uni-search-bar>
		</view>
		<view class="search-row" v-show="curr == 1">
			<uni-search-bar :bgColor="themeColor.themeAuxiliaryColorDefault" radius="19" v-model="dataTwo.searchValue"
				:placeholder="searchTitle" :placeholder-style="'color:#A1A1A1'"
				:cancelStyle="{ 'font-weight': 600, 'color': themeColor.themeColor, 'text-align': 'right', 'font-size': '30rpx' }"
				cancelButton="always" :cancelText="$t('pages.luntan.find.index.Search')" @confirm="search2"
				@cancel="search2">
				<template v-slot:searchIcon>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M14.2016 14.2016C10.9528 17.4504 5.68542 17.4504 2.43661 14.2016C-0.812203 10.9528 -0.812203 5.68542 2.43661 2.43661C5.68542 -0.812203 10.9528 -0.812203 14.2016 2.43661C17.4504 5.68542 17.4504 10.9528 14.2016 14.2016ZM12.2408 12.2408C10.0749 14.4066 6.56334 14.4066 4.39746 12.2408C2.23159 10.0749 2.23159 6.56331 4.39746 4.39744C6.56334 2.23156 10.0749 2.23156 12.2408 4.39744C14.4067 6.56331 14.4067 10.0749 12.2408 12.2408ZM17.6331 15.6722C17.0916 15.1308 16.2137 15.1308 15.6722 15.6722C15.1308 16.2137 15.1308 17.0916 15.6722 17.6331L17.6331 19.5939C18.1745 20.1354 19.0524 20.1354 19.5939 19.5939C20.1354 19.0524 20.1354 18.1745 19.5939 17.6331L17.6331 15.6722Z"
							fill="#A1A1A1" />
					</svg>
				</template>
			</uni-search-bar>
		</view>
		<view class="header-row">
			<view class="header-item" :style="{ paddingTop: statusBarH }">
				<uni-row>
					<uni-col :style="{ '--theme-color': themeColor.themeColor }"
						:class="curr == 0 ? 'nav-item active' : 'nav-item'" :span="12">
						<view class="item-text" @click="selectNav(0)">
							{{ $t('pages.luntan.find.index.All') }}
						</view>
					</uni-col>
					<uni-col :style="{ '--theme-color': themeColor.themeColor }"
						:class="curr == 1 ? 'nav-item active' : 'nav-item'" :span="12">
						<view class="item-text" @click="selectNav(1)">{{ $t('pages.luntan.find.index.Recommended') }}
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<view class="z-paging-fixed" :class="{z2: curr == 0}">
			<z-paging
				:style="'height: calc(var(--vh) - 96rpx - 280rpx);background: var(--theme-auxiliary-color-default);'"
				class="paging" ref="paging" v-model="dataList" @query="lists" :lower-threshold="10"
				:refresher-enabled="true" :refresherAnimated="false" show-refresher-when-reload
				:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-default-style="'color:'+themeColor.themeAuxiliaryColorDefault"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', }" :loading-more-loading-animated="false"
				:loading-more-default-as-loading="true" :show-loading-more-no-more-view="true"
				:loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false" :empty-view-center="true"
				:empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #A1A1A1', 'font-size': '28rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<template #refresher="{refresherStatus}">
					<LuntanLoading class="loading" :text="zpageUIConfig.getloadingText(refresherStatus)" />
				</template>
				<view class="list-box">
					<ul class="list-row">
						<li class="list-item" v-for="(item, index) in dataList" @click="detail(item)">
							<view class="image-item">
								<fast-lazy-load :radius="'8rpx'" :src="item.pictureUrlStr" :width="'100%'"
									:height="'356rpx'" mode="aspectFill" :id="`qww${index+1}`" :isMark="true">
									<template v-slot:loading>
										<image class="lazy-image" :src="loadingImg"></image>
									</template>
									<template v-slot:error>
										<image class="lazy-image" :src="loadingImg"></image>
									</template>
								</fast-lazy-load>
							</view>
							<view class="text">
								<image @click.stop="homepage(item)" class="headPic" :src="item.headPic"></image>
								<text class="title">{{ item.title }}</text>
								<view class="zan" @click.stop="thumbUp(item)">
									<img v-if="item.thumbUpCount > 0" src="@/static/img/zan-fill.png" alt=""
										class="zan-img">
									<img v-else src="@/static/img/zan-stroke.png" alt="" class="zan-img">
									<span class="num">{{ item.thumbUpCount | moneyFormat }}</span>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</z-paging>
		</view>

		<view class="z-paging-fixed" :class="{z2: curr == 1}">
			<z-paging
				:style="'height: calc(var(--vh) - 96rpx - 280rpx);background: var(--theme-auxiliary-color-default);'"
				class="paging" ref="paging2" v-model="dataList2" @query="lists2" :lower-threshold="10"
				show-refresher-when-reload :refresher-enabled="true" :refresherAnimated="false"
				:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-default-style="'color:'+themeColor.themeAuxiliaryColorDefault"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
				:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
				:show-loading-more-no-more-view="true" :loading-more-no-more-text="'没有更多数据了'" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '0' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #A1A1A1', 'font-size': '28rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<template #refresher="{refresherStatus}">
					<LuntanLoading class="loading" :text="zpageUIConfig.getloadingText(refresherStatus)" />
				</template>
				<view class="list-box">
					<ul class="list-row">
						<li class="list-item" v-for="( item, index ) in  dataList2 " @click="detail(item)">
							<view class="image-item">
								<fast-lazy-load :radius="'8rpx'" :src="item.headPic" :width="'100%'" :height="'356rpx'"
									mode="aspectFill" :id="`qww${index+1}`" :isMark="true">
									<template v-slot:loading>
										<image class="lazy-image" :src="loadingImg"></image>
									</template>
									<template v-slot:error>
										<image class="lazy-image" :src="loadingImg"></image>
									</template>
								</fast-lazy-load>
							</view>
							<view class="text">
								<image @click.stop="homepage(item)" class="headPic" :src="item.headPic"></image>
								<text class="title">{{ item.title }}</text>
								<view class="zan" @click.stop="thumbUp(item)">
									<img v-if="item.thumbUpCount > 0" src="@/static/img/zan-fill.png" alt=""
										class="zan-img">
									<img v-else src="@/static/img/zan-stroke.png" alt="" class="zan-img">
									<span class="num">{{ item.thumbUpCount | moneyFormat }}</span>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</z-paging>
		</view>

		<!--底部-->
		<TabBar current="2" />
		<!--悬浮菜单栏-->
		<fab></fab>
		<!--发布悬浮按钮-->
		<view class="fabu" @click="add">
			<svg width="80" height="102" viewBox="0 0 80 102" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="16" y="10" width="48" height="48" rx="24" fill="white" fill-opacity="0.7" />
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M40 22.5C39.1716 22.5 38.5 23.1716 38.5 24V32.5H30C29.1716 32.5 28.5 33.1716 28.5 34C28.5 34.8284 29.1716 35.5 30 35.5H38.5V44C38.5 44.8284 39.1716 45.5 40 45.5C40.8284 45.5 41.5 44.8284 41.5 44V35.5H50C50.8284 35.5 51.5 34.8284 51.5 34C51.5 33.1716 50.8284 32.5 50 32.5H41.5V24C41.5 23.1716 40.8284 22.5 40 22.5Z"
					:fill="themeColor.themeColor" />
				<rect x="16" y="63" width="48" height="29" rx="14.5" fill="white" fill-opacity="0.7" />
				<path
					d="M37.018 73.452C36.2247 72.9573 35.408 72.4673 34.568 71.982L35.1 71.1C35.8373 71.52 36.6493 72.0007 37.536 72.542L37.018 73.452ZM38.6 83.938C36.7147 83.3687 35.1793 82.664 33.994 81.824C33.406 82.216 32.7293 82.58 31.964 82.916C31.1987 83.252 30.284 83.6067 29.22 83.98L28.744 82.958C30.5733 82.3607 32.0247 81.7447 33.098 81.11C32.2487 80.3633 31.53 79.4113 30.942 78.254C30.5407 79.1687 30.0507 80.046 29.472 80.886C28.8933 81.7167 28.184 82.58 27.344 83.476L26.742 82.398C27.778 81.3527 28.6273 80.2327 29.29 79.038C29.962 77.8433 30.4893 76.4807 30.872 74.95H27.554V74.04L28.212 71.38L29.304 71.632L28.744 73.956H31.096C31.264 73.0973 31.404 72.164 31.516 71.156L32.608 71.254C32.5053 72.1593 32.37 73.06 32.202 73.956H38.992V74.95H31.992C31.852 75.5847 31.6933 76.168 31.516 76.7H37.55V77.708C37.1767 78.4453 36.78 79.0893 36.36 79.64C35.94 80.1907 35.4687 80.6853 34.946 81.124C35.9913 81.796 37.3587 82.3607 39.048 82.818L38.6 83.938ZM31.838 77.708C32.398 78.8187 33.1307 79.7427 34.036 80.48C35.0347 79.724 35.8047 78.8 36.346 77.708H31.838ZM45.726 73.984C45.306 74.8893 44.8207 75.7527 44.27 76.574H47.014V74.796H48.05V76.574H52.082V81.124C52.082 81.544 52.0307 81.866 51.928 82.09C51.8253 82.314 51.6573 82.4727 51.424 82.566C51.2 82.65 50.878 82.692 50.458 82.692H49.072L48.862 81.684H50.136C50.5093 81.684 50.7567 81.6233 50.878 81.502C50.9993 81.3713 51.06 81.1427 51.06 80.816V77.638H48.05V83.938H47.014V77.638H43.962V82.832H42.954V78.268C42.5247 78.772 41.96 79.3647 41.26 80.046L40.798 78.94C41.6287 78.184 42.3473 77.4093 42.954 76.616C43.5607 75.8227 44.102 74.9453 44.578 73.984H41.19V72.934H45.054C45.3247 72.318 45.5767 71.66 45.81 70.96L46.804 71.198C46.608 71.7767 46.398 72.3553 46.174 72.934H53.076V73.984H45.726Z"
					:fill="themeColor.themeColor" />
			</svg>

		</view>
		<!--注册界面-->
		<AlertInjectLayer />
	</view>
</template>

<script>
	import {
		concern,
		thumbUp
	} from '@/utils/user/index.js'
	import {
		mapGetters
	} from 'pinia';
	import {
		findList
	} from "@/utils/forum/index.js"
	import TabBar from '@/components/Tabbar/Luntan'
	import Fab from "@/components/common/fab/Fab";
	import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
	import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
	import {
		listLatest
	} from '@/utils/forum/index.js'
	import Login from "@/components/common/login/Login";
	import Header from '@/components/common/header/index.vue';
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			UniCol,
			UniRow,
			TabBar,
			Fab,
			Login,
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
			title(){
			return this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.$t('pages.luntan.find.index.Title')
			},
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			isLogin(){
				return isLogin()
			},
			userInfo() {
				return this.$store.state.appInfoStore?.userInfo || {}
			},
		},
		data() {
			return {
				loading: false,
				curr: 0,
				searchTitle: this.$t('pages.luntan.find.index.SearchPlaceholder'),
				loadingImg: '@/static/img/zw.png',
				dataList: [],
				dataOne: {
					searchValue: '',
					pageNum: 1,
					pageSize: 60,
				},
				dataList2: [],
				statusBarH: "",
				dataTwo: {
					searchValue: '',
					pageNum: 1,
					pageSize: 60,
				},
				msg: '',
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)
			}
		},
		onLoad(option) {
			this.statusBarH = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px";
			uni.$on('emitParams', data => {
				this.msg = data.msg
			})

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
		onShow() {
			if(this.lotteryType !== this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)){
				this.search1()
				this.search2()
			}
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)
			uni.hideTabBar()
			if (this.msg) {
				pop(this.msg, 2000)
				this.msg = ''
			}
			if (this.curr == 0) {
				this.$refs.paging && this.$refs.paging.scrollToTop(false)
				// this.lists();
			} else {
				this.$refs.paging2 && this.$refs.paging2.scrollToTop(false)
				// this.lists2();
			}
		},
		methods: {
			thumbUp: function(item) {
				let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN);
				if (!token) {
					if (this.$config.station === 'LUNTAN') {
						this.showLogin = true
						return
					}
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				console.log(item)
				let prams = {
					relatedId: item.articleId,
					type: item.type,
					createTime: item.createTime
				}
				thumbUp(prams).then(res => {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
					if (res.code == 200) {
						item.thumbUp = 1
						item.thumbUpCount++
						// this.info = Object.assign({}, this.info);
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//切换选项卡
			selectNav(index) {
				this.curr = index
				if (this.curr == 0) {
					this.$refs.paging.scrollToTop(false)

				} else {
					this.$refs.paging2.scrollToTop(false)
				}
			},
			//用户主页
			homepage: function(item) {
				uni.navigateTo({
					url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
				})
			},
			detail: function(item) {
				const that = this
				item.read = 1
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&createTime=' + item
						.createTime + '&type=2',
					success: function(res) {
						res.eventChannel.emit('argParams', {
							lotteryType: this.$config.getStorageSync(this.$config.enumMgr
								.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, 1)
						})
					}
				})
			},
			search1: function() {
				this.$refs.paging.reload()
			},
			search2: function() {
				this.$refs.paging2.reload()
			},
			add: function() {
				if (!isLogin() || ['sign'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/luntan/find/find-add'
				})
			},
			//请求列表
			lists: function(pageNo, pageSize = 10) {
				this.loading = true
				this.dataOne.pageNum = pageNo
				let prams = {
					lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE),
					type: 2,
					sort: 0,
					pageNum: this.dataTwo.pageNum,
					pageSize: this.dataTwo.pageSize,
					title: this.dataOne.searchValue,
				}
				listLatest(prams).then(res => {
					this.loading = false
					this.$refs.paging.complete(res.result.records);
				}).catch(err => {
					console.log(err)
				})

			},
			//请求2
			lists2: function(pageNo, pageSize = 10) {
				this.loading = true
				this.dataTwo.pageNum = pageNo
				let prams = {
					lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE),
					type: 2,
					sort: 1,
					pageNum: this.dataTwo.pageNum,
					pageSize: this.dataTwo.pageSize,
					title: this.dataOne.searchValue,
				}
				listLatest(prams).then(res => {
					this.loading = false
					this.$refs.paging2.complete(res.result.records);
				}).catch(err => {
					console.log(err)
				})

			},
		}

	}
</script>
<style>
	::v-deep .u-drawer {
		z-index: 999999 !important;
	}
</style>
<style lang="scss" scoped>
	::v-deep .login-box {
		z-index: 99999 !important;
	}

	::v-deep .zp-l-container {
		background: var(--theme-auxiliary-color-default) !important;
	}

	::v-deep .zp-l-text {
		color: #A1A1A1 !important;
	}

	::v-deep .float-bnt {
		bottom: 352rpx;
	}

	.body {
		max-width: 480px;
		margin: auto;
		background: var(--theme-auxiliary-color-default);

		.header-row {
			height: 88rpx;
			width: 100vw;
			max-width: 480px;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 0 0 24rpx 24rpx;
			overflow: hidden;

			.header-item {
				width: 100%;
				max-width: 480px;
				background-color: #fff;
			}

			.nav-item {
				line-height: 88rpx;
				text-align: center;
				padding: 0 4px;
				font-size: 30rpx;
				color: #404040;

				.item-text {
					width: 100%;
					display: block;
				}
			}

			.active {
				color: var(--theme-color);
				font-size: 34rpx;
				font-weight: 600;

				.item-text {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					&::after {
						content: '';
						display: block;
						width: 24rpx;
						height: 6rpx;
						background: var(--theme-color);
						border-radius: 6rpx 6rpx 0 0;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}

		.z-paging-fixed {
			position: fixed;
			// left: 0;
			width: 100%;
			max-width: 480px;
			background: var(--theme-auxiliary-color-default);
			z-index: 1;
		}

		.z2 {
			z-index: 2;
		}

		.z-paging-fixed {
			position: fixed;
			// left: 0;
			width: 100%;
			max-width: 480px;
			background: var(--theme-auxiliary-color-default);
		}

		.search-row {
			background: #fff;
			padding: 8rpx 28rpx;

			::v-deep .uni-searchbar {
				background: var(--theme-auxiliary-color-default);
				border-radius: 16rpx;
				height: 76rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.uni-searchbar__box-icon-search {
					padding: 0 20rpx 0 0;
				}
			}
		}

		.list1 {
			transition-duration: 0.3s;
			transform: translate3d(0%, 0px, 0px);
		}

		.list2 {
			transition-duration: 0.3s;
			transform: translate3d(-100%, 0px, 0px);
		}

		.list-row {
			padding: 20rpx;
			display: flex;
			flex: 1;
			flex-wrap: wrap;

			.list-item:nth-child(2n) {
				margin-left: 5px;
			}

			.list-item:nth-child(2n+1) {
				margin-right: 5px;
			}

			.list-item {
				width: calc(50% - 5px);
				margin-bottom: 20rpx;
				border-radius: 12rpx;
				position: relative;
				background: #fff;

				.image-item {
					height: 356rpx;
					display: flex;

					.lazy-image {
						// max-width: 80rpx;
						// max-height: 80rpx;
						width: 100%;
						height: 100%;
						margin: auto;
						background: #f7f8fa;
					}
				}

				.text {
					display: flex;
					align-items: center;
					padding: 20rpx;

					.headPic {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
					}

					.title {
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-left: 10rpx;
						color: #404040;
						font-size: 24rpx;
					}

					.zan {
						display: flex;
						align-items: center;

						.num {
							margin-left: 10rpx;
							color: #404040;
							font-size: 28rpx;
						}
					}
				}
			}
		}

		.fabu {
			position: absolute;
			right: 0;
			bottom: 600rpx;
			z-index: 12;

			svg {
				width: 160rpx;
				height: 204rpx;
			}
		}
	}

	.zan-img {
		width: 30rpx;
		height: 30rpx;
	}
</style>
