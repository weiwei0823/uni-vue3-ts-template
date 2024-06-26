import { defineStore } from 'pinia'

const tabDataStore = defineStore('tabData', {
  state: {
    historyData: [],
    collectList: [],
    categoryData: []
  },
  mutations: {
    setCollectList(state, data) {
      state.collectList = data
    },
    setCategoryData(state, data) {
      state.categoryData = data
    },
    setHistoryData(state, data) {
      state.historyData = data
    }
  }
})

export default tabDataStore
