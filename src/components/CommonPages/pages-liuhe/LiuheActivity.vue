<template>
	<view class="activity"
		:style="{ position: `fixed`, height: `${uWindowHeight}px`, marginTop: safeHeight, width: '100%' }"
		:class="['theme-' + themeColor.name,{ 'show-tabbar': showTabBar }]">
		<Header :title="title">

		</Header>
		<!--    <view class="menu-box">
        <view class="menu-item" :class="{active:type==item.type}" v-for="(item,index) in menu" @click="selectType(item)">
          {{item.name}}
        </view>
      </view>-->

		<view class="list-row" scroll-y="true" :class="['theme-' + themeColor.name]">
			<scroll-view class="menu-box" scroll-y="true" :style="{maxHeight:`calc( ${uWindowHeight}px - 140rpx )`}">
				<view class="menu-item" v-for="(item, index) in cat" @click="selectType(item, index)"
					:class="{ active: curr == index }">
					<image :src="`/static/imgs-liuhe/activity/cate/${item.id}${curr == index ? '_ac' : ''}.png`">
					</image>
					<text class="title">
						{{ item.name }}
					</text>
				</view>
				<view class="lq-btn" @click="getReceiveAll">
					{{ $t('components.CommonPages.pages-liuhe.LiuheActivity.ClaimAll') }}
				</view>
				<view class="jl-btn" @click="ToLog">
					{{ $t('components.CommonPages.pages-liuhe.LiuheActivity.ClaimRecords') }}
				</view>
			</scroll-view>
			<z-paging
				:style="{ height: `calc(${uWindowHeight}px - ${isApp?100:70}rpx - ${showTabBar ? '160' : '60'}rpx)` }"
				class="paging" ref="paging" v-model="lists" @query="getList" :lower-threshold="10"
				:refresher-enabled="true" :refresherAnimated="false"
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
				:loading-more-no-more-text="$t('components.CommonPages.pages-liuhe.LiuheActivity.NoMoreData')"
				:hide-empty-view="false" :empty-view-center="true"
				:empty-view-text="$t('components.CommonPages.pages-liuhe.LiuheActivity.NoRecords')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '260rpx', 'height': '260rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<view class="list-box" :style="{paddingBottom: `${isApp?0:0}px`}">
					<view class="list-item" v-for="( item, index ) in  lists " @click="detail(item)">
						<view class="img">
							<image :src="item.img" style="width: 100%;max-height: 212rpx;display: block;"
								mode="widthFix"></image>
							<view class="status" :class="item.sector == 0 ? 'jx' : item.sector == 1 ? 'wks' : 'over'"
								:style="{ color: item.timeStatus[1] }">
								<span>{{ item.timeStatus[0] }}</span>
							</view>
						</view>
						<view class="desc">
							<view class="title">{{ item.name }}</view>
							<view class="time">{{ item.dateRange }}</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<TabBar :current="1" v-if="showTabBar" />
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import {
		list,
		types,
		receiveAll
	} from "@/utils/activity/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import TabBar from '@/components/Tabbar/Liuhe'
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "index",
		components: {
			TabBar,
			AlertInjectLayer,
			Header
		},
		computed: {
			...mapGetters(['themeColor', "uWindowHeight"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			userInfo() {
				return this.$store.state.appInfoStore?.userInfo || {}
			},
		},
		props: {
			showTabBar: Boolean
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("components.CommonPages.pages-liuhe.LiuheActivity.title"),
				headerStyle: {
					backgroundColor: "#fff",
					'border-radius': '0 0 20rpx 20rpx',
					height: '88rpx'
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#404040"
				},
				curr: 0,
				type: 1,
				cat: [],
				menu: [{
						"name": this.$t('components.CommonPages.pages-liuhe.LiuheActivity.All'),
						type: 0
					},
					{
						"name": this.$t('components.CommonPages.pages-liuhe.LiuheActivity.LatestActivities'),
						type: 1
					},
					{
						"name": this.$t('components.CommonPages.pages-liuhe.LiuheActivity.LotteryTasks'),
						type: 2
					},
					{
						"name": this.$t('components.CommonPages.pages-liuhe.LiuheActivity.GameTasks'),
						type: 3
					}
				],
				projectType: 1,
				lists: [],
				winHeight: 0,
				isApp: false
			}
		},
		methods: {
			_onLoad(option) {
				this.winHeight = uni.getSystemInfoSync().windowHeight;
				this.getType()
				this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			},
			backPage() {
				backPage()
			},
			selectType(item, index) {
				this.curr = index
				this.type = item.id
				this.$refs.paging.reload()
			},
			detail(item) {
				if (!isLogin()) {
					uni.navigateTo({
						url: "/pages/common/login"
					})
					return false
				}
				uni.navigateTo({
					url: "/pages/liuhe/activity/detail?id=" + item.id
				})
			},
			getType() {
        let _this=this;
				types().then(res => {
          _this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netResp)=>{ this.cat = netResp.result},this);
          if (res.code == 200) {
						this.cat = res.result
					} else {
						pop(res.message, 2000);
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getList(pageNum, pageSize = 10) {
				let prams = {
					type: this.type,
					pageNum: pageNum,
					pageSize: pageSize
				}
				list(prams).then(res => {
					if (res.code == 200) {
						this.$refs.paging.complete(res.result.records)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getReceiveAll() {
				if (!isLogin() || ['sign'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertMessage'
					})
					return false
				}
				let that = this;
				let prams = {
					type: this.type
				}
				uni.showLoading({mask: true})
				receiveAll(prams).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						pop(that.$t('components.CommonPages.pages-liuhe.LiuheActivity.ClaimedSuccessfully'), 2000)
					} else {
						pop(res.message, 2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			ToLog() {
				uni.navigateTo({
					url: "/pages/liuhe/activity/log"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity {
		background: #fff;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		overflow: hidden;
		height: var(--vh);
		position: relative;
		max-width: 480px;

		.list-row {
			position: relative;
			display: flex;
			padding: 20rpx 28rpx;
			background: #fff;
			margin-top: 20rpx;
			border-radius: 24rpx 24rpx 0 0;

			.menu-box {
				width: 160rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				//height: calc(var(--vh) - 140rpx);
				overflow: auto;
				flex-shrink: 0;
				margin-right: 20rpx;


				.menu-item {
					width: 160rpx;
					height: 104rpx;
					border-radius: 16rpx;
					padding: 16rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					background: var(--theme-auxiliary-color-default);
					margin-bottom: 20rpx;
					flex-shrink: 0;

					image {
						height: 44rpx;
						width: 44rpx;
						flex-shrink: 0;
					}

					.title {
						font-weight: 400;
						color: #404040;
						margin-top: 8rpx;
						text-align: center;

						font-size: 26rpx;
						font-weight: var(--theme-font-default-deep-color);
					}
				}

				.menu-item.active {
					background: var(--theme-color);

					.title {
						color: #FFFFFF;
					}
				}

				.lq-btn,
				.jl-btn {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 120rpx;
					height: 50rpx;
					border-radius: 10rpx;
					font-style: normal;
					font-weight: 400;
					color: #FFFFFF;
					flex-shrink: 0;

					width: 160rpx;
					height: 68rpx;
					border-radius: 8rpx;
				}

				.lq-btn {
					background: #00D609;
					color: #FFF;
					text-align: center;

					font-size: 26rpx;
					font-weight: 400;
				}

				.jl-btn {
					margin-top: 20rpx;
					background: #1592FF;
					color: #FFF;
					text-align: center;

					font-size: 26rpx;
					font-weight: 400;
				}
			}
		}

		.list-box {
			display: flex;
			flex-direction: column;

			.list-item:first-child {
				margin-top: 0rpx !important;
			}

			.list-item {
				margin-bottom: 20rpx;
				min-height: 276rpx;
				max-height: 400rpx;
				background: #fff;
				border-radius: 24rpx;
				overflow: hidden;

				.img {
					position: relative;

					.status {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 84rpx;
						height: 40rpx;
						font-weight: 500;
						font-size: 24rpx;
						display: grid;
						place-content: center;
						color: #FFFFFF;

						span {
							/*transform: scale(0.75);*/
						}

						border-radius: 16rpx 0px 0px 0px;
					}

					.jx {
						background: rgba(64, 72, 68, 0.70);
					}

					.wks {
						background: rgba(0, 0, 0, 0.5);
						color: #5CFFB1;
					}

					.over {
						background: rgba(0, 0, 14, 0.7);
					}
				}

				.desc {
					height: 68rpx;
					width: 514rpx;
					display: flex;
					align-items: center;
					background: var(--theme-auxiliary-color-default);
					border-radius: 0 0 10rpx 10rpx;

					.title {
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						font-weight: 400;
						font-size: 28rpx;
						color: var(--theme-font-default-deep-color);
						margin-left: 20rpx;
						white-space: nowrap;
					}

					.time {
						width: 50%;
						display: flex;
						justify-content: flex-end;
						font-weight: 400;
						font-size: 24rpx;
						color: var(--theme-font-default-shallow-color);
						margin-right: 20rpx;
						white-space: nowrap;
					}
				}
			}
		}
	}

	.show-tabbar {
		height: calc(var(--vh) - 60rpx);
	}

	::v-deep .header {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;
	}

	::v-deep .uni-navbar__header {
		padding: 0 28rpx;
		height: 88rpx !important;
	}
</style>
