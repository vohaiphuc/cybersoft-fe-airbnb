import React from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { clearPopup } from "../../redux/popupSlice";
import "../../page/Register/asset/style.scss";
import UpdateForm from "../Profile/UpdateForm";

const Profile = () => {
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
      <UpdateForm />
    </Modal>
  );
};
export default React.memo(Profile);
