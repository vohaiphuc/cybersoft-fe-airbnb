import { dateFromIsoString } from "../page/Room/asset/utils";
import { https } from "./config";

export const userServ = {
  login: (info) => https.post(`/auth/signin`, info),
};

export const roomServ = {
  get: () => https.get("/phong-thue"),
  getDetaiRoomData: ({ id }) => https.get(`/phong-thue/${id}`),
  postBookingRoom: async ({
    maPhong,
    ngayDen,
    ngayDi,
    soLuongKhach,
    maNguoiDung,
  }) => {
    return https.post("dat-phong", {
      maPhong,
      ngayDen: dateFromIsoString(ngayDen),
      ngayDi: dateFromIsoString(ngayDi),
      soLuongKhach,
      maNguoiDung,
    });
  },
};

export const viTriServ = {
  get: () => https.get("/vi-tri"),
};
