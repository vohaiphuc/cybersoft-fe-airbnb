import axios from "axios";
import { userLocalStorage } from "./localService";
import { store } from "../../index";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";

export const https = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft: token,
    Token: `${userLocalStorage.get()?.token}`,
    timeout: 1000,
  },
});
https.interceptors.request.use(
  function (config) {
    const { url } = config;
    switch (url) {
      case "/users":
        store.dispatch(setLoadingOn());
        break;
      case "/phong-thue":
        store.dispatch(setLoadingOn());
        break;
      case "/vi-tri":
        store.dispatch(setLoadingOn());
        break;
      case "/dat-phong":
        store.dispatch(setLoadingOn());
        break;
      default:
        break;
    }
    return config;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);
https.interceptors.response.use(
  function (response) {
    const url = response.config.url;
    switch (url) {
      case "/users":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/phong-thue":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/vi-tri":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/dat-phong":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      default:
        store.dispatch(setLoadingOff());
        break;
    }
    return response;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);
