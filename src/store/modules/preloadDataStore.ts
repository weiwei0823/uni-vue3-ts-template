import { defineStore } from 'pinia'
import { cp_init, lt_init } from '@/utils/home/index.js'
import { listLatest } from '@/utils/forum/index.js'

const preloadDataStore = defineStore('preloadDataStore', {
  namespaced: true,
  state: {
    liuhePreload: {
      isGettingData: false,
      homeInit: null
    },
    luntanPreload: {
      isGettingData: false,
      homeInit: null
    }
  },
  mutations: {},
  actions: {
    // 获取购彩大厅tab数据
    async getLiuheHomeTab(context) {
      const res = await cp_init()
      // 需要做数据深度复制
      uni.$emit('preloadLiuheHomeData', JSON.parse(JSON.stringify(res)))
    },
    // 获取论坛首页数据
    async getLuntanHomeTab(context) {
      const prams = {
        lotteryType: 2
      }
      const res = await lt_init(prams)
      // 需要做数据深度复制
      uni.$emit('preloadLuntanHomeData', JSON.parse(JSON.stringify(res)))
    },

    // 获取论坛01首页下方高手论坛列表
    async getLuntanArticleList(context) {
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
  }
})
export default preloadDataStore
