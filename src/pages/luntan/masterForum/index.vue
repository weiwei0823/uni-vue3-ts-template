<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ position: `fixed`, height: `${uWindowHeight}px`, marginTop: safeHeight, width: '100%'}"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :isFixed="true" :isBack="false" showBack @back="back" :useCustomBack="true">
			<block slot="right">
				<view style="display:flex;justify-content: flex-end;">
					<view @click="serach">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<g clip-path="url(#clip0_21025_122608)">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M4.91797 0C2.70883 0 0.917969 1.79086 0.917969 4V18C0.917969 20.2091 2.70883 22 4.91796 22H10.734C9.21152 20.6563 8.2513 18.6903 8.2513 16.5C8.2513 12.4499 11.5345 9.16667 15.5846 9.16667C17.7749 9.16667 19.7409 10.1269 21.0846 11.6493V4C21.0846 1.79086 19.2938 0 17.0846 0H4.91797ZM15.5846 22C18.6222 22 21.0846 19.5376 21.0846 16.5C21.0846 13.4624 18.6222 11 15.5846 11C12.5471 11 10.0846 13.4624 10.0846 16.5C10.0846 19.5376 12.5471 22 15.5846 22ZM13.8166 16.6547C14.3476 17.1857 15.2085 17.1857 15.7395 16.6547C16.2705 16.1237 16.2705 15.2628 15.7395 14.7318C15.2085 14.2008 14.3476 14.2008 13.8166 14.7318C13.2856 15.2628 13.2856 16.1237 13.8166 16.6547ZM12.756 17.7153C13.8727 18.8321 15.6834 18.8321 16.8002 17.7153C17.917 16.5986 17.917 14.7879 16.8002 13.6711C15.6834 12.5543 13.8727 12.5543 12.756 13.6711C11.6392 14.7879 11.6392 16.5986 12.756 17.7153ZM17.1565 18.3701C17.425 18.1016 17.8603 18.1016 18.1288 18.3701L18.5046 18.7459C18.7731 19.0144 18.7731 19.4497 18.5046 19.7182C18.2361 19.9866 17.8008 19.9866 17.5323 19.7182L17.1565 19.3424C16.888 19.0739 16.888 18.6386 17.1565 18.3701ZM5.0013 4C4.44902 4 4.0013 4.44772 4.0013 5C4.0013 5.55228 4.44902 6 5.0013 6H13.0013C13.5536 6 14.0013 5.55228 14.0013 5C14.0013 4.44772 13.5536 4 13.0013 4H5.0013ZM5.0013 8C4.44902 8 4.0013 8.44772 4.0013 9C4.0013 9.55228 4.44902 10 5.0013 10H9.0013C9.55359 10 10.0013 9.55228 10.0013 9C10.0013 8.44772 9.55359 8 9.0013 8H5.0013ZM4.0013 13C4.0013 12.4477 4.44902 12 5.0013 12H8.0013C8.55359 12 9.0013 12.4477 9.0013 13C9.0013 13.5523 8.55359 14 8.0013 14H5.0013C4.44902 14 4.0013 13.5523 4.0013 13Z"
									fill="#A1A1A1" />
							</g>
							<defs>
								<clipPath id="clip0_21025_122608">
									<rect width="22" height="22" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</view>
					<view class="" style="margin-left:20rpx;" @click="fabu">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M11 0C10.4477 0 10 0.447716 10 1V10H1C0.447715 10 0 10.4477 0 11C0 11.5523 0.447716 12 1 12H10V21C10 21.5523 10.4477 22 11 22C11.5523 22 12 21.5523 12 21V12H21C21.5523 12 22 11.5523 22 11C22 10.4477 21.5523 10 21 10H12V1C12 0.447715 11.5523 0 11 0Z"
								fill="#A1A1A1" />
						</svg>
					</view>
				</view>
			</block>
		</Header>
		<scroll-view id="scrollHeight" :style="{ height: `calc(${uWindowHeight}px - 100rpx)` }" :scroll-top="scrollTop"
			scroll-y="true" class="scroll-Y" show-scrollbar="true" lower-threshold="700" scroll-with-animation="true"
			@scrolltolower="lower" @scroll="scroll">
			<!--广告公告栏-->
			<view class="forum-body-hd">
				<view class="forum-body-item">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M6.36056 2.28843L4.72113 0.648995C1.9831 2.73632 0.171831 5.97857 0 9.64618H2.29296C2.46479 6.60956 4.02253 3.9504 6.36056 2.28843ZM21.707 9.64618H24C23.8282 5.97857 22.0169 2.7335 19.2676 0.648995L17.6282 2.28843C19.9775 3.9504 21.5352 6.60956 21.707 9.64618ZM19.4507 10.2208C19.4507 6.70251 17.0084 3.75604 13.7211 2.97857V2.19829C13.7211 1.24618 12.9521 0.47998 12.0028 0.47998C11.0507 0.47998 10.2845 1.24899 10.2845 2.19829V2.97857C6.99437 3.75885 4.55493 6.70251 4.55493 10.2208V16.525L2.26197 18.818V19.9645H21.7465V18.818L19.4535 16.525V10.2208H19.4507ZM12 23.4011C12.1606 23.4011 12.3099 23.3898 12.4592 23.356C13.2028 23.2067 13.8225 22.6912 14.1099 22.0039C14.2254 21.7279 14.293 21.4321 14.293 21.111H9.70704C9.70704 22.3701 10.738 23.4011 12 23.4011Z"
							:fill="themeColor.themeColor" />
					</svg>
					<text v-if="adInfo&&adInfo.length > 0" class="text" @click="openAd(adInfo[0])">
						{{ adInfo[0].content }}</text>
				</view>
				<view class="border"></view>
				<view class="forum-body-item">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<g clip-path="url(#clip0_21025_123075)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M5.26661 6.23834C8.90459 5.94223 16.5613 4.76623 18.0842 2.43116C19.9878 -0.487689 23.2873 0.781373 23.7315 5.03273C24.0897 8.46121 24.0893 12.3119 23.7315 15.7367C23.2873 19.988 19.9878 21.2571 18.0842 18.3383C16.5613 16.0032 8.90459 14.8272 5.26661 14.5311V6.23834ZM8.56616 22.7165C8.30015 22.3914 7.81386 21.6945 7.27402 20.921C6.65492 20.0338 5.9654 19.0457 5.45696 18.4017C4.88588 17.6436 4.50516 16.7519 5.45696 16.7519C6.40875 16.7519 7.93163 17.323 9.51796 18.8459C11.1043 20.3688 12.3099 22.7165 11.8023 23.0972C11.2946 23.478 9.13724 23.4145 8.56616 22.7165ZM3.68028 6.28216C1.64772 6.28216 0 7.92988 0 9.96244V10.597C0 12.6295 1.64772 14.2773 3.68028 14.2773V6.28216Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_21025_123075">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<text class="text">{{ noticeInfo ? noticeInfo.noticeContent : '' }} </text>
				</view>
			</view>
			<!--导航栏-->
			<view class="nav-box">
				<view :class="{ 'tab-div-top': this.old.scrollTop >= 120 }" :style="{top:'104rpx'}">
					<view class="tab-div-content">
						<view class="tab-box">
							<view class="nav">
								<view v-for="(item, index) in navList" :key="index"
									:class="lotteryType == item.lotteryType ? 'nav-item active' : 'nav-item'"
									@click="selectLottery(item)">
									{{ item.name }}
								</view>
							</view>
						</view>
						<view class="title-tab-box">
							<view v-for="(item, index) in speakList" :key="index"
								:class="speak == index ? 'title-tab-item active' : 'title-tab-item'"
								@click="selectSpeak(index)">
								{{ item }}
							</view>
						</view>
						<view class="sort-box">
							<span v-for="(item, index) in sortList" :key="index" :class="sort == index ? 'act' : ''"
								@click="selectSort(index)">
								{{ item }}
							</span>
							<span :class="sort == -1 ? 'act' : ''" @click="sort = -1">
								{{ $t('pages.luntan.masterForum.index.rules') }}
							</span>
						</view>
					</view>
				</view>
			</view>
			<!--列表-->
			<view class="forum-body-bd">
				<view role="feed" class="van-list" v-show="sort >= 0" style="">
					<ul class="forum-list" v-if="list.length > 0">
						<li v-for="(item, index) in list" :key="index" id="box">
							<view class="user-info-box">
								<view class="user-img" @click="homepage(item)">
									<view class="left-image">
										<view class="van-image">
											<img :src="item && item.headPic ? item.headPic : logoUrl"
												class="van-image__img">
										</view>
									</view>
									<view class="user-info">
										<view :class="item.vip == 1 ? 'name red' : 'name'">
											{{ item.username }}
											<image v-for="(val, key) in item.medalList" :key="key" :src="val"
												lazy-load="true"></image>
											<span class="reportInfo"></span>
										</view>
										<view class="time">{{ item.createTimeStr }}</view>
									</view>
								</view>
							</view>
							<view class="forumflow" @click="concern(item)" v-if="userIdNew!==item.userId">

								<span
									v-if="(concernMap[item.userId] !== undefined && concernMap[item.userId] == 0) || (concernMap[item.userId] === undefined && item.concern == 0)">{{
									$t('pages.luntan.masterForum.index.follow') }}</span>
								<span v-else>{{ $t('pages.luntan.masterForum.index.followed') }}</span>
							</view>
							<view class="title van-row" @click="detail(item)">
								<view class="slabel van-col">{{ item.period }}</view>
								<view class="van-ellipsis  van19">
									<view class="zd" v-if="item.top == 1">
										置顶
									</view>
									<!-- <view class="zd">
									置顶
								</view> -->
									<template v-if="item.highQuality == 1">
										<image src="@/static/img/forum/jin.png" style="width: 40rpx;" class="icon"
											mode="widthFix">
										</image>
									</template>
									<!-- <template>
									<image src="@/static/img/forum/jin.png" style="width: 40rpx;" class="icon"
										mode="widthFix">
									</image>
								</template> -->
									<view class="formtitle" :style="item.read == 1 ? 'color: rgb(153, 153, 153);' : ''">
										{{ item.title }}
									</view>
									<view class="reads" v-show="item.read == 1">
										{{ $t('pages.luntan.masterForum.index.read') }}
									</view>
								</view>
							</view>
							<view style="clear: both"></view>
							<view class="text" :style="item.read == 1 ? 'color: rgb(153, 153, 153);' : ''"
								@click="detail(item)">
								<view class="van-ellipsis" v-for="(val, key) in item.descriptionList" :key="key">
									{{ val }}
								</view>
							</view>
							<view class="img-box">
								<view class="images">
									<view class="van-row new-row img-box-3" :data-size="item.pictureList.slice(0, 3).length">
										<view class="van-col  new-van-col--8"
											v-for="(val, key) in item.pictureList.slice(0, 3)"
											@click="previewImg(item.pictureList, val)">
											<view class="image-body">
												<fast-lazy-load :radius="'24rpx'" :src="val" :width="'100%'"
													:height="'180rpx'" mode="aspectFill" :id="`qww${index+1}`"
													:isMark="true">
													<template v-slot:loading>
														<image class="lazy-image" :src="loadingImg"></image>
													</template>
													<template v-slot:error>
														<image class="lazy-image" :src="loadingImg"></image>
													</template>
												</fast-lazy-load>
												<div v-if="key == 2 && item.pictureList.length > 3" class="length">
													{{ $t('pages.luntan.masterForum.index.total') }}{{
													item.pictureList.length
												}}{{ $t('pages.luntan.masterForum.index.sheets') }}
												</div>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view style="clear: both"></view>
							<view class="tool-ft tom-col van-row">
								<view class="left">
									<view class="van-col " @click.stop="thumbUp(item)">
										<img v-if="item.thumbUp> 0" src="/static/img/zan-fill.png" alt=""
											class="zan-img">
										<img v-else src="/static/img/zan-stroke.png" alt="" class="zan-img">
										<span class="num">{{ item.thumbUpCount | moneyFormat }}</span>
									</view>
									<view class="van-col ">
										<img v-if="item.read > 0" style="width: 30rpx; height: 30rpx"
											src="/static/img/opened eye2.png" alt="" />
										<img v-else style="width: 30rpx; height: 30rpx" src="/static/img/closed eye.png"
											alt="" />
										<span class="num">
											{{ item.clickCount | moneyFormat }}
										</span>
									</view>
									<view class="van-col " @click.stop="commentDetail(item)">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
											viewBox="0 0 15 16" fill="none">
											<path
												d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
												:stroke="item.comment > 0 ? '#404040' : '#A1A1A1'" stroke-width="1.5" />
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
												:fill="item.comment > 0 ? '#404040' : '#A1A1A1'" />
										</svg>

										<span class="num">{{ item.commentCount | moneyFormat }}</span>
									</view>
								</view>
								<view class="ntool van-col">
									<view class="ntool-box">
										<image class="img" :src="`/static/img/menu/${item.lotteryType}.png`"></image>
										<span class="num">{{ lotteryName(item.lotteryType) }}</span>
									</view>
								</view>
							</view>
						</li>
						<!-- <view class="loading" v-if="nowList.length===0&&loading">
							<ltLoading />
						</view>
						<empty v-else-if="nowList.length===0"></empty> -->
						<!-- <u-loadmore style="padding-bottom: 20rpx;" :status="status" /> -->
					</ul>
					<view class="loading" v-if="list.length===0&&loading">
						<ltLoading />
					</view>
					<empty v-else-if="list.length===0"></empty>

					<view class="van-list__placeholder"></view>
				</view>
				<view class="rule-text" v-show="sort == -1">
					<mp-html :content="ruleText" />
				</view>
			</view>
		</scroll-view>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--悬浮菜单栏-->
		<fab></fab>
		<AlertInjectLayer />
		<Login v-if="showLogin" @closePopup="showLogin = false" />
		<BackTop :scrollTop.sync="scrollTop" />
	</view>
