import {config} from '@/config/config'

export const useLotteryStore = defineStore('lottery', () => {
  // 当前所在彩票游戏Id
  const inLotteryId = ref(-1);
  // 上次获取lotteryHeaderInfo
  const inLotteryHeaderInfo = ref(null)
  // 上次获取最新回合信息时间戳
  const inLotteryHeaderInfoGetTimestamp = ref(-1)
  const inLotteryGameName = ref('')
  // 彩票信息缓存列表
  const lotteryMapIdToInfo = ref({});
  // 彩票左侧菜单缓存内容
  const lotteryMenuInfo = ref([])

  const SET_LOTTERY_STORE_LOTTERY_ID = (value: any) => {
    inLotteryId.value = value
  }
  const SET_LOTTERY_STORE_LOTTERY_HEADER_INFO = (value: any) => {
    inLotteryHeaderInfo.value = value
    inLotteryHeaderInfoGetTimestamp.value = Date.now()
  }
  const SET_LOTTERY_STORE_LOTTERY_GAME_NAME = (lotteryName: any) => {
    inLotteryGameName.value = lotteryName
    config.setStorageSync(
      config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_IN_LOTTERY_NAME,
      lotteryName
    )
  }
  const updateLotteryStoreAfterApiCategoryData = (result: any) => {
    const map = {}
    result?.forEach((item: any) => {
      item.lotteries?.forEach((lottery: any) => {
        map[lottery.lotteryId] = lottery
      })
    })
    // 写入名称 避免清楚localstore再从游戏页刷新 名称信息丢失
    if (map[this.inLotteryId]) {
      const {name} = map[this.inLotteryId]
      name && SET_LOTTERY_STORE_LOTTERY_GAME_NAME(name)
    }
    lotteryMapIdToInfo.value = map
    lotteryMenuInfo.value = result
  }

  // app启动调用 将localStore内容写入store中 避免在页面中onShow里去频繁初始化
  const initLotteryStore = async () => {
    const tempValue = config.getStorageSync(
      config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_IN_LOTTERY_NAME
    )
    tempValue && SET_LOTTERY_STORE_LOTTERY_GAME_NAME(tempValue)
  }

  return {
    inLotteryId,
    inLotteryHeaderInfo,
    inLotteryHeaderInfoGetTimestamp,
    inLotteryGameName,
    lotteryMapIdToInfo,
    lotteryMenuInfo,
    SET_LOTTERY_STORE_LOTTERY_ID,
    SET_LOTTERY_STORE_LOTTERY_HEADER_INFO,
    SET_LOTTERY_STORE_LOTTERY_GAME_NAME,
    updateLotteryStoreAfterApiCategoryData,
    initLotteryStore
  }
})
export default useLotteryStore
