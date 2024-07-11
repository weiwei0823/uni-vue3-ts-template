import Vue from 'vue'
import { config } from '../config/config'
import CryptoJS from '@/utils/common/crypto-js'
import EncryptUtils from '@/utils/common/encryptUtils'
import $store from '@/store/index'
import { paramKeySort, deepEqual } from '@/utils/common'
import requestCacheMgr from '@/utils/requestCache/requestCache'

const apiTimestampDic = {}
let l = 0
let j = 1
// 请求的对象存储，用于防抖判断
const requestDebounceList = []

/**
 * 为了避免不同API 且都是空参数的情况下触发后端出现502的情况 前端做容错处理
 * @param params
 * @returns {number}
 */
export const getApiTimeStamp = function (params) {
  const { url } = params
  let timestamp = new Date().getTime()
  // 当前毫秒内是否被同API上锁
  if (
    !url ||
    !apiTimestampDic[timestamp] ||
    apiTimestampDic[timestamp] == url
  ) {
    apiTimestampDic[timestamp] = url
  } else {
    const lastTimestampApi = apiTimestampDic[timestamp]
    if (lastTimestampApi != url) {
      apiTimestampDic[timestamp] = url
      timestamp += Math.round(Math.random() * 10)
    }
  }
  // 删除当前毫秒内记录以外其它数据
  const objectkeys = Object.keys(apiTimestampDic)
  for (const kindex in objectkeys) {
    if (objectkeys[kindex] == timestamp) continue
    delete apiTimestampDic[objectkeys[kindex]]
  }
  return timestamp
}
/**
 * 为了避免同一个接口请求同一个入参，在短时间内调用多次，在数据返回前做类似防抖节流处理
 * */
export const checkRequestDebounce = (params, dataObj) => {
  const currentObj = {
    params,
    data: dataObj
  }
  // 判断是否存在相同的请求
  const tempDebounceObj = requestDebounceList.find((item) => {
    return deepEqual(item, currentObj)
  })
  if (!tempDebounceObj) {
    requestDebounceList.push(currentObj)
  }
  return !!tempDebounceObj
}

/**
 * 不对参数做任何处理通信方式
 * @param prams
 * @returns {Promise<any | never>}
 */
export const apiRequest = (prams, showErrorPage = false) => {
  // prams 为我们需要调用的接口API的参数 下面会贴具体代码
  // 判断请求类型
  if (config.allHttpRequestUseEncrypt) {
    return apiRequestBase64(prams, showErrorPage)
  }
  let headerData = {
    'content-type': 'application/json',
    'X-Access-Token': config.getStorageSync(
      config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
    ),
    lotterytype:
      config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE
      ) || 1,
    'Origin-Domain': location.hostname
  }
  let dataObj = null
  // 因为我们的GET和POST请求结构不同这里我们做处理，大家根据自己后台接口所需结构灵活做调整吧
  headerData = Object.assign(headerData, prams.header)
  dataObj = prams.query
  j = 1
  return resquest(prams, dataObj, headerData, 0)

  // TODO 全局接口替换成加密通信方式
}
/**
 * 使用base64方式提交数据
 * @param prams
 * @returns {Promise<any | never>}
 */
