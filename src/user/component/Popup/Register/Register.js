import "./asset/style.scss";
import React from "react";
import { Modal } from "antd";
import Form from "./Form";
import { usePopup } from "../hook/usePopup";

const Register = () => {
  const popup = usePopup()
  return (
    <Modal
      centered
      className="form-register-width"
      open={true}
      onOk={() => popup.close()}
      onCancel={() => popup.close()}
      footer={null}
    >
      <Form />
    </Modal>
  );
};
export default React.memo(Register);
