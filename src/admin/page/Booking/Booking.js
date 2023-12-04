import React, { useEffect, useState } from "react";
import "./asset/style.scss";
import MUIDataTable from "mui-datatables";
import { Button, message } from "antd";
import { bookingRoomServ } from "../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import AddBooking from "./ModalAddBooking";
import EditBooking from "./ModalEditBooking";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
export default function Booking() {
  let [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [listBookingRoom, setListBookingRoom] = useState([]);
  const getData = () => {
    bookingRoomServ
      .getList()
      .then((res) => {
        setListBookingRoom(res.data.content);
      })
      .catch((err) => { });
  };
  useEffect(() => {
    getData();
  }, []);
  const data = listBookingRoom.map((room, index) => {
    return {
      id: room.id,
      key: room.id,
      stt: index + 1,
      maPhong: room.maPhong,
      ngayDen: moment(room.ngayDen).format("DD/MM/YYYY "),
      ngayDi: moment(room.ngayDi).format("DD/MM/YYYY"),
      soLuongKhach: room.soLuongKhach,
      maNguoiDung: room.maNguoiDung,
    };
  });

  const [sortToggle, setSortToggle] = useState(true)
  const dataSorted = sortToggle ? data : data.reverse()
  const reverseData = () => {
    setSortToggle(!sortToggle)
  }

  const columns = [
    {
      name: "stt",
      label: "STT",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "maPhong",
      label: "Mã Phòng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ngayDen",
      label: "Ngày đến",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "ngayDi",
      label: "Ngày đi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "soLuongKhach",
      label: "Số lượng khách",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "maNguoiDung",
      label: "Mã người dùng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Hành động",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const roomId = dataSorted[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                type="primary"
                danger
                icon={<EditOutlined />}
                className="mr-2"
                onClick={() => handleEditBookingRoom(roomId)}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteBookingRoom(roomId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];
  const handleEditBookingRoom = (roomId) => {
    bookingRoomServ
      .getDetailBookingRoom(roomId)
      .then((res) => {
        const editedNgayDen = moment(res.data.content.ngayDen).startOf("day");
        const editedNgayDi = moment(res.data.content.ngayDi).startOf("day");

        const editedData = {
          ...res.data.content,
          ngayDen: editedNgayDen,
          ngayDi: editedNgayDi,
        };

        setEditData(editedData);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteBookingRoom = (roomId) => {
    bookingRoomServ
      .deleteBookingRoom(roomId)
      .then(() => {
        setListBookingRoom((prevListBookingRoom) =>
          prevListBookingRoom.filter((room) => room.id !== roomId)
        );
        getData();
        message.success("Xóa thành công!");
      })
      .catch((err) => {
        message.error("Xảy ra lỗi!");
        console.log(err);
      });
  };
  return (
    <div>
      <AddBooking getData={getData} />
      <EditBooking
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        editData={editData}
      />
      <MUIDataTable
        title={"Quản lý đặt phòng"}
        data={dataSorted}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          download: false,
          print: false,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />
        }}
      />
    </div>
  );
}
