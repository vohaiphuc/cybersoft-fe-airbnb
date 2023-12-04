import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Dropdown } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { NavLink, useNavigate } from "react-router-dom";
import { userRoute } from "../../route/userRoute";
import { POPUP_NAME, usePopup } from "../Popup/hook/usePopup";
import AvatarIcon from "./asset/user.jpg"
import { adminRoute } from "../../../admin/route/adminRoute";

export default function NavBar() {
  const navigate = useNavigate()
  const popup = usePopup()
  const { user } = useSelector((state) => state.userSlice) || {};
  const { token } = user || {};
  const handleLogOut = () => {
    userLocalStorage.remove();
    window.location.reload();
  };
  const handleToggleAuth = (type) => {
    if (type === "login") {
      popup.open(POPUP_NAME.LOGIN)
      return;
    } else if (type === "register") {
      popup.open(POPUP_NAME.REGISTER)
      return;
    }
    navigate(userRoute.account.path)
  };

  const renderAuthButton = (type) => {
    let buttonText = ""
    switch (type) {
      case "login":
        buttonText = "Đăng nhập"
        break
      case "register":
        buttonText = "Đăng ký"
        break
      default:
        buttonText = "Thông tin cá nhân"
        break
    }
    return (
      <Button
        className="text-black w-full h-full shadow-none border-none text-left hover:!border-none hover:!bg-transparent p-0 hover:!text-black"
        onClick={() => handleToggleAuth(type)}
      >
        {buttonText}
      </Button>
    );
  };

  const renderLogoutButton = () => {
    return (
      <Button
        className="text-black w-full h-full shadow-none border-none text-left hover:!border-none hover:!bg-transparent p-0 hover:!text-black"
        onClick={handleLogOut}
      >
        Đăng xuất
      </Button>
    );
  };

  const items = [
    token
      ? { label: "Chuyến đi", key: "0" }
      : {
        label: renderAuthButton("register"),
        key: "0",
      },
    token
      ? { label: renderAuthButton(""), key: "1" }
      : {
        label: renderAuthButton("login"),
        key: "1",
      },
    {
      type: "divider",
    },
    {
      label: "Cho thuê nhà",
      key: "3",
    },
    {
      label: "Tổ chức trải nghiệm",
      key: "4",
    },
    {
      label: "Trợ giúp",
      key: "5",
    },
    token && { label: renderLogoutButton(), key: "6" },
  ];

  return (
    <>
      <button className="py-1 px-3">
        <NavLink to={adminRoute.home.path} className="font-semibold">
          Trở thành chủ nhà
        </NavLink>
      </button>
      <div className="mr-6 ml-3 cursor-pointer">
        <FontAwesomeIcon icon={faGlobe} />
      </div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="topRight"
        overlayStyle={{ width: "200px" }}
      >
        <div className="profile space-x-3 flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faBars} />
          <Avatar
            src={AvatarIcon}
            size={30}
          />
        </div>
      </Dropdown>
    </>
  );
}
