<template>
	<view class="popup-content" :style="{ marginTop: safeHeight }">
		<nav-bar :isBack="false" :leftWidth="50" :rightWidth="50">
			<block slot="left">
				<svg @click="playcolse" xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22"
					fill="none">
					<path
						d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
						:fill="themeColor.themeColor" />
				</svg>
			</block>
			<view class="input-view" style="font-size: 16px" slot="title">{{ videoTitle + '回放' }}</view>
		</nav-bar>
		<view style="width: 100%;display: block" :style="customStyle">
			<cover-view>
				<video id="myVideo"
					   webkit-playsinline
					   playsinline
					   style="width: 100%;margin: auto" :poster="poster" :src="videourl" autoplay="true"
					loop="true" controls bindloadedmetadata="videometa" object-fit="inherit"></video>
			</cover-view>
		</view>
		<view class="border-box">
			<view class="border-box-body" :class="'border-box-body-' + themeColor.name" v-if="lastLottery">
				<lottery :lotteryDetail="lastLottery" :listStyle="{}">
					<template v-slot:header><span></span></template>
					<template v-slot:lottery></template>
					<template v-slot:footer><span></span></template>
				</lottery>
			</view>
		</view>
		<view class="vant-swiper-body-mini">
			<ads :listPicture="listPicture"></ads>
		</view>
	</view>
</template>

<script>
	import Lottery from '../../../components/common/lottery/Lottery'
	import Ads from '../../../components/common/ad/Ad'
	import NavBar from "../../../components/common/navBar/navBar.vue";
	import {
		period
	} from "../../../utils/lottery/index"
	import {
		advertList,
		listSpreadByType
	} from "../../../utils/common/index.js"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "pay",
		components: {
			Lottery,
			Ads,
			NavBar
		},
		props: {
			id: {
				type: Number,
				default: 0
			},
			//彩票期数
			lotteryRecordId: {
				id: {
					type: Number,
					default: 0
				}
			},
			videourl: {
				type: String,
				default: ''
			},
			videoTitle: {
				type: String,
				default: ''
			},
			data: {
				type: Object,
			},

			lotteryType: {
				type: Number,
			},
			year: {
				type: Number
			},
			poster: {
				type: String,
				default: '',
			},
			customStyle: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				current: 0,
				lastLottery: {},
				listPicture: []
			}
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		mounted() {
			this.periodInfo();
			this.getAdvertList()
		},
		methods: {
			videometa: function(e) {
				var that = this;
				//获取系统信息

				//视频的高
				var height = e.detail.height;

				//视频的宽
				var width = e.detail.width;

				//算出视频的比例
				var proportion = height / width;


			},

			playcolse: function() {
				this.$emit("playcolse");
			},
			periodInfo: function() {
				let prams = {
					number: this.lotteryRecordId,
					lotteryType: this.lotteryType,
					year: this.year
				};
				period(prams).then(res => {
          this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netRes)=>{
            this.lastLottery = netRes.result
          },this)
					this.lastLottery = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			//轮播图获取
			getAdvertList() {
				let prams = {
					projectType: 1,
					code: 3,
				}
				advertList(prams).then(res => {
					this.listPicture = res.result
				}).catch(err => {

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		max-width: 480px;
	}

	.popup-content {
		width: 100%;
		max-width: 480px;
		margin: auto;
		background: var(--theme-auxiliary-color-default);
	}

	#myVideo {
		width: 100%;
	}

	::v-deep .lottery-center {
		padding: 0 !important;
	}

	.border-box {
		padding: 20rpx 28rpx !important;
		margin-bottom: 20rpx;
		border-radius: 0 0 24rpx 24rpx;

		.border-box-body {
			height: 158rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;

			::v-deep .lottery-box {
				width: 100%;
			}
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
	}
</style>
