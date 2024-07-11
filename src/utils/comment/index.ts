import { apiRequest, apiRequestBase64, apiLoginRequest } from '../request'

// 热门评论
export const commentList = (query) => {
  return apiRequestBase64({
    url: '/api/comment/commentList',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 更多评论
export const listSecondComment = (query) => {
  return apiRequestBase64({
    url: '/api/comment/listSecondComment',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 最新评论
export const listLatest = (query) => {
  return apiRequestBase64({
    url: '/api/comment/listLatest',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 我的评论
export const myComment = (query) => {
  return apiLoginRequest({
    url: '/api/user/myComment',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
