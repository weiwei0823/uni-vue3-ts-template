<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header isFixed :title="title">
			<block slot="right">
				<view style="text-align: right">
					<svg @click="pickerShow = true" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
						viewBox="0 0 22 22" fill="none">
						<g clip-path="url(#clip0_20544_163659)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M8.25 1.375C8.25 0.614453 7.63555 0 6.875 0C6.11445 0 5.5 0.614453 5.5 1.375V2.75H3.4375C2.29883 2.75 1.375 3.67383 1.375 4.8125V6.875H20.625V4.8125C20.625 3.67383 19.7012 2.75 18.5625 2.75H16.5V1.375C16.5 0.614453 15.8855 0 15.125 0C14.3645 0 13.75 0.614453 13.75 1.375V2.75H8.25V1.375ZM20.625 8.25H1.375V19.9375C1.375 21.0762 2.29883 22 3.4375 22H18.5625C19.7012 22 20.625 21.0762 20.625 19.9375V8.25ZM7.0293 11.0019C7.28243 11.0019 7.48763 11.2071 7.48763 11.4602V14.2102C7.48763 14.4633 7.28243 14.6685 7.0293 14.6685H4.2793C4.02617 14.6685 3.82096 14.4633 3.82096 14.2102V11.4602C3.82096 11.2071 4.02617 11.0019 4.2793 11.0019H7.0293ZM7.0293 15.8914C7.28243 15.8914 7.48763 16.0966 7.48763 16.3497V19.0997C7.48763 19.3528 7.28243 19.558 7.0293 19.558H4.2793C4.02617 19.558 3.82096 19.3528 3.82096 19.0997V16.3497C3.82096 16.0966 4.02617 15.8914 4.2793 15.8914H7.0293ZM9.7793 11.0019C9.52617 11.0019 9.32096 11.2071 9.32096 11.4602V14.2102C9.32096 14.4633 9.52617 14.6685 9.7793 14.6685H12.5293C12.7824 14.6685 12.9876 14.4633 12.9876 14.2102V11.4602C12.9876 11.2071 12.7824 11.0019 12.5293 11.0019H9.7793ZM12.5293 15.8914C12.7824 15.8914 12.9876 16.0966 12.9876 16.3497V19.0997C12.9876 19.3528 12.7824 19.558 12.5293 19.558H9.7793C9.52617 19.558 9.32096 19.3528 9.32096 19.0997V16.3497C9.32096 16.0966 9.52617 15.8914 9.7793 15.8914H12.5293ZM15.2793 11.0019C15.0262 11.0019 14.821 11.2071 14.821 11.4602V14.2102C14.821 14.4633 15.0262 14.6685 15.2793 14.6685H18.0293C18.2824 14.6685 18.4876 14.4633 18.4876 14.2102V11.4602C18.4876 11.2071 18.2824 11.0019 18.0293 11.0019H15.2793ZM18.0293 15.8914C18.2824 15.8914 18.4876 16.0966 18.4876 16.3497V19.0997C18.4876 19.3528 18.2824 19.558 18.0293 19.558H15.2793C15.0262 19.558 14.821 19.3528 14.821 19.0997V16.3497C14.821 16.0966 15.0262 15.8914 15.2793 15.8914H18.0293Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_20544_163659">
								<rect width="22" height="22" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</view>
			</block>
		</Header>
		<u-select closeIcon class="year-select" v-model="pickerShow" :list="yearList"
			@confirm="bindTimeChange"></u-select>
		<view class="tabs">
			<view class="new-van-tabs van-tabs van-tabs--card">
				<view class="van-tabs__wrap">
					<view role="tablist" class="van-tabs__nav van-tabs__nav--card">
						<view role="tab" aria-selected="true"
							:class="item.lotteryType == lotteryType ? 'van-tab van-tab--active' : 'van-tab'"
							v-for="(item, index) in tabData" @click="toggle(item)">
							<span class="van-tab__text van-tab__text--ellipsis">{{ item.text }}</span>
						</view>
					</view>
				</view>
				<div class="van-tabs__content"><!----><!----></div>
			</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" show-scrollbar="true"
			scroll-with-animation="true" @scrolltolower="lower"
			:style="{height:`calc(${uWindowHeight}px - 220rpx - ${isApp?0:0}rpx)`,paddingBottom:'var(--safe-area-inset-bottom)'}">
			<!---->
			<view class="prize-list" v-if="ListVideo.length > 0">
				<view class="bd-box">
					<view role="feed" class="van-list">
						<view class="van-row">
							<view class="van-col" v-for="(item, index) in ListVideo" @click="play(item)">
								<view class="item">
									<view class="image">
										<image :src="item.pictureUrl" style="height: 100%;width: 100%"
											:lazy-load="true">
										</image>
									</view>
									<view class="text">{{ item.videoTitle }}</view>
								</view>
							</view>
						</view>
						<div class="van-list__placeholder"></div>
					</view>
				</view>
			</view>
			<empty v-else></empty>
		</scroll-view>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" :background-color="themeColor.themeAuxiliaryColorDefault" style="width: 100%">
			<view style="width: 100vw;max-width: var(--maxWidth);">
				<pay ref="videoOb" class="popup-widh" :lotteryRecordId="lotteryRecordId" :id="videoId"
					:videourl="videourl" :videoTitle="videoTitle" :lotteryType="lotteryType" :year="year"
					:poster="poster" @playcolse="playcolse">
				</pay>
			</view>
		</uni-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		videoList,
		listYear
	} from "@/utils/live/index"
	import Pay from "@/components/common/play/Pay";
	import Empty from "@/components/common/empty/empty";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		name: "playback",
		components: {
			Header,
			AlertInjectLayer,
			Pay,
			Empty
		},
		data() {
			const date = new Date();
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: '开奖回放',
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE),
				tabData: [{
						lotteryType: 1,
						text: "香港六合彩",
						url: 'https://zhibo.chong0123.com:777/hk.html'
					},
					{
						lotteryType: 2,
						text: "澳门六合彩",
						url: 'https://zhibo.2020kj.com:777/ac.html'
					},

					{
						lotteryType: 10,
						text: this.$t("liuhe.live.live.liuheAomenWhole2"),
						url: 'https://zhibo.2020kj.com:777/lac.html'
					}
				],
				years: date.getFullYear(), //默认年份,
				startDate: (date.getFullYear() - 4) + '',
				endDate: (date.getFullYear()) + '',
				scrollTop: 0,
				pageSize: 10,
				pageNum: 1,
				ListVideo: [],
				isLoadMore: false,
				lotteryRecordId: 0,
				videoId: 0,
				videourl: '',
				videoTitle: '',
				poster: '',
				detail: null,
				year: 0,
				yearList: [],
				pickerShow: false,
				isApp: false
			}
		},
		onLoad(option) {
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			this.lotteryType = parseInt(option.lotteryType)
			this.videoList()
			this.listYear()
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			iconClick() {
				document.querySelector('.uni-picker-action-confirm').style.color = this.themeColor.themeColor;
			},
			//返回
			back: function() {
				backPage()
			},
			//年列表获取
			listYear: function() {
				let prams = {
					lotteryType: this.lotteryType
				}
				listYear(prams).then(res => {
					this.yearList = res.result.map(item => {
						return {
							label: item,
							value: item
						}
					})
				}).catch(err => {
					console.log(err)
				})
			},
			//时间选择
			bindTimeChange: function(e) {
				this.years = e[0].value
				this.pageNum = 1;
				this.ListVideo = [];
				this.videoList()
			},
			//选项卡切换
			toggle: function(item) {
				this.lotteryType = item.lotteryType
				this.pageNum = 1;
				this.ListVideo = []
				this.videoList()
				this.listYear()
			},
			//加载更多
			lower: function(e) {
				if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
					this.isLoadMore = true
					this.pageNum += 1
					this.videoList()
				}
			},
			videoList: function() {
				let prams = {
					lotteryType: this.lotteryType,
					year: this.years,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				};
				videoList(prams).then(res => {
					this.ListVideo.push(...res.result.records)
					this.isLoadMore = false
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
			}
		}
	}
