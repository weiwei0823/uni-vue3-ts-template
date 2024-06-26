<template>
	<view class="mint-tab-container-item home-div pc-max-width"
		:style="{ position: `fixed`, height: `${winHeight}px`, marginTop: safeHeight, width: '100%' }"
		:class="['theme-' + themeColor.name]">
		<LuntanIndexHeader :title="title" />
		<scroll-view :style="{  backgroundColor: '#fff' ,height: `calc(var(--vh) - 60rpx)`}" :enhanced="true"
			:bounces="false" :show-scrollbar="false" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
			show-scrollbar="true" :scroll-with-animation="true" lower-threshold="100" @scrolltolower="lower"
			@scroll="scroll">
			<view class="" :style="{backgroundColor:themeColor.themeAuxiliaryColorDefault,paddingBottom:'20rpx'}">
				<view class="header-box">
					<!--轮播图-->
					<uni-swiper-dot class="swiper-box" :info="listPicture" :current="current" field="content"
						mode="default">
            <swiper :circular="true" :autoplay="true" :interval="swiperTimer"
                    @change="changeSwiper" style="height: 274rpx">
							<swiper-item v-for="(item, index) in listPicture" :key="index">
								<view class="swiper-item" :id="'content-wrap' + index">
                  <image mode="aspectFill" v-if="swiperImgLoadList.includes(index)"
                         :src="item.img" @click="openAd(item)"></image>
								</view>
							</swiper-item>
						</swiper>
						<view class="online" v-if="onlineShow">
							{{ $t('components.CommonPages.pages-luntan.LuntanIndex_02.online') }}
							{{ $store.state.playingStore.onlineNum }}
						</view>
					</uni-swiper-dot>
					<view class="noticeBlock">
						<view class="notice_list">
							<!-- <filterIcon src="/static/imgs-liuhe/index_02/blue/speaker.png" :width="48" :height="48" /> -->
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none">
								<g clip-path="url(#clip0_104_44478)">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M5.26661 6.23786C8.90459 5.94174 16.5613 4.76574 18.0842 2.43067C19.9878 -0.488177 23.2873 0.780885 23.7315 5.03225C24.0897 8.46072 24.0893 12.3114 23.7315 15.7362C23.2873 19.9875 19.9878 21.2566 18.0842 18.3378C16.5613 16.0027 8.90459 14.8267 5.26661 14.5306V6.23786ZM8.56616 22.716C8.30015 22.3909 7.81386 21.6941 7.27402 20.9205C6.65492 20.0333 5.9654 19.0452 5.45696 18.4012C4.88588 17.6431 4.50516 16.7514 5.45696 16.7514C6.40875 16.7514 7.93163 17.3225 9.51796 18.8454C11.1043 20.3683 12.3099 22.716 11.8023 23.0967C11.2946 23.4775 9.13724 23.414 8.56616 22.716ZM3.68028 6.28167C1.64772 6.28167 0 7.92939 0 9.96195V10.5965C0 12.629 1.64772 14.2768 3.68028 14.2768V6.28167Z"
										:fill="themeColor.themeColor" />
								</g>
								<defs>
									<clipPath id="clip0_104_44478">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<view class="noticeScroll">
								<NoticeScroll :list="noticeList" key="luntanNotice"></NoticeScroll>
							</view>

						</view>
					</view>
				</view>
				<!--滚动条消息-->
				<!--开奖号位置-->
				<view class="block-lottery">
					<ul class="platform-list">
						<template v-for="(item, index) in sortLotteryTypeTabs">
							<view class="item-body" :class="{
							'act': lotterytype == item.lotteryType,
							'last-item': index === sortLotteryTypeTabs.length - 1 && lotterytype == item.lotteryType,
							'first-item': index === 0 && lotterytype == item.lotteryType
						}" :data-inline="sortLotteryTypeTabs.length<=2?true:false" @click="cutover(item, index)">
								<view class="title">{{ item.lotteryName }}</view>
								<view class="time"><span>{{ item.lotteryTimeMilli | getTime }}</span></view>
							</view>
						</template>
					</ul>
					<view class="border-box">
						<view class="border-box-body" :class="'border-box-body-' + themeColor.name" v-if="lastLottery">
							<lottery :lotteryDetail="lastLottery" :listStyle="{}" :listenNumberListAction="true" live
								:lotteryType="lotteryType" v-on:httpAync="homeAsync" isHttpAsync>
								<template v-slot:header></template>
								<template v-slot:lottery></template>
								<template v-slot:footer></template>
							</lottery>
						</view>
					</view>
				</view>
				<!--导航-->
				<template
					v-if="!$config.configUIMgr.checkPageElementIsHide($config.enumMgr.PAGE_VERSION_ELEMENT_HIDE_KEY.EL_LUNTAN_INDEX_02_CATEGORY_01)">
					<view class="category-tr">
						<view class="category-icon van-row">
							<view class="item-line" v-for="(menu, i) in menulist" :key="i">
								<view v-for="(item, index) in menu" :key="index" class="item" @click="tiaozhuan(item)">
									<image :src="item.icon" style="width: 68rpx; height: 68rpx;"></image>
									<view class="text">{{ item.text }}</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<!--导航栏-->
				<view :style="navHeight > 0 ? 'height:' + navHeight + 'px' : ''" class="nav-class">
					<view id="nav" :class="isTop == 1 ? 'tab-div-top tab-div' : 'tab-div'"
						:style="isTop == 1 ? 'marginTop:' + safeHeight : ''">
						<view class="tab-box">
							<view class="nav">
								<view v-for="(item, index) in navList" :key="index"
									:class="lotteryType == item.lotteryType ? 'nav-item active' : 'nav-item'"
									@click="selectLottery(item)">
									{{ item.name }}
								</view>
							</view>
						</view>
						<view class="sort-box">
							<view v-for="(item, index) in sortList" :key="index" :class="sort == index ? 'act1' : ''"
								@click="selectSort(index)">
								{{ item }}
							</view>
						</view>
					</view>
				</view>
				<!--列表-->
				<view class="forum-body-bd">
					<view style="height: 600rpx;display: grid;place-content: center;background-color:#fff;"
						v-if="luntanLoading&&!isLoadMore">
						<LuntanLoading />
					</view>
					<view role="feed" class="van-list" name="lt_01" style="" v-else :key="keyList">
						<ul class="forum-list" v-if="list.length > 0">
							<li v-for="(item, index) in list" :key="index" class="forum-list-item">
								<view class="user-info-box">
									<view class="user-img" @click="homepage(item)">
										<view class="left-image">
											<view class="van-image van-image--round">
												<img :src="item.headPic" class="van-image__img">
											</view>
										</view>
										<view class="user-info">
											<view :class="item.vip == 1 ? 'name red' : 'name'">
												{{ item.username }}
												<image v-for="(val, key) in item.medalList" :key="key" :src="val"
													lazy-load="true"></image>
												<span class="reportInfo"></span>
											</view>
											<div class="time">{{ item.createTimeStr }}</div>
										</view>
									</view>
								</view>
								<!-- 临时注释 -->
								<view class="forumflow" @click="concern(item)">
									<span v-if="item.concern == 0">{{ $t('components.luntan.index.follow') }}</span>
									<span v-else>{{ $t('components.luntan.index.followed') }}</span>
								</view>
								<view class="title van-row" @click="detail(item)">
									<view class="slabel van-col">{{ item.period }}</view>
									<view class="van-col van-col--19">
										<view class="van-ellipsis  van19">
											<span class="up" v-if="item.top == 1">
												<!-- <view class="upblock">
												置顶
											</view> -->
												<image src="@//static/img/forum/top_n.png" style="width: 68rpx;">
												</image>
												<!-- <image src="@//static/img/forum/zd.png" style="width: 25px;"></image> -->
											</span>
											<span v-if="item.highQuality == 1">
												<image src="@//static/img/forum/jin_n.png" style="width: 40rpx;"
													class="icon">
												</image>
												<!-- <image src="@//static/img/forum/jin.png" style="width: 25px;" class="icon">
											</image> -->
											</span>
											<view class="formtitle"
												:style="item.read == 1 ? 'color: rgb(153, 153, 153);' : ''">
												{{ item.title }}
											</view>
											<view class="reads" v-show="item.read == 1">
												{{ $t('components.luntan.index.read') }}
											</view>
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
										<view class="van-row img-box-3">
											<view class="van-col van-col--8"
												v-for="(val, key) in item.pictureList.slice(0, 3)"
												@click="previewImg(item.pictureList, val)">
												<view class="image-body">
													<fast-lazy-load :radius="'8rpx'" :src="val" :width="'100%'"
														:height="'180rpx'" mode="aspectFill">
														<template v-slot:loading>
															<image class="lazy-image" :src="loadingImg"></image>
														</template>
														<template v-slot:error>
															<image class="lazy-image" :src="loadingImg"></image>
														</template>
													</fast-lazy-load>
													<view v-if="key == 2 && item.pictureList.length > 3" class="length">
														{{ $t('components.luntan.index.total') }}{{
														item.pictureList.length }}{{ $t('components.luntan.index.cards') }}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>

								<view style="clear: both"></view>
								<view class="tool-ft tom-col van-row">
									<view class="van-col ">
										<img v-if="item.thumbUpCount > 0" src="/static/img/zan-fill.png" alt=""
											class="zan-img">
										<img v-else src="/static/img/zan-stroke.png" alt="" class="zan-img">
										<span class="num">{{ item.thumbUpCount | moneyFormat }}点赞</span>
									</view>
									<view class="van-col ">
										<img v-if="item.clickCount > 0" style="width: 30rpx; height: 30rpx"
											src="/static/img/opened eye2.png" alt="" />
										<img v-else style="width: 30rpx; height: 30rpx" src="/static/img/closed eye.png"
											alt="" />
										<span class="num">
											{{ item.clickCount | moneyFormat }}
										</span>
									</view>
									<view class="van-col ">
										<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
											viewBox="0 0 15 16" fill="none">
											<path
												d="M10.5 11.375H10.1893L9.96967 11.5947L7.5 14.0643L5.03033 11.5947L4.81066 11.375H4.5H3C1.75736 11.375 0.75 10.3676 0.75 9.125V3.875C0.75 2.63236 1.75736 1.625 3 1.625H12C13.2426 1.625 14.25 2.63236 14.25 3.875V9.125C14.25 10.3676 13.2426 11.375 12 11.375H10.5Z"
												:stroke="item.commentCount > 0 ? '#404040' : '#A1A1A1'"
												stroke-width="1.5" />
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M4.875 6.5C4.875 7.12132 4.37132 7.625 3.75 7.625C3.12868 7.625 2.625 7.12132 2.625 6.5C2.625 5.87868 3.12868 5.375 3.75 5.375C4.37132 5.375 4.875 5.87868 4.875 6.5ZM8.625 6.5C8.625 7.12132 8.12132 7.625 7.5 7.625C6.87868 7.625 6.375 7.12132 6.375 6.5C6.375 5.87868 6.87868 5.375 7.5 5.375C8.12132 5.375 8.625 5.87868 8.625 6.5ZM11.25 7.625C11.8713 7.625 12.375 7.12132 12.375 6.5C12.375 5.87868 11.8713 5.375 11.25 5.375C10.6287 5.375 10.125 5.87868 10.125 6.5C10.125 7.12132 10.6287 7.625 11.25 7.625Z"
												:fill="item.commentCount > 0 ? '#404040' : '#A1A1A1'" />
										</svg>
										<span class="num">{{ item.commentCount | moneyFormat }}评论</span>
									</view>
									<view class="ntool van-col van-col--6">
										<view>
											<!-- <filterIcon :src="'../../static/img/menu/' + item.lotteryType + '.png'"
											:width="28" :height="28" /> -->
											<img :src="'../../static/img/menu/' + item.lotteryType + '.png'" alt="">
											<span class="num"
												style="color: #404040;">{{ lotteryName(item.lotteryType) }}</span>
										</view>
									</view>
								</view>
							</li>
							<view v-if="noMore"
								style="width:100%;text-align: center;padding:60rpx 0;display: flex;align-items: center;margin-top:-20rpx;background-color: #fff;padding-bottom: 120rpx;justify-content: center;">
								<view class="" style="height:2rpx;width:60rpx;background-color: #A1A1A1;" />
								<view class="" style="font-size: 28rpx;color:#A1A1A1;margin:0 20rpx;">
									没有更多了
								</view>
								<view class="" style="height:2rpx;width:60rpx;background-color: #A1A1A1;" />
							</view>
						</ul>

						<empty style=" height: 800rpx;" v-else>
						</empty>

						<view class="van-list__placeholder"></view>
					</view>
				</view>
			</view>
			<!--			<view v-if="isLoadMore" class="loading">{{ $t('components.CommonPages.pages-luntan.LuntanIndex_02.loading')-->
			<!--			}}...-->
			<!--			</view>-->

			<view style="clear: both"></view>
		</scroll-view>
		<svg v-if="scrollTop > 100" class="back-top-icon" @click="scrollTop = 0" xmlns="http://www.w3.org/2000/svg"
			width="44" height="44" viewBox="0 0 44 44" fill="none">
			<circle cx="22" cy="22" r="22" fill="#A1A1A1" fill-opacity="0.8" />
			<path
				d="M22.8671 31.0902V19.0748L29.6036 25.8338C29.9809 26.2111 30.5968 26.2111 30.9709 25.8338C31.3482 25.4565 31.3482 24.8406 30.9709 24.4665L22.7316 16.2015C22.5317 16.0016 22.264 15.908 22.0028 15.9209C21.7384 15.908 21.474 16.0016 21.274 16.2015L13.2766 24.4246C12.8993 24.8019 12.8993 25.4179 13.2766 25.7919C13.6539 26.1692 14.2699 26.1692 14.6439 25.7919L20.9322 19.2779V31.0902C20.9322 31.6223 21.3676 32.0576 21.8996 32.0576C22.4317 32.0576 22.8671 31.6223 22.8671 31.0902ZM30.9322 14.0345H13.067C12.5317 14.0345 12.0996 13.6023 12.0996 13.067C12.0996 12.5317 12.5317 12.0996 13.067 12.0996H30.9322C31.4675 12.0996 31.8996 12.5317 31.8996 13.067C31.8996 13.6023 31.4643 14.0345 30.9322 14.0345Z"
				fill="white" />
		</svg>
		<!--底部彩种-->
		<view class="ft-icon-text" v-if="webSiteConfig.website_home_platform_switch === 1">
      <LotteryTypeTab :showTypeImage="lotteryTime.length<=4"  :lotteryTime="lotteryTime" :lotteryType="lotterytype"  @onTabClick="cutover"/>
    </view>
		<!-- 分享 -->
		<uni-popup class="share" ref="share" type="share" safeArea backgroundColor="#fff">
			<share @closefx="closefx"></share>
		</uni-popup>
		<!--底部-->
		<!-- background-color:#fff; -->
		<view style="height: 52px;">
			<component :is="componentTabbar" current="0" />
		</view>
		<!--悬浮菜单栏-->
		<fab></fab>
		<!--图片弹窗-->
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<HomePop :popImageList="popImageList" v-if="homePopVisible" />
		<AlertInjectLayer />
	</view>
