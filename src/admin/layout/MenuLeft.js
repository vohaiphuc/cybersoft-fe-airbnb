import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
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
          icon: <UserOutlined />,
          label: <Link to="/admin/user">User</Link>,
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: <Link to="/admin/room">Quản lý phòng</Link>,
        },
      ]}
    />
  );
}
