import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { roomServ } from "../../api/api";
import * as yup from "yup";
import { Checkbox, message } from "antd";
import ErrorMessage from "../components/ErrorMessage";
import FormTemplate from "../components/FormTemplate";
const validationSchema = yup.object().shape({
  tenPhong: yup.string().required("Vui lòng nhập tên phòng"),
  khach: yup.string().required("Vui lòng nhập số lượng khách"),
  phongNgu: yup.string().required("Vui lòng nhập phòng ngủ"),
  giuong: yup.string().required("Vui lòng nhập giường"),
  phongTam: yup.string().required("Vui lòng nhập phòng tắm"),
  moTa: yup.string().required("Vui lòng nhập mô tả"),
  giaTien: yup.string().required("Vui lòng nhập giá tiền"),
  mayGiat: yup.boolean().required("Vui lòng nhập máy giặt"),
  banLa: yup.boolean().required("Vui lòng nhập ban la"),
  tivi: yup.boolean().required("Vui lòng nhập tivi"),
  dieuHoa: yup.boolean().required("Vui lòng nhập điều hòa"),
  wifi: yup.boolean().required("Vui lòng nhập wifi"),
  bep: yup.boolean().required("Vui lòng nhập bếp"),
  doXe: yup.boolean().required("Vui lòng nhập đỗ xe"),
  hoBoi: yup.boolean().required("Vui lòng nhập hồ bơi"),
  banUi: yup.boolean().required("Vui lòng nhập bàn ủi"),
  maViTri: yup.string().required("Vui lòng nhập mã vị trí"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});
export default function EditRoom({ getData, editData, isOpen, setIsOpen }) {
  const methods = useForm({
    defaultValues: {
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

  const { id } = editData;
  const onSubmit = (values) => {
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
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (editData) {
      reset({
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
    <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Cập nhật phòng">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
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
            <ErrorMessage err={errors.tenPhong} />
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
            <ErrorMessage err={errors.khach} />
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
            <ErrorMessage err={errors.phongNgu} />
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
            <ErrorMessage err={errors.giuong} />
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
            <ErrorMessage err={errors.phongTam} />
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
            <ErrorMessage err={errors.moTa} />
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
            <ErrorMessage err={errors.giaTien} />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Giá tiền
            </label>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <CustomCheckbox name="mayGiat" title="Máy giặt" onchange={onChange} watch={watch} />
          <CustomCheckbox name="banLa" title="Bàn là" onchange={onChange} watch={watch} />
          <CustomCheckbox name="tivi" title="Tivi" onchange={onChange} watch={watch} />
        </div>
        <div className="flex justify-between items-center">
          <CustomCheckbox name="dieuHoa" title="Điều hòa" onchange={onChange} watch={watch} />
          <CustomCheckbox name="wifi" title="Wifi" onchange={onChange} watch={watch} />
          <CustomCheckbox name="bep" title="Bếp" onchange={onChange} watch={watch} />
        </div>
        <div className="flex justify-between items-center">
          <CustomCheckbox name="doXe" title="Đỗ xe" onchange={onChange} watch={watch} />
          <CustomCheckbox name="hoBoi" title="Hồ bơi" onchange={onChange} watch={watch} />
          <CustomCheckbox name="banUi" title="Bàn ủi" onchange={onChange} watch={watch} />
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
            <ErrorMessage err={errors.maViTri} />
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
          <ErrorMessage err={errors.hinhAnh} />
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
    </FormTemplate>
  );
}

const CustomCheckbox = ({ name, title, watch, onchange }) => {
  return <div className="relative z-0 w-full mb-6 group mr-3">
    <Checkbox
      checked={watch(name)}
      name={name}
      onChange={(e) => onchange(e, name)}
      className="text-white"
    >
      {title}
    </Checkbox>
  </div>
}
