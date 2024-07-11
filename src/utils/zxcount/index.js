import {apiRequest,apiRequestBase64} from "../request";
import {config} from "../../config/config";
//六合
export const summary = (query) => {
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:"/api/lottery/stat/summary",
        baseUrl:1,
        method: 'GET',
        query: {...query},
    })
}
//属性参照
export const attrConstant = (query={}) => {
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/attrConstant',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//特码历史
export const numberStat = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE,1)
    return apiRequestBase64({
        url:'/api/lottery/stat/numberStat',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//尾数大小
export const tailBigSmall = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/tailBigSmall',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//生肖
export const animalStat = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/animalStat',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//波色
export const colorStat = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/colorStat',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//特码两面
export const numberAnalyze = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/numberAnalyze',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//特码尾数
export const tailStat = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/tailStat',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//号码波段
export const numberRange = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/numberRange',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//家禽野兽
export const animalAnalyze = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/animalAnalyze',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
//连码走势
export const consecutiveStat = (query) =>{
    query.lotteryType=config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE)|| 1
    return apiRequestBase64({
        url:'/api/lottery/stat/consecutiveStat',
        baseUrl:1,
        method:"GET",
        query:{...query},
    })
}
