import React from "react";
import Form from "./Form";
import { Modal } from "antd";
import { usePopup } from "../hook/usePopup";

const Login = () => {
  const popup = usePopup()

  return (
    <Modal
      centered
      open={true}
      onOk={() => popup.close()}
      onCancel={() => popup.close()}
      footer={null}
    >
      <Form />
    </Modal>
  );
};
export default React.memo(Login);
