<template>
	<view>
		<view style="height: 24px;"></view>
		<scroll-view :scroll-y="true" :style="'height: '+[scrollHeight]+'px;'" @scrolltolower="scrollTolower"
			:lower-threshold="500">
			<view class="calendar" v-for="(item,index) in dayList" :key="index">
				<view class="year-month">{{item.year+'-'+item.month}}</view>
        <view class="weeks">
          <view v-for="(item,index) in week" :key="index">{{item}}</view>
        </view>
				<view class="days">
					<view class="day" :class="getClass(item.year,item.month,ite)" v-for="(ite,ind) in item.day"
						:key="ind" :style="''+['width:'+dayWidth+'px;height:'+dayWidth+'px']"
						@click="selDay(item.year,item.month,ite)">
						<view class="dd" :style="'height: '+[dayWidth]+'rpx;'">{{ite}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "s-calendar1",
		data() {
			return {
				//日历
				year: '', //当前年份
				month: '', //当前月份
				day: '', //当前天
				week: ['日', '一', '二', '三', '四', '五', '六'],
				dayList: [], //列表
				startYear: '', //选择开始年份
				startMonth: '', //选择开始月份
				startDay: '', //选择开始天
				endYear: '', //选择结束年份
				endMonth: '', //选择结束月份
				endDay: '', //选择结束日
				dayWidth: ''
			};
		},
		computed: {
			//总选择的天数
			allDay: function() {
				if (!this.startYear || !this.startMonth || !this.startDay || !this.endYear || !this.endMonth || !this
					.endDay) {
					return 0;
				}
				let start = new Date(this.startYear, this.startMonth - 1, this.startDay);
				let end = new Date(this.endYear, this.endMonth - 1, this.endDay);
				return this.countDays(start, end);
			},
			//组件高度,默认全屏高度
			scrollHeight: function() {
				return uni.getSystemInfoSync().windowHeight - 24;
			}
		},
		created() {
			this.dayWidth = uni.getSystemInfoSync().screenWidth / 7;
			this.setNow();
			this.setDay()
		},
		methods: {
			/**
			 * 设置当前年月日
			 */
			setNow() {
				let date = new Date();
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
			},
			/**
			 * 设置日历天,当前月分和后两个月
			 */
			setDay() {
				//将日历增加3个月
				for (var j = 0; j < 3; j++) {
					let y = this.getNextNDate(this.year, this.month, j);
					let date = new Date(y.year, y.month - 1, 1);
					let date1 = new Date(y.year, y.month, 0);
					//获取当前月第一天是周几，0等于周日
					let oneDay = date.getDay();
					//获取当前月天数
					let monthDay = date1.getDate();
					let dayList = [];
					for (var i = 0; i < oneDay; i++) {
						dayList.push('')
					}
					for (var i = 0; i < monthDay; i++) {
						dayList.push(i + 1)
					}
					this.dayList.push({
						year: y.year,
						month: y.month,
						day: dayList
					})
				}
			},
			/**
			 * 获取选中样式
			 */
			getClass(year, month, day) {
				if (!year || !month || !day) {
					return '';
				}
				//只选择了1天
				if (!this.endYear || !this.endMonth || !this.endDay) {
					if (this.startYear == year && this.startMonth == month && this.startDay == day) {
						return 'day-yuan'
					} else {
						return '';
					}
				} else {
					//选择了多天
					let startTime = new Date(this.startYear, this.startMonth - 1, this.startDay).getTime()
					let endTime = new Date(this.endYear, this.endMonth - 1, this.endDay).getTime()
					let nowTime = new Date(year, month - 1, day).getTime();
					if (startTime == nowTime) {
						return 'day-left';
					}
					if (endTime == nowTime) {
						return 'day-right';
					}
					if (startTime < nowTime && endTime > nowTime) {
						return 'day-none'
					}
				}
			},
			selDay(year, month, day) {
				if (!this.startYear || !this.startMonth || !this.startDay) {
					this.startYear = year;
					this.startMonth = month;
					this.startDay = day;
				} else if (!this.endYear || !this.endMonth || !this.endDay) {
					let startTime = new Date(this.startYear, this.startMonth - 1, this.startDay).getTime()
					let endTime = new Date(year, month - 1, day).getTime()
					if (endTime < startTime) {
						uni.showToast({
							title: '不能小于开始时间',
							icon: 'none'
						})
						return;
					}
					if (endTime == startTime) {
						this.startYear = '';
						this.startMonth = '';
						this.startDay = '';
						return;
					}
					this.endYear = year;
					this.endMonth = month;
					this.endDay = day;
				} else {
					this.endYear = '';
					this.endMonth = '';
					this.endDay = '';
					this.startYear = year;
					this.startMonth = month;
					this.startDay = day;
				}
			},
			/**
			 * 滚动到底
			 */
			scrollTolower() {
				let y = this.getNextNDate(this.year, this.month, 3);
				this.year = y.year;
				this.month = y.month;
				this.setDay()
			},
			/**
			 * 计算天数
			 */
			countDays(startTime, endTime) {
				return parseInt((endTime.getTime() - startTime.getTime()) / 24 / 60 / 60 / 1000)
			},
			/**
			 * 获取year,month后n天的日期
			 */
			getNextNDate(year, month, n) {
				let m = 0;
				if (n > 12) {
					m = parseInt(n / 12);
					year += m;
				}
				let mm = n - m * 12;
				if (month + mm > 12) {
					year += 1;
					month = month + mm - 12;
				} else {
					month += mm;
				}
				return {
					year: year,
					month: month
				}
			}
		},
	}
</script>

<style>
	.weeks {
		width: 100%;
		height: 24px;
		display: flex;
		justify-content: space-around;
		border-top: 2rpx solid #EBEBEB;
		border-bottom: 2rpx solid #EBEBEB;
		line-height: 24px;
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		position: fixed;
		top: var(--window-top);
		background: #FFFFFF;
		z-index: 9;
	}

	.calendar {
		border-bottom: 16rpx solid #F7F7F7;
		padding-bottom: 40rpx;
	}

	.calendar:nth-last-child(1) {
		border: none;
	}

	.year-month {
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #000000;
		line-height: 40rpx;
		text-align: center;
		margin-top: 60rpx;
	}

	.days {
		display: flex;
		flex-wrap: wrap;
	}

	.day {
		text-align: center;
		margin-top: 40rpx;
		position: relative;
	}

	.day-yuan {
		border-radius: 100%;
		background: #00CDCD;
	}

	.col-fff {
		color: #fff !important;
	}

	.col-333 {
		color: #404040 !important;
	}

	.col-999 {
		color: #999999 !important;
	}

	.day-left {
		border-radius: 100% 0 0 100%;
		background: #00CDCD;
	}

	.day-right {
		border-radius: 0 100% 100% 0;
		background: #00CDCD;
	}

	.day-none {
		background: #e8ffff;
	}

	.dd {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 34rpx;
		font-weight: bold;
		color: #404040;
	}
</style>
