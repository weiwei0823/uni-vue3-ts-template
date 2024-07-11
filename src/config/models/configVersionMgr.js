import { config } from '../config.js'

export default {
  // 版本设置常量ID
  configContantId: 52,

  configContantType: 'frontVersion',

  // 最大版本刷新匹配尝试次数
  configMaxTryReload: 3,

  // 记录版本匹配信息
  configKeySaveTryMap: 'version_try_map',
  doCheckReloadStationContrastVersion(contants) {
    const serverContantsInfo = this.getContantInfoFromContants(contants)
    if (!serverContantsInfo) return
    const serverVersion = serverContantsInfo.url
    const localVersion = config.version_dev
    const versionTryMap = uni.getStorageSync(this.configKeySaveTryMap)
    const saveVersionKey = `${localVersion}_to_${serverVersion}`
    let tryVersionTimes = versionTryMap ? versionTryMap[saveVersionKey] : 0
    if (isNaN(tryVersionTimes)) tryVersionTimes = 0
    const serverVersioNums = this.getServerNumbers(serverVersion)
    const localVersionNums = this.getServerNumbers(localVersion)
    // 开始对比版本
    if (
      this.localVersionMinThanServerVersion(localVersionNums, serverVersioNums)
    ) {
      if (this.configMaxTryReload > tryVersionTimes) {
        tryVersionTimes++
        const saveObj = {}
        saveObj[saveVersionKey] = tryVersionTimes
        uni.setStorageSync(this.configKeySaveTryMap, saveObj)
        window.location.reload(true)
      } else {
        // uni&&uni.showModal({
        //     title:"提示",
        //     content:"自动更新失败，当前版本非最新版吧。请尝试清空浏览器缓存"
        // })
      }
    }
    console.log(
      serverVersioNums,
      localVersionNums,
      '-----',
      new Date().getTime()
    )
  },

  localVersionMinThanServerVersion(localVersionNums, serverVersionNumbers) {
    let isMin = true
    for (let i = 0; i < 4; i++) {
      const numLocal =
        localVersionNums.length > i ? parseInt(localVersionNums[i]) : 0
      const numServer =
        serverVersionNumbers.length > i ? parseInt(serverVersionNumbers[i]) : 0
      if (numLocal > numServer) {
        isMin = false
        break
      }
    }
    return isMin
  },

  getServerNumbers(version) {
    const reg = /\d+/g
    const numbers = version.match(reg)
    return numbers
  },

  getContantInfoFromContants(contants) {
    if (!contants) return null
    for (const i in contants) {
      const info = contants[i]
      if (
        info.id == this.configContantId ||
        info.type == this.configContantType
      ) {
        return info
      }
    }
    return null
  }
}
