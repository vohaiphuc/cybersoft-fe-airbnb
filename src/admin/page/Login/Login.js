import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./asset/style.scss";
import { userServ } from "../../api/api";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/adminSlice";
import { userLocalStorage } from "../../api/localService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;
  const onSubmit = (values) => {
    userServ
      .login(values)
      .then((res) => {
        message.success("Đăng nhập thành công");
        dispatch(setLogin(res.data.content));
        userLocalStorage.set(res.data.content);
        navigate("/admin/user");
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại");
      });
  };
  return (
    <>
      <div className="form-content">
        <div className="container">
          <h1>Đăng Nhập Admin</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="relative z-0 w-full mb-8 group mt-5">
              <input
                type="text"
                name="email"
                class={`block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=""
                onChange={(e) => setValue("email", e.target.value)}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group mt-5">
              <input
                type="password"
                name="password"
                class={`block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=""
                onChange={(e) => setValue("password", e.target.value)}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mật khẩu
              </label>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
