import { apiRequest, apiLoginRequest } from '../request'

// 推广赚钱教程图片
export const courseImage = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/courseImage',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱教程视频
export const courseVideo = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/courseVideo',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 返佣比例头部分类
export const getRateType = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/getRateType',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 根据所选返佣比例头部分类获取对应的返佣配置信息列表
export const getRateByType = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/getRateByType',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 直属开户
export const underOpenAccount = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/underOpenAccount',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}

// 直属开户用户首次登录修改密码
export const underOpenAccountUpdatePwd = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/underOpenAccountUpdatePwd',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}

// 返佣比例-底部提示配置
export const getRateRemindConfig = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/getRateRemindConfig',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 我的推广页面接口
export const myPromotion = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/myPromotion',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-我的业绩
export const myPerformance = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/myPerformance',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-我的业绩
export const myPerformanceBottom = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/myPerformanceBottom',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-我的佣金
export const myCommission = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/myCommission',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-团队数据
export const teamData = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/teamData',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-团队数据-底部统计
export const teamDataBottom = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/teamDataBottom',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-一键领取
export const oneTouchReceive = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/oneTouchReceive',
    baseUrl: 1,
    method: 'POST',
    query: { ...prams }
  })
}

// 推广赚钱-领取记录-已领取佣金
export const getCommissionReceiveTotal = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/getCommissionReceiveTotal',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-领取记录-列表分页数据
export const getCommissionReceiveRecords = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/getCommissionReceiveRecords',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}

// 推广赚钱-顶部数据
export const topData = (prams) => {
  return apiLoginRequest({
    url: '/api/agent/topData',
    baseUrl: 1,
    method: 'GET',
    query: { ...prams }
  })
}
