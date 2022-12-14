import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { translateState, customerList } from "../../../components/Order/data";
// 該Order的Schema

import { customerOrder } from "../../../types/schema";
import Popup from "../../Cms/CmsOrder/Popup";

interface IOrderProps {
  data: customerOrder;
}

function Order({ data }: IOrderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState(0);

  return (
    <div className=" overflow-hidden rounded-lg border-2 border-black">
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
      <ul className="grid grid-cols-8 items-center justify-items-center gap-x-14 whitespace-nowrap border-b-2 border-stone-200 bg-stone-100 py-7 px-7 text-lg font-bold">
        {customerList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.OrderId}
          className="grid grid-cols-8 items-center  justify-items-center gap-y-6 gap-x-14 border-b-2 py-6 px-7 text-center"
        >
          <li>
            <img src={item.RoomPhoto} alt="RoomPhoto.jpg" />
          </li>
          <li>{item.HotelName}</li>
          <li>{item.RoomName}</li>
          <li>{item.CheckInDate}</li>
          <li>{item.CheckOutDate}</li>
          <li>{item.TotalPrice}</li>
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
                    src={item.PetPhoto as string}
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
