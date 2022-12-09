import axios from "axios";
import { log } from "console";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UploadRoomPath } from "../../img/icons";

type Type = "Avatar" | "Room";

interface IUploadImageProps {
  type: Type;
  className?: string;
  onChange: (file: File) => void;
  defaultImage: string | null | undefined;
  setThumbnail: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const renderUploadImage = (
  type: Type,
  previewImage: string | undefined,
  defaultImage?: string | null
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
      // eslint-disable-next-line no-nested-ternary
      return previewImage !== undefined ? (
        <img
          src={previewImage}
          alt="previewImage"
          className="h-32 w-32 rounded-full border-4 border-black object-cover"
        />
      ) : defaultImage != null ? (
        <img
          src={defaultImage}
          alt="defaultImage"
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
  defaultImage,
  setThumbnail,
}: IUploadImageProps): JSX.Element {
  const [previewImage, setPreviewImage] = useState<string>();

  // 接收上傳圖片
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (files === null) return;
    console.log(files);

    const formdata = new FormData();
    formdata.append("Image", files[0]);
    setThumbnail(formdata);

    // 使用 onChange props的原因：UploadImage compoent會在各個地方出現，但是其對應的 POST路徑不同
    onChange(files[0]);

    const localurl = URL.createObjectURL(files[0]);
    setPreviewImage(localurl);

    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
  };
  useEffect(() => {
    console.log("in UploadImage component", previewImage);
  }, [previewImage]);
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
      {renderUploadImage(type, previewImage, defaultImage)}
    </div>
  );
}
export default UploadImage;
