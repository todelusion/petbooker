import React from "react";
import Button from "../Button";
import { cmsList } from "./data";
import type { CMSOrder } from "./data";

interface IOrderProps {
  data: CMSOrder;
}

function Order({ data }: IOrderProps): JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-black">
      <ul className="grid grid-cols-7 justify-items-center gap-x-14 border-b-2 border-stone-200 bg-stone-100 py-7 text-lg font-bold">
        {cmsList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.ReservedListId}
          className="grid grid-cols-7 items-center justify-items-center gap-y-6 gap-x-14 border-b-2 py-6 text-center"
        >
          <li>{item.UserName}</li>
          <li className="flex min-w-[160px] items-center rounded-md border-2 border-black py-2 pl-4">
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-black">
              {item.PetPhoto !== "" ? (
                <img
                  src={item.PetPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-stone-200" />
              )}
            </div>
            <span className="ml-2">{item.PetName}</span>
          </li>
          <li>{item.RoomId}</li>
          <li>{item.CheckInDate}</li>
          <li>{item.CheckInDate}</li>
          <li>{item.Status}</li>
          <li>
            <Button
              text="完成入住"
              className="mb-2 py-2 px-5"
              type="Secondary"
            />
            <Button text="取消入住" className="py-2 px-5" type="Primary" />
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Order;
