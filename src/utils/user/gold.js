import { apiLoginRequest } from "../request";

export const details = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/details",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
export const sign = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/sign",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};

export const keepSignReceive = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/keepSignReceive",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};

export const goldRecords = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/goldRecords",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};

export const convertData = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/convertData",
    baseUrl: 1,
    method: "GET",
    query: { ...query },
  });
};
export const convert = (query) => {
  return apiLoginRequest({
    url: "/api/user/gold/sign/convert",
    baseUrl: 1,
    method: "POST",
    query: { ...query },
  });
};
