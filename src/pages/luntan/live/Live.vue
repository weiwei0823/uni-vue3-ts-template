<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ marginTop: safeHeight, height: `calc(${uWindowHeight}px)` }" :class="['theme-' + themeColor.name]">
		<Header isFixed :title="$t(title)"
			:headerStyle="{ borderBottomLeftRadius: '24rpx', borderBottomRightRadius: '24rpx', overflow: 'hidden', zIndex: '9999' }"
			:showBack="true" @back="backHeader" :isBack="false" />
		<!-- <view class="tab-div-bg" style="height:60rpx;border-radius:0;top:56rpx;z-index:9995;"></view>
		<view class="tab-div-radius" /> -->
		<!--直播-->
		<scroll-view scroll-y="true" class="content" :enhanced="true" :bounces="false" :show-scrollbar="false"
			:style="{ height: `calc(${uWindowHeight}px - 168rpx)` }">
			<view class="live-box">
				<view id="live" class="live">
					<view class="tab" v-if="isOpenLive">
						<view v-for="(item, index) in tabData"
							:class="lotteryType == item.lotteryType ? 'tab-item tab-act' : 'tab-item'" :key="index"
							@click="toggle(item)">
							{{ $t(item.text) }}
						</view>
					</view>
					<!--直播视频-->
					<view class="zhibo">

						<view class="video-box" v-if="isOpenLive">
							<text class="dkj" :class="{ 'dkj-show': isShow, 'dkj-hide': !isShow }"
								v-if="showType == showTypeEnum.noLive">
								{{ showWaitHtml }}
								<view class="refresh" @click="shuaxin">
									<svg :class="{ 'loading': !isRefresh }" xmlns="http://www.w3.org/2000/svg" width="21" height="20"
										viewBox="0 0 21 20" fill="none">
										<path
											d="M3.963 2.43301C5.77756 0.860669 8.09899 -0.00333986 10.5 9.70265e-06C16.023 9.70265e-06 20.5 4.47701 20.5 10C20.5 12.136 19.83 14.116 18.69 15.74L15.5 10H18.5C18.5001 8.43163 18.0392 6.89781 17.1747 5.58926C16.3101 4.28071 15.0799 3.25517 13.6372 2.64013C12.1944 2.0251 10.6027 1.84771 9.05996 2.13003C7.5172 2.41234 6.09145 3.14191 4.96 4.22801L3.963 2.43301ZM17.037 17.567C15.2224 19.1393 12.901 20.0033 10.5 20C4.977 20 0.5 15.523 0.5 10C0.5 7.864 1.17 5.884 2.31 4.26001L5.5 10H2.5C2.49987 11.5684 2.96075 13.1022 3.82534 14.4107C4.68992 15.7193 5.92007 16.7448 7.36282 17.3599C8.80557 17.9749 10.3973 18.1523 11.94 17.87C13.4828 17.5877 14.9085 16.8581 16.04 15.772L17.037 17.567Z"
											:fill="themeColor.themeColor" />
									</svg>
									<view class="text">点击刷新</view>
								</view>
							</text>
							<view v-show="isShow && showType == showTypeEnum.showDown">
								<image @click="downLoad" style="width: 100%" mode="widthFix" src="@/static/frame_v2.png">
								</image>
							</view>
							<view v-if="showType == showTypeEnum.endLiveShort">

							</view>
							<view class="video" v-if="isShow && showType == showTypeEnum.livePlaying">
								<!-- <view class="video" v-if="1==1"> -->
								<!-- 播放器显示区域 -->
								<!--#ifdef H5-->
								<lives ref="livesRef" @refreshVideo="refreshVideo" v-on:onLoadingVideoError="onVideoFullFail"
									:showLoading="true" :src="liveInfo.live ? liveInfo.live[showLiveIndex].livePath : ''"
									:liveRatio="liveInfo.live ? liveInfo.live[showLiveIndex].liveRatio : 0"></lives>
								<!--#endif-->

								<!--#ifdef APP_PLUS-->
								<AppLives ref="livesRef" @refreshVideo="refreshVideo" :src="liveInfo.live[showLiveIndex].livePath">
								</AppLives>
								<!--#endif-->
								<!-- 播放器显示区域 -->
							</view>
						</view>

						<view class="video-box" v-else>
							<view class="dkj" v-if="isShow">
								<text>{{ $t("liuhe.live.live.statusNot") }}</text>
							</view>
						</view>
						<view class="open-hide" v-if="lotteryType < 3 || lotteryType == 10" :class="{ 'open-hide-absolute': !isShow }"
							@click="zhankai">
							<template v-if="isShow">
								<svg class="svg" :class="{ 'svg-tr': !isShow }" xmlns="http://www.w3.org/2000/svg" width="25"
									height="24" viewBox="0 0 25 24" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M0.93934 11.5524C0.353553 12.1382 0.353553 13.088 0.93934 13.6737C1.52513 14.2595 2.47487 14.2595 3.06066 13.6737L12.6141 4.12034L22.1675 13.6737C22.7532 14.2595 23.703 14.2595 24.2888 13.6737C24.8746 13.088 24.8746 12.1382 24.2888 11.5524L13.6747 0.938363C13.0889 0.352577 12.1392 0.352577 11.5534 0.938363L0.93934 11.5524ZM3.21383 20.2713C2.62804 20.8571 2.62804 21.8068 3.21383 22.3926C3.79961 22.9784 4.74936 22.9784 5.33515 22.3926L12.235 15.4927L19.1349 22.3926C19.7207 22.9784 20.6704 22.9784 21.2562 22.3926C21.842 21.8068 21.842 20.8571 21.2562 20.2713L13.2957 12.3107C12.7099 11.7249 11.7602 11.7249 11.1744 12.3107L3.21383 20.2713Z"
										:fill="themeColor.themeColor" />
								</svg>
								<view class="text">
									{{ isShow ? $t("liuhe.live.live.boxClose") : $t("liuhe.live.live.boxOpen") }}
								</view>
							</template>
							<view class="expend-images" v-else>
								<view style="position: absolute; left: 0; z-index: 1;">
									<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;" viewBox="0 0 169 34"
										fill="none">
										<path
											d="M159.479 0H0.768799C3.63282 0.979914 6.19703 2.67324 8.21713 4.91866C11.4173 8.38976 13.8946 12.4574 15.506 16.8866C15.9873 18.0584 16.3775 19.2652 16.6734 20.4963L17.1631 22.5306C17.9414 25.8013 19.8078 28.7142 22.4593 30.7962C25.1108 32.8783 28.3918 34.0073 31.7694 34H137.248C140.626 34.0083 143.907 32.8797 146.559 30.7975C149.21 28.7152 151.077 25.8018 151.854 22.5306L152.349 20.4963C152.636 19.2659 153.017 18.0592 153.488 16.8866C155.115 12.4533 157.61 8.38531 160.828 4.91866C162.834 2.67811 165.383 0.984968 168.231 0L159.479 0Z"
											:fill="themeColor.themeColor" />
									</svg>
								</view>
								<text style="z-index: 2;" class="expend-images-text">
									{{ isShow ? $t("liuhe.live.live.boxClose") : $t("liuhe.live.live.boxOpen") }}
								</text>
								<svg style="z-index: 2;margin-left: 20rpx;" :class="isShow ? 'expend-icon' : null"
									xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M0.833871 10.1006C0.248085 9.51482 0.248085 8.56507 0.833871 7.97929C1.41966 7.3935 2.3694 7.3935 2.95519 7.97929L9.85507 14.8792L16.755 7.97929C17.3407 7.3935 18.2905 7.3935 18.8763 7.97929C19.4621 8.56507 19.4621 9.51482 18.8763 10.1006L10.9157 18.0611C10.3299 18.6469 9.3802 18.6469 8.79441 18.0611L0.833871 10.1006ZM2.53974 3.56147C1.95395 2.97568 1.95395 2.02593 2.53974 1.44015C3.12552 0.854359 4.07527 0.854359 4.66106 1.44015L9.5708 6.34989L14.4806 1.44015C15.0663 0.854361 16.0161 0.854361 16.6019 1.44015C17.1877 2.02593 17.1877 2.97568 16.6019 3.56147L10.6315 9.53187C10.0457 10.1177 9.09593 10.1177 8.51014 9.53187L2.53974 3.56147Z"
										fill="white" />
								</svg>
							</view>
						</view>
					</view>
					<view class="th" :data-openlive="isOpenLive ? '1' : '0'">
						<view class="border-box" :class="'border-box-body'">
							<lottery :lotteryFooterShowCalendar="false" :lotteryFooterShowPick="false" :lotteryDetail="lastLottery"
								:listStyle="{ 'position': 'none', 'border': '0px', }" :listenNumberListAction="true"
								v-on:httpAync="lastLotteryRecord" isForceHttpAsyncOpend>
								<template v-slot:header></template>
								<template v-slot:lottery></template>
								<template v-slot:footer></template>
							</lottery>
						</view>
					</view>
				</view>
			</view>
			<!--视频回放-->
			<view class="prize-list" v-if="isOpenLive">
				<view class="hd-box van-row">
					<view class="van-col van-col--12">
						<text class="title">{{ $t('liuhe.live.live.text1') }}</text>
					</view>
					<view class="van-col van-col--12" style="text-align: right;">
						<text class="right" @click="more">{{ $t('liuhe.live.live.text2') }}&gt;&gt;</text>
					</view>
				</view>
				<view class="bd-box">
					<view class="van-row">
						<view class="van-col van-col--12" @click="play(item)" v-for="( item, index ) in videoLists " :key="index">
							<view class="item">
								<view class="image">
									<view class="van-image" style="width: 100%; height: 100%;">
										<img :src="item.pictureUrl" class="van-image__img" style="object-fit: cover;" />
									</view>
									<view class="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
											<rect x="0.9375" y="34" width="34" height="34" rx="17" transform="rotate(-90 0.9375 34)"
												fill="black" fill-opacity="0.7" />
											<path
												d="M23.9375 15.268C25.2708 16.0378 25.2708 17.9623 23.9375 18.7321L16.4375 23.0622C15.1042 23.832 13.4375 22.8697 13.4375 21.3301L13.4375 12.6699C13.4375 11.1303 15.1042 10.168 16.4375 10.9378L23.9375 15.268Z"
												fill="white" />
										</svg>
									</view>
								</view>
								<view class="text">{{ item.videoTitle }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view style="clear: both"></view>
			<!--列表-->
			<view class="ms-list" v-for="( item, index ) in lastLotteryList " :key="index">
				<view class="bd">
					<text>{{ item.year }}
						<label>{{ $formartLocaleString("liuhe.live.live.qishu", item.period) }}</label>
						{{ $t("liuhe.live.live.tuijian") }}
					</text>
				</view>
				<view class="ft">
					<ul>
						<li v-for="( val, key ) in item.detailList " :key="key">
							<view class="van-row">
								<view class="van-col van-col--20">
									<text>{{ val.name }}</text>
									<text>:</text>
									<text class="ft-col" v-for="( v, k ) in val.valueList ">{{ v }}</text>
								</view>
								<view class="van-col van-col--4" style="text-align: right;">
									<text class="ft-right" v-if="val.right == 1">{{ $t('liuhe.live.live.zhongjiang') }}</text>
								</view>
							</view>
						</li>

					</ul>
				</view>
			</view>
			<!--弹出层-->
			<!-- 普通弹窗 -->
		</scroll-view>
		<uni-popup ref="popup" background-color="#fff" style="width: 100%;z-index: 999999;">
			<view class="pc-max-width" style="width: 100vw;background: var(--theme-auxiliary-color-default);"
				:style="{ height: `calc(${uWindowHeight}px)` }">
				<pay ref="video" class="popup-widh" :lotteryRecordId="lotteryRecordId" :id="videoId" :videourl="videourl"
					:videoTitle="videoTitle" :lotteryType="lotteryType" :year="year" :poster="poster" @playcolse="playcolse"
					customStyle="padding:0 28rpx;box-sizing: border-box;    background: #fff;"></pay>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import TabBar from "@/components/common/tabbar/TabBar";
import NavBar from "@/components/common/navBar/navBar.vue";
import Fab from "@/components/common/fab/Fab";
import Pay from "@/components/common/play/Pay";
import Lottery from '@/components/common/lottery/Lottery'
//#ifdef H5
import Lives from '@/components/common/live/live'
//#endif
//#ifdef APP_PLUS
import AppLives from '@/components/common/live/applive'
//#endif
import {
	videoList,
	lotteryDetail,
	live
} from "@/utils/live/index.js";
import {
	lastLotteryRecordWithCalculate
} from "@/utils/lottery/index.js"
import Vote from "@/components/common/vote/Vote";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import {
	mapGetters
} from 'pinia';
import AppInfoStore from "@/store/modules/appInfoStore";
import SystemInfoStore from "@/store/modules/systemInfoStore";
export default {
	name: "Live",
	components: {
		Header,
		AlertInjectLayer,
		Vote,
		Pay,
		TabBar,
		Fab,
		Lottery,
		//#ifdef H5
		Lives,
		//#endif
		NavBar,
		//#ifdef APP_PLUS
		AppLives
		//#endif
	},
	data() {
		let date = new Date();
		this.showTypeEnum = {
			noLive: 1,
			livePlaying: 2,
			showDown: 3,
			endLiveShort: 4
		};
		return {
			title: 'liuhe.live.live.title',
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			isShow: false,
			showType: 1,
			showLiveIndex: 0,
			lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE) ? this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
					.LOCAL_STORE_LOTTERYTYPE) : 1,
			videoId: 0,
			videoTitle: '',
			videourl: '',
			poster: '',
			detail: null,
			lotteryRecordId: 0,
			liveHeight: 0,
			prams: {
				lotteryType: 1, //彩票类型
				year: date.getFullYear(), //默认年份
				pageSize: 4, //分页条数
				pageNum: 1, //分页
			},
			tabData: [{
				lotteryType: 1,
				text: "liuhe.live.live.liuheHongkongWhole",
			},
			{
				lotteryType: 2,
				text: "liuhe.live.live.liuheAomenWhole",
			},
			{
				lotteryType: this.$config.enumMgr.LOTTERY_CHANNELS.LAO_AOMEN.id,
				text: "liuhe.live.live.liuheAomenWhole2",
			}
			],
			isRefresh: true,
			videoLists: [],
			lastLotteryList: [],
			//开奖信息
			lastLottery: {}, //最后一次开奖信息
			year: 0,
			liveInfo: {},
			beginDate: null,
			endDate: null,
			popVisible: false
		}
	},
	onLoad() {
		this.VideoList()
		this.lastLotteryRecord()
		this.shuaxin()
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	computed: {
    ...mapState(AppInfoStore, ["themeColor"]),
    ...mapState(SystemInfoStore, ["uWindowHeight"]),
		showWaitHtml() {
			let ar1 = this.lotteryType == 1 ? this.$t("liuhe.live.live.liuheHongkong") : this.$t(
				"liuhe.live.live.liuheAomen");
			let value = this.$formartLocaleString("liuhe.live.live.waitingText", ar1, this.dateString);
			return value;
		},
		dateString() {
			return this.beginDate + "-" + this.endDate;
		},
		isOpenLive() {
			return this.lotteryType < 3 || this.lotteryType == this.$config.enumMgr.LOTTERY_CHANNELS.LAO_AOMEN.id
		}
	},


	methods: {
		backHeader() {
			if (this.popVisible) {
				this.playcolse();
			} else {
				// backPage()
				const pages = getCurrentPages();
				const isHaveBack = pages[pages.length - 2];
				if (isHaveBack) {
					backPage();
				} else {
					location.href = '/'
				}
			}
		},
		//选项卡切换
		toggle: function (item) {
			const confirm = () => {
				this.lotteryType = item.lotteryType
				this.lastLotteryRecord()
				this.VideoList()
				this.shuaxin()
			}
			if (this.showType === 2) {
				uni.$emit('showPop', {
					refName: "AlertMsg",
					data: {
						title: '温馨提示',
						content: '您正在直播中，确认切换彩种吗？',
					},
					confirm
				})
				return
			}
			confirm()
		},
		//返回
		back: function () {
			uni.reLaunch({
				url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
			});
		},
		more: function () {
			uni.navigateTo({
				url: "playback?lotteryType=" + this.lotteryType // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
			});
		},
		zhankai: function () {
			this.isShow = !this.isShow
			this.$nextTick(() => {
				this.setHeight();
			});
		},
		downLoad: function () {
			const configInfo = this.$store.state.appInfoStore?.contantsConfigTypeMap['6'] || {};
			if (configInfo && configInfo.url) {
				this.$nativeBridge.openUrl(configInfo.url);
				//#ifdef APP-PLUS
				plus.runtime.openURL(configInfo.url)
				//#endif
			}
			// uni.navigateTo({
			// 	url: '/pages/common/userCenter/downloadPage',
			// 	success: function(res) {
			// 		res.eventChannel.emit('argParams', info)
			// 	}
			// })
		},
		//刷新
		shuaxin: function () {
			this.isRefresh = false
			this.liveInfo = {};
			let prams = {
				lotteryType: this.lotteryType
			}
			const that = this
			clearInterval(this.timer);
			live(prams).then(res => {
				this.liveInfo = res.result;
				this.beginDate = res.result.startTime;
				this.endDate = res.result.endTime;
				// that.$config.isDebug&&this.liveInfo.live.push({livePath:'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'})
				// IOS 有效flv ：https://live.nodemedia.cn:8443/live/b480_264.flv header非下载文件 不包含content-length
				// IOS 无效flv ：https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv header下载文件 包含content-length
				// let openDebug=true;
				// if(openDebug){
				// let debugUrl=0?`https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv`:`https://live.nodemedia.cn:8443/live/b480_264.flv?t=${Date.now()}`;
        // that.liveInfo.live=[{livePath:'https://tc-tc2-interact.douyucdn2.cn/dyliveflv1/85894rmovieChow_900p.m3u8'}];
        // // that.liveInfo.live=[{livePath:'http://116.162.6.192/1.v.smtcdns.net/qctv.fengshows.cn/live/0701pcc72.flv'}];
        // // that.liveInfo.live=[{livePath:debugUrl,liveRatio:1}];
        // that.liveInfo.startLiveCountdown=-100;
        // that.liveInfo.endLiveCountdown=99999;
				// }
				// this.liveInfo.endLiveCountdown = -3;
				this.isRefresh = true;
				this.showLiveIndex = 0;
				if (this.liveInfo.live && this.liveInfo.startLiveCountdown <= 0 && this.liveInfo
					.endLiveCountdown > 0) {
					if (this.liveInfo.live.length < 1) {
						return;
					}

					this.showType = this.showTypeEnum.livePlaying;
					this.isShow = true;
					this.timer = setInterval(() => {
						this.liveInfo.endLiveCountdown--
						if (this.liveInfo.endLiveCountdown <= 0) {
							if (Math.abs(this.liveInfo.endLiveCountdown) < 20 * 60) {
								this.showType = this.showTypeEnum.showDown;
							} else {
								that.showType = this.showTypeEnum.noLive
								clearInterval(that.timer);
							}
						}
					}, 1000);
				} else if (this.liveInfo.endLiveCountdown <= 0) {
					this.timer = setInterval(() => {
						this.liveInfo.endLiveCountdown--
						if (Math.abs(this.liveInfo.endLiveCountdown) < 20 * 60) {
							this.showType = this.showTypeEnum.showDown;
						} else {
							that.showType = this.showTypeEnum.noLive
							clearInterval(that.timer);
						}
					}, 1000);
				} else {
					this.showType = this.showTypeEnum.noLive;
					if (this.liveInfo.startLiveCountdown > 0) {
						this.timer = setInterval(() => {
							//TODO
							that.liveInfo.startLiveCountdown--
							if (that.liveInfo.startLiveCountdown <= 0) {
								clearInterval(that.timer);
								that.shuaxin()
							}
						}, 1000);
					} else if (this.liveInfo.endLiveCountdown > 0) {
						this.timer = setInterval(() => {
							//TODO
							that.liveInfo.endLiveCountdown--
							if (that.liveInfo.endLiveCountdown <= 0) {
								clearInterval(that.timer);
								that.shuaxin()
							}
						}, 1000);
					}
				}
			}).catch(err => {
				console.log(err)
			})
		},
		refreshVideo() {
			this.isRefresh = false
			this.shuaxin();
			setTimeout(() => {
				this.isRefresh = true
				this.$refs.livesRef?.init();
			}, 500);
		},

		onVideoFullFail() {
			console.error("播放错误", this.showLiveIndex);
			if (this.showLiveIndex + 1 < this.liveInfo.live.length) {
				// pop("当前线路慢，正在为您切换线路")
				this.isRefresh = false;
				this.showLiveIndex++;
				this.$nextTick(() => {
					this.isRefresh = true;
					this.$refs.livesRef.init();
				})
			} else {
				this.refreshVideo();
			}
		},

		//开奖回放
		VideoList: function () {
			let prams = this.prams
			prams.lotteryType = this.lotteryType
			videoList(prams).then(res => {
				this.videoLists = res.result.records
			}).catch(err => {
				console.log(err)
			})
		},
		//开奖信息
		lastLotteryRecord: function () {
			let prams = {
				lotteryType: this.lotteryType
			}
			lastLotteryRecordWithCalculate(prams).then(res => {
				this.lastLottery = res.result
				this.lastLotteryList = res.result.recommendList;
				// this.lastLottery && console.log(
				// 	`\n\n直播区域开奖信息-->:【开奖lotteryType=${this.lastLottery.lotteryType} name=${this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lastLottery.lotteryType)}】 显示内容=` +
				// 	JSON.stringify(this.lastLottery.numberList));
				this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery));
				this.$nextTick(() => {
					this.setHeight();
				});
			}).catch(err => {
				console.log(err)
			})
		},
		//获取详情
		lotteryDetail: function () {
			let prams = {
				id: this.lotteryRecordId
			}
			lotteryDetail(prams).then(res => {
				this.detail = res.data
			}).catch(err => {
				console.log(err)
			})
		},
		play: function (item) {
			this.videoId = item.id
			this.videoTitle = item.videoTitle
			this.lotteryRecordId = item.period
			this.videourl = item.videoUrl
			this.year = item.year
			this.poster = item.pictureUrl
			this.$refs.popup.open("right")
			this.popVisible = true;
      if (this.isShow && this.showType === this.showTypeEnum.livePlaying) {
        this.$refs.livesRef?.pauseVideo();
      }
		},
		playcolse: function () {
			this.$refs.popup.close();
			this.popVisible = false;
      if (this.isShow && this.showType === this.showTypeEnum.livePlaying) {
        this.$refs.livesRef?.playVideo();
      }
		},
		videoErrorCallback(e) {
			console.error('live-player error:', e.detail.errMsg)
		},
		setHeight() {
			let element = "#live";
			let query = uni.createSelectorQuery().in(this);
			query.select(element).boundingClientRect();
			query.exec((res) => {
				if (res && res[0]) {
					this.liveHeight = res[0].height;
				}
			});
		},
	}
}
</script>

