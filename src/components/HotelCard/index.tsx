import React from "react";
import Button from "../Button";
import { fakeText, Hotels as hotelList } from "./data";

function HotelCard(): JSX.Element {
  return (
    <>
      {hotelList.map((hotel) => (
        <div key={hotel.HotelName} className="mb-6 flex border-2 lg:h-96">
          <div className="relative basis-1/2 ">
            {hotel.HotelPhoto[0] !== "" ? (
              <img
                src={hotel.HotelPhoto[0]}
                alt="thumbnail"
                className="h-full w-full"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <div className="absolute left-6 top-6 rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
              {hotel.HotelScore}
            </div>
          </div>
          <ul className="flex basis-1/2 flex-col justify-between p-6 ">
            <li className="text-2xl font-bold">{hotel.HotelName}</li>
            <li className="mb-4 line-clamp-[7]">{fakeText}</li>
            <li className="inline-flex items-center justify-between">
              <p className="text-xl font-bold tracking-wide text-gray-600">
                NTD&nbsp;&nbsp;{hotel.price}
                &nbsp;起&nbsp;/日
              </p>
              <Button
                type="Secondary"
                text="選擇房間"
                className="py-2 px-5 text-sm"
                navigatePath={`/hotel/${hotel.Id}`}
              />
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default HotelCard;
