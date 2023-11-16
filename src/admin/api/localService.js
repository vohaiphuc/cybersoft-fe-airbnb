/**
 * local Storage function
 */

export const userLocalStorage = {
  set: (adminLogin) => {
    let dataJson = JSON.stringify(adminLogin);
    localStorage.setItem("ADMIN", dataJson);
  },
  get: () => {
    let dataJson = localStorage.getItem("ADMIN");
    return JSON.parse(dataJson);
  },
  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};
