<template>
  <view :id="uid">
    <image
        class="origin-img"
        :src="src"
        :mode="mode"
        v-if="loadImg && !isLoadError"
        v-show="showImg"
        :style="{
        'border-radius': !isNaN(radius) ? radius + 'rpx' : radius,
      }"
        :class="{
        'no-transition': !openTransition,
        'show-transition': showTransition && openTransition,
      }"
        @load="handleImgLoad"
        @error="handleImgError"
    >
    </image>
    <view class="loadfail-img" v-else-if="isLoadError">
      <slot name="error">
        <image
            class="lazy-image"
            lazy-load
            :src=errorImageURL
        ></image>
      </slot>
    </view>
    <view
        v-if="!showImg && !isLoadError"
        class="loading-img animate-gray"
    >
      <slot name="loading">
        <image
            src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4Ljc3ODEwNjkuMC5pMSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04ODQuMTg4IDEwNy45MzhDODcxLjA2MyAxMDIuMzEzIDg1NyA5OS41IDg0Mi45MzggOTkuNUgxODEuMDYyYy0xNSAwLTI5LjA2MyAyLjgxMy00Mi4xODggNy41QzkzLjg3NSAxMjQuODEzIDYyIDE2NyA2MiAyMTcuNjI1djU4OS42ODhjMCA1MC42MjUgMzEuODc1IDkyLjgxMiA3Ny44MTIgMTA5LjY4NyAxMy4xMjUgNC42ODcgMjcuMTg4IDcuNSA0Mi4xODggNy41aDY2MC45MzdDOTA4LjU2MiA5MjQuNSA5NjIgODcxLjA2MiA5NjIgODA1LjQzOFYyMTcuNjI1YzAtNTAuNjI1LTMxLjg3NS05Mi44MTItNzcuODEyLTEwOS42ODd6TTQyMiAzNjQuODEyYzAgNDguNzUtNDAuMzEzIDg4LjEyNS05MCA4OC4xMjVzLTkwLTM5LjM3NS05MC04OC4xMjUgNDAuMzEzLTg4LjEyNSA5MC04OC4xMjQgOTAgMzkuMzc1IDkwIDg4LjEyNHpNODQyLjkzNyA4NjQuNUgxODEuMDYzYy0yOC4xMjUgMC01Mi41LTE5LjY4Ny01OC4xMjYtNDYuODc1LS45MzctMy43NS0uOTM3LTcuNS0uOTM3LTExLjI1di00NWwxNzcuMTg4LTE1MCA2My43NSA2MC45MzhjMzIuODEyIDMxLjg3NSA4NS4zMTIgMzMuNzUgMTIwLjkzNyA0LjY4N2wyOTkuMDYzLTI0Ny41YzU3LjE4NyA2MS44NzUgOTYuNTYyIDEwMy4xMjUgMTIwLjkzNyAxMjQuNjg4djI1MS4yNUM5MDIgODM4LjI1IDg3NS43NSA4NjQuNSA4NDIuOTM3IDg2NC41eiIgZmlsbD0iIzhhOGE4YSIvPjwvc3ZnPg=="
        ></image>
      </slot>
    </view>
  </view>
