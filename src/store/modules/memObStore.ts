import { defineStore } from 'pinia'
import { paramKeySort } from '@/utils/common.ts'
import { config } from '@/config/config'
import requestCache from '@/utils/requestCache/requestCache'

const API_CACHED_STRINGS = {
  SAVE_DATA_KEY_UPDATETIME: 'updateTime',
  SAVE_DATA_KEY_LIFECRICLE: 'lifeCricle',
  SAVE_DATA_KEY_DATA: 'data'
}

const _paramKeySort = (query) => {
  return `query_${paramKeySort(query)}`
}

const MemObStore = defineStore('MemOb', {
  state: {
    pathPreloadedMap: {},
    willShowFeedBackDetail: null,
    // 彩种打开弹出广告层内容缓存
    pageLotteriesAdvers: null,

    pageSetAvatarBuilds: null,

    apiEnterGameDetails: null,

    apiMemCachePool: {},

    apiCountMap: {}
  },
  getters: {
    MEM_WILL_SHOW_FEED_BACK_DETAIL: (state) => state.willShowFeedBackDetail,
    LOTTERIES_ADVERMSG: (state) => state.pageLotteriesAdvers,

    GET_API_CACHE(args) {
      console.log(args)
      return 0
    }
  },
  mutations: {
    bindWillShowFeedBackDetailInfo(state, detailInfo) {
      state.willShowFeedBackDetail = detailInfo
    }
  },
  actions: {
    /**
     *  检测某个账号是否加载过
     * @param commit
     * @param dispatch
     * @returns {Promise<Promise<*> | Promise>}
     */
    async preloadPageByPath({ commit, dispatch, state }, path) {
      const _that = this
      return new Promise((resolve, reject) => {
        if (state.pathPreloadedMap[path]) {
          return resolve(true)
        }
        uni.preloadPage({
          url: path,
          success: () => {
            state.pathPreloadedMap[path] = true
            resolve(true)
          },
          fail: () => {
            resolve(false)
          }
        })
      })
    },

    /**
     * 使用队列形式加载paths 预防加载进程过大卡顿掉帧
     * @param commit
     * @param dispatch
     * @param state
     * @param paths
     * @returns {Promise<void>}
     */
    async preloadPagesByPathsQueue({ commit, dispatch, state }, paths) {
      while (paths.length > 0) {
        await dispatch('preloadPageByPath', paths.pop())
      }
    },
    /**
     * 加载paths
     * @param commit
     * @param dispatch
     * @param state
     * @param paths
     * @returns {Promise<void>}
     */
    async preloadPagesByPaths({ commit, dispatch, state }, paths) {
      while (paths.length > 0) {
        dispatch('preloadPageByPath', paths.pop())
      }
    },

    updateCacheStore({ commit, dispatch, state }, { key, info }) {
      const { syncTime, cacheTime, data } = info
      const saveInfo = {
        syncTime: syncTime || 0,
        cacheTime: cacheTime || 0,
        data
      }
      if (state.hasOwnProperty(key)) state[key] = saveInfo
    },

    bindEnterGameDetaildMesssage({ commit, dispatch, state }, resp) {
      state.apiEnterGameDetails = resp
    },

    doCountApiAndClearCacheAfterClear(
      { commit, dispatch, state },
      requestArgs
    ) {
      const apiName = requestArgs.url
      if (!apiName) {
        console.warn(`${apiName} faild`)
      }
      const oldNum = state.apiCountMap[apiName] || 0
      state.apiCountMap[apiName] = oldNum + 1
      // ApiCache 接口触发后 需要清理其它接口缓存配置 避免数据更新不更新的配置
      const afterClearApis = requestCache.getApiClearCachePointMap()
      const needClearCacehApis = afterClearApis[apiName]
      if (needClearCacehApis && Array.isArray(needClearCacehApis)) {
        needClearCacehApis.forEach((needClearApi) => {
          printDebugLog(`缓存清理${needClearApi}`)
          delete state.apiMemCachePool[needClearApi]
        })
      }
    },

    bindApiMemCache(
      { commit, dispatch, state },
      { requestArgs, result, callback }
    ) {
      const cachedTime = requestArgs.cacheTime
      const { forceUpdateCache } = requestArgs
      if (!cachedTime && !forceUpdateCache) return

      const cachePool = state.apiMemCachePool
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
      lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_UPDATETIME] =
        Date.now()
      lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_LIFECRICLE] =
        Date.now() + parseInt(cachedTime)
      lastCacheDataSlice[API_CACHED_STRINGS.SAVE_DATA_KEY_DATA] = result
      cachePool[apiName][apiQueryString] = lastCacheDataSlice
    },

    getApiMemCache({ commit, dispatch, state }, requestArgs) {
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
        const cachePool = state.apiMemCachePool
        const apiName = requestArgs.url
        const apiQueryString = _paramKeySort(requestArgs.query)
        let cacheData = null
        if (cachePool[apiName] && cachePool[apiName][apiQueryString]) {
          cacheData = cachePool[apiName][apiQueryString]
        }
        if (!cacheData) {
          printDebugLog(`接口${apiName} queryString ${apiQueryString} 缓存为空`)
          resolve({ status: STATUS.NULL, data: null })
          return
        }

        const timeNow = Date.now()
        const lastVaildTime =
          cacheData[API_CACHED_STRINGS.SAVE_DATA_KEY_LIFECRICLE]
        if (timeNow > lastVaildTime && !forceUpdateCache) {
          printDebugLog(
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
    },

    clearApiCacheDataAfterCbCallBack({ commit, dispatch, state }, requestArgs) {
      const cachePool = state.apiMemCachePool
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
  }
})

export default MemObStore
