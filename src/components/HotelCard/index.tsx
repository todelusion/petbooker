import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useFilter from "../../hooks/useFilter";
import useModal from "../../hooks/useModal";
import { PendingAction } from "../../hooks/usePending";
import useSearchBar from "../../hooks/useSearchBar";

import { HorelList } from "../../types/schema";
import Button from "../Button";

interface HotelCardProps {
  data: HorelList["hotelInfo"];
  className?: string;
}

const handleValidate = (
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  },
  PetType: string,
  FoodTypes: string[],
  dispatchPending: React.Dispatch<PendingAction>
): boolean => {
  if (selection.startDate.getTime() === selection.endDate.getTime()) {
    dispatchPending({
      type: "IS_ERROR",
      payload: "入住日與退房日不得為空且不能相同",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
    return false;
  }
  if (PetType === "") {
    dispatchPending({
      type: "IS_ERROR",
      payload: "必須選擇寵物類型",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
    return false;
  }
  if (FoodTypes[0] === undefined) {
    dispatchPending({
      type: "IS_ERROR",
      payload: "必須選擇至少一個飲食偏好",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
    return false;
  }

  return true;
};
const handleNavigate = (
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  },
  PetType: string,
  FoodTypes: string[],
  HotelId: number | undefined
): string => {
  if (selection.startDate.getTime() === selection.endDate.getTime()) {
    return "/home";
  }
  if (PetType === "") {
    return "/home";
  }
  if (FoodTypes[0] === undefined) {
    return "/home";
  }

  return `/hotel/${HotelId ?? ""}`;
};

const HotelCard = React.memo(
  ({ data, className }: HotelCardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const { selection } = useSearchBar();
    const { FoodTypes, PetType } = useFilter();

    const { dispatchPending } = useModal();
    useEffect(() =>
      clearInterval(setTimeout(() => dispatchPending({ type: "DONE" }), 1000))
    );
    if (data.length < 1) return <p>未找到適合您寵物的旅店</p>;

    return (
      <div className={className}>
        {data.map((hotel) => (
          <div
            key={hotel?.HotelName}
            className="mb-6 flex border-2 duration-150  hover:scale-105 lg:h-96"
          >
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
              <div className=" flex-center absolute left-6 top-6 min-h-[5rem] min-w-[5rem] rounded-xl bg-primary  text-4xl font-bold text-white">
                {Number(hotel?.HotelScore).toFixed(1)}
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
                  navigatePath={handleNavigate(
                    selection,
                    PetType,
                    FoodTypes,
                    hotel?.HotelId
                  )}
                  onClick={() => {
                    if (
                      !handleValidate(
                        selection,
                        PetType,
                        FoodTypes,
                        dispatchPending
                      )
                    )
                      return;

                    queryClient.removeQueries(["Hotel"]);
                  }}
                />
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
);

export default HotelCard;
