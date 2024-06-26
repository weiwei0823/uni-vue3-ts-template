/**
 * document 助手
 * @type {{}|*}
 * @private
 */
const _g = global

/**
 * 判断document中是否包含 ID 未 elementId 元素
 * @param elementId
 * @returns {HTMLElement}
 */
_g.documentExistElementById = function (elementId) {
  // #ifdef H5
  return document.getElementById(elementId)
  // #endif
  // 预留扩展可能出现的其它打包类型无document配置可能
  return false
}
/**
 * 获取参数集合
 * @param url
 * @returns {{}}
 */
_g.getUrlParams = function (url = window.location.href) {
  const queryString = url.split('?')[1]
  const params = {}
  if (queryString) {
    const keyValuePairs = queryString.split('&')
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      params[key] = decodeURIComponent(value || '')
    })
  }

  return params
}

/**
 * 获取网页地址参数
 * @param name
 * @returns {null|string}
 */
_g.getQueryString = function (name) {
  const params = getUrlParams()
  return params[name] || null
}
