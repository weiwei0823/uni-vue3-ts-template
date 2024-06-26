import Vue from 'vue'
import Vuex from 'vuex'
import playingStore from './modules/playIngStore'
import websocketStore from './modules/websocketStore'
import appInfoStore from './modules/appInfoStore'
import memObStore from './modules/memObStore'
import lotteryStore from './modules/LotteryStore'
import systemInfo from './modules/systemInfoStore'
import componentsDataStore from './modules/componentDataStore'
import tabDataStore from './modules/tabDataStore.js'
import preloadDataStore from './modules/preloadDataStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    playingStore,
    websocketStore,
    appInfoStore,
    memObStore,
    lotteryStore,
    componentsDataStore,
    tabDataStore,
    systemInfo,
    preloadDataStore
  }
})

export default store
