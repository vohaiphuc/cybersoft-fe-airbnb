import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Dropdown } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../redux/popupSlice";
import { POPUP_NAME } from "../../constants/popup";
import { userLocalStorage } from "../../api/localService";
import { Link } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice) || {};
  const { token } = user || {};
  const handleLogOut = () => {
    userLocalStorage.remove();
    window.location.reload();
  };
  const handleToggleAuth = (type) => {
    if (type === "login") {
      dispatch(setPopup({ popup: POPUP_NAME.LOGIN }));
      return;
    } else if (type === "register") {
      dispatch(setPopup({ popup: POPUP_NAME.REGISTER }));
      return;
    }
    dispatch(setPopup({ popup: POPUP_NAME.PROFILE }));
  };

  const renderAuthButton = (type) => {
    return (
      <Button
        className="text-black w-full h-full shadow-none border-none text-left hover:!border-none hover:!bg-transparent p-0 hover:!text-black"
        onClick={() => handleToggleAuth(type)}
      >
        {type === "login" ? "Đăng nhập" : "Đăng ký"}
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
      ? { label: <Link to="/booked-rooms">Chuyến đi</Link>, key: "0" }
      : {
          label: renderAuthButton("register"),
          key: "0",
        },
    token
      ? { label: <Link to="/profile">Thông tin cá nhân</Link>, key: "2" }
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
        <a href="#" className="font-semibold">
          Trở thành chủ nhà
        </a>
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
          {token && <span>{user?.user?.name}</span>}
          <Avatar
            src={
              user?.user?.avatar ||
              "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
            }
            size={30}
          />
        </div>
      </Dropdown>
    </>
  );
}
