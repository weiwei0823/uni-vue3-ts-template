import { defineStore } from 'pinia'

const useTabDataStore = defineStore('tabData', {
  state: () => ({
    historyData: [],
    collectList: [],
    categoryData: []
  }),
  actions: {
    setCollectList(data) {
      this.collectList = data
    },
    setCategoryData(data) {
      this.categoryData = data
    },
    setHistoryData(data) {
      this.historyData = data
    }
  }
})

export default useTabDataStore
