import { apiRequest, apiRequestBase64, apiLoginRequest } from "../request";
//直播获取
export const getLiveInfoByLotteryId = (query) => {
  return apiRequestBase64({
    url: "/api/lottery/getLotteryById",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
//直播获取
export const live = (query) => {
  return apiRequestBase64({
    url: "/api/lottery/live",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
//获取年列表
export const listYear = (query) => {
  return apiRequestBase64({
    url: "/api/lottery/video/listYear",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};

//获取年列表
export const historyListYear = (query) => {
  return apiRequestBase64({
    url: "/api/lottery/history/listYear",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};

//开奖回放接口
export const videoList = (query) => {
  return apiRequestBase64({
    url: "/api/lottery/video/list",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
//历史期数
export const lastLotteryRecord = (query) => {
  return apiRequestBase64({
    url: "/unite49/h5/index/lastLotteryRecord",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
//详情信息
export const lotteryDetail = (query) => {
  return apiRequest({
    url: "",
    method: "GET",
    query: { ...query },
  });
};
