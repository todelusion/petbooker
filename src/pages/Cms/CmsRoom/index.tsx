import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import UserAuth from "../../../context/UserAuthContext";
import { LoadingCustom, PlusPath } from "../../../img/icons";
import { useRoomList } from "../../../utils/api/cmsRoom";
import RoomCard from "./Room";
import Edit from "./Edit";
import { Room } from "../../../types/schema";
import EmptyScreen from "../../../components/EmptyScreen";
import LoadingScreen from "../../../components/LoadingModal";

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
  const { data: datas, isFetching } = useRoomList(authToken);
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
        {datas?.length === 0 && (
          <div className="flex w-full justify-center  ">
            {" "}
            <EmptyScreen text="尚無房型" />
          </div>
        )}

        {datas === undefined ? (
          <div key="Loading" className="relative w-full">
            <AnimatePresence>{isFetching && <LoadingScreen />}</AnimatePresence>
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
