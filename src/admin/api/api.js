import { https } from "./config";

export const userServ = {
  login: (info) => https.post(`/auth/signin`, info),
  getList: () => {
    return https.get("/users");
  },
  addUser: (userData) => {
    return https.post("/users", userData);
  },
  deleteUser: (id) => {
    return https.delete(`/users?id=${id}`);
  },
  getDetailUser: (id) => {
    return https.get(`/users/${id}`);
  },
  editUser: (id, values) => {
    return https.put(`/users/${id}`, values);
  },
};

export const roomServ = {
  getList: () => {
    return https.get("/phong-thue");
  },
  addRoom: (roomData) => {
    return https.post("/phong-thue", roomData);
  },
  deleteRoom: (id) => {
    return https.delete(`/phong-thue/${id}`);
  },
  getDetailRoom: (id) => {
    return https.get(`/phong-thue/${id}`);
  },
  editRoom: (id, roomData) => {
    return https.put(`/phong-thue/${id}`, roomData);
  },
};
export const locationServ = {
  getList: () => {
    return https.get("/vi-tri");
  },
  addLocation: (locationData) => {
    return https.post("/vi-tri", locationData);
  },
  deleteLocation: (id) => {
    return https.delete(`/vi-tri/${id}`);
  },
  getDetailLocation: (id) => {
    return https.get(`/vi-tri/${id}`);
  },
  editLocation: (id, locationData) => {
    return https.put(`/vi-tri/${id}`, locationData);
  },
};
export const bookingRoomServ = {
  getList: () => {
    return https.get("/dat-phong");
  },
  addBookingRoom: (bookingRoomData) => {
    console.log(bookingRoomData);
    return https.post("/dat-phong", bookingRoomData);
  },
  deleteBookingRoom: (id) => {
    return https.delete(`/dat-phong/${id}`);
  },
  getDetailBookingRoom: (id) => {
    return https.get(`/dat-phong/${id}`);
  },
  editBookingRoom: (id, roomData) => {
    return https.put(`/dat-phong/${id}`, roomData);
  },
};
