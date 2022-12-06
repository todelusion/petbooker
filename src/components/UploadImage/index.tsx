import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface IUploadImageProps {
  type: "stickers" | "room";
}

function UploadImage(): JSX.Element {
  const { pathname } = useLocation();
  const [imageFile, setImageFile] = useState<File[]>();

  const [previewImage, setPreviewImage] = useState<string[]>();

  // 接收上傳圖片
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (files === null) return;
    if (
      files.length > 5 ||
      (imageFile != null ? imageFile.length + files.length : 0) > 5
    ) {
      alert("照片數量不可大於4張");
      return;
    }
    console.log(files);

    // 建立postRequest的FormData

    const imageFormData =
      imageFile != null
        ? [...imageFile, ...files]
        : Object.values(files).map((item) => item);
    setImageFile(imageFormData);
    // 建立previewImage
    const previewData = imageFormData?.map((item) => URL.createObjectURL(item));
    setPreviewImage(previewData);
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
    console.log(imageFile);
    console.log(previewImage);
  }, [imageFile, previewImage]);

  return (
    <div>
      <label
        htmlFor="upload"
        className=" mt-4 w-8 cursor-pointer rounded-md bg-indigo-200 p-2 text-white"
      >
        File
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
      <span className="flex ">
        {previewImage !== null && previewImage !== undefined
          ? previewImage.map((item, index) => (
              <button
                key={item}
                onClick={() => deleteImg(item, index)}
                type="button"
              >
                <img src={item} alt="previewImage" className="h-20 w-20 " />
              </button>
            ))
          : ""}
      </span>
      {/* <button type="button" onClick={sendPhoto} className="mt-4">
        打都打！
      </button> */}
    </div>
  );
}
export default UploadImage;