// 20230824 MR 新增输出参数日志 ，测试需要做压测需要参数
export const apiRequestBase64 = (prams, showErrorPage = false) => {
  const isShowLog = config.allHttpRequestUseEncryptPrintLog
  if (isShowLog)
    console.log(
      `\n <---------加密通信开始doHttpRequestBase64 apikey=${config.apiKey}`
    )
  const token = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
  )
  const timeSend = getApiTimeStamp(prams) // Math.round(new Date().getTime());
  // 判断请求类型
  let headerData = {
    'content-type': 'application/json',
    'X-Access-Token': token,
    salt: timeSend,
    'Origin-Domain': location.hostname,
    lotterytype:
      config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE
      ) || 1
  }
  isShowLog && console.log('请求对象', JSON.stringify(prams))
  isShowLog && console.log('【query】参数对象', JSON.stringify(prams.query))
  let dataObj = null
  // 按参数名的ascii码从小到大排序
  const sortParam = paramKeySort(prams.query)
  isShowLog && console.log('【query】加密排序结果=', sortParam)
  // 拼接加密前参数
  const value = config.apiKey + sortParam + timeSend
  // 使用value 加密用作 http请求Header中secret字段
  headerData.secret = EncryptUtils.encryptMacToBase64(
    value,
    CryptoJS.MD5(CryptoJS.enc.Utf8.parse(config.apiKey))
  )
  console.log(value, '1111111')
  console.log(headerData.secret, '2222222')
  headerData = Object.assign(headerData, prams.header)
  isShowLog &&
    console.log('【header】处理完成后结果=', JSON.stringify(headerData))

  let encryptData = {}
  if (prams.query && Object.keys(prams.query).length > 0) {
    console.log(prams.query)
    const data = EncryptUtils.encryptAES_StrToStr_test(
      JSON.stringify(prams.query),
      CryptoJS.MD5(CryptoJS.enc.Utf8.parse(config.apiKey))
    )
    encryptData = {
      encryptData: data
    }
  }
  isShowLog &&
    console.log('【query】处理完成后结果=', JSON.stringify(encryptData))
  dataObj = encryptData
  isShowLog &&
    console.log('加密通信结束-------------------------------------->\n\n')
  j = 1
  return resquest(prams, dataObj, headerData, 0, showErrorPage)
}

export const apiLoginRequest = (prams) => {
  const isShowLog = config.allHttpRequestUseEncryptPrintLog
  if (isShowLog) {
    console.log(
      `\n <---------加密通信开始apiLoginRequest apikey=${config.apiKey}`
    )
  }
  const token = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
  )
  const timeSend = getApiTimeStamp(prams) // Math.round(new Date().getTime());
  const userInfo = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
  )
  // 判断请求类型recharge/incomeOnline
  let headerData = {
    'content-type': 'application/json',
    'X-Access-Token': token,
    salt: timeSend,
    'Origin-Domain': location.hostname
  }
  let dataObj = null
  const sortParam = paramKeySort(prams.query)
  if (isShowLog) console.log('请求对象', JSON.stringify(prams))
  if (isShowLog) console.log('【query】参数对象', JSON.stringify(prams.query))
  isShowLog && console.log('【query】加密排序结果=', sortParam)
  const value = config.apiKey + userInfo.id + token + sortParam + timeSend
  isShowLog && console.log('加密拼接参数', value)
  headerData.secret = EncryptUtils.encryptMacToBase64(
    value,
    CryptoJS.MD5(CryptoJS.enc.Utf8.parse(config.apiKey))
  )
  headerData = Object.assign(headerData, prams.header)
  let encryptData = {}
  if (prams.query && Object.keys(prams.query).length > 0) {
    const data = EncryptUtils.encryptAES_StrToStr_test(
      JSON.stringify(prams.query),
      CryptoJS.MD5(CryptoJS.enc.Utf8.parse(config.apiKey))
    )
    encryptData = {
      encryptData: data
    }
  }
  dataObj = encryptData
  isShowLog &&
    console.log('【query】处理完成后结果=', JSON.stringify(encryptData))
  isShowLog &&
    console.log('加密通信结束-------------------------------------->\n\n')
  // dataObj = prams.query
  j = 1
  return resquest(prams, dataObj, headerData)
}

let ajaxTimes = 0

