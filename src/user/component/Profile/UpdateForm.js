import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/userSlice";
import dayjs from "dayjs";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { validatePhoneNumber } from "../../page/Register/asset/utils";
import Logo from "../Logo";

const UpdateForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userSlice?.user);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const { birthday, name, email, phone, gender, id, role } = user || {};
  const dateFormat = "DD/MM/YYYY";
  const onFinish = (values) => {
    const { birthday, name, email, phone, gender } = values;
    const formattedBirthday = dayjs(birthday).format(dateFormat);
    const data = {
      birthday: formattedBirthday,
      name,
      email,
      phone,
      gender,
      id: id,
      role,
    };

    dispatch(
      updateProfile({
        id,
        profileData: data,
      })
    );
  };

  const handleValuesChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  if (!user?.id) return null;

  return (
    <Form
      className="w-full form-register"
      layout="vertical"
      name="register"
      initialValues={{
        birthday: dayjs(birthday || "01/01/2001", dateFormat),
        name: name,
        email: email,
        phone: phone,
        gender: gender ? "Nam" : "Nữ",
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
          <h1>Cập nhật thông tin</h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 gap-x-4 gap-y-1">
        <div className="mb-1">
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                message: "Please input your username!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<UserOutlined />} placeholder="Username..." />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                message: "Please input your email!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input disabled prefix={<MailOutlined />} placeholder="Email..." />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                validator: validatePhoneNumber,
                message: "Please input your phone number!",
              },
            ]}
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone..." />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Birthday"
            name="birthday"
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <DatePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-[0.3rem] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              format={dateFormat}
            />
          </Form.Item>
        </div>
        <div className="mb-1">
          <Form.Item
            label="Gender"
            name="gender"
            hasFeedback
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              disabled={!isFormDirty}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default React.memo(UpdateForm);