</template>
<script>
import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
import TabBarLuntan from '@/components/Tabbar/Luntan'
import TabBarAll from "@/components/common/tabbar/TabBar";
import NavBar from "@/components/common/navBar/navBar.vue";
import Fab from "@//components/common/fab/Fab";
import Share from "@//components/common/share/Share";
import Lottery from '@//components/common/lottery/Lottery'
import Empty from '@//components/common/empty/empty'
import Login from "@//components/common/login/Login";
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
import Placard from "@//components/common/placard/placard";
import LuntanIndexHeader from "./LuntanIndexHeader.vue";
import NoticeScroll from "@/components/common/noticeScroll/index.vue"
import LotteryTypeTab from "@/components/common/luntan/LotteryTypeTab.vue";
import HomePop from "@/pages/liuhe/common/HomePop";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"

import {list, lt_init} from '@//utils/home/index.js';
import {lastLotteryRecord} from "@//utils/lottery/index.js"
import {listLatest} from '@//utils/forum/index.js'
import {concern} from '@//utils/user/index.js'
import {config} from '@/config/config.js'
import {mapGetters} from 'pinia';
import {lastLotteryRecordWithCalculate} from "@/utils/lottery/index.js"

export default {
		name: "LuntanIndex01",
		components: {
			topicon,
			AlertInjectLayer,
			TabBarLuntan,
			TabBarAll,
			Fab,
			Share,
			Lottery,
			Empty,
			Login,
			cusPreviewImg,
			NavBar,
			Placard,
			HomePop,
			LuntanIndexHeader,
			NoticeScroll,
      LotteryTypeTab
		},
		data() {
			return {
				popImageList: [],
				componentTabbar: 'TabBarAll',
				componentTabbarMap: {
					'ALL': 'TabBarAll',
					'LUNTAN': 'TabBarLuntan'
				},
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				current: 0,
				scrollTop: 0,
				loadingImg: '/static/img/zw.png',
				title: this.$t('components.luntan.index.sixGallery'),
				swiperHeight: 180,
				old: {
					scrollTop: 0,
					myScroll: 0,
				},
				luntanLoading: false,
				noMore: false,
				navHeight: 0,
				curr: 0,
				isTop: 0, //吸附判断
				status: 'more', //触底加载状态
				page: 1, //记录当前页码
				lotterytype: 2, //彩票
				lotteryType: 0, //
				isLoadMore: false, //是否加载中
				//公告
				noticeList: [],
				keyList: 1,
				//轮播图
				listPicture: [],
				//彩票类型
				lotteryTime: [],
				//菜单栏
				menulist: [
					[{
							icon: '/static/img/index/kaijiangxianchang.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.liveDraw'),
							// #ifdef APP-PLUS
							url: '/pages/luntan/applive/Live', //打包app解开此行注释
							// #endif
							// #ifdef H5
							url: '/pages/luntan/live/Live', //打包h5解开此行注释
							// #endif
							type: 1,
						},
						{
							icon: '/static/img/index/jiaoliudating.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.masterForum'),
							url: '/pages/luntan/masterForum/index',
							type: 1,
						},
						{
							icon: '/static/img/index/ziliaodaquan.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.dataCollection'),
							url: '/pages/luntan/dataCollection/Index/Index',
							type: 1,
						},
						{
							icon: '/static/img/index/chaxunzhushou.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.queryAssistant'),
							url: '/pages/luntan/queryHelper/index',
							type: 1,
						},
					],
					[{
							icon: '/static/img/index/ymjc.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.humorousGuess'),
							url: '/pages/luntan/humorousGuessing/index',
							type: 1,
						},
						{
							icon: '/static/img/index/liuhetuku.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.sixGallery'),
							url: '/pages/luntan/liuhePicture/index?show=1',
							type: 1,
						},
						{
							icon: '/static/img/index/zixuntongji.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.infoStats'),
							url: '/pages/common/informationCount/liuhe',
							type: 1,
						},
						{
							icon: '/static/img/index/gongjubaoxiang.svg',
							text: this.$t('components.CommonPages.pages-luntan.LuntanIndex_02.toolbox'),
							url: '/pages/luntan/toolBox/index',
							type: 1,
						},
					]
				],
				dotsStyles: {
					bottom: 10,
					backgroundColor: 'rgb(235,237,240,0.7)',
					selectedBackgroundColor: 'white',
					selectedBorder: 'white'
				},
				sortList: [this.$t('components.luntan.index.comprehensive'), this.$t('components.luntan.index.essence'),
					this.$t('components.luntan.index.mostLikes'), this.$t('components.luntan.index.newest')
				],
				navList: [{
						lotteryType: 0,
						name: this.$t('components.luntan.index.all')
					},
					{
						lotteryType: 2,
						name: this.$t('components.luntan.index.australiaLottery')
					},
					{
						lotteryType: 1,
						name: this.$t('components.luntan.index.hongKongLottery')
					},
					{
						lotteryType: 3,
						name: this.$t('components.luntan.index.taiwanLottery')
					},
					{
						lotteryType: 4,
						name: this.$t('components.luntan.index.newLottery')
					}
				],
				sort: 0,
				//列表
				leftArr: [],
				rightArr: [],
				list: [],
				ImgList: [],
				//开奖信息
				lastLottery: {}, //最后一次开奖信息
				winHeight: 0,
				homePopVisible: false,
        // 轮播图加载完成的列表，默认加载第一张图
        swiperImgLoadList: [0],
        // swiper循环定时器
        swiperTimer: 5000
			}
		},
		computed: {
			...mapGetters(["webSiteConfig", "themeColor", "downloadShow"]),
			onlineShow() {
				return this.webSiteConfig.website_online_switch === 1
			},
      sortLotteryTypeTabs(){
        let buildAr = [];
        for(let key in this.lotteryTime){
          let lotteryInfo = this.lotteryTime[key];
          let copyLotteryInfo = Object.assign({},lotteryInfo);
          copyLotteryInfo.sortIndex = this.$config.lotterTimesTabsSort&&Array.isArray(this.$config.lotterTimesTabsSort)?this.$config.lotterTimesTabsSort.indexOf(Number(copyLotteryInfo.lotteryType)):0;
          buildAr.push(copyLotteryInfo);
        }
        return buildAr;
      }

		},
		methods: {
			homeAsync() {
				let prams = {
					lotteryType: this.lotterytype
				}
				lastLotteryRecordWithCalculate(prams).then((res) => {
					if (!res?.result) return;
					let data = res.result;
					this.lastLottery = data;
					this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery))
				})
			},
			_onLoad() {
				this.componentTabbar = this.componentTabbarMap[config.station || 'ALL']
				let _this = this;
        this.luntanLoading = true;
        this.noMore = false;
        // init方法在这里删除，APP.vue里预加载了接口请求，这里只做数据回调处理
        uni.$on("preloadLuntanHomeData", res => {
          this.$requestCache.bindLastCacheUpdateApiCallBack(res, (netResp) => {
            this.doUpdateUiAfterInited(false, res);
          }, this);
          this.doUpdateUiAfterInited(false, res);
        });
        // getListLatest方法在这里删除，APP.vue里预加载了接口请求，这里只做数据回调处理
        uni.$on("preloadLuntanArticleList", res => {
					if (!res?.result) return;
          if (res.result.records.length) {
            this.list.push(...res.result.records);
          } else {
            this.noMore = true;
          }
          this.isLoadMore = false;
          this.luntanLoading = false;
        });
				this.init();
				this.getListLatest();
				this.getSystem();
				this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE, this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE);
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					this
					.lotterytype);

				this.yearY();
				this.$nextTick(() => {
					this.setSwiperHeight();
				});
        this.loadCurrentAndGetNextSwiperImage(this.current);
        uni.$emit('showPop', {
					refName: 'SaveH5',
					callback: ({
						type
					}) => {
						if (type === "close") {
							this.homePopVisible = true;
						}
					}
				})
				uni.$off("on-homepage-freshbyconfig");
				uni.$on("on-homepage-freshbyconfig", () => {
					_this.freshUIByConfigData();
				});
				uni.$on('updateConcern', (data) => {
					const userList = this.list.filter((n) => data.userId === n.userId);
					userList.forEach(n => {
						n.concern = data.concern
					})
				})
				this.freshUIByConfigData();
			},
			_onShow() {
				this.winHeight = uni.getSystemInfoSync().windowHeight + 30;
				uni.hideTabBar()
				this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE) ? this.$config.getStorageSync(this.$config.enumMgr
					.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE) : 2;
			},
			//从 服务器读取config 信息之后刷新页面
			freshUIByConfigData() {
				let configData = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_CONFIG);
				if (!configData) return console.warn("config data is not loaded");
				configData.forEach((item, index) => {
					if (item.type == 23) {
						this.loadingImg = item.url
					}
					if (item.type == 21) {
						this.title = item.url
						uni.setNavigationBarTitle({
							title: this.title
						});
					}
				})
			},
			//获取设备信息
			getSystem() {
				uni.getSystemInfo().then(res => {
					uni.$system = res[1];
				})
			},
			bindSee(status = 0) {
				if (status == 1) {
					this.setCache('bindSee', 1, 60 * 60 * 1000);
				}
				this.$refs.placard.close()
			},
			/**
			 *
			 * @param {缓存key} key
			 * @param {需要存储的缓存值} value
			 * @param {过期时间，默认0表示永久有效} expire
			 */
			setCache(key, value, expire = 0) {
				let obj = {
					data: value, //存储的数据
					time: Date.now() / 1000, //记录存储的时间戳
					expire: expire //记录过期时间，单位秒
				}
				uni.setStorageSync(key, JSON.stringify(obj))
			},
			/**
			 *
			 * @param {缓存key} key
			 */
			getCache(key) {
				let val = uni.getStorageSync(key)
				if (!val) {
					return null
				}
				val = JSON.parse(val)
				if (val.expire && Date.now() / 1000 - val.time > val.expire) {
					uni.removeStorageSync(key)
					return null
				}
				return val.data
			},
			yearY() {
				this.$nextTick(() => {
					/*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
					uni.createSelectorQuery().select('#nav').boundingClientRect(res => {
						this.old.myScroll = res.top - 50 + this.$config.getStorageSync(this
								.$config
								.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
							.top;
						this.navHeight = res.height - 5
					}).exec();
				});
			},
			openAd(item) {
				openUrl(item)
			},
      init(noRefrsh = false) {
				let prams = {
					lotteryType: this.lotterytype
				}
				if (!noRefrsh) {
					this.luntanLoading = true;
				}
				let _this = this;
				lt_init(prams).then((res) => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netResp)=>{ _this.doUpdateUiAfterInited(noRefrsh,netResp)},this);
					_this.doUpdateUiAfterInited(noRefrsh,res);
				}).catch(err => {
					this.luntanLoading = false;
					console.log(err);
				})
			},
			doUpdateUiAfterInited(noRefrsh,res){
				if (!res?.result) return;
				let data = res.result
				this.popImageList = data.popImageList
        this.noticeList = data.noticeList.map(item => item.noticeContent.replace(/\n/g, ""));
				this.listPicture = data.advertList
				this.lotteryTime = data.lotteryTimeList
        if(this.lotteryTime.length>=1){
          let memLotteryId =  this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,2);
          let inLottery = this.lotteryTime.find((item)=>{
            return item.lotteryType == memLotteryId;
          })
          if(!inLottery){
            this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this.lotteryTime[0].lotteryType);
            this.lotterytype = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE, this.lotteryTime[0].lotteryType);
          }
        }

				this.lastLottery = data.lastLotteryRecord
				if (!noRefrsh) {
					let listLenth = data.listPicture.length
					let leftArr = [];
					let rightArr = [];
					for (let i = 0; i < listLenth; i++) {
						if (i % 2 == 0) {
							leftArr.push(data.listPicture[i])
						} else {
							rightArr.push(data.listPicture[i])
						}
					}
					this.leftArr = leftArr
					this.rightArr = rightArr
					uni.setStorageSync("lastLottery", this.lastLottery);
					this.luntanLoading = false;
				} else {
					this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery));
				}
			},

			GetList() {
				let prams = {
					pageNum: this.page,
					lotteryType: this.lotterytype
				}
				list(prams).then((res) => {
					let data = res.result.records
					let listLenth = data.length
					let leftArr = [];
					let rightArr = [];
					for (let i = 0; i < listLenth; i++) {
						if (i % 2 == 0) {
							leftArr.push(data[i])
						} else {
							rightArr.push(data[i])
						}
					}
					this.leftArr.push(...leftArr)
					this.rightArr.push(...rightArr)
					this.isLoadMore = false
				}).catch(err => {
					console.log(err)
				})
			},
			//信息
			xinxi() {
				uni.navigateTo({
					url: '/pages/liuhe/notice/index',
				})
			},
			//选择彩票
			selectLottery(item) {
				this.lotteryType = item.lotteryType
				this.page = 1;
				this.list = [];
        this.getListLatest()
				this.keyList = this.keyList + 1
			},
			selectSort(index) {
				this.sort = index
				this.page = 1;
				this.list = [];
        this.getListLatest()
			},
			//开奖信息
      lastLotteryRecord() {
				let prams = {
					lotteryType: this.lotterytype
				}
				lastLotteryRecord(prams).then(res => {
					this.lastLottery = res.result
				}).catch(err => {
					console.log(err)
				})
			},
      getListLatest() {
				let prams = {
					lotteryType: this.lotteryType,
					type: 3,
					sort: this.sort,
					speak: 0,
					pageNum: this.page,
					pageSize: 60
				}
				this.luntanLoading = true;
				this.noMore = false;
				listLatest(prams).then(res => {
					if (res.result.records.length > 0) {
						this.list.push(...res.result.records)
					} else {
						this.noMore = true;
					}
					this.isLoadMore = false;
					this.luntanLoading = false;
				}).catch(err => {
					console.log(err)
				});
			},
			detail(item) {
				const that = this
				item.read = 1
				uni.navigateTo({
					url: '/pages/luntan/masterForum/detail?id=' + item.articleId + '&type=' + item
						.type +
						"&createTime=" + item.createTime,
					success: (res) => {
						res.eventChannel.emit('argParams', {
							lotteryType: that.lotteryType
						})
					}
				})
			},
			//用户主页
			homepage(item) {
				uni.navigateTo({
					url: "/pages/common/userCenter/homepage/homepage?userId=" + item.userId
				})
			},
			lotteryName(lotteryId) {
				let lotteryName = ''
				this.lotteryTime.forEach((item, index) => {
					if (item.lotteryType == lotteryId) {
						lotteryName = item.lotteryName
						return
					}
				})
				return lotteryName
			},
			//关注接口
			concern(item) {
				let token = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_TOKEN);
				if (!token) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				let prams = {
					userId: item.userId
				}
				concern(prams).then(res => {
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
					if (res.code == 200) {
						// item.concern = !item.concern
						item.concern = res.result
						const userList = this.list.filter((n) => item.userId === n.userId);
						userList.forEach(n => {
							n.concern = res.result
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//图片弹窗
			previewImg(imgList, url) { // 点击预览图片
				this.ImgList = imgList
				this.$refs.cusPreviewImg.open(url) // 传入当前选中的图片地址
			},
			//年跳转
			picture(item) {
				let url = "/pages/luntan/liuhePicture/index?year=" + item.year + "&color=" + item.color
				uni.navigateTo({
					url: url,
				})
			},
			//图库详情
			pictureDetail(item) {
				let url = "/pages/luntan/liuhePicture/detail?id=" + item.pictureId
				uni.navigateTo({
					url: url,
				})
			},
			//跳转方法
			tiaozhuan(item) {
				var lotterytype = this.lotterytype
				uni.navigateTo({
					url: item.url,
					success: (res) => {
						res.eventChannel.emit('argParams', {
							lotteryType: lotterytype,
						})
					}
				})
			},
			//跳转方法
			tiaozhuan1(item) {
				var lotterytype = this.lotterytype
				uni.navigateTo({
					url: item,
					success: (res)=> {
						res.eventChannel.emit('argParams', {
							lotteryType: lotterytype,
						})
					}
				})
			},
			//分享弹窗
			fenxiang() {
				this.$refs.share.open()
			},
			//关闭分享
			closefx() {
				this.$refs.share.close()
			},
			//切换彩种
			cutover(item, index) {
				this.page = 1;
				this.lotterytype = item.lotteryType
				this.lotteryType = item.lotteryType
				this.curr = index
				// uni.setStorageSync('lotteryType', this.lotterytype);
				this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,
					this
					.lotteryType);
				this.init();
				this.page = 1;
				this.list = [];
        this.getListLatest()
				//this.lastLotteryRecord()
			},
			//加载更多
			lower(e) {
				if (this.luntanLoading || this.noMore) {
					return
				}
				if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
					this.isLoadMore = true
					this.page += 1
					//this.GetList()
          this.getListLatest()
				}
			},
			//滚动条监听
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
				this.old.scrollTop = e.detail.scrollTop
				if ((this.old.scrollTop) >= this.old.myScroll) {
					this.isTop = 1
				} else {
					this.isTop = 0
				}
			},
      //轮播图事件
      changeSwiper(e) {
        this.current = e.detail.current;
        this.loadCurrentAndGetNextSwiperImage(this.current);
        //动态设置swiper的高度，使用nextTick延时设置
        /*this.$nextTick(() => {
          this.setSwiperHeight();
        });*/
      },
      // 懒加载轮播图，获取轮播图当前图片并加载下一张图片
      loadCurrentAndGetNextSwiperImage(index) {
        if (!this.swiperImgLoadList.includes(index)) {
          this.swiperImgLoadList.push(index);
        }
        // 下一张图片
        let tempNext = index + 1;
        if (tempNext === this.listPicture.length) {
          tempNext = 0;
        }
        if (!this.swiperImgLoadList.includes(tempNext)) {
          // 如果未加载, 3秒后加载下一张图片
          setTimeout(() => {
            this.swiperImgLoadList.push(tempNext);
          }, this.swiperTimer - 1000);
        }
      },
			//动态设置swiper的高度
			setSwiperHeight() {
				let element = "#content-wrap" + this.current;
				let query = uni.createSelectorQuery().in(this);
				query.select(element).boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						this.swiperHeight = res[0].height;
					}
				});
			},
    },
	}
