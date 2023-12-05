import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { locationServ } from "../../api/api";
import * as yup from "yup";
import { message } from "antd";
import FormTemplate from "../components/FormTemplate";
const validationSchema = yup.object().shape({
  tenViTri: yup.string().required("Vui lòng nhập vị trí"),
  tinhThanh: yup.string().required("Vui lòng nhập tỉnh thành"),
  quocGia: yup.string().required("Vui lòng nhập quốc gia"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});
export default function EditLocation({ setIsOpen, isOpen, editData, getData }) {
  const methods = useForm({
    defaultValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = methods;
  function closeModal() {
    setIsOpen(false);
  }
  const { id } = editData;
  const onSubmit = (values) => {
    locationServ
      .editLocation(id, values)
      .then(() => {
        message.success("Cập nhật thành công");
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        setIsOpen(false);
        message.success("Cập nhật thất bại");
      });
  };
  useEffect(() => {
    if (editData) {
      reset({
        tenViTri: editData.tenViTri,
        tinhThanh: editData.tinhThanh,
        quocGia: editData.quocGia,
        hinhAnh: editData.hinhAnh,
      });
    }
  }, [editData, reset]);
  return (
    <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Cập nhật vị trí">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="tenViTri"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            onChange={(e) => setValue("tenViTri", e.target.value)}
            {...register("tenViTri")}
          />
          {errors.tenViTri && (
            <p className="text-red-500">
              {errors.tenViTri.message}
            </p>
          )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Tên vị trí
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="tinhThanh"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) =>
              setValue("tinhThanh", e.target.value)
            }
            {...register("tinhThanh")}
          />
          {errors.tinhThanh && (
            <p className="text-red-500">
              {errors.tinhThanh.message}
            </p>
          )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Tỉnh thành
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="quocGia"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setValue("quocGia", e.target.value)}
            {...register("quocGia")}
          />
          {errors.quocGia && (
            <p className="text-red-500">
              {errors.quocGia.message}
            </p>
          )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Quốc gia
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="hinhAnh"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setValue("hinhAnh", e.target.value)}
            {...register("hinhAnh")}
          />
          {errors.hinhAnh && (
            <p className="text-red-500">
              {errors.hinhAnh.message}
            </p>
          )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Hình ảnh
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
    </FormTemplate>
  );
}
