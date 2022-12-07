import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UploadRoomPath } from "../../img/icons";

type Type = "Avatar" | "Room";

interface IUploadImageProps {
  type: Type;
  className?: string;
  onChange: (file: File) => void;
}

const renderUploadImage = (
  type: Type,
  previewImage: string | undefined
): JSX.Element => {
  switch (type) {
    case "Room":
      return previewImage !== undefined ? (
        <img
          src={previewImage}
          alt="previewImage"
          className="h-80 w-full object-cover"
        />
      ) : (
        <div className="flex-center h-80 w-full bg-slate-200">
          <p className="font-bold text-slate-700">上傳寵物房型照片</p>
        </div>
      );
    case "Avatar":
      return previewImage !== undefined ? (
        <img
          src={previewImage}
          alt="previewImage"
          className="h-32 w-32 rounded-full border-4 border-black object-cover"
        />
      ) : (
        <div className="h-32 w-32 rounded-full border-4 border-black bg-slate-200" />
      );
    default:
      return <h2>系統錯誤</h2>;
  }
};

function UploadImage({
  type,
  className,
  onChange,
}: IUploadImageProps): JSX.Element {
  const [imageFile, setImageFile] = useState<File>();

  const [previewImage, setPreviewImage] = useState<string>();

  // 接收上傳圖片
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (files === null) return;

    setImageFile(files[0]);

    // 使用 onChange props的原因：UploadImage compoent會在各個地方出現，但是其對應的 POST路徑不同
    onChange(files[0]);

    const localurl = URL.createObjectURL(files[0]);
    setPreviewImage(localurl);

    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
  };

  // 點擊刪除previewImg&imageflie
  const deleteImg = (img: string, index: number): void => {
    const previewData = previewImage?.filter((item) => item !== img);
    const imagefile = imageFile?.filter(
      (_item, fileindex) => fileindex !== index
    );
    setPreviewImage(previewData);
    setImageFile(imagefile);
  };
  const sendPhoto = (): void => {
    const PhotoFormData = new FormData();
    imageFile?.forEach((item) => {
      PhotoFormData.append("Image", item);
    });
    console.log(PhotoFormData);
    void axios
      .post(
        "https://petcity.rocket-coding.com/hotel/uploadhotelphotos",
        PhotoFormData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTAsIkFjY291bnQiOiJrd2VpZm9uMTk5OEBnbWFpbC5jb20iLCJOYW1lIjoid2FuZyIsIkltYWdlIjpudWxsLCJJZGVudGl0eSI6ImhvdGVsIiwiRXhwIjoiMTIvNS8yMDIyIDM6NTY6MDggQU0ifQ.JICJ5pw1p8SbtS49_cKXgrIZgiy6lM1iIl_nNB87eaBkR1PyUlh7RgcYyFSouSgDM3McUGbi22lpz7rWSGmK4A",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("in UploadImage component", imageFile);
    console.log("in UploadImage component", previewImage);
  }, [imageFile, previewImage]);

  return (
    <div
      className={`relative ${className ?? ""} ${
        type === "Room" ? "" : "w-max"
      }`}
    >
      <label
        htmlFor="upload"
        className={`absolute ${
          type === "Room" ? "right-6 top-6" : "bottom-0 -right-3"
        } inline-block w-fit cursor-pointer overflow-hidden rounded-full`}
      >
        <img src={UploadRoomPath} alt="" />
        <input
          id="upload"
          type="file"
          name="image"
          placeholder="image"
          onChange={handleSetImage}
          accept="image/*"
          hidden
        />
      </label>
      {renderUploadImage(type, previewImage)}

      {/* <button type="button" onClick={sendPhoto} className="mt-4">
        打都打！
      </button> */}
    </div>
  );
}
export default UploadImage;
