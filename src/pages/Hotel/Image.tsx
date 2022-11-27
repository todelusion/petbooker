import React from "react";
import type { IHotel } from "./index";

interface IImageProps {
  hotel: IHotel;
  className?: string;
}

function Image({ hotel, className }: IImageProps): JSX.Element {
  return (
    <ul
      className={`grid h-96 w-full grid-cols-4 grid-rows-2 gap-4 ${
        className as string
      }`}
    >
      <li className="col-span-2 row-span-2 border-2 border-black">
        {hotel.HotelPhoto[0] !== "" ? (
          <img src={hotel.HotelPhoto[0]} alt="thumbnail" />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </li>
      {hotel.HotelPhoto.map((photo, index) => {
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

Image.defaultProps = {
  className: "",
};

export default Image;
