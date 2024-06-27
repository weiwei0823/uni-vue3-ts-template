<template>
	<view :class="['theme-' + themeColor.name]">
		<view class="calendar">
			<view class="header">
				<svg @click="getPreMonth" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
					fill="none">
					<rect x="0.5" y="0.5" width="21" height="21" rx="5.5" :stroke="themeColor.themeAuxiliaryColorDefault" />
					<path d="M12.834 15.8887L7.9451 10.9998L12.834 6.11089" stroke="#404040" stroke-width="2"
						stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<view class="title">{{ year }}年{{ month < 10 ? '0' + month : month }}月</view>
				<svg @click="getNextMonth" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
					fill="none">
					<rect x="21.5" y="21.5" width="21" height="21" rx="5.5" transform="rotate(180 21.5 21.5)"
						:stroke="themeColor.themeAuxiliaryColorDefault" />
					<path d="M9.16602 6.11133L14.0549 11.0002L9.16602 15.8891" stroke="#404040" stroke-width="2"
						stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</view>
			<view class="weeks">
				<view class="text" :class="{ gray: ['日', '六'].includes(item) }" v-for="item in weeks">{{ item }}
				</view>
			</view>
			<view class="days">
				<view class="day" v-for="item in  dateList">
					<view class="text" :class="[{ selected: isSelected(item.date, item.month) },item.color]"
						@click="isOpen(item.date, item.month)">
						{{ item.date }}
					</view>
				</view>
			</view>
		</view>
		<div class="ft">
			{{ noticeStr }}
		</div>
	</view>
</template>

