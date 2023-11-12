import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Dropdown } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setPopup } from "../../redux/popupSlice";
import { POPUP_NAME } from "../../constants/popup";

export default function NavBar() {
  const dispatch = useDispatch();
  const handleToggleAuth = (type) => {
    if (type === "login") {
      dispatch(setPopup({ popup: POPUP_NAME.LOGIN }));
      return;
    }
    dispatch(setPopup({ popup: POPUP_NAME.REGISTER }));
  };

  const renderLoginButton = (type) => {
    return (
      <Button
        className="text-black w-full h-full shadow-none border-none text-left hover:!border-none hover:!bg-transparent p-0 hover:!text-black"
        onClick={() => handleToggleAuth(type)}
      >
        {type === "login" ? "Đăng nhập" : "Đăng ky"}
      </Button>
    );
  };

  const items = [
    {
      label: renderLoginButton("register"),
      // label: <NavLink to={userRoute.register.path}>Đăng ký</NavLink>,
      key: "0",
    },
    {
      label: renderLoginButton("login"),
      // label: <NavLink to={userRoute.login.path}>Đăng nhập</NavLink>,
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
          <Avatar
            src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
            size={30}
          />
        </div>
      </Dropdown>
    </>
  );
}
