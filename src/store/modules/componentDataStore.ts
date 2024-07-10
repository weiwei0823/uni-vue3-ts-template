export const useComponentsDataStore = defineStore('componentsData', () => {
  const uiGlobalLoading = ref(false)
  const uiGlobalLogindgText = ref('加载中')
  const SWITCH_LOADING = (bool: any) => {
    if (bool) {
      uiGlobalLoading.value = true
    } else {
      uiGlobalLoading.value = false
      uiGlobalLogindgText.value = ''
    }
  }
  const SWITCH_LOADING_TEXT = (text: any) => {
    uiGlobalLogindgText.value = text
  }
  return {
    uiGlobalLoading,
    uiGlobalLogindgText,
    SWITCH_LOADING,
    SWITCH_LOADING_TEXT
  }
})
export default useComponentsDataStore
