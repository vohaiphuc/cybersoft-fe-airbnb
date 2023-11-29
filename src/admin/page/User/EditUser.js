import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Fragment, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userServ } from "../../api/api";
import * as yup from "yup";
import { message, DatePicker, Select } from "antd";
import moment from "moment";
const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  name: yup.string().required("Vui lòng nhập tên tài khoản"),
  email: yup
    .string()
    .email("Định dạng email không đúng")
    .required("Vui lòng nhập email"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  birthday: yup.string().required("Vui lòng nhập ngày sinh nhật"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  role: yup.string().required("Vui lòng nhập vai trò"),
});
export default function EditUser({ setIsOpen, isOpen, editUser, getData }) {
  const methods = useForm({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      birthday: null,
      gender: " ",
      role: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  const { id } = editUser;

  function closeModal() {
    setIsOpen(false);
  }
  const formattedGender = editUser.gender ? "Nam" : "Nữ";
  useEffect(() => {
    if (editUser) {
      reset({
        id: editUser.id,
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        birthday: editUser.birthday,
        gender: editUser.gender,
        role: editUser.role,
      });
    }
  }, [editUser, reset]);

  const onSubmit = (values) => {
    const formattedValues = {
      ...values,
      gender: values.gender === "Nam" ? true : false,
      birthday: moment(values.birthday).format("DD/MM/YYYY"),
    };
    userServ
      .editUser(id, formattedValues)
      .then((res) => {
        message.success("Cập nhật người dùng thành công");
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        message.error("Cập nhật người dùng thất bại");
        setIsOpen(false);
      });
  };
  const handleBirthday = (dateString) => {
    setValue("birthday", dateString);
  };
  const handleGender = (gender) => {
    setValue("gender", gender);
  };
  const handleRole = (role) => {
    setValue("role", role);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-white mb-6 text-center"
                  >
                    Cập nhật người dùng
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          disabled
                          name="id"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
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
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Tên tài khoản
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Email
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="phone"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Số điện thoại
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group flex justify-between items-center">
                        <div className="flex w-1/2 flex-col mr-6">
                          <DatePicker
                            name="birthday"
                            defaultValue={moment(
                              editUser.birthday,
                              "DD/MM/YYYY"
                            )}
                            onChange={(date, dateString) =>
                              handleBirthday(dateString)
                            }
                            className="w-full mt-5"
                          />
                          {errors.birthday && (
                            <p className="text-red-500">
                              {errors.birthday.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Ngày sinh nhật
                          </label>
                        </div>
                        <div className="flex w-1/2 flex-col ">
                          <Select
                            className="w-full mt-5"
                            defaultValue={formattedGender}
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
                          {errors.gender && (
                            <p className="text-red-500">
                              {errors.gender.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Giới tính
                          </label>
                        </div>
                      </div>
                      <div className="relative z-0 w-1/3 mb-6 group flex">
                        <Select
                          className="w-full mt-5"
                          defaultValue={editUser.role}
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
                        />
                        {errors.role && (
                          <p className="text-red-500">{errors.role.message}</p>
                        )}
                        <label className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Vai trò
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Cập nhật
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Đóng
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