<script>
	import {
		listLotteryDate
	} from '../../../utils/lottery/index'
	import {
		mapGetters
	} from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";
	export default {
		name: "dateItem",
		props: {
			lotteryType: {
				type: String | Number,
				default: '',
			}
		},
		data() {
			return {
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				showLeft: false,
				showRight: true,
				year: 0,
				month: 1,
				key: 0,
				dateStr: '',
				todayMonth: 0,
				day: 0,
				todayDay: 0,
				dayAc: 0,
				dateList: [],
				list: [],
				dayList: [],
				noticeStr: '',
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
		},
		mounted() {
			this.listLotteryDate()
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
				this.noticeStr = this.$t('components.common.date.text1') + dateStr + this.$t(
					'components.common.date.text2')
			} else {
				this.noticeStr = this.$t('components.common.date.text1') + dateStr + this.$t(
					'components.common.date.text3')
			}
		},
		methods: {
			//开奖日期
			listLotteryDate() {
				let prams = {
					lotteryType: this.lotteryType
				}
				listLotteryDate(prams).then(res => {
					res.result.forEach(item => item.monthSort = parseInt(item.month.replaceAll("-", "")));
					this.list = res.result.sort((a, b) => a.monthSort - b.monthSort);
					this.dayList = res.result?.[this.key]?.dayList || []
					this.dateStr = res.result?.[this.key]?.month || `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
					let dateArr = this.dateStr.split("-")
					this.year = parseInt(dateArr[0]);
					this.month = parseInt(dateArr[1]);
					this.getDays()
				}).catch(err => {
					console.log(err)
				})
			},
			isSelected(day, month) {
				if (!day) {
					return false
				}
				let monthStr = month < 10 ? '0' + month : month
				let dayStr = day < 10 ? '0' + day : day
				let dateStr = this.year + "-" + monthStr + "-" + dayStr
				return this.month == month && day == this.dayAc
			},
			isOpen(day, month) {
				if (!day) {
					return false
				}
				this.month = month
				this.dayAc = day
				let monthStr = this.month < 10 ? '0' + this.month : this.month
				let dayStr = this.dayAc < 10 ? '0' + this.dayAc : this.dayAc
				let dateStr = this.year + "-" + monthStr + "-" + dayStr
				if (this.dayList.includes(dateStr)) {
					if ((this.month + "-" + this.dayAc) == (this.todayMonth + "-" + this.todayDay)) {
						this.noticeStr = this.$t('components.common.date.text1') + dateStr + this.$t(
							'components.common.date.text2')
					} else {
						this.noticeStr = dateStr + this.$t('components.common.date.text2')
					}
				} else {
					if ((this.month + "-" + this.dayAc) == (this.todayMonth + "-" + this.todayDay)) {
						this.noticeStr = this.$t('components.common.date.text1') + dateStr + this.$t(
							'components.common.date.text3')
					} else {
						this.noticeStr = dateStr + this.$t('components.common.date.text3')
					}
				}
			},
			/**获取上一个月 */
			getPreMonth() {
				this.key = this.key - 1
				if (this.list[this.key]) {
					this.dateStr = this.list[this.key].month
					this.dayList = this.list[this.key].dayList
					let dateArr = this.dateStr.split("-")
					this.year = parseInt(dateArr[0])
					this.month = parseInt(dateArr[1])
				} else {
					var year2 = this.year;
					var month2 = this.month - 1;
					if (month2 == 0) {
						//1月的上一月是前一年的12月
						year2 = year2 - 1;
						month2 = 12;
					}
					//TODO 补充逻辑
					this.year = year2;
					this.month = month2;
					this.dayList = this.list[0].dayList
				}
				this.showRight = true
				this.showLeft = false
				this.dayAc = this.day
				this.getDays()
			},
			//获取下一月
			getNextMonth() {
				this.key = this.key + 1
				if (this.list[this.key]) {
					this.dateStr = this.list[this.key].month
					let dateArr = this.dateStr.split("-")
					this.year = parseInt(dateArr[0])
					this.month = parseInt(dateArr[1])
					this.dayList = this.list[this.key].dayList
				} else {
					var year2 = this.year;
					var month2 = this.month + 1;
					if (month2 == 13) {
						//12月的下月是下年的1月
						this.year = year2 + 1
						this.month = 1;
					} else {
						this.month = this.month + 1
					}
					this.dayList = this.list[0].dayList
				}
				this.showRight = false
				this.showLeft = true

				this.dayAc = this.day
				this.getDays()
			},
			daysInMonth(month, year) {
				return new Date(year, month + 1, 0).getDate();
			},
			getDays() {
				let dayStr = '';
				this.dateList = []
				// 每个月的第一天
				let firstDay = new Date(this.year, this.month - 1, 2);
				let dayInMonth = this.daysInMonth(this.month - 1, this.year);
				// 第一天星期几(0-6)
				let weekday = firstDay.getDay();
				// 每一个都是从1号开始
				let date = 1;
				let i = 0
				let color = ''
				let obj = {}
				let arr = []
				let monthStr = ''
				let dateStr = ''
				for (let j = 0; j < weekday - 1; j++) {
					obj = {
						'date': '',
						'color': 0
					}
					this.dateList.push(obj)
				}
				for (; date <= dayInMonth; date++) {
					color = ''
					monthStr = this.month > 9 ? this.month : '0' + this.month
					dayStr = date < 10 ? '0' + date : date
					dateStr = this.year + "-" + monthStr + "-" + dayStr
					if (this.dayList.includes(dateStr)) {
						color = 'act'
					}
					arr.push({
						'date': date,
						'color': color
					})
					this.dateList.push({
						'month': this.month,
						'date': date,
						'color': color
					})
					this.isOpen(this.day, this.month);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.red-hd {
		background-color: var(--theme-color);
		height: 92rpx;
		margin-top: 40rpx;
		color: #fff;
		line-height: 100rpx;
		font-size: 32rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

		span {
			display: block;
			color: #fff;
			font-size: 32rpx;
		}
	}

	.date-bd {
		padding-top: 40rpx;
		background: #fff;

		span {
			display: inline-block;
			width: 14.28571428%;
			margin-bottom: 20rpx;
			text-align: center;

			b {
				display: inline-block;
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 100%;
				font-size: 24rpx;
				font-weight: 200;
				border: 1Px solid rgba(255, 0, 0, 0);
			}

			.act {
				background: var(--theme-color);
				color: #fff;
				border: 1Px solid var(--theme-color);
			}

			.hover {
				border: 1px solid var(--theme-color);
				background: #fff;
				color: var(--theme-color);
			}
		}
	}

	.ft {
		text-align: center;
		padding: 20rpx 0;
		color: #404040;
		font-size: 30rpx;
	}

	.calendar {
		background: #fff;
		border-radius: 24rpx;
		padding-bottom: 40rpx;
		margin-top: 20rpx;

		.header {
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;
			height: 88rpx;
			box-sizing: border-box;

			.title {
				flex: 1;
				text-align: center;
				color: #404040;
				font-size: 30rpx;
				font-weight: 600;
				line-height: 44rpx;
			}
		}

		.weeks {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			text-align: center;
			color: #404040;
			font-size: 28rpx;
			line-height: 44rpx;
			margin-top: 20rpx;
			margin-bottom: 40rpx;

			&:last-child,
			&:first-child {
				color: #404040;
			}
		}

		.days {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			row-gap: 40rpx;
			font-size: 28rpx;

			.day {
				display: grid;
				place-content: center;

				.text {
					width: 44rpx;
					height: 44rpx;
					line-height: 44rpx;
					text-align: center;
					z-index: 2;
					border: 2rpx solid #fff;
				}

				.act {
					background: var(--theme-color);
					color: #fff;
					border-radius: 12rpx;
					border: 2rpx solid var(--theme-color) !important;
				}

				.selected {

					border: 2rpx solid #404040;
					// background: var(--theme-color);
					background-color: #fff;
					border-radius: 12rpx;
					// color: #fff !important;
					color: #404040 !important;

					font-size: 28rpx;
					font-weight: 500;

				}
			}

			.bg {
				background: #e0eaf5;
			}

			.bg-first {
				position: relative;

				&::before {
					content: '';
					width: 44rpx;
					height: 44rpx;
					background: #fff;
					position: absolute;
					left: 0;
					z-index: 1;
				}
			}

			.bg-last {
				position: relative;

				&::after {
					content: '';
					width: 44rpx;
					height: 44rpx;
					background: #fff;
					position: absolute;
					right: 0;
					z-index: 1;
				}
			}
		}

		.gray-rounded {
			.text {
				background: #e0eaf5;
				border-radius: 12rpx;
			}
		}
	}
</style>
