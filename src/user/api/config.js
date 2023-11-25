import axios from "axios";
import { store } from "../..";
import { setSkeletonLocation, setSkeletonRoom } from "../redux/skeletonSlice";
import { userLocalStorage } from "./localService";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";
export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

export const https = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    TokenCybersoft: token,
    token: userLocalStorage.get()?.token,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Add Authorization header if access token exists in local storage
    const token = userLocalStorage.get()?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      window.location.href("/login");
    }
    return Promise.reject(error);
  }
);

https.interceptors.request.use(
  function (config) {
    switch (config.url) {
      case "/vi-tri":
        store.dispatch(setSkeletonLocation(true));
        break;

      case "/phong-thue":
        store.dispatch(setSkeletonRoom(true));
        break;

      default:
        break;
    }
    return config;
  },
  function (error) {
    store.dispatch(setSkeletonLocation(false));
    store.dispatch(setSkeletonRoom(false));
    return Promise.reject(error);
  }
);


https.interceptors.response.use(function (response) {
    const { url } = response.config
    switch (url) {
        case '/vi-tri':
            setTimeout(() => {
                store.dispatch(setSkeletonLocation(false))
            }, 1000);
            break;

        case '/phong-thue':
            setTimeout(() => {
                store.dispatch(setSkeletonRoom(false))
            }, 1000);
            break;

        default:
            break;
    }

    return response;
  },
  function (error) {
    store.dispatch(setSkeletonLocation(false));
    store.dispatch(setSkeletonRoom(false));
    return Promise.reject(error);
  }
);
