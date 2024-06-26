<template>
  <view class="empty-box" :style="customStyle">
    <image :style="{ width: size + 'rpx' }" mode="widthFix" :src="img" alt=""></image>
    <view class="text">{{ $t('pages.luntan.masterForum.history.noData') }}</view>
  </view>
</template>

<script>
export default {
  name: "empty",
  props: {
    customStyle: {
      type: Object,
      default: () => {
        marginTop: '145px';
      }
    },
    img: {
      type: String,
      default: () => {
        return '/static/imgs-liuhe/activity/empty.png'
      }
    },
    size: {
      type: String | Number,
      default: () => {
        return 398
      }
    },
    height: {
      type: String | Number,
      default: () => {
        return 398
      }
    }
  }
}
</script>

<style scoped>
.empty-box {
  width: 100%;
  height: calc(var(--vh) - 110rpx);
  display: grid;
  place-content: center;
}

.empty-box p {
  text-align: center;
  color: #a0a0a0;
  font-size: 16px;
  line-height: 21px;
  margin-top: 14px;
}

.empty-box .text {
  color: #D8D8D8;
  font-size: 28rpx;
  text-align: center;
}
</style>
