import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../api/localService";
import { adminRoute } from "../route/adminRoute";
const { Header } = Layout;
export default function Headers({ setCollapsed, collapsed }) {
  const { user } = useSelector((state) => state.adminSlice);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    userLocalStorage.remove();
    window.location.href = adminRoute.home.path;
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
          <span className="mr-2 text-[#ff4d4f] font-semibold">
            {user.user.name}
          </span>
          <Button type="primary" danger onClick={() => handleLogout()}>
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Button type="primary" danger>
          <Link to={adminRoute.login.path}>Đăng nhập</Link>
        </Button>
      )}
    </Header>
  );
}
