import React, { useContext } from "react";
import axios from "axios";
import Button from "../Button";
import { buttonText, cmsList, translateState } from "./data";
import { ReservedList } from "../../types/schema";
import UserAuth from "../../context/UserAuthContext";
import { useQueryClient } from "@tanstack/react-query";

interface IOrderProps {
  data: ReservedList;
}

function Order({ data }: IOrderProps): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const queryClient = useQueryClient();

  const handlePetCard = (id: number): void => {
    console.log(id);
  };

  const handleCheckIn = (id: number, Status: string): void => {
    console.log(Status);
    // eslint-disable-next-line default-case
    switch (Status) {
      case "reserved":
        void axios.put(
          `https://petcity.rocket-coding.com/hotel/checkIn?orderId=${id}`,
          { CheckIn: "checkIn" },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        queryClient.invalidateQueries(["reserved"]);
        queryClient.invalidateQueries(["checkIn"]);
        queryClient.removeQueries(["reserved"]);
        queryClient.removeQueries(["checkIn"]);
        break;
      case "checkIn":
        void axios.put(
          `https://petcity.rocket-coding.com/hotel/checkOut?orderId=${id}`,
          { CheckOut: "checkOut" },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        queryClient.invalidateQueries(["checkIn"]);
        queryClient.invalidateQueries(["checkOut"]);
        queryClient.removeQueries(["checkIn"]);
        queryClient.removeQueries(["checkOut"]);
        break;
    }
  };

  const handleCancel = (id: number): void => {
    void axios.put(
      `https://petcity.rocket-coding.com/hotel/cancel?orderId=${id}`,
      { Cancel: "cancel" },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    queryClient.invalidateQueries(["reserved"]);
    queryClient.invalidateQueries(["cancel"]);
    queryClient.removeQueries(["reserved"]);
    queryClient.removeQueries(["cancel"]);
  };
  return (
    <div className="overflow-hidden rounded-lg border-2 border-black">
      <ul className="grid grid-cols-7 justify-items-center gap-x-14 border-b-2 border-stone-200 bg-stone-100 py-7 px-7 text-lg font-bold">
        {cmsList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.Id}
          className="grid grid-cols-7 items-center justify-items-center gap-y-6 gap-x-14 border-b-2 py-6 px-7 text-center"
        >
          <li>{item.UserName}</li>
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
          <li>{item.RoomName}</li>
          <li>{item.checkInDateOnly}</li>
          <li>{item.checkOutDateOnly}</li>
          <li>{translateState[item.Status]}</li>
          <li>
            {item.Status !== "cancel" && item.Status !== "checkOut" && (
              <>
                <Button
                  text={buttonText[item.Status]}
                  className="mb-2 whitespace-nowrap py-2 px-5"
                  type="Secondary"
                  onClick={() => {
                    handleCheckIn(item.Id, item.Status);
                  }}
                />
                {item.Status === "reserved" && (
                  <Button
                    text="取消入住"
                    className="py-2 px-5"
                    type="Primary"
                    onClick={() => {
                      handleCancel(item.Id);
                    }}
                  />
                )}
              </>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Order;
