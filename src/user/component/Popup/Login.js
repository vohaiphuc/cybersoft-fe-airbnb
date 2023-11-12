import React from "react";
import Form from "../../page/Login/Form";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { clearPopup } from "../../redux/popupSlice";

const Login = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(clearPopup({ popup: "" }));
  };

  return (
    <Modal open={true} onOk={handleClose} onCancel={handleClose} footer={null}>
      <Form />
    </Modal>
  );
};
export default React.memo(Login);