</template>
<script>
// 生成唯一id
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export default {
  props: {
    /** 图片地址 **/
    src: String,
    /** 图片宽度 **/
    width: [Number, String],
    /** 图片高度 **/
    height: [Number, String],
    /** 图片裁剪、缩放的模式 **/
    mode: {
      type: String,
      default: "aspectFill",
    },
    /** 图片圆角 **/
    radius: {
      type: [Number, String],
      default: 0,
    },
    /** 滚动高度 **/
    scrollTop: {
      type: Number,
    },
    openTransition: {
      type: Boolean,
      default: true,
    },
    viewHeight: {
      type: Number,
      default() {
        return uni.getSystemInfoSync().windowHeight;
      },
    },
  },
  watch: {
    scrollTop(val) {
      this.onScroll(val);
    },
  },
  mounted() {
    console.log("占位图", this.$store.state.appInfoStore.contantsConfigTypeMap)
  },
  computed:{
    errorImageURL(){
      let errorImageKey = this.$config.enumMgr.CONTANTS_CONFIGS_ID.STATION_LOGO_ERROR_IMAGE;
      let info = this.$store.state.appInfoStore.contantsConfigTypeMap ? this.$store.state.appInfoStore
              .contantsConfigTypeMap[errorImageKey] : null;
      if (!info) return "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcwNCAzMjhhNzIgNzIgMCAxIDAgMTQ0IDAgNzIgNzIgMCAxIDAtMTQ0IDB6IiBmaWxsPSIjOGE4YThhIi8+PHBhdGggZD0iTTk5OS45MDQgMTE2LjYwOGEzMiAzMiAwIDAgMC0yMS45NTItMTAuOTEyTDUyMS43NiA3My43OTJhMzEuNTUyIDMxLjU1MiAwIDAgMC0yNy4yIDExLjkwNGwtOTIuMTkyIDExNC44NDhhMzIgMzIgMCAwIDAgLjY3MiA0MC44OTZsMTQ2LjE0NCAxNjkuOTUyLTE0Ny40NTYgMTk0LjY1NiAzNi40OC0xNzMuMzc2YTMyIDMyIDAgMCAwLTExLjEzNi0zMS40MjRMMjM1LjYxNiAyNDUuNTA0bDc5LjYxNi0xMjUuNjk2YTMyIDMyIDAgMCAwLTI5LjI4LTQ5LjAyNEw0NS43NiA4Ny41NTJhMzIgMzIgMCAwIDAtMjkuNjk2IDM0LjE3Nmw1NS44MDggNzk4LjAxNmEzMi4wNjQgMzIuMDY0IDAgMCAwIDM0LjMwNCAyOS42OTZsMTc2LjUxMi0xMy4xODRjMTcuNjMyLTEuMzEyIDMwLjg0OC0xNi42NzIgMjkuNTA0LTM0LjI3MnMtMTYuNTc2LTMxLjA0LTM0LjMwNC0yOS41MzZMMTMzLjQ0IDg4My4yMzJsLTYuNDMyLTkyLjUxMiAxMjUuMzEyLTEyLjU3NmEzMiAzMiAwIDAgMCAyOC42NzItMzUuMDQgMzIuMTYgMzIuMTYgMCAwIDAtMzUuMDQtMjguNjcyTDEyMi41NiA3MjYuODQ4IDgyLjE0NCAxNDkuMTg0bDE0NS4xNTItMTAuMTQ0LTYwLjk2IDk2LjIyNGEzMiAzMiAwIDAgMCA2Ljg0OCA0MS45NTJsMTk4LjQgMTYxLjM0NC01OC43NTIgMjc5LjI5NmEzMC45MTIgMzAuOTEyIDAgMCAwIC43MzYgMTQuNzUyIDMxLjY4IDMxLjY4IDAgMCAwIDEuNDA4IDExLjA0bDUxLjUyIDE1NC41NmEzMS45NjggMzEuOTY4IDAgMCAwIDI3LjQ1NiAyMS43Nmw1MjMuMTA0IDQ3LjU1MmEzMi4wNjQgMzIuMDY0IDAgMCAwIDM0Ljg0OC0yOS42MzJsNTUuNzc2LTc5OC4wNDhhMzIuMDY0IDMyLjA2NCAwIDAgMC03Ljc3Ni0yMy4yMzJ6bS05OC45MTIgNjMwLjg0OGwtNDEyLjU3Ni0zOS42NDhhMzEuNTIgMzEuNTIgMCAwIDAtMzQuOTEyIDI4Ljc2OCAzMiAzMiAwIDAgMCAyOC44IDM0LjkxMmw0MTQuMjQgMzkuODA4LTYuMjcyIDg5LjUzNi00NjkuNzI4LTQyLjcyLTM5LjU4NC0xMTguNzIgMjM0LjgxNi0zMTAuMDE2YTMxLjkzNiAzMS45MzYgMCAwIDAtMS4yNDgtNDAuMTkyTDQ2OC44OTYgMjE5Ljg0bDY1LjA4OC04MS4wNTYgNDA3LjU4NCAyOC40OC00MC41NzYgNTgwLjE5MnoiIGZpbGw9IiM4YThhOGEiLz48L3N2Zz4=";
      return info.url;
    }
  },


  data() {
    return {
      uid: "",
      loadImg: false,
      showImg: false,
      isLoadError: false,
      showTransition: false,
    };
  },
  methods: {
    init() {
      this.uid = "uid-" + generateUUID();
      this.$nextTick(this.onScroll);
    },
    handleImgLoad(e) {
      this.showImg = true;
      // this.$nextTick(function(){
      //     this.showTransition = true
      // })
      setTimeout(() => {
        this.showTransition = true;
      }, 50);
    },
    handleImgError(e) {
      this.isLoadError = true;
    },
    onScroll(scrollTop) {
      // 加载ing时才执行滚动监听判断是否可加载
      if (this.loadImg || this.isLoadError) return;
      if (this.loadImg || this.isLoadError) return;
      let that=this;
      const id = this.uid;
      const query = uni.createSelectorQuery().in(this);
      query.select("#" + id).boundingClientRect((data) => {
        if (!data) return;
        if (data.top - this.viewHeight < 0) {
          that.loadImg = true;
        }
      })
          .exec();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="scss">
/* 官方优化图片tips */
image {
  will-change: transform;
}
/* 渐变过渡效果处理 */
image.origin-img {
  width: 100%;
  height: 100%;
  opacity: 0.3;
}
image.origin-img.show-transition {
  transition: opacity 1.2s;
  opacity: 1;
}
image.origin-img.no-transition {
  opacity: 1;
}

.loading-img, .loadfail-img {
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  image {
    height: 100rpx;
    width: 100rpx;
    // width: 50%;
    // height: 50%;
  }
}
/* 动态灰色若隐若现 */
.animate-gray {
  animation: animate-gray 1s infinite linear;
  background-color: #e3e3e3;
}
@keyframes animate-gray {
  0% {
    background-color: #e3e3e3aa;
  }
  50% {
    background-color: #e3e3e3;
  }
  100% {
    background-color: #e3e3e3aa;
  }
}
</style>


