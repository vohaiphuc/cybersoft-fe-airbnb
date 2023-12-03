import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { userServ } from "../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import "./asset/style.scss";
import AddUser from "./ModalAddUser";
import EditUser from "./ModalEditUser";
import Spinner from "../../component/spinner/Spinner";

export default function User() {
  let [isOpen, setIsOpen] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const getData = () => {
    userServ
      .getList()
      .then((res) => {
        setListUsers(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const data = listUsers.map((user, index) => ({
    id: user.id,
    key: user.id,
    stt: index + 1,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    role: user.role,
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
      name: "name",
      label: "Tên tài khoản",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "birthday",
      label: "Ngày sinh nhật",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "role",
      label: "Vai trò",
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
          const userId = data[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                type="primary"
                danger
                icon={<EditOutlined />}
                className="mr-2"
                onClick={() => handleEditUser(userId)}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteUser(userId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];

  const handleDeleteUser = (userId) => {
    userServ
      .deleteUser(userId)
      .then(() => {
        setListUsers((prevListUsers) =>
          prevListUsers.filter((user) => user.id !== userId)
        );
        message.success("Xóa thành công");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditUser = (userId) => {
    userServ
      .getDetailUser(userId)
      .then((res) => {
        setEditUser(res.data.content);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <AddUser getData={getData} />
      <EditUser
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        editUser={editUser}
        getData={getData}
      />
      <MUIDataTable
        title={"Quản lý danh sách người dùng"}
        data={data}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
        }}
      />
    </React.Fragment>
  );
}
