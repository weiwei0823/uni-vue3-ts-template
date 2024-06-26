<template>
  <view :class="{'video-display-wrap':true,'view-full-screen':isFullScreen}"  v-if="isRefresh">
    <!-- 播放器最终在view的子级显示 -->
    <view :class="{'video-js':true}"  ref="video" :style="{width: `${width}`, height:`${height}`}">
    </view>
    <!-- 播放器最终在view的子级显示 -->
    <!--  自定义播放按钮（图片自行替换） -->
    <image v-if="!isPlaying&&!this.sdpVideoPlayer" src="@/static/img/bofang.png" mode="heightFix" class="play-btn-icon" @click.stop="playVideo"></image>
    <!--  自定义播放按钮 -->

    <view class="sound-add"  v-if="isPlaying&&isFlv" @click="onPlaySound">
      <svg t="1694602666792" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1483" width="64" height="64"><path d="M651.869091 926.254545c-6.749091 0-13.498182-1.396364-19.781818-4.421818l-334.661818-156.858182H162.909091c-25.6 0-46.545455-20.945455-46.545455-46.545454v-325.818182c0-25.6 20.945455-46.545455 46.545455-46.545454h134.516364c12.8 0 23.272727 10.472727 23.272727 23.272727s-10.472727 23.272727-23.272727 23.272727H162.909091v325.818182h134.516364c6.749091 0 13.498182 1.396364 19.54909 4.189091L651.636364 879.476364V503.621818a209.687273 209.687273 0 0 1-162.676364-195.956363l-71.68 33.512727c-11.636364 5.585455-25.6 0.465455-30.952727-11.170909-5.352727-11.636364-0.465455-25.367273 11.170909-30.952728l107.054545-50.26909c7.68-3.723636 16.989091-2.792727 23.970909 2.56 6.981818 5.12 10.24 13.963636 8.843637 22.341818-1.396364 7.912727-2.094545 16.290909-2.094546 25.367272 0 82.152727 61.207273 151.505455 142.429091 161.745455 11.636364 1.396364 20.48 11.403636 20.48 23.04V879.709091c0 16.058182-8.145455 30.72-21.643636 39.098182-7.447273 4.887273-16.058182 7.447273-24.669091 7.447272z" fill="#ffffff" p-id="1484"></path><path d="M698.181818 508.974545c-8.843636 0-17.454545-0.465455-26.065454-1.62909-104.494545-13.032727-183.389091-102.4-183.389091-207.825455 0-11.869091 0.930909-22.574545 2.56-33.28 16.058182-101.934545 103.098182-176.174545 206.894545-176.174545 115.432727 0 209.454545 94.021818 209.454546 209.454545s-94.021818 209.454545-209.454546 209.454545z m0-372.363636c-80.756364 0-148.48 57.716364-160.814545 137.309091-1.396364 8.145455-2.094545 16.523636-2.094546 25.6 0 82.152727 61.207273 151.505455 142.429091 161.745455 6.749091 0.930909 13.498182 1.163636 20.48 1.163636 89.832727 0 162.909091-73.076364 162.909091-162.909091s-73.076364-162.909091-162.909091-162.909091z" fill="#ffffff" p-id="1485"></path><path d="M814.545455 322.792727H581.818182c-12.8 0-23.272727-10.472727-23.272727-23.272727s10.472727-23.272727 23.272727-23.272727h232.727273c12.8 0 23.272727 10.472727 23.272727 23.272727s-10.472727 23.272727-23.272727 23.272727z" fill="#ffffff" p-id="1486"></path><path d="M698.181818 439.156364c-12.8 0-23.272727-10.472727-23.272727-23.272728v-232.727272c0-12.8 10.472727-23.272727 23.272727-23.272728s23.272727 10.472727 23.272727 23.272728v232.727272c0 12.8-10.472727 23.272727-23.272727 23.272728z" fill="#ffffff" p-id="1487"></path></svg>
    </view>
    <view class="full-screen" v-if="isFlv" @click="fullScreenClick">
      <svg v-if="!isFullScreen" t="1694603389763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3201" width="64" height="64"><path d="M928 128H96a53.393333 53.393333 0 0 0-53.333333 53.333333v661.333334a53.393333 53.393333 0 0 0 53.333333 53.333333h832a53.393333 53.393333 0 0 0 53.333333-53.333333V181.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 714.666667a10.666667 10.666667 0 0 1-10.666667 10.666666H96a10.666667 10.666667 0 0 1-10.666667-10.666666V181.333333a10.666667 10.666667 0 0 1 10.666667-10.666666h832a10.666667 10.666667 0 0 1 10.666667 10.666666zM377.753333 560.913333a21.333333 21.333333 0 0 1 0 30.173334L200.833333 768H320a21.333333 21.333333 0 0 1 0 42.666667H149.206667a21.333333 21.333333 0 0 1-21.206667-21.206667V618.666667a21.333333 21.333333 0 0 1 42.666667 0v119.166666l176.913333-176.92a21.333333 21.333333 0 0 1 30.173333 0zM896 234.54V405.333333a21.333333 21.333333 0 0 1-42.666667 0V286.166667l-176.913333 176.92a21.333333 21.333333 0 0 1-30.173333-30.173334L823.166667 256H704a21.333333 21.333333 0 0 1 0-42.666667h170.793333a21.333333 21.333333 0 0 1 21.206667 21.206667z" fill="#ffffff" p-id="3202"></path></svg>
      <svg v-else t="1694607244957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4446" width="64" height="64"><path d="M582.6 441.4v-320h50V356l274-274 35.4 35.4-274 274h234.6v50h-320zM117.4 942l274-274v234.6h50v-320h-320v50H356l-274 274 35.4 35.4zM132 132h302V82H82v352h50V132z m760 760H590v50h352V590h-50v302z" fill="#ffffff" p-id="4447"></path></svg>
    </view>


    <!-- 视频蒙版用于点击视频能够切换播放状态 -->
    <view class="video-mask" v-if="!this.sdpVideoPlayer" @click="switchPlayVideo"></view>
    <view class="loading" :style="loadingStyle" v-if="showLoading&&isLoading&&isPlaying">
      <view class="loading-message" >
        <svg class="loading-message-ico" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-a9c308ec="" d="M4.55185 3.69352C6.06398 2.38324 7.9985 1.66323 9.99935 1.66602C14.6018 1.66602 18.3327 5.39686 18.3327 9.99936C18.3327 11.7794 17.7743 13.4294 16.8244 14.7827L14.166 9.99936H16.666C16.6661 8.69238 16.2821 7.41419 15.5616 6.32374C14.8411 5.23328 13.816 4.37866 12.6137 3.86613C11.4114 3.3536 10.0849 3.20578 8.79931 3.44104C7.51368 3.6763 6.32556 4.28427 5.38268 5.18936L4.55185 3.69352ZM15.4468 16.3052C13.9347 17.6155 12.0002 18.3355 9.99935 18.3327C5.39685 18.3327 1.66602 14.6019 1.66602 9.99936C1.66602 8.21936 2.22435 6.56936 3.17435 5.21602L5.83268 9.99936H3.33268C3.33258 11.3063 3.71664 12.5845 4.43713 13.675C5.15762 14.7654 6.18274 15.6201 7.38503 16.1326C8.58733 16.6451 9.91375 16.7929 11.1994 16.5577C12.485 16.3224 13.6731 15.7144 14.616 14.8094L15.4468 16.3052Z" fill="#FFFFFF"></path></svg>
        <text class="loading-message-text">直播正在努力加载中..</text>
      </view>
    </view>

    <!-- 视频蒙版用于点击视频能够切换播放状态 -->
  </view>
