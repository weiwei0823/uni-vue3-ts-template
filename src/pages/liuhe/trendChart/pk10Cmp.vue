<template>
  <view class="calendar-content">
    <view class="calendar-content-header">
      <view class="period">期号</view>
      <view class="num-list">
        <view class="num-item" v-for="(item,index) in numList" :key="index">
          {{item}}
        </view>
      </view>
    </view>
    <scroll-view scroll-y class="record-list">
      <view :class="index%2 ? 'record-list-item gray' : 'record-list-item'"
            v-for="(item,index) in dataList" :key="index">
        <view class="left">
          {{item.shorNo}}
        </view>
        <view class="center">
          <view class="center-item" v-for="(i,k) in item.numberList" :key="k">
            <view>
              <view :style="setNumStyle(i.color)">{{i.number}}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
export default {
  props:{
    dataList:{}
  },
  data(){
    return {
      numList: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十"
      ],
    }
  },
  methods:{
    setNumStyle(color) {
      switch (color) {
        case 1:
          return {
            color: "#EC3232"
          }
        case 2:
          return {
            color: "#1592FF"
          }
        case 3:
          return {
            color: '#07C160'
          }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-content {
  padding: 0 28rpx;

  .calendar-content-header {
    background: #F4F4F4;
    display: flex;
    padding: 10rpx 0;
    justify-content: space-between;
    align-items: center;

    .period {
      width: 140rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #404040;
      font-family: 'MiSans';
      font-size: 28rpx;
      font-weight: 400;
      flex: 0 0 auto;
    }

    .num-list {
      display: flex;
      width: calc(100% - 140rpx);
      .num-item {
        width: 72rpx;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #404040;
        font-family: 'MiSans';
        font-size: 28rpx;
        font-weight: 400;
      }
    }
  }

  .record-list {
    height: 496rpx;

    .record-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10rpx 0;

      .left {
        width: 140rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #404040;
        font-family: 'Roboto';
        font-size: 28rpx;
        font-weight: 400;
        flex: 0 0 auto;
      }

      .center {
        display: flex;
        width: calc(100% - 140rpx);
        .center-item {
          //width: 72rpx;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #404040;
          font-family: 'MiSans';
          font-size: 28rpx;
          font-weight: 400;

          .shengxiao {
            color: #404040;
            font-family: 'MiSans';
            font-size: 28rpx;
            font-weight: 400;
          }
        }
      }

      .add {
        width: 66px;
        display: flex;
        justify-content: center;
        height: 90rpx;
        align-items: start;
        position: relative;
        top: 10rpx;
      }

      .right {
        width: 132rpx;
        display: flex;
        align-items: center;
        justify-content: end;
        margin-right: 16rpx;
        color: #404040;
        font-family: 'MiSans';
        font-size: 28rpx;
        font-weight: 400;
      }
    }

    .record-list-item.gray {
      background: #FAFAFA;
    }
  }
}
</style>
