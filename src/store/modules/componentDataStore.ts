import { defineStore } from 'pinia'

const ComponentsDataStore = defineStore('ComponentsDataStore', {
  state: {
    uiGlobalLoading: false,
    uiGlobalLogindgText: '加载中'
  },

  getters: {
    uiGlobalLoading: (state) => state.uiGlobalLoading,
    uiGlobalLogindgText: (state) => state.uiGlobalLogindgText
  },

  mutations: {
    SWITCH_LOADING(state, bool) {
      if (bool) {
        state.uiGlobalLoading = true
      } else {
        state.uiGlobalLoading = false
        state.uiGlobalLogindgText = null
      }
    },
    SWITCH_LOADING_TEXT(state, text) {
      state.uiGlobalLogindgText = text
    }
  }
})

export default ComponentsDataStore
