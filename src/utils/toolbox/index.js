import { apiRequest, apiRequestBase64 } from "../request";
import {config} from "../../config/config";

//索引列表
export const loversNumber = (query) => {
    query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1
    return apiRequestBase64({
        url: '/api/lottery/result/tool/loversNumber',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
// (prams)=>{
//     return apiRequest({
//         url:'/unite49/h5/tool/loversNumber',
//         method: 'GET',
//         query: {...prams}
//     })
// }
//生肖卡牌
export const animalCard = (query) => {
    query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1
    return apiRequestBase64({
        url: '/api/lottery/result/tool/animalCard',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
//摇一摇
export const shake = (query) => {
    query.lotteryType = uni.getStorageSync('lotteryType') || 1
    return apiRequestBase64({
        url: '/api/lottery/result/tool/shake',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
//玄机锦囊
export const sinkBag = (query = {}) => {
    query.lotteryType =config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url: '/api/silkbag/mystery',
        baseUrl: 1,
        method: 'GET',
        query: { ...query }
    })
}
//获取年列表
export const listYear = (query) => {
    return apiRequestBase64({
        url: '/api/silkbag/years',
        baseUrl: 1,
        method: 'GET',
        query: { ...query }
    })
}
//玄机锦囊历史
export const listSinkBag = (query) => {
    query.lotteryType =config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url: '/api/silkbag/history',
        baseUrl: 1,
        method: 'GET',
        query: { ...query }
    })
}
//幸运摇奖
export const prizeWheel = (query) => {
    query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1
    query.jpushId = Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000
    return apiRequestBase64({
        url: '/api/lottery/result/tool/prizeWheel',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
//波肖转盘
export const animalAndColorWheel = (query) => {
    query.lotteryType =config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1
    return apiRequestBase64({
        url: '/api/lottery/result/tool/animalAndColorWheel',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
//天机测算
export const forecast = (query) => {
    query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url: '/api/lottery/result/tool/forecast',
        baseUrl: 1,
        method: 'POST',
        query: { ...query }
    })
}
//老黄历
export const getAlmanac = (query) => {
	query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url: '/api/common/tool/almanac',
        baseUrl: 1,
        method: 'get',
        query: { ...query }
    })
}
//挑码助手
export const getCodePicking = (query) => {
    return apiRequestBase64({
        url: '/api/lottery/tool/chooseNumber',
        baseUrl: 1,
        method: 'GET',
        query: { ...query }
    })
}
/**
 * 加密方式通信
 * @param query
 * @returns {Promise<any | never>}
 */
export const getAlmanacBase64 = (query) => {
    return apiRequestBase64({
        url: '/api/lottery/tool/almanac',
        baseUrl: 1,
        method: 'get',
        query: { ...query }
    })
}
