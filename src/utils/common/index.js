import {
	apiRequest,
	apiRequestBase64,
	apiLoginRequest
} from "../request";
import {
	config
} from "@/config/config.js";
//获取年列表
export const listYear = (query = {}) => {
	// query.lotteryType = uni.getStorageSync("lotteryType") || 1;
	query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1;
	return apiRequestBase64({
		url: "/api/lottery/result/query/listYear",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//查询助手
export const doQuery = (query) => {
	query.lotteryType = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE) || 1;
	return apiRequestBase64({
		url: "/api/lottery/result/query/assistant/list",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//彩票信息
export const lotteryDetail = (query) => {
	return apiRequestBase64({
		url: "/unite49/h5/lottery/detail",
		method: "GET",
		query: {
			...query
		},
	});
};
//获取验证码
export const getVCode = (query) => {
	return apiRequestBase64({
		url: "/api/common/getVCode",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//获取图片验证码
export const getImgVCode = (query) => {
	return apiRequestBase64({
		url: "/api/common/randomImage/" + query.key,
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//获取MK验证码
export const getMkCode = (query) => {
	const userInfo = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO)
	const key = userInfo.id || config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.MEM_CLIENT_ID);
	return apiRequestBase64({
		url: "/api/common/getMkCode",
		baseUrl: 1,
		method: "GET",
		query: {
			key
		},
	});
};
//验证MK验证码
export const checkMkCode = (query) => {
	const userInfo = config.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO)
	const key = userInfo.id || uni.getStorageSync(config.enumMgr.APP_LOCALSTORE_KEYS.MEM_CLIENT_ID);
	return apiRequestBase64({
		url: "/api/common/checkMkCode",
		baseUrl: 1,
		method: "GET",
		query: {
			key,
			...query
		},
	});
};
//验证码验证
export const checkCode = (query) => {
	return apiRequestBase64({
		url: "/api/common/checkCode",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//注册接口
export const regAndLogin = (query) => {
	return apiRequestBase64({
		url: "/api/common/regAndLogin",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//六合彩注册
export const regAndLoginLiu = (query) => {
	return apiRequestBase64({
		url: "/api/common/lottery/regAndLogin",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
export const fastRegister = (query) => {
	return apiRequestBase64({
		url: "/api/common/fastRegister",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
export const signUserAppendInfo = (query) => {
	return apiLoginRequest({
		url: "/api/user/signUserAppendInfo",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//修改密码接口
export const findPwd = (query) => {
	return apiRequestBase64({
		url: "/api/common/findPwd",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//登录接口
export const login = (query) => {
	return apiRequestBase64({
		url: "/api/common/login",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};
//退出登录接口
export const logout = () => {
	return apiLoginRequest({
		url: "/api/mine/setting/logout",
		baseUrl: 1,
		method: "POST",
		query: {},
	});
};
//设置资料
export const updateUser = (query) => {
	return apiLoginRequest({
		url: "/api/user/updateUser",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};

//轮播图
export const listSpreadByType = (query) => {
	return apiRequestBase64({
		url: "/api/index/banner",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//广告
export const buttonInfo = (query) => {
	return apiRequestBase64({
		url: "/api/common/advert/buttonInfo",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//公告
export const noticeList = (query) => {
	return apiRequestBase64({
		url: "/api/index/noticeList",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//公告2
export const notice = (query) => {
	return apiRequestBase64({
		url: "/api/notice",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//游戏大厅弹窗
export const pop = (query) => {
	return apiRequestBase64({
		url: "/api/pop",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//网址大全
export const siteList = (query) => {
	return apiRequestBase64({
		url: "/api/description/siteList",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//平台维护状态
export const healthy = (query) => {
	return apiRequest({
		url: "/api/common/healthy",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};

//担保平台
export const AdList = (query) => {
	return apiRequestBase64({
		url: "/api/description/guaranteeSiteList",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//获取配置文件
export const configs = (query) => {
	return apiRequestBase64({
		url: "/api/common/config",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//获取广告接口
export const advertList = (query) => {
	return apiRequestBase64({
		url: "/api/description/descriptionList",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};
//试玩登录
export const demoLogin = (query) => {
	return apiRequestBase64({
		url: "/api/common/demoLogin",
		baseUrl: 1,
		method: "POST",
		query: {
			...query
		},
	});
};

export const appStatusConfig = (query) => {
	return apiRequestBase64({
		url: "/api/common/site/config",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};

export const requestSvg = (url, query) => {
	return apiRequest({
		url,
		method: "GET",

	});
};


export const doBindUserDeviceToken = (query) => {
	return apiRequestBase64({
		url: "/api/common/buildApp",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
};

export const doLogout= (query) =>{
	return apiLoginRequest({
		url: "/api/common/logout",
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
}

export const doGetAppVersion=(query)=>{
	return apiRequestBase64({
		url: `/api/common/app/new`,
		baseUrl: 1,
		method: "GET",
		query: {
			...query
		},
	});
}