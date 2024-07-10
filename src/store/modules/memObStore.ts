import global from 'global'
import { paramKeySort } from '@/utils/common.ts'
import { config } from '@/config/config'
import requestCache from '@/utils/requestCache/requestCache'

const API_CACHED_STRINGS = {
  SAVE_DATA_KEY_UPDATETIME: 'updateTime',
  SAVE_DATA_KEY_LIFECRICLE: 'lifeCricle',
  SAVE_DATA_KEY_DATA: 'data'
}

const _paramKeySort = (query: any) => {
  return `query_${paramKeySort(query)}`
}

export const useMemObStore = defineStore('memOb', () => {
  const pathPreloadedMap = ref({})
  const willShowFeedBackDetail = ref(null)
  // 彩种打开弹出广告层内容缓存
  const pageLotteriesAdvers = ref(null)
  const pageSetAvatarBuilds = ref(null)
  const apiEnterGameDetails = ref(null)
  const apiMemCachePool = ref({})
  const apiCountMap = ref({})

  const MEM_WILL_SHOW_FEED_BACK_DETAIL = computed(() => {
    return willShowFeedBackDetail.value
  })
  const LOTTERIES_ADVERMSG = computed(() => {
    return pageLotteriesAdvers.value
  })
  const GET_API_CACHE = computed(() => {
    return 0
  })

  const bindWillShowFeedBackDetailInfo = (detailInfo: any) => {
    willShowFeedBackDetail.value = detailInfo
  }
  /**
   *  检测某个账号是否加载过
   * @param commit
   * @param dispatch
   * @returns {Promise<Promise<*> | Promise>}
   */
  const preloadPageByPath = (path: any) => {
    return new Promise((resolve) => {
      if (pathPreloadedMap.value[path]) {
        return resolve(true)
      }
      uni.preloadPage({
        url: path,
        success: () => {
          pathPreloadedMap.value[path] = true
          resolve(true)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  }

  /**
   * 使用队列形式加载paths 预防加载进程过大卡顿掉帧
   * @param paths
   * @returns {Promise<void>}
   */
  const preloadPagesByPathsQueue = async (paths: any) => {
    while (paths.length > 0) {
      await preloadPageByPath(paths.pop())
    }
  }
  /**
   * 加载paths
   * @param paths
   * @returns {Promise<void>}
   */
  const preloadPagesByPaths = async (paths: any) => {
    while (paths.length > 0) {
      preloadPageByPath(paths.pop())
    }
  }

  const updateCacheStore = (obj: any) => {
    if (obj) {
      const { key, info } = obj
      const { syncTime, cacheTime, data } = info
      const saveInfo = {
        syncTime: syncTime || 0,
        cacheTime: cacheTime || 0,
        data
      }
      if (obj.hasOwnProperty(key)) {
        obj[key] = saveInfo
      }
    }
  }

  const bindEnterGameDetaildMesssage = (resp: any) => {
    apiEnterGameDetails.value = resp
  }

  const doCountApiAndClearCacheAfterClear = (requestArgs: any) => {
    const apiName = requestArgs.url
    if (!apiName) {
      console.warn(`${apiName} faild`)
    }
    const oldNum = apiCountMap.value[apiName] || 0
    apiCountMap.value[apiName] = oldNum + 1
    // ApiCache 接口触发后 需要清理其它接口缓存配置 避免数据更新不更新的配置
    const afterClearApis = requestCache.getApiClearCachePointMap()
    const needClearCacehApis = afterClearApis[apiName]
    if (needClearCacehApis && Array.isArray(needClearCacehApis)) {
      needClearCacehApis.forEach((needClearApi) => {
        global.printDebugLog(`缓存清理${needClearApi}`)
        delete apiMemCachePool.value[needClearApi]
      })
    }
  }

  const bindApiMemCache = (obj: any) => {
    const { requestArgs, result, callback } = obj
    const cachedTime = requestArgs.cacheTime
    const { forceUpdateCache } = requestArgs
    if (!cachedTime && !forceUpdateCache) return

    const cachePool = apiMemCachePool.value
    const apiName = requestArgs.url
    const apiQueryString = _paramKeySort(requestArgs.query)
    if (!cachePool[apiName]) cachePool[apiName] = {}
    let lastCacheDataSlice = cachePool[apiName][apiQueryString]
    if (lastCacheDataSlice) {
      if (callback && typeof callback === 'function') {
        // console.log("刷新缓存回调执行",apiName,callback);
        setTimeout(() => {
          callback(result)
        }, 0)
      }
      delete lastCacheDataSlice[config.enumMgr.API_CACHE_CALLBACK_NAME]
    } else {
      lastCacheDataSlice = {}
    }
    lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_UPDATETIME] = Date.now()
    lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_LIFECRICLE] =
      Date.now() + parseInt(cachedTime)
    lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_DATA] = result
    cachePool[apiName][apiQueryString] = lastCacheDataSlice
  }

  const getApiMemCache = (requestArgs: any) => {
    const cachedTime = requestArgs.cacheTime
    const { forceUpdateCache } = requestArgs
    const STATUS = {
      CLOSE: 0,
      NULL: -1,
      TIMEOUT: -2,
      SUCCESS: 1
    }
    const _this = this
    return new Promise((resolve) => {
      if (!cachedTime && !forceUpdateCache) {
        resolve({ status: STATUS.CLOSE, data: null })
        return
      }
      const cachePool = apiMemCachePool.value
      const apiName = requestArgs.url
      const apiQueryString = _paramKeySort(requestArgs.query)
      let cacheData = null
      if (cachePool[apiName] && cachePool[apiName][apiQueryString]) {
        cacheData = cachePool[apiName][apiQueryString]
      }
      if (!cacheData) {
        global.printDebugLog(
          `接口${apiName} queryString ${apiQueryString} 缓存为空`
        )
        resolve({ status: STATUS.NULL, data: null })
        return
      }

      const timeNow = Date.now()
      const lastVaildTime =
        cacheData[API_CACHED_STRINGS.SAVE_DATA_KEY_LIFECRICLE]
      if (timeNow > lastVaildTime && !forceUpdateCache) {
        global.printDebugLog(
          `接口缓存失效 ${apiName}`,
          1,
          lastVaildTime,
          timeNow,
          cachedTime
        )
        resolve({ status: STATUS.TIMEOUT, data: null })
        return
      }
      resolve({
        status: STATUS.SUCCESS,
        fromForceUpdateCache: forceUpdateCache,
        data: cacheData[API_CACHED_STRINGS.SAVE_DATA_KEY_DATA]
      })
    })
  }

  const clearApiCacheDataAfterCbCallBack = (requestArgs: any) => {
    const cachePool = apiMemCachePool.value
    const apiName = requestArgs.url
    const apiCache = cachePool[apiName]
    if (apiCache) {
      for (const pramsStr in apiCache) {
        const saveData = apiCache[pramsStr]
        if (
          !saveData ||
          !saveData.data ||
          !saveData.data[config.enumMgr.API_CACHE_CALLBACK_NAME]
        )
          continue
        delete saveData.data[config.enumMgr.API_CACHE_CALLBACK_NAME]
      }
    }
  }

  return {
    pathPreloadedMap,
    willShowFeedBackDetail,
    pageLotteriesAdvers,
    pageSetAvatarBuilds,
    apiEnterGameDetails,
    apiMemCachePool,
    apiCountMap,
    MEM_WILL_SHOW_FEED_BACK_DETAIL,
    LOTTERIES_ADVERMSG,
    GET_API_CACHE,
    bindWillShowFeedBackDetailInfo,
    preloadPageByPath,
    preloadPagesByPathsQueue,
    preloadPagesByPaths,
    updateCacheStore,
    bindEnterGameDetaildMesssage,
    doCountApiAndClearCacheAfterClear,
    bindApiMemCache,
    getApiMemCache,
    clearApiCacheDataAfterCbCallBack
  }
})
export default useMemObStore
