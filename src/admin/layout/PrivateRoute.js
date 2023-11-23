import React from "react";
import { userLocalStorage } from "../api/localService";

export default function PrivateRoute({ children }) {
  const user = userLocalStorage.get();
  console.log(user);
  if (user?.role === "ADMIN") {
    return children;
  }
  window.location.href = "/";
}
