<template>
	<view class="home-div" :style="{ marginTop: safeHeight, height: `calc(${uWindowHeight}px)` }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" :headerInnerStyle="{ backgroundColor: themeColor.themeAuxiliaryColorDefault }">
			<template v-slot:right>
				<view class="" style="text-align: right;" v-if="userId">
					<svg @click="openJin" xmlns="http://www.w3.org/2000/svg" width="22" height="4" viewBox="0 0 22 4" fill="none">
						<circle cx="2" cy="2" r="2" fill="#A1A1A1" />
						<circle cx="10" cy="2" r="2" fill="#A1A1A1" />
						<circle cx="20" cy="2" r="2" fill="#A1A1A1" />
					</svg>
				</view>

			</template>
		</Header>
		<view style="margin-bottom: 20rpx;" :style="'height:' + (userHeadHeight + mTabsHeight + childTabsHeight) + 'px'">
			<AccountMess :showUserInfo="userInfo" :isLogin="true" :isOpreation="false" />
			<view class="header-row">
				<view class="info-account">
					<uni-row :style="{ width: userId ? '344rpx' : '100%' }">
						<uni-col :span="8">
							<view class="info-item" @click="toUrl('/pages/common/userCenter/fans/index')">
								<view class="info-text num">{{ userInfo.fansCount | moneyFormat }}</view>
								<view class="info-text">{{ $t('pages.common.userCenter.homepage.fans') }}</view>
							</view>
						</uni-col>
						<uni-col :span="8">
							<view class="info-item" @click="toUrl('/pages/common/userCenter/mycare/index')">
								<view class="info-text num">{{ userInfo.concernCount | moneyFormat }}</view>
								<view class="info-text">{{ $t('pages.common.userCenter.homepage.following') }}
								</view>
							</view>
						</uni-col>
						<!-- <uni-col :span="6">
							<view class="info-item">
								<view class="info-text num">{{ userInfo.publishCount | moneyFormat }}</view>
								<view class="info-text">{{ $t('pages.common.userCenter.homepage.publish') }}</view>
							</view>
						</uni-col> -->
						<uni-col :span="8">
							<view class="info-item">
								<view class="info-text num">{{ userInfo.thumbUpCount | moneyFormat }}</view>
								<view class="info-text">{{ $t('pages.common.userCenter.homepage.likes') }}</view>
							</view>
						</uni-col>
					</uni-row>

					<view class="otherUser" v-if="userId">
						<view class="" @click="qidai">
							<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path id="Union" fill-rule="evenodd" clip-rule="evenodd"
									d="M5.65102 7.22287C6.65741 5.31636 8.63268 4.00055 10.9393 4.00055C13.2458 4.00055 15.2211 5.31636 16.2275 7.22287C18.2934 5.69141 19.6998 3.31921 19.8811 0.593832C19.431 0.243784 18.8903 0 18.2746 0H3.60387C2.98816 0 2.44746 0.243784 1.9974 0.593832C2.17867 3.31608 3.58511 5.69141 5.65102 7.22287ZM16.8647 9.2511C16.8715 9.30474 16.8789 9.35838 16.8863 9.41211L16.8863 9.41213C16.9129 9.60574 16.9397 9.8006 16.9397 10.0012C16.9397 13.3142 14.2518 16.002 10.9389 16.002C7.62592 16.002 4.93805 13.3142 4.93805 10.0012C4.93805 9.80311 4.96419 9.61249 4.99049 9.42068L4.9905 9.42061C4.99823 9.36428 5.00597 9.30785 5.01306 9.2511C3.24407 8.11032 1.81887 6.48509 0.9375 4.55358V21.334C0.9375 22.8061 2.13141 24 3.60349 24H18.2711C19.7432 24 20.9371 22.8061 20.9371 21.334V4.5567C20.0589 6.48509 18.6306 8.11344 16.8647 9.2511ZM14.601 9.80142C14.601 10.1171 14.3729 10.3452 14.0572 10.3452H11.485V11.3298H14.0572C14.3729 11.3298 14.601 11.561 14.601 11.8767C14.601 12.1924 14.3729 12.4205 14.0572 12.4205H11.485V13.9551C11.485 14.2708 11.2568 14.4989 10.9411 14.4989C10.6255 14.4989 10.3973 14.2708 10.3973 13.9551V12.4205H7.82507C7.50941 12.4205 7.28125 12.1924 7.28125 11.8767C7.28125 11.561 7.50941 11.3298 7.82507 11.3298H10.3973V10.3421H7.82507C7.50941 10.3421 7.28125 10.114 7.28125 9.7983C7.28125 9.48263 7.50941 9.25447 7.82507 9.25447H9.98475L7.82195 7.02916C7.71881 6.92915 7.66255 6.79476 7.65943 6.65099C7.65943 6.51034 7.71568 6.37282 7.82195 6.26656C8.0376 6.0509 8.37202 6.0509 8.58768 6.26656L10.9443 8.68564L13.2946 6.33844C13.5102 6.12279 13.8447 6.12279 14.0603 6.33844C14.276 6.5541 14.276 6.88852 14.0603 7.10417L11.9069 9.2576H14.0572C14.3729 9.2576 14.601 9.48575 14.601 9.80142Z"
									fill="url(#paint0_linear_21898_36462)" />
								<defs>
									<linearGradient id="paint0_linear_21898_36462" x1="10.9373" y1="0" x2="10.9373" y2="24"
										gradientUnits="userSpaceOnUse">
										<stop stop-color="#EC5F32" />
										<stop offset="1" stop-color="#DD1F1F" />
									</linearGradient>
								</defs>
							</svg>
							打赏
						</view>
						<view class="" @click="concern()">
							<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="icon/&#229;&#133;&#179;&#230;&#179;&#168;">
									<path id="Union" fill-rule="evenodd" clip-rule="evenodd"
										d="M12.9965 23.5194L2.8382 13.4144C2.24436 12.8237 1.77269 12.1218 1.45011 11.3488C1.12754 10.5759 0.960375 9.74692 0.958173 8.90934C0.955971 8.07176 1.11877 7.24195 1.43728 6.4673C1.75579 5.69264 2.22377 4.9883 2.81449 4.39451C3.40517 3.80067 4.10703 3.329 4.88 3.00642C5.65298 2.68385 6.48192 2.51668 7.3195 2.51448C8.15708 2.51228 8.98689 2.67508 9.76155 2.99359C10.5362 3.3121 11.2405 3.78007 11.8343 4.3708L12.9495 5.48058L14.0589 4.36495C14.6496 3.77111 15.3514 3.29944 16.1244 2.97686C16.8974 2.65429 17.7263 2.48713 18.5639 2.48492C19.4015 2.48272 20.2313 2.64552 21.006 2.96403C21.7806 3.28254 22.4849 3.75051 23.0787 4.34124C23.6726 4.93192 24.1443 5.63378 24.4668 6.40675C24.7894 7.17973 24.9566 8.00867 24.9588 8.84625C24.961 9.68383 24.7982 10.5136 24.4797 11.2883C24.0298 12.3824 22.619 12.364 21.5284 11.9056C20.8761 11.6314 20.1593 11.4808 19.4072 11.4827C16.4016 11.4906 13.9714 13.9336 13.9793 16.9392C13.9799 17.1435 13.9917 17.3451 14.0141 17.5435C14.2467 19.599 14.4555 22.0529 12.9965 23.5194ZM19.4974 13.4825C19.9516 13.4813 20.3208 13.8486 20.322 14.3028L20.3272 16.2803L22.2051 16.2754C22.6594 16.2742 23.0286 16.6415 23.0298 17.0957C23.031 17.55 22.6637 17.9192 22.2094 17.9204L20.3316 17.9253L20.3362 19.7078C20.3374 20.1621 19.9702 20.5313 19.5159 20.5325C19.0616 20.5337 18.6924 20.1664 18.6912 19.7121L18.6866 17.9297L16.8045 17.9346C16.3502 17.9358 15.981 17.5685 15.9798 17.1143C15.9786 16.66 16.3459 16.2908 16.8001 16.2896L18.6822 16.2847L18.677 14.3072C18.6758 13.8529 19.0431 13.4837 19.4974 13.4825Z"
										fill="url(#paint0_linear_21471_129517)" />
								</g>
								<defs>
									<linearGradient id="paint0_linear_21471_129517" x1="12.9417" y1="2.4997" x2="12.997" y2="23.5194"
										gradientUnits="userSpaceOnUse">
										<stop stop-color="#FFC122" />
										<stop offset="1" stop-color="#F16618" />
									</linearGradient>
								</defs>
							</svg>

							{{ userInfo.concern == 0 ?
								$t('pages.common.userCenter.homepage.follow') :
								$t('pages.common.userCenter.homepage.followed') }}
						</view>
					</view>

				</view>
				<view class="tab-content">
					<view class="m-tabs">
						<view :class="type === item.type ? 'm-tabs-item act' : 'm-tabs-item'" v-for="(item, index) in tabItems"
							:key="index" @click="onClickItem(item)">{{ item.name }}
						</view>
					</view>
					<view class="child-tabs">
						<view class="tab-box">
							<view class="nav">
								<view v-for="(item, index) in typeArr" :key="index"
									:class="item.lotteryType === activeType.lotteryType ? 'nav-item active' : 'nav-item'"
									@click="handleType(item)">
									{{ item.name || item.lotteryName }}
								</view>
							</view>
						</view>
						<view class="search">
							<uni-search-bar placeholder-style="color:#A1A1A1;" v-model="searchValue" :placeholder="searchTitle"
								bgColor="#fff" cancelButton="always" :cancelText="$t('pages.common.userCenter.homepage.search')"
								@confirm="search" @cancel="search" @clear="clear">
								<image slot="searchIcon" class="search-icon" src="@/static/img/common/userCenter/search.png" mode="">
								</image>

							</uni-search-bar>
						</view>
					</view>
				</view>
			</view>
		</view>
		<LuntanLoading class="loading" :style="{ top: `calc(${otherHeight}px + 300rpx)` }" v-if="loading" />
		<z-paging class="paging" :style="{ height: getHeight }" ref="paging" v-model="dataList" @query="listLatest"
			:refresher-enabled="false" :hide-empty-view="false" :empty-view-center="true"
			:empty-view-text="$t('pages.luntan.masterForum.noData')" :empty-view-img="'@/static/imgs-liuhe/activity/empty.png'"
			:fixed="false" :empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #d8d8d8', 'font-size': '32rpx', 'line-height': '44rpx', 'margin-top': '0rpx' }">
			<view class="list-bd" v-if="!loading">
				<tu-jie :user-id="userId" :dataList="dataList" v-if="type == 12 || type == 5"></tu-jie>
				<forum :user-id="userId" :dataList="dataList" @previewImg="previewImg" v-else @tishi="tishi"></forum>
			</view>
		</z-paging>
		<!--弹窗-->
		<uni-popup ref="jinPopup" background-color="transparent" mask-background-color="rgba(0,0,0,.3)"
			:is-mask-click="true" @change="handleChange">
			<view class="jin-button">
				<button type="primary" class="action-button red" v-show="userInfo.userBlock == 0 && userId" @click="block">{{
					$t('pages.common.userCenter.homepage.block') }}</button>
				<button type="primary" class="action-button red" v-show="userInfo.userBlock == 1 && userId"
					@click="cancelBlock">{{
						$t('pages.common.userCenter.homepage.unblock') }}</button>
			</view>
			<view class="van-action-sheet__gap" v-show="userInfo.userBlock == 0 && userId"></view>
			<view class="jin-button" v-show="userInfo.userBlock == 0 && userId">
				<button type="primary" class="action-button blue" @click="closeJin">{{
					$t('pages.common.userCenter.homepage.cancel') }}</button>
			</view>
			<view class="van-action-sheet__gap"></view>
		</uni-popup>
		<AlertInjectLayer />
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<uni-popup ref="tishi" type="dialog">
			<uni-popup-dialog type="info" mode="base" :message="$t('components.common.list.forum.successMessage')"
				:showCancel="false" :okStyle="{ color: themeColor.themeColor }"
				:title="$t('components.common.list.forum.failureReason')" :content="remake"
				:confirmText="$t('components.common.list.forum.knowMore')">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import NavBar from "@/components/common/navBar/navBar";
