// 获取分类
import { apiRequestBase64, apiLoginRequest } from '../request'

export const clearUserNewlyPlay = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/style2/clearUserNewlyPlay',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
export const categories = (prams) => {
  return apiRequestBase64({
    url: '/api/game/hall/categories',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 分类数据
export const categoryData = (prams) => {
  return apiRequestBase64({
    url: '/api/game/hall/categoryData',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 分类数据
export const gameListByPlatformCateId = (prams) => {
  return apiRequestBase64({
    url: '/api/game/hall/gameListByPlatformCateId',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 收藏游戏（样版2）
export const gameCollect = (prams) => {
  return apiLoginRequest({
    url: '/api/lottery/shop/style2/gameCollect',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 收藏游戏列表
export const style2GameCollectList = (prams) => {
  return apiLoginRequest({
    url: '/api/lottery/shop/style2/gameCollectList',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 收藏游戏列表
export const gameCollectList = (prams) => {
  return apiLoginRequest({
    url: '/api/game/hall/gameCollectList',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 推荐分类
export const reCategories = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/recommend/categories',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 网站推荐-游戏平台
export const platformsByCategory = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/recommend/platformsByCategory',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 网站推荐-游戏数据
export const games = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/recommend/games',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