</template>

<script>
import flvjs from "flv.js";
import NodePlayer from "@/static/js/NodePlayer-full.min";

export default {
  name: "live",
  props: {
    src: {
      type: String,
      default: '',
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    liveRatio: {
      type: Number,
      default: 0
    },
    lotteryType: {
      type: Number,
      default: 0
    },
    isUseAmazonIvsPlayM3u8: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //视频播放器
      videoPlayer: null,
      sdpVideoPlayer: null,
      //是否正在播放
      isPlaying: false,
      dp: {},
      isFlv: false,
      isRefresh: true,
      nodePlayer: null,
      forceUseNodePlayer: true,
      nodePlayerTimeoutTicker: -1,
      nodePlayerTimeoutTime: 100000,
      isFullScreen: false,
      isLoading: false,
      liveBoxWidth: 0,
      liveBoxHeight: 0,
      // 静态资源加载地址
      scriptObj: {
        amazonIvs: "https://player.live-video.net/1.23.0/amazon-ivs-videojs-tech.min.js",
        videoJs: "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.14.3/video.min.js",
        videoCss: "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.14.3/video-js.css",
        vePlayerCss: "//sf-unpkg.bytepluscdn.com/obj/byteplusfe-sg/sdk/@byteplus/veplayer/1.6.3/index.min.css",
        vePlayerJs: "//sf-unpkg.bytepluscdn.com/obj/byteplusfe-sg/sdk/@byteplus/veplayer/1.6.3/index.min.js"
      }
    }
  },
  computed: {
    width() {
      if (!this.liveRatio) return "100%";
      if (!this.liveBoxWidth || !this.liveBoxHeight) return "100%";
      let caculateWidth = (this.isFullScreen ? this.liveBoxHeight : this.liveBoxWidth) * this.liveRatio;
      if (caculateWidth <= this.liveBoxWidth) {
        return caculateWidth + "px";
      }
      return "100%";
    },

    height() {
      if (!this.liveRatio) return "100%";
      if (!this.liveBoxWidth || !this.liveBoxHeight) return "100%";
      let caculateWidth = this.liveBoxHeight * this.liveRatio;
      if (caculateWidth > this.liveBoxWidth) {
        return (this.liveBoxWidth / this.liveRatio) + "px";
      }
      return "100%";
    },

    loadingStyle() {
      if (this.lotteryType !== 0) {
        let styles = {};
        let imgUrl = null;
        imgUrl = require(`@/static/img/live_loading_${this.lotteryType}.jpg`);
        imgUrl = `url(${imgUrl})`
        styles['background-image'] = imgUrl;
        styles['background-repeat'] = "round";
        return styles;
      }
      return {};
    }
  },
  watch: {
    isFullScreen: {
      handler() {
        this.$nextTick(() => {
          const query = uni.createSelectorQuery().in(this);
          query.select('.video-display-wrap').boundingClientRect(({width, height}) => {
            console.log(width, height);
            this.liveBoxWidth = width;
            this.liveBoxHeight = height;
          }).exec();
        })
      },
      immediate: true
    },
    src: {
      handler(val) {
        if (val) {
          this.nodePlayer?.stop();
          this.init();
        }
      },
      immediate: true
    }
  },
  methods: {
    initPlayer() {
      let that = this;
      this.$once('hook:beforeDestroy', () => {
        this.videoPlayer && this.videoPlayer.dispose();
        this.nodePlayer && this.nodePlayer.release(true);
      })
      //视频移除旧元素操作
      this.$refs.video && this.$refs.video.$el && (this.$refs.video.$el.innerHTML = "");
      this.$nextTick(() => {
        if (this.src?.includes('.flv')) {
          this.isFlv = true;
          //flv类型
          if (flvjs.isSupported() && !that.forceUseNodePlayer) {
            this.initFlv();
          } else {
            this.initNodePlayerVideo();
          }
        } else if (this.isUseAmazonIvsPlayM3u8 && this.src?.includes('.m3u8')) {
          this.initAmazonIvsVideo();
        } else if (this.src?.includes('.sdp')) {
          this.initSdpVideoPlayer();
        } else {
          //rtmp类型
          this.initVideo();
        }
      });
    },
    addSrcTimeseed(src) {
      if (src.indexOf('?') == -1) {
        return src + "?t=" + Date.now();
      } else {
        return src + "&t=" + Date.now();
      }
    },
    startListenTimeoutTicker() {
      let that = this;
      clearTimeout(this.nodePlayerTimeoutTicker);
      this.nodePlayerTimeoutTicker = setTimeout(() => {
        that.$emit("onLoadingVideoError");
      }, this.nodePlayerTimeoutTime);
      that.isLoading = true;
    },

    initNodePlayerVideo() {
      let _that = this;
      let canvasElement = document.createElement('canvas')
      canvasElement.id = 'canvas-player01'
      //如果需要全屏幕展现播放器需要增加 object-fit: cover;
      canvasElement.style = 'width: 100%; height: 100%;'
      //挂载到视频容器中

      this.$refs.video.$el.appendChild(canvasElement)
      let that = this;
      //v0.5.70版之后,在Android手机端推荐使用以下音频引擎
      if (/(Android)/i.test(navigator.userAgent)) {
        NodePlayer.activeAudioEngine(true);
      }
      var initPlayer = () => {
        let player = that.nodePlayer = new NodePlayer();
        player.setView("canvas-player01");
        /**
         * 是否开启屏幕常亮
         * 在手机浏览器上,canvas标签渲染视频并不会像video标签那样保持屏幕常亮
         * 如果需要该功能, 可以调用此方法, 会有少量cpu消耗, pc浏览器不会执行
         */
        player.setKeepScreenOn();

        /**
         * 设置为等比缩放模式
         */
        // player.setScaleMode(2);
        /**
         * 设置最大缓冲时长，单位毫秒，只在软解时有效
         */
        player.setBufferTime(3000);
        player.on("start", () => {
          _that.isPlaying = true;
          setTimeout(() => {
            _that.isLoading = false;
          }, 1000);
          clearTimeout(_that.nodePlayerTimeoutTicker);
        });

        player.on("stop", () => {
          _that.isPlaying = false;
          _that.isFullScreen = false;
        });

        player.on("error", (e) => {
          that.$emit("onLoadingVideoError");
          clearTimeout(_that.nodePlayerTimeoutTicker);
        });

        player.on("videoInfo", (w, h) => {
        });

        player.on("audioInfo", (r, c) => {
        });

        player.on("stats", (stats) => {
        });

        player.on("metadata", (metadata) => {
        });
        _that.startListenTimeoutTicker();
        player.start(that.addSrcTimeseed(that.src));
      }
      if (window) {
        if (window.hasOwnProperty("NodePlayer")) {
          initPlayer();
        } else {
          NodePlayer.load(() => {
            initPlayer();
          });
        }
      }
    },

    initAmazonIvsVideo() {
      let video = document.createElement('video')
      video.id = 'myVideo'
      //如果需要全屏幕展现播放器需要增加 object-fit: cover;
      video.style = 'width: 100%; height: 100%;'
      video.controls = false
      video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
      video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全屏播放的video标签的一个属性
      video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
      this.$refs.video.$el.appendChild(video)
      let aspectRatio = '16:9'   //默认横屏
      let that = this
      var PLAYBACK_URL = this.src;
      console.log("play", PLAYBACK_URL)
      // Register Amazon IVS as playback technology for Video.js
      registerIVSTech(videojs);

      // Initialize player
      let player = videojs('myVideo', {
        techOrder: ["AmazonIVS"]
      }, function () {
        this.on('error', function () {
          //请求数据时遇到错误
          that.$emit("onLoadingVideoError");
          console.log('请求数据时遇到错误')
        })
        this.on('stalled', function () {
          //网速失速
          console.log('网速失速')
        })
        this.on('play', function () {
          //开始播放
          console.log('开始播放')
          that.isPlaying = true
        })
        this.on('pause', function () {
          //暂停
          console.log('暂停')
          that.isPlaying = false
        });
        // Play stream
        player.src(PLAYBACK_URL);
      });
      this.videoPlayer = player;
    },

    onAppShowCtrlSdpPlay() {
      // if(this.sdpVideoPlayer) this.initSdpVideoPlayer();
      // console.log(this.sdpVideoPlayer);
      // alert("appShowSdpVideoPlay")
    },

    initSdpVideoPlayer() {
      console.log("open----initSdpVideoPlayer");
      uni.$off("onAppShow", this.onAppShowCtrlSdpPlay);
      uni.$on("onAppShow", this.onAppShowCtrlSdpPlay);
      let video = document.createElement('div')
      video.id = 'myVideo'
      //如果需要全屏幕展现播放器需要增加 object-fit: cover;
      video.style = 'width: 100%; height: 100%;'
      video.controls = false
      video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
      video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全屏播放的video标签的一个属性
      video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
      this.$refs.video.$el.appendChild(video)
      var PLAYBACK_URL = this.src;
      const playerSdk = new VePlayer({
        "isLive": true,
        "id": "myVideo",
        "lang": "en",
        "ignores": [
          "DanmuPlugin"
        ],
        "url": PLAYBACK_URL,
        "autoplay": true,
        "loop": true,
        "fluid": true,
        "volume": 0.5
      });
      playerSdk.on('player_create_finish', () => {
        // alert('The player is created.')
        // console.log(playerSdk)
      })
      this.sdpVideoPlayer = playerSdk;
    },
    //初始化播放器
    initVideo: function () {
      let video = document.createElement('video')
      video.id = 'myVideo'
      //如果需要全屏幕展现播放器需要增加 object-fit: cover;
      video.style = 'width: 100%; height: 100%;'
      video.controls = false
      video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
      video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全屏播放的video标签的一个属性
      video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
      let source = document.createElement('source')
      source.src = this.src  //设定的流地址
      //根据流地址的后缀设置好播放类型
      if (source.src.indexOf('.mp4') !== -1) {
        //mp4类型
        source.type = 'video/mp4'
      } else if (source.src.indexOf('.m3u8') !== -1) {
        //hls类型
        source.type = 'application/x-mpegURL'
      } else if (source.src.indexOf('.flv') !== -1) {
        //flv类型
        source.type = 'video/flv'
      } else {
        //rtmp类型
        source.type = 'rtmp/hls'
      }
      //将播放源添加到video的子级
      video.appendChild(source)
      //挂载到视频容器中
      this.$refs.video.$el.appendChild(video)
      let aspectRatio = '16:9'   //默认横屏
      let that = this

      let option = {
        //视频封面图(activityDetail变量是我业务中用到的，请自行根据实际情况做调整)
        poster: '',
        //视频标题(activityDetail变量是我业务中用到的，请自行根据实际情况做调整)
        title: '',
        timeout: 3000,
        width: '100%',
        height: '100%',
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoDisable: true,
        preload: 'none', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
        language: 'zh-CN',
        fluid: true, // 自适应宽高
        muted: false, //  是否静音
        aspectRatio: aspectRatio, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        controls: false, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
        autoplay: true, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
        loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
        techOrder: ['html5', 'flash'], //播放顺序
        screenshot: true,
        controlBar: {
          volumePanel: {
            //声音样式
            inline: false // 不使用水平方式
          },
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          remainingTimeDisplay: true, //当前以播放时间
          fullscreenToggle: true, //全屏按钮
          pictureInPictureToggle: true //画中画
        }
      }
      console.log("init videoJs ", videojs)
      this.videoPlayer = videojs('myVideo', option, function () {
        this.on('error', function () {
          //请求数据时遇到错误
          that.$emit("onLoadingVideoError");
          console.log('请求数据时遇到错误')
        })
        this.on('stalled', function () {
          //网速失速
          console.log('网速失速')
        })
        this.on('play', function () {
          //开始播放
          console.log('开始播放')
          that.isPlaying = true
        })
        this.on('pause', function () {
          //暂停
          console.log('暂停')
          that.isPlaying = false
        })
        this.on('timeupdate', function () {
        })
      })
    },
    //切换播放视频
    switchPlayVideo() {
      if (this.isPlaying) {
        //正在播放就暂停
        this.pauseVideo()
      } else {
        //暂停就播放
        this.playVideo()
      }
    },
    //播放视频
    playVideo() {
      if (this.isFlv) {
        if (flvjs.isSupported() && !this.forceUseNodePlayer) {
          this.flv_start()
        } else {
          this.isPlaying = true;
          this.startListenTimeoutTicker();
          this.nodePlayer.start(this.addSrcTimeseed(this.src));
        }
      } else {
        console.log("playVideo播放", this.videoPlayer)
        if (this.videoPlayer) {
          if (this.videoPlayer?.player?.play) {
            this.videoPlayer?.player?.play();
          } else if (this.videoPlayer?.play) {
            this.videoPlayer?.play();
          }
        }
      }
      //this.$emit('refreshVideo')
    },
    //暂停播放视频
    pauseVideo() {
      if (this.isFlv) {
        if (this.nodePlayer) {
          this.nodePlayer.stop();
        } else {
          this.flv_pause()
        }
      } else {
        this.videoPlayer.pause()
      }
    },
    initFlv() {  // 生成需要的video 组件
      let that = this;
      // var player = document.getElementById('videoElement');
      var player = document.createElement('video')
      player.id = 'video'
      player.style = 'width: 100%; height: 100%;'
      player.enableProgressGesture = false
      player.controls = false
      player.showCenterPlayBtn = false
      player.showPlayBtn = false
      player.showFullscreenBtn = false
      player.x5VideoPlayerType = 'h5-page'
      player.x5VideoPlayerFullscreen = "false"
      player.autoplay = true   // 以上均为 video标签的属性配置
      /*document.getElementById("myPlayer").appendChild(player);*/
      //挂载到视频容器中
      this.$refs.video.$el.appendChild(player)
      if (flvjs.isSupported()) {

        this.player = flvjs.createPlayer({
          type: 'flv',
          isLive: true, //<====直播的话，加个这个
          url: this.src, //<==自行修改
        });
        this.player.attachMediaElement(player);
        this.player.load(); //加载
        player.play()
        this.isPlaying = true
        this.player.on(flvjs.Events.ERROR, (errorType, erreryDetal, errorInfo) => {
          if (errorType == flvjs.ErrorTypes.NETWORK_ERROR || errorType == flvjs.ErrorTypes.MEDIA_ERROR) {
            that.$emit("onLoadingVideoError");
            if (this.player) {
              this.player.pause();
              this.player.unload();
            }
          }
        })

        // this.flv_start();
      }
    },
    flv_start() {   //开始
      this.player.play()
      this.isPlaying = true
    },
    flv_pause() {  //暂停
      this.player.pause();
      this.isPlaying = false
    },
    flv_destroy() { //停止
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
    },
    flv_seekto() {   // 复制其他人的  我还没用这个
      this.player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
    },
    getFlashVersion() {
      try {
        if (typeof window.ActiveXObject != 'undefined') {
          return parseInt((new ActiveXObject('ShockwaveFlash.ShockwaveFlash')).GetVariable("$version").split(" ")[1].split(",")[0], 10);
        } else {
          return parseInt(navigator.plugins["Shockwave Flash"].description.split(' ')[2], 10);
        }
      } catch (e) {
        return 0;
      }
    },

    onPlaySound() {
      this.nodePlayer && this.nodePlayer.audioResume()
    },
    fullScreenClick() {
      try {
        this.isFullScreen = !this.isFullScreen;

      } catch (e) {
        alert(e.message)
      }
    },
    createdScript(url) {
      return new Promise((resolve, reject) => {
        // 创建script标签，引入外部文件
        let script = document.createElement('script')
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
        // 引入成功
        script.onload = function () {
          console.log('js资源已加载成功了');
          resolve();
        }
        // 引入失败
        script.onerror = function () {
          console.log('js资源加载失败了');
          reject();
        }
      });
    },
    createLink(url) {
      return new Promise((resolve, reject) => {
        // 创建script标签，引入外部文件
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
        // 引入成功
        link.onload = function () {
          console.log('link资源已加载成功了');
          resolve();
        }
        // 引入失败
        link.onerror = function () {
          console.log('link资源加载失败了');
          reject();
        }
      });
    },
    // 初始化需要加载静态资源，然后再加载播放器
    init() {
      if (this.src?.includes(".flv")) {
        this.initPlayer();
      } else if (this.src?.includes(".sdp")) {
        Promise.all([
          this.createdScript(this.scriptObj.vePlayerJs),
          this.createLink(this.scriptObj.vePlayerCss)
        ]).then(() => {
          this.initPlayer();
        });
      } else if (this.isUseAmazonIvsPlayM3u8) {
        Promise.all([
          this.createdScript(this.scriptObj.amazonIvs),
          this.createdScript(this.scriptObj.videoJs),
          this.createLink(this.scriptObj.videoCss)
        ]).then(() => {
          this.initPlayer();
        });
      } else {
        Promise.all([
          this.createdScript(this.scriptObj.videoJs),
          this.createLink(this.scriptObj.videoCss)
        ]).then(() => {
          this.initPlayer();
        });
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.view-full-screen {
  width: 100vh !important;
  height: 100vw !important;
  position: fixed !important;
  z-index: 1001;
  transform: rotate(90deg);
  -webkit-background-origin: center;
  transition-origin: center;
  left: calc((100vw - 100vh) / 2);
  top: calc((100vh - 100vw) / 2);;
}

/deep/ .xgplayer {
  height: 100% !important;
  padding-top: 0px !important;
}

.video-display-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: black;
}

.play-btn-icon {
  position: absolute !important;
  z-index: 998;
  width: 100rpx;
  height: 100rpx;
}

.video-mask {
  position: absolute;
  z-index: 998;
  width: 100%;
  height: 100%;
}

.sound-add {
  position: absolute !important;
  z-index: 999;
  bottom: 10rpx;
  right: 90rpx;
  opacity: 0.7;
}

.sound-add .icon {
  width: 60rpx;
  height: 60rpx;
}

.full-screen {
  position: absolute !important;
  z-index: 999;
  bottom: 10rpx;
  right: 20rpx;
  opacity: 0.7;
}

.full-screen .icon {
  width: 60rpx;
  height: 60rpx;
}

.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.loading .loading-message {
  height: 40rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.loading .loading-message-text {
  color: white;
  font-size: 30rpx;
  line-height: 40rpx;
  margin-left: 10rpx;
}

.loading .loading-message-ico {
  animation: icoroll 1s infinite;
  /*Safari 和 Chrome:*/
  -webkit-animation: icoroll 1s infinite;
}

@keyframes icoroll {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

</style>
