import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import UserAuth from "../../../context/UserAuthContext";
import useModal from "../../../hooks/useModal";
import { PlusPath } from "../../../img/icons";
import { getRoomList, useRoomList } from "../../../utils/api/hotel";
import Room from "./Room";
import Edit from "./Edit";
import { RoomList } from "../../../types/schema";

const useDisableScroll = (isEdit: boolean): void => {
  const body = document.querySelector("body");
  useEffect(() => {
    if (body === null) return;

    if (isEdit) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [body, isEdit]);
};

// const useSetRoomList = (data: RoomList | undefined): RoomList | undefined => {
//   const [roomList, setRoomList] = useState<RoomList>();

//   useEffect(() => {
//     setRoomList(data?.filter((item, index) => index < 3));
//   }, [data]);

//   return roomList;
// };

function CmsRoom(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const { authToken } = useContext(UserAuth);

  useDisableScroll(isEdit);
  const { data } = useRoomList(authToken);
  console.log(data);
  // const roomList = useSetRoomList(data);

  return (
    <div className="flex w-full max-w-5xl flex-col items-end ">
      <Button
        icon={PlusPath}
        type="Secondary"
        text="新增寵物房型"
        className="w-max px-4 py-2"
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      />
      {data === undefined ? (
        <p>loading</p>
      ) : (
        <Room data={data} className="w-full" />
      )}
      <AnimatePresence>
        {isEdit && <Edit onClick={() => setIsEdit(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default CmsRoom;
