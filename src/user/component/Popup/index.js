import React from "react";
import { useSelector } from "react-redux";
import { POPUP_NAME } from "../../constants/popup/index";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

const Popup = () => {
  const popup = useSelector((state) => state?.popupSlice?.popup);
  if (!popup) return null;

  switch (popup) {
    case POPUP_NAME.LOGIN:
      return <Login />;
    case POPUP_NAME.REGISTER:
      return <Register />;
    case POPUP_NAME.EDIT_PROFILE:
      return <Profile />;
    default:
      return null;
  }
};

export default React.memo(Popup);
