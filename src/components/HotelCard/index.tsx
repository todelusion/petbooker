import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import useFilter from "../../hooks/useFilter";
import useSearchBar from "../../hooks/useSearchBar";
import { LoadingCustom } from "../../img/icons";
import { HorelList } from "../../types/schema";
import { useHotelList } from "../../utils/api/home";
import Button from "../Button";
import { fakeText, Hotels as hotelList } from "./data";

interface HotelCardProps {
  data: HorelList["Data"];
}

const HotelCard = React.memo(({ data }: HotelCardProps): JSX.Element => {
  console.log(typeof data[0]?.HotelPhoto);
  console.log(data);
  if (data.length < 1) return <p>未找到適合您寵物的旅店</p>;
  return (
    <>
      {data.map((hotel) => (
        <div key={hotel?.HotelName} className="mb-6 flex border-2 lg:h-96">
          <div className="relative basis-1/2 ">
            {hotel?.HotelPhoto !== "" ? (
              <img
                src={hotel?.HotelPhoto}
                alt="thumbnail"
                className="h-full w-full"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <div className="absolute left-6 top-6 rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
              {hotel?.HotelScore}
            </div>
          </div>
          <ul className="flex basis-1/2 flex-col justify-between p-6 ">
            <li className="text-2xl font-bold">{hotel?.HotelName}</li>
            <li className="mb-4 line-clamp-[7]">{hotel?.HotelInfo}</li>
            <li className="inline-flex items-center justify-between">
              <p className="text-xl font-bold tracking-wide text-gray-600">
                NTD&nbsp;&nbsp;{hotel?.RoomLowPrice}
                &nbsp;起&nbsp;/日
              </p>
              <Button
                type="Secondary"
                text="選擇房間"
                className="py-2 px-5 text-sm"
                navigatePath={`/hotel/${hotel?.HotelId ?? ""}`}
              />
            </li>
          </ul>
        </div>
      ))}
    </>
  );
});

export default HotelCard;
