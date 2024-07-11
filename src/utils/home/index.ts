import { apiRequest, apiRequestBase64, apiLoginRequest } from '../request.js'

// POST 请求案例

export const login = (query) => {
  return apiRequestBase64({
    url: '/unite49/h5/index/lotteryTime',
    baseUrl: 1,
    method: 'POST',
    query: { ...query }
  })
}

// GET 请求案例可以传递参数也可以不传递
export const home = (query) => {
  return apiRequestBase64({
    url: '/api/index/uniteInfo',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
export const lt_init = (query, cb, region) => {
  return apiRequestBase64({
    url: '/api/index/lt/init',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
export const cp_init = (query) => {
  return apiRequestBase64({
    url: '/api/index/cp/init',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 首页加载列表
export const list = (query) => {
  return apiRequestBase64({
    url: '/api/index/listPicture',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 首页弹窗数据
export const popu = (query) => {
  return apiRequestBase64({
    url: '/api/index/pop',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
