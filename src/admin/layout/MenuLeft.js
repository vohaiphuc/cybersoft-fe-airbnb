import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
export default function MenuLeft() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          label: <Link to="/admin/user">User</Link>,
        },
        {
          key: "2",

          label: <Link to="/admin/room">Quản lý phòng</Link>,
        },
        {
          key: "3",

          label: <Link to="/admin/location">Quản lý vị trí</Link>,
        },
        {
          key: "4",

          label: <Link to="/admin/booking">Quản lý đặt phòng</Link>,
        },
      ]}
    />
  );
}
