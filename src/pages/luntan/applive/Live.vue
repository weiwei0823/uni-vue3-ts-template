<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }">
		<!--顶部导航栏-->
		<nav-bar :is-back="true">
			<view class="input-view" style="font-size: 16px" slot="title">{{ title }}</view>
		</nav-bar>
		<!--直播-->
		<view class="live-box" :style="{ height: liveHeight + 'px' }">
			<view id="live" class="live" :style="{ top: 'calc(45 + safeTop)' + 'px' }">
				<view class="tab" v-if="this.lotteryType < 3">
					<view v-for="(item, index) in tabData"
						:class="lotteryType == item.lotteryType ? 'tab-item tab-act' : 'tab-item'" :key="index"
						@click="toggle(item)">
						{{ item.text }}
					</view>
				</view>
				<!--直播视频-->
				<view class="zhibo">
					<view class="video-box" v-if="lotteryType < 3">
						<view class="dkj" v-show="isShow && showType == 1">
							<text>{{ lotteryType == 1 ? '香港六合彩' : '澳门六合彩' }}揽珠直播时间为开奖日{{ liveInfo.startTime }}-{{ liveInfo.endTime
              }}(北京时间)，</text>
							<text>敬请查看</text>
							<text style="padding-top: 20px" @click="refresh">点击刷新</text>
						</view>
						<view v-show="isShow && showType == 3">
							<image @click="downLoad" style="width: 100%" mode="widthFix" src="@/static/frame.png">
							</image>
						</view>
						<view class="video app-video" v-if="isShow && showType == 2">
							<!-- 播放器显示区域 -->
							<AppLives @refreshVideo="refreshVideo" v-if="isRefresh" :src="liveInfo.live"></AppLives>
							<!-- 播放器显示区域 -->
						</view>
					</view>
					<view class="video-box" v-else>
						<view class="dkj" v-show="isShow">
							<text>暂无直播</text>
						</view>
					</view>
					<view class="open-hide" :class="{ 'open-hide-absolute': !isShow }" @click="zhankai">
						<template v-if="isShow">
							<svg class="svg" :class="{ 'svg-tr': !isShow }" xmlns="http://www.w3.org/2000/svg"
								width="25" height="24" viewBox="0 0 25 24" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0.93934 11.5524C0.353553 12.1382 0.353553 13.088 0.93934 13.6737C1.52513 14.2595 2.47487 14.2595 3.06066 13.6737L12.6141 4.12034L22.1675 13.6737C22.7532 14.2595 23.703 14.2595 24.2888 13.6737C24.8746 13.088 24.8746 12.1382 24.2888 11.5524L13.6747 0.938363C13.0889 0.352577 12.1392 0.352577 11.5534 0.938363L0.93934 11.5524ZM3.21383 20.2713C2.62804 20.8571 2.62804 21.8068 3.21383 22.3926C3.79961 22.9784 4.74936 22.9784 5.33515 22.3926L12.235 15.4927L19.1349 22.3926C19.7207 22.9784 20.6704 22.9784 21.2562 22.3926C21.842 21.8068 21.842 20.8571 21.2562 20.2713L13.2957 12.3107C12.7099 11.7249 11.7602 11.7249 11.1744 12.3107L3.21383 20.2713Z"
									fill="#A1A1A1" />
							</svg>
							<view class="text">
								{{ isShow ? $t("liuhe.live.live.boxClose") : $t("liuhe.live.live.boxOpen") }}
							</view>
						</template>
						<view class="expend-images" v-else>
							<text class="expend-images-text">
								{{ isShow ? $t("liuhe.live.live.boxClose") : $t("liuhe.live.live.boxOpen") }}
							</text>
							<svg :class="isShow?'expend-icon':null" style="margin-left: 20rpx;"
								xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19"
								fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M0.833871 10.1006C0.248085 9.51482 0.248085 8.56507 0.833871 7.97929C1.41966 7.3935 2.3694 7.3935 2.95519 7.97929L9.85507 14.8792L16.755 7.97929C17.3407 7.3935 18.2905 7.3935 18.8763 7.97929C19.4621 8.56507 19.4621 9.51482 18.8763 10.1006L10.9157 18.0611C10.3299 18.6469 9.3802 18.6469 8.79441 18.0611L0.833871 10.1006ZM2.53974 3.56147C1.95395 2.97568 1.95395 2.02593 2.53974 1.44015C3.12552 0.854359 4.07527 0.854359 4.66106 1.44015L9.5708 6.34989L14.4806 1.44015C15.0663 0.854361 16.0161 0.854361 16.6019 1.44015C17.1877 2.02593 17.1877 2.97568 16.6019 3.56147L10.6315 9.53187C10.0457 10.1177 9.09593 10.1177 8.51014 9.53187L2.53974 3.56147Z"
									fill="white" />
							</svg>
						</view>
					</view>
				</view>
				<view class="th">
					<view class="border-box">
						<lottery :lotteryDetail="lastLottery" :listStyle="{ 'position': 'none', 'border': '0px', }">
							<template v-slot:header></template>
							<template v-slot:lottery></template>
							<template v-slot:footer></template>
						</lottery>
					</view>
				</view>
			</view>
		</view>
		<!--视频回放-->
		<view class="prize-list" v-if="this.lotteryType < 3">
			<view class="hd-box van-row">
				<view class="van-col van-col--12">
					<text class="title">开奖回放</text>
				</view>
				<view class="van-col van-col--12" style="text-align: right;">
					<text class="right" @click="more">更多开奖回放&gt;&gt;</text>
				</view>
			</view>
			<view class="bd-box">
				<view class="van-row">
					<view class="van-col van-col--12" @click="play(item)" v-for="(item, index) in videoLists"
						:key="index">
						<view class="item">
							<view class="image">
								<view class="van-image" style="width: 100%; height: 100%;">
									<img :src="item.pictureUrl" class="van-image__img" style="object-fit: cover;" />
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
		<view class="ms-list" v-for="(item, index) in lastLotteryList" :key="index">
			<view class="bd">
				<text>{{ item.year }}
					<label>第{{ item.period }}期</label>
					推荐
				</text>
			</view>
			<view class="ft">
				<ul>
					<li v-for="(val, key) in item.detailList" :key="key">
						<view class="van-row">
							<view class="van-col van-col--20">
								<text>{{ val.name }}</text>
								<text>:</text>
								<text class="ft-col" v-for="(v, k) in val.valueList">{{ v }}</text>
							</view>
							<view class="van-col van-col--4" style="text-align: right;">
								<text class="ft-right" v-if="val.right == 1">中奖</text>
							</view>
						</view>
					</li>

				</ul>
			</view>
		</view>
		<!--弹出层-->
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" style="width: 100%">
			<view style="width: 100vw;height: var(--vh)">
				<pay ref="video" class="popup-widh" :lotteryRecordId="lotteryRecordId" :id="videoId"
					:videourl="videourl" :videoTitle="videoTitle" :lotteryType="lotteryType" :year="year"
					:poster="poster" @playcolse="playcolse"></pay>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import TabBar from "@/components/common/tabbar/TabBar";
	import NavBar from "@/components/common/navBar/navBar.vue";
	import Fab from "@/components/common/fab/Fab";
	import Pay from "@/components/common/play/Pay";
	import Lottery from '@/components/common/lottery/Lottery'
	import AppLives from '@/components/common/live/applive'
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
	export default {
		name: "Live",
		components: {
			AlertInjectLayer,
			Vote,
			Pay,
			TabBar,
			Fab,
			Lottery,
			NavBar,
			AppLives
		},
		data() {
			let date = new Date();
			return {
				title: '开奖现场',
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				safeTop: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top,
				isShow: false,
				showType: 1,
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
						text: "香港六合彩",
					},
					{
						lotteryType: 2,
						text: "澳门六合彩",
					}
				],
				isRefresh: true,
				videoLists: [],
				lastLotteryList: [],
				//开奖信息
				lastLottery: {}, //最后一次开奖信息
				year: 0,
				liveInfo: {},
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
			this.VideoList()
			this.lastLotteryRecord()
			this.refresh()
		},
		methods: {
			//选项卡切换
			toggle: function(item) {
				this.lotteryType = item.lotteryType
				this.lastLotteryRecord()
				this.VideoList()
				this.refresh()
			},
			//返回
			more: function() {
				uni.navigateTo({
					url: "/pages/luntan/live/playback?lotteryType=" + this
						.lotteryType // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			zhankai: function() {
				this.isShow = !this.isShow
				this.$nextTick(() => {
					this.setHeight();
				});
			},
			downLoad: function() {
				this.$nativeBridge.openUrl(this.liveInfo.targetUrl)
			},
			//刷新
			refresh: function() {
				this.isRefresh = false
				let prams = {
					lotteryType: this.lotteryType
				}
				const that = this
				live(prams).then(res => {
					this.liveInfo = res.result
					this.isRefresh = true
					if (this.liveInfo.live && this.liveInfo.timer >= 0) {
						this.showType = 2;
						this.timer = setInterval(() => {
							//TODO
							this.liveInfo.timer--
							if (this.liveInfo.timer <= 0) {
								that.showType = 3
								clearInterval(this.timer)
							}
						}, 1000);
					} else if (this.liveInfo.targetUrl && this.liveInfo.timer <= 0) {
						this.showType = 3;
					} else {
						this.showType = 1;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			refreshVideo() {
				this.isRefresh = false
				setTimeout(() => {
					this.isRefresh = true
				}, 500);
			},
			//开奖回放
			VideoList: function() {
				let prams = this.prams
				prams.lotteryType = this.lotteryType
				videoList(prams).then(res => {
					this.videoLists = res.result.records
				}).catch(err => {
					console.log(err)
				})
			},
			//开奖信息
			lastLotteryRecord: function() {
				let prams = {
					lotteryType: this.lotteryType
				}
				lastLotteryRecordWithCalculate(prams).then(res => {
					this.lastLottery = res.result
					this.lastLotteryList = res.result.recommendList
					this.$store.commit("SET_OPEN_LOTTERY", Object.assign({}, this.lastLottery));
					setTimeout(() => {
						this.setHeight();
					}, 1000);
				}).catch(err => {
					console.log(err)
				})
			},
			//获取详情
			lotteryDetail: function() {
				let prams = {
					id: this.lotteryRecordId
				}
				lotteryDetail(prams).then(res => {
					this.detail = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			play: function(item) {
				this.videoId = item.id
				this.videoTitle = item.videoTitle
				this.lotteryRecordId = item.period
				this.videourl = item.videoUrl
				this.year = item.year
				this.poster = item.pictureUrl
				this.$refs.popup.open("right")
			},
			playcolse: function() {
				this.$refs.popup.close()
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

<style scoped>
	.live {
		position: fixed;
		background: #f6f6f6;
		width: 100%;
		max-width: 480px;
		z-index: 20;
		overflow: hidden;
	}

	.live .tab {
		border: 1px solid var(--theme-color);
		display: flex;
		border-radius: 2px;
		height: 28px;
		line-height: 28px;
		background: #fff;
		margin: 8px 16px 0px 16px;
		font-size: 24rpx;
	}

	.live .tab .tab-item {
		width: 50%;
		text-align: center;
		color: var(--theme-color);
		height: 28px;
	}

	.live .tab .tab-act {
		background-color: var(--theme-color);
		color: #fff;
	}

	.live .th {
		padding: 10px;
	}

	.border-box {
		padding: 16rpx !important;
		background: #fff !important;
	}

	.prize-list {
		background: #fff;
		padding: 10px 15px;
	}

	.prize-list .hd-box {
		padding-bottom: 10rpx;
	}

	.prize-list .hd-box .van-col--12 {
		width: 50%;
	}

	.van-row .van-col:nth-of-type(2n+1) {
		padding-right: 10px;
	}

	.van-row .van-col:nth-of-type(2n) {
		padding-left: 10px;
	}

	.prize-list .hd-box .title {
		font-size: 26rpx;
		font-weight: 500;
	}

	.prize-list .hd-box .right {
		font-size: 26rpx;
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
		margin-top: 15px;
		box-shadow: 0 3px 10px 0 hsl(0deg 0% 63% / 50%);
	}

	.prize-list .bd-box .item .image {
		height: 200rpx;
	}

	.van-image {
		display: inline-block;
	}

	.prize-list .bd-box .item .image img {
		width: 100%;
		height: 100%;
	}

	.prize-list .bd-box .item .text {
		font-size: 12px;
		text-align: center;
		height: 33px;
		line-height: 33px;
	}

	.ms-list .bd {
		font-size: 15px;
		padding: 5px 15px;
		background: #eaf4fe;
	}

	.ms-list .bd label {
		color: var(--theme-color);
		margin-left: 5px;
	}

	.ms-list .ft {
		background: #fff;
		padding: 16rpx 26rpx;
		font-size: 24rpx;
		line-height: 48rpx;
	}

	.ms-list .ft ul li {
		overflow: hidden;
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
		font-size: 12px;
		background: red;
		color: #fff;
		border-radius: 55px;
		padding: 0 4px;
	}

	.ft ul li:last-child {
		color: var(--theme-color);
	}

	.popup-widh {
		width: 100vw;
	}

	.zhibo {
		width: 100%;
		padding-top: 26rpx;
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

	.dkj {
		height: 230px;
		background: #3a3a3a;
		color: red;
		text-align: center;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>

<style scoped lang="scss">
	.expend-images {
		width: 334rpx;
		height: 68rpx;
		position: relative;
		background: url("@/static/imgs-liuhe/expend-bg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
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
</style>
