import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { bookingRoomServ } from "../../api/api";
import * as yup from "yup";
import { message, DatePicker } from "antd";
const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  maPhong: yup.string().required("Vui lòng nhập mã phòng"),
  ngayDen: yup.string().required("Vui lòng nhập ngày đến"),
  ngayDi: yup.string().required("Vui lòng nhập ngày đi "),
  soLuongKhach: yup.string().required("Vui lòng nhập số lượng khách"),
  maNguoiDung: yup.string().required("Vui lòng nhập mã người dùng"),
});
export default function AddBookingRoom({ getData }) {
  let [isOpen, setIsOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      id: 0,
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
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
  const handleDateStart = (dateString) => {
    setValue("ngayDen", dateString);
  };
  const handleDateEnd = (dateString) => {
    setValue("ngayDi", dateString);
  };
  const onSubmit = (values) => {
    bookingRoomServ
      .addBookingRoom(values)
      .then((res) => {
        console.log(res.data.content);
        getData();
        message.success("Add booking room success fully");
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
          Thêm đặt phòng
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
                    Add BookingRoom
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="relative z-0 w-full mb-6 group mr-3">
                        <input
                          type="number"
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
                          name="maPhong"
                          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                          onChange={(e) => setValue("maPhong", e.target.value)}
                          {...register("maPhong")}
                        />
                        {errors.maPhong && (
                          <p className="text-red-500">
                            {errors.maPhong.message}
                          </p>
                        )}
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Mã phòng
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group ">
                        <div className="flex w-full flex-col">
                          <DatePicker
                            name="ngayDen"
                            onChange={(date, dateString) =>
                              handleDateStart(dateString)
                            }
                            className="w-full mt-5"
                          />
                          {errors.ngayDen && (
                            <p className="text-red-500">
                              {errors.ngayDen.message}
                            </p>
                          )}
                        </div>
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Ngày đến
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <div className="flex w-full flex-col">
                          <DatePicker
                            name="ngayDi"
                            onChange={(date, dateString) =>
                              handleDateEnd(dateString)
                            }
                            className="w-full mt-5"
                          />
                          {errors.ngayDi && (
                            <p className="text-red-500">
                              {errors.ngayDi.message}
                            </p>
                          )}
                        </div>
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Ngày đi
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="soLuongKhach"
                          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                          onChange={(e) =>
                            setValue("soLuongKhach", e.target.value)
                          }
                          {...register("soLuongKhach")}
                        />
                        {errors.soLuongKhach && (
                          <p className="text-red-500">
                            {errors.soLuongKhach.message}
                          </p>
                        )}
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Số lượng khách
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="maNguoiDung"
                          class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                          onChange={(e) =>
                            setValue("maNguoiDung", e.target.value)
                          }
                          {...register("maNguoiDung")}
                        />
                        {errors.maNguoiDung && (
                          <p className="text-red-500">
                            {errors.maNguoiDung.message}
                          </p>
                        )}
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Mã người dùng
                        </label>
                      </div>
                      <button
                        type="submit"
                        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Thêm đặt phòng
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
