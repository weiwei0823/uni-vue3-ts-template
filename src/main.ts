import { createSSRApp } from 'vue'
import uView from 'vk-uview-ui'
import 'uno.css' // unocss
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import store, { registerStore, useComponentsDataStore } from '@/store/index'
import localdata from '@/utils/localdata/index.js'
import routerUtils from '@/utils/routerUtils.js'
import nativeBridge from '@/utils/nativeBridge.js'
import dataFormartter from '@/utils/dataFormartter.js'
import utlilCommons from '@/utils/common'
import requestCache from '@/utils/requestCache/requestCache.js'
import { config } from '@/config/config'
import configLanguage from '@/config/models/configLanguage.js'
import avatarBox from '@/components/avatarbox/AvatarBox.vue'
import newLoading from '@/components/Loading/index.vue'
import filterIcon from '@/components/common/filterIcon/index.vue'
import LuntanLoading from '@/components/common/loading/LuntanLoading.vue'
import spanBox from '@/components/common/lottery/SpanBox.vue'

import '@/utils/noScale.js'
import '@/utils/globalFun.js'

// 是否显示加载中 的方法 调用store中的mutations方法
export function loading(bool: any, text: any) {
  const componentsDataStore = useComponentsDataStore()
  if (bool) {
    !!text && componentsDataStore.SWITCH_LOADING_TEXT(text)
    componentsDataStore.SWITCH_LOADING(!!bool)
  } else {
    componentsDataStore.SWITCH_LOADING(!!bool)
  }
}

export function createApp() {
  const app = createSSRApp(App)
  registerStore(app)
  app.use(uView)
  const i18n = createI18n({
    globalInjection: true, // 全局使用$t方法
    allowComposition: true,
    legacy: false,
    locale: uni.getLocale(),
    // todo 该方法使用import.meta.glob批量导入，导致很慢，待优化
    messages: configLanguage.loadLocaleMessages()
  })
  app.use(i18n)
  /**
   * 注册组件
   */
  app.component('filterIcon', filterIcon)
  app.component('LuntanLoading', LuntanLoading)
  app.component('AvatarBox', avatarBox)
  app.component('spanBox', spanBox)
  app.component('newLoading', newLoading)
  /**
   * 新增全局属性
   */
  app.config.globalProperties.$store = store
  app.config.globalProperties.$localdb = localdata
  app.config.globalProperties.$config = config
  app.config.globalProperties.$routerUtils = routerUtils
  app.config.globalProperties.$utlilCommons = utlilCommons
  app.config.globalProperties.$nativeBridge = nativeBridge
  app.config.globalProperties.$dataFormartter = dataFormartter
  app.config.globalProperties.$requestCache = requestCache
  app.config.globalProperties.$loading = loading
  app.config.globalProperties.$t = i18n.global.t
  app.config.globalProperties._i18n = i18n
  app.config.globalProperties.$formartLocaleString =
    configLanguage.formartLocaleString.bind(this)

  return {
    app
  }
}
