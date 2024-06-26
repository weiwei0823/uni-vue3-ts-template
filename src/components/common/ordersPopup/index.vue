<template>
     <uni-popup ref="confirm" background-color="#fff">
      <view class="confirm-box">
        <view class="confirm-div">
          <view class="header">
            确认投注
          </view>
          <view class="list-box">
            <view class="title">
              <view class="name">{{ title }}</view>
              <view class="period">{{ headInfo.nextNo }}期</view>
            </view>
            <scroll-view scroll-y class="list-row">
              <view class="list-item" v-for="(item, index) in orderList">
                <view class="played">
                  {{ item.methodName }}
                </view>
                <view class="number">
                  @[{{ item.name }}]
                </view>
                <view class="note-box">
                  <text class="note">{{ item.stakeCount }}注</text>
                  <text class="money">{{ item.isMultiple ? setAmount(orderTotal.price) : setAmount(item.unitPrice) }}元</text>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="count-box">
            <text>共</text>
            <text class="note-total">{{ orderTotal.count }}</text>
            <text>注</text>
            <text class="moeney-total">{{ setAmount(orderTotal.price) }}</text>
            <text>元</text>
          </view>
          <view class="btn-box">
            <button class="cancel" @click="close">取消</button>
            <button v-if="headInfo.stampType === 3 || headInfo.stampType === 1" class="confirm-act-close">封单中</button>
            <button v-else class="confirm-act" @click="toBuyOrder" :disabled="isBetting">{{ isBetting ? "注单中" :
              "确认" }}</button>
          </view>
        </view>
      </view>
    </uni-popup>
</template>
<script>
import Playing from '../../../utils/common/playing';
export default{
    props:{
        headInfo:{},
        orderList:{},
        orderTotal:{},
        title:{},
        isBetting:{}
    },
    data(){
        return {
            playing : new Playing()
        }
    },
    methods:{
        setAmount(num) {
            return this.playing.setAmount(num, 2, '.', ',')
        },
        open(){
            this.$refs.confirm.open("center");
        },
        close() {
            this.$refs.confirm.close();
        },
        toBuyOrder(){
            this.$emit("toBuyOrder");
        }
    }
}

</script>
<style lang="scss" scoped>
    .confirm-box{
        .confirm-div {
    width: 540rpx;
    height: 874rpx;
    padding: 20rpx 38rpx;

    .header {
      width: 100%;
      text-align: center;
      height: 60rpx;
      border-bottom: 2rpx solid #E6E6E6;
      font-weight: 400;
      font-size: 32rpx;
      line-height: 40rpx;
      color: #9A9A9A;
    }

    .list-box {
      padding-top: 20rpx;
      height: 660rpx;

      .title {
        display: flex;
        justify-content: space-between;

        .name {
          font-weight: 400;
          font-size: 28rpx;
          line-height: 39rpx;
          color: #404040;
        }

        .period {
          font-weight: 400;
          font-size: 24rpx;
          line-height: 34rpx;
          text-align: right;
          color: #9A9A9A;
        }
      }

      .list-row {
        padding-top: 30rpx;
        height: 500rpx;

        .list-item {
          margin-bottom: 20rpx;

          .played {
            font-weight: 400;
            font-size: 28rpx;
            line-height: 39rpx;
            color: #404040;
          }

          .number {
            font-weight: 400;
            font-size: 25rpx;
            line-height: 35rpx;
            color: #39788D;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .note-box {
            font-weight: 400;
            font-size: 28rpx;
            line-height: 39rpx;
            color: #404040;

            .note {
              margin-right: 24rpx;
            }
          }
        }
      }

    }

    .count-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64rpx;
      line-height: 64rpx;
      border-top: 2rpx solid #E6E6E6;
      font-weight: 400;
      font-size: 24rpx;
      line-height: 34rpx;
      text-align: center;
      color: #000000;

      .note-total,
      .moeney-total {
        margin: 0 8rpx 0 8rpx;
        color: #FF9900;
      }
    }

    .btn-box {
      display: flex;
      justify-content: space-evenly;

      .cancel,
      .confirm-act {
        border-radius: 264rpx;
        height: 60rpx;
        width: 200rpx;
        text-align: center;
        color: #FFFFFF;
        line-height: 60rpx;
      }

      .cancel {
        background: #8CB2C9;
      }

      .confirm-act {
        background: #FF9900;
      }

      .confirm-act-close {
        border-radius: 264rpx;
        height: 60rpx;
        width: 200rpx;
        text-align: center;
        color: #FFFFFF;
        line-height: 60rpx;
        background: #CCCCCC;
      }
    }

  }
    }
</style>