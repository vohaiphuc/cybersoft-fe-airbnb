import React from "react";
import { Modal } from "antd";
import Form from "../../page/Register/Form";
import { useDispatch } from "react-redux";
import { clearPopup } from "../../redux/popupSlice";

const Register = () => {
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
export default React.memo(Register);
