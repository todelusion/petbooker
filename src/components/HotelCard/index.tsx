import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import useFilter from "../../hooks/useFilter";
import useModal from "../../hooks/useModal";
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
  // console.log(data);
  const queryClient = useQueryClient();
  const { selection } = useSearchBar();
  const { dispatchPending } = useModal();
  useEffect(() =>
    clearInterval(setTimeout(() => dispatchPending({ type: "DONE" }), 1000))
  );
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
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <div className="flex-center absolute left-6 top-6 min-h-[5rem] min-w-[6rem] rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
              <span>{Number(hotel?.HotelScore).toFixed(1)}</span>
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
                navigatePath={
                  selection.startDate.getTime() === selection.endDate.getTime()
                    ? "/home"
                    : `/hotel/${hotel?.HotelId ?? ""}`
                }
                onClick={() => {
                  if (
                    selection.startDate.getTime() ===
                    selection.endDate.getTime()
                  ) {
                    dispatchPending({
                      type: "IS_ERROR",
                      payload: "入住日與退房日不得為空且不能相同",
                    });
                    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
                    return;
                  }
                  queryClient.removeQueries(["Hotel"]);
                }}
              />
            </li>
          </ul>
        </div>
      ))}
    </>
  );
});

export default HotelCard;
