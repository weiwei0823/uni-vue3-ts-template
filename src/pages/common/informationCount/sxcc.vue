<template>
	<view class="mint-tab-container-item pc-max-width"
		:style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'  }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<!-- 	<nav-bar :isBack="true">
			<view class="input-view" slot="title">{{ title }}</view>
		</nav-bar> -->

		<Header :title="title" :isFixed="true">

		</Header>
		<!--列表-->

		<LuntanLoading class="loading" v-if="loading" />
		<template v-else>
			<view class="mint-tab-container-item" style="margin-top: 20rpx;">
				<view class="tab-wrap">
					<view class="tab-class">
						<view v-for="(item, index) in nvaList" :key="index" :class="isActive == index ? 'active' : ''"
							@click="isActive = index">
							{{ item }}
						</view>
					</view>
				</view>
				<scroll-view scroll-y class="scroll-y" :style="{height:`calc(${winHeight}px - 88rpx - 266rpx - var(--safe-area-inset-bottom))`}"
					:enhanced="true" :bounces="false" :show-scrollbar="false">
					<view class="container-wrap wrap2-1" v-show="isActive == 0">
						<view class="container2-wrap wrap2-1" v-for="(item, index) in colorList">
							<h4>{{ item.name }}</h4>
							<view class="color-wrap span-wrap">
								<view v-for="(val, key) in item.list">
									<span :class="classd[val.color - 1]">{{ val.number }}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="container-wrap wrap2-2" v-show="isActive == 1">
						<view class="container2-wrap" v-for="(item, index) in shengxiaoList" :key="index">
							<view class="color-wrap span-wrap"><i>{{ item.name }}</i>
								<view v-for="(val, key) in item.list">
									<span :class="classd[val.color - 1]">{{ val.number }}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="container-wrap wrap2-3" v-show="isActive == 2">
						<view class="container2-wrap" v-for="(item, index) in wuxingList">
							<h4>{{ item.name }}</h4>
							<view class="color-wrap span-wrap">
								<view v-for="(val, key) in item.list">
									<span :class="classd[val.color - 1]">{{ val.number }}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="container-wrap wrap2-4" v-show="isActive == 3">
						<view class="container2-wrap" v-for="(item, index) in animalTypeList">
							<view class="animal" style="display: flex;">
								<span>{{ item.name }}</span>
								<span v-for="(val, key) in item.list" v-if="key == 0">{{ val }}</span>
								<span v-else style="display: flex;">

									<view style="margin:0 10rpx;">|</view> {{ val }}
								</span>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
		<!--底部-->

		<view class="footer">
			<count-fab :lotterytype="lotteryType"></count-fab>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import CountFab from "@/components/common/fab/CountFab"
	import {
		attrConstant
	} from "@/utils/zxcount";
	import NavBar from "@/components/common/navBar/navBar.vue"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import Header from '@/components/common/header/index.vue';
	export default {
		name: "sxcc",
		components: {
			AlertInjectLayer,
			CountFab,
			NavBar,
			Header
		},
		computed: {
			...mapState(AppInfoStore, ['themeColor']),
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		data() {
			return {
				loading: false,
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				lotteryType: 1,
				title: this.$t('pages.common.informationCount.sxcc.title'),
				period: 100,
				lists: [],
				classd: ['red', 'blue', 'green'],
				isActive: 0,
				nvaList: [this.$t('pages.common.informationCount.sxcc.text0'), this.$t(
					'pages.common.informationCount.sxcc.text1'), this.$t(
					'pages.common.informationCount.sxcc.text2'), this.$t(
					'pages.common.informationCount.sxcc.text3')],
				animalTypeList: [], //家禽野兽
				colorList: [], //波色
				shengxiaoList: [], //生肖
				wuxingList: [], //五行
				winHeight: 0,
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad(option) {
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

			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.attrConstant()
		},
		methods: {
			//返回
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			//列表请求
			attrConstant: function() {
				this.loading = true
				attrConstant().then(res => {
					let data = res.result
					this.animalTypeList = data.animalTypeList //家禽野兽
					this.colorList = data.colorList //波色
					this.shengxiaoList = data.shengxiaoList //生肖
					this.wuxingList = data.wuxingList //五行
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

	.header-box {
		border-bottom: 2px solid #ebedf0;
	}

	.footer {
		height: 85px;
	}

	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.mint-tab-container-item {
		-ms-flex-negative: 0;
		flex-shrink: 0;
		width: 100%;
	}

	.input-view {
		font-size: 16px;
	}

	.uni-subtitle {
		font-size: 14px;
	}

	.tab-wrap {
		display: flex;
		justify-content: space-between;
		/* line-height: 100rpx; */
		/* height: 100rpx; */
		font-size: 32rpx;
		color: #404040;
		text-align: center;
		background: #fff;
		/* margin-top: 20rpx; */
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;
		padding-top: 20rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;

	}

	.tab-class {
		width: 100%;
		display: flex;
		background-color: var(--theme-auxiliary-color-default);
		padding: 10rpx 6rpx;
		border-radius: 16rpx;
	}

	.tab-class>view {
		color: #404040;

		font-size: 28rpx;
		font-weight: 400;
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56rpx;

	}

	.tab-wrap>uni-view {
		flex: 1;
	}

	.tab-wrap .active {
		color: var(--theme-color);
		background-color: #fff;
		border-radius: 12rpx;
	}

	.container-wrap {
		box-sizing: border-box;
		/* padding: 0 12px; */
		/* margin-top: 6px; */
		padding: 0 28rpx;
		background: #fff;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
	}

	.container-wrap .container2-wrap:last-child {
		border-bottom: none !important;
	}

	.container2-wrap {
		padding-bottom: 12rpx;
		border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
	}

	.container2-wrap:first-of-type>h4 {
		/* padding-top: 0; */
	}

	.container2-wrap>h4 {
		/* 	font-size: 24rpx;
		line-height: 34rpx;
		padding: 18rpx 0 26rpx;
		color: #404040;
		font-weight: 400; */
		padding: 20rpx 0;
		color: #404040;

		font-size: 28rpx;
		font-weight: 400;
	}

	.container2-wrap .color-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 20rpx;
	}

	.color-wrap>uni-view {
		/* width: 10%; */
		width: 68rpx;
		height: 68rpx;
		text-align: left;
		margin-bottom: 10px;
	}

	.color-wrap .red {
		background: url("@/static/img/qiu/1.png");
		background-size: 100% 100%;
	}

	.color-wrap.span-wrap>uni-view>span.blue,
	.color-wrap:not(.span-wrap)>uni-view.blue {
		background: url("@/static/img/qiu/2.png");
		background-size: 100% 100%;
	}

	.color-wrap.span-wrap>uni-view>span.green,
	.color-wrap:not(.span-wrap)>uni-view.green {
		background: url("@/static/img/qiu/3.png");
		background-size: 100% 100%;
	}

	.color-wrap.span-wrap>uni-view>span {
		display: block;
	}

	.color-wrap.span-wrap>uni-view>span,
	.color-wrap:not(.span-wrap)>uni-view {
		background-size: cover;
		text-align: center;
		height: 68rpx;
		width: 68rpx;
		line-height: 72rpx;

		color: #000;
		text-align: center;

		font-size: 32rpx;
		font-weight: 600;
	}

	.red {
		color: red;
	}

	.container-wrap.wrap2-2 .container2-wrap {
		padding: 20rpx 0;
	}

	.container-wrap.wrap2-2 {
		padding: 0 24rpx;
	}

	.container-wrap.wrap2-2 .container2-wrap .color-wrap>i {
		/* display: inline-block;
		margin-right: 20rpx;
		font-size: 30rpx;
		color: #404040;
		font-style: normal; */
		font-style: normal;
		display: inline-block;
		margin-right: 20rpx;
		color: #404040;

		font-size: 28rpx;
		font-weight: 400;
	}

	.container-wrap.wrap2-2 .container2-wrap .color-wrap>uni-view {
		margin-bottom: 0;
	}

	.container2-wrap .color-wrap>uni-view {
		/* width: 10%; */
		text-align: left;
		margin-bottom: 20rpx;
		/* margin-left: 20rpx; */
	}

	/* 	.container2-wrap .color-wrap>uni-view:first-child,
	.container2-wrap .color-wrap>uni-view:nth-child(9),
	.container2-wrap .color-wrap>uni-view:nth-child(17) {
		margin-left: 0;
	} */

	.container-wrap.wrap2-3 {
		padding: 0 24rpx;
	}

	.container-wrap.wrap2-3 .container2-wrap {
		padding: 24rpx 0 6rpx 0;
		position: relative;
	}

	.container-wrap.wrap2-3 .container2-wrap>h4 {
		position: absolute;
		top: 38rpx;
		width: 52rpx;
		font-size: 30rpx;
		left: 0;
		padding: 0;
	}

	.container-wrap.wrap2-3 .container2-wrap .color-wrap {
		width: calc(100% - 52rpx);
		margin-left: 52rpx;
	}

	.container-wrap.wrap2-3 .container2-wrap .color-wrap>uni-view {
		width: 12%;
	}

	.container-wrap.wrap2-4 {
		padding: 0 24rpx;
	}

	.container-wrap.wrap2-4 .container2-wrap {
		padding: 24rpx 0;
	}

	.container-wrap.wrap2-4 .container2-wrap .animal>span:first-of-type {
		/* font-size: 30rpx; */
		margin-right: 20rpx;

		color: #404040;

		font-size: 28rpx;
		font-weight: 400;
	}

	.container-wrap.wrap2-4 .container2-wrap .animal>span {
		font-size: 30rpx;
		font-weight: 700;
	}
</style>
