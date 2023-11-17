import React from "react";
import { useSelector } from "react-redux";

const Info = () => {
  const { user } = useSelector((state) => state?.userSlice?.user) || {};
  const PROFILE_LIST = [
    {
      label: "Tên",
      value: user?.name,
    },
    {
      label: "Giới tính",
      value: user?.gender ? "Nam" : "Nữ",
    },
    {
      label: "Email",
      value: user?.email,
    },
    {
      label: "Số điện thoại",
      value: user?.phone,
    },
    {
      label: "Địa chỉ",
      value: user?.address,
    },
    {
      label: "Ngày sinh",
      value: user?.birthday,
    },
  ];
  return (
    <div className="px-6 lg:px-10">
      {PROFILE_LIST.map((renderItem) => {
        return (
          <div
            key={renderItem.label}
            className="flex justify-between items-center border-b py-5"
          >
            <div className="max-w-[50%] text-base tracking-wide">
              {renderItem.label}
            </div>
            <div className="max-w-[50%] tracking-wide flex items-center space-x-3 text-gray-500 text-sm text-right">
              {renderItem.value || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Info;
