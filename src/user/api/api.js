import { dateFromIsoString } from "../page/Room/asset/utils";
import { https } from "./config";

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
  getAsLocation: (locationId) =>
    https.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`),
};

export const viTriServ = {
  get: () => https.get("/vi-tri"),
  getDetail: (id) => https.get(`/vi-tri/${id}`),
};

export const updateProfile = {
  put: async (id) => https.put(`/users/${id}`),
};
