import "./asset/style.scss";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/userSlice";
import Logo from "../../Logo";
import { POPUP_NAME, usePopup } from "../hook/usePopup";

const FormLogin = () => {
  const dispatch = useDispatch();
  const popup = usePopup();
  const { loading } = useSelector((state) => state.userSlice);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const onFinish = (values) => {
    const { email, password } = values || {};
    const data = { email, password };
    dispatch(loginUser(data));
    console.log(values);
  };

  const handleValuesChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  return (
    <Form
      className="w-full form-login"
      layout="vertical"
      name="login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <div className="relative mb-4">
        <div className="mb-2 md:absolute top-0 left-0">
          <Logo />
        </div>
        <div className="hidden lg:block font-semibold text-3xl text-blue-800 text-center">
          Đăng nhập
        </div>
      </div>
      <div>
        <div className="mb-2">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Nhập thông tin email!",
              },
            ]}
            hasFeedback
          >
            <Input au="true" prefix={<UserOutlined />} placeholder="Email..." />
          </Form.Item>
        </div>
        <div className="mb-6">
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<UnlockOutlined />}
              placeholder="Mật khẩu..."
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 items-center mb-6">
          <a
            aria-current="page"
            className="text-rose-700 hover:text-rose-500 hover:underline underline-offset-4 tracking-wider duration-200 active"
            href="/login"
          >
            Quên mật khẩu?
          </a>
          <Form.Item>
            <Button
              className="p-2 text-white focus:outline-none focus:ring-4 font-medium rounded-lg disabled:pointer-events-none text-sm text-center mr-2 w-full bg-red-500 hover:bg-red-800 duration-300"
              htmlType="submit"
              disabled={!isFormDirty || loading}
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </div>
        <div className="text-center">
          <div className="pb-3">
            Bạn không có tài khoản?
            <div
              className="text-rose-700 hover:text-rose-500 hover:underline underline-offset-4 tracking-wider duration-200 active pl-1 cursor-pointer"
              onClick={() => popup.open(POPUP_NAME.REGISTER)}
            >
              Đăng ký
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default React.memo(FormLogin);
