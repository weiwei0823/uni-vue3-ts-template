import utlilCommons from '@/utils/common'

export const useSystemInfoStore = defineStore('systemInfo', () => {
  const windowTop = ref(uni.getStorageSync('windowTop') || 0)
  const windowBottom = ref(0)
  // IOS 推送ID
  const iosDeviceToken = ref(null)
  const systemInfo = ref(null)
  const windowHeight = ref(0)
  const windowWidth = ref(0)
  const safeHeight = ref(0)
  const downloadShow =
    typeof uni.getStorageSync('downloadShow') === 'boolean'
      ? uni.getStorageSync('downloadShow')
      : false
  const flutterAppVersionInfo = reactive({
    version: '1.0.25',
    number: '26'
  })

  const uWindowHeight = computed(() => {
    return windowHeight.value
  })
  const uWindowWidth = computed(() => {
    return windowWidth.value
  })
  const uSystemInfo = computed(() => {
    if (!systemInfo.value) {
      systemInfo.value = uni.getSystemInfoSync()
    }
    return systemInfo.value
  })

  const SET_WINDOW_TOP = (val: any) => {
    windowTop.value = val
    uni.setStorageSync('windowTop', val)
  }
  const SET_WINDOW_BOTTOM = (val: any) => {
    document.documentElement.style.setProperty(
      '--safe-area-inset-bottom',
      `${val}px`
    )
    windowBottom.value = val
  }
  const SET_FLUTTER_APPVERSION = (obj: any) => {
    if (obj?.version) {
      flutterAppVersionInfo.version = obj?.version
    }
    if (obj?.number) {
      flutterAppVersionInfo.number = obj?.number
    }
  }
  const setDownloadShow = (data: any) => {
    uni.setStorageSync('downloadShow', data)
    downloadShow.value = data
    setVH()
  }
  const initUniSystemInfo = () => {
    const tempSystemInfo = !systemInfo.value
      ? uni.getSystemInfoSync()
      : systemInfo.value
    const systemHeight = tempSystemInfo.windowHeight
    updateWindowSize({
      width: tempSystemInfo.windowWidth,
      height: systemHeight
    })
  }
  const updateWindowSize = (obj: any) => {
    windowWidth.value = obj?.width || 0
    windowHeight.value = obj?.height || 0
    setVH()
  }
  const freshDeviceToken = (token: any) => {
    iosDeviceToken.value = token
  }
  const setVH = () => {
    const elH =
      uni.getStorageSync('downloadShow') === true
        ? utlilCommons.caculationRpxToPx(108)
        : 0
    const vh = windowHeight.value - windowBottom.value - elH
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  return {
    windowTop,
    windowBottom,
    iosDeviceToken,
    systemInfo,
    windowHeight,
    windowWidth,
    safeHeight,
    downloadShow,
    flutterAppVersionInfo,
    uWindowHeight,
    uWindowWidth,
    uSystemInfo,
    SET_WINDOW_TOP,
    SET_WINDOW_BOTTOM,
    SET_FLUTTER_APPVERSION,
    setDownloadShow,
    initUniSystemInfo,
    updateWindowSize,
    freshDeviceToken,
    setVH
  }
})

export default useSystemInfoStore
