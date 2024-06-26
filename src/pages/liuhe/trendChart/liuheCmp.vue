<template>
  <view class="calendar-content">
    <view class="calendar-content-header">
      <view class="period">期号</view>
      <view class="num-list">
        <view class="num-item" v-for="(item,index) in numList" :key="index">
          {{item}}
        </view>
      </view>
      <view class="special">
        特码
      </view>
    </view>
    <scroll-view scroll-y class="record-list">
      <view :class="index%2 ? 'record-list-item gray' : 'record-list-item'"
            v-for="(item,index) in dataList" :key="index">
        <view class="left">
          {{item.shorNo}}
        </view>
        <view class="center">
          <view class="center-item" v-for="(i,k) in item.numberList" :key="k" v-if="k < 6">
            <view>
              <view :style="setNumStyle(i.color)">{{i.number}}</view>
              <view class="shengxiao">{{i.shengXiao}}</view>
            </view>
          </view>
        </view>
        <view class="add">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
               fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8 2C7.63181 2 7.33333 2.29848 7.33333 2.66667V7.33333H2.66667C2.29848 7.33333 2 7.63181 2 8C2 8.36819 2.29848 8.66667 2.66667 8.66667H7.33333V13.3333C7.33333 13.7015 7.63181 14 8 14C8.36819 14 8.66667 13.7015 8.66667 13.3333V8.66667H13.3333C13.7015 8.66667 14 8.36819 14 8C14 7.63181 13.7015 7.33333 13.3333 7.33333H8.66667V2.66667C8.66667 2.29848 8.36819 2 8 2Z"
                  fill="#A1A1A1" />
          </svg>
        </view>
        <view class="right">
          <view>
            <view :style="setNumStyle(item.numberList[6].color)">{{item.numberList[6].number}}
            </view>
            <view>{{item.numberList[6].shengXiao}}</view>
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

    .special {
      width: 140rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 8rpx;
      color: #404040;
      font-family: 'MiSans';
      font-size: 28rpx;
      font-weight: 400;
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

        .center-item {
          width: 72rpx;
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
        justify-content: flex-end;
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
