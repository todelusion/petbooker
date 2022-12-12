import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import UserAuth from "../../../context/UserAuthContext";

// const defaultImagefileList = [
//   {
//     uid: "98",
//     name: "image.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
// ];
interface IAntdUploadImageProps {
  ImagefileList: UploadFile[];
  setImageFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  defaultFileList: Array<UploadFile<any>>;
  setDelImage: React.Dispatch<React.SetStateAction<number[] | undefined>>;
  DelImage: number[] | undefined;
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
  // const { authToken } = useContext(UserAuth);
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
    // const PhotoFormData = new FormData();
    // ImagefileList.forEach((file) =>
    //   PhotoFormData.append("file", file.originFileObj)
    // );
    // console.log(newFileList);
    // newFileList.forEach((item) => {
    //   console.log(item?.thumbUrl);
    // });

    // const ary = newFileList.map((item) => item);
    // console.log(ary);
    // const resultary = ary.map((item) => item.thumbUrl?.split(",")[1]);
    // console.log(resultary);

    setImageFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    if (DelImage?.length > 0) {
      setDelImage((preventValue) => [
        [...preventValue],
        parseInt(file.uid, 10),
      ]);
    }
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
        defaultFileList={defaultFileList}
      >
        {ImagefileList?.length >= 5 ? null : uploadButton}
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
