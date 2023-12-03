import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { POPUP_NAME } from "./hook/usePopup";
import ModalFilterSlider from "../../page/Home/OptionSlider/ModalFilterSlider";
import ModalUpdateProfile from "../../page/Profile/ModalUpdateProfile";

const Popup = () => {
  const popup = useSelector((state) => state.popupSlice?.popup);
  const modalFilterKey = useSelector((state) => state.homeSlice.modalKey);

  switch (popup) {
    case POPUP_NAME.LOGIN:
      return <Login />;
    case POPUP_NAME.REGISTER:
      return <Register />;
    case POPUP_NAME.EDIT_PROFILE:
      return <ModalUpdateProfile />;
    case POPUP_NAME.ROOMFILTER:
      return <ModalFilterSlider key={modalFilterKey} />;
    case null:
    default:
      return null;
  }
};

export default React.memo(Popup);
