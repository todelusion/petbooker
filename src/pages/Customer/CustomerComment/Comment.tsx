import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { commentList } from "../../../components/Order/data";

import Button from "../../../components/Button";
import { customerOrder } from "../../../types/schema";
import CommentPopup from "./CommentPopup";

interface ICommentProps {
  data: customerOrder;
}

function Comment({ data }: ICommentProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [selectState, setSelectState] = useState("checkOut");
  const handleClick = (Orderid: number, Status: string): void => {
    setOpen(true);
    setOrderId(Orderid);
    setSelectState(Status);
  };

  return (
    <div className=" overflow-hidden rounded-lg border-2 border-black">
      <AnimatePresence>
        {open && (
          <CommentPopup
            id={orderId}
            key="Popup"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            Status={selectState}
          />
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-7 items-center justify-items-center gap-x-14 whitespace-nowrap border-b-2 border-stone-200 bg-stone-100 py-7 px-7 text-lg font-bold">
        {commentList.map((list) => (
          <li key={list}>{list}</li>
        ))}
      </ul>
      {data.map((item) => (
        <ul
          key={item.OrderId}
          className="grid grid-cols-7 items-center  justify-items-center gap-y-6 gap-x-14 border-b-2 py-6 px-7 text-center"
        >
          <li>
            <img src={item.RoomPhoto} alt="RoomPhoto.jpg" />
          </li>
          <li>{item.HotelName}</li>
          <li>{item.RoomName}</li>
          <li>{item.CheckInDate}</li>
          <li>{item.CheckOutDate}</li>

          <li>{item.Status === "checkOut" ? "未完成評價" : "已完成評價"}</li>
          <li>
            {" "}
            <Button
              onClick={() => handleClick(item.OrderId, item.Status)}
              type="Secondary"
              text={item.Status === "checkOut" ? "填寫評價" : "查看評價"}
              className="ml-4 py-3 px-6"
            />
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Comment;
