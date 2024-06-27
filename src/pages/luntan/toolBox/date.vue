<template>
	<view class="toolbox-warp1 pc-max-width" :class="['theme-' + themeColor.name]"
		:style="{position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight,width:'100%'}">
		<Header :title="title" isFixed></Header>
		<scroll-view scroll-y="true" :style="{height:`calc( ${winHeight}px - 88rpx)`,marginTop:'20rpx'}"
			:enhanced="true" :bounces="false" :show-scrollbar="false">
			<view class="date-body" style="">
				<view class="title-box">
					<p class="sub-title-1">{{ $t('components.common.notice.notice.text0') }}</p>
					<view class="title">{{ content }}</view>
				</view>
				<date-item :lottery-type="lotteryType"></date-item>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import Notice from "@/components/common/notice/notice";
	import {
		listLotteryDate
	} from '@/utils/lottery/index'
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
  import useAppInfoStore from "@/store/modules/appInfoStore";
	import DateItem from "@/components/common/date/dateItem";

	export default {
		name: "date",
		components: {
			AlertInjectLayer,
			Header,
			Notice,
			DateItem
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t('pages.luntan.toolBox.date.title'),
				content: this.$t('pages.luntan.toolBox.date.content'),
				noticeStr: '',
				styleContent: {
					'font-size': '24rpx',
					'margin-top': '20rpx',
					'text-align': 'center',
				},
				lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE),
				showLeft: false,
				showRight: true,
				year: 0,
				month: 1,
				todayMonth: 0,
				day: 0,
				todayDay: 0,
				dayAc: 0,
				dateList: [],
				dayList: [],
				winHeight: 0
			}
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor'])
		},
		onLoad() {
			let date = new Date();
			this.year = date.getFullYear();
			this.month = date.getMonth() + 1; // 7
			this.todayMonth = date.getMonth() + 1;
			this.day = date.getDate()
			this.dayAc = date.getDate()
			this.todayDay = date.getDate()
			let dayStr = this.day < 10 ? '0' + this.day : this.day
			let dateStr = this.year + "-" + this.month + "-" + dayStr
			if (this.dayList.includes(dateStr)) {
				this.noticeStr = this.$t('pages.luntan.toolBox.date.text7') + dateStr + this.$t(
					'pages.luntan.toolBox.date.text8')
			} else {
				this.noticeStr = this.$t('pages.luntan.toolBox.date.text9') + dateStr + this.$t(
					'pages.luntan.toolBox.date.text10')
			}
			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			this.listLotteryDate()
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			setStyle() {
				return {
					backgroundColor: this.themeColor.themeColor,
				}
			},
			setActive() {
				return {
					border: `1px solid ${this.themeColor.themeColor}`,
				}
			},
			isOpen(day) {
				if (!day) {
					return false
				}
				this.dayAc = day
				let monthStr = this.month < 10 ? '0' + this.month : this.month
				let dayStr = this.dayAc < 10 ? '0' + this.dayAc : this.dayAc
				let dateStr = this.year + "-" + monthStr + "-" + dayStr
				if (this.dayList.includes(dateStr)) {
					if ((this.month + "-" + this.dayAc) == (this.todayMonth + "-" + this.todayDay)) {
						this.noticeStr = this.$t('pages.luntan.toolBox.date.text9') + dateStr + this.$t(
							'pages.luntan.toolBox.date.text8')
					} else {
						this.noticeStr = dateStr + this.$t('pages.luntan.toolBox.date.text8')
					}
				} else {
					if ((this.month + "-" + this.dayAc) == (this.todayMonth + "-" + this.todayDay)) {
						this.noticeStr = this.$t('pages.luntan.toolBox.date.text9') + dateStr + this.$t(
							'pages.luntan.toolBox.date.text10')
					} else {
						this.noticeStr = dateStr + this.$t('pages.luntan.toolBox.date.text10')
					}
				}
			},
			/**获取上一个月 */
			getPreMonth() {
				var year2 = this.year;
				var month2 = this.month - 1;
				if (month2 == 0) {
					//1月的上一月是前一年的12月
					this.year = year2 - 1;
					this.month = 12;
				}
				this.showRight = true
				this.showLeft = false
				this.dayAc = this.day
				this.getDays()
			},
			//获取下一月
			getNextMonth() {
				var year2 = this.year;
				var month2 = this.month + 1;
				if (month2 == 13) {
					//12月的下月是下年的1月
					this.year = year2 + 1
					this.month = 1;
				} else {
					this.month = this.month + 1
				}
				this.showRight = false
				this.showLeft = true
				this.dayAc = 0
				this.getDays()
			},
			daysInMonth(month, year) {
				return new Date(year, month + 1, 0).getDate();
			},
			getDays() {
				let dayStr = '';
				// 每个月的第一天
				let firstDay = new Date(this.year, this.month - 1, 1);
				let dayInMonth = this.daysInMonth(this.month - 1, this.year);
				// 每个月的最后一天
				let lastDay = new Date(this.year, this.month - 1, dayInMonth);
				// 第一天星期几(0-6)
				let weekday = firstDay.getDay();
				// 每一个都是从1号开始
				let date = 1;
				let i = 0
				let color = ''
				let obj = {}
				let arr = []
				let dateStr = ''
				for (let j = 0; j < weekday; j++) {
					obj = {
						'date': '',
						'color': 0
					}
					arr.push(obj)
				}
				let dateList = []
				let monthStr = this.month < 10 ? "0" + this.month : this.month
				for (; date <= dayInMonth; date++) {
					weekday++
					color = ''
					dayStr = date < 10 ? '0' + date : date

					dateStr = this.year + "-" + monthStr + "-" + dayStr
					if (this.dayList.includes(dateStr)) {
						color = 'color'
					}
					arr.push({
						'date': date,
						'color': color
					})
					if (weekday % 7 == 0) {
						weekday = 0;
						dateList[i] = arr
						arr = []
						i++
					}
				}
				if (weekday > 0) {
					dateList[i] = arr
				}
				this.dateList = dateList
			},
			//开奖日期
			async listLotteryDate() {
				let prams = {
					lotteryType: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
						.LOCAL_STORE_LOTTERYTYPE)
				}
				await listLotteryDate(prams).then(res => {
					res.result.forEach((item, index) => {
						this.dayList.push(...item.dayList)
					})
					this.getDays()
					this.isOpen(this.dayAc)
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.toolbox-warp1 {
		background: var(--theme-auxiliary-color-default);

		.date-body {
			// margin-top: 12rpx;
			box-sizing: border-box;

			.title-box {
				padding: 20rpx 28rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				background: #fff;
				border-radius: 24rpx;
				color: #404040;
				font-size: 28rpx;

				.sub-title-1 {
					font-size: 30rpx;
				}

				.title {
					margin-top: 20rpx;
					text-align: center;
				}
			}

			.calendar-box {
				margin-top: 38rpx;

				.calendar-title {
					height: 92rpx;
					line-height: 92rpx;
					padding: 0 24rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					//background: var(--theme-color);

					span {
						display: block;
						color: #fff;
						font-size: 32rpx;
					}
				}

				table {
					width: 100%;
					border-spacing: 0;
					color: #404040;
					font-size: 28rpx;
					border: 2rpx solid #dfdfdf;
					border-top: none;
					text-align: center;

					tr {
						height: 84rpx;

						th {
							font-weight: 400;
							width: 14.2857%;
						}

						span {
							display: block;
							width: 40rpx;
							height: 40rpx;
							line-height: 40rpx;
							margin: 0 auto;
							border-radius: 50%;
							overflow: hidden;
						}

						.color {

							color: #fff;
						}

						.active {
							background: #fff;
							color: #ff6b6b;
						}

						.disabled .color {
							background: #cfcfcf;
							color: #fff !important;
						}
					}

					tr:nth-of-type(2n) {
						background: #fbfbfb;
					}
				}

				.calendar-notice {
					text-align: center;
					color: #404040;
					font-size: 36rpx;
					margin-top: 36rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
