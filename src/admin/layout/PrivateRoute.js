import React from "react";
import { userLocalStorage } from "../api/localService";

export default function PrivateRoute({ children }) {
  const user = userLocalStorage.get();
  if (user?.role == "ADMIN") {
    return children;
  }
  window.location.href = "/login";
}