<style scoped lang="scss">
.mint-tab-container-item {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.content {
	height: 0;
	flex: 1;
	margin-top: 20rpx;
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;
	// padding-bottom: 132rpx;
}

.tab-div-radius {
	background-color: #fff;
	height: 20rpx;
	width: 100%;
	position: fixed;
	top: 100rpx;
	z-index: 9996;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
}

.expend-images {
	width: 334rpx;
	height: 68rpx;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	.expend-icon {
		transform: rotate(180deg);
	}

	.expend-images-text {
		color: #FFF;
		text-align: center;

		font-size: 34rpx;
		font-weight: 500;
	}
}

.live {
	background: #fff;
	width: 100%;
	max-width: 480px;
	z-index: 20;
	overflow: hidden;
	// margin-top: 20rpx;
	border-radius: 24rpx;
	box-sizing: border-box;
}

.video {
	width: 100%;
	height: 360rpx;
}

.live .tab {
	display: flex;
	border-radius: 16rpx;
	height: 68rpx;
	background: var(--theme-auxiliary-color-default);
	padding: 10rpx 6rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #404040;
	margin: 20rpx 28rpx;
}

.live .tab .tab-item {
	flex: 1;
	text-align: center;
	display: grid;
	place-content: center;
}

.live .tab .tab-act {
	background-color: #fff;
	color: var(--theme-color);
	border-radius: 12rpx;
}

.live .th {
	padding: 20rpx 28rpx !important;
	padding-top: 0 !important;
}

.live .th {
	padding: 20rpx 28rpx !important;
	padding-top: 0 !important;
}

.live .th[data-openlive='0'] {
	padding-top: 20rpx !important;
}

.border-box {
	padding: 0 !important;
	background: #fff !important;
	border-radius: 24rpx;
	border: 4rpx solid var(--theme-color);
	padding-bottom: 20rpx !important;
}


.border-box-body {
	background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%) !important;
}

