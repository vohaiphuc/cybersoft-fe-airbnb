import { https } from "./config";

export const userServ = {
    login: (info) => https.post(`/auth/signin`, info),
}