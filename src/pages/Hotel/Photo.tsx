import React from "react";
import type { IHotel } from "./index";

interface IPhotoProps {
  data: IHotel["HotelPhoto"];
  className?: string;
}

function Photo({ data, className }: IPhotoProps): JSX.Element {
  return (
    <ul
      className={`grid h-96 w-full grid-cols-4 grid-rows-2 gap-4 ${
        className as string
      }`}
    >
      <li className="col-span-2 row-span-2 border-2 border-black">
        {data[0] !== "" ? (
          <img src={data[0]} alt="thumbnail" />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </li>
      {data.map((photo, index) => {
        // eslint-disable-next-line react/no-array-index-key
        if (index < 1) return <li key={index} className="hidden" />;
        if (photo !== "")
          return (
            <li key={photo} className="col-span-1">
              <img src={photo} alt="" />
            </li>
          );
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className="col-span-1 border-2 border-black">
            <div className="h-full w-full bg-gray-100" />
          </li>
        );
      })}
    </ul>
  );
}

Photo.defaultProps = {
  className: "",
};

export default Photo;
