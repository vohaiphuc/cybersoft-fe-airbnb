import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Popover } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../api/localService";
const { Header } = Layout;
export default function Headers() {
  const { user } = useSelector((state) => state.adminSlice);
  console.log(user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    userLocalStorage.remove();
    window.location.href = "/admin";
  };

  return (
    <Header
      style={{
        padding: "0 50px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      {user ? (
        <div>
          <Button type="primary" danger className="mr-5">
            {user.user.name}
          </Button>
          <Button type="primary" danger onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      ) : (
        <Button type="primary" danger>
          <Link to="/admin/login">Login</Link>
        </Button>
      )}
    </Header>
  );
}
