<template>
	<view class="collection-record" :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="content">
			<view class="selects">
				<uni-data-select class="item" ref="selectRef" :clear="false" v-model="timeRange"
					:localdata="timeRangeList" coustIcon>
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === timeRange"
								src="@/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
				<view class="right">{{ $t("pages.common.promoteEarn.index.collectionTotal") }}<text class="yellow">{{
					commissionReceiveTotal }}</text></view>
			</view>

			<z-paging :style="'height: calc(var(--vh) - 210rpx); z-index: 1;'" class="paging" ref="paging"
				v-model="list" @query="getList" :lower-threshold="10" :refresher-enabled="true"
				:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']" show-refresher-when-reload
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-default-style="themeColor.themeAuxiliaryColorDefault"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', }" :loading-more-loading-animated="false"
				:loading-more-default-as-loading="true" :show-loading-more-no-more-view="true"
				:loading-more-no-more-text='$t("pages.common.promoteEarn.index.noMore")' :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="left">
						<view class="title">{{ item.typeName }}</view>
						<view class="text">{{ item.updateTime }}</view>
					</view>
					<view class="text yellow">
						<view class="btn">{{ $t("pages.common.promoteEarn.index.Received") }}</view>
						{{ $t("pages.common.promoteEarn.index.moneySymbal") }}{{ item.money }}
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		getCommissionReceiveTotal,
		getCommissionReceiveRecords
	} from '@/utils/ptp/index.js'
	import defaultTemplate from '@/utils/defaultTemplate'
	import {
		mapGetters
	} from 'pinia';
	export default {
		components: {
			Header,
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			}
		},
		data() {
			return {
				title: this.$t("pages.common.promoteEarn.index.collectionRecord"),
				headerStyle: {
					backgroundColor: "#1794FF"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				timeRange: -1,
				timeRangeList: [{
						value: -1,
						text: this.$t("pages.common.promoteEarn.index.TimeAll")
					},
					{
						value: 0,
						text: this.$t("pages.common.promoteEarn.index.TimeToday")
					},
					{
						value: 1,
						text: this.$t("pages.common.promoteEarn.index.yesterday")
					},
					{
						value: 7,
						text: this.$t("pages.common.promoteEarn.index.thisWeek")
					},
					{
						value: 14,
						text: this.$t("pages.common.promoteEarn.index.lastWeek")
					},
					{
						value: 30,
						text: this.$t("pages.common.promoteEarn.index.thisMonth")
					},
				],
				commissionReceiveTotal: '0.00',
				list: []
			}
		},
		watch: {
			timeRange() {
				this.$refs.paging.reload();
			},
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.getCommissionReceiveTotalData()
		},
		methods: {
			async getCommissionReceiveTotalData() {
				const res = await getCommissionReceiveTotal()
				this.commissionReceiveTotal = defaultTemplate(0, res.result || 0)

			},
			async getList(pageNo) {
				const params = {
					timeRange: this.timeRange,
					account: this.account,
					pageNum: pageNo,
					pageSize: 10
				}
				const res = await getCommissionReceiveRecords(params)
				const {
					records
				} = defaultTemplate({
					records: [{
						typeName: '',
						updateTime: '',
						money: 0,
					}]
				}, res.result)
				this.$refs.paging.complete(records);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.collection-record {
		background: var(--theme-auxiliary-color-default);

		.content {
			padding: 20rpx 30rpx;

			.selects {
				display: flex;
				align-items: center;
				gap: 38rpx;
				padding-right: 20rpx;
				background: #fff;
				border-radius: 24rpx;
				height: 88rpx;

				.item-img {
					width: 36rpx;
					height: 36rpx;
					display: flex;
					align-items: center;
					margin-right: 10rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.item {
					width: 248rpx;
					height: 88rpx;
					background: #fff;
					border-radius: 16rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					::v-deep .uni-select {
						border: none;
						padding: 0 20rpx;

						.uni-select__selector {
							z-index: 999;
							transform: translateY(-16rpx);
							border-radius: 24rpx;
						}

						.uni-select__selector-item {
							border-bottom: 1px solid var(--theme-auxiliary-color-default);
							align-items: center;

							&:last-child {
								border: none;
							}
						}
					}
				}



				.right {
					flex: 1;
					font-size: 28rpx;
					color: #404040;
					display: flex;
					gap: 10rpx;
					justify-content: flex-end;
				}

				::v-deep .uni-searchbar {
					width: 160rpx;
					padding: 0;

					.uni-searchbar__box {
						border-radius: 50rpx !important;
						flex-direction: row-reverse;
						padding-left: 16rpx;

						.uni-searchbar__box-icon-search {
							padding: 0;

							.uni-icons {
								color: #0DB9EE !important;
							}
						}
					}
				}

				::v-deep .uni-stat__select {
					width: auto;
					flex: none;

					.uni-stat__actived {
						width: auto;
						flex: none;
					}

					.uni-select {
						border: unset;
						background: #FFFFFF;
						border-radius: 50rpx;
						justify-content: center;
						width: 160rpx;

						.uni-select__input-box {
							flex: none;

							/*
						gap: 10rpx;
						此属性IOS 部分机型失效
						*/
							.uni-select__input-text {
								margin-right: 10rpx;
							}

							.uni-icons {
								color: #0DB9EE !important;
							}
						}

						.uni-select__selector {
							top: 100%;

							.uni-popper__arrow {
								display: none !important;
							}

							.uni-select__selector-item {
								justify-content: center;
							}
						}
					}
				}
			}

			.paging {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				height: calc(var(--vh) - 220rpx);
				overflow: auto;

				.item {
					display: flex;
					justify-content: space-between;
					background: #FFFFFF;
					border-radius: 24rpx;
					padding: 20rpx;
					font-size: 22rpx;
					align-items: center;
					margin-top: 20rpx;
					height: 148rpx;
					box-sizing: border-box;

					.left {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						gap: 10rpx;
						height: calc(100% - 32rpx);
					}

					.title {
						color: #404040;
						font-size: 28rpx;
					}

					.text {
						color: #404040;
						font-size: 24rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.btn {
							width: 136rpx;
							height: 46rpx;
							display: grid;
							place-content: center;
							color: #fff;
							font-size: 26rpx;
							background: #A1A1A1;
							border-radius: 8rpx;
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}

		.yellow {
			color: var(--theme-auxiliary-color-remind) !important;
			font-weight: 600;
		}
	}
</style>
