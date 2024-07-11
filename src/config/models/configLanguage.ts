import VueI18n from 'vue-i18n'
import enumConfig from './configEnum'
import en from '../../locale/en.json'
import pt from '../../locale/pt.json'
import zhHans from '../../locale/zh-Hans.json'
import zhHant from '../../locale/zh-Hant.json'
import { config } from '@/config/config'

export default {
  default: 'zh-Hans',
  _ins: null,
  languageList: {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    pt
  },

  languageSelect: [
    {
      id: 1,
      value: 'zh-Hans',
      name: '简体中文',
      navigatorStr: 'zh-CN'
    },
    {
      id: 2,
      value: 'zh-Hant',
      name: '繁体中文',
      navigatorStr: 'zh-TW'
    },
    {
      id: 3,
      value: 'en',
      name: 'English',
      navigatorStr: 'en'
    },
    {
      id: 4,
      value: 'pt',
      name: 'Português',
      navigatorStr: 'pt'
    },
    {
      id: 5,
      value: 'pt',
      name: 'Português',
      navigatorStr: 'pt'
    }
  ],
  init(Vue) {
    Vue.use(VueI18n)
    const i18n = new VueI18n({
      locale: uni.getLocale(),
      messages: this.loadLocaleMessages()
    })

    this._ins = i18n
    Vue.prototype.$formartLocaleString = this.formartLocaleString.bind(this)
    return i18n
  },
  loadLocaleMessages() {
    console.log(require.context, "aaaaaa")
    const locales = require.context(
      '@/locale',
      true,
      /[A-Za-z0-9-_,\s]+\/import\.js$/i
    )
    const messages = {}
    locales.keys().forEach((key) => {
      messages[key.replace('./', '').replace('/import.js', '')] =
        locales(key).default
    })
    return messages
  },
  setLocalLanguage(userDefaultLanguageValue) {
    let defaultKey = uni.getStorageSync(
      enumConfig.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE
    )
    if (!defaultKey) {
      defaultKey = userDefaultLanguageValue
      // uni.setStorageSync(enumConfig.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE, defaultKey);
    }
    const strLang = this.languageSelect.find(
      (item) => item.id == defaultKey
    ).value
    uni.setLocale(strLang)
  },
  // 获取环境设备语言
  getEnvLocal(configWebsite) {
    // configWebsite.all_luntan_language_auto = 0
    // configWebsite.lluntan_language_auto = 0
    // configWebsite.liuhe_language_auto = 0
    // configWebsite.all_luntan_language_auto = 1
    // configWebsite.lluntan_language_auto = 1
    // configWebsite.liuhe_language_auto = 1
    switch (config.station) {
      case config.enumMgr.STATION.ALL:
        if (configWebsite.all_luntan_language_auto === 1)
          return this.formatterEnvLocal()
        break
      case config.enumMgr.STATION.LUNTAN:
        if (configWebsite.lluntan_language_auto === 1)
          return this.formatterEnvLocal()
        break
      case config.enumMgr.STATION.LIUHE:
        if (configWebsite.liuhe_language_auto === 1)
          return this.formatterEnvLocal()
        break
    }
  },
  formatterEnvLocal() {
    const _this = this
    const res = uni.getSystemInfoSync()
    const lang = _this.languageSelect.find(
      (item) => item.navigatorStr == res.language
    )
    return lang?.id || 2
  },
  setDefalutLocalLanguage() {
    const configWebsite = config.getStorageSync(
      config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_WEBSITECONFIG
    )
    let defaultKey = null
    // 新逻辑，先判断环境
    defaultKey = this.getEnvLocal(configWebsite)
    uni.setStorageSync('isEnvLanguage', !!defaultKey)
    if (!config.isForceServerLanguage && !defaultKey) {
      const setKey = uni.getStorageSync(
        enumConfig.APP_LOCALSTORE_KEYS.LANGUAGE_SET_VALUE
      )
      if (setKey) {
        uni.setLocale(setKey)
        return
      }
    }
    if (!defaultKey) {
      defaultKey = configWebsite.language_setting
    }
    let languageConfig = this.languageSelect.find(
      (item) => item.id === defaultKey
    )
    if (!languageConfig) {
      console.error(
        `respose language_settting= ${defaultKey} but language list undefined this id`
      )
      languageConfig = this.languageSelect[0]
    }
    const strLang = languageConfig.value
    if (uni.getLocale() !== strLang) {
      // uni.setLocale实时生效
      uni.setLocale(strLang)
    }
  },
  formartLocaleString(key, ...args) {
    if (!this._ins) return ''
    let localeString = this._ins._vm.$t(key)
    for (let index = 0; index < args.length; index++) {
      const selector = `[#${index}]`
      localeString = localeString.replaceAll(selector, args[index])
    }
    return localeString
  }
}