</template>

<script>
	import BackTop from '@/components/common/BackTop.vue';
	import Header from '@/components/common/header/index.vue';
	import Fab from "@/components/common/fab/Fab";
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	import mpHtml from '@/components/mp-html/mp-html'
	import Empty from '@/components/common/empty/empty'
	import {
		listLatest,
		ruleContent
	} from '@/utils/forum/index.js'
	import {
		advertList,
		buttonInfo,
		noticeList
	} from '@/utils/common/index.js'
	import {
		notice
	} from '@/utils/common/index'
  import {
    lotteryTime
  } from "@/utils/lottery/index"

	import NavBar from "@/components/common/navBar/navBar";
	import ltLoading from "@/components/common/loading/LuntanLoading.vue";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import Login from "@/components/common/login/Login";
	import {
		mapGetters
	} from 'pinia';
	import {
		detail,
		applyRaise
	} from '@/utils/forum/index.js'
	import {
		concern,
		thumbUp
	} from '@/utils/user/index.js'
	export default {
		name: "index",
		components: {
			Login,
			Header,
			AlertInjectLayer,
			Login,
			Fab,
			cusPreviewImg,
			mpHtml,
			Empty,
			NavBar,
			ltLoading,
			BackTop
		},

		computed: {
			...mapGetters(["themeColor", "downloadShow","uWindowHeight"]),
			logoUrl() {
				let configInfo = this.$store.state.appInfoStore.contantsConfigTypeMap[this.$config.enumMgr
					.CONTANTS_CONFIGS_ID.LOGO_BIG];
				if (!configInfo) {
					console.warn("警告：当前站点为配置LOGO");
					return "/static/logo.png";
				}
				return configInfo.url;
			},
		},

		/**
		 * 新增挂载监听，执行外部切换显示类型 打开默认显示内容跟随变化逻辑
		 */
		mounted() {
			uni.$emit("on_page_mounted", this)
			uni.$on(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LUNTAN_DETAILS_UPDATE_CLICKCOUNT, this.onDetailsUpdateEmit)

		},

		beforeDestroy() {
			console.log("before destory");
			uni.$off(this.$config.enumMgr.UNIAPP_EMIT_KEYS.LUNTAN_DETAILS_UPDATE_CLICKCOUNT, this.onDetailsUpdateEmit)
		},


		data() {
			return {
				loading: false,
				fontColor: "#ffffff",
				titleStyle: {
					color: "#ffffff"
				},
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.masterForum.index.expertForum'),
				scrollTop: 0,
				isTop: 0, //吸附判断
				loadingImg: '/static/img/zw.png',
				old: {
					scrollTop: 0,
					myScroll: 0,
				},
				status: 'loading', //触底加载状态
				isLoadMore: false,
				lotteryType: 0,
				speak: 0,
				sort: 0,
        navList: [],
				navListConfig: [{
						lotteryType: 0,
						name: this.$t('pages.luntan.masterForum.index.all')
					},
					{
						lotteryType: 2,
						name: this.$t('pages.luntan.masterForum.index.australianLottery')
					},
					{
						lotteryType: 1,
						name: this.$t('pages.luntan.masterForum.index.hongKongLottery')
					},
					{
						lotteryType: 3,
						name: this.$t('pages.luntan.masterForum.index.taiwanLottery')
					},
					{
						lotteryType: 4,
						name: this.$t('pages.luntan.masterForum.index.newLottery')
					},	{
            lotteryType: 5,
            name: this.$t('pages.luntan.masterForum.index.happy8')
          }
				],
				sortList: [this.$t('pages.luntan.masterForum.index.comprehensive'), this.$t(
						'pages.luntan.masterForum.index.essence'), this.$t('pages.luntan.masterForum.index.mostLiked'),
					this.$t('pages.luntan.masterForum.index.newest')
				],
				speakList: [this.$t('pages.luntan.masterForum.index.allTopics'), this.$t(
					'pages.luntan.masterForum.index.illustrationGroup')],
				toUserId: 0,
				userId: 0,
				articleId: 0,
				pageNum: 1, //页码
				pageSize: 10, //每页数量
				type: 3,
				list: [],
				ImgList: [],
				//广告
				adInfo: [],
				//公告
				noticeInfo: {},
				//规则
				ruleText: null,
				msg: '',
				showLogin: false,
				concernMap: {},
				winHeight: 0,
				isDetail: false,
				listKey: 1,

				userIdNew: null,

				inDatailInfo: null

			}
		},

		async onLoad(option) {
			uni.$on('concern', (prams)=>{
				this.concernMap[prams.userId] = true
			})

			this.userIdNew = this.$store.state.appInfoStore.userInfo ? this.$store.state.appInfoStore.userInfo.id : null;

			let selectedType = uni.getStorageSync("lotteryType");
			!!selectedType && (this.lotteryType = selectedType);
			uni.setNavigationBarTitle({
				title: this.title
			});
      await this.initLotteryNav();
			this.listLatest()
			this.buttonInfo()
			this.noticeList()
			this.ruleContent()
			uni.$on('emitParams', data => {
				this.msg = data.msg
			})
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.$nextTick(function() {
				this.navY()
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
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			if (this.msg) {
				pop(this.msg, 2000)
				this.msg = ''
			}
			// 返回刷新
			if (this.isDetail) {
				// 重新获取数据
				this.list = [];
				this.listLatest() // 获取列表数据
				// 每一次需要清除，否则会参数会缓存
				this.isDetail = false
			}
		},
		methods: {
			queryDetail: function(item) {
				let prams = {
					articleId: item.id,
					createTime: item.createTime
				}
				detail(prams).then(res => {
					item.clickCount++
				}).catch(err => {
					console.log(err)
				})
			},
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
				printDebugLog(item)
				let prams = {
					relatedId: item.articleId,
					type: item.type,
					createTime: item.createTime
				}
				const _this = this;
				thumbUp(prams).then(res => {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
					if (res.code == 200) {
						item.thumbUp = 1
						item.thumbUpCount++
						_this.queryDetail(item);
						// this.info = Object.assign({}, this.info);
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//返回
			back: function() {
				uni.reLaunch({
					url: "/"
				});
			},
			openAd(item) {
				openUrl(item)
			},
			navY: function() {
				/*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
				const query = uni.createSelectorQuery().in(this).select('.nav-box');
				query.boundingClientRect(data => {
					this.old.myScroll = data.top;
				}).exec();
			},
			detail: function(item) {
				this.isDetail = true; //这地方是进入详情给的一个布尔值，返回是可以在onshow判断刷新列表，只是（ryan加的）不知道谁注释掉，2024-0514，ryan又打开了注释。
				const that = this;
				item.read = 1;
				this.inDatailInfo = item;
				uni.navigateTo({
					url: 'detail?id=' + item.articleId + '&type=' + item.type + "&createTime=" + item
						.createTime,
					success: function(res) {
						res.eventChannel.emit('argParams', {
							lotteryType: that.lotteryType
						})
					}
				})
			},
			commentDetail: function(item) {
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
				const that = this;
				item.read = 1;
				this.inDatailInfo = item;
				uni.navigateTo({
					url: 'detail?id=' + item.articleId + '&type=' + item.type + "&createTime=" + item
						.createTime + "&comment=1",
					success: function(res) {
						res.eventChannel.emit('argParams', {
							lotteryType: that.lotteryType
						})
					}
				})
			},
			lotteryName: function(lotteryId) {
				let lotteryName = ''
				this.navList.forEach((item, index) => {
					if (item.lotteryType == lotteryId) {
						lotteryName = item.name
						return
					}
				})
				return lotteryName
			},
			//加载更多
			lower: function(e) {
				if (this.status === 'nomore') {
					return
				}
				if (!this.isLoadMore && this.sort >= 0) { //此处判断，上锁，防止重复请求
					this.isLoadMore = true
					this.pageNum++
					this.listLatest()
				}
			},
			//滚动条监听
			scroll: function(e) {
				this.old.scrollTop = this.scrollTop = e.detail.scrollTop
				if ((this.old.scrollTop) >= this.old.myScroll) {
					this.isTop = 1
				} else {
					this.isTop = 0
				}
			},
			listLatest() {
				let prams = {
					lotteryType: this.lotteryType,
					type: this.type,
					sort: this.sort,
					speak: this.speak,
					pageNum: this.pageNum,
					pageSize: 60
				}
				if (!this.list.length) {
					this.loading = true
				}
				this.status = 'loading'
				printDebugLog(`lottery test point 2 ${Date.now()}`);
				listLatest(prams).then(res => {
					const {
						result: {
							records
						}
					} = res;
					printDebugLog(`lottery test point 3 ${Date.now()}`);
					this.list.push(...records)
					if (records.length < res.result.total || records.length === 0) {
						this.status = 'nomore'
					}
					this.isLoadMore = false
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			},
			//文章规则
			ruleContent: function() {
				let prams = {}
				ruleContent(prams).then(res => {
					const name = this.$store?.state?.appInfoStore?.contantsConfigs?.find(item => item.type ==
						21)?.url || ''
					this.ruleText = name ? res.result.replace(/图库/g, name) : res.result
				}).catch(err => {
					console.log(err)
				})
			},
			//选择彩票
			async selectLottery(item) {
				//新增里面切换 影响论坛首页按钮选中状态
				if (item.lotteryType) uni.setStorageSync("lotteryType", item.lotteryType);
				this.lotteryType = item.lotteryType
				this.pageNum = 1;
				this.list = [];
				this.status = 'loading'

				// await this.listLatest()
				console.log(`lottery test point 1 ${Date.now()}`);
				this.listLatest()
				// 对比版本 次方法似乎已经被移除
				// this.init();
			},
			async selectSpeak(index) {
				this.speak = index
				this.pageNum = 1;
				this.list = [];
				this.status = 'loading'
				await this.listLatest()
				// this.init();
			},
			async selectSort(index) {
				this.sort = index
				this.pageNum = 1;
				this.list = [];
				this.status = 'loading'
				await this.listLatest()
				// this.init();
			},
			serach: function() {
				uni.navigateTo({
					url: '/pages/luntan/masterForum/serach?lotteryType=' + this.lotteryType
				})
			},
			//用户主页
			homepage: function(item) {
				if (!isLogin()) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return
				}
				uni.navigateTo({
					url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
				})
			},
			fabu: function() {
				let lastTime = uni.getStorageSync('addForum');
				if (!isLogin()) {
					if (this.$config.station === 'LUNTAN') {
						this.showLogin = true
						return
					}
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				let nowTime = new Date().getTime();
				if ((nowTime - lastTime) / 1000 < 60) {
					pop(this.$t('pages.luntan.masterForum.index.restrictConsecutivePosts'), 2000)
					return false
				}
				uni.navigateTo({
					url: '/pages/luntan/masterForum/add'
				})
			},
			//关注接口
			concern: function(item) {
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
				let prams = {
					userId: item.userId
				}
				let that = this;
				concern(prams).then(res => {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
					if (res.code == 200) {
						item.concern = res.result;
						that.concernMap[item.userId] = item.concern;
						that.concernMap = Object.assign({}, that.concernMap);
						uni.$emit('updateConcern', item)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//图片弹窗
			previewImg: function(imgList, url) { // 点击预览图片
				this.ImgList = imgList
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			//广告
			buttonInfo: function() {
				/*let prams = {typeCode:2}
				buttonInfo(prams).then(res=>{
				  this.adInfo = res.result
				}).catch(err=>{
				  console.log(err)
				})*/
				let that = this;
				let prams = {
					projectType: 1,
					code: 6,
				}
				advertList(prams).then(res => {
					that.adInfo =res&&res.result&&Array.isArray(res.result)?res.result:[];
				}).catch(err => {

				})
			},
			//公告
			noticeList: function() {
				let prams = {
					position: 2
				}
				notice(prams).then(res => {
					this.noticeInfo = res.result[0]
				}).catch(err => {
					console.log(err)
				})
			},
			//点击详情 刷新clickCount数据
			onDetailsUpdateEmit(data) {
				console.log("detail", this.inDatailInfo, data);
				let updateKeys = ["commentCount", "clickCount", "thumbUpCount"];
				let that = this;
				if (data.articleId) {
					if (this.inDatailInfo.articleId == data.articleId) {
						updateKeys.forEach(attr => {
							that.inDatailInfo[attr] !== undefined && (that.inDatailInfo[attr] = data[attr] !==
								undefined ? data[attr] : that.inDatailInfo[attr]);
						})
					}
				}
				this.$forceUpdate();

			},

      async initLotteryNav(){
        let _this=this;

        return new Promise((resolove)=>{

          lotteryTime().then(res=>{
            this.$requestCache.bindLastCacheUpdateApiCallBack(res,this.bindLotteryTimesResponse,this);
            this.bindLotteryTimesResponse(res);
            resolove();
          })
        })
      },

      bindLotteryTimesResponse(res){
        let configMap={};
        for(let i in this.navListConfig){
          let item = this.navListConfig[i];
          if(item) configMap[item.lotteryType]= item
        }
        var allMenu = configMap[0];
        this.navList=[];
        this.navList.push(allMenu)
        let serverConfig = res.result;
        serverConfig.forEach((menuConfig)=>{
          let menuConfigTypeId=menuConfig.lotteryType;
          let addItem = configMap[menuConfigTypeId];
          if(addItem) this.navList.push(addItem);
        })
      }
		}
	}
</script>
<style>
	/* 	/deep/ .u-drawer {
		z-index: 999999 !important;
	} */
</style>
<style lang="scss" scoped>
	/deep/ .login-box {
		z-index: 9999 !important;
	}

	/deep/ .empty-box {
		height: calc(var(--vh) - 600rpx);
	}

	/deep/ .float-bnt {
		bottom: 352rpx !important;
	}

	$borderRedius: 24rpx;

	.loading {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 113rpx;

		.loading_img {
			width: 68rpx;
			height: 68rpx;
		}

		.loading_text {
			margin-top: 20rpx;
			color: #A1A1A1;
			text-align: center;
			font-size: 30rpx;
		}
	}

	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);

		.scroll-Y {
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
		}
	}

	.header-box,
	.header,
	.box-bg {
		height: 55px;
	}

	.forum-body-hd {
		color: #fff;
		height: 176rpx;
		padding: 0 28rpx;
		background: #fff;
		border-radius: $borderRedius;
	}

	.forum-body-item {
		padding: 20rpx 0;
		font-size: 28rpx;
		display: flex;
		align-items: center;

		svg {
			flex-shrink: 0;
		}

		.text {
			margin-left: 20rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #404040;
			height: 30rpx;
			line-height: 30rpx;
		}
	}

	.forum-body-item .label {
		color: var(--theme-color);
		margin-right: 20rpx;
	}

	.border {
		border-bottom: 1px solid #e8e8e8;
	}

	.tab-div-top {
		background: #fff;
		position: fixed;
		z-index: 2;
		border-radius: 13px;
		padding: 20rpx 0;
		width: 100%;
		max-width: var(--maxWidth);
	}

	.tab-div-bg {
		border-radius: 0;
	}

	.tab-div {

		//border-radius: 24rpx;
		.tab-div-content {
			border-radius: 24rpx;
			background-color: #FFFFFF;
			width: 100%;
			height: 100%;
			padding: 20rpx 0;
		}
	}

	.nav-box {
		background: #fff;
		border-radius: 24rpx;
		margin-top: 20rpx;
		padding: 20rpx 0;
		height: 220rpx;
	}



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
	}

	.nav .nav-item {
		width: 138rpx;
		height: 56rpx;
		text-align: center;
		font-size: 28rpx;
		color: #404040;
		display: grid;
		place-content: center;
	}

	.nav .nav-item:last-child {
		border: 0px;
	}

	.nav .nav-item.active {
		background-color: #fff;
		color: var(--theme-color);
		border-radius: 12rpx;
	}

	.title-tab-box {
		height: 88rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		text-align: center;
		margin-bottom: 21rpx;
		border-bottom: 1px solid var(--theme-auxiliary-color-default);
	}

	.title-tab-box .title-tab-item {
		width: 50%;
		font-size: 30rpx;
		color: #999;
		font-weight: 700;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.title-tab-box .title-tab-item.active {
		color: var(--theme-color);

		&::after {
			content: '';
			display: block;
			width: 25rpx;
			height: 6rpx;
			border-radius: 6rpx 6rpx 0 0;
			background: var(--theme-color);
			position: absolute;
			bottom: 0;
		}
	}

	.sort-box {
		padding: 0 20rpx;
		margin: 0 28rpx;
		font-size: 28rpx;
	}

	.sort-box span {
		display: inline-block;
		margin-right: 40rpx;
		color: #404040;
	}

	.sort-box span.act {
		color: var(--theme-color);
	}

	.forum-body-bd {
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.forum-list li {
		padding: 20rpx 28rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		position: relative;
		border-radius: 24rpx;
	}

	#box {
		content-visibility: auto;
		contain-intrinsic-size: 350rpx;
	}

	.forum-list li .user-info-box {
		position: relative;
		height: 96rpx;
		padding: 11rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
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
		width: 68rpx;
		height: 68rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.van-image--round {
		overflow: hidden;
		border-radius: 50%;
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

	.user-img .user-info .name.red {
		color: red !important;
	}

	.user-img .user-info .name {
		font-style: normal;
		font-weight: 700;
		font-size: 24rpx;
		color: #404040;
	}

	.user-img .user-info .name image {
		width: 28rpx;
		height: 28rpx;
		vertical-align: text-top;
	}

	.user-img .user-info .name .reportInfo {
		margin-right: 10rpx;
		font-size: 30rpx;
		color: #ec0808;
	}

	.user-img .user-info .time {
		font-size: 24rpx;
		color: #404040;
	}

	.forum-body-bd .forumflow {
		position: absolute;
		top: 46rpx;
		right: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 80rpx;
		height: 44rpx;
		background: var(--theme-auxiliary-color-remind);
		border-radius: 12rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.forum-list li .title {
		font-size: 28rpx;
		padding: 20rpx 0;
		display: flex;
		align-items: center;
	}

	.forum-list li .slabel {
		justify-content: center;
		text-align: center;
		padding: 0 6rpx;
		width: fit-content;
		min-width: 62rpx;
		// height: 40rpx;
		background: var(--theme-color);
		border-radius: 8rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #fff;
		margin-right: 20rpx;
		flex-shrink: 0;
		max-width: 200rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		align-items: center;
	}

	.van-col {
		float: left;
		box-sizing: border-box;
		min-height: 2rpx;
	}

	.van-col--19 {
		width: 79%;
	}

	.van-col--21 {
		width: 87.5%;
	}

	.van19 {
		display: flex !important;
		align-items: center;
		width: 100%;
		// justify-content: space-between;

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

		image {
			flex-shrink: 0;
		}
	}

	.van-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.van19 image {
		height: 40rpx !important;
		margin: 0 8rpx;
	}

	.formtitle {
		font-size: 34rpx;
		font-weight: 600;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #404040;
	}

	.reads {
		margin-left: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 8rpx;
		width: 68rpx;
		height: 40rpx;
		color: var(--theme-color);
		background-color: #EBF1EE;
		border-radius: 8rpx;

		font-weight: 500;
		font-size: 28rpx;
		// color: #fff;
	}

	.forum-list li .text {
		margin-bottom: 20rpx;
		color: #404040;
		font-size: 28rpx;
	}

	.forum-list li .img-box {
		// padding: 0 20rpx;
	}

	.van-col--8 {
		width: 33.33333333%;
	}

	.new-row {

		display: flex;
	}
  .new-row[data-size='3']{
    justify-content: space-between;
  }

	.new-van-col--8 {
		width: 32%;
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

	.forum-list li .tool-ft {
		border-top: 2rpx solid #eee;
		text-align: center;
		padding-top: 20rpx;
		display: flex;

		.left {
			flex: 1;
			display: flex;
			align-items: center;

			.van-col {
				display: flex;
				align-items: center;
				margin-right: 20rpx;

				.num {
					margin-left: 10rpx;
					color: #404040;
					font-size: 28rpx;
				}
			}
		}
	}

	.forum-body-bd .tom-col .van-col {
		height: 48rpx;
		padding: 8rpx;
	}

	.forum-list li .tool-ft .num {
		font-weight: 500;
		font-size: 28rpx;
		margin-left: 6rpx;
	}

	.van-col--6 {
		width: 25%;
	}

	.forum-body-bd .ntool {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.forum-body-bd .ntool .ntool-box {
		background: var(--theme-auxiliary-color-default);
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		border-radius: 8rpx;

		.num {
			margin-left: 20rpx;
			color: #404040;
			font-size: 28rpx;
		}
	}

	.forum-body-bd .ntool .img {
		width: 44rpx !important;
		height: 44rpx !important;
	}

	.rule-text {
		background: #fff;
		padding: 20rpx 28rpx;
		word-break: break-all;
	}

	.lazy-image {
		// max-width: 80rpx;
		// max-height: 80rpx;
		width: 100%;
		height: 100%;
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
		border-radius: $borderRedius;
	}

	.zan-img {
		width: 30rpx;
		height: 30rpx;
	}
</style>