import Forum from "@/components/common/list/forum";
import TuJie from "@/components/common/list/tujie";
import Login from "@/components/common/login/Login";
import Share from "@/components/common/share/Share";
import Header from "@/components/common/header/index";
import {
	userPublish
} from '@/utils/forum/index.js'
import {
	info,
	concern,
	block,
	cancelBlock
} from '@/utils/user/index.js'
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import AccountMess from "@/components/common/userCenter/account-mess.vue"
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import {
	lotteryTime
} from '@/utils/lottery/index'
import AppInfoStore from "@/store/modules/appInfoStore";
import SystemInfoStore from "@/store/modules/systemInfoStore";
export default {
	name: "homepage",
	components: {
		AlertInjectLayer,
		NavBar,
		Forum,
		TuJie,
		Login,
		Share,
		Header,
		AccountMess,
		cusPreviewImg
	},
	onShow() {
		this.$nativeBridge.setStatusBarColor('#f4f4f4');
	},
	mounted() {
		uni.$emit("on_page_mounted", this);
	},
	computed: {
    ...mapState(AppInfoStore, ["themeColor"]),
    ...mapState(SystemInfoStore, ["uWindowHeight"]),
		searchTitle() {
			console.log(this.activeType);
			return this.activeType.label;
		},
		otherHeight() {
			return this.userHeadHeight + this.mTabsHeight + this.childTabsHeight
		},
		getHeight() {
			return `calc(${this.uWindowHeight}px - var(--safe-area-inset-bottom) - ${this.isApp ? 0 : 106}rpx - ${this.otherHeight}px)`
		}
	},
	data() {
		return {
			remake: '',
			ImgList: [],
			loading: false,
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.common.userCenter.homepage.userProfile'),
			content: "...",
			isShowRight: true,
			userId: '',
			userInfo: {
				id: '',
				headImgUrl: "",
				userName: "",
			},
			titleStyle: {
				color: "#FFFFFF"
			},
			fontColor: "#FFFFFF",
			isApp: false,
			tabItems: [{
				type: 3,
				name: this.$t('pages.common.userCenter.homepage.masterForum')
			},
			{
				type: 2,
				name: this.$t('pages.common.userCenter.homepage.discovery')
			},
			{
				type: 4,
				name: this.$t('pages.common.userCenter.homepage.dataCollection')
			},
			{
				type: 12,
				name: this.$t('pages.common.userCenter.homepage.pictureGroup')
			},
				/*{type:5,name:'竞猜小组'}*/
			],
			type: 3,
			currentType: 0,
			searchValue: "",
			typeArr: [
			],
			activeType: {
				label: this.$t('pages.common.userCenter.homepage.searchAllPosts'),
				lotteryType: 0,
			},
			findTypeList: [{
				img: "@/static/img/menu/1.png",
				act: "@/static/img/menu/act-1.png",
				name: this.$t('pages.common.userCenter.homepage.australia'),
			},
			{
				img: "@/static/img/menu/2.png",
				act: "@/static/img/menu/act-2.png",
				name: this.$t('pages.common.userCenter.homepage.hongkong'),
			},
			{
				img: "@/static/img/menu/3.png",
				act: "@/static/img/menu/act-3.png",
				name: this.$t('pages.common.userCenter.homepage.taiwan'),
			},
			{
				img: "@/static/img/menu/4.png",
				act: "@/static/img/menu/act-4.png",
				name: this.$t('pages.common.userCenter.homepage.new'),
			},
			],
			userHeadHeight: 0,
			mTabsHeight: 0,
			childTabsHeight: 0,
			total: 0,
			pageNum: 1,
			pageSize: 10,
			dataList: [],
		}
	},
	async onLoad(option) {
		this.userId = option.userId
		this.getUserInfo()
		this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		await this.initNavMenu();
		this.$nextTick(function () {
			this.navY()
		})
	},
	methods: {
		tishi(remake) {
			this.remake = remake
			this.$refs.tishi.open()
		},
		handleChange({ show }) {
			let color = '#f4f4f4'
			let isLightColor = false
			if (show) {
				color = '#AAAAAA'
				isLightColor = true
			}
			setTimeout(() => {
				this.$nativeBridge.setStatusBarColor(color, isLightColor)
			}, 120);
		},
		//图片弹窗
		previewImg: function (imgList, url) { // 点击预览图片
			this.ImgList = imgList
			this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
		},
		qidai() {
			pop(this.$t('components.CommonPages.pages-luntan.LuntanMarket.comingSoon'), 2000)
		},
		navY: function () {
			/*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
			const query = uni.createSelectorQuery();
			query.select('.account-mess').boundingClientRect(data => {
				this.userHeadHeight = data.height;
			}).exec();
			query.select('.header-row').boundingClientRect(data => {
				this.mTabsHeight = data.height;
			}).exec();
			// query.select('.child-tabs').boundingClientRect(data => {
			// 	this.childTabsHeight = data.height;
			// }).exec();
		},
		getUserInfo() { //从storage获取用户信息
			let prams = {}
			if (this.userId) {
				prams = {
					userId: this.userId
				}
			} else {
				this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_USERINFO);
				prams = {
					userId: this.userInfo.id
				}
			}
			info(prams).then(res => {
				this.userInfo = res.result
				this.dataList.length = []
				this.$refs.paging.reload()
			}).catch(err => {
				console.log(err)
			})
		},
		toUrl(url) {
			if (this.userId) {
				url = url + "?userId=" + this.userId
			}
			uni.navigateTo({
				url: url
			})
		},
		openJin: function () {
			this.$refs.jinPopup.open('bottom')
		},
		closeJin: function () {
			this.$refs.jinPopup.close()
		},
		//分享弹窗
		fenxiang: function () {
			this.$refs.jinPopup.close();
			this.$refs.share.open();
		},
		//关闭分享
		closefx: function () {
			this.$refs.share.close()
		},
		//第一层tab切换
		onClickItem(item) {
			this.type = item.type
			this.dataList.length = []
			this.$refs.paging.reload()
		},
		//关注接口
		concern: function () {
			let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN);
			if (!token) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				userId: this.userInfo.id
			}
			concern(prams).then(res => {
				pop(res.message, 2000)
				if (res.code == 200) {
					this.userInfo.concern = res.result
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//拉黑用户
		block: function () {
			if (!isLogin()) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				blockedUserId: this.userInfo.id
			}
			block(prams).then(res => {
				pop('拉黑用户' + res.message, 2000)
				if (res.code == 200) {
					this.$refs.jinPopup.close()
					this.userInfo.userBlock = 1
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//取消拉黑用户
		cancelBlock: function () {
			if (!isLogin()) {
				uni.$emit('showPop', {
					refName: 'AlertMessage'
				})
				return false
			}
			let prams = {
				blockedUserId: this.userInfo.id
			}
			cancelBlock(prams).then(res => {
				pop(res.message, 2000)
				if (res.code == 200) {
					this.$refs.jinPopup.close()
					this.userInfo.userBlock = 0
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//搜索
		search() {
			this.pageNum = 1
			this.$refs.paging.reload()
		},
		//清除数据
		clear() {
			this.searchValue = ''
			this.$refs.paging.reload()
		},
		// 类型点击事件
		handleType(item) {
			this.activeType = {
				lotteryType: item.lotteryType
			};
			console.log(item);
			if (item.lotteryType > 0) {
				this.activeType.label = this.$t('pages.common.userCenter.homepage.search') + (item.name || item.lotteryName) + this.$t(
					'pages.common.userCenter.homepage.searchPosts')
			} else {
				this.activeType.label = this.$t('pages.common.userCenter.homepage.search') + item.name + this.$t(
					'pages.common.userCenter.homepage.myPosts')
			}
			this.dataList.length = []
			this.$refs.paging.reload()
		},
		//论坛数据获取
		async listLatest(pageNo, pageSize = 10) {
			if (!this.dataList.length) {
				this.loading = true
			}
			if (!this.userInfo.id) {
				return false
			}
			this.pageNum = pageNo
			let prams = {
				lotteryType: this.activeType.lotteryType,
				type: this.type,
				sort: 0,
				title: this.searchValue,
				toUserId: this.userInfo.id,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
			}
			await userPublish(prams).then(res => {
				this.loading = false
				this.$refs.paging.complete(res.result.records);
			}).catch(err => {
				console.log(err)
			})
		},

		initNavMenu() {
			let _this = this;
			return new Promise(resolve => {
				lotteryTime().then(res => {
					let concat = res.result;
					_this.typeArr = [];
					_this.typeArr.push({
						lotteryType: 0,
						name: this.$t('pages.common.userCenter.homepage.all')
					});
					_this.typeArr.push(...concat)
					resolve();
				})
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.paging {
	background: var(--theme-auxiliary-color-default);
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;
}

.loading {
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}

.home-div {
	position: fixed;
	width: 100%;
	max-width: 480px;
}

::v-deep .zp-l-text {
	color: #A1A1A1;
}

::v-deep .account-mess {
	.header {
		padding-bottom: 30rpx;
	}
}

.header-row {
	position: fixed;
	width: 100%;
	max-width: 480px;
	z-index: 10;

	.info-account {
		background: var(--theme-auxiliary-color-default);
		padding-bottom: 30rpx;
		display: flex;
		justify-content: space-between;

		.uni-row {
			width: 344rpx;
		}

		.info-item {
			text-align: center;

			.info-text {
				color: #A0ABA5;
				text-align: center;

				font-size: 28rpx;
				font-weight: 400;
			}

			.num {
				color: #404040;
				text-align: center;

				font-size: 30rpx;
				font-weight: 500;
				padding-bottom: 10rpx;
			}
		}

		.otherUser {
			display: flex;

			view {
				display: flex;
				align-items: center;
				color: #404040;
				text-align: center;

				font-size: 28rpx;
				font-weight: 400;
				padding-right: 20rpx;

				&:first-child {
					margin-right: 20rpx;
				}

				svg {
					margin-right: 20rpx;
				}
			}
		}
	}

}

.user-head {
	background: var(--theme-color);

	.user-info-warp {
		position: relative;
		height: 128rpx;
		margin-bottom: 30rpx;
		padding: 0 30rpx;

		.user-avatar {
			width: 128rpx;
			height: 128rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.user-user-name {
			padding-top: 16rpx;
			padding-left: 14rpx;

			.name {
				font-weight: 500;
				color: #fff;
				font-size: 32rpx;
			}
		}

		.tool {
			position: absolute;
			right: 0rpx;
			top: 0;
			display: flex;

			.m-follow {
				display: inline-block;
				width: 132rpx;
				height: 68rpx;
				background: #fff;
				box-shadow: 0 8rpx 16rpx 0 #09a958;
				border-radius: 34rpx;
				text-align: center;
				line-height: 68rpx;
				font-weight: 500;
				color: var(--theme-color);
				margin-left: 20rpx;
			}
		}

		.medal-list {
			padding-top: 20rpx;
			padding-left: 14rpx;

			.medal-img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}


}

.tab-content {
	background-color: #fff;
	overflow: hidden;
	border-radius: 24rpx;

	.m-tabs {

		// height: 104rpx;
		color: #999;
		font-weight: 800;
		overflow: hidden;
		// background: #f8f8f8;
		padding: 0px 28rpx;
		display: flex;
		justify-content: space-between;
		padding-top: 5rpx;
		border-bottom: 2rpx solid var(--theme-auxiliary-color-default);

		.m-tabs-item {
			// float: left;
			line-height: 80rpx;
			/*      width: 19.33%;*/
			// width: 24.33%;
			text-align: center;
			position: relative;

			color: #A0ABA5;
			text-align: center;

			font-size: 30rpx;
			font-weight: 400;

		}

		.m-tabs-item.act {
			border-radius: 40rpx;
			color: var(--theme-color);
			font-size: 34rpx !important;
		}

		.m-tabs-item.act:after {
			content: "";
			position: absolute;
			width: 36rpx;
			height: 6rpx;
			border-radius: 6rpx 6rpx 0px 0px;
			background: var(--theme-color);
			bottom: 0;
			left: 50%;
			margin-left: -18rpx;
		}
	}

	.child-tabs {
		width: 100%;
		/*position: absolute;*/
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		::v-deep .search {
			margin-top: 20rpx;
			margin-left: 28rpx;
			margin-right: 28rpx;

			.uni-searchbar {
				border-radius: 16rpx;
				overflow: hidden;
				background: var(--theme-auxiliary-color-default);
				padding: 0;
				padding-right: 20rpx;

				.search-icon {
					width: 40rpx;
					height: 40rpx;
				}

				.uni-searchbar__cancel {
					color: var(--theme-color);
				}

				.uni-searchbar__box {
					background-color: var(--theme-auxiliary-color-default) !important;
				}
			}
		}

		.tab-box {
			padding-top: 20rpx;

			.nav {
				box-sizing: border-box;
				height: 68rpx;
				border-radius: 16rpx;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				justify-content: space-around;
				background: var(--theme-auxiliary-color-default);
				margin: 0 22rpx;
				padding: 0 6rpx;

				.nav-item {
					width: 138rpx;
					height: 56rpx;
					text-align: center;
					font-size: 28rpx;
					color: #404040;
					display: grid;
					place-content: center;

					&:last-child {
						border: 0px;
					}
				}

				.active {
					background-color: #fff;
					color: var(--theme-color);
					border-radius: 12rpx;
				}
			}
		}

		.second-list {
			display: flex;
			justify-content: space-around;

			.second-type-item {
				padding: 12rpx 36rpx;
				border-spacing: 2px;
				color: var(--theme-color);
				background: #fff;
				border-radius: 8rpx;
				font-size: 26rpx;
				border: 1px solid var(--theme-color);

				image {
					height: 44rpx;
					vertical-align: middle;
				}

				text {
					vertical-align: middle;
				}
			}

			.second-type-item.act {
				background-color: var(--theme-color);
				color: #fff;
			}
		}
	}

	.list-bd {
		padding: 0 26rpx;
	}
}

.jin-button {
	border-radius: 16rpx;
	overflow: hidden;
	background-color: transparent;
}

.action-button {
	font-size: 34rpx;
	background-color: #fff;
	display: block;
	color: #323233;
	width: 694rpx;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(10px);
	border-radius: 16rpx;
	// height: 50px;
	// line-height: 50px;
	// border-radius: 16px 16px 0 0;

	// border-bottom: 2px solid #ebedf0;
}

.red {
	color: var(--theme-auxiliary-color-remind);
}

.blue {
	color: var(--theme-color);
}

.action-button:after {
	// content: " ";
	// width: 200%;
	// height: 200%;
	// position: absolute;
	// top: 0;
	// left: 0;
	// border: 0px solid rgba(0, 0, 0, .2);
	// -webkit-transform: scale(.5);
	// transform: scale(.5);
	// -webkit-transform-origin: 0 0;
	// transform-origin: 0 0;
	// box-sizing: border-box;
	// border-radius: 10px;
}

.van-action-sheet__gap {
	display: block;
	height: 20rpx;
	// background-color: rgba(0, 0, 0, 0.7);
	width: 100.1%;
	// border: 0px solid rgba(0, 0, 0, 0.7);
}
</style>
