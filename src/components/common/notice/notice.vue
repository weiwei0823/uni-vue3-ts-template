<template>
  <view class="top-notice">
    <image mode="widthFix" src="../../../static/img/toolbox/bac.png" />
    <p class="sub-title">{{ $t('components.common.notice.notice.text0') }}</p>
    <p class="sub-text" :style="styleContent">{{ content }}</p>
  </view>
</template>

<script>
export default {
  name: "notice",
  props: {
    content: {
      type: String,
      default: '',
    },
    styleContent: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-notice {
  height: 156rpx;
  position: relative;
  color: #404040;
  font-size: 28rpx;
  text-align: center;

  image {
    position: absolute !important;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
  }

  .sub-title {
    padding-top: 12rpx;
  }

  .sub-text {
    font-size: 24rpx;
    line-height: 28rpx;
    margin-top: 30rpx;
  }
}</style>