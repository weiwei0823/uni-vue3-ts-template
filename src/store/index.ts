import playingStore from './modules/playIngStore'
import websocketStore from './modules/websocketStore'
import useAppInfoStore from './modules/appInfoStore'
import memObStore from './modules/memObStore'
import lotteryStore from './modules/LotteryStore'
import systemInfo from './modules/systemInfoStore'
import componentsDataStore from './modules/componentDataStore'
import tabDataStore from './modules/tabDataStore.js'
import preloadDataStore from './modules/preloadDataStore'

export default {
  /**
   * pinia默认使用'id+Store'的形式访问每个单独的store，所以store的id设置需要去除Store
   * */
  computed: {
    ...mapStores(
        playingStore,
        websocketStore,
        appInfoStore,
        memObStore,
        lotteryStore,
        componentsDataStore,
        tabDataStore,
        systemInfo,
        preloadDataStore
    )
  }
}