</script>

<style scoped>
	.btn {
		flex-shrink: 0;
		width: 116rpx;
		height: 48rpx;
		box-sizing: border-box;
		line-height: 32rpx;
		padding: 8rpx 10rpx;
		border-radius: 10rpx;
		background: var(--theme-color);
		color: #FFF;
		font-size: 24rpx;
		font-weight: 500;
		/*display: grid;*/
		place-items: center;
	}



	/deep/ .empty-box {
		display: flex;
		padding-top: 40rpx;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.home-div {
		overflow: hidden;
	}

	.nav-class {
		background-color: #fff;
		/* margin-bottom: 20rpx; */
		border-radius: 24rpx;
		overflow: hidden;
	}

	.tab-box {
		padding: 10rpx;
		border-radius: 16rpx;
		padding-bottom: 0;
		/* background: var(--theme-auxiliary-color-default); */
	}

	.nav {
		background: var(--theme-auxiliary-color-default);
	}

	.swiper-box {
		position: relative;
	}

	.swiper-box .online {
		position: absolute;
		right: 48rpx;
		top: 10rpx;
		color: #404040;
	}

	.header {
		height: 46px;
	}

	.scroll-Y {
		/* background-color: var(--theme-auxiliary-color-default) !important; */
	}

	.input-view {
		margin: auto;
		color: #323233;
		font-weight: 500;
		font-size: 16px;
	}

	.block-lottery {
		position: relative;
		padding: 20rpx 28rpx;
		background-color: #FFFFFF;
		border-radius: 24rpx;
		margin: 20rpx 0 12rpx 0;
	}

	.block-lottery .platform-list {
		background: #fff;
		display: flex;
		justify-content: space-between;
		border-radius: 24rpx 24rpx 0 0;
		height: 96rpx;
	}

	.block-lottery .platform-list .item-body {
		width: 25%;
	}
  .block-lottery .platform-list .item-body[data-inline='true']{
    display: flex;
    vertical-align: center;
    align-items: center;
    justify-content: center;
    .title,.time{
      margin: 0rpx 10rpx;
    }
  }

	.block-lottery .platform-list .item-body.act {
		background: var(--theme-color);
		color: #fff;
	}

	.notic {
		margin-bottom: 0px;
		height: 60rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
	}

	.block-lottery .platform-list .item-body {
		background: #fff;
		text-align: center;
		position: relative;
		border-radius: 24rpx 24rpx 0 0;
		padding: 12rpx 0;
    flex: 1;
	}

	.block-lottery .platform-list .item-body .title {
		font-size: 30rpx;
		font-weight: 400;
	}

	.block-lottery .platform-list .item-body .time {
		font-size: 24rpx;
		transform: translateZ(0);
	}

	.block-lottery .platform-list .item-body .time span {
		transform: scale(.9);
		white-space: nowrap;
		transform-origin: 180rpx 0;
		left: 0;
	}

	.block-lottery .border-box {
		background: #fff !important;
		padding: 0 !important;
		border-radius: 0 0 24rpx 24rpx;
	}

	.block-lottery .border-box .border-box-body {
		border: 4rpx solid var(--theme-color);
		background-color: #fff;
	}

	.border-box-body-blue {
		background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
	}

	.border-box-body-skyblue {
		background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
	}

	.border-box-body-green {
		background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
	}

	.border-box-body-ChineseRed {
		background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);
	}

	.border-box .border-box-body {
		position: relative;
		background-size: 100% 100%;
		border-radius: 24rpx;
		height: fit-content;
		padding-bottom: 20rpx;
		box-sizing: border-box;
	}

	.category-tr {
		display: inline-block;
		height: auto;
		background: var(--theme-auxiliary-color-default);
		width: 100%;
		margin-bottom: 20rpx;
	}

	.category-icon {
		text-align: center;
		padding: 20rpx 28rpx;
		background: #fff;
		border-radius: 24rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.category-icon .item-line {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		height: 116rpx;
	}

	.category-icon .item-line:first-child {
		margin-top: 0;
	}

	.category-icon .item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

	.category-icon .item .text {
		color: #404040;
		font-size: 28rpx;
	}

	.van-col--6 {
		width: 25%;
	}

	.van-col {
		float: left;
		box-sizing: border-box;
		min-height: 1px;
		height: fit-content;
	}

	.icon-text {
		display: inline-block;
		text-align: center;
		position: relative;
	}

	.category-icon .icon-bg {
		border-radius: 24rpx;
		text-align: center;
		display: inline-block;
	}

	.icon-text .text {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #404040;
	}

	.body-image {
		background: #fff;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_year {
		display: inline-block;
		width: 190rpx;
		text-align: center;
	}

	.van-sticky {
		background: #fff;
		padding-top: 10px;
	}

	.van-sticky .text {
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #555;
	}

	.van-sticky--fixed {
		position: fixed;
		top: 46px;
		z-index: 2;
		max-width: 480px;
	}

	.van-sticky .gray {
		background: #d8d8d8 !important;
	}

	.van-sticky .icon-bg {
		width: 86rpx;
		height: 86rpx;
		background: #20d497;
		border-radius: 100%;
		text-align: center;
		display: inline-block;
		line-height: 112rpx;
		margin-bottom: 10rpx;
	}

	.van-list {
		width: 100%;
		box-sizing: border-box;

	}

	.van-list .image-item {
		width: 100%;
		text-align: center;
		box-shadow: 1px 1px 5px 1px hsl(0deg 25% 70% / 50%);
		position: relative;
		border-top: 1Px solid #bbb;
		height: auto;
		display: inline-block;
		display: flex;
		flex-direction: column;
		line-height: 0.9;
	}

	.van-list .image-item-title {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 28rpx;
		line-height: 0.9;
	}

	.back-top-icon {
		position: fixed;
		width: 96rpx;
		height: 96rpx;
		right: 30rpx;
		bottom: calc(200rpx + var(--safe-area-inset-bottom));
	}

	.ft-icon-text {
		display: flex;
		position: fixed;
		padding: 0rpx 28rpx;
		box-sizing: border-box;
		width: 100%;
		max-width: 480px;
		background: transparent;
		/*height: 108rpx;*/
		/*background: #fff;*/
		border-radius: 12rpx 12rpx 0 0;
		bottom: calc(114rpx + var(--safe-area-inset-bottom));
	}

	.van-notice-bar {
		padding: 0;
		color: #404040 !important;
		font-size: 26rpx !important;
		height: 88rpx !important;
		align-items: center;
	}

	.van-notice-bar {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 60rpx;
		color: #ed6a0c;
		font-size: 26rpx;
		line-height: 48rpx;
		background-color: #fffbe8;
	}

	.van-notice-bar__wrap {
		display: flex;
		align-items: center;
		height: 100%;
		animation: scroll 30s linear infinite;
		/*滚动动画*/
	}

	.van-notice-bar__content {
		font-size: 24rpx;
		white-space: nowrap;
		display: inline-block;
		height: 100%;
		line-height: 60rpx;
		margin-right: 594rpx;
	}

	@keyframes scroll {
		from {
			transform: translateX(300px);
			/*div多宽就写多宽*/
		}

		to {
			transform: translateX(-100%);
		}
	}

	.forum-body-bd {
		padding: 0 0rpx;
	}

	.forum-list {
		/* padding: 20rpx 0; */
		background-color: var(--theme-auxiliary-color-default);
		/* margin-bottom: 40rpx; */
		border: 1px solid #eee;
		position: relative;


	}

	.forum-list-item {
		border-radius: 24rpx;
		margin-top: 20rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;
		position: relative;
	}

	.forum-list-item:last-child {
		margin-bottom: 70rpx;
	}

	.forum-list .user-info-box {
		padding: 20rpx 0;
		/* padding: 0 20rpx 20rpx; */
		position: relative;
	}

	.user-img {
		display: inline-block;
		position: relative;
		padding-left: 48px;
	}

	.user-img .left-image {
		position: absolute;
		left: 0;
		top: 0;
	}

	.user-img .left-image .van-image {
		width: 72rpx;
		height: 72rpx;
	}

	.van-image--round {
		overflow: hidden;
		border-radius: 24rpx;
		/* border-radius: 50%; */
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
		padding: 0px 0 3px 0;
		margin-right: 5px;
		font-style: normal;
		font-weight: 700;
		font-size: 24rpx;
		/* color: #999; */
		color: #404040;
	}

	.user-img .user-info .name image {
		width: 28rpx;
		height: 28rpx;
		vertical-align: text-top;
	}

	.user-img .user-info .name .reportInfo {
		padding: 4px 0 3px 0;
		margin-right: 10rpx;
		font-size: 30rpx;
		color: #ec0808;
	}

	.user-img .user-info .time {
		font-size: 20rpx;
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
		background: #EC3232;
		border-radius: 12rpx;
		color: #fff;
		font-weight: 400;
		font-size: 24rpx;
	}

	.forum-list .title {
		font-size: 28rpx;
		padding: 12rpx 0;
		display: flow-root;
	}

	.forum-list .slabel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 16rpx;
		min-width: 62rpx;
		height: 40rpx;
		background: var(--theme-color);
		border-radius: 8rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #fff;
		line-height: 40rpx;
	}

	.van-col {
		float: left;
		box-sizing: border-box;
		min-height: 2rpx;
		display: flex;
		align-items: center;
	}

	.van-col--21 {
		width: 87.5%;
	}

	.van19 {
		display: flex !important;
	}

	.van-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #404040;
	}

	.van19 image {
		height: 40rpx !important;
		margin: 0 8rpx;
	}

	.formtitle {
		font-size: 34rpx;
		font-weight: 700;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 40rpx;
		color: #404040;

		font-weight: 600;
	}

	.reads {
		margin-left: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 8rpx;
		width: 64rpx;
		height: 40rpx;
		background: rgba(231, 22, 7, .1);
		border-radius: 4rpx;

		font-style: normal;
		font-weight: 400;
		font-size: 24rpx;
		color: #e71607;
	}

	.forum-list .text {
		font-size: 28rpx;
		line-height: 40rpx;
		padding: 0 0;
		margin-bottom: 10rpx;
	}

	.forum-list .img-box {
		padding: 0 0;
	}

	.van-col--8 {
		width: 33.33333333%;
	}

	.images .img-box-1 .image-body,
	.images .img-box-2 .image-body,
	.images .img-box-3 .image-body {
		height: 180rpx;

		border-radius: 10rpx;
	}

	.images .image-body {
		margin-bottom: 10rpx;
		width: 100%;
		position: relative;
	}

	.images .image-body .van-image__img {
		border-radius: 10rpx;
		overflow: hidden;
	}

	.forum-list .tool-ft {
		border-top: 2rpx solid var(--theme-auxiliary-color-default);
		text-align: center;
		margin-top: 18rpx;
		padding-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.forum-body-bd .tom-col .van-col {
		height: 48rpx;
		/* padding: 8rpx; */
	}

	.forum-list .tool-ft .num {
		font-weight: 500;
		font-size: 28rpx;
		margin-left: 10rpx;

		color: #404040;

		font-weight: 400;
	}

	.van-col--6 {
		width: 25%;
	}

	.forum-body-bd .ntool {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.forum-body-bd .ntool uni-view {
		background: #f5f5f5;
		padding: 8rpx;
		display: flex;
		align-items: center;
	}

	.forum-body-bd .ntool img {
		height: 30rpx;
	}

	.rule-text {
		background: #fff;
		padding: 20rpx;
		word-break: break-all;
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
	}

	.tab-div-top {
		position: fixed;
		z-index: 1;
		/* background: #f8f8f8; */
		width: 100%;
		top: 86rpx;
		max-width: 480px;
		background-color: #fff;
	}

	.sort-box {
		background-color: #fff;
		padding: 0rpx 20rpx 10rpx 56rpx;
		font-size: 28rpx;
		display: flex;
	}

	.sort-box view {
		display: inline-block;
		margin-right: 40rpx;
		color: #404040;
		/* text-align: center; */
		height: 78rpx;

		font-size: 28rpx;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sort-box .act1 {
		position: relative;
		color: var(--theme-color);
		font-weight: 500;
	}

	.act1::after {
		content: '';
		display: block;
		width: 36rpx;
		height: 6rpx;
		border-radius: 6rpx 6rpx 0 0;
		background: var(--theme-color);
		position: absolute;
		bottom: 0;
	}




	.nav {
		box-sizing: border-box;
		height: 68rpx;
		margin: 10rpx 32rpx;
		/* border: 1px solid var(--theme-color); */
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-around;
		padding: 6rpx;
		/* background: #fff; */
	}

	.nav .nav-item {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* text-align: center; */
		/* line-height: 60rpx; */
		/* border-right: 1px solid; */
		border-color: var(--theme-color);
		color: #404040;


		font-size: 28rpx;
		font-weight: 400;
	}

	.nav .nav-item:last-child {
		border: 0px;
	}

	.nav .nav-item.active {
		background-color: #fff;
		color: var(--theme-color);
		border-radius: 12rpx;

		font-size: 28rpx;
		font-weight: 500;
	}

	.loading {
		text-align: center;
	}
</style>

<style lang="scss" scoped>
	.noticeBlock {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #fff;
		padding: 0 28rpx;

		.notice_list {
			padding: 20rpx 0;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			.noticeScroll {
				width: calc(100% - 70rpx);
				min-width: calc(100% - 70rpx);
			}
		}
	}

	/deep/ .float-bnt {
		bottom: 352rpx !important;
	}

	/deep/ .header {
		border-radius: 0 !important;
	}

	.swiper-item {
		display: flex;
		justify-content: center;

		image {
			border-radius: 24rpx;
			width: calc(100% - 56rpx);
			height: 274rpx;
			margin: 0 auto;
			overflow: hidden;
		}
	}

	$swiper-size: 14rpx;
	$swiper-active-width: 40rpx;

	/deep/ .uni-swiper__dots-item {
		width: $swiper-size !important;
		height: $swiper-size !important;
		border-radius: calc( #{$swiper-size} / 2 ) !important;
		background: rgba(0, 0, 0, 0.5) !important;
		background-color: rgba(0, 0, 0, 0.5) !important;
		box-shadow: none;
		transition: all .3s;
		flex-shrink: 0;
		/*border-radius: 1px !important;*/
	}

	/deep/ .uni-swiper__selected {
		/*width: 48rpx !important;*/
		/*background: linear-gradient(180deg, var(--theme-color) 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%) !important;*/
		/*border-radius: 1px !important;*/
		width: $swiper-active-width !important;
		height: $swiper-size;
		border-radius: calc( #{$swiper-size} / 2 ) !important;
		background: white !important;
	}

	.header-box {
		background: #FFF;
		border-radius: 0 0 24rpx 24rpx;
		padding-top: 20rpx;
		overflow: hidden;

	}

	.van-notice-bar {
		margin: 0 28rpx;
		overflow: hidden;

		/deep/ .van-notice-bar__content {
			line-height: 88rpx !important;
			font-size: 26rpx;
		}
	}


	.act {
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			width: 30rpx;
			height: 30rpx;
			z-index: 1;
		}

		&::before {
			left: -30rpx;
			background: radial-gradient(circle at 0 0, transparent 29rpx, var(--theme-color) 31rpx);
			// background: radial-gradient(circle at 0 0, transparent 30rpx, var(--theme-color) 30rpx);
		}

		&::after {
			right: -30rpx;
			background: radial-gradient(circle at 100% 0, transparent 29rpx, var(--theme-color) 31rpx);
			// background: radial-gradient(circle at 100% 0, transparent 30rpx, var(--theme-color) 30rpx);
		}
	}

	.last-item {
		&::after {
			transform: rotate(180deg);
			right: 0;
			bottom: -30rpx
		}
	}

	.first-item {
		&::before {
			transform: rotate(180deg);
			left: 0;
			bottom: -30rpx
		}
	}

	.zan-img {
		width: 30rpx;
		height: 30rpx;
	}
</style>
