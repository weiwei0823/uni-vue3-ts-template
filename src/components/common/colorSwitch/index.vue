<template>

  <!--  v-if="!$config.isForceServerTheme" -->
  <view v-if="!$config.isForceServerTheme" class="color-switch" @touchstart="drag_start" @touchmove.prevent="drag_hmove"
    :style="{ top: isMove ? y + 'px' : '800rpx', left: isMove ? x + 'px' : '720rpx' }">
    <view class="color-switch-btn" @click="isOpen = !isOpen">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6756_273807)">
          <mask id="mask0_6756_273807" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34"
            height="34">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34ZM17 24.7273C21.2677 24.7273 24.7273 21.2677 24.7273 17C24.7273 12.7323 21.2677 9.27273 17 9.27273C12.7323 9.27273 9.27273 12.7323 9.27273 17C9.27273 21.2677 12.7323 24.7273 17 24.7273Z"
              fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_6756_273807)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7715 17.7727V34H33.9988V17.7727H17.7715Z"
              fill="#07C160" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 17.7727V34H16.2273V17.7727H0Z" fill="#1592FF" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7715 0V16.2273H33.9988V0H17.7715Z" fill="#EC3232" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2273 0H0V16.2273H16.2273V0Z" fill="#3E73FE" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6756_273807">
            <rect width="34" height="34" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <view class="color-switch-btn-text">主题<br />切换</view>
    </view>
    <view v-show="isOpen" class="color-switch-block">
      <view v-for="(item, key) in themeList" class="color-switch-block-view" @click="setColor(item)">
        <view
          :style="{ border: `20rpx solid ${item.themeColor}`, borderRadius: '100%', backgroundColor: 'transparent', width: '34rpx', height: '34rpx' }">
        </view>
        <view style="font-size:26rpx; font-weight:500; margin-top:10rpx; color:#4D4D4D;width:52rpx">{{ item.showText
          }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import themeColors from '@/config/models/configUIMgr.js'
export default {
  name: "colorSwitch",
  data() {
    return {
      isOpen: false,
      themeList: null,
      isMove: false,
      x: 360,
      y: 500,
      start: [0, 0]
    }
  },
  mounted() {
    if (themeColors.themeColors) this.themeList = themeColors.themeColors
  },
  methods: {
    drag_start(event) {
      if (event.touches.length < 1) return
      this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
      this.start[1] = event.touches[0].clientY - event.target.offsetTop;
    },
    drag_hmove(event) {
      let tag = event.touches;
      this.isMove = true;
      this.x = tag[0].clientX + 20
      this.y = tag[0].clientY + 50
    },
    setColor(item) {
      console.log(item)
      this.$store.commit("SET_USER_THEME_ID", item.id);
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.color-switch {
  position: fixed;
  z-index: 99;

  .color-switch-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 96rpx;
    height: 186rpx;

    border-radius: 16rpx;
    background-color: rgba(255, 255, 255, .8);

    box-shadow: 4px 0px 12px 0px #3939390F;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .color-switch-btn-text {
      font-weight: 500;
      font-size: 13px;
      color: #4D4D4D;
      margin-top: 10rpx;
    }
  }

  .color-switch-block {
    width: 434rpx;
    height: 186rpx;
    position: absolute;
    bottom: 0;
    right: 116rpx;
    background-color: rgba(255, 255, 255, .8);
    box-shadow: 4px 0px 12px 0px #3939390F;
    backdrop-filter: blur(10px);
    border-radius: 16rpx;
    display: flex;

    .color-switch-block-view {
      width: 96rpx;
      height: 100%;
      padding: 0 14rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>