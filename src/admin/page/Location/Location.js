import React, { useEffect, useState } from "react";
import "./asset/style.scss";
import MUIDataTable from "mui-datatables";
import { Button, message } from "antd";
import { locationServ } from "../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
export default function Location() {
  let [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [listLocation, setListLocation] = useState([]);
  const getData = () => {
    locationServ
      .getList()
      .then((res) => {
        setListLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const data = listLocation.map((location, index) => ({
    id: location.id,
    key: location.id,
    stt: index + 1,
    tenViTri: location.tenViTri,
    tinhThanh: location.tinhThanh,
    quocGia: location.quocGia,
    hinhAnh: location.hinhAnh,
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
      name: "tenViTri",
      label: "Tên vị trí",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "tinhThanh",
      label: "Tỉnh thành",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "quocGia",
      label: "Quốc gia",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "hinhAnh",
      label: "Hình ảnh",
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
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const locationId = data[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                type="primary"
                danger
                icon={<EditOutlined />}
                className="mr-2"
                onClick={() => handleEditLocation(locationId)}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteLocation(locationId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];
  const handleEditLocation = (locationId) => {
    locationServ
      .getLocationId(locationId)
      .then((res) => {
        setEditData(res.data.content);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteLocation = (locationId) => {
    locationServ
      .deleteLocation(locationId)
      .then(() => {
        setListLocation((prevListLocation) =>
          prevListLocation.filter((location) => location.id !== locationId)
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
      <AddLocation getData={getData} />
      <EditLocation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        editData={editData}
      />
      <MUIDataTable
        title={"Quản lý thông tin vị trí"}
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
