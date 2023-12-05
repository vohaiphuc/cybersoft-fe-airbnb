import React, { useEffect, useState } from "react";
import "./asset/style.scss";
import MUIDataTable from "mui-datatables";
import { Button, Popover, message } from "antd";
import { roomServ } from "../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddRoom from "./ModalAddRoom";
import EditRoom from "./ModalEditRoom";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import FormTemplate from "../components/FormTemplate";
export default function Room() {
  const [isOpen, setIsOpen] = useState(false);
  const [listRooms, setListRooms] = useState([]);
  const [editData, setEditData] = useState({});
  const [popoverStates, setPopoverStates] = useState(
    listRooms.map(() => false)
  );

  const hidePopover = (index) => {
    const newStates = [...popoverStates];
    newStates[index] = false;
    setPopoverStates(newStates);
  };

  const handleOpenPopover = (index) => {
    const newStates = [...popoverStates];
    newStates[index] = true;
    setPopoverStates(newStates);
  };
  const getData = () => {
    roomServ
      .getList()
      .then((res) => {
        setListRooms(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const data = listRooms.map((room, index) => ({
    id: room.id,
    key: room.id,
    stt: index + 1,
    hinhAnh: room.hinhAnh,
    tenPhong: room.tenPhong,
    khach: room.khach,
    phongNgu: room.phongNgu,
    giuong: room.giuong,
    phongTam: room.phongTam,
    moTa: room.moTa,
    giaTien: room.giaTien,
  }));

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
      name: "hinhAnh",
      label: "Hình Ảnh",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const imgUrl = value;
          return <img src={imgUrl} width="100" height="100" alt="" />;
        },
      },
    },
    {
      name: "tenPhong",
      label: "Tên Phòng",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "khach",
      label: "Khách",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phongNgu",
      label: "Phòng ngủ",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "giuong",
      label: "Giường",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phongTam",
      label: "Phòng tắm",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "moTa",
      label: "Mô tả",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const room = dataSorted[index];
          return (
            <Popover
              content={
                <div>
                  <p style={{ width: "200px" }}>{room.moTa}</p>
                  <Button
                    type="primary"
                    danger
                    onClick={() => hidePopover(index)}
                  >
                    Đóng
                  </Button>
                </div>
              }
              trigger="click"
              open={popoverStates[index]}
              placement="bottomRight"
              onOpenChange={(open) => {
                if (!open) hidePopover(index);
              }}
            >
              <Button
                type="link"
                onClick={() => handleOpenPopover(index)}
                className="-ml-4"
              >
                Xem chi tiết
              </Button>
            </Popover>
          );
        },
      },
    },
    {
      name: "giaTien",
      label: "Giá tiền",
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
          const roomId = data[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                type="primary"
                danger
                icon={<EditOutlined />}
                className="mr-2 mb-3"
                onClick={() => handleEditRoom(roomId)}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteRoom(roomId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];
  const handleEditRoom = (roomId) => {
    roomServ
      .getDetailRoom(roomId)
      .then((res) => {
        setEditData(res.data.content);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteRoom = (roomId) => {
    roomServ
      .deleteRoom(roomId)
      .then(() => {
        setListRooms((prevListRooms) =>
          prevListRooms.filter((room) => room.id !== roomId)
        );
        message.success("Xóa thành công");
        getData();
      })
      .catch((err) => {
        message.error("Không có quyền xóa");
      });
  };
  return (
    <div>
      <AddRoom getData={getData} />
      <EditRoom
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editData={editData}
        getData={getData}
      />
      <MUIDataTable
        title={"Quản lý danh sách phòng"}
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
