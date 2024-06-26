import { defineStore } from 'pinia'

const playingStore = defineStore('playingStore', {
  state: {
    orderList: [], //
    onlineNum: 0,
    inLotteryId: -1,
    inLotteryInfo: -1,
    inLotteryRebateInfosMap: {},
    inLotteryUserRabetaNum: 0,
    isHideUserRebetaNum: false
  },
  getters: {
    orderList: (state) => state.orderList,
    onlineNum: (state) => state.onlineNum,

    lotteryRabetaInfo(state) {
      return state.inLotteryRebateInfosMap[state.inLotteryId]
    },
    inLotteryUserRabetaNum: (state) => state.inLotteryUserRabetaNum,
    isHideUserRebetaNum: (state) => state.isHideUserRebetaNum
  },
  mutations: {
    SET_ORDER_LIST: (state, obj) => (state.orderList = obj),
    SET_TEMA_LIST: (state, obj) => (state.orderList.tema = obj),
    SET_LIANMA_LIST: (state, obj) => (state.orderList.lianma = obj),
    SET_ONLINE_NUM: (state, obj) => (state.onlineNum = obj),
    SET_LOTTERY_IN_ID: (state, id) => (state.inLotteryId = id),
    SET_ISHIDEUSERREBETANUM: (state, isHide) =>
      (state.isHideUserRebetaNum = isHide)
  },
  actions: {
    setOrderList: ({ commit }, obj) => commit('SET_ORDER_LIST', obj),
    setTemaList: ({ commit }, obj) => commit('SET_TEMA_LIST', obj),
    setLianmaList: ({ commit }, obj) => commit('SET_LIANMA_LIST', obj),
    setOnlineNum: ({ commit }, obj) => commit('SET_ONLINE_NUM', obj),
    setLotteryRebateInfos: ({ state }, { id, rabateInfo }) => {
      state.inLotteryRebateInfosMap[id] = rabateInfo
      state.inLotteryRebateInfosMap = {
        ...state.inLotteryRebateInfosMap
      }
    },
    /**
     * 更新用户有返点数 预留id 避免后续按游戏类型记录数据更新
     * @param state
     * @param id
     * @param num
     */
    setLotteryUserRebateMum: ({ state }, { id, num }) => {
      state.inLotteryUserRabetaNum = num
    }
  }
})

export default playingStore
