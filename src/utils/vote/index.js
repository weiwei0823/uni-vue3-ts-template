import {apiRequest,apiRequestBase64} from "../request";


//年列表
export const listYear = (query) => {
    return apiRequestBase64({
        url:"/api/guess/listYear",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//期数
export const listPeriod = (query) => {
    return apiRequestBase64({
        url:"/api/guess/listPeriod",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//当前期开奖信息
export const detail = (query) => {
    return apiRequestBase64({
        url:"/api/guess/detail",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
