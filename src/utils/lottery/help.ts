import { apiRequest, apiRequestBase64, apiLoginRequest } from '../request'
// 帮助中心列表数据
export const helps = (query) => {
  if (typeof query === 'string') {
    return apiRequestBase64({
      url: `/api/help/${query}`,
      baseUrl: 1,
      method: 'GET'
    })
  }
  return apiRequestBase64({
    url: '/api/help',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 帮助中心根据问题ID获取问题详情
export const details = (query) => {
  return apiRequestBase64({
    url: '/api/help/details',
    baseUrl: 1,
    method: 'GET',
    query: { ...query }
  })
}
// 帮助中心问题详情回答是否有帮助
export const answer = (query) => {
  return apiRequestBase64({
    url: '/api/help/answer',
    baseUrl: 1,
    method: 'POST',
    query: { ...query }
  })
}
