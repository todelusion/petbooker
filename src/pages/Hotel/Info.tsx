import React from "react";
import type { IHotel } from "./index";

interface IInfoProps {
  hotel: IHotel;
  className?: string;
}

function Info({ hotel, className }: IInfoProps): JSX.Element {
  return (
    <div className={className}>
      <ul className="mb-4 flex h-20">
        <li className="rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
          {hotel.HotelScore}
        </li>
        <li className="ml-6">
          <h2 className="mb-2 py-1 text-4xl font-bold">{hotel.HotelName}</h2>
          <div className="flex items-center pl-1 text-sm text-stone-400">
            <span>{hotel.HotelAddress}</span>
            <hr
              style={{ borderStyle: "solid" }}
              className="mx-4 block h-5 border-r-2"
            />
            <span>{hotel.HotelPhone}</span>
            <hr
              style={{ borderStyle: "solid" }}
              className="mx-4 block h-5 border-r-2"
            />
            <span>{`每日${hotel.HotelStartTime}－${hotel.HotelEndTime}`}</span>
          </div>
        </li>
      </ul>
      <p className="pl-1 text-sm text-stone-600">{hotel.HotelInfo}</p>
    </div>
  );
}

Info.defaultProps = {
  className: "",
};

export default Info;
