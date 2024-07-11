/**
 * 调整变量 方便后续扩展其它环境 挂载全局变量位置
 * @type {{}|*}
 * @private
 */

import { config } from '../config/config'
import store from '@/store'
import gDocumentHelper from './global/documentHelper'

const _g = global

_g.isLogin = function () {
  const token = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
  )
  if (!token) {
    return false
  }
  const userInfo = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
  )
  if (!userInfo || !userInfo.id) {
    store.dispatch('updateUserInfoFromServer')
  }
  return true
}
_g.pop = function (msg, time = 1000, icon = null, cb = null, cbRegion = null) {
  const args = {
    title: msg,
    duration: time
  }

  if (icon) args.image = icon
  else args.icon = 'none'
  if (cb && cbRegion)
    args.complete = function () {
      const ticker = setTimeout(() => {
        clearTimeout(ticker)
        cb.call(cbRegion)
      }, time)
    }
  uni.showToast(args)
}
_g.backPage = function (backAll = false, forceBack = null) {
  const canNavBack = getCurrentPages()
  if (canNavBack && canNavBack.length > 1) {
    uni.navigateBack({
      delta: backAll ? canNavBack.length : 1
    })
  } else if (forceBack) {
    uni.navigateTo({
      url: forceBack,
      fail: () => {
        uni.switchTab({
          url: forceBack
        })
      }
    })
  } else {
    history.back()
  }
}
_g.openUrl = function (info) {
  if (info.jumpStatus == 0) return false
  if (info.jumpType == 1) {
    uni.switchTab({
      url: info.jumpUrl
    })
    uni.navigateTo({
      url: info.jumpUrl,
      success(res) {
        res.eventChannel.emit('argParams', info)
      }
    })
  } else {
    // #ifndef H5
    plus.runtime.openURL(info.jumpUrl) // 成功跳转了
    return
    // #endif
    if (browserPlatform() == browserPlatform.FLUTTER_App) {
      this.$nativeBridge.openUrl(info.jumpUrl)
    } else {
      window.open(info.jumpUrl, '_blank')
    }
  }
}
/**
 * 获取当前浏览器环境
 * @returns {string}
 */
_g.browserPlatform = function () {
  const systemInfo = uni.getSystemInfoSync()
  // #ifdef H5
  if (systemInfo.ua.indexOf(browserPlatform.Android_App) != -1) {
    return browserPlatform.Android_App
  }
  if (systemInfo.ua.indexOf(browserPlatform.IOS_App) != -1) {
    return browserPlatform.IOS_App
  }
  /**
   * Flutter混合包 userAgent
   */
  if (systemInfo.ua.indexOf(browserPlatform.FLUTTER_App) != -1) {
    return browserPlatform.FLUTTER_App
  }
  /**
   * safari 添加主屏幕后启动
   */
  // if (window.navigator.standalone) {
  //     return browserPlatform.FLUTTER_App;
  // }

  if (systemInfo.osName == 'ios') {
    return browserPlatform.IOS
  }
  if (systemInfo.osName == 'android') {
    return browserPlatform.Android
  }
  return browserPlatform.IOS
  // #endif
  return 'unknow'
}

// 设备类型code 1.PC 2.H5 3.IOS 4.ANDROID 默认h5
_g.browserPlatformRegionCode = function () {
  const systemInfo = uni.getSystemInfoSync()
  if (systemInfo.ua.indexOf(browserPlatform.FLUTTER_App) != -1) {
    return systemInfo.ua.indexOf('Andorid') != -1 ? 4 : 3
  }
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return 2
  }
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return 1
  }
  return 2
}
// H5 IOS 浏览器环境
_g.browserPlatform.IOS = 'ios_brower'
// IOS webview打包环境
_g.browserPlatform.IOS_App = 'ios_app_borwer'
// 安卓类型
_g.browserPlatform.FLUTTER_App = 'MkWebEngine-Flutter'

_g.browserPlatform.FLUTTER_App_ANDORID = 'MkWebEngine-Flutter-Android'

_g.browserPlatform.FLUTTER_App_IOS = 'MkWebEngine-Flutter-IOS'

// H5 安卓 浏览器环境
_g.browserPlatform.Android = 'android_borwer'
// 安卓 webview打包环境
_g.browserPlatform.Android_App = 'android_app_borwer'

_g._browserPlatform = browserPlatform()
/**
 * 判断当前环境是否为APP
 * @param cb
 * @param region
 */
_g.isApp = function (cb, region) {
  if (browserPlatform() == browserPlatform.FLUTTER_App) {
    const systemInfo = uni.getSystemInfoSync()
    let type = null
    // App 发回 andorid 是错误的拼写
    if (systemInfo.ua.toLowerCase().indexOf('andorid') != -1) {
      type = browserPlatform.FLUTTER_App_ANDORID
    }
    if (systemInfo.ua.toLowerCase().indexOf('ios') != -1) {
      type = browserPlatform.FLUTTER_App_IOS
    }
    if (type && cb && region) cb.call(region, type)
    return true
  }
  return false
}

if (browserPlatform() == browserPlatform.IOS_App) {
  console.log = function (msg) {
    try {
      window.webkit.messageHandlers.jsListener.postMessage(
        JSON.stringify({ event: 'ON_CONSOLE_LOG', value: msg })
      )
      // window.IOSBridge.onJSONStringMessage(JSON.stringify({event:"ON_CONSOLE_LOG",value:msg}));
    } catch (e) {}
  }
}

