<template>
	<view class="mint-tab-container-item" :style="{ marginTop: safeHeight,height:`${winHeight}px`,position: `fixed`,width:'100%' }"
		:class="['theme-' + themeColor.name]">
		<Header :title="title" :isFixed="true">
			<block slot="right">
				<view class="uni-list-cell-db" style="display:flex;justify-content: flex-end;">
					<text class="uni-subtitle">{{ $t('pages.common.informationCount.liuhe.text0') }}</text>
					<input class="uni-input" v-model="period" @blur="summary" @confirm="summary" />
				</view>
			</block>
		</Header>
		<!--顶部导航栏-->
		<!-- 	<nav-bar :isBack="true" :goHome="false" :title="title">

			<block slot="right">
				<view class="uni-list-cell-db">
					<text class="uni-subtitle">{{ $t('pages.common.informationCount.liuhe.text0') }}</text>
					<input class="uni-input" v-model="period" @blur="summary" @confirm="summary" />
				</view>
			</block>
		</nav-bar> -->

		<!--列表-->
		<LuntanLoading class="loading" v-if="loading" />
		<template v-else>
			<scroll-view scroll-y class="scroll-y" v-if="Object.keys(this.lists).length > 0"
				:style="{height:`calc(${winHeight}px - 88rpx - 196rpx - var(--safe-area-inset-bottom))`}">
				<view class="container-wrap">
					<view class="top-wrap">
						<h4>{{ $t('pages.common.informationCount.liuhe.text1') }}</h4>
						<view class="color-wrap">
							<view v-for="(item, index) in lists.specialHotNumberList" :key="index"
								:class="classd[item.color - 1]">
								{{ item.number }}
							</view>
						</view>
					</view>
					<view class="top-wrap">
						<h4>{{ $t('pages.common.informationCount.liuhe.text2') }}</h4>
						<view class="color-wrap">
							<view v-for="(item, index) in lists.specialColdNumberList" :key="index"
								:class="classd[item.color - 1]">
								{{ item.number }}
							</view>
						</view>
					</view>
					<view class="top-wrap">
						<h4>{{ $t('pages.common.informationCount.liuhe.text4') }}</h4>
						<view class="color-wrap">
							<view v-for="(item, index) in lists.normalHotNumberList" :key="index"
								:class="classd[item.color - 1]">
								{{ item.number }}
							</view>
						</view>
					</view>
					<view class="top-wrap">
						<h4>{{ $t('pages.common.informationCount.liuhe.text3') }}</h4>
						<view class="color-wrap">
							<view v-for="(item, index) in lists.normalColdNumberList" :key="index"
								:class="classd[item.color - 1]">
								{{ item.number }}
							</view>
						</view>
					</view>
				</view>
				<view class="container-wrap">
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text5') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialHotAnimalList" :key="index">
								<view>{{ item.name }}</view>
								<view class="text-block-line" v-if="index+1< lists.specialHotAnimalList.length">
									|
								</view>
							</view>

						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text6') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialColdAnimalList" :key="index">
								<view>{{ item.name }}</view>
								<view class="text-block-line" v-if="index+1< lists.specialColdAnimalList.length">
									|
								</view>
							</view>
						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text8') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.normalHotAnimalList" :key="index">
								<view>{{ item.name }}</view>
								<view class="text-block-line" v-if="index+1< lists.normalHotAnimalList.length">
									|
								</view>
							</view>
						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text7') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.normalColdAnimalList" :key="index">
								<view>{{ item.name }}</view>
								<view class="text-block-line" v-if="index+1< lists.normalColdAnimalList.length">
									|
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="container-wrap">
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text9') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialHotColorList" :key="index">
								<view :class="classd[item.key - 1]">
									{{item.value }}
								</view>
								<view class="text-block-line" v-if="index+1< lists.specialHotColorList.length">
									|
								</view>
							</view>
						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text10') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialColdColorList" :key="index">
								<view :class="classd[item.key - 1]">
									{{item.value }}
								</view>
								<view class="text-block-line" v-if="index+1< lists.specialColdColorList.length">
									|
								</view>
							</view>

						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text11') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.normalHotColorList" :key="index">
								<view :class="classd[item.key - 1]">
									{{item.value }}
								</view>
								<view class="text-block-line" v-if="index+1< lists.normalHotColorList.length">
									|
								</view>
							</view>

						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text12') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.normalColdColorList" :key="index">
								<view :class="classd[item.key - 1]">
									{{item.value }}
								</view>
								<view class="text-block-line" v-if="index+1< lists.normalColdColorList.length">
									|
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="container-wrap">
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text13') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialHotTailList" :key="index">
								<view>{{ item.name }}尾</view>
								<view class="text-block-line" v-if="index+1< lists.specialHotTailList.length">
									|
								</view>
							</view>
						</view>
					</view>
					<view class="bottom-wrap">
						<view class="title">{{ $t('pages.common.informationCount.liuhe.text14') }}</view>
						<view class="text">
							<view class="text-block" v-for="(item, index) in lists.specialColdTailList" :key="index">
								<view>{{ item.name }}尾</view>
								<view class="text-block-line" v-if="index+1< lists.specialColdTailList.length">
									|
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<empty v-else></empty>
		</template>
		<!--底部-->
		<view class="footer">
			<count-fab :lotterytype="lotteryType"></count-fab>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import CountFab from "@/components/common/fab/CountFab"
	import Empty from "@/components/common/empty/empty"
	import NavBar from "@/components/common/navBar/navBar.vue"
	import {
		summary
	} from "@/utils/zxcount";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	export default {
		name: "liuhe",
		components: {
			AlertInjectLayer,
			Empty,
			CountFab,
			NavBar,
			Header
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: 1,
				title: this.$t('pages.common.informationCount.liuhe.title'),
				period: 100,
				lists: [],
				classd: ['red', 'blue', 'green'],
				winHeight: 0
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		onLoad(option) {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
			uni.onWindowResize(() => {

				this.winHeight = uni.getSystemInfoSync().windowHeight;
			})
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('argParams', function(data) {
				this.lotteryType = data.lotteryType
			})
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE)
			// if (this.lotteryType == 1) {
			// 	this.title = this.$t('pages.common.informationCount.liuhe.text15') + this.title
			// } else if (this.lotteryType == 2) {
			// 	this.title = this.$t('pages.common.informationCount.liuhe.text16') + this.title
			// } else if (this.lotteryType == 5) {
			// 	this.title = this.$t('pages.common.informationCount.liuhe.text17') + this.title
			// } else if (this.lotteryType == 3) {
			// 	this.title = this.$t('pages.common.informationCount.liuhe.text18') + this.title
			// } else {
			// 	this.title = this.$t('pages.common.informationCount.liuhe.text19') + this.title
			// }
			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.summary()
		},
		methods: {
			//返回
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},

			summary: function() {
				this.loading = true
				let prams = {
					period: this.period
				}
				summary(prams).then(res => {
          this.$requestCache.bindLastCacheUpdateApiCallBack(res,(netres)=>{ this.lists = netres.result },this)
					this.lists = res.result || []
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.header-box,
	.header,
	.box-bg {
		height: 46px;
	}

	.input-view {
		font-size: 16px;
	}

	.uni-subtitle {
		font-size: 14px;
	}

	.loading {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.scroll-y {
		/* height: calc(var(--vh) - 290rpx); */
		margin-top: 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.container-wrap {
		box-sizing: border-box;
		padding: 0 28rpx;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
		background: #fff;
	}

	.container-wrap .top-wrap {
		border-bottom: 1px solid var(--theme-auxiliary-color-default);
	}

	.top-wrap:first-of-type h4 {
		padding-top: 0;
	}

	.container-wrap .top-wrap h4 {
		color: #404040;

		font-size: 28rpx;


		font-weight: 400;
		/* line-height: 34rpx; */
		padding-top: 20rpx;
	}



	.container-wrap .color-wrap {
		padding: 0 0 20rpx 0;
		flex-wrap: wrap;
		display: flex;
		/* justify-content: space-between; */
	}

	.color-wrap uni-view {
		text-align: center;
		height: 68rpx;
		width: 68rpx;
		line-height: 72rpx;
		font-size: 32rpx;
		font-weight: 600;
		/* text-indent: -4rpx; */
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.color-wrap uni-view:first-child {
		margin-left: 0;
	}

	.color-wrap uni-view:nth-child(9),.color-wrap uni-view:nth-child(17),.color-wrap uni-view:nth-child(25) {
		margin-left: 0;
	}

	.color-wrap .blue {
		background: url('@/static/img/qiu/2.png');
		background-size: 100% 100%;
	}

	.color-wrap .red {
		background: url('@/static/img/qiu/1.png');
		background-size: 100% 100%;
	}

	.color-wrap .green {
		background: url('@/static/img/qiu/3.png');
		background-size: 100% 100%;
	}

	.container-wrap .bottom-wrap {
		/* display: flex; */
		padding: 20rpx 0;
		border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
	}

	.container-wrap .bottom-wrap .title {
		/* font-size: 24rpx; */
		color: var(---, #A1A1A1);

		font-size: 28rpx;
		font-weight: 400;
	}

	.container-wrap .bottom-wrap>uni-view {
		flex: 1;
		color: #404040;
		/* line-height: 42rpx; */
	}

	.container-wrap .bottom-wrap .text {
		display: flex;
		margin-top: 20rpx;

		color: #404040;

		font-size: 30rpx;
		font-weight: 500;
	}

	.text-block {
		display: flex;
	}

	.text-block-line {
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.text .red {
		color: #f05a5a;
	}

	.text .blue {
		color: #2f85dd;
	}

	.text .green {
		color: #18cf32;
	}

	.footer {
		height: 85px;
	}

	.uni-input {
		background-color: var(--theme-auxiliary-color-default);
		border: none;
		color: var(---, #404040);
		font-size: 30rpx;
		font-weight: 500;
		border-radius: 12rpx;
		background: #F4F4F4;
	}
</style>
