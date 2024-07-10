import { cp_init, lt_init } from '@/utils/home/index.js'
import { listLatest } from '@/utils/forum/index.js'

export const usePreloadDataStore = defineStore('preloadData', () => {
  const liuhePreload = reactive({
    isGettingData: false,
    homeInit: null
  })
  const luntanPreload = reactive({
    isGettingData: false,
    homeInit: null
  })

  // 获取购彩大厅tab数据
  const getLiuheHomeTab = async () => {
    const res = await cp_init()
    // 需要做数据深度复制
    uni.$emit('preloadLiuheHomeData', JSON.parse(JSON.stringify(res)))
  }
  // 获取论坛首页数据
  const getLuntanHomeTab = async () => {
    const prams = {
      lotteryType: 2
    }
    const res = await lt_init(prams)
    // 需要做数据深度复制
    uni.$emit('preloadLuntanHomeData', JSON.parse(JSON.stringify(res)))
  }

  // 获取论坛01首页下方高手论坛列表
  const getLuntanArticleList = async () => {
    const prams = {
      lotteryType: 2,
      type: 3,
      sort: 0,
      speak: 0,
      pageNum: 1,
      pageSize: 60
    }
    const res = await listLatest(prams)
    // 需要做数据深度复制
    uni.$emit('preloadLuntanArticleList', JSON.parse(JSON.stringify(res)))
  }
  return {
    liuhePreload,
    luntanPreload,
    getLiuheHomeTab,
    getLuntanHomeTab,
    getLuntanArticleList
  }
})

export default usePreloadDataStore
