import React from "react";
import { Modal } from "antd";
import Form from "../../page/Register/Form";
import { useDispatch } from "react-redux";
import { clearPopup } from "../../redux/popupSlice";
import "../../page/Register/asset/style.scss";

const Register = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(clearPopup({ popup: "" }));
  };
  return (
    <Modal
      centered
      className="form-register-width"
      open={true}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <Form />
    </Modal>
  );
};
export default React.memo(Register);
