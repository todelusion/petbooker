import { useContext, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

import Button from "../Button";
import { buttonText, cmsList, translateState } from "./data";
import { ReservedList } from "../../types/schema";
import UserAuth from "../../context/UserAuthContext";
import Popup from "../../pages/Cms/CmsOrder/Popup";

interface IOrderProps {
  data: ReservedList;
}

function Order({ data }: IOrderProps): JSX.Element {
  const { authToken } = useContext(UserAuth);
  // const [reserve, checkin, checkout, cancel] = useOrderList(authToken);

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState(0);

  const putCheckIn = async (id: number): Promise<void> => {
    await axios.put(
      `https://petcity.rocket-coding.com/hotel/checkIn?orderId=${id}`,
      { CheckIn: "checkIn" },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    await queryClient.invalidateQueries(["reserved"]);
    await queryClient.invalidateQueries(["checkIn"]);
    queryClient.removeQueries(["reserved"]);
    queryClient.removeQueries(["checkIn"]);
    // setData(checkin.data);
  };

  const handleCheckIn = async (id: number, Status: string): Promise<void> => {
    // eslint-disable-next-line default-case
    switch (Status) {
      case "reserved": {
        void putCheckIn(id);
        break;
      }

      case "checkIn":
        await axios.put(
          `https://petcity.rocket-coding.com/hotel/checkOut?orderId=${id}`,
          { CheckOut: "checkOut" },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        await queryClient.invalidateQueries(["checkIn"]);
        await queryClient.invalidateQueries(["checkOut"]);
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
    void queryClient.invalidateQueries(["reserved"]);
    void queryClient.invalidateQueries(["cancel"]);
    queryClient.removeQueries(["reserved"]);
    queryClient.removeQueries(["cancel"]);
  };
  return (
    <div className="overflow-hidden rounded-lg border-2 border-black">
      <AnimatePresence>
        {open && (
          <Popup
            id={petId}
            key="Popup"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-7 justify-items-center gap-x-14 border-b-2 border-stone-200 bg-stone-100 py-7 px-7 text-lg font-bold">
        {cmsList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.Id}
          className="grid grid-cols-7 items-center justify-items-center gap-y-6 gap-x-14 whitespace-nowrap border-b-2 py-6 px-7 text-center"
        >
          <li>{item.UserName}</li>
          <li>
            <button
              type="button"
              onClick={() => {
                setPetId(item.PetCardId);
                setOpen(true);
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
            {item.Status !== "cancel" &&
              item.Status !== "checkOut" &&
              item.Status !== "checkOutComment" && (
                <>
                  <Button
                    text={buttonText[item.Status]}
                    className="mb-2 whitespace-nowrap py-2 px-5"
                    type="Secondary"
                    onClick={() => {
                      handleCheckIn(item.Id, item.Status).catch((err) => err);
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
