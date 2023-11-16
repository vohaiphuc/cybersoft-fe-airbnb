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
  editUser: (id, userData) => {
    console.log({
      id,
      userData,
    });
    return https.put(`/users/${id}`, userData);
  },
};

export const roomServ = {
  getList: () => {
    return https.get("/phong-thue");
  },
  addRoom: (roomData) => {
    return https.post("/phong-thue", roomData);
  },
  deleteUser: (id) => {
    return https.delete(`/users?id=${id}`);
  },
  editUser: (id, userData) => {
    console.log({
      id,
      userData,
    });
    return https.put(`/users/${id}`, userData);
  },
};
