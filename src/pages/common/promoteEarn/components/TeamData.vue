<template>
	<view class="ptp-teamData">
		<view class="selects">
			<view @click="changeSelect">
				<uni-data-select @change="ccA" class="item" ref="selectRef" :clear="false" v-model="timeRange"
					:localdata="timeRangeList" coustIcon
					:placeholder="timeRange.toString().indexOf('_') > -1 && timeRange.split('_').length == 2 ? timeRange.substring(5, 10).replaceAll('-', '.') + '-' + timeRange.substring(16, 21).replaceAll('-', '.') : '请选择'">
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === timeRange" src="@/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
			</view>
			<uni-search-bar class="item" v-model="account"
				:placeholder="$t('pages.common.promoteEarn.components.TeamData.text1')" bgColor="#fff" clearButton="none"
				cancelButton="none" @focus="closeSelect('selectRef')" @confirm="search">
				<template v-slot:searchIcon>
					<svg @click="search" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
						fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12.7814 12.7814C9.85751 15.7054 5.11688 15.7054 2.19295 12.7814C-0.730983 9.85751 -0.730983 5.11688 2.19295 2.19295C5.11688 -0.730983 9.85751 -0.730983 12.7814 2.19295C15.7054 5.11688 15.7054 9.85751 12.7814 12.7814ZM11.0167 11.0167C9.06742 12.966 5.907 12.966 3.95772 11.0167C2.00843 9.0674 2.00843 5.90698 3.95772 3.95769C5.907 2.0084 9.06742 2.0084 11.0167 3.95769C12.966 5.90698 12.966 9.0674 11.0167 11.0167ZM15.8698 14.105C15.3824 13.6177 14.5923 13.6177 14.105 14.105C13.6177 14.5923 13.6177 15.3824 14.105 15.8698L15.8698 17.6345C16.3571 18.1218 17.1472 18.1218 17.6345 17.6345C18.1218 17.1472 18.1218 16.3571 17.6345 15.8698L15.8698 14.105Z"
							fill="#A1A1A1" />
					</svg>
				</template>
			</uni-search-bar>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker :multiple="true" :tipVisible="false" @closePay="closePay" @changeTime="onGetDate" :line="'.'"
				:contentStyle="{ padding: 0 }">
			</time-picker>
		</uni-drawer>
		<z-paging :style="'height: calc(var(--vh) - 512rpx); z-index: 1;'" class="paging" ref="paging" v-model="list"
			@query="getList" :lower-threshold="10" :refresher-enabled="true" :refresherAnimated="false"
			:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
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
			:loading-more-default-as-loading="false" :show-loading-more-no-more-view="true"
			:loading-more-no-more-text="$t('pages.common.promoteEarn.components.TeamData.text2')" :hide-empty-view="false"
			:empty-view-center="true" :empty-view-text="$t('pages.common.promoteEarn.components.TeamData.text3')"
			:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }" :empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #D8D8D8', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="item-box" v-show="list.length">
				<view class="item" v-for="( item, index ) in list " :key="index">
					<view class="left">
						<view class="text">{{ item.userName }}</view>
						<view class="time">{{ $u.timeFormat(item.createTime, 'yyyy.mm.dd hh:MM:ss') }}</view>
					</view>
					<view class="right">
						<view class="text">
							{{ $t('pages.common.promoteEarn.components.TeamData.text4') }}{{ item.bettingValid }}
						</view>
						<view class="text money-box">

							{{ $t('pages.common.promoteEarn.components.TeamData.text5') }}
							<text class="money">{{ Number(item.recharge).toFixed(2) }}</text>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>
<script>
import Empty from './Empty.vue'
import {
	teamData
} from '@/utils/ptp/index.js'
import {
	mapGetters
} from 'pinia';
import defaultTemplate from '@/utils/defaultTemplate'
import TimePicker from "@/components/common/time-picker-earn";

