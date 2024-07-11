import { apiRequestBase64 } from '../request'

export const listArticleType = (query) => {
  return apiRequestBase64({
    url: '/api/article/listArticleType',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 列表页列表获取
export const searchList = (query) => {
  return apiRequestBase64({
    url: '/api/article/search',
    method: 'GET',
    baseUrl: 1,
    query: { ...query }
  })
}
// 广告轮播图
export const wheelAdvertList = (query) => {
  return apiRequestBase64({
    url: '/api/article/wheelAdvertList',
    method: 'GET',
    baseUrl: 1,
    query: { ...query }
  })
}
// 获取广告接口
export const advertList = (query) => {
  return apiRequestBase64({
    url: '/api/description/descriptionList',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
