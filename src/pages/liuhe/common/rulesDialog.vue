<template>
  <view :class="['theme-' + themeColor.name]">
    <uni-popup class="dialog-box" ref="popup" type="dialog" background-color="#fff">
      <view class="msg-box">
        <view class="header">
          <view class="close">
            <svg @click="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M1.0649 13.7929C0.674377 14.1834 0.674376 14.8166 1.0649 15.2071C1.45543 15.5976 2.08859 15.5976 2.47911 15.2071L7.85795 9.82825L13.3788 15.3491C13.7694 15.7397 14.4025 15.7397 14.793 15.3491C15.1836 14.9586 15.1836 14.3254 14.793 13.9349L9.27216 8.41403L15.207 2.47916C15.5976 2.08863 15.5976 1.45547 15.207 1.06494C14.8165 0.674421 14.1833 0.674421 13.7928 1.06495L7.85795 6.99982L2.06513 1.207C1.6746 0.816474 1.04144 0.816473 0.650912 1.207C0.260388 1.59752 0.260388 2.23069 0.650912 2.62121L6.44373 8.41403L1.0649 13.7929Z"
                fill="#007ABC" />
            </svg>
          </view>
          玩法说明
        </view>
        <scroll-view scroll-y :class="helpStr.length > 200 ? 'content limitHeight' : 'content'">
          <rich-text :nodes="helpStr"></rich-text>
        </scroll-view>
        <view class="sp-line"></view>
        <view class="footer">
          <scroll-view scroll-y :class="helpStr.length > 200 ? 'content limitHeight' : 'content'">
          <view class="title">投注示例：</view>
          <view class="text">
            玩法说明投注方案：<span v-html="exampleStr"></span>
          </view>
          <view class="text">
            <text class="title">示例号码：</text>
            <view class="text-content" v-html="tipsStr">
<!--              {{ tipsStr }}-->
            </view>
          </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
  import {
    mapGetters
  } from 'pinia';
  import useAppInfoStore from "@/store/modules/appInfoStore";


export default {
  props: {
    helpStr: {
      default: null,
      type: String,
    },
    tipsStr: {
      default: null,
      type: String,
    },
    exampleStr: {
      default: null,
      type: String,
    }
  },
  computed: {
    ...mapState(useAppInfoStore, ['themeColor']),
    // 全文本所占总行数
  },
  methods: {
    open() {
      this.$refs.popup.open()
    },
    /**
     * 点击取消按钮触发
     * @param {Object} done
     */
    close() {
      this.$refs.popup.close()
    },
    /**
     * 点击确认按钮触发
     * @param {Object} done
     * @param {Object} value
     */
    confirm(value) {
      // 输入框的值
      // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
      // ...
      this.$refs.popup.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.msg-box {
  background: #FFFFFF;
  width: 600rpx;
  box-sizing: border-box;
  //height: 464rpx;
  border-radius: 24rpx;
  padding: 22rpx 40rpx;
  max-height: 800rpx;
  .header {
    text-align: center;
    padding: 25rpx 0;
    position: relative;
    color: var(--theme-font-default-deep-color);

    font-size: 34rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 18.518px;

    /* 108.928% */
    .close {
      position: absolute;
      right: 0;
      top: 0;

      image {
        width: 32rpx;
      }
    }
  }

  .content {
    padding: 22rpx 0;
    line-height: 57rpx;
    letter-spacing: -0.01em;
    flex: none;
    order: 0;
    flex-grow: 0;
    text-align: left;
    color: var(--theme-font-default-shallow-color);

    font-size: 30rpx;
    font-style: normal;
    font-weight: 400;
    max-height: 290rpx;
    &.limitHeight {
      height: 290rpx;
      overflow-y: scroll;
    }

  }
  .sp-line{
    height: 2rpx;
    background: #F7F7F7;
  }
  .footer {
    padding: 22rpx 0;
    height: 400rpx;
    .title {
      font-weight: 400;
      font-size: 30rpx;
      text-align: left;
      color: var(--theme-auxiliary-color-remind);

      line-height: 57rpx;
    }

    .text {
      color: var(--theme-font-default-shallow-color);

      font-size: 30rpx;
      font-weight: 400;
      line-height: 57rpx;
      .text-content{
        word-wrap: break-word;
      }
    }
  }
}</style>
