import React, { useState } from "react";
import "./asset/style.scss";
import MenuLeft from "./MenuLeft";
import Headers from "./Header";
import { Layout, theme } from "antd";
import Spinner from "../component/spinner/Spinner";
const { Sider, Content } = Layout;
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            src="https://www.theriver.asia/wp-content/uploads/2020/01/pngkey.com-airbnb-logo-png-605967.png"
            width="100%"
            height="100%"
          />
        </div>
        <MenuLeft />
      </Sider>
      <Layout>
        <Headers setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
