<template>
	<view class="yeb-earnings" :style="{height: `${uWindowHeight}px`}" :class="['theme-' + themeColor.name]">
		<Header :class="{ 'no-b-r': show }" :title="title" :headerStyle="{zIndex:99999}"
			:headerInnerStyle="{zIndex:9999999,borderRadius:show?0:'0px 0px 30rpx 30rpx;'}">
			<block slot="right">
				<view class="right-btn" @click="show = true">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
						<path
							d="M23.8951 0.665087C24.0888 1.13133 24.0082 1.52902 23.6568 1.85813L15.2661 10.2609V22.9078C15.2765 23.1242 15.2178 23.3383 15.0985 23.5191C14.9793 23.7 14.8057 23.8383 14.6027 23.914C14.4674 23.9684 14.3233 23.9974 14.1776 23.9997C14.0342 24.0031 13.8917 23.976 13.7596 23.9202C13.6275 23.8643 13.5088 23.781 13.4114 23.6757L9.054 19.3115C8.95076 19.2126 8.86889 19.0936 8.81346 18.9618C8.75804 18.83 8.73022 18.6883 8.73175 18.5453V10.2609L0.341017 1.85813C-0.0103824 1.52902 -0.0909472 1.13133 0.102751 0.665087C0.296449 0.222839 0.630707 0 1.10724 0H22.8923C23.3671 0.00171414 23.7014 0.222839 23.8951 0.665087Z"
							fill="#A1A1A1" />
					</svg>
					<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.Filter') }}</view>
				</view>
			</block>
		</Header>
		<u-popup v-model="show" mode="top" class="show-drawer-popup"
			:mask-custom-style="{ background: 'rgba(0, 0, 0, 0.5)' }">
			<scroll-view class="type-list-scroll" scroll-x="true">
				<view class="type-list">
					<view class="item" :class="{ selected: item.value === type }" v-for="(item, index) in typeList"
						:key="index" @click="type = item.value">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<view class="btns">
				<view class="btn close" @click="close">{{ $t('pages.common.userCenter.yueBao.capital.Cancel') }}</view>
				<u-line color="#E3E3E3" direction="col" />
				<view class="btn confirm" @click="confirm">{{ $t('pages.common.userCenter.yueBao.capital.Confirm') }}
				</view>
			</view>
		</u-popup>
		<view class="y-header" :class="{ 'no-b-r': list.length }">
			<view class="left item" @click="handleOrderBy('type')">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.Type') }}</view>
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
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.Amount') }}</view>
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
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.Balance') }}</view>
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
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.Time') }}</view>
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
			class="paging" ref="paging" :default-page-size="20" v-model="list" @query="getList" :lower-threshold="10"
			:refresher-enabled="true" :refresherAnimated="false"
			:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
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
			:loading-more-no-more-text="$t('pages.common.userCenter.yueBao.capital.NoMoreData')"
			:hide-empty-view="false" :empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }"
			:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="list-box">
				<view class="list" v-for="(item, index) in list" :key="index">
					<u-line class="line" :color="themeColor.themeAuxiliaryColorDefault" border-style="dashed"
						v-if="index > 0" />
					<view class="left item">{{ item.typeText }}</view>
					<view class="item center" :class="['1', '5'].includes(item.type) ? 'red' : 'green'">
						{{ item.type === '2'||item.type === '3' ? '-' : '+' }}{{ item.amount }}
					</view>
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
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.TransferIn') }}</view>
				<view class="num red">{{ rollInAmount }}</view>
			</view>
			<view class="item">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.TransferOut') }}</view>
				<view class="num green">{{ rollOutAmount }}</view>
			</view>
			<view class="item">
				<view class="text">{{ $t('pages.common.userCenter.yueBao.capital.TotalEarnings') }}</view>
				<view class="num red">{{ totalProfit }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';

	import {
		yebDetail,
		yebDetailStat
	} from '@/utils/yeb'
	import defaultTemplate from "@/utils/defaultTemplate";
  import {
    mapGetters, mapState
  } from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
	export default {
		components: {
			Header
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight", "downloadShow"]),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			},
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			},
		},
		data() {
			return {
				title: this.$t('pages.common.userCenter.yueBao.capital.FundDetails'),
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
						name: this.$t('pages.common.userCenter.yueBao.capital.All'),
						value: '0'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.capital.TransferIn'),
						value: '1'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.capital.PrincipalOut'),
						value: '2'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.capital.EarningsOut'),
						value: '3'
					},
					{
						name: this.$t('pages.common.userCenter.yueBao.capital.Earnings'),
						value: '5'
					},
				],
				loading: false,
				isLoading: true,
				list: [],
				totalProfit: 0.00,
				rollOutAmount: 0.00,
				rollInAmount: 0.00,
				// 排序方式（正序：asc，倒序：desc）,示例值(desc)
				order: 'desc',
				// 排序字段（时间：create_time，类型：type,金额：amount,余额：balance）,示例值(create_time)
				orderBy: 'create_time',
				isApp: false
			}
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
				const res = await yebDetailStat()
				const {
					totalProfit,
					rollInAmount,
					rollOutAmount
				} = defaultTemplate({
					rollInAmount: 0,
					rollOutAmount: 0,
					totalProfit: 0
				}, res.result)
				this.totalProfit = totalProfit
				this.rollOutAmount = rollOutAmount
				this.rollInAmount = rollInAmount
			},
			async getList(pageNo) {
				this.oldType = this.type
				this.loading = this.isLoading
				this.isLoading = false
				const res = await yebDetail({
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
	.header {
		z-index: 15;
	}

	.yeb-earnings {
		background: var(--theme-auxiliary-color-default);

		::v-deep {
			.u-drawer {
				top: 0rpx;
				z-index: 11 !important;
				margin-top: 88rpx;
			}

			.u-mask {
				top: 0rpx;
				z-index: 11 !important;
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
			border-top: 1px solid var(--theme-auxiliary-color-default);

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

		.right-btn {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.text {
				margin-left: 10rpx;
				color: #404040;
				font-size: 30rpx;
			}
		}

		.no-b-r {
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
			border-bottom: none !important;
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
					color:#EC3232; //var(--theme-auxiliary-color-remind);
				}

				.green {
					color:#07C160; //var(--theme-color);
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
					color: var(--theme-color);
					margin-top: 20rpx;
				}

				.red {
					color: var(--theme-auxiliary-color-remind);
				}

				.green {
					color: var(--theme-color);
				}
			}
		}
	}
</style>
