import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { roomServ } from "../../api/api";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  id: yup.number().required("Id is required"),
  tenPhong: yup.string().required("Room name is required"),
  khach: yup.number().required("Guest is required"),
  phongNgu: yup.number().required("Bedroom is required"),
  giuong: yup.number().required("Phone is required"),
  phongTam: yup.number().required("Birthday is required"),
  moTa: yup.string().required("Gender is required"),
  giaTien: yup.number().required("Role is required"),
  mayGiat: yup.boolean().required("Role is required"),
  banLa: yup.boolean().required("Role is required"),
  tivi: yup.boolean().required("Role is required"),
  dieuHoa: yup.boolean().required("Role is required"),
  wifi: yup.boolean().required("Role is required"),
  bep: yup.boolean().required("Role is required"),
  doXe: yup.boolean().required("Role is required"),
  hoBoi: yup.boolean().required("Role is required"),
  banUi: yup.boolean().required("Role is required"),
  maViTri: yup.number().required("Role is required"),
  hinhAnh: yup.string().required("Role is required"),
});
export default function AddRoom({ getData }) {
  let [isOpen, setIsOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      id: 0,
      tenPhong: "",
      khach: null,
      phongNgu: null,
      giuong: null,
      phongTam: null,
      moTa: "",
      giaTien: null,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
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
  } = methods;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const onSubmit = (values) => {
    roomServ
      .addRoom(values)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false);
  };
  return (
    <>
      <div className="items-center justify-center mb-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-red-400 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
        >
          Thêm phòng
        </button>
      </div>
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
                    Add Room
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="id"
                            class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            onChange={(e) => setValue("id", e.target.value)}
                            {...register("id")}
                          />
                          {errors.id && (
                            <p className="text-red-500">{errors.id.message}</p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Id
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="tenPhong"
                            class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tên Phòng
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="number"
                            name="khach"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("khach", e.target.value)}
                            {...register("khach")}
                          />
                          {errors.khach && (
                            <p className="text-red-500">
                              {errors.khach.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Khách
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="phongNgu"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phòng Ngủ
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="number"
                            name="giuong"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("giuong", e.target.value)}
                            {...register("giuong")}
                          />
                          {errors.giuong && (
                            <p className="text-red-500">
                              {errors.giuong.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Giường
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="phongTam"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phòng Tắm
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="moTa"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("moTa", e.target.value)}
                            {...register("moTa")}
                          />
                          {errors.moTa && (
                            <p className="text-red-500">
                              {errors.moTa.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mô tả
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="giaTien"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Giá tiền
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="mayGiat"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("mayGiat", e.target.value)
                            }
                            {...register("mayGiat")}
                          />
                          {errors.mayGiat && (
                            <p className="text-red-500">
                              {errors.mayGiat.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Máy giặt
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="banLa"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("banLa", e.target.value)}
                            {...register("banLa")}
                          />
                          {errors.banLa && (
                            <p className="text-red-500">
                              {errors.banLa.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Ban la
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="tivi"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("tivi", e.target.value)}
                            {...register("tivi")}
                          />
                          {errors.tivi && (
                            <p className="text-red-500">
                              {errors.tivi.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Ti vi
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="dieuHoa"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) =>
                              setValue("dieuHoa", e.target.value)
                            }
                            {...register("dieuHoa")}
                          />
                          {errors.dieuHoa && (
                            <p className="text-red-500">
                              {errors.dieuHoa.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Điều hòa
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="wifi"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("wifi", e.target.value)}
                            {...register("wifi")}
                          />
                          {errors.wifi && (
                            <p className="text-red-500">
                              {errors.wifi.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Wifi
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="bep"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("bep", e.target.value)}
                            {...register("bep")}
                          />
                          {errors.bep && (
                            <p className="text-red-500">{errors.bep.message}</p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Bếp
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="doXe"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("doXe", e.target.value)}
                            {...register("doXe")}
                          />
                          {errors.doXe && (
                            <p className="text-red-500">
                              {errors.doXe.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Đỗ xe
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="hoBoi"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("hoBoi", e.target.value)}
                            {...register("hoBoi")}
                          />
                          {errors.hoBoi && (
                            <p className="text-red-500">
                              {errors.hoBoi.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Hồ bơi
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div class="relative z-0 w-full mb-6 group mr-3">
                          <input
                            type="text"
                            name="banUi"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setValue("banUi", e.target.value)}
                            {...register("banUi")}
                          />
                          {errors.banUi && (
                            <p className="text-red-500">
                              {errors.banUi.message}
                            </p>
                          )}
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Bàn ủi
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="number"
                            name="maViTri"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mã vị trí
                          </label>
                        </div>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="hinhAnh"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          onChange={(e) => setValue("hinhAnh", e.target.value)}
                          {...register("hinhAnh")}
                        />
                        {errors.hinhAnh && (
                          <p className="text-red-500">
                            {errors.hinhAnh.message}
                          </p>
                        )}
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Hình ảnh
                        </label>
                      </div>
                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
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
