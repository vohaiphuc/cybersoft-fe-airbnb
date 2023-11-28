import React from "react";
import { Helmet } from "react-helmet";
import StickyInfo from "../../component/Profile/Sticky";
import Info from "../../component/Profile/Info";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../redux/popupSlice";
import { POPUP_NAME } from "../../constants/popup";
import "./asset/style.scss";
import TicketHistory from "./TicketHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userSlice?.user || {});
  const handleOpenPopupUpdate = () => {
    dispatch(setPopup({ popup: POPUP_NAME.EDIT_PROFILE }));
  };

  if (!user?.id) return null;

  return (
    <div className="">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile page of Airbnb" />
      </Helmet>
      <div className="flex flex-wrap py-4 md:py-6">
        <div className="w-full md:w-1/3">
          <StickyInfo />
        </div>
        <div className="w-full md:w-2/3">
          <div className="md:py-0 py-4 px-0 lg:px-10">
            <Button
              onClick={handleOpenPopupUpdate}
              type="outline"
              className="border-red-500 hover:bg-red-400 transition hover:text-white space-x-2"
            >
              <FontAwesomeIcon icon={faEdit} />
              Chỉnh sửa thông tin
            </Button>
          </div>
          <Info />
        </div>
        <TicketHistory user={user} />
      </div>
    </div>
  );
}
