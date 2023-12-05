import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userServ } from "../../api/api";
import * as yup from "yup";
import { message, DatePicker, Select } from "antd";
import ErrorMessage from "../components/ErrorMessage";
import FormTemplate from "../components/FormTemplate";
const validationSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên tài khoản"),
  email: yup
    .string()
    .email("Định dạng email không đúng")
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  birthday: yup
    .string("Vui lòng nhập ngày sinh nhật dưới dạng DD/MM/YYYY")
    .required("Vui lòng nhập ngày sinh nhật"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  role: yup.string().required("Vui lòng nhập vai trò"),
});
export default function AddUser({ getData }) {
  let [isOpen, setIsOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: null,
      gender: "",
      role: "ADMIN",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    trigger,
  } = methods;

  useEffect(() => {
    register('birthday', { required: 'Vui lòng chọn!' });
    register('gender', { required: 'Vui lòng chọn!' });
    register('role', { required: 'Vui lòng chọn!' });
  }, [register]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = (values) => {
    const formattedValues = {
      ...values,
      gender: values.gender === "Nam" ? true : false,
    };
    userServ
      .addUser(formattedValues)
      .then(() => {
        message.success("Thêm người dùng thành công");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.error("Không có quyền thêm người dùng");
      });
    setIsOpen(false);
  };
  const handleBirthday = (dateString) => {
    setValue("birthday", dateString);
    trigger('birthday')
  };
  const handleGender = (gender) => {
    setValue("gender", gender);
    trigger('gender')
  };
  const handleRole = (role) => {
    setValue("role", role);
    trigger('role')
  };
  return (
    <>
      <div className="items-center justify-center mb-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-red-400 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
        >
          Thêm quản trị viên
        </button>
      </div>
      <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm người dùng">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="modal-add-user">
          <div className="hidden relative z-0 w-full mb-6 group">
            <input
              disabled
              type="text"
              name="id"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("id", e.target.value)}
              {...register("id")}
            />
            {errors.id && (
              <p className="text-red-500">{errors.id.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("name", e.target.value)}
              {...register("name")}
            />
            <ErrorMessage err={errors.name} />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tên tài khoản
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              onChange={(e) => setValue("email", e.target.value)}
              {...register("email")}
            />
            <ErrorMessage err={errors.email} />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="new-password"
              onChange={(e) => setValue("password", e.target.value)}
              {...register("password")}
            />
            <ErrorMessage err={errors.password} />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mật khẩu
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setValue("phone", e.target.value)}
              {...register("phone")}
            />
            <ErrorMessage err={errors.phone} />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Số điện thoại
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group flex justify-between items-center">
            <div className="flex w-1/2 flex-col mr-6">
              <DatePicker
                name="birthday"
                placeholder="DD/MM/YYYY"
                onChange={(date, dateString) =>
                  handleBirthday(dateString)
                }
                className="w-full mt-5 border-0 "
                format="DD/MM/YYYY"
              />
              <ErrorMessage err={errors.birthday} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ngày sinh nhật
              </label>
            </div>
            <div className="flex w-1/2 flex-col ">
              <Select
                className="w-full mt-5 "
                placeholder="Chọn giới tính"
                name="gender"
                onChange={handleGender}
                allowClear
                options={[
                  {
                    value: "Nam",
                    label: "Nam",
                  },
                  {
                    value: "Nữ",
                    label: "Nữ",
                  },
                ]}
              />
              <ErrorMessage err={errors.gender} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Giới tính
              </label>
            </div>
          </div>
          <div className="relative z-0 w-1/3 mb-6 group ">
            <Select
              className="w-full mt-5"
              placeholder="Vai trò"
              name="role"
              onChange={handleRole}
              allowClear
              options={[
                {
                  value: "ADMIN",
                  label: "ADMIN",
                },
                {
                  value: "USER",
                  label: "USER",
                },
              ]}
              defaultValue="ADMIN"
            />
            <ErrorMessage err={errors.role} />
            <label className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Vai trò
            </label>
          </div>
          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Đóng
          </button>
        </form>
      </FormTemplate>
    </>
  );
}
