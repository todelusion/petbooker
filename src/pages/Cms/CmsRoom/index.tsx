import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import UserAuth from "../../../context/UserAuthContext";
import useModal from "../../../hooks/useModal";
import { LoadingCustom, LoadingPath, PlusPath } from "../../../img/icons";
import { getRoomList, useRoomList } from "../../../utils/api/hotel";
import RoomCard from "./Room";
import Edit from "./Edit";
import { Room } from "../../../types/schema";

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

function CmsRoom(): JSX.Element {
  const [isShow, setIsShow] = useState<"POST" | "PUT">();
  const [room, setRoom] = useState<Room>();
  // console.log(room);
  const { authToken } = useContext(UserAuth);

  useDisableScroll(isShow !== undefined);
  const { data: datas } = useRoomList(authToken);
  // const roomList = useSetRoomList(data);

  return (
    <div className="flex w-full max-w-5xl flex-col items-end ">
      <Button
        icon={PlusPath}
        type="Secondary"
        text="新增寵物房型"
        className="mb-4 w-max px-4 py-2"
        onClick={() => {
          setIsShow("POST");
        }}
      />
      <AnimatePresence>
        {datas === undefined ? (
          <div key="Loading" className="relative w-full">
            <LoadingCustom className="absolute left-1/2" color="bg-second" />
          </div>
        ) : (
          <RoomCard
            onClick={(data) => {
              setIsShow("PUT");
              setRoom(data);
            }}
            key="Room"
            datas={datas}
            className="w-full"
          />
        )}

        {isShow === "POST" && (
          <Edit
            type={isShow}
            title="新增寵物房型"
            key="EDIT"
            onClick={() => setIsShow(undefined)}
          />
        )}
        {isShow === "PUT" && (
          <Edit
            type={isShow}
            title="編輯寵物房型"
            key="EDIT"
            onClick={() => setIsShow(undefined)}
            data={room}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CmsRoom;
