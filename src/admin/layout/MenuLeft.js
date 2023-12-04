import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { adminRoute } from "../route/adminRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRotateBack, faHouse, faLocation, faTicket } from "@fortawesome/free-solid-svg-icons";
import { userRoute } from "../../user/route/userRoute";

export default function MenuLeft() {
  const [selectKey, setSelectKey] = useState(null);
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname) {
      switch (pathname) {
        case adminRoute.room.path:
          handleSelectedKey(2)
          break
        case adminRoute.location.path:
          handleSelectedKey(3)
          break
        case adminRoute.booking.path:
          handleSelectedKey(4)
          break
        default:
          handleSelectedKey(1)
          break
      }
    }
  }, [pathname])

  const handleSelectedKey = (index) => {
    setSelectKey([`${index}`])
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectKey}
      selectedKeys={selectKey}
      items={[
        {
          key: "1",
          label: <NavLink to={adminRoute.user.path}>Người dùng</NavLink>,
          icon: <FontAwesomeIcon icon={faUser} />
        },
        {
          key: "2",
          label: <NavLink to={adminRoute.room.path}>Quản lý phòng</NavLink>,
          icon: <FontAwesomeIcon icon={faHouse} />
        },
        {
          key: "3",
          label: <NavLink to={adminRoute.location.path}>Quản lý vị trí</NavLink>,
          icon: <FontAwesomeIcon icon={faLocation} />
        },
        {
          key: "4",
          label: <NavLink to={adminRoute.booking.path}>Quản lý đặt phòng</NavLink>,
          icon: <FontAwesomeIcon icon={faTicket} />
        },
        {
          type: 'divider',
          style: { borderColor: 'white' }
        },
        {
          key: "5",
          label: <NavLink to={userRoute.home.path}>Trang chủ</NavLink>,
          icon: <FontAwesomeIcon icon={faArrowRotateBack} />
        },
      ]}
    />
  );
}
