import {apiRequest, apiRequestBase64} from "../request";

//索引列表
export const search = (prams)=>{
    return apiRequestBase64({
        url:'/api/picture/index/search',
        baseUrl:1,
        method: 'GET',
        query: {...prams}
    })
}
//选择年
export const latest = (prams)=>{
    return apiRequestBase64({
        url:'/api/picture/detail/latest',
        baseUrl:1,
        method: 'GET',
        query: {...prams}
    })
}
//详情接口
export const detail = (prams)=>{
    return apiRequestBase64({
        url:'/api/picture/detail',
        baseUrl:1,
        method: 'GET',
        query: {...prams}
    })
}
//推荐图库
export const recommendPicture = (prams)=>{
    return apiRequestBase64({
        url:'/api/picture/recommendPicture',
        baseUrl:1,
        method: 'GET',
        query: {...prams}
    })
}
//竞猜
export const guessPlayingConfig = (prams)=>{
    return apiRequestBase64({
        url:'/api/article/guessPlayingConfig',
        baseUrl:1,
        method: 'GET',
        query: {...prams}
    })
}