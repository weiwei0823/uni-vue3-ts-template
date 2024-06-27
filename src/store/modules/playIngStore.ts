import { defineStore } from 'pinia'

const usePlayingStore = defineStore('playing', {
  state: () => ({
    orderList: [], //
    onlineNum: 0,
    inLotteryId: -1,
    inLotteryInfo: -1,
    inLotteryRebateInfosMap: {},
    inLotteryUserRabetaNum: 0,
    isHideUserRebetaNum: false
  }),
  getters: {
    lotteryRabetaInfo(state) {
      return this.inLotteryRebateInfosMap[this.inLotteryId]
    },
    inLotteryUserRabetaNum: (state) => this.inLotteryUserRabetaNum,
    isHideUserRebetaNum: (state) => this.isHideUserRebetaNum
  },
  actions: {
    SET_ORDER_LIST: (obj) => (this.orderList = obj),
    SET_TEMA_LIST: (obj) => (this.orderList.tema = obj),
    SET_LIANMA_LIST: (obj) => (this.orderList.lianma = obj),
    SET_ONLINE_NUM: (obj) => (this.onlineNum = obj),
    SET_LOTTERY_IN_ID: (id) => (this.inLotteryId = id),
    SET_ISHIDEUSERREBETANUM: (isHide) => (this.isHideUserRebetaNum = isHide),
    setOrderList: (obj) => this.SET_ORDER_LIST(obj),
    setTemaList: (obj) => this.SET_TEMA_LIST(obj),
    setLianmaList: (obj) => this.SET_LIANMA_LIST(obj),
    setOnlineNum: (obj) => this.SET_ONLINE_NUM(obj),
    setLotteryRebateInfos: ({ id, rabateInfo }) => {
      this.inLotteryRebateInfosMap[id] = rabateInfo
      this.inLotteryRebateInfosMap = {
        ...this.inLotteryRebateInfosMap
      }
    },
    /**
     * 更新用户有返点数 预留id 避免后续按游戏类型记录数据更新
     * @param state
     * @param id
     * @param num
     */
    setLotteryUserRebateMum: ({ id, num }) => {
      this.inLotteryUserRabetaNum = num
    }
  }
})

export default usePlayingStore
