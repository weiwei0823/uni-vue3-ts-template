import {apiRequest, apiRequestBase64, apiLoginRequest} from "../request";
import Logger from '../debug/Logger.js'

//试玩账号登录
export const demoLogin = (prams)=>{
    return apiRequestBase64({
        url:'/api/common/demoLogin',
        baseUrl:1,
        method: 'POST',
        query: {...prams}
    })
}
//关注接口
export const concern = (prams)=>{
    return apiLoginRequest({
        url:'/api/user/concern',
        baseUrl:1,
        method: 'POST',
        query: {...prams}
    })
}
//拉黑用户
export const block = (prams)=>{
    return apiLoginRequest({
        url:'/api/user/behavior/block',
        baseUrl:1,
        method: 'POST',
        query: {...prams}
    })
}
//取消拉黑
export const cancelBlock = (prams)=>{
    return apiLoginRequest({
        url:'/api/user/behavior/cancelBlock',
        baseUrl:1,
        method: 'POST',
        query: {...prams}
    })
}
//点赞接口
export const thumbUp = (query) =>{
    return apiLoginRequest({
        url:"/api/user/behavior/thumbUp",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//发表评论
export const comment = (query) =>{
    return apiLoginRequest({
        url:"/api/user/behavior/comment",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//收藏
export const collect = (query) =>{
    return apiLoginRequest({
        url:"/api/user/behavior/collect",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//投票
export const vote = (query) => {
    return apiLoginRequest({
        url:"/api/user/behavior/vote",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//举报接口
export const report = (query) => {
    return apiLoginRequest({
        url:"/api/user/behavior/report",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//关于我们
export const aboutUs = () => {
    return apiRequestBase64({
        url:"/api/common/config",
        baseUrl:1,
        method:'GET',
    })
}
//更新个人信息接口
export const updateUserInfo = (query) => {
    return apiLoginRequest({
        url:"/api/user/updateUser",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//获取用户个人信息
export const info = (query) => {
    return new Promise(async (resolve) => {
        let api='/api/user/info';
        let logger = Logger.createUserInfoLogWatcher(api)
        logger.start();
        let response = await apiLoginRequest({
            url: api,
            baseUrl: 1,
            method: 'GET',
            query: {...query},
        });
        logger.save(response.code,response.result);
        resolve(response);
    })
}
//获取默认头像列表
export const getBuildInAvatar = (query) => {
    return apiRequestBase64({
        url:"/api/common/getBuildInAvatar",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//更新头像
export const updateAvatar = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/updateHeadImg",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//更新昵称
export const updateUsername = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/updateUname",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//绑定手机号
export const bindMobile = (query) => {
    return apiLoginRequest({
        url:"/api/lottery/mine/bindMobile",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//验证旧手机号
export const updateOldPhone = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/updatePhone",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//验证新手机号
export const updateNewPhone = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/updatePhone2",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//修改密码
export const updatePassword = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/updatePwd",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}

//获取粉丝排行榜
export const fansRankList = () => {
    return apiLoginRequest({
        url:"/api/user/fansRanking",
        baseUrl:1,
        method:'GET',
    })
}
//获取分享排行榜
export const shareRankList = () => {
    return apiLoginRequest({
        url:"/api/user/shareRanking",
        baseUrl:1,
        method:'GET',
    })
}
//获取等级排行榜
export const levelRankList = () => {
    return apiLoginRequest({
        url:"/api/user/levelRanking",
        baseUrl:1,
        method:'GET',
    })
}
//意见反馈
export const feedback = (query) => {
    return apiLoginRequest({
        url:"/api/user/feedback",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//上传缩略图
export const uploadImg = (query) => {
    return apiLoginRequest({
        url:"/api/user/upImg",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//获取反馈列表
export const getFeedbackList = (query) => {
    return apiLoginRequest({
        url:"/api/user/feedbackList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}

//获取反馈详情
export const feedbackDetail = (query) => {
    return apiLoginRequest({
        url:"/api/user/feedbackDetail",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}

//我的关注
export const myConcern = (query) => {
    return apiLoginRequest({
        url:"/api/user/myConcern",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//我的粉丝
export const myFans = (query) => {
    return apiLoginRequest({
        url:"/api/user/myFans",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//获取活动规则
export const getActiveRule = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/agentDesc",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })

}
//申请代言人
export const applySpoke = (query) => {
    return apiLoginRequest({
        url:"/api/mine/setting/agent/apply",
        baseUrl:1,
        method:'POST',
        query:{...query},
    })
}
//邀请好友
export const share = (query) => {
    return apiLoginRequest({
        url:"/api/user/behavior/share",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//我的勋章
export const myMedal = (query) => {
    return apiLoginRequest({
        url:"/api/user/listMedal",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//推广列表
export const publicize = (query) => {
    return apiLoginRequest({
        url:"/api/user/publicizeList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//我的点赞
export const myThumbUp = (query) => {
    return apiLoginRequest({
        url:"/api/user/myThumbUp",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//举报记录
export const reportList = (query) => {
    return apiLoginRequest({
        url:"/api/user/reportList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//举报详情
export const reportDetail = (query) => {
    return apiLoginRequest({
        url:"/api/user/reportDetail",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//小黑屋
export const punish = (query) => {
    return apiLoginRequest({
        url:"/api/user/punish",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//公告
export const noticeList = (query) => {
    return apiRequestBase64({
        url:"/api/index/noticeList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//公告
export const listByPage = (query) => {
    return apiRequestBase64({
        url:"/api/notice/listByPage",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//公告详情
export const details = (query) => {
    return apiRequestBase64({
        url:"/api/notice/details",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//黑名单
export const listUserPunish = (query) => {
    return apiLoginRequest({
        url:"/api/user/blockList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//我的收藏
export const myCollection = (query) => {
    return apiLoginRequest({
        url:"/api/user/myCollection",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//我的成长值
export const myScore = (query) => {
    return apiLoginRequest({
        url:"/api/user/myScore",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//用户等级列表
export const userLevelList = (query) => {
    return apiRequestBase64({
        url:"/api/common/userLevelList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//站内信接口
export const messageList = (query) => {
    return apiLoginRequest({
        url:"/api/user/messageList",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//站内信接口
export const msgList = (query) => {
    return apiLoginRequest({
        url:"/api/user/message/list",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//根据消息ID获取用户站内信数据详情
export const msgDetails = (query) => {
    return apiLoginRequest({
        url:"/api/user/message/details",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
//批量删除用户消息
export const delMessage = (query) => {
    return apiLoginRequest({
        url:"/api/user/message/del",
        baseUrl:1,
        method:'GET',
        query:{...query},
    })
}