.prize-list {
	background: #fff;
	padding: 20rpx 28rpx;
	margin-top: 20rpx;
	border-radius: 24rpx;
}

.prize-list .hd-box {}

.prize-list .hd-box .van-col--12 {
	width: 50%;
}

.van-row .van-col:nth-of-type(2n+1) {
	padding-right: 10rpx;
}

.van-row .van-col:nth-of-type(2n) {
	padding-left: 10rpx;
}

.prize-list .hd-box .title {
	color: #404040;
	font-size: 30rpx;
	font-weight: 500;
}

.prize-list .hd-box .right {
	font-size: 28rpx;
	color: var(--theme-color);
	font-weight: 500;
}

.bd-box {
	display: inline-block;
	width: 100%;
	background: #fff;
}

.bd-box .van-row .van-col--12 {
	width: 50%;
}

.van-col {
	float: left;
	box-sizing: border-box;
	min-height: 1px;
}

.prize-list .bd-box .item {
	border-radius: 12rpx;
	overflow: hidden;
	margin-top: 20rpx;
	background: var(--theme-auxiliary-color-default);
}

.prize-list .bd-box .item .image {
	height: 200rpx;
	position: relative;
}

.icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.van-image {
	display: inline-block;
}

.prize-list .bd-box .item .image img {
	width: 100%;
	height: 100%;
}