export default {
	components: {
		Empty,
		TimePicker
	},
	data() {
		return {
			disableInit: false,
			timeRange: 1,
			timeRangeList: [
				// {
				// 	value: -1,
				// 	text: this.$t('pages.common.promoteEarn.components.TeamData.text6')
				// },
				{
					value: 1,
					text: this.$t('pages.common.promoteEarn.components.TeamData.text7')
				},
				{
					value: 7,
					text: this.$t('pages.common.promoteEarn.components.TeamData.text8')
				},
				{
					value: 14,
					text: this.$t('pages.common.promoteEarn.components.TeamData.text9')
				},
				{
					value: 30,
					text: this.$t('pages.common.promoteEarn.components.TeamData.text10')
				},
				{
					value: 35,
					text: "自定义"
				},
			],
			account: '',
			list: [{
				name: 'new1',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			},
			{
				name: 'new1下级',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			},
			{
				name: 'new2',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			},
			{
				name: 'new2下级',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			},
			{
				name: 'new3',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			},
			{
				name: 'new3下级',
				time: '2023.05.23 09:54:42',
				text1: '1987000.00',
				text2: '89.42'
			}
			],
			showS: false,
			rsaa: true,
			tt: ''
		};
	},
	computed: {
		...mapGetters(["themeColor"]),
		zpageUIConfig() {
			return this.$config.configUIMgr.z_page_loading['t1'];
		}
	},
	watch: {
		timeRange(val) {
			if (this.rsaa) {
				if (this.timeRange == 35) {
					this.openTime();
					return;
				}
				this.$refs.paging.reload();
			}
		},
		showS() {
			if (this.showS == false && this.timeRange == 35 && this.tt) {
				this.timeRange = this.tt;
			}
		}
	},
	methods: {
		ccA(item) {
			if (item == 35) {
				this.openTime();
				return;
			}
		},
		changeSelect(item) {
			this.showS = this.$refs.selectRef.showSelector;
			if (this.$refs.selectRef.showSelector && typeof (this.timeRange) == 'string' && this.timeRange.indexOf("_") > 0) {
				this.tt = this.timeRange;
				this.rsaa = false
				this.timeRange = 35;
				setTimeout(() => {
					this.rsaa = true;
				}, 0)
			}
		},
		onGetDate(item) {
			console.log(item);
			item.start = item.start.replaceAll(".", "-");
			item.end = item.end.replaceAll(".", "-");
			this.timeRange = item.start + '_' + item.end;
		},
		closePay() {
			this.$refs.pay.close()
		},
		openTime() {
			this.$refs.pay.open()
		},
		closeSelect(ref) {
			this.$refs[ref].showSelector = false;
		},
		async getList(pageNo) {
			if (this.disableInit) return;
			const params = {
				timeRange: this.timeRange,
				account: this.account,
				pageNum: pageNo,
				pageSize: 10
			}

			uni.$emit('getTeamDataBottom', {
				timeRange: this.timeRange,
				account: this.account,
			})
			const res = await teamData(params)
			const {
				records
			} = defaultTemplate({
				records: [{
					recharge: 0,
					bettingValid: 0,
					userName: '',
					createTime: ''
				}]
			}, res.result);
			// if (res.result.total == 0) this.disableInit = true;
			this.$refs.paging.complete(records);
		},
		search() {
			this.$refs.paging.reload();
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep .uni-drawer__content {
	background: var(--theme-auxiliary-color-default);
}

.ptp-teamData {
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20rpx;


	.selects {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: -1px;
		z-index: 11;

		/*gap: 10px;*/
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
				font-size: 26rpx;

				.uni-select__selector {
					z-index: 999;
					transform: translateY(-40rpx);
					border-radius: 24rpx;
				}

				.uni-select__selector-item {
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					align-items: center;
					justify-content: flex-start;

					&:last-child {
						border: none;
					}
				}

				.uni-select__input-text {
					color: #A1A1A1;
				}
			}
		}

		.item:last-child {
		}

		::v-deep .uni-searchbar {
			padding: 0;

			.uni-searchbar__box {
				padding: 0 20rpx;
				flex-direction: row-reverse;

				.uni-searchbar__box-icon-search {
					padding: 0;
				}
			}

			.uni-input-input {
				color: #A1A1A1;

			}

			.uni-input-placeholder {
				color: #A1A1A1 !important;
			}
		}

		.yeji {
			padding: 0 20rpx;
			box-sizing: border-box;
		}
	}

	.paging {
		.item-box {
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;

			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 10rpx;

					.time {
						font-size: 24rpx;
						color: #404040;
						width: 150rpx;
					}
				}

				.text {
					font-size: 28rpx;
					color: #404040;
				}

				.right {
					display: flex;
					flex-direction: column;
					gap: 10rpx;
					text-align: right;

					.money-box {
						margin-top: 10rpx;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.title {
							color: #404040;
						}

						.money {
							color: var(--theme-auxiliary-color-remind);
						}
					}
				}

				&:first-child {
					padding-top: 0;
				}

				&:last-child {
					padding-bottom: 0;
					border-bottom: none;
				}
			}
		}
	}
}
</style>
