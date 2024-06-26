import { config } from '@/config/config'
import { getTime } from '@/utils/common'

const LogWatcher = function (logName) {
  this.seed = `${Date.now()}${Math.ceil(Math.random() * 99999)}`
  this.logName = logName
  this.startTime = -1
  this.endTime = -1
  this.responseMaxSize = 100
  this.responseData = ''
  this.timeOutTicker = -1
  this.saved = false
  this.start = function (timeOut = 20000) {
    this.startTime = Date.now()
    const _this = this
    this.timeOutTicker = setTimeout(function () {
      _this.save(-1, {}, '请求超时')
    }, timeOut)
    return this
  }
  this.save = function (code, response, desc = '') {
    clearTimeout(this.timeOutTicker)
    if (this.saved) return
    this.saved = true
    this.endTime = Date.now()
    const responseStr = JSON.stringify(response)
    const saveObject = {
      code,
      desc,
      response: responseStr.substring(0, this.responseMaxSize),
      seed: this.seed,
      logName: this.logName,
      useTime: this.endTime - this.startTime,
      begin: this.startTime,
      end: this.endTime,
      startDate: getTime(this.startTime)
    }
    const logger = config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_DEBUG_LOG_HTTP
    const configMax = config.loggerMax
    let logArray = uni.getStorageSync(logger)
    if (!logArray) logArray = []
    if (logArray.length > configMax) logArray.pop()
    logArray.unshift(saveObject)
    uni.setStorageSync(logger, logArray)
  }
}

const UserInfoGetWatcher = function (logName) {
  this.seed = `${Date.now()}${Math.ceil(Math.random() * 99999)}`
  this.logName = logName
  this.startTime = -1
  this.endTime = -1
  this.responseMaxSize = 200
  this.responseData = ''
  this.timeOutTicker = -1
  this.saved = false
  this.start = function (timeOut = 20000) {
    this.startTime = Date.now()
    const _this = this
    this.timeOutTicker = setTimeout(function () {
      _this.save(-1, {}, '请求超时')
    }, timeOut)
    return this
  }
  this.save = function (code, response, desc = '') {
    try {
      // 废弃
      return
      clearTimeout(this.timeOutTicker)
      if (this.saved) return
      this.saved = true
      this.endTime = Date.now()
      const uInfo = response
      const userInfoSort = {
        Uid: uInfo && uInfo.id ? uInfo.id : 'null',
        name: uInfo && uInfo.nickname ? uInfo.nickname : 'null',
        headImgUrl:
          uInfo && uInfo.headImgUrl
            ? uInfo &&
              uInfo.headImgUrl.slice(
                uInfo.headImgUrl.length - 37,
                uInfo.headImgUrl.length
              )
            : 'null'
      }
      const responseStr = JSON.stringify(userInfoSort)
      const saveObject = {
        code,
        desc,
        response: responseStr.substring(0, this.responseMaxSize),
        seed: this.seed,
        logName: this.logName,
        useTime: this.endTime - this.startTime,
        begin: this.startTime,
        end: this.endTime,
        startDate: getTime(this.startTime)
      }
      const logger =
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_DEBUG_LOG_USERINFO
      const configMax = config.loggerMax
      let logArray = uni.getStorageSync(logger)
      if (!logArray) logArray = []
      if (logArray.length > configMax) logArray.pop()
      logArray.unshift(saveObject)
      uni.setStorageSync(logger, logArray)
    } catch (e) {}
  }
}

export default {
  createLogWatcher(apiName) {
    return new LogWatcher(apiName)
  },

  createUserInfoLogWatcher(apiName) {
    return new UserInfoGetWatcher(apiName)
  },

  getLoggers() {
    const logger = config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_DEBUG_LOG_HTTP
    let logArray = uni.getStorageSync(logger)
    if (!logArray) logArray = []
    return logArray
  },

  // 调试方法
  printWebsocketLotteryMessageLog(data) {
    // #ifdef H5
    console.log('websocket推送彩消息')
    const lotteryInfo = JSON.parse(data.msgTxt)
    console.log(lotteryInfo)
    console.log('=================================')
    console.log('lotteryNo [上一下注回合信息]', lotteryInfo.lotteryNo)
    console.log('lotteryResult [上一下注回合结果]', lotteryInfo.lotteryNo)
    console.log('=================================')
    console.log('nextShorNo [当前下注回合]', lotteryInfo.nextShorNo)
    console.log(
      'stampType [当前下注回合状态]',
      lotteryInfo.stampType,
      '1 封盘段 2 购彩段 3封单(关盘)段'
    )
    console.log(
      'closeTimeStamp [当前下注回合剩余多少秒]',
      lotteryInfo.closeTimeStamp
    )

    console.log('=================================')
    console.log('[客户端模拟进入下一回合?]', lotteryInfo.nextRound != null)
    lotteryInfo.nextRound != null &&
      console.log('[客户端模拟下一回合]', lotteryInfo.nextRound.nextShorNo)
    lotteryInfo.nextRound != null &&
      console.log('[客户端模拟下一回合]', lotteryInfo.nextRound.nextNo)
    lotteryInfo.nextRound != null &&
      console.log(
        '[客户端模拟进入下一回剩余时间]',
        lotteryInfo.nextRound.closeTimeStamp
      )
    lotteryInfo.nextRound != null &&
      console.log('[客户端模拟下一回合信息]', lotteryInfo.nextRound)
    // #endif
  }
}