.prize-list .bd-box .item .text {
	font-size: 28rpx;
	text-align: center;
	height: 33px;
	line-height: 33px;
}

.ms-list {
	margin-top: 20rpx;
	border-radius: 24rpx;
	padding: 20rpx 28rpx;
	background: #fff;
}

.ms-list .bd {
	font-size: 30rpx;
	color: #404040;
	display: flex;
	align-items: center;
	padding-bottom: 20rpx;
	border-bottom: 1px solid var(--theme-auxiliary-color-default);
}

.ms-list .bd::before {
	content: '';
	margin-right: 14rpx;
	width: 6rpx;
	height: 24rpx;
	background: var(--theme-color);
	border-radius: 6rpx;
}

.ms-list .bd label {
	color: var(--theme-color);
	margin-left: 5px;
}

.ms-list .ft {
	background: #fff;
	padding-bottom: 20rpx;
	font-size: 28rpx;
	color: #404040;
}

.ms-list .ft ul li {
	overflow: hidden;
	height: 44rpx;
	margin-top: 20rpx;
}

.ms-list .ft ul li .van-row .van-col--20 {
	width: 83.33333333%;
}

.ms-list .ft ul li .van-row .van-col {
	float: left;
	box-sizing: border-box;
	min-height: 1px;
}

