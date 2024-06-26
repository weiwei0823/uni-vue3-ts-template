import { config } from '@/config/config.js'
import $store from '@/store/index.js'
// localstore 读取器
import localStoreFactory from './localstore/index.js'
// 预留其它数据读取器

export default {
  // 分割
  decollator: '.',

  type: {
    // 数据通过本地localstore存储
    localStore: 1,
    // 数据通过文件存储
    file: 2,
    // 数据通过api存储
    api: 3
  },
  /**
   * 获取当前缓存方式
   * @returns {*}
   */
  dataChannel() {
    const channel = config.localDataChannel
    if (!channel || !this.type[channel]) {
      return this.type.localStore
    }
    return this.type[channel]
  },

  // 读取器获取内容
  get(datakey) {
    const dataFactory = this.getDataFactoryByChannelId()
    if (!dataFactory) {
      return null
    }
    const keys = this.getScriptDir(datakey)
    return dataFactory.runGet(keys)
  },

  // 使用读取器存储内容
  set(datakey, value, checkcb = null) {
    const dataFactory = this.getDataFactoryByChannelId()
    const keys = this.getScriptDir(datakey)
    dataFactory.runSet(keys, value, checkcb)
  },
  /**
   * 预留后续网络读取异步阻塞
   * @param datakey
   * @param value
   * @returns {Promise<void>}
   */
  async getAsync(datakey) {},
  /**
   * 预留后续网络写入异步阻塞
   * @param datakey
   * @param value
   * @returns {Promise<void>}
   */
  async setAsync(datakey, value) {},

  /**
   * 切割指向符号
   * @param keyname
   * @returns {Array|*}
   */
  getScriptDir(keyname) {
    const split = keyname.split(this.decollator)
    if (!split) return []
    return split
  },

  getDataFactoryByChannelId() {
    const channel = this.dataChannel()
    let factory = null
    switch (channel) {
      case this.type.localStore:
        factory = localStoreFactory
        break
      default:
        factory = localStoreFactory
        break
    }
    if (!factory) {
    }
    return factory
  },
  /**
   * 创建获取数据函数返回数据结构
   * @param updateCache 是否刷新store
   * @param syncData 获取到的数据
   * @returns {{syncData: *, updateCache: *}}
   */
  buildSyncFunctionResult(updateCache, syncData) {
    return { updateCache, syncData }
  },

  /**
   * 检查对比缓存及返回接口数据
   * @param storeKey store中存储名称
   * @param syncFunction 获取数据函数
   * @param cacheDuration store有效周期 单位秒
   * @param printLog
   * @returns {Promise<Promise<*> | Promise>}
   */
  async getDataByApiOrStoreCache(
    storeKey,
    syncFunction,
    cacheDuration,
    printLog = false
  ) {
    return new Promise(async (reslove) => {
      const storeCache = $store.state.memObStore[storeKey]
      if (storeCache) {
        const { cacheTime, syncTime, data } = storeCache
        if (Date.now() - syncTime <= cacheTime * 1000) {
          reslove(data)
          return
        }
      }
      const syncResult = await syncFunction()
      const { updateCache, syncData } = syncResult
      if (updateCache) {
        const save = {
          cacheTime: cacheDuration,
          syncTime: Date.now(),
          data: syncData
        }
        $store.dispatch('updateCacheStore', { key: storeKey, info: save })
      }
      reslove(syncData)
    })
  }
}
