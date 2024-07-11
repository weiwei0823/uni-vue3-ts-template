/**
 * 活动角标对应的文字内容输出
 * @param key
 * @returns {*}
 */
const formartActivityKeyToText = function (key) {
  const app = getApp()
  let text = ''
  switch (key) {
    case 'day':
      text = app.$t('pages.liuhe.activity.detail.Daily')
      break
    case 'month':
      text = '每月'
      break
    case 'sign':
      text = app.$t('pages.liuhe.activity.detail.SignIn')
      break

    case 'single':
      text = app.$t('pages.liuhe.activity.detail.SingleTime')
      break
    case 'yesterday':
      text = app.$t('pages.liuhe.activity.detail.Yesterday')
      break
    default:
      text = app.$t('pages.liuhe.activity.detail.Weekly')
      break
  }
  return text
}

const formartObjectToQueryString = function (obj, addFirstChar = '?') {
  let querys = ''
  if (!obj) return querys
  for (const k in obj) {
    querys = `${querys + (querys.length > 0 ? '&' : '')}${k}=${obj[k]}`
  }
  return addFirstChar + querys
}

/**
 * 数据格式化工具类
 * @type {{formartActivityKeyToText: (function(*): *)}}
 */
module.exports = {
  formartActivityKeyToText,
  formartObjectToQueryString
}
