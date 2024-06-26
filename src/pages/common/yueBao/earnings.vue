<template>
	<view class="yeb-earnings" :style="{height: `${uWindowHeight}px`}" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<u-popup v-model="show" mode="top">
			<scroll-view class="type-list-scroll" scroll-x="true">
				<view class="type-list">
					<view class="item" :class="{ selected: item.value === type }" v-for="(item, index) in typeList"
						:key="index" @click="type = item.value">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<view class="btns">
				<view class="btn close" @click="close">{{ $t('pages.common.userCenter.yueBao.earnings.Cancel') }}</view>
				<u-line color="#E3E3E3" direction="col" />
				<view class="btn confirm" @click="confirm">{{ $t('pages.common.userCenter.yueBao.earnings.Confirm') }}
				</view>
			</view>
		</u-popup>
		<view class="y-header" :class="{ 'no-b-r': list.length }">
			<view class="left item" @click="handleOrderBy('type')">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.Type') }}</view>
				<svg :class="{
					transition: order === 'desc' && orderBy === 'type'
				}" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
					<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
					<path
						d="M8.53819 11.9777C9.13873 12.7498 10.3057 12.7498 10.9063 11.9777L14.0615 7.92091C14.8278 6.93562 14.1257 5.5 12.8775 5.5H6.56696C5.31873 5.5 4.6166 6.93562 5.38293 7.92091L8.53819 11.9777Z"
						fill="#A1A1A1" />
				</svg>
			</view>
			<view class="item" @click="handleOrderBy('amount')">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.Amount') }}</view>
				<svg :class="{
					transition: order === 'desc' && orderBy === 'amount'
				}" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
					<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
					<path
						d="M8.53819 11.9777C9.13873 12.7498 10.3057 12.7498 10.9063 11.9777L14.0615 7.92091C14.8278 6.93562 14.1257 5.5 12.8775 5.5H6.56696C5.31873 5.5 4.6166 6.93562 5.38293 7.92091L8.53819 11.9777Z"
						fill="#A1A1A1" />
				</svg>
			</view>
			<view class="item" @click="handleOrderBy('balance')">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.Balance') }}</view>
				<svg :class="{
					transition: order === 'desc' && orderBy === 'balance'
				}" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
					<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
					<path
						d="M8.53819 11.9777C9.13873 12.7498 10.3057 12.7498 10.9063 11.9777L14.0615 7.92091C14.8278 6.93562 14.1257 5.5 12.8775 5.5H6.56696C5.31873 5.5 4.6166 6.93562 5.38293 7.92091L8.53819 11.9777Z"
						fill="#A1A1A1" />
				</svg>
			</view>
			<view class="right item" @click="handleOrderBy('create_time')">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.Time') }}</view>
				<svg :class="{
					transition: order === 'desc' && orderBy === 'create_time'
				}" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
					<rect x="0.5" width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
					<path
						d="M8.53819 11.9777C9.13873 12.7498 10.3057 12.7498 10.9063 11.9777L14.0615 7.92091C14.8278 6.93562 14.1257 5.5 12.8775 5.5H6.56696C5.31873 5.5 4.6166 6.93562 5.38293 7.92091L8.53819 11.9777Z"
						fill="#A1A1A1" />
				</svg>
			</view>
		</view>

		<z-paging :style="{height: `calc(${uWindowHeight}px - 300rpx)`, background: 'var(--theme-auxiliary-color-default)'}"
			class="paging" ref="paging" v-model="list" @query="getList" :lower-threshold="10" :refresher-enabled="true"
			:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
			:refresher-default-text="zpageUIConfig['refresher-default-text']"
			:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
			:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
			:refresher-default-style="themeColor.themeAuxiliaryColorDefault"
			:refresher-img-style="zpageUIConfig['refresher-img-style']"
			:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
			:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
			:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
			:loading-more-custom-style="{ 'padding-top': '20rpx', 'background': themeColor.themeAuxiliaryColorDefault }"
			:loading-more-loading-animated="false" :loading-more-default-as-loading="true"
			:show-loading-more-no-more-view="true"
			:loading-more-no-more-text="$t('pages.common.userCenter.yueBao.earnings.NoMoreData')"
			:hide-empty-view="false" :empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="list-box">
				<view class="list" v-for="( item, index ) in  list " :key="index">
					<u-line class="line" :color="themeColor.themeAuxiliaryColorDefault" v-if="index > 0"
						border-style="dashed" />
					<view class="left item">{{ item.typeText }}</view>
					<view class="item center" :class="item.amount > 0 ? 'red' : 'green'">+{{ item.amount }}</view>
					<view class="item center">{{ item.balance }}</view>
					<view class="right item time">{{ $u.timeFormat(item.createTime, 'yyyy.mm.dd hh:MM:ss') }}</view>
				</view>
			</view>
		</z-paging>
		<view v-if="loading" class="loading">
			<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
			<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : "" }}
			</view>
		</view>
		<view class="statistical">
			<view class="item">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.YesterdayEarnings') }}</view>
				<view class="num">+{{ yesterdayProfit }}</view>
			</view>
			<view class="item">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.ThisWeekEarnings') }}</view>
				<view class="num">+{{ weekProfit }}</view>
			</view>
			<view class="item">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.earnings.TotalEarnings') }}</view>
				<view class="num">+{{ totalProfit }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';

	import {
		profitList,
		profitStat
	} from '@/utils/yeb'
	import defaultTemplate from "@/utils/defaultTemplate";
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			Header
		},
		computed: {
			...mapGetters(['themeColor', 'uWindowHeight']),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		data() {
			return {
				title: this.$t('pages.common.userCenter.yueBao.earnings.EarningsRecord'),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				show: false,
				oldType: '0',
				type: '0',
				typeList: [{
						name: this.$t('pages.common.userCenter.yueBao.earnings.All'),
						value: '0'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.earnings.TransferIn'),
						value: '1'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.earnings.PrincipalWithdrawal'),
						value: '2'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.earnings.EarningsWithdrawal'),
						value: '3'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.earnings.Earnings'),
						value: '5'
					},
				],
				loading: false,
				isLoading: true,
				list: [],
				totalProfit: 0.00,
				weekProfit: 0.00,
				yesterdayProfit: 0.00,
				// 排序方式（正序：asc，倒序：desc）,示例值(desc)
				order: 'desc',
				// 排序字段（时间：create_time，类型：type,金额：amount,余额：balance）,示例值(create_time)
				orderBy: 'create_time',
				isApp: false
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onLoad() {
			this.getStatistical()
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
			if (this.isApp) {
				this.$nativeBridge.setSafeAreaColor('#f3f9f6')
			}
		},
		methods: {
			handleOrderBy(type) {
				this.order = this.orderBy !== type ? 'desc' : this.order === 'desc' ? 'asc' : 'desc'
				this.orderBy = type
				this.confirm()
			},
			async getStatistical() {
				const res = await profitStat()
				const {
					totalProfit,
					weekProfit,
					yesterdayProfit
				} = defaultTemplate({
					totalProfit: 0,
					weekProfit: 0,
					yesterdayProfit: 0
				}, res.result || {
					totalProfit: 0,
					weekProfit: 0,
					yesterdayProfit: 0
				})
				this.totalProfit = totalProfit
				this.weekProfit = weekProfit
				this.yesterdayProfit = yesterdayProfit
			},
			async getList(pageNo) {
				this.oldType = this.type
				this.loading = this.isLoading
				this.isLoading = false
				const res = await profitList({
					pageNo,
					pageSize: 20,
					type: this.type,
					order: this.order,
					orderBy: this.orderBy,
				})
				const list = defaultTemplate([{
					id: '',
					amount: 0,
					balance: 0,
					type: '',
					typeText: '',
					createTime: '',
				}], res.result)
				this.$refs.paging.complete(list);
				this.loading = false
			},
			close() {
				this.type = this.oldType
				this.show = false
			},
			confirm() {
				this.isLoading = true
				this.show = false
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.yeb-earnings {
		background: var(--theme-auxiliary-color-default);
		height: var(--vh);

		::v-deep {
			.u-drawer,
			.u-mask {
				top: 95rpx;
				z-index: 99 !important;
			}

			.u-drawer-content {
				border-radius: 0 0 24rpx 24rpx;
			}
		}

		.type-list-scroll {
			background: #fff;

			.type-list {
				height: 88rpx;
				display: flex;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				white-space: nowrap;

				.item {
					background: var(--theme-auxiliary-color-default);
					border-radius: 60rpx;
					font-size: 26rpx;
					color: #404040;
					margin-right: 20rpx;
					padding: 0 20rpx;
					display: grid;
					place-content: center;
					line-height: 1;
				}

				.selected {
					background: var(--theme-color);
					color: #fff;
				}
			}
		}

		.btns {
			display: flex;
			height: 88rpx;
			align-items: center;
			justify-content: space-evenly;

			.btn {
				font-size: 34rpx;
				flex: 1;
				height: 100%;
				display: grid;
				place-content: center;
			}

			.close {
				color: #404040;
			}

			.confirm {
				color: var(--theme-color);
			}
		}

		.y-header {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 28rpx;
			box-sizing: border-box;
			height: 76rpx;
			background: #fff;
			border-radius: 24rpx;
			margin-top: 20rpx;
			color: #404040;
			font-size: 26rpx;

			.item {
				width: 25%;
				text-align: left;
				display: flex;
				align-items: center;
				justify-content: center;

				.text {
					margin-right: 10rpx;
				}

				svg {
					transition: all .3s;
				}

				.transition {
					transform: rotate(-180deg);
				}
			}

			.left {
				justify-content: flex-start;
			}

			.right {
				justify-content: flex-end;
			}
		}

		.no-b-r {
			border-radius: 24rpx 24rpx 0 0;
			border-bottom: 1px solid var(--theme-auxiliary-color-default);
		}

		.list-box {
			border-radius: 0 0 24rpx 24rpx;
			overflow: hidden;

			.list {
				height: 104rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #404040;
				background: #fff;
				position: relative;

				.line {
					position: absolute;
					top: 0;
					width: calc(100% - 56rpx) !important;
				}

				.item {
					width: 25%;
				}

				.left {
					text-align: left;
				}

				.center {
					text-align: center;
				}

				.right {
					text-align: right;
				}

				.red {
					color: var(--theme-auxiliary-color-remind);
				}

				.green {
					color: var(--theme-color);
				}

				.time {
					color: #404040;
					font-size: 24rpx;
				}
			}
		}

		.loading {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.statistical {
			height: calc(128rpx + var(--safe-area-inset-bottom));
			box-sizing: border-box;
			padding: 20rpx 0;
			display: flex;
			align-items: flex-start;
			justify-content: space-around;
			text-align: center;
			background: var(--theme-color-bg);
			border-radius: 24rpx 24rpx 0 0;

			.item {
				text-align: center;
				font-size: 26rpx;

				.text {
					color: #404040;
				}

				.num {
					color: var(--theme-auxiliary-color-remind);
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
