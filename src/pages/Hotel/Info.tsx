import React from "react";
import type { IHotel } from "./index";

interface IInfoProps {
  hotel: IHotel;
}

function Info({ hotel }: IInfoProps): JSX.Element {
  return (
    <ul className="grid h-20 auto-cols-min grid-cols-2 grid-rows-2 justify-items-start ">
      <li className="col-span-1 row-span-2 w-max rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
        {hotel.HotelScore}
      </li>
      <li className="col-span-1">
        <h2 className=" text-4xl">{hotel.HotelName}</h2>
        <p className="flex text-sm text-stone-500">
          <span>{hotel.HotelAddress}</span>
          <hr
            style={{ borderStyle: "solid" }}
            className="my-3 mx-4 block h-10 border-r-2"
          />
          <span>{hotel.HotelPhone}</span>
          <span>{`每日${hotel.HotelStartTime}－${hotel.HotelEndTime}`}</span>
        </p>
      </li>
    </ul>
  );
}

export default Info;
