import configEnums from '../models/configEnum'

export default {
  KEY_IS_DEBUG: 'isDebug',
  KEY_IS_DEV: 'isDev',
  KEY_STATION: 'station',
  KEY_STATION_VERSION: 'stationVersion',
  KEY_STATION_GOOGLE_ID: 'googleTagId',
  KEY_IS_THEME: 'forceServerTheme',
  KEY_IS_LANGUAGE: 'forceServerLanguage',
  KEY_ALL_HTTP_REQUEST_USE_ENCRYPT: 'httpRequestUserEncrypt',
  KEY_ALL_HTTP_RESPONSE_USE_ENCRYPT: 'httpResponseUserEncrypt',
  KEY_ALL_HTTP_RESPONSE_USE_CACHEMAP: 'httpResponseUseCacheMap',
  KEY_ALL_HTTP_REQUEST_USE_ENCRYPT_PRINT_LOG: 'httpRequestUserEncryptLog',
  KEY_USE_WS_SERVER: 'useWsServer',
  KEY_OPEN_HTTP_SIGN: 'openHttpSign',

  getConfigIsForceServerTheme(defaultValue) {
    const v = this.getConfigValue(this.KEY_IS_THEME)
    if (v === undefined) return defaultValue
    return !v
  },
  getConfigIsForceServerLanguage(defaultValue) {
    const v = this.getConfigValue(this.KEY_IS_LANGUAGE)
    if (v === undefined) return defaultValue
    return v
  },
  getConfigIsDebugOrDefault(defaultValue) {
    const v = this.getConfigValue(this.KEY_IS_DEBUG)
    if (v === undefined) return defaultValue
    return !!v
  },
  getConfigIsDevOrDefault(defaultValue) {
    const v = this.getConfigValue(this.KEY_IS_DEV)
    if (v === undefined) return defaultValue
    return !!v
  },

  getConfigStationOrDefault(defaultValue) {
    const value = this.getConfigValue(this.KEY_STATION)
    if (
      value !== undefined &&
      [
        configEnums.STATION.ALL,
        configEnums.STATION.LIUHE,
        configEnums.STATION.LUNTAN
      ].indexOf(value.toString().toUpperCase()) != -1
    ) {
      return value
    }
    console.warn('station can\'t rewrite')
    return defaultValue
  },

  getConfigStationVersionCodeOrDefault(defaultValue) {
    const value = this.getConfigValue(this.KEY_STATION_VERSION)
    if (value != undefined) {
      const diction = configEnums.STATION_VERSION_CODE
      let inDiction = false
      const configurationCodeFormated = value.toUpperCase()
      for (const versionKey in diction) {
        if (configurationCodeFormated == diction[versionKey]) {
          inDiction = true
          break
        }
      }
      if (inDiction && defaultValue != value) {
        return value
      }
    }
    return defaultValue
  },

  getConfigUseEncyptOnHttpReq(defaultValue) {
    const v = this.getConfigValue(this.KEY_ALL_HTTP_REQUEST_USE_ENCRYPT)
    if (v === undefined) return defaultValue
    return !!v
  },

  getConfigUseEncyptOnHttpResp(defaultValue) {
    const v = this.getConfigValue(this.KEY_ALL_HTTP_RESPONSE_USE_ENCRYPT)
    if (v === undefined) return defaultValue
    return !!v
  },

  getConfigUseHttpCacheMap(defaultValue) {
    const v = this.getConfigValue(this.KEY_ALL_HTTP_RESPONSE_USE_CACHEMAP)
    if (v === undefined) return defaultValue
    return !!v
  },
  /**
   * 	获取重写配置文件属性：
   * 	是否打印接口发送参数日志
   */
  getConfigUseEncyptOnHttpReqPrintLog(defaultValue) {
    const v = this.getConfigValue(
      this.KEY_ALL_HTTP_REQUEST_USE_ENCRYPT_PRINT_LOG
    )
    if (v === undefined) return defaultValue
    return !!v
  },

  getConfigUsedWsServer(defaultValue) {
    const v = this.getConfigValue(this.KEY_USE_WS_SERVER)
    if (v === undefined) return defaultValue
    return v
  },

  getConfigOpenHttpSign(defaultValue) {
    const v = this.getConfigValue(this.KEY_OPEN_HTTP_SIGN)
    if (v === undefined) return defaultValue
    return v
  },

  initGoogleTag() {
    // #ifdef H5
    const googleId = this.getConfigValue(this.KEY_STATION_GOOGLE_ID)
    if (!googleId) return console.error('google tag id is null')

    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', googleId)
    const hm = document.createElement('script')
    hm.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`
    hm.async = true
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
    // #endif
  },

  getConfigValue(key) {
    // #ifdef H5
    if (window && window.hasOwnProperty('Configuration')) {
      return Configuration[key]
    }
    // #endif
    return undefined
  }
}
