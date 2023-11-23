import axios from "axios"
import { store } from "../..";
import { setSkeletonLocation, setSkeletonRoom } from "../redux/skeletonSlice";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg"

export const https = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft: token,
    }
})

https.interceptors.request.use(function (config) {
    switch (config.url) {
        case '/vi-tri':
            store.dispatch(setSkeletonLocation(true))
            break;

        case '/phong-thue':
            store.dispatch(setSkeletonRoom(true))
            break;

        default:
            break;
    }
    return config;
}, function (error) {
    store.dispatch(setSkeletonLocation(false))
    store.dispatch(setSkeletonRoom(false))
    return Promise.reject(error);
});

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
}, function (error) {
    store.dispatch(setSkeletonLocation(false))
    store.dispatch(setSkeletonRoom(false))
    return Promise.reject(error);
});