import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../api/localService";
const { Header } = Layout;
export default function Headers({ setCollapsed, collapsed }) {
  const { user } = useSelector((state) => state.adminSlice);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          <Button type="text" danger className="mr-2">
            {user.user.name}
          </Button>
          <Button type="primary" danger onClick={() => handleLogout()}>
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Button type="primary" danger>
          <Link to="/admin/login">Đăng nhập</Link>
        </Button>
      )}
    </Header>
  );
}
