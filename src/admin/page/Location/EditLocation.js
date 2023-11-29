import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { locationServ } from "../../api/api";
import * as yup from "yup";
import { message } from "antd";
const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  tenViTri: yup.string().required("Vui lòng nhập vị trí"),
  tinhThanh: yup.string().required("Vui lòng nhập tỉnh thành"),
  quocGia: yup.string().required("Vui lòng nhập quốc gia"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});
export default function EditLocation({ setIsOpen, isOpen, editData, getData }) {
  const methods = useForm({
    defaultValues: {
      id: 0,
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

  const onSubmit = (values) => {
    const { id, ...data } = values;
    locationServ
      .editLocation(id, data)
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
        id: editData.id,
        tenViTri: editData.tenViTri,
        tinhThanh: editData.tinhThanh,
        quocGia: editData.quocGia,
        hinhAnh: editData.hinhAnh,
      });
    }
  }, [editData, reset]);
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
                    Cập nhật vị trí
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          disabled
                          type="number"
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