.ms-list .ft li .van-row .ft-col {
	margin-left: 5px;
}

.ms-list .ft li .van-row .van-col--4 {
	width: 16.66666667%;
}

.ms-list .ft li .van-row .van-col .ft-right {
	font-size: 24rpx;
	height: 44rpx;
	box-sizing: border-box;
	background: var(--theme-auxiliary-color-remind);
	color: #fff;
	border-radius: 12rpx;
	padding: 6rpx 10rpx;
}

.ft ul li:last-child {
	color: var(--theme-color);
}

.popup-widh {
	width: 100vw;

	::v-deep .uni-video-container {
		border-radius: 24rpx;
	}
}

.zhibo {
	width: 100%;

	.video-box {
		margin: 0 28rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}
}

.open-hide {
	margin: 20rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.open-hide-absolute {
	max-width: 480px;
	width: 100%;
}

.open-hide .svg {
	transition: all .3s;
}

.open-hide .svg-tr {
	transform: rotate(180deg);
}

.open-hide .text {
	margin-top: 10rpx;
	color: #A1A1A1;
	font-size: 28rpx;
}

.ab {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.dkj {
	height: 0;
	background: #000000;
	color: var(--theme-auxiliary-color-remind);
	text-align: center;
	font-size: 28rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 47rpx;
	transition: all .3s;
}

.dkj-hide {
	display: none;
}

.dkj-show {
	height: 360rpx;
}
</style>

<style lang="scss" scoped>
::v-deep .header {
	z-index: 99 !important;
}

.refresh {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20rpx;

	.text {
		margin-left: 20rpx;
		color: var(--theme-color);
		font-size: 28rpx;
	}



	.loading {
		animation: rotation 3s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
}

::v-deep .lottery-footer {
	justify-content: center;
}
</style>