async function resquest(
  prams,
  dataObj,
  headerData,
  trytimes = 0,
  showErrorPage = false
) {
  ajaxTimes++
  if (config.stationOpenHttpSign) {
    const signMsg = await buildSign(headerData.salt.toString(), config.apiKey)
    if (signMsg != null) {
      headerData['x-gsin'] = signMsg
      headerData['x-skey'] = `${signMsg[0]}-${signMsg[3]}-${signMsg[5]}`
      headerData['x-gkey'] = `${signMsg[2]}-${signMsg[8]}-${signMsg[30]}`
      headerData['x-ykey'] = `${signMsg[1]}-${signMsg[31]}-${signMsg[16]}`
    }
  }
  /**
   * 新增header中语言标识
   */
  if (config.stationOpenLanguageHeader) {
    const lanCode = uni.getLocale()
    const lanCodeLower = lanCode.toLowerCase()
    let defaultLanguageCode = 'zh-CN'
    switch (lanCodeLower) {
      case 'zh-hans':
        defaultLanguageCode = 'zh-CN'
        break
      case 'zh-hant':
        defaultLanguageCode = 'zh-TW'
        break
      case 'en':
        defaultLanguageCode = 'en'
        break
      case 'pt':
        defaultLanguageCode = 'pt'
        break
    }
    headerData.Languagecode = defaultLanguageCode
  }
  // $store.state.memObStore.GET_API_CACHE(prams);
  requestCacheMgr.initApiCacheConfig(prams)
  return new Promise(async (resolve, reject) => {
    let url = ''
    if (l >= config.me_base_url.length) {
      if (j > 5) {
        resolve({})
      }
      j += 1
      l = 0
    }
    if (prams.baseUrl == 1) {
      url = config.me_base_url[l] + prams.url // 请求的网络地址和局地的api地址组合
    } else {
      url = config.base_url[l] + prams.url // 请求的网络地址和局地的api地址组合
    }
    // Vue.prototype.$loading(true)
    // uni.showToast({
    //     title: "加载中...",
    //     image: "/static/img/loading_v2.gif"
    //   })

    const cacheResult = await $store.dispatch('getApiMemCache', prams)
    if (cacheResult.status === 1 && cacheResult.data) {
      printDebugLog(
        `${
          prams.url
        } 接口 击中本地缓存 是否为强制请求后更新数据:${!!cacheResult.fromForceUpdateCache}`
      )
      // 删除之前调用接口所有写入缓存数据的回调函数 只保留最新获取cache的回调函数
      $store.dispatch('clearApiCacheDataAfterCbCallBack', prams)
      if (cacheResult.data) cacheResult.data.fromCache = true
      resolve(cacheResult.data)
      if (!cacheResult.fromForceUpdateCache) {
        return
      }
      // 放于宏任务检测
      setTimeout(() => {
        if (!cacheResult.data[config.enumMgr.API_CACHE_CALLBACK_NAME]) {
          console.error(
            `api => ${url} 设置强制缓存 ，但是接口未做后置回调刷新！`
          )
        }
      })
    }
    if (checkRequestDebounce(prams, dataObj)) {
      resolve({})
      return
    }
    return uni.request({
      url,
      data: dataObj,
      method: prams.method,
      header: headerData,
      timeout: 15000,
      success: (res) => {
        // 这里是成功的返回码，大家根据自己的实际情况调整
        if (res.data.code == config.enumMgr.RESPONSE_CODE.FAILD) {
          uni.showToast({
            title: `获取数据失败:${res.data.msg}`,
            duration: 1000,
            icon: 'none'
          })
          // 跳转到数据异常页
          showErrorPage &&
            uni.navigateTo({
              url: '/pages/common/error'
            })
          resolve(res.data)
        } else if (res.data.code === config.enumMgr.RESPONSE_CODE.TOKEN_FAILD) {
          console.log('接口请求错误触发清空token', res)
          uni.removeStorageSync('token')
          uni.removeStorageSync('userInfo')
          uni.reLaunch({
            url: '/',
            success: () => {
              uni.navigateTo({
                url: '/pages/common/login'
              })
            }
          })
        } else if (
          res.data.code == config.enumMgr.RESPONSE_CODE.STATION_CLOSE
        ) {
          //  后端 不允许访问状态码
          uni.reLaunch({
            url: '/pages/common/global/errors/ServiceLimitation'
          })
          return reject()
        } else if (
          res.data.code == config.enumMgr.RESPONSE_CODE.ACCESSR_ESTRICTIONS
        ) {
          //  后端 访问限制状态码
          uni.reLaunch({
            url: '/pages/common/accessRestrictions'
          })
          return reject()
        } else if (
          res.data.code == config.enumMgr.RESPONSE_CODE.STATION_STAND
        ) {
          const stand = uni.getStorageSync('STATION_STAND')
          const redirectUrl = '/pages/common/global/maintenance/index'
          let hrefUrl = location.href
          if (location.hash.includes(redirectUrl)) {
            if (stand) {
              return reject()
            }
            hrefUrl = location.host
          }
          const obj = {
            url: hrefUrl,
            data: res.data
          }
          uni.setStorageSync('STATION_STAND', obj)
          uni.reLaunch({
            url: redirectUrl
          })
          return reject()
        }

        checkResponseVersionToFreshConfig(url, res.data)
        // 如果开启解密内容的话则解密后重写result
        const usedEncodeResult = config.allHttpResponseUserEncrypt
        if (usedEncodeResult && res.data.izEncrypt) {
          rewriteResultFromEncodeResult(res.data)
        }
        // if (config.isDebug) console.log(`接口:${prams.url} 解码结果`, res.data);
        // 更新关联接口,清理缓存入口
        $store.dispatch('doCountApiAndClearCacheAfterClear', prams)
        const afterCacheApiFreshCallBackFn =
          cacheResult && cacheResult.data
            ? cacheResult.data[config.enumMgr.API_CACHE_CALLBACK_NAME]
            : null
        $store.dispatch('bindApiMemCache', {
          requestArgs: prams,
          result: res.data,
          callback: afterCacheApiFreshCallBackFn
        })
        resolve(res.data)
      },
      fail: (err) => {
        resolve({
          request: true
        })
        // 跳转到数据异常页
        if (showErrorPage) {
          uni.navigateTo({
            url: '/pages/common/error'
          })
        }
      },
      complete: (complete) => {
        // 所有接口完成后，关闭loading
        ajaxTimes--
        if (ajaxTimes === 0) {
          // uni.hideLoading()
          // Vue.prototype.$loading(false);
        }
      }
    })
  }).then((res) => {
    l += 1
    // 删除防抖列表里的对应元素
    const tempIndex = requestDebounceList.findIndex((item) => {
      return deepEqual(item, {
        params: prams,
        data: dataObj
      })
    })
    tempIndex >= 0 && requestDebounceList.splice(tempIndex, 1)
    return res.request && trytimes > 0
      ? resquest(prams, dataObj, headerData, trytimes - 1)
      : Promise.resolve(res)
  })
}

