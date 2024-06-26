import { defineStore } from 'pinia'
import utlilCommons from '@/utils/common'

const systemInfoStore = defineStore('systemInfoStore', {
  state: {
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
  },
  getters: {
    windowTop: (state) => uni.getStorageSync('windowTop') || state.windowTop,
    windowBottom: (state) => state.windowBottom,
    downloadShow: (state) => {
      // APP环境下不打开
      // if (window && window['isApp'] && isApp instanceof Function) {
      //     uni.setStorageSync('downloadShow', false)
      //     if (isApp()) return false;
      // }
      const val = uni.getStorageSync('downloadShow')
      return typeof val === 'boolean' ? val : state.downloadShow
    },
    uIOSDeviceToken: (state) => state.iosDeviceToken,

    uSystemInfo(state) {
      if (!state.systemInfo) state.systemInfo = uni.getSystemInfoSync()
      return state.systemInfo
    },
    safeHeight(state) {
      return state.safeHeight
    },
    /**
     *  uni.getSystemInfoSync().windowHeight 获取到的高度值，会在监听window大小变化之后被重写
     * @param state
     * @returns {*}
     */
    uWindowHeight: (state) => state.windowHeight,
    uWindowWidth: (state) => state.windowWidth,
    /**
     * APP 版本信息
     * @param state
     * @returns {{number: string, version: string}}
     */
    flutterAppVersionInfo: (state) => state.flutterAppVersionInfo
  },
  mutations: {
    SET_WINDOW_TOP: (state, windowTop) => {
      state.windowTop = windowTop
      uni.setStorageSync('windowTop', windowTop)
    },
    SET_WINDOW_BOTTOM: (state, windowBottom) => {
      document.documentElement.style.setProperty(
        '--safe-area-inset-bottom',
        `${windowBottom}px`
      )
      state.windowBottom = windowBottom
    },

    SET_FLUTTER_APPVERSION: (state, { version, number }) => {
      version && (state.flutterAppVersionInfo.version = version)
      number && (state.flutterAppVersionInfo.number = number)
    }
  },
  actions: {
    setDownloadShow({ state, dispatch }, data) {
      uni.setStorageSync('downloadShow', data)
      state.downloadShow = data
      dispatch('setVH')
    },
    initUniSystemInfo({ commit, state, dispatch }) {
      const systemInfo = !state.systemInfo
        ? uni.getSystemInfoSync()
        : state.systemInfo
      const systemHeight = systemInfo.windowHeight
      dispatch('updateWindowSize', {
        width: systemInfo.windowWidth,
        height: systemHeight
      })
    },
    updateWindowSize({ commit, state, dispatch }, { width, height }) {
      state.windowWidth = width
      state.windowHeight = height
      dispatch('setVH')
    },
    freshDeviceToken({ state }, token) {
      state.iosDeviceToken = token
    },
    setVH({ state }) {
      const elH =
        uni.getStorageSync('downloadShow') === true
          ? utlilCommons.caculationRpxToPx(108)
          : 0
      const vh = state.windowHeight - state.windowBottom - elH
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
})

export default systemInfoStore
