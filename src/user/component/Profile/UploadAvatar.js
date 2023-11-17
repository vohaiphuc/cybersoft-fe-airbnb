import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../redux/userSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadAvatar = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { user } = useSelector((state) => state?.userSlice?.user || {});

  const handleCancel = () => setPreviewOpen(false);

  const dispatch = useDispatch();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const avatarBeforeUpload = (file) => {
    dispatch(updateAvatar(file));
    return false;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        className="flex justify-center w-full mx-auto"
        action={"https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"}
        listType="picture-circle"
        onPreview={handlePreview}
        beforeUpload={avatarBeforeUpload}
      >
        {user?.avatar ? (
          <div className="w-full relative">
            <EditOutlined className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              alt="preview"
              className="w-full rounded-full"
              src={user?.avatar}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
      <Modal
        centered
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" className="w-full" src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadAvatar;
