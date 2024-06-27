import { defineStore } from 'pinia'
import utlilCommons from '@/utils/common.ts'

const useSystemInfoStore = defineStore('systemInfo', {
  state: () => ({
    windowTop: 0,
    windowBottom: 0,
    // IOS 推送ID
    iosDeviceToken: null,
    systemInfo: null,
    windowHeight: 0,
    windowWidth: 0,
    safeHeight: 0,
    downloadShow: true,

    flutterAppVersionInfo: {
      version: '1.0.25',
      number: '26'
    }
  }),
  getters: {
    windowTop: () => uni.getStorageSync('windowTop') || this.windowTop,
    downloadShow: (state) => {
      // APP环境下不打开
      // if (window && window['isApp'] && isApp instanceof Function) {
      //     uni.setStorageSync('downloadShow', false)
      //     if (isApp()) return false;
      // }
      const val = uni.getStorageSync('downloadShow')
      return typeof val === 'boolean' ? val : this.downloadShow
    },

    uSystemInfo() {
      if (!this.systemInfo) {
        this.systemInfo = uni.getSystemInfoSync()
      }
      return this.systemInfo
    },
  },
  actions: {
    SET_WINDOW_TOP: (windowTop) => {
      this.windowTop = windowTop
      uni.setStorageSync('windowTop', windowTop)
    },
    SET_WINDOW_BOTTOM: (windowBottom) => {
      document.documentElement.style.setProperty(
          '--safe-area-inset-bottom',
          `${windowBottom}px`
      )
      this.windowBottom = windowBottom
    },

    SET_FLUTTER_APPVERSION: ({ version, number }) => {
      version && (this.flutterAppVersionInfo.version = version)
      number && (this.flutterAppVersionInfo.number = number)
    },
    setDownloadShow(data) {
      uni.setStorageSync('downloadShow', data)
      this.downloadShow = data
      this.setVH()
    },
    initUniSystemInfo() {
      const systemInfo = !this.systemInfo
        ? uni.getSystemInfoSync()
        : this.systemInfo
      const systemHeight = systemInfo.windowHeight
      this.updateWindowSize({
        width: systemInfo.windowWidth,
        height: systemHeight
      })
    },
    updateWindowSize({ width, height }) {
      this.windowWidth = width
      this.windowHeight = height
      this.setVH()
    },
    freshDeviceToken(token) {
      this.iosDeviceToken = token
    },
    setVH() {
      const elH =
        uni.getStorageSync('downloadShow') === true
          ? utlilCommons.caculationRpxToPx(108)
          : 0
      const vh = this.windowHeight - this.windowBottom - elH
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
})

export default useSystemInfoStore
