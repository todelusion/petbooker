import { log } from "console";
import React, { ChangeEvent, useState } from "react";

function UploadImage(): JSX.Element {
  const [imgData, setImgData] = useState<string>();
  const [imges, setImges] = useState<string[]>();
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files === null) return;
    console.log(event.target.value);
    const resultAry = Object.values(event.target.files).map((item) => item);
    const urlAry = resultAry.map((item) => URL.createObjectURL(item));
    const url = URL.createObjectURL(event.target.files[0]);
    console.log(urlAry);
    setImgData(url);
    setImges(urlAry);
  };
  const deleteImg = (img: string): void => {
    const newAry = imges?.filter((item) => item !== img);
    setImges(newAry);
  };
  console.log(imges);

  return (
    <div>
      <label
        htmlFor="upload"
        className=" mt-4 w-8 cursor-pointer rounded-md bg-indigo-200 p-2 text-white"
      >
        File
        <input
          multiple
          id="upload"
          type="file"
          name="image"
          placeholder="image"
          onChange={handleSetImage}
          hidden
        />
      </label>
      <span className="flex ">
        {imges !== null && imges !== undefined
          ? imges.map((item) => (
              <button onClick={() => deleteImg(item)} type="button">
                <img src={item} alt="123" className="h-20 w-20 " />
              </button>
            ))
          : ""}
      </span>
    </div>
  );
}
export default UploadImage;
