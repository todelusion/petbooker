import React, { useContext } from "react";
import axios from "axios";

import {
  buttonText,
  translateState,
  customerList,
} from "../../../components/Order/data";
//該Order的Schema

import { useQueryClient } from "@tanstack/react-query";
import UserAuth from "../../../context/UserAuthContext";
import Button from "../../../components/Button";
import { ReservedList } from "../../../types/schema";

interface IOrderProps {
  data: {
    photo: "";
    HotelName: "123";
    Petname: "小王";
    RoomType: "高級";
    StartDayOnly: "123456";
    EndDayOnly: "123456";
    RoomPrice: "1200";
    PetCardId: "1";
    Status: "reverved";
  };
}

function Order({ data }: IOrderProps): JSX.Element {
  const { authToken } = useContext(UserAuth);

  const queryClient = useQueryClient();

  const handlePetCard = (id: number): void => {
    console.log(id);
  };

  return (
    <div className=" overflow-hidden rounded-lg border-2 border-black">
      <ul className="grid grid-cols-8 items-center justify-items-center gap-x-14 whitespace-nowrap border-b-2 border-stone-200 bg-stone-100 py-7 px-7 text-lg font-bold">
        {customerList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.Id}
          className="grid grid-cols-8 items-center  justify-items-center gap-y-6 gap-x-14 border-b-2 py-6 px-7 text-center"
        >
          <li>{item.photo}</li>
          <li>{item.HotelName}</li>
          <li>{item.RoomType}</li>
          <li>{item.checkInDateOnly}</li>
          <li>{item.checkOutDateOnly}</li>
          <li>{item.RoomPrice}</li>
          <li>
            <button
              type="button"
              onClick={() => {
                handlePetCard(item.PetCardId);
              }}
              className="flex min-w-[160px] items-center rounded-md border-2 border-black py-2 pl-4"
            >
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
            </button>
          </li>
          <li>{translateState[item.Status]}</li>
        </ul>
      ))}
    </div>
  );
}

export default Order;
