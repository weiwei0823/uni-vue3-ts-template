<template>
  <!--  v-if="!$config.isForceServerTheme" -->
  <view v-if="this.khurl.status===1">
	  <view class="color-switch" @click="goURL" @touchstart="drag_start" @touchmove.prevent="drag_hmove"
	    :style="{ top: isMove ? y + 'px' : '1160rpx', left: isMove ? x + 'px' : '580rpx' }">
	    <image src="/static/img/redEnv.png" class="btn-img"></image>
	  </view>
  </view>
</template>

<script>
import themeColors from '@/config/models/configUIMgr.js'
import {
  mapGetters
} from 'pinia';
export default {
  name: "envelope",
  data() {
    return {
      isOpen: false,
      themeList: null,
      isMove: false,
      x: 360,
      y: 500,
      start: [0, 0],
      khurl: ""
    }
  },

  computed: {
    ...mapGetters(["webSiteConfig"]),
  },
  mounted() {
    if (themeColors.themeColors) this.themeList = themeColors.themeColors
    const config = uni.getStorageSync("config");
    this.khurl = config.find(item => item.id == 1)
  },
  methods: {
    goURL() {
      // console.log(this.khurl)
      // uni.navigateTo({
      //   url: this.khurl.url
      // })
      if(this.khurl.url){
        window.open(this.khurl.url)
      }
    },
    drag_start(event) {
      if (event.touches.length < 1) return
      this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
      this.start[1] = event.touches[0].clientY - event.target.offsetTop;
    },
    drag_hmove(event) {
      let tag = event.touches;
      this.isMove = true;
      this.x = tag[0].clientX - 30
      this.y = tag[0].clientY - 30
    },

  }
}
</script>

<style lang="scss" scoped>
.color-switch {
  position: fixed;
  z-index: 99;

  .btn-img {
    width: 136rpx;
    height: 136rpx;
  }
}
</style>
