<template>
	<view class="ptp-teamData" :class="['theme-' + themeColor.name]">
		<u-tabs class="tabs" bg-color="transparent" inactive-color="#A1A1A1" :active-color="themeColor.themeColor"
			:bold="false" :list="tabList" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="items">
			<view class="item header">
				<view class="item-text" @click="handleOrderBy('level')">
					<view class="text">{{$t("pages.common.promoteEarn.components.CommissionRatio.text1")}}</view>
					<svg :class="{
                        transition: order === 'desc' && orderBy === 'level'
                    }" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9"  :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view class="item-text" @click="handleOrderBy('bettingLevel')">
					<view class="text">
						{{$t("pages.common.promoteEarn.components.CommissionRatio.text2")}}
					</view>
					<svg :class="{
                        transition: order === 'desc' && orderBy === 'bettingLevel'
                    }" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9"  :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
							fill="#A1A1A1" />
					</svg>
				</view>
				<view class="item-text" @click="handleOrderBy('rebateAmount')">
					<view class="text">
						{{$t("pages.common.promoteEarn.components.CommissionRatio.text3")}}
					</view>
					<svg :class="{
                        transition: order === 'desc' && orderBy === 'rebateAmount'
                    }" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect width="18" height="18" rx="9"  :fill="themeColor.themeAuxiliaryColorDefault" />
						<path
							d="M8.03819 11.9777C8.63873 12.7498 9.80571 12.7498 10.4063 11.9777L13.5615 7.92091C14.3278 6.93562 13.6257 5.5 12.3775 5.5H6.06696C4.81873 5.5 4.1166 6.93562 4.88293 7.92091L8.03819 11.9777Z"
							fill="#A1A1A1" />
					</svg>
				</view>
			</view>
			<Empty v-if="!list.length && !loading" />
			<view v-if="loading" class="loading">
				<image :src="pageLoadingConfig['img']" :style="pageLoadingConfig['img_style']"></image>
				<view :style="pageLoadingConfig['text_style']">{{ pageLoadingConfig ? pageLoadingConfig['text'] : ""
                }}
				</view>
			</view>
			<view class="item-box">
				<view v-if="!loading" class="item" v-for="(item, index) in list" :key="index">
					<u-line class="line" :color="themeColor.themeAuxiliaryColorDefault" />
					<view>{{ item.level }}</view>
					<view>{{ item.bettingLevel }}万+</view>
					<view>
						<text class="yellow">{{ item.rebateAmount }}</text>/万
					</view>
				</view>
			</view>
			<view class="tips">

				{{$t("pages.common.promoteEarn.components.CommissionRatio.text4")}}
				<text class="yellow">≥{{ data.effectiveBetting.itemValue }}</text>

				{{$t("pages.common.promoteEarn.components.CommissionRatio.text5")}}
				<text class="yellow">≥{{ data.deposit.itemValue }}</text>

				{{$t("pages.common.promoteEarn.components.CommissionRatio.text6")}}
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getRateType,
		getRateByType,
		getRateRemindConfig
	} from '@/utils/ptp'
	import defaultTemplate from '@/utils/defaultTemplate'
	import Empty from "./Empty";
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			Empty
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			pageLoadingConfig() {
				return this.$config.configUIMgr.page_loading_row['t1'];
			}
		},
		data() {
			return {
				tabList: [],
				list: [],
				current: 0,
				loading: false,
				data: {
					effectiveBetting: {
						itemValue: '0.00'
					},
					deposit: {
						itemValue: '0.00'
					}
				},
				order: 'desc',
				orderBy: ''
			}
		},
		mounted() {
			this.getRateTypeList()
			this.getRateRemindConfigData()
		},
		methods: {
			handleOrderBy(type) {
				this.order = this.orderBy !== type ? 'desc' : this.order === 'desc' ? 'asc' : 'desc'
				this.orderBy = type
				this.getRateByTypeList()
			},
			async getRateRemindConfigData() {
				const res = await getRateRemindConfig()
				this.data = defaultTemplate({
					effectiveBetting: {
						id: "",
						itemValue: '',
						itemName: "",
						itemGroup: "",
					},
					deposit: {
						id: "",
						itemValue: '',
						itemName: "",
						itemGroup: "",
					}
				}, res.result)
			},
			async getRateTypeList() {
				const res = await getRateType()
				const result = defaultTemplate(
					[{
						id: '',
						name: "",
					}],
					res.result
				)
				this.tabList = result
				if (!result.length) {
					return
				}
				this.getRateByTypeList()
			},
			async getRateByTypeList() {
				this.loading = true
				const res = await getRateByType({
					type: this.tabList[this.current]?.id,
					order: this.order,
					orderBy: this.orderBy,
				})
				const list = defaultTemplate(
					[{
						level: '',
						bettingLevel: '',
						rebateAmount: '',
						status: ''
					}],
					res.result
				)
				this.list = list.filter(item => item.status === '1')
				this.loading = false
			},
			change(index) {
				this.current = index;
				this.getRateByTypeList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ptp-teamData {
		position: relative;

		.tabs {
			border-bottom: 4rpx solid var(--theme-auxiliary-color-default) !important;
			background: #fff !important;
			border-radius: 16rpx 16rpx 0 0;
			border-bottom: 1px solid var(--theme-auxiliary-color-default) !important;

			::v-deep .u-tab-bar {
				bottom: -5rpx;
				width: 36rpx !important;
				height: 6rpx !important;
				flex-shrink: 0;
				border-radius: 6rpx 6rpx 0 0 !important;
			}
		}

		.items {
			border-radius: 24rpx;
			background: #fff;

			.item {
				padding: 25rpx 0;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				text-align: center;
				font-size: 28rpx;
				color: #404040;
				margin-top: 20rpx;
				position: relative;

				.line {
					position: absolute;
					top: 0;
					width: calc(100% - 40rpx) !important;
				}
			}

			.header {
				font-size: 22rpx;
				position: sticky;
				top: -1px;

				.item-text {
					display: flex;
					align-items: center;

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

			.item-box {
				flex: 1;
				min-height: calc(var(--vh) - 600rpx);
			}

			.tips {
				padding: 20rpx;
				font-size: 24rpx;
				color: #404040;
				margin-top: 10rpx;
				word-break: break-all;
			}
		}

		.yellow {
			color: var(--theme-auxiliary-color-remind);
		}
	}
</style>
