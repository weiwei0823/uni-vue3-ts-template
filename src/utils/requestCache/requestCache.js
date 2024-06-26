import cacheConfigs from './cacheConfig/ApiCacheConfig'
import { config } from '@/config/config'

export default {
  clearApiMap: null,

  initApiCacheConfig(requestArgs) {
    const openCache = config.allHttpRequestUseCacheMap
    if (!openCache) return
    const api = requestArgs.url
    const configPice = cacheConfigs[api]
    if (configPice) {
      configPice.cache && (requestArgs.cacheTime = configPice.cache)
      configPice.forceUpdateCache &&
        (requestArgs.forceUpdateCache = configPice.forceUpdateCache)
      configPice.afterClear &&
        (requestArgs.afterClearCaches = configPice.afterClear)
    }
  },

  getApiCacheConfigMap() {},

  getApiClearCachePointMap() {
    if (this.clearApiMap) return this.clearApiMap
    const clearApiMap = {}
    for (const apiset in cacheConfigs) {
      const configPice = cacheConfigs[apiset]
      const afterClearApis = configPice.afterClear || null
      if (afterClearApis && Array.isArray(afterClearApis)) {
        afterClearApis.forEach((_excuteApi) => {
          if (!clearApiMap[_excuteApi]) clearApiMap[_excuteApi] = []
          const pointList = clearApiMap[_excuteApi]
          if (pointList.indexOf(apiset) == -1) pointList.push(apiset)
        })
      }
    }
    this.clearApiMap = clearApiMap
    return this.clearApiMap
  },

  bindLastCacheUpdateApiCallBack(res, callBack, region) {
    res[config.enumMgr.API_CACHE_CALLBACK_NAME] = (netResp) => {
      // console.log("绑定回调内容",res,callBack,region)
      if (callBack && region) callBack.call(region, netResp)
    }
  }
}
