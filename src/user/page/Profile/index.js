import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "antd";
import { useSelector } from "react-redux";
import "./asset/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import StickyProfile from "./StickyProfile";
import InfoProfile from "./InfoProfile";
import { POPUP_NAME, usePopup } from "../../component/Popup/hook/usePopup";
import TicketHistoryProfile from "./TicketHistoryProfile";
import { userLocalStorage } from "../../api/localService";
import useDevice from "../../hook/useDevice";

export default function Profile() {
  const popup = usePopup()
  const { isMobile } = useDevice()
  const { user } = useSelector((state) => state?.userSlice?.user || {});
  const handleOpenPopupUpdate = () => {
    popup.open(POPUP_NAME.EDIT_PROFILE)
  };
  const handleLogout = () => {
    userLocalStorage.remove()
    window.location.reload();
  }

  if (!user?.id) return null;

  return (
    <div className="">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile page of Airbnb" />
      </Helmet>
      <div className="flex flex-wrap py-4 md:py-6">
        <div className="w-full md:w-1/3">
          <StickyProfile />
        </div>
        <div className="w-full md:w-2/3">
          <div className="md:py-0 py-4 px-0 lg:px-10">
            <div className="flex items-center justify-between">
              <p className='text-2xl font-semibold'>Hồ sơ</p>
              <Button
                onClick={handleOpenPopupUpdate}
                type="outline"
                className="border-red-500 hover:bg-red-400 transition hover:text-white space-x-2"
              >
                <FontAwesomeIcon icon={faEdit} />
                Chỉnh sửa
              </Button>
            </div>
            <InfoProfile />
            {isMobile && (
              <button
                className="bg-black text-white rounded-3xl px-5 py-2 mt-5 w-full"
                onClick={handleLogout}>
                Đăng xuất
              </button>
            )}
            <TicketHistoryProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