</script>
<style scoped>
	::v-deep .empty-box {
		height: auto;
		margin-top: 250rpx;
	}

	.mint-tab-container-item {
		background: var(--theme-auxiliary-color-default);
	}

	.header-box,
	.header.box-bg {
		height: 46px;
	}

	.scroll-Y {
		/* height: calc(var(--vh) - 240rpx); */
		background: #fff;
	}

	.van-tabs {
		position: relative;
	}

	.new-van-tabs .van-tabs__nav--card {
		border-color: var(--theme-color);
	}

	.van-tabs__nav {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		background-color: #fff;
		-webkit-user-select: none;
		user-select: none;
	}

	.van-tab__text--ellipsis {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}


	.prize-list {
		padding: 20rpx 27rpx;
		padding-top: 0;
		height: inherit;
	}

	.van-row .van-col:nth-child(2n) {
		margin-left: 20rpx;
	}

	.prize-list .bd-box .item {
		margin-bottom: 20rpx;
		background: var(--theme-auxiliary-color-default);
		border-radius: 12rpx;
		overflow: hidden;
		width: 338rpx;
	}

	.prize-list .bd-box .item .image {
		height: 243rpx;
		position: relative;
	}

	.prize-list .bd-box .item .text {
		font-size: 28rpx;
		color: #404040;
		text-align: center;
		padding: 20rpx;
	}
</style>
<style lang="scss" scoped>
	.year-select {
		::v-deep .u-drawer-content {
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;

			.u-select__header__confirm {
				color: var(--theme-color) !important;
			}

			.u-select__header {
				background: var(--theme-auxiliary-color-default);
			}

			.uni-picker-view-indicator {
				width: calc(100% - 56rpx);
				border-radius: 16rpx;
				margin: 0 28rpx;
				height: 80rpx;
				background: var(--theme-auxiliary-color-default);
				z-index: 1;
			}

			.uni-picker-view-content {
				z-index: 2;
			}
		}
	}

	.tabs {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 20rpx 28rpx !important;

		.van-tabs__nav--card {
			height: 68rpx;
			background: var(--theme-auxiliary-color-default);
			border-radius: 16rpx;
			padding: 10rpx 6rpx;

			.van-tab {
				flex: 1;
				display: grid;
				place-content: center;
				font-size: 28rpx;
				color: #404040;
			}

			.van-tab--active {
				background: #fff;
				color: var(--theme-color);
				border-radius: 12rpx;
			}
		}
	}
</style>
