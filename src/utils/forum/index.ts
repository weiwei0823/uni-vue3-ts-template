import { apiRequest, apiLoginRequest, apiRequestBase64 } from '../request'

// 高手论坛列表
export const listLatest = (prams) => {
  return apiRequestBase64({
    url: '/api/article/listLatest',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 用户主页和历史记录列表
export const userPublish = (prams) => {
  return apiLoginRequest({
    url: '/api/article/userPublish',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 申请加精
export const applyRaise = (prams) => {
  return apiLoginRequest({
    url: '/api/article/applyRaise',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}
// 帖子详情
export const detail = (prams) => {
  return apiRequestBase64({
    url: '/api/article/detail',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 获取上次发布内容(根据彩种)
export const lastPeriodArticle = (prams) => {
  return apiRequestBase64({
    url: '/api/article/lastPeriodArticle',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 获取上次发布内容(根据彩种)
export const getArticleTime = (prams) => {
  return apiRequestBase64({
    url: '/api/article/getArticleTime',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 发布帖子
export const submitArticle = (prams) => {
  return apiLoginRequest({
    url: '/api/article/submitArticle',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}
// 编辑帖子
export const editArticle = (prams) => {
  return apiLoginRequest({
    url: '/api/article/editArticle',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}
// 规格获取
export const ruleContent = (prams) => {
  return apiRequestBase64({
    url: '/api/article/ruleContent',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
// 发现列表
export const findList = (prams) => {
  return apiRequestBase64({
    url: '/unite49/h5/discovery/list',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
