export const useTabDataStore = defineStore('tabData', () => {
  const historyData = ref([])
  const collectList = ref([])
  const categoryData = ref([])
  const setCollectList = (data: any) => {
    collectList.value = data
  }
  const setCategoryData = (data: any) => {
    categoryData.value = data
  }
  const setHistoryData = (data: any) => {
    historyData.value = data
  }
  return {
    historyData,
    collectList,
    categoryData,
    setHistoryData,
    setCollectList,
    setCategoryData
  }
})

export default useTabDataStore
