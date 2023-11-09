import { https } from "./config";

export const userServ = {
    login: (info) => https.post(`/auth/signin`, info),
}

export const roomServ = {
    get: () => https.get('/phong-thue')
}

export const viTriServ = {
    get: () => https.get("/vi-tri")
}