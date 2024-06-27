<template>
	<view :class="['theme-' + themeColor.name]">
		<Header :title="title" />
		<view class="content">
			<view class="title">
				<view class="select">
					<uni-data-select v-model="searchValue" :localdata="range" :clear="false" showStatusBarColor="#fff"
						@click="ddSelect">
						<template #itemImg="item">
							<view class="item-img">
								<image class="img" v-if="item.value === searchValue"
									src="@/static/imgs-liuhe/activity/item-selected.png">
								</image>
							</view>
						</template>
					</uni-data-select>
				</view>
				<view class="total">
					<view>
						{{ $t('pages.liuhe.activity.log.TotalReceived') }}
					</view>
					<view>
						<text class="text">{{
							setAmount(receiveTotalAmount) }}</text>
					</view>
				</view>
			</view>
			<z-paging :style="`height: calc(${uWindowHeight}px - 215rpx);margin-top:20rpx;`" class="paging" ref="paging"
				v-model="list" @query="getList" :lower-threshold="10" :refresher-enabled="true"
				:refresherAnimated="false" :show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
				:refresher-default-text="zpageUIConfig['refresher-default-text']"
				:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
				:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
				:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']" :refresher-default-style="'#EEEEEE'"
				:refresher-img-style="zpageUIConfig['refresher-img-style']"
				:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
				:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
				:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
				:loading-more-custom-style="{ 'padding-top': '20rpx', }" :loading-more-loading-animated="false"
				:loading-more-default-as-loading="true" :show-loading-more-no-more-view="true"
				:loading-more-no-more-text="$t('pages.liuhe.activity.log.NoMoreData')" :hide-empty-view="false"
				:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
				:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
				:empty-view-style="{ 'margin-bottom': '170px' }"
				:empty-view-img-style="{ 'width': '443rpx', 'height': '443rpx' }"
				:empty-view-title-style="{ 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
				<view class="items">
					<view class="item" v-for="(item, index) in list">
						<view class="item-left">
							<view>{{ item.taskName }}</view>
							<view class="createTime">{{ item.receiveTimeStr }}</view>
						</view>
						<view class="item-right">
							<view class="btn">{{ $t('pages.liuhe.activity.log.Received') }}</view>
							<view class="amount">¥{{ item.rewardMoney }}</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<AlertInjectLayer />
	</view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
import {
	receiveRecord
} from "@/utils/activity/index";
import defaultTemplate from "@/utils/defaultTemplate";
import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
import Playing from "../../../utils/common/playing";
import {
	mapGetters
} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
import useSystemInfoStore from "@/store/modules/systemInfoStore";

function getStartEndDaysAgo(daysAgo) {
	var today = new Date(); // 获取当前日期和时间
	today.setHours(0, 0, 0, 0); // 将时、分、秒和毫秒设置为0

	if (daysAgo > 0) {
		today.setDate(today.getDate() - daysAgo);
	}

	var start = today.getTime(); // 获取开始时间的时间戳

	var startDate = new Date(start); // 转换开始时间为Date对象

	var startFormatted = formatDate(startDate); // 格式化开始时间
	var endFormatted = ''
	if (daysAgo === 1) {
		endFormatted = formatDate(today); // 格式化结束时间
	} else {
		endFormatted = formatDate(new Date()); // 格式化结束时间
	}

	return startFormatted + ',' + endFormatted
}

function formatDate(date) {
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);

	return year + '-' + month + '-' + day;
}

