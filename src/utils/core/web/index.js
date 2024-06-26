import { config } from '@/config/config'
import $store from '@/store/index'

/**
 * 初始化dom元素功能
 */
export default {
  init() {},
  /**
   * 配置文件初始化或者刷新完之后调用
   */
  updateDomAfterConfigFresh() {
    this.writeStationIcoMsgLink()
    this.openPointerBreaks()
  },
  /**
   * 更新浏览器图标
   */
  writeStationIcoMsgLink() {
    const statioIcoContantsKey = config.enumMgr.CONTANTS_CONFIGS_ID.STATION_LOGO
    const icoMsg =
      $store.state.appInfoStore.contantsConfigTypeMap[statioIcoContantsKey]
    if (!icoMsg || !icoMsg.url) {
      console.warn(`CONTATNS ${statioIcoContantsKey} is null. `)
      return
    }
    const iconUrl = icoMsg.url
    // <link rel="shortcut icon" href="/static/ico.png" type="image/x-icon">
    const s = document.getElementsByTagName('script')[0]

    var hm = document.createElement('link')
    hm.href = `${iconUrl}`
    hm.async = true
    hm.rel = 'shortcut ico'
    hm.type = 'image/x-icon'
    s.parentNode.insertBefore(hm, s)

    var hm = document.createElement('link')
    hm.href = `${iconUrl}`
    hm.async = true
    hm.rel = 'icon'
    hm.type = 'image/x-icon'
    s.parentNode.insertBefore(hm, s)

    var hm = document.createElement('link')
    hm.href = `${iconUrl}`
    hm.async = true
    hm.rel = 'apple-touch-icon-precomposed'
    hm.type = 'image/x-icon'
    s.parentNode.insertBefore(hm, s)
  },

  /**
   * debugger 调试窗口打断 基本防御实现
   */
  openPointerBreaks() {
    const ctrl = getQueryString('closePointer')
    if (!config.isDebug || ctrl) return console.warn('pointer close')
    const script = document.createElement('script')
    // script.textContent = " setInterval(() => {debugger;}, 50);";
    document.body.appendChild(script)
  }
}
