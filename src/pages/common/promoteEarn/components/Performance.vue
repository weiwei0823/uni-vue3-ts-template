<template>
	<view class="ptp-teamData">
		<view class="selects">
			<view @click="changeSelect" style="width:198rpx">
				<uni-data-select @change="ccA" class="item" ref="selectRef" :clear="false" v-model="timeRange"
					:localdata="timeRangeList" coustIcon style=" width: 198rpx"
					:placeholder="timeRange.toString().indexOf('_') > -1 && timeRange.split('_').length == 2 ? timeRange.substring(5, 10).replaceAll('-', '.') + '-' + timeRange.substring(16, 21).replaceAll('-', '.') : '请选择'">
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === timeRange" src="/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
			</view>
			<uni-search-bar class="item" v-model="account"
				:placeholder="$t('pages.common.promoteEarn.components.Performance.text1')" bgColor="#fff" clearButton="none"
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
			<view class="item yeji" @click="sort = sort === '-1' ? '1' : '-1'">

				{{ $t("pages.common.promoteEarn.components.Performance.text2") }}
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="18" height="18" rx="9" :fill="themeColor.themeAuxiliaryColorDefault" />
					<path
						d="M8.55293 15.2512C8.94633 15.66 9.60068 15.66 9.99408 15.2512L13.4176 11.6934C14.0289 11.0581 13.5786 10 12.697 10H5.85003C4.96837 10 4.51813 11.0581 5.12945 11.6934L8.55293 15.2512Z"
						:fill="sort === '-1' ? 'var(--theme-color)' : '#A1A1A1'" />
					<path
						d="M8.55293 2.74885C8.94633 2.34001 9.60068 2.34001 9.99408 2.74885L13.4176 6.30662C14.0289 6.94193 13.5786 8 12.697 8H5.85003C4.96837 8 4.51813 6.94193 5.12945 6.30662L8.55293 2.74885Z"
						:fill="sort === '1' ? 'var(--theme-color)' : '#A1A1A1'" />
				</svg>
			</view>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker :multiple="true" :tipVisible="false" @closePay="closePay" @changeTime="onGetDate" :line="'.'"
				:contentStyle="{ padding: 0 }">
			</time-picker>
		</uni-drawer>
		<z-paging :style="{ height: `calc(${uWindowHeight}px - 560rpx)` }" class="paging" ref="paging" v-model="list"
			@query="getMyPerformance" :lower-threshold="10" :refresher-enabled="true" :refresherAnimated="false"
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
			:loading-more-default-as-loading="true" :show-loading-more-no-more-view="true"
			:loading-more-no-more-text="$t('pages.common.promoteEarn.components.Performance.text3')" :hide-empty-view="false"
			:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '140rpx' }"
			:empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #D8D8D8', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="item-box" v-show="list.length">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="text name">{{ item.userName }}</view>
					<view class="text name" style="padding-left: 6rpx;text-align: center;">{{ item.teamNum }}人</view>
					<view class="right">
						<view class="text">{{ item.teamPerformance }}</view>
						<view class="text moeny-box">
							<view class="title">
								{{ $t("pages.common.promoteEarn.components.Performance.text4") }}
							</view>
							<view class="moeny">{{ item.profferCommission }}</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>
<script>
import {
	myPerformance
} from '@/utils/ptp/index.js'
import defaultTemplate from '@/utils/defaultTemplate'
import TimePicker from "@/components/common/time-picker-earn";

import {
	mapGetters
} from 'pinia';
export default {
	components: {
		TimePicker
	},
	data() {
		return {
			sort: '',
			timeRange: 1,
			timeStr: '',
			timeRangeList: [
				// {
				// 	value: -1,
				// 	text: this.$t("pages.common.promoteEarn.components.Performance.text5")
				// },
				{
					value: 1,
					text: this.$t("pages.common.promoteEarn.components.Performance.text6")
				},
				{
					value: 7,
					text: this.$t("pages.common.promoteEarn.components.Performance.text7")
				},
				{
					value: 14,
					text: this.$t("pages.common.promoteEarn.components.Performance.text8")
				},
				{
					value: 30,
					text: this.$t("pages.common.promoteEarn.components.Performance.text9")
				},
				{
					value: 35,
					text: "自定义"
				},
			],
			account: '',
			list: [],
			showS: false,
			rsaa: true,
			tt: ''
		};
	},
	computed: {
		...mapGetters(["themeColor", "uWindowHeight"]),
		zpageUIConfig() {
			return this.$config.configUIMgr.z_page_loading['t1'];
		}
	},
	watch: {
		sort() {
			this.$refs.paging.reload();
		},
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
			if (this.timeRange == 35 || this.timeRange.indexOf("_") < 0) {
				this.timeRange = 1
			}
			this.$refs.pay.close()
		},
		openTime() {
			this.$refs.pay.open()
		},
		closeSelect(ref) {
			this.$refs[ref].showSelector = false;
		},
		async getMyPerformance(pageNo) {
			const params = {
				orderType: this.sort,
				timeRange: this.timeRange,
				account: this.account,
				pageNum: pageNo,
				pageSize: 10
			}
			console.log(params)
			uni.$emit('getMyPerformanceBottom', {
				timeRange: this.timeRange,
				account: this.account,
			})
			const res = await myPerformance(params)
			const {
				records
			} = defaultTemplate({
				records: [{
					userName: '',
					teamNum: '',
					teamPerformance: 0,
					profferCommission: 0
				}]
			}, res.result)
			this.$refs.paging.complete(records);
		},
		search() {
			this.getMyPerformance()
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


			width: 148rpx;
			height: 80rpx;
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
					white-space: nowrap;
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
			color: #A1A1A1;
			font-size: 26rpx;
		}
	}

	.paging {
		.item-box {
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;

			.item {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1px solid var(--theme-auxiliary-color-default);

				&:nth-child(odd) {
					background: #fff;
				}

				.name {
					flex: 1;
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

					.moeny-box {
						margin-top: 10rpx;
						font-size: 24rpx;

						.title {
							color: #404040;
						}

						.moeny {
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
