import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import UserAuth from "../../../context/UserAuthContext";

const getBase64 = async (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function AntdUploadImage(): JSX.Element {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { authToken } = useContext(UserAuth);
  const handleCancel = (): void => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (file.url == null && file.preview == null) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url ?? (file.preview as string));
    setPreviewOpen(true);
    const result =
      file.name.length > 0 ||
      // eslint-disable-next-line no-unsafe-optional-chaining
      file.url?.substring(file.url?.lastIndexOf("/") + 1);
    setPreviewTitle(result);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const PhotoFormData = new FormData();
    fileList.forEach((file) =>
      PhotoFormData.append("file", file.originFileObj)
    );
    console.log(PhotoFormData);

    void axios
      .post(
        "https://petcity.rocket-coding.com/hotel/uploadhotelphotos",
        PhotoFormData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTAsIkFjY291bnQiOiJrd2VpZm9uMTk5OEBnbWFpbC5jb20iLCJOYW1lIjoid3d3IiwiSW1hZ2UiOm51bGwsIklkZW50aXR5IjoiaG90ZWwiLCJFeHAiOiIxMi82LzIwMjIgMTA6MDI6MDIgQU0ifQ.gJ-0BqvybxELhjyIB4g9exbbtXPCA-oVF_aNc_yb1DTzI0ALI4R9Z7aWHTsbc3GsDfJ7zx7NxTsMt2VG_4EaUQ",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(fileList);
    return setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  console.log(fileList);
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="HotelPhoto.png"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default AntdUploadImage;
