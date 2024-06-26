// import liuheSelector from "./LiuheTemplateSelector.js";
// import airshipSelector from "./AirshipTemplateSelector.js";
// import kuaisanSelector from "./KuaisanTemplateSelector.js";
// import eleventoutfiveSelector from "./ElevenOutOfFiveSelector.js";
// import shishicaiSelector from "./ShishicaiTemplateSelector.js";
// import luckytwentySelector from "./LuckyTwentyTemplateSelector.js";
// import pceggSelector from "./PcEggTemplateSelector.js";
// import luckyfarmSelector from "./LuckyFarmTemplateSelector.js";
// import arrangementThreeSelector from "./arrangementThreeSelector.js"
import { config } from '../config.js'
import $store from '@/store/index.js'

/**
 * 按照游戏id查找彩票玩法简易模板信息
 * 不要在单独彩票中引用：避免单页面加载引入JS过大 彩票页面中单独引入上分单独JS 提高加载效率
 */
export default {
  memMap: {},

  dataMap: {},

  dbFromId: {},

  db: null,

  // 废弃
  // getMiniplayTemplate(lotteryId) {
  //     let typeId = config.configLotties.getLotteryTypeByLotteryId(lotteryId);
  //     let selectors = [liuheSelector, airshipSelector, kuaisanSelector, eleventoutfiveSelector, shishicaiSelector, luckytwentySelector, pceggSelector, luckyfarmSelector, arrangementThreeSelector];
  //     let selector = null;
  //     if (this.memMap[typeId]) selector = this.memMap[typeId];
  //     else {
  //         for (let i in selectors) {
  //             let _s = selectors[i];
  //             if (_s.lotteryTypeId == typeId) {
  //                 selector = _s;
  //                 this.memMap[typeId] = _s;
  //                 break;
  //             }
  //         }
  //     }
  //     if (!selector) throw new Error("lotteryId 获取templateSelector对象失败")
  //     return selector.getMemeLotteryByLotteryId(lotteryId);
  // },
  /**
   * APP启动初始化
   */
  init() {
    const _this = this
    try {
      // 论坛站点不做任何玩法相关初始化
      if (config.station === config.enumMgr.STATION.LUNTAN) return
      const request = window.indexedDB.open('mk')
      request.onupgradeneeded = function (event) {
        const db = event.target.result
        const objectStore = db.createObjectStore('lotteryPlays', {
          keyPath: 'id'
        })
        objectStore.createIndex('playList', 'playList', { unique: false })
        objectStore.createIndex('updateTime', 'updateTime', { unique: false })
      }
      request.onsuccess = function (event) {
        _this.db = event.target.result
        _this.readLotteiesPlayFromDb()
      }
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 尝试保存玩法list到本地indexDb
   * @param id
   * @param playList
   */
  saveLotteryMiniPlay(id, playList) {
    if (!this.db) {
      console.error('indexDb faild')
      return
    }
    const request = this.db
      .transaction(['lotteryPlays'], 'readwrite')
      .objectStore('lotteryPlays')
      .put({
        id: Number(id),
        playList: JSON.stringify(playList),
        updateTime: Date.now()
      })
    request.onsuccess = function (event) {}
  },
  /**
   * 从indexDb中读取内容
   */
  readLotteiesPlayFromDb() {
    if (!this.db) {
      console.error('indexDb faild')
      return
    }
    const _this = this
    const configId = config.configLotties.lotteryTypeIncludeIdsMap
    for (const lotteryType in configId) {
      const ids = configId[lotteryType]
      ids.map((id) => {
        const r = _this.db
          .transaction(['lotteryPlays'], 'readwrite')
          .objectStore('lotteryPlays')
          .get(Number(id))
        r.onsuccess = function (event) {
          if (event.target.result) {
            try {
              const memMap = JSON.parse(event.target.result.playList)
              _this.dataMap[id] = memMap
              _this.dbFromId[id] = Date.now()
              printDebugLog(`playList 缓存=${id} 更新`)
            } catch (e) {
              console.error(e)
            }
          }
        }
      })
    }
  },

  /**
   * 获取玩法简易模板文件接口
   * @param lotteryId
   * @returns {Promise}
   */
  getMemeLotteryByLotteryId(lotteryId) {
    const _this = this
    const contantsConfigMaps = $store.state.appInfoStore.contantsConfigTypeMap
    const url = contantsConfigMaps[config.enumMgr.CONTANTS_CONFIGS_ID.IMAGE_URL]
    const projectVersion =
      contantsConfigMaps[config.enumMgr.CONTANTS_CONFIGS_ID.PROJECT_VERSION]
    return new Promise((resolve) => {
      if (!url) {
        console.error(
          ` 常量配置中[${config.enumMgr.CONTANTS_CONFIGS_ID.IMAGE_URL}]缺失`
        )
        resolve(null)
      } else if (!projectVersion) {
        console.error(
          ` 常量配置中[${config.enumMgr.CONTANTS_CONFIGS_ID.PROJECT_VERSION}]缺失`
        )
        resolve(null)
      } else {
        const wholeUrl = `${
          url.url
        }${projectVersion.url.toLowerCase()}/json/play_${lotteryId}.json`
        if (this.dataMap[lotteryId]) {
          resolve(this.dataMap[lotteryId])
        }
        uni.request({
          url: wholeUrl,
          success: (res) => {
            if (res.statusCode == 200) {
              const { result } = res.data
              const resultCode = decryptResult(result)
              this.dataMap[lotteryId] = resultCode
              resolve(resultCode)
              _this.saveLotteryMiniPlay(lotteryId, resultCode)
            } else {
              resolve(null)
            }
          },
          faild: (err) => {
            resolve(null)
          }
        })
      }
    })
  }
}
