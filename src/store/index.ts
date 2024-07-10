import piniaPersist from 'pinia-plugin-persist-uni'
import { App } from 'vue'
import usePlayingStore from './modules/playIngStore'
import useWebsocketStore from './modules/websocketStore'
import useAppInfoStore from './modules/appInfoStore'
import useMemObStore from './modules/memObStore'
import useLotteryStore from './modules/LotteryStore'
import useSystemInfoStore from './modules/systemInfoStore'
import useComponentsDataStore from './modules/componentDataStore'
import useTabDataStore from './modules/tabDataStore.js'
import usePreloadDataStore from './modules/preloadDataStore'

const store = createPinia()

export function registerStore(app: App) {
  store.use(piniaPersist)
  app.use(store)
}

export {
  usePlayingStore,
  useWebsocketStore,
  useAppInfoStore,
  useMemObStore,
  useLotteryStore,
  useComponentsDataStore,
  useTabDataStore,
  useSystemInfoStore,
  usePreloadDataStore
}

export default store
