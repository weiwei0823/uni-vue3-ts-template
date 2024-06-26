<template>
  <view class="detail">
    <Header :title="title" :isBack="false" showBack @back="back" />
    <view class="list-row">
      <view class="list-item">
        <view class="title">类型</view>
        <view class="text">{{ info.balanceDirection == 1 ? '盈利' : info.balanceDirection == 2 ? '亏损' : '持平' }}</view>
      </view>
      <view class="list-item">
        <view class="title">业务</view>
        <view class="text">{{ info.groupName + "-" + info.typeName }}</view>
      </view>
      <view class="list-item">
        <view class="title">订单金额</view>
        <view class="text">{{ info.amount }}</view>
      </view>
      <view class="list-item">
        <view class="title">订单编号</view>
        <view class="text">{{ info.orderNo }}</view>
      </view>
      <view class="list-item">
        <view class="title">订单时间</view>
        <view class="text">{{ info.createTime }}</view>
      </view>
      <view class="list-item">
        <view class="title">订单来源</view>
        <view class="text">{{ info.source }}</view>
      </view>
      <view class="list-item">
        <view class="title">备注</view>
        <view class="text">{{ info.remark }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import Header from '@/components/common/header/index.vue';
export default {
  components: { Header },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
  },
  data() {
    return {
      safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
      title: "账变详情",
      headerStyle: {
        backgroundColor: "#1794FF"
      },
      fontColor: "#FFFFFF",
      titleStyle: {
        color: "#FFFFFF"
      },
    }
  },
  methods: {
    back() {
      this.$emit('closeDetail');
    },
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: var(--theme-auxiliary-color-default);
  height: var(--vh);
  max-width: 480px;
  margin: auto;

  .list-row {
    margin-top: 20rpx;
    background: #FFFFFF;
    border-radius: 24rpx;

    .list-item {
      height: 96rpx;
      box-sizing: border-box;
      border-bottom: 1px solid var(--theme-auxiliary-color-default);
      padding: 20rpx 28rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .title {
        font-weight: 400;
        font-size: 30rpx;
        color: #404040;
        white-space: nowrap;
      }

      .text {
        font-weight: 400;
        font-size: 28rpx;
        color: #404040;
        overflow: hidden;
        text-overflow: ellipsis;

        image {
          height: 40rpx;
          width: 40rpx;
        }
      }
    }
  }
}
</style>