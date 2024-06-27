import { defineStore } from 'pinia'

const useComponentsDataStore = defineStore('ComponentsData', {
  state: () => ({
    uiGlobalLoading: false,
    uiGlobalLogindgText: '加载中'
  }),
  actions: {
    SWITCH_LOADING(bool) {
      if (bool) {
        this.uiGlobalLoading = true
      } else {
        this.uiGlobalLoading = false
        this.uiGlobalLogindgText = null
      }
    },
    SWITCH_LOADING_TEXT(text) {
      this.uiGlobalLogindgText = text
    }
  }
})

export default useComponentsDataStore
