import { defineStore } from 'pinia'
import { config } from '@/config/config'

// const LOCAL_STORE_KEYS={
//     KEY_IN_LOTTERY_NAME:"inLotteryName"
// }
const useLotteryStore = defineStore('Lottery', {
  state: () => ({
    // 当前所在彩票游戏Id
    inLotteryId: -1,
    // 上次获取lotteryHeaderInfo
    inLotteryHeaderInfo: null,
    // 上次获取最新回合信息时间戳
    inLotteryHeaderInfoGetTimestamp: -1,
    inLotteryGameName: '',
    // 彩票信息缓存列表
    lotteryMapIdToInfo: {},
    // 彩票左侧菜单缓存内容
    lotteryMenuInfo: []
  }),
  actions: {
    SET_LOTTERY_STORE_LOTTERY_ID(lotteryId) {
      this.inLotteryId = lotteryId
    },
    SET_LOTTERY_STORE_LOTTERY_HEADER_INFO(lotteryInfo) {
      this.inLotteryHeaderInfo = lotteryInfo
      this.inLotteryHeaderInfoGetTimestamp = Date.now()
    },
    SET_LOTTERY_STORE_LOTTERY_GAME_NAME(lotteryName) {
      this.inLotteryGameName = lotteryName
      config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_IN_LOTTERY_NAME,
          lotteryName
      )
    },
    updateLotteryStoreAfterApiCategoryData(result) {
      const map = {}
      result.forEach((item) => {
        item.lotteries.forEach((lottery) => {
          map[lottery.lotteryId] = lottery
        })
      })
      // 写入名称 避免清楚localstore再从游戏页刷新 名称信息丢失
      if (map[this.inLotteryId]) {
        const { name } = map[this.inLotteryId]
        name && this.SET_LOTTERY_STORE_LOTTERY_GAME_NAME(name)
      }
      this.lotteryMapIdToInfo = map
      this.lotteryMenuInfo = result
    },

    // app启动调用 将localStore内容写入store中 避免在页面中onShow里去频繁初始化
    async initLotteryStore() {
      const tempValue = config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_IN_LOTTERY_NAME
      )
      tempValue && this.SET_LOTTERY_STORE_LOTTERY_GAME_NAME(tempValue)
    }
  }
})

export default useLotteryStore