function checkResponseVersionToFreshConfig(url, resonse) {
  if (url.indexOf('/api/common/config') != -1) return
  const lastConfigsResponse = config.getStorageSync(
    config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE
  )
  if (!lastConfigsResponse || resonse.version != lastConfigsResponse.version) {
    uni.removeStorageSync(
      config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE
    )
    uni.$emit('must_fresh_configs')
  }
}

function rewriteResultFromEncodeResult(data) {
  const encodeResult = data.result || null
  if (!encodeResult) return console.error('decode  faild #1: result is null')
  const SECRET_KEY = CryptoJS.MD5(config.apiKey)
  let success = false

  try {
    const decryptHost = CryptoJS.AES.decrypt(encodeResult, SECRET_KEY, {
      iv: EncryptUtils.AES.getAesIvKey(),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    var decryptedStrHost = CryptoJS.enc.Utf8.stringify(decryptHost)
    var resultObjecet = eval(`(${decryptedStrHost})`)
    data.result = resultObjecet
    data.isDecr = true
    success = true
  } catch (e2) {
    var resultObjecet = JSON.parse(decryptedStrHost)
    data.result = resultObjecet
    data.isDecr = true
    success = true
  }
}

global.decryptResult = function (str, showLog = false) {
  const debugResult = { result: str }
  rewriteResultFromEncodeResult(debugResult)
  showLog && console.log(debugResult)
  return debugResult.result
}

/**
 * 重写uniapp 上传文件函数 封装拦截解密内容
 * @type {(function(*=))|*}
 */
const oldFunction = uni.uploadFile
uni.uploadFile = function (prams) {
  const userSetOnSuccessCallBack = prams.success
  const rewriteOnSuccessCallBack = function (res) {
    res.data = JSON.parse(res.data)
    const usedEncodeResult = config.allHttpResponseUserEncrypt
    if (usedEncodeResult && res.data.izEncrypt) {
      rewriteResultFromEncodeResult(res.data)
    }
    // 还原成外部封装需要的格式
    res.data = JSON.stringify(res.data)
    typeof userSetOnSuccessCallBack === 'function' &&
      userSetOnSuccessCallBack(res)
  }
  prams.success = rewriteOnSuccessCallBack
  return oldFunction(prams)
}
