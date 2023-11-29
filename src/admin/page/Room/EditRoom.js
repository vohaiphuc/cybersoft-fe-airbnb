import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { roomServ } from "../../api/api";
import * as yup from "yup";
import { Checkbox, message } from "antd";
const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  tenPhong: yup.string().required("Vui lòng nhập tên phòng"),
  khach: yup.number().required("Vui lòng nhập số lượng khách"),
  phongNgu: yup.number().required("Vui lòng nhập phòng ngủ"),
  giuong: yup.number().required("Vui lòng nhập giường"),
  phongTam: yup.number().required("Vui lòng nhập phòng tắm"),
  moTa: yup.string().required("Vui lòng nhập mô tả"),
  giaTien: yup.number().required("Vui lòng nhập giá tiền"),
  mayGiat: yup.boolean().required("Vui lòng nhập máy giặt"),
  banLa: yup.boolean().required("Vui lòng nhập ban la"),
  tivi: yup.boolean().required("Vui lòng nhập tivi"),
  dieuHoa: yup.boolean().required("Vui lòng nhập điều hòa"),
  wifi: yup.boolean().required("Vui lòng nhập wifi"),
  bep: yup.boolean().required("Vui lòng nhập bếp"),
  doXe: yup.boolean().required("Vui lòng nhập đỗ xe"),
  hoBoi: yup.boolean().required("Vui lòng nhập hồ bơi"),
  banUi: yup.boolean().required("Vui lòng nhập bàn ủi"),
  maViTri: yup.number().required("Vui lòng nhập mã vị trí"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});
export default function EditRoom({ getData, isOpen, editData, setIsOpen }) {
  const methods = useForm({
    defaultValues: {
      id: 0,
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: 0,
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
    watch,
  } = methods;
  function closeModal() {
    setIsOpen(false);
  }
  const { id } = editData;
  const onSubmit = (values) => {
    console.log(values);
    roomServ
      .editRoom(id, values)
      .then(() => {
        message.success("Cập nhật phòng thành công");
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        message.error("Cập nhật phòng thất bại");
        console.log(err);
      });
    setIsOpen(false);
  };
  useEffect(() => {
    if (editData) {
      reset({
        id: editData.id,
        tenPhong: editData.tenPhong,
        khach: editData.khach,
        phongNgu: editData.phongNgu,
        giuong: editData.giuong,
        phongTam: editData.phongTam,
        moTa: editData.moTa,
        giaTien: editData.giaTien,
        mayGiat: editData.mayGiat,
        banLa: editData.banLa,
        tivi: editData.tivi,
        dieuHoa: editData.dieuHoa,
        wifi: editData.wifi,
        bep: editData.bep,
        doXe: editData.doXe,
        hoBoi: editData.hoBoi,
        banUi: editData.banUi,
        maViTri: editData.maViTri,
        hinhAnh: editData.hinhAnh,
      });
    }
  }, [editData, reset]);
  const onChange = (e, fieldName) => {
    setValue(fieldName, e.target.checked);
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
                    Cập nhật phòng
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex justify-between">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            disabled
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
                            name="tenPhong"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            onChange={(e) =>
                              setValue("tenPhong", e.target.value)
                            }
                            {...register("tenPhong")}
                          />
                          {errors.tenPhong && (
                            <p className="text-red-500">
                              {errors.tenPhong.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tên Phòng
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="number"
                            name="khach"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("khach", e.target.value)}
                            {...register("khach")}
                          />
                          {errors.khach && (
                            <p className="text-red-500">
                              {errors.khach.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Khách
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="phongNgu"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("phongNgu", e.target.value)
                            }
                            {...register("phongNgu")}
                          />
                          {errors.phongNgu && (
                            <p className="text-red-500">
                              {errors.phongNgu.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phòng Ngủ
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="number"
                            name="giuong"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("giuong", e.target.value)}
                            {...register("giuong")}
                          />
                          {errors.giuong && (
                            <p className="text-red-500">
                              {errors.giuong.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Giường
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="phongTam"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("phongTam", e.target.value)
                            }
                            {...register("phongTam")}
                          />
                          {errors.phongTam && (
                            <p className="text-red-500">
                              {errors.phongTam.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phòng Tắm
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="moTa"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("moTa", e.target.value)}
                            {...register("moTa")}
                          />
                          {errors.moTa && (
                            <p className="text-red-500">
                              {errors.moTa.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mô tả
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="giaTien"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("giaTien", e.target.value)
                            }
                            {...register("giaTien")}
                          />
                          {errors.giaTien && (
                            <p className="text-red-500">
                              {errors.giaTien.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Giá tiền
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-around items-center">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            name="mayGiat"
                            checked={watch("mayGiat")}
                            onChange={(e) => onChange(e, "mayGiat")}
                            className="text-white"
                          >
                            Máy giặt
                          </Checkbox>
                          {errors.mayGiat && (
                            <p className="text-red-500">
                              {errors.mayGiat.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("banLa")}
                            name="banLa"
                            onChange={(e) => onChange(e, "banLa")}
                            className="text-white"
                          >
                            Bàn là
                          </Checkbox>
                          {errors.banLa && (
                            <p className="text-red-500">
                              {errors.banLa.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("tivi")}
                            name="tivi"
                            onChange={(e) => onChange(e, "tivi")}
                            className="text-white"
                          >
                            Tivi
                          </Checkbox>
                          {errors.tivi && (
                            <p className="text-red-500">
                              {errors.tivi.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("dieuHoa")}
                            name="dieuHoa"
                            onChange={(e) => onChange(e, "dieuHoa")}
                            className="text-white"
                          >
                            Điều hòa
                          </Checkbox>
                          {errors.dieuHoa && (
                            <p className="text-red-500">
                              {errors.dieuHoa.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("wifi")}
                            name="wifi"
                            onChange={(e) => onChange(e, "wifi")}
                            className="text-white"
                          >
                            Wifi
                          </Checkbox>
                          {errors.wifi && (
                            <p className="text-red-500">
                              {errors.wifi.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("bep")}
                            name="bep"
                            onChange={(e) => onChange(e, "bep")}
                            className="text-white"
                          >
                            Bếp
                          </Checkbox>
                          {errors.bep && (
                            <p className="text-red-500">{errors.bep.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("doXe")}
                            name="doXe"
                            onChange={(e) => onChange(e, "doXe")}
                            className="text-white"
                          >
                            Đỗ xe
                          </Checkbox>
                          {errors.doXe && (
                            <p className="text-red-500">
                              {errors.doXe.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("hoBoi")}
                            name="hoBoi"
                            onChange={(e) => onChange(e, "hoBoi")}
                            className="text-white"
                          >
                            Hồ bơi
                          </Checkbox>
                          {errors.hoBoi && (
                            <p className="text-red-500">
                              {errors.hoBoi.message}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group mr-3">
                          <Checkbox
                            checked={watch("banUi")}
                            name="banUi"
                            onChange={(e) => onChange(e, "banUi")}
                            className="text-white"
                          >
                            Bàn ủi
                          </Checkbox>
                          {errors.banUi && (
                            <p className="text-red-500">
                              {errors.banUi.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="maViTri"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("maViTri", e.target.value)
                            }
                            {...register("maViTri")}
                          />
                          {errors.maViTri && (
                            <p className="text-red-500">
                              {errors.maViTri.message}
                            </p>
                          )}
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mã vị trí
                          </label>
                        </div>
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
                        className=" mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Cập nhật
                      </button>
                      <button
                        type="button"
                        className=" inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
