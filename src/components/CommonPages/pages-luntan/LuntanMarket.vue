<template>
	<view class="pc-max-width" :style="{position: `fixed`,'background-color': '#fff', height:`${winHeight}px`}">

		<view class="mint-tab-container-item"
			:style="{ marginTop: safeHeight , height:`${winHeight}px`,'max-width':'480px','width':'100vw'}"
			:class="['theme-' + themeColor.name]">
			<!-- <nav-bar :headerStyle="headerStyle" :is-back="false">
			<view class="input-view" style="font-weight: 600;font-size: 36rpx;" slot="title">{{ title }}</view>
			<view slot="right" class="right-set">

			</view>
		</nav-bar> -->
			<Header :title="title" :is-back="false" isFixed></Header>
			<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`}" class="content"
				:enhanced="true" :bounces="false" :show-scrollbar="false">
				<view style="background: var(--theme-auxiliary-color-default)">
					<view class="taoliao">
						<view class="title-div">
							<view class="left">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none">
									<g clip-path="url(#clip0_21640_58695)">
										<path fill-rule="evenodd" clip-rule="evenodd"
											d="M5.26661 6.23786C8.90459 5.94174 16.5613 4.76574 18.0842 2.43067C19.9878 -0.488177 23.2873 0.780885 23.7315 5.03225C24.0897 8.46072 24.0893 12.3114 23.7315 15.7362C23.2873 19.9875 19.9878 21.2566 18.0842 18.3378C16.5613 16.0027 8.90459 14.8267 5.26661 14.5306V6.23786ZM8.56616 22.716C8.30015 22.3909 7.81386 21.6941 7.27402 20.9205C6.65492 20.0333 5.9654 19.0452 5.45696 18.4012C4.88588 17.6431 4.50516 16.7514 5.45696 16.7514C6.40875 16.7514 7.93163 17.3225 9.51796 18.8454C11.1043 20.3683 12.3099 22.716 11.8023 23.0967C11.2946 23.4775 9.13724 23.414 8.56616 22.716ZM3.68028 6.28167C1.64772 6.28167 0 7.92939 0 9.96195V10.5965C0 12.629 1.64772 14.2768 3.68028 14.2768V6.28167Z"
											:fill="themeColor.themeColor" />
									</g>
									<defs>
										<clipPath id="clip0_21640_58695">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</view>
							<view class="right">
								<!--								<view class="notice">-->
								<!--									<view class="notice-item" v-for="(item, index) in noticeInfo">-->
								<!--										{{ item.noticeContent }}-->
								<!--									</view>-->
								<!--								</view>-->
								<u-notice-bar class="notice-bar" mode="horizontal" color="#A1A1A1"
									:list="noticeTextList" :volume-icon="false"></u-notice-bar>
							</view>
						</view>
						<view class="main-box">
							<view class="tips-box">
								<view class="notices">{{ $t('components.CommonPages.pages-luntan.LuntanMarket.tips') }}
								</view>
							</view>
							<view class="items">
								<view class="items1" @click="qidai">
									<image src="/static/img/market/icon-1.png" mode=""></image>
									<!-- <view class="imgs img1"></view> -->
									<view class="titles">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.liuheKing') }}
									</view>
									<view class="tips1">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.currentHeartWaterCount') }}
									</view>
									<view class="numbers">198</view>
								</view>
								<view class="items1" @click="qidai">
									<image src="/static/img/market/icon-2.png" mode=""></image>
									<view class="titles">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.winStreakList') }}
									</view>
									<view class="tips1">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.currentHeartWaterCount') }}
									</view>
									<view class="numbers">49</view>
								</view>
								<view class="items1" @click="qidai">
									<image src="/static/img/market/icon-3.png" mode=""></image>
									<view class="titles">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.historyChampion') }}
									</view>
									<view class="tips1">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.currentHeartWaterCount') }}
									</view>
									<view class="numbers">34</view>
								</view>
								<view class="items1" @click="qidai">
									<image src="/static/img/market/icon-4.png" mode=""></image>
									<view class="titles">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.expertStatistics') }}
									</view>
									<view class="tips1">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.currentHeartWaterCount') }}
									</view>
									<view class="numbers">161</view>
								</view>
							</view>
						</view>

						<view class="noexpert">
							<view class="item">
								<image src="@/static/img/market/icon-9.png"></image>
								<view @click="qidai">
									<span>{{ $t('components.CommonPages.pages-luntan.LuntanMarket.applyExpert') }}</span>
									<view class="apply">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.clickToEnter') }}
										<!-- <view class="apply">{{ $t('components.CommonPages.pages-luntan.LuntanMarket.applyExpert') }} -->
									</view>
								</view>
							</view>
							<view class="item">
								<image src="@/static/img/market/icon-10.png"></image>
								<view @click="qidai">
									<span>{{ $t('components.CommonPages.pages-luntan.LuntanMarket.campaignExpert') }}</span>
									<view class="apply">
										{{ $t('components.CommonPages.pages-luntan.LuntanMarket.clickToEnter') }}
									</view>
								</view>
							</view>
						</view>


						<!--底部-->
					</view>
				</view>
				<view style="background: var(--theme-auxiliary-color-default);padding-top: 20rpx">
					<view class="list-block">
						<uni-list>
							<uni-list-item  v-for="(item, index) in navArr" :show-extra-icon="true" showArrow
								:thumb="item.leftImg" thumb-size="base" :title="item.title" clickable @click="toUrl(item.url)" />
						</uni-list>
					</view>
					<view name="fillbox" :style="{height:`var(--tabBarHeight)`,width:`100%`,background:'#fff'} "></view>
				</view>

			</scroll-view>
			<view class="footer">
				<component :is="componentTabBar" :current="1" />
			</view>
			<AlertInjectLayer />
		</view>
	</view>
</template>

<script>
	import TabBarLuntan from '@/components/Tabbar/Luntan'
	import TabBarAll from "@/components/common/tabbar/TabBar";
	import NavBar from "@/components/common/navBar/navBar.vue"
	import {
		noticeList
	} from '@/utils/common/index'
	import {
		notice
	} from '@/utils/common/index'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue";
	import {
		mapGetters
	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			TabBarLuntan,
			TabBarAll,
			NavBar,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				headerStyle: {
					backgroundColor: '#fff',
				},
				title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.market'),
				noticeInfo: [],
				navArr: [{
						leftImg: '/static/img/market/icon-5.png',
						title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.myFollow'),
						url: '/pages/common/userCenter/mycare/index',
					},
					{
						leftImg: '/static/img/market/icon-6.png',
						title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.myFans'),
						url: '/pages/common/userCenter/fans/index',
					},
					// {
					//     leftImg: '/static/img/market/gm.png',
					//     title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.purchaseRecords'),
					//     url: '',
					// }, {
					//     leftImg: '/static/img/market/ml.png',
					//     title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.sellRecords'),
					//     url: '',
					// },
					{
						leftImg: '/static/img/market/icon-7.png',
						title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.myReports'),
						url: '/pages/common/userCenter/reportRecord/index',
					},
					{
						leftImg: '/static/img/market/icon-8.png',
						title: this.$t('components.CommonPages.pages-luntan.LuntanMarket.helpInstructions'),
						url: '/pages/liuhe/help/index',
					}
				],
				winHeight: 0,
			}
		},
		mounted() {
			let _this = this;
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			uni.$on("onWindowResize", function(sizeInfo) {
				_this.winHeight = sizeInfo.size.windowHeight;
			});
		},
		computed: {
			...mapGetters(["themeColor"]),
			componentTabBar() {
				const nameMap = {
					ALL: 'TabBarAll',
					LUNTAN: 'TabBarLuntan'
				}
				return nameMap[this.$config.station]
			},
			pageSize() {
				return this.winHeight;
			},
			noticeTextList() {
				let noticeTextList = this.noticeInfo ? this.noticeInfo.map(item => item.noticeContent.replace(/\n/g, "")) :
					[];
				return noticeTextList;
			},
			userInfo() {
				return this.$store.state.appInfoStore.userInfo
			},
			//是否登录
			isLogin() {
				return this.userInfo != null;
			},
		},
		methods: {
			_onShow() {
				uni.hideTabBar()
			},
			_onLoad() {
				this.noticeList()
			},
			noticeList() {
				let prams = {
					position: 3
				}
				notice(prams).then(res => {
					this.noticeInfo = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			qidai() {
				pop(this.$t('components.CommonPages.pages-luntan.LuntanMarket.comingSoon'), 2000)
			},
			isTestUser() {
				if (['sign','demo'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage',
						data: 'demo'
					})
					return false
				}
				return true
			},

			async toUrl(url) {
				if (!isLogin()||(!this.userInfo || ['sign','demo'].includes(this.userInfo.userType))){
					console.log("showPop")
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		/*height: calc(100vh - 88rpx - var(--tabBarHeight));*/
		/*flex: 1;*/
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
		/*padding-bottom: 132rpx;*/
		background: #fff;

	}


	.mint-tab-container-item {

		background: var(--theme-auxiliary-color-default);
		height: 667px;
		display: flex;
		flex-direction: column;

		::v-deep .header {
			.center {

				font-weight: 500 !important;
			}
		}

		.taoliao {
			// margin-top: 20rpx;
			border-radius: 24rpx;
			background-color: #fff;
			padding: 20rpx 28rpx;

			.title-div {
				display: flex;
				// height: 80rpx;
				align-items: center;
				justify-content: center;

				.left {


					image {
						height: 25rpx;
						width: 104rpx;
					}
				}

				.right {
					width: 100%;
					// font-weight: 400;
					// font-size: 25rpx;
					// line-height: 35rpx;
					// color: #3881A8;
					margin-top: -12rpx;
					color: #404040;

					font-size: 28rpx;
					font-weight: 400;


					overflow: hidden;
					white-space: nowrap;




					.notice {
						animation: u-loop-animation 10s linear infinite;
						height: 100%;
						align-items: center;
						display: inline-block;

						.notice-item {
							display: inline-block;
							// line-height: 40rpx;
							// color: rgb(239, 81, 81);
							// font-size: 14px;
							/*margin-right: 594rpx;*/
							color: #404040;

							font-size: 28rpx;
							font-weight: 400;
						}

					}

					@keyframes u-loop-animation {
						0% {
							transform: translate3d(0, 0, 0);
						}

						100% {
							transform: translate3d(-100%, 0, 0);
						}
					}
				}
			}

			.main-box {
				box-sizing: border-box;
				// border-top: 2rpx solid #ededed;
				margin-top: 20rpx;

				.tips-box {

					.notices {
						display: flex;
						flex-direction: row;
						align-items: flex-start;
						padding: 20rpx;
						position: static;
						left: 20rpx;
						top: 20rpx;
						border: 2rpx solid var(--theme-color);
						box-sizing: border-box;
						border-radius: 24rpx;

						background: linear-gradient(180deg, var(--theme-auxiliary-color-linear-gradient-start) 0%, var(--theme-auxiliary-color-linear-gradient-end) 100%);

						color: #404040;

						font-size: 30rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 44rpx;
						/* 146.667% */
					}
				}

				.items {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;

					.items1 {
						display: flex;
						flex-direction: column;
						// justify-content: center;
						align-items: center;

						image {
							width: 68rpx;
							height: 68rpx;
						}




						.titles {
							color: #404040;

							font-size: 28rpx;
							font-style: normal;
							font-weight: 400;
							margin-top: 10rpx;
							// line-height: 44rpx;
							/* 169.231% */
						}

						.tips1 {
							color: #404040;

							font-size: 26rpx;
							font-style: normal;
							font-weight: 400;
							margin-top: 0;
							// line-height: 44rpx;
							/* 169.231% */
						}

						.numbers {
							color: var(--theme-auxiliary-color-remind);

							font-size: 26rpx;
							font-style: normal;
							font-weight: 500;
							margin-top: 0;
							/* 169.231% */
						}
					}
				}
			}

			.noexpert {
				background: #fff;
				display: flex;
				flex-direction: row;
				height: 160rpx;
				color: #fff;
				width: 100%;
				margin: auto;
				margin-bottom: 20rpx;
				justify-content: space-between;
				margin-top: 20rpx;

				.item {
					width: 338rpx;
					display: flex;
					justify-content: center;
					background: var(--theme-color);
					align-items: center;
					// width: 47%;
					border-radius: 16rpx;

					image {
						height: 68rpx;
						width: 68rpx;
						margin-right: 40rpx;
					}

					uni-view {
						display: flex;
						flex-direction: column;

						span {
							font-size: 36rpx;
							font-weight: 700;
							color: #fff;
							margin-bottom: 4rpx;
						}

						.apply {
							position: static;
							// width: 160rpx;
							// height: 50rpx;
							width: 124rpx;
							height: 52rpx;

							color: #FFF;

							font-size: 26rpx;
							font-style: normal;
							font-weight: 400;
							border-radius: 12rpx;
							border: 2rpx solid #fff;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-top: 10rpx; // left: 514rpx;
							// font-size: 28rpx;
							// line-height: 50rpx;
							// text-align: center;
							// border: 2rpx solid #fff;
							// box-sizing: border-box;
							// border-radius: 60rpx;
						}
					}
				}
			}

		}

		.list-block {
			/*margin-top: 20rpx;*/
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			// border-radius: 24rpx;
			overflow: hidden;
			padding-bottom: 80rpx;
			box-sizing: border-box;
			background-color: #fff;
			padding: 0 28rpx;

			::v-deep .uni-list--border-top {
				display: none;
			}

			::v-deep .uni-list-item__container {
				padding: 34rpx 0;
			}

			::v-deep .uniui-arrowright {
				padding: 0;
			}

			::v-deep .uni-list-item__icon {
				margin-right: 0;

				.uni-list--base {
					width: 48rpx;
					height: 48rpx;
				}
			}

			::v-deep .uni-list-item__content-title {
				color: #404040;

				font-size: 28rpx;
				font-weight: 400;
			}
		}
	}


	.van-notice-bar {
		position: relative;
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 16px;
		color: rgb(239, 81, 81);
		font-size: 14px;
		line-height: 24px;
		background-color: #fffbe8;

		.van-notice-bar__wrap {
			width: 100%;
			display: block;
			height: 100%;
			overflow: hidden;
			white-space: nowrap;
			animation: scroll 20s linear infinite;
			/*滚动动画*/
		}

		.van-notice-bar__content {
			white-space: nowrap;
			width: 100%;
			height: 100%;
			line-height: 80rpx;
			display: inline-block;
		}
	}




	@keyframes scroll {
		from {
			transform: translateX(630rpx);
			/*div多宽就写多宽*/
		}

		to {
			transform: translateX(-100%);
		}
	}



	.spans {
		height: 12rpx;
		background: #f2f2f2;
	}

	.footer {
		height: 50px;
		/*background-color: #fff;*/
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