_g.inputKeyBordUnopendWinHiehgt = 0
_g.inputKeyBordElement = null
_g.inputKeyBordSetTimer = -1

_g.followKeybordSetInputStyle = function (pageInstance, windowTop = 0) {
  if (browserPlatform() == browserPlatform.FLUTTER_App) {
    console.warn('this platform faild')
    return
  }
  const inputs = document.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const { style } = pageInstance.$el
    style.transition = 'top .3s'
    input.addEventListener('focus', () => {
      setTimeout(() => {
        const { top } = pageInstance.$el.getBoundingClientRect()
        console.log(top)
        style.top = `${top > 0 ? 0 : Math.abs(top)}px`
        style.position = 'sticky'
        style.zIndex = '99999'
      }, 300)
    })
    input.addEventListener('blur', () => {
      style.position = 'relative'
      style.top = 0
    })
  }
}

_g.followKeybordHeight = function (pageInstance, windowTop = 0) {
  if (browserPlatform() == browserPlatform.IOS_App) {
    console.warn('this platform faild')
    return
  }
  const inputs = document.getElementsByTagName('input')
  console.log(pageInstance)
  const oldPostion = pageInstance.$el.style.position
  const oldTop = pageInstance.$el.style.top
  const doChange = function (keyBoradOpend) {
    const systemInfo = uni.getSystemInfoSync()
    const winHeight = systemInfo.windowHeight
    const offsetHeight = store.state.systemInfo.windowHeight - winHeight
    pageInstance.$el.style.position = keyBoradOpend ? 'fixed' : oldPostion
    pageInstance.$el.style.top = keyBoradOpend ? `${offsetHeight}px` : oldTop
  }
  for (let index = 0, s = inputs.length; index < s; index++) {
    const elementInput = inputs[index]
    elementInput.addEventListener('focus', function (e) {
      clearTimeout(inputKeyBordSetTimer)
      inputKeyBordSetTimer = setTimeout(() => {
        doChange(true)
      }, 200)
    })
    elementInput.addEventListener('blur', function (e) {
      clearTimeout(inputKeyBordSetTimer)
      inputKeyBordSetTimer = setTimeout(() => {
        doChange(false)
      }, 200)
    })
  }
}

_g.buildSign = async function (slot, apikey) {
  return new Promise((resolve) => {
    let tryTimes = 0
    const run = function () {
      const model = window.SignModel
      if (model) {
        try {
          const { SignModel } = window
          const pr1 = SignModel.allocate(SignModel.intArrayFromString(slot), 0)
          const pr2 = SignModel.allocate(
            SignModel.intArrayFromString(apikey),
            0
          )
          const pr3 = SignModel._getSignCode(pr1, pr2)
          const sign = SignModel.UTF8ToString(pr3)
          SignModel._free(pr1)
          SignModel._free(pr2)
          SignModel._free(pr3)
          resolve(sign)
          return true
        } catch (e) {
          console.log(tryTimes)
          console.warn(e.message)
          if (tryTimes > 20) {
            resolve(null)
            return true
          }
          tryTimes++
        }
        return false
      }
      if (tryTimes > 5) {
        resolve(null)
        return true
      }
      tryTimes++

      return false
    }
    var waitter = setInterval(() => {
      if (run()) {
        clearInterval(waitter)
      }
    }, 100)
    if (run()) {
      clearInterval(waitter)
    }
  })
}

Date.prototype.Format = function (formatStr) {
  let str = formatStr
  const Week = ['日', '一', '二', '三', '四', '五', '六']

  str = str.replace(/yyyy|YYYY/, this.getFullYear())
  str = str.replace(
    /yy|YY/,
    this.getYear() % 100 > 9
      ? (this.getYear() % 100).toString()
      : `0${this.getYear() % 100}`
  )

  str = str.replace(
    /MM/,
    this.getMonth() > 9 ? this.getMonth().toString() : `0${this.getMonth() + 1}`
  )
  str = str.replace(/M/g, this.getMonth())

  str = str.replace(/w|W/g, Week[this.getDay()])

  str = str.replace(
    /dd|DD/,
    this.getDate() > 9 ? this.getDate().toString() : `0${this.getDate()}`
  )
  str = str.replace(/d|D/g, this.getDate())

  str = str.replace(
    /hh|HH/,
    this.getHours() > 9 ? this.getHours().toString() : `0${this.getHours()}`
  )
  str = str.replace(/h|H/g, this.getHours())
  str = str.replace(
    /mm/,
    this.getMinutes() > 9
      ? this.getMinutes().toString()
      : `0${this.getMinutes()}`
  )
  str = str.replace(/m/g, this.getMinutes())

  str = str.replace(
    /ss|SS/,
    this.getSeconds() > 9
      ? this.getSeconds().toString()
      : `0${this.getSeconds()}`
  )
  str = str.replace(/s|S/g, this.getSeconds())

  return str
}

_g.printDebugLog = function (logMsg, level = printDebugLog.INFO, ...others) {
  if (!config.isDebug) return
  console.log(
    `----Print Log:${logMsg} 【${new Date().Format('yyyy-MM-dd HH:mm:ss')}】`,
    others
  )
}

_g.printDebugLog.INFO = 1
_g.printDebugLog.WARN = 2
_g.printDebugLog.ERROR = 5

_g.intFixed = function (v, n = 3) {
  const seed = 10 ** n
  return parseInt(v * seed) / seed
}
