const tabDataStore = {
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
}
