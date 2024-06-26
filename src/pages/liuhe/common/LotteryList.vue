<template>
  <view class="lottery-list">
    <uni-section v-show="isShow" class="mb-10" :title="title" :decorationPadding="'16rpx 0px'" :titleColor="'#666666'">
      <template v-slot:decoration>
        <view class="decoration"></view>
      </template>
    </uni-section>
    <uni-row class="row-box">
      <uni-col :span="12" class="row-col" v-for="(item, index) in data" :key="index">
        <view class="item-box" name="lottery-list-itembox">
          <image @click="detail(item)" :src="item.icon"></image>
          <uni-col :span="14" class="item-right">
            <view @click="detail(item)" class="name" :class="{ 'name-small': item.bigType == 2 }">{{ item.name }}</view>
            <view @click="detail(item)" class="desc" :class="{ 'desc-big': item.bigType == 2 }">{{ item.content }}</view>
          </uni-col>
        </view>
        <view class="label-box">
          <image v-if="item.isLive" class="live" src="@/static/img/liuhe/index/live.png"></image>
          <image v-if="item.isOpen" class="kaijiang" src="@/static/img/liuhe/index/open.png"></image>
        </view>
      </uni-col>
    </uni-row>
  </view>
</template>

<script>
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
export default {
  name: "LotteryList",
  components: { UniCol, UniRow },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    detail(item) {
      this.$config.gameRouterMgr.doOpenGameDetails(item, this);
    },
  }
}
</script>

<style lang="scss" scoped>
.lottery-list {

  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;

  .row-box {
    .row-col {
      height: 140rpx;
      border-bottom: 2rpx solid #DDDDDD;
      position: relative;

      .item-box {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 10rpx;
        justify-content: space-between;
        padding: 0 12rpx;

        image {
          height: 110rpx;
          width: 110rpx;
        }

        .item-right {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-style: normal;
            font-weight: 400;
            font-size: 26rpx;
            line-height: 34rpx;
            color: #404040;
          }

          .name-small {
            font-size: 16rpx;
            color: #000000;
          }

          .desc {
            font-style: normal;
            font-weight: 400;
            font-size: 20rpx;
            line-height: 28rpx;
            color: #999999;
            width: 90%;
          }

          .desc-big {
            font-size: 24rpx;
            color: #404040;
          }
        }
      }

      .label-box {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        height: 22rpx;
        width: 132rpx;

        .live {
          width: 66rpx;
          height: 22rpx;
        }

        .kaijiang {
          width: 80rpx;
          height: 22rpx;
        }
      }
    }
  }

  .mb-10 {
    background: none;

    .decoration {
      width: 10rpx;
      height: 24rpx;
      border-radius: 30rpx;
      margin-right: 20rpx;
      background-color: #FF9900;
    }
  }
}
</style>
