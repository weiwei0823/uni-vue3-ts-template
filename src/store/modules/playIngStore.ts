export const usePlayingStore = defineStore('playing', () => {
  const orderList = ref({
    tema: null,
    lianma: null
  })
  const onlineNum = ref(0)
  const inLotteryId = ref(-1)
  const inLotteryInfo = ref(-1)
  const inLotteryRebateInfosMap = ref({})
  const inLotteryUserRabetaNum = ref(0)
  const isHideUserRebetaNum = ref(false)

  const lotteryRabetaInfo = computed(() => {
    return inLotteryRebateInfosMap.value[inLotteryId.value]
  })

  const SET_ORDER_LIST = (obj: any) => {
    orderList.value = obj
  }
  const SET_TEMA_LIST = (obj: any) => {
    orderList.value.tema = obj
  }
  const SET_LIANMA_LIST = (obj: any) => {
    orderList.value.lianma = obj
  }
  const SET_ONLINE_NUM = (obj: any) => {
    onlineNum.value = obj
  }
  const SET_LOTTERY_IN_ID = (id: any) => {
    inLotteryId.value = id
  }
  const SET_ISHIDEUSERREBETANUM = (isHide: any) => {
    isHideUserRebetaNum.value = isHide
  }
  const setOrderList = (obj: any) => {
    SET_ORDER_LIST(obj)
  }
  const setTemaList = (obj: any) => {
    SET_TEMA_LIST(obj)
  }
  const setLianmaList = (obj: any) => {
    SET_LIANMA_LIST(obj)
  }
  const setOnlineNum = (obj: any) => {
    SET_ONLINE_NUM(obj)
  }
  const setLotteryRebateInfos = (obj: any) => {
    inLotteryRebateInfosMap.value[obj?.id] = obj?.rabateInfo
    inLotteryRebateInfosMap.value = {
      ...inLotteryRebateInfosMap.value
    }
  }
  /**
   * 更新用户有返点数 预留id 避免后续按游戏类型记录数据更新
   */
  const setLotteryUserRebateMum = (obj: any) => {
    inLotteryUserRabetaNum.value = obj?.num
  }
  return {
    orderList,
    onlineNum,
    inLotteryId,
    inLotteryInfo,
    inLotteryRebateInfosMap,
    inLotteryUserRabetaNum,
    isHideUserRebetaNum,
    lotteryRabetaInfo,
    SET_ORDER_LIST,
    SET_TEMA_LIST,
    SET_LIANMA_LIST,
    SET_ONLINE_NUM,
    SET_LOTTERY_IN_ID,
    SET_ISHIDEUSERREBETANUM,
    setOrderList,
    setTemaList,
    setLianmaList,
    setOnlineNum,
    setLotteryRebateInfos,
    setLotteryUserRebateMum
  }
})
export default usePlayingStore
