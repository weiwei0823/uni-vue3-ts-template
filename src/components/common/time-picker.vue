<template>
  <view
    class="date-picker"
    :class="['theme-' + themeColor.name]"
    :style="{ height: uWindowHeight }"
  >
    <Header :title="title" :isBack="false" showBack @back="back">
      <template v-slot:right>
        <block>
          <view class="confirm" @click="cofim">{{
            $t('pages.common.timePicker.confirm')
          }}</view>
        </block>
      </template>
    </Header>
    <view class="content" :style="contentStyle">
      <view class="tips" v-if="tipVisible">
        <view class="texts">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle
              cx="7"
              cy="7"
              r="7"
              transform="matrix(1 0 0 -1 0 14)"
              :fill="themeColor.themeAuxiliaryColorRemind"
            />
            <path
              d="M6.80208 8.27669C6.32083 8.27669 6 7.95587 6 7.55482V4.10587C6 3.70482 6.32082 3.38398 6.80208 3.38398C7.28332 3.38398 7.60415 3.7048 7.60415 4.10586V7.55481C7.60415 7.95586 7.28333 8.27669 6.80208 8.27669ZM6.80208 9.47982C7.28332 9.47982 7.60415 9.80064 7.60415 10.2819C7.60415 10.7632 7.28333 11.084 6.80208 11.084C6.32083 11.084 6 10.7632 6 10.2819C6 9.80065 6.32082 9.47982 6.80208 9.47982Z"
              fill="white"
            />
          </svg>
          <view class="text">{{ $t('pages.common.timePicker.text1') }}</view>
        </view>
        <view class="remark">{{ $t('pages.common.timePicker.remark') }}</view>
      </view>
      <view class="calendar">
        <view class="header">
          <svg
            @click="updateSelectedDate('up')"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="21"
              height="21"
              rx="5.5"
              :stroke="themeColor.themeAuxiliaryColorDefault"
            />
            <path
              d="M12.834 15.8887L7.9451 10.9998L12.834 6.11089"
              stroke="#404040"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <view class="title">{{
            $u.timeFormat(selected_date, 'yyyy年mm月')
          }}</view>
          <svg
            @click="updateSelectedDate('next')"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <rect
              x="21.5"
              y="21.5"
              width="21"
              height="21"
              rx="5.5"
              transform="rotate(180 21.5 21.5)"
              :stroke="themeColor.themeAuxiliaryColorDefault"
            />
            <path
              d="M9.16602 6.11133L14.0549 11.0002L9.16602 15.8891"
              stroke="#404040"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </view>
        <view class="weeks">
          <view
            class="text"
            :class="{ gray: ['日', '六'].includes(item) }"
            v-for="item in weeks"
            >{{ item }}
          </view>
        </view>
        <view class="days">
          <view
            class="day"
            :class="{
              bg: isShowBg(day),
              'bg-first': isBgFirst(day),
              'bg-last': isBgLast(day),
              'gray-rounded': isGrayRounded(day),
              gray: [0, 6].includes(new Date(day).getDay())
            }"
            v-for="day in days"
          >
            <view
              v-if="day"
              class="text"
              :class="{
                selected: isSelected(day),
                locked: caculationIsLocked(day)
              }"
              @click="handleSelect(day)"
            >
              {{ $u.timeFormat(day, 'd') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'pinia'
import Header from '@/components/common/header/index.vue'

export default {
  components: {
    Header
  },
  props: {
    startTimes: String,
    endTimes: String,
    tipVisible: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    contentStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    propsTitle: String,
    multiple: {
      type: Boolean,
      default: () => {
        return true
      }
    },

    selectDayRange: {
      type: Number,
      default: 0
    },
    /**
     * 	只允许包括今天以内往前倒#{rangeTodayBeforeDays}天可以被选择
     */
    rangeTodayBeforeDays: {
      type: Number,
      default: 0
    },
    rangeOutTips: {
      type: String,
      default: '无法超出日期区间范围'
    }
  },
  data() {
    return {
      title: this.$t('pages.common.timePicker.dateTitle'),
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      selected_date: new Date(),
      start_date: null,
      end_date: null
    }
  },
  computed: {
    ...mapGetters(['themeColor', 'uWindowHeight']),
    theme() {
      return getApp().globalData.themeMap[this.$config.station]
    },
    days() {
      return this.getDaysInMonth(this.selected_date)
    }
  },
  mounted() {
    if (this.propsTitle) {
      this.title = this.propsTitle
    }
    if (this.startTimes) {
      this.start_date = new Date(this.startTimes.replace(/\./g, '/'))
    }
    if (this.endTimes) {
      this.end_date = new Date(this.endTimes.replace(/\./g, '/'))
    }
  },
  methods: {
    back() {
      this.$emit('closePay')
    },
    cofim() {
      const { start_date, end_date } = this
      if (start_date && !end_date) {
        this.$emit('changeTime', {
          start: this.$u.timeFormat(start_date, 'yyyy.mm.dd'),
          end: this.$u.timeFormat(start_date, 'yyyy.mm.dd')
        })
      } else if (!start_date && end_date) {
        this.$emit('changeTime', {
          start: this.$u.timeFormat(end_date, 'yyyy.mm.dd'),
          end: this.$u.timeFormat(end_date, 'yyyy.mm.dd')
        })
      } else if (start_date && end_date) {
        this.$emit('changeTime', {
          start: this.$u.timeFormat(start_date, 'yyyy.mm.dd'),
          end: this.$u.timeFormat(end_date, 'yyyy.mm.dd')
        })
      }
      this.back()
    },
    // 切换月份
    updateSelectedDate(type) {
      const numMap = {
        up: -1,
        next: 1
      }
      const prevMonth = new Date(this.selected_date)
      prevMonth.setMonth(prevMonth.getMonth() + numMap[type])
      this.selected_date = prevMonth
    },
    // 是否显示背景色
    isShowBg(day) {
      const { start_date, end_date } = this
      if (!start_date || !end_date) {
        return false
      }
      const start = new Date(start_date)
      const end = new Date(end_date)
      const day_date = new Date(day)
      return day_date >= start && day_date <= end
    },
    isBgFirst(day) {
      return (
        new Date(day).getTime() === new Date(this.start_date).getTime() ||
        new Date(day).getDay() === 0
      )
    },
    isBgLast(day) {
      return (
        new Date(day).getTime() === new Date(this.end_date).getTime() ||
        new Date(day).getDay() === 6
      )
    },
    isGrayRounded(day) {
      return (this.isBgFirst(day) || this.isBgLast(day)) && this.isShowBg(day)
    },
    // 是否选中
    isSelected(day) {
      return (
        day.getTime() === this.start_date?.getTime() ||
        day.getTime() === this.end_date?.getTime()
      )
    },
    caculationIsLocked(day) {
      if (this.rangeTodayBeforeDays <= 0) return false

      const nowTime = new Date().getTime()
      const timestampItem = new Date(day).getTime()
      if (
        nowTime < timestampItem ||
        nowTime - timestampItem >= 24 * 3600 * 1000 * this.rangeTodayBeforeDays
      ) {
        return true
      }

      if (this.selectDayRange <= 0) return false
      else {
        const timestampStartDate = new Date(this.start_date).getTime()
        const timestampItem = new Date(day).getTime()
        if (
          timestampItem - timestampStartDate >=
          24 * 3600 * 1000 * this.selectDayRange
        ) {
          return true
        }
      }

      return false
    },

    // 处理选择
    handleSelect(day) {
      if (this.caculationIsLocked(day)) {
        try {
          pop(this.rangeOutTips)
        } catch (e) {}
        return
      }

      if (!this.multiple) {
        this.start_date = day
        this.end_date = day
        return
      }
      if (!this.start_date && !this.end_date) {
        this.start_date = day
      } else if (this.start_date && !this.end_date) {
        if (day.getTime() < this.start_date.getTime()) {
          this.start_date = day
          return
        }
        // 如果超过30天
        if (
          day.getTime() - this.start_date.getTime() >
          30 * 24 * 60 * 60 * 1000
        ) {
          pop('不能选择超过30天的日期')
          return
        }
        this.end_date = day
      } else if (this.start_date && this.end_date) {
        this.start_date = day
        this.end_date = null
      }
    },
    // 获取某个日期的所有天
    getDaysInMonth(date) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)

      const daysInMonth = new Array(new Date(year, month, 1).getDay())

      for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        const dayDate = new Date(year, month, i)
        daysInMonth.push(dayDate)
      }

      return daysInMonth
    }
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  // height: var(--vh);
  background: var(--theme-auxiliary-color-default);
  max-width: 480px;
  width: 100%;
  margin: 0 auto;

  .confirm {
    text-align: right;
    color: var(--theme-color);
    font-size: 30rpx;
  }

  .content {
    padding: 20rpx 28rpx;
    box-sizing: border-box;

    .tips {
      padding: 20rpx 28rpx;
      background: #eee;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #a1a1a1;

      .texts {
        display: flex;
        align-items: center;

        .text {
          margin-left: 10rpx;
        }
      }

      .remark {
        margin-left: 38rpx;
      }
    }
  }

  .calendar {
    background: #fff;
    border-radius: 24rpx;
    padding: 20rpx 0 40rpx;
    margin-top: 20rpx;

    .header {
      display: flex;
      align-items: center;
      padding: 0 28rpx;

      .title {
        flex: 1;
        text-align: center;
        color: #404040;
        font-size: 30rpx;
        font-weight: 500;
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

      .day {
        display: grid;
        place-content: center;

        .text {
          width: 44rpx;
          height: 44rpx;
          line-height: 44rpx;
          text-align: center;
          z-index: 2;
        }

        .selected {
          background: var(--theme-color);
          border-radius: 12rpx;
          color: #fff;
        }

        .locked {
          background: #dfdfdf !important;
          border-radius: 12rpx;
          color: #fff;
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

    .gray {
      color: #404040;
    }

    .gray-rounded {
      .text {
        background: #e0eaf5;
        border-radius: 12rpx;
      }
    }
  }
}
</style>
