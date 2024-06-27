<template>
	<view class="ptp-teamData">
		<view class="selects">
			<view @click="changeSelect">

				<uni-data-select @change="ccA" ref="selectRef1" :clear="false" v-model="timeRange" :localdata="timeRangeList"
					@toggleSelector="closeSelect('selectRef2')" coustIcon
					:placeholder="timeRange.toString().indexOf('_') > -1 && timeRange.split('_').length == 2 ? timeRange.substring(5, 10).replaceAll('-', '.') + '-' + timeRange.substring(16, 21).replaceAll('-', '.') : '请选择'">

					>
					<template #itemImg="item">
						<view class="item-img">
							<image class="img" v-if="item.value === timeRange" src="@/static/imgs-liuhe/activity/item-selected.png">
							</image>
						</view>
					</template>
				</uni-data-select>
			</view>
			<uni-data-select ref="selectRef2" :clear="false" v-model="type" :localdata="typeList"
				@toggleSelector="closeSelect('selectRef1')" coustIcon>
				<template #itemImg="item">
					<view class="item-img">
						<image class="img" v-if="item.value === type" src="@/static/imgs-liuhe/activity/item-selected.png">
						</image>
					</view>
				</template>
			</uni-data-select>
		</view>
		<uni-drawer ref="pay" mode="right" :width="100">
			<time-picker :multiple="true" :tipVisible="false" @closePay="closePay" @changeTime="onGetDate" :line="'.'"
				:contentStyle="{ padding: 0 }">
			</time-picker>
		</uni-drawer>
		<z-paging :style="`height: calc(${winHeight}px - 360rpx);margin-top:20rpx;`" class="paging" ref="paging"
			v-model="list" @query="getMyCommission" :lower-threshold="10" :refresher-enabled="true" :refresherAnimated="false"
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
			:loading-more-no-more-text="$t('pages.common.promoteEarn.components.Commission.text1')" :hide-empty-view="false"
			:empty-view-center="true" :empty-view-text="$t('pages.luntan.masterForum.noData')"
			:empty-view-img="'@/static/imgs-liuhe/activity/empty.png'" :fixed="false"
			:empty-view-style="{ 'margin-bottom': '170px' }" :empty-view-img-style="{ 'width': '398rpx', 'height': '398rpx' }"
			:empty-view-title-style="{ 'color': ' #D8D8D8', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }">
			<view class="item-box" v-show="list.length">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="flex flex-1">
						<text class="text">{{ item.typeName }}</text>
						<view class="time">{{ item.createTime.replace(/-/g, ".") }}</view>
					</view>
					<view class="flex flex-end">
						<view class="text">
							{{ $t('pages.common.promoteEarn.components.Commission.text2') }}{{ item.activeBettingAmount }}
						</view>
						<view class="text money-box">{{ $t('pages.common.promoteEarn.components.Commission.text3') }}<text
								class="money">{{ item.money }}</text></view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>
<script>
import {
	myCommission,
	getRateType
} from '@/utils/ptp/index.js'
import defaultTemplate from '@/utils/defaultTemplate'
import {
	mapGetters
} from 'pinia';
import TimePicker from "@/components/common/time-picker-earn.vue";

export default {
	components: {
		TimePicker
	},
	data() {
		return {
			winHeight: 0,
			timeRange: 1,
			timeRangeList: [
				// {
				// 	value: -1,
				// 	text: this.$t("pages.common.promoteEarn.components.Commission.text4")
				// },
				{
					value: 1,
					text: this.$t("pages.common.promoteEarn.components.Commission.text5")
				},
				{
					value: 7,
					text: this.$t("pages.common.promoteEarn.components.Commission.text6")
				},
				{
					value: 14,
					text: this.$t("pages.common.promoteEarn.components.Commission.text7")
				},
				{
					value: 30,
					text: this.$t("pages.common.promoteEarn.components.Commission.text8")
				},
				{
					value: 35,
					text: "自定义"
				},
			],
			type: -1,
			typeList: [],
			list: [],
			showS: false,
			rsaa: true,
			tt: ''
		};
	},
	computed: {
		...mapState(useAppInfoStore, ['themeColor']),
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
		},
		type() {
			this.$refs.paging.reload();
		},

	},
	mounted() {
		this.getRateTypeList()
		this.winHeight = uni.getSystemInfoSync().windowHeight;
	},
	methods: {
		ccA(item) {
			if (item == 35) {
				this.openTime();
				return;
			}
		},
		changeSelect(item) {
			console.log(item);
			this.showS = this.$refs.selectRef1.showSelector;
			if (this.$refs.selectRef1.showSelector && typeof (this.timeRange) == 'string' && this.timeRange.indexOf("_") > 0) {
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
		async getRateTypeList() {
			const res = await getRateType()
			const result = defaultTemplate(
				[{
					id: '',
					name: "",
				}],
				res.result
			)
			const typeList = result.map(item => {
				return {
					value: item.id,
					text: item.name
				}
			})
			typeList.unshift({
				value: -1,
				text: this.$t("pages.common.promoteEarn.components.Commission.text9")
			})
			this.typeList = typeList
		},
		async getMyCommission(pageNo) {
			const params = {
				timeRange: this.timeRange,
				type: this.type,
				pageNum: pageNo,
				pageSize: 10
			}
			const res = await myCommission(params)
			const {
				records
			} = defaultTemplate({
				records: [{
					typeName: '',
					createTime: '',
					activeBettingAmount: '',
					money: '',
				}]
			}, res.result)
			this.$refs.paging.complete(records);
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
	// gap: 20rpx;

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

		::v-deep .uni-select {
			border: none;
			width: 170rpx;
			height: 88rpx;
			font-size: 26rpx;

			.uni-select__input-text {
				width: fit-content;
				margin-right: 20rpx;
				color: #404040;
			}

			.uni-select__selector {
				z-index: 999;
				transform: translateY(-26rpx);
				border-radius: 24rpx;
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

			.uni-select__input-text {
				color: #A1A1A1;
			}

			.uni-select__selector-scroll {
				max-height: 700rpx;
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
				border-radius: 16rpx;
				justify-content: center;
				width: 248rpx;
				height: 88rpx;

				.uni-select__input-box {
					flex: none;
					gap: 10rpx;
					width: 100%;
					justify-content: space-between;

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
						justify-content: left;
					}
				}
			}
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

				.time {
					color: #404040;
					font-size: 24rpx;
					margin-top: 10rpx;
					width: 150rpx;
				}

				.text {
					font-size: 28rpx;
					color: #404040;
				}

				.flex {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
				}

				.flex-1 {
					flex: 1;
				}

				.flex-end {
					align-items: flex-end;
				}

				.money-box {
					margin-top: 10rpx;

					.money {
						color: var(--theme-auxiliary-color-remind);
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
