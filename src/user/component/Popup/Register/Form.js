import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { validatePhoneNumber } from "./asset/utils";
import dayjs from "dayjs";
import {
  MailOutlined,
  PhoneOutlined,
  UnlockOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { registerUser } from "../../../redux/userSlice";
import Logo from "../../Logo";
import { POPUP_NAME, usePopup } from "../hook/usePopup";

const FormRegister = () => {
  const dispatch = useDispatch();
  const popup = usePopup();
  const { loading } = useSelector((state) => state.userSlice);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const dateFormat = "DD/MM/YYYY";

  const onFinish = (values) => {
    const { birthday, name, email, phone, gender, password, address } = values;
    const formattedBirthday = dayjs(birthday).format(dateFormat);
    dispatch(
      registerUser({
        birthday: formattedBirthday,
        name,
        email,
        phone,
        gender,
        password,
        address,
      })
    );
  };

  const handleValuesChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  return (
    <Form
      className="w-full form-register"
      layout="vertical"
      name="register"
      initialValues={{
        birthday: undefined,
        name: "",
        email: "",
        phone: "",
        gender: undefined,
        password: "",
        address: "",
      }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <div className="mb-4 relative">
        <div className="mb-2 md:absolute top-0 left-0">
          <Logo />
        </div>
        <div className="hidden md:block text-center font-semibold text-3xl text-blue-800">
          <h1>Đăng ký tài khoản</h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 gap-x-4 gap-y-1">
        <div className="mb-1">
          <Form.Item
            label="Tài khoản"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tài khoản!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<UserOutlined />} placeholder="Tài khoản..." />
          </Form.Item>
        </div>
        <div className="mb-1">
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<MailOutlined />} placeholder="Email..." />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                validator: validatePhoneNumber,
                message: "Nhập số điện thoại!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại..." />
          </Form.Item>
        </div>
        <div className="mb-1">
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input.Password
              prefix={<UnlockOutlined />}
              placeholder="Mật khẩu..."
            />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="Địa chỉ..." />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Chọn ngày sinh!",
              },
            ]}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <DatePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-[0.3rem] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ngày sinh..."
              format={dateFormat}
            />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "Chọn giới tính!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Giới tính"
              options={[
                {
                  value: true,
                  label: "Nam",
                },
                {
                  value: false,
                  label: "Nữ",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div />
        <div className="col-span-2 text-center">
          <Form.Item>
            <Button
              className="text-white focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-500 disabled:pointer-events-none hover:bg-red-800 duration-300 w-1/2"
              htmlType="submit"
              disabled={!isFormDirty || loading}
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </div>
        <div
          className="col-span-2 text-center text-rose-600 hover:text-rose-500 hover:underline underline-offset-4 tracking-wider duration-200 underline cursor-pointer"
          onClick={() => popup.open(POPUP_NAME.LOGIN)}
        >
          Đăng nhập
        </div>
      </div>
    </Form>
  );
};

export default React.memo(FormRegister);
