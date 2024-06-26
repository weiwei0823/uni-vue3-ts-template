import { apiRequest, apiRequestBase64, apiLoginRequest } from '../request'
import $store from '@/store'

// 注单列表
export const list = (prams) => {
  return apiLoginRequest({
    url: '/api/betting/list',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 注单详情
export const betOrderDetail = (prams) => {
  return apiLoginRequest({
    url: '/api/betting/info',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 投注下单
export const buyOrder = (prams) => {
  // 客户端content关联内容太多 不好去改动 如果content提交格式与后端要求有出入
  // 则在生成订单时生成 content_commit字段 在提交前重写提交content MRZ 20230716
  const copyParms = { ...prams }
  for (const k in copyParms.orderList) {
    const orderPice = copyParms.orderList[k]
    if (!orderPice) continue
    const commitContent = orderPice.content_commit
    if (!commitContent || commitContent == '') continue
    orderPice.content = commitContent
    delete orderPice.content_commit
  }
  return new Promise(async (resolove) => {
    const result = await apiLoginRequest({
      url: '/api/betting/betting',
      baseUrl: 1,
      method: 'POST',
      query: {
        ...prams
      }
    })
    if (result.code == 200) {
      // @MR 购物车购买购买后 刷新余额
      $store.dispatch('updateUserBalanceFromServer')
    }
    resolove(result)
  })
}
// 撤单
export const cancel = (prams) => {
  return new Promise(async (resolove) => {
    const result = await apiLoginRequest({
      url: '/api/betting/cancel',
      baseUrl: 1,
      method: 'POST',
      query: {
        ...prams
      }
    })
    if (result.code == 200) {
      // @MR 购物车购买购买后 刷新余额
      $store.dispatch('updateUserBalanceFromServer')
    }
    resolove(result)
  })
}
// 近期开奖
export const getHistoryList = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/result/getHistoryList',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

// 玩法列表
export const getPlayList = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/play/list',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

// 走势图
export const getTrendChart = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/play/getTrendChart',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 长龙投注页面
export const getTrendChartBet = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/play/getTrendChartBet',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 长龙投注页面-单条数据更新使用
export const getLotteryBet = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/play/getLotteryBet',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取简易版模板
export const getPlayMiniList = (prams) => {
  return apiRequestBase64({
    // url:'/api/lottery/play/minList',
    url: '/api/lottery/play/minList',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

// 获取头部开奖数据
export const getRewardsInfo = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/result/getMaxResult',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取hash介绍
export const getHashInfo = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/result/getHashInfo',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取彩票状态
export const getLotteryStat = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/stat/attrConstant',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 分类数据(样版2)
export const categories = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/style2/categories',
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
    url: '/api/lottery/shop/v2/categoryData',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    },
    cacheTime: 600000 // 定时缓存 接口缓存周期内从本地读取，否则从接口获取
  })
}
// 分类数据
export const gameListByPlatformCateId = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/v2/gameListByPlatformCateId',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    },
    cacheTime: 60000 // 定时缓存 接口缓存周期内从本地读取，否则从接口获取
  })
}
// 获取彩票状态
export const hot = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/hot',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取彩票状态
export const lottery = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/lottery',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取底部图片
export const bottomImages = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/shop/bottomImages',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取底部图片
export const showUserBalance = (prams) => {
  return apiRequestBase64({
    url: '/api/user/balance',
    // url:'/api/lottery/mine/balance',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
// 获取彩种列表
export const getLotteryList = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/list',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

// 获取聊天室参数信息
export const getChatRoomInfo = (prams) => {
  return apiLoginRequest({
    url: '/api/common/chatRoom/path',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

// 获取聊天室参数信息
export const getChatRoomInfoByTab = (prams) => {
  return apiLoginRequest({
    url: '/api/common/chatRoom/index',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}

export const getLotteryType = (prams) => {
  return apiRequestBase64({
    url: '/api/lottery/getLotteryType',
    baseUrl: 1,
    method: 'GET',
    query: {
      ...prams
    }
  })
}
