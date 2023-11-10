import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dropdown } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { userRoute } from "../../route/userRoute";
import FormLogin from "../../page/Login/Login";
import FormRegister from "../../page/Register/Register";

export default function NavBar() {
  const items = [
    {
      label: <FormRegister />,
      // label: <NavLink to={userRoute.register.path}>Đăng ký</NavLink>,
      key: "0",
    },
    {
      label: <FormLogin />,
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