export default {
	components: {
		Header,
		AlertInjectLayer,
	},
	computed: {
    ...mapState(useAppInfoStore, ["themeColor"]),
    ...mapState(useSystemInfoStore, ["uWindowHeight"]),
		zpageUIConfig() {
			return this.$config.configUIMgr.z_page_loading['t1'];
		},
	},
	mounted() {
		uni.$emit("on_page_mounted", this)
	},
	data() {
		return {
			safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
				.top + "px",
			title: this.$t('pages.liuhe.activity.log.ReceivedRecords'),
			headerStyle: {
				borderRadius: '0 0 20rpx 20rpx',
				height: '88rpx'
			},
			fontColor: "#FFFFFF",
			titleStyle: {
				color: "#404040"
			},
			searchValue: getStartEndDaysAgo(0),
			range: [{
				value: getStartEndDaysAgo(0),
				text: this.$t('pages.liuhe.activity.log.Today')
			},
			{
				value: getStartEndDaysAgo(1),
				text: this.$t('pages.liuhe.activity.log.Yesterday')
			},
			{
				value: getStartEndDaysAgo(7),
				text: this.$t('pages.liuhe.activity.log.Last7Days')
			},
			{
				value: getStartEndDaysAgo(15),
				text: this.$t('pages.liuhe.activity.log.Last15Days')
			},
			{
				value: getStartEndDaysAgo(30),
				text: this.$t('pages.liuhe.activity.log.Last30Days')
			},
			],
			startTime: '',
			endTime: '',
			order: '',
			orderBy: '',
			pageNo: 1,
			pageSize: 10,
			type: 0,
			list: [],
			receivedAmount: 0,
			appliedAmount: 0,
			receiveTotalAmount: 0,
			playing: new Playing()
		}
	},
	watch: {
		searchValue(val) {
			this.$refs.paging.reload()
		}
	},
	methods: {
		ddSelect() {
			this.$nativeBridge.setStatusBarColor('#b2b2b2')

		},
		backPage() {
			backPage()
		},
		setAmount(num) {
			return this.playing.setAmount(num, 2, ".")
		},
		getList(pageNo, pageSize = 10) {
			this.pageNo = pageNo
			this.pageSize = pageSize
			const times = this.searchValue.split(',')
			let prams = {
				"beginTime": times[0],
				"endTime": times[1],
				"order": "desc",
				"orderBy": "receiveTime",
				"pageNum": pageNo,
				"pageSize": 10,
				"type": 0
			}
			receiveRecord(prams).then(res => {
				const {
					pageList,
					statisticsData
				} = defaultTemplate({
					pageList: {
						records: [],
						total: 0,
						size: 10,
						current: 1,
						orders: [],
						optimizeCountSql: true,
						searchCount: true,
						countId: null,
						maxLimit: null,
						pages: 0
					},
					statisticsData: {
						receivedAmount: 0
					}
				}, res.result)
				const list = pageList.records
				this.list = list
				this.receivedAmount = statisticsData.receivedAmount
				this.appliedAmount = statisticsData.appliedAmount
				this.receiveTotalAmount = Number(res.result.statisticsData?.receivedAmount || 0) + Number(res
					.result.statisticsData?.appliedAmount || 0)
				this.$refs.paging.complete(list);
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep .uni-select--mask {}

.content {
	padding: 20rpx 28rpx;
	background: var(--theme-auxiliary-color-default);

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 694rpx;
		height: 88rpx;
		border-radius: 24rpx;
		background: #FFF;
		padding-right: 20rpx;
		box-sizing: border-box;

		.select {
			width: 100px;

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

			::v-deep .uni-select {
				border: none;
				width: 288rrpx;
				height: 88rpx;

				.uni-select__input-text {
					width: fit-content;
					margin-right: 20rpx;
					color: #404040;
				}

				.uni-icons {
					border: 1px solid #A1A1A1;
					width: 32rpx;
					height: 32rpx;
					border-radius: 32rpx;
					transform: rotate(180deg);
					line-height: 34rpx;
				}

				.uni-select__selector {
					z-index: 999;
					transform: translate(0, -20rpx);
				}

				.uni-popper__arrow {
					display: none;
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

		.total {
			font-size: 28rpx;
			color: #404040;
			display: flex;
			align-items: center;

			.text {
				color: var(--theme-auxiliary-color-remind);
				font-weight: 600;
				margin-left: 10rpx;
			}
		}
	}

	.items {
		display: flex;
		flex-direction: column;

		.item {
			&:first-child {
				margin-top: 0;
			}

			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			background: #fff;
			border-radius: 24rpx;
			align-items: center;
			margin-top: 20rpx;

			.item-left {
				font-size: 28rpx;
				display: grid;
				gap: 10rpx;

				.type {
					color: #444444;
				}

				.createTime {
					color: #404040;
					font-size: 24rpx;
				}
			}

			.item-right {
				text-align: center;

				.btn {
					width: 132rpx;
					padding: 4rpx 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 8rpx;
					background: #A1A1A1;
					font-size: 26rpx;
					font-weight: 400;
					color: #fff;
				}

				.amount {
					margin-top: 10rpx;
					color: var(--theme-auxiliary-color-remind);
					font-size: 28rpx;
					font-weight: 600;
				}
			}
		}
	}
}

::v-deep .header {
	border-radius: 0 0 20rpx 20rpx;
	overflow: hidden;
}
</style>
