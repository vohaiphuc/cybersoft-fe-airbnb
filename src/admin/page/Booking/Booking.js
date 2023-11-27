import React, { useEffect, useState } from "react";
import "./asset/style.scss";
import MUIDataTable from "mui-datatables";
import { Button, message } from "antd";
import { bookingRoomServ, locationServ } from "../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditBookingRoom from "./EditBookingRoom";
import AddBookingRoom from "./AddBookingRoom";
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
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const data = listBookingRoom.map((room, index) => ({
    id: room.id,
    key: room.id,
    stt: index + 1,
    maPhong: room.maPhong,
    ngayDen: room.ngayDen,
    ngayDi: room.ngayDi,
    soLuongKhach: room.soLuongKhach,
    maNguoiDung: room.maNguoiDung,
  }));
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
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const roomId = data[tableMeta.rowIndex].id;
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
        setEditData(res.data.content);
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
        message.success("Delete location success fully");
      })
      .catch((err) => {
        message.error("Delete location error");
        console.log(err);
      });
  };
  return (
    <div>
      <AddBookingRoom getData={getData} />
      <EditBookingRoom
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        editData={editData}
      />
      <MUIDataTable
        title={"Quản lý đặt phòng"}
        data={data}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          download: false,
          print: false,
        }}
      />
    </div>
  );
}
