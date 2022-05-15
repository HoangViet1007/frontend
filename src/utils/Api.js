import axios from "axios";
import { API_URL } from "./Config";
import { getUserInfo } from "./localStorage/GetUserInfo";

export const Api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiFormData = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const ApiExport = axios.create({
  baseURL: API_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiFormData.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = getUserInfo("infoUser").access_token;
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }
  return {
    ...config,
    headers: {
      ...customHeaders,
    },
  };
});

Api.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = getUserInfo("infoUser").access_token;
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }
  return {
    ...config,
    headers: {
      ...customHeaders,
    },
  };
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 400 && error?.response?.data?.message === "email_verify") {
      window.location.href = "/400";
    }
    if (error?.response?.status === 403) {
      window.location.href = "/403";
    }
    if (error?.response?.status === 401) {
      window.location.href = "/dang-nhap";
    }
    if (error?.response?.status === 405) {
      window.location.href = "/dang-nhap";
    }
    return Promise.reject(error);
  }
);

ApiExport.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = getUserInfo("infoUser").access_token;
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }
  return {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...customHeaders, // auto attach token
    },
  };
});
