import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import UserAuth from "../../../context/UserAuthContext";

const defaultImage = [
  {
    uid: "98",
    name: "image.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const defalutImageOwn = [
  {
    name: "image.png",
    status: "done",
    uid: 151,
    url: "https://petcity.rocket-coding.com/upload/profile/HotelPhoto2bfd64eb-00b8-4219-9148-cf2b968c60f220221213022759.png",
  },
];

interface IAntdUploadImageProps {
  ImagefileList: UploadFile[];
  setImageFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  defaultFileList: object[] | undefined;
  setDelImage: React.Dispatch<React.SetStateAction<number[]>>;
  DelImage: number[];
}

const getBase64 = async (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function AntdUploadImage(props: IAntdUploadImageProps): JSX.Element {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { ImagefileList, setImageFileList } = props;
  const { defaultFileList, setDelImage, DelImage } = props;
  const handleCancel = (): void => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (file.url == null && file.preview == null) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url ?? (file.preview as string));
    setPreviewOpen(true);

    setPreviewTitle("");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setImageFileList(newFileList);
  };

  const handleRemove = (file: UploadFile): void => {
    setDelImage((prventValue) => [
      ...prventValue,
      file.uid as unknown as number,
    ]);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上傳圖片</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={ImagefileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={5}
        beforeUpload={() => false}
      >
        {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (
            defaultFileList?.length
              ? defaultFileList.length === 5 && ImagefileList?.length >= 5
              : 0
          )
            ? null
            : uploadButton
        }
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
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
