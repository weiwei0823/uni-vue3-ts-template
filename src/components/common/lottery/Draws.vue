<template>
  <view class="lottery">
    <view class="lottery-row">
      <view class="icon-text" v-for="(item, index) in numberList" :key="index">
        <view class="slot-icon"
          :style="{ background: `url(/static/img/liuhe/detail/bg-${item.color}.png)`, backgroundSize: '100% 100%' }">
          {{ item.number }}
        </view>
        <view class="slot-text">
          {{ item.shengXiao }}
        </view>
      </view>
      <view class="icon-text">
        <image class="plus" src="@/static/img/liuhe/detail/plus+.png"></image>
      </view>
      <view class="icon-text">
        <view class="slot-icon"
          :style="{ background: `url(/static/img/liuhe/detail/bg-${sixNumber.color}.png)`, backgroundSize: '100% 100%' }">
          {{ sixNumber.number }}
          <image src="@/static/img/liuhe/detail/te.png"></image>
        </view>
        <view class="slot-text">
          {{ sixNumber.shengXiao }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Draws",
  props: {
    lotteryDetail: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    numberList() {
      if (this.lotteryDetail.length > 0) {
        return this.lotteryDetail.slice(0, 6)
      } else {
        return []
      }
    },
    sixNumber() {
      if (this.lotteryDetail.length > 0) {
        return this.lotteryDetail[6]
      } else {
        return { color: 1, number: 0, shengXiao: '', wuXing: '' }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.lottery {
  .lottery-row {
    display: flex;
    flex: 1;
    justify-content: space-between;

    .icon-text {
      .plus {
        width: 48rpx;
        height: 48rpx;
        margin-top: 10rpx;
      }

      .slot-icon {
        width: 68rpx;
        height: 68rpx;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 32rpx;
        color: #000;
        border-radius: 50%;
        position: relative;

        image {
          position: absolute;
          top: -5px;
          background: #F0B12E;
          width: 32rpx;
          height: 32rpx;
          right: -5px;
          border-radius: 50%;
        }
      }

      .bg-amage-1 {
        background: #0A87CB;
      }

      .bg-amage-2 {
        background: #0AC868;
      }

      .bg-amage-3 {
        background: #D3556A;
      }

      .slot-text {
        font-weight: 400;
        font-size: 30rpx;
        line-height: 35rpx;
        color: #404040;
        text-align: center;
        margin-top: 10rpx;
      }

      span {
        font-size: 50rpx;
        font-weight: 700;
        color: #D9D9D9;
        line-height: 60rpx;
      }
    }
  }
}
</style>
