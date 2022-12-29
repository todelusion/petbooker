import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import { RoomList, Room } from "../../../types/schema";
import { EditPath, TrashPath } from "../../../img/icons";
import { deleteRoom } from "../../../utils/api/cmsRoom";

import UserAuth from "../../../context/UserAuthContext";
import { assertIsError } from "../../../utils";
import useModal from "../../../hooks/useModal";

interface IRoomProps {
  datas: RoomList;
  className?: string;
  onClick?: (data: Room) => void;
}

function RoomCard({ datas, className, onClick }: IRoomProps): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const { dispatchPending } = useModal();
  const queryClient = useQueryClient();
  return (
    <MotionFade className={className}>
      <>
        {datas.map((data) => (
          <ul
            key={data.Id}
            className="relative mb-6 flex h-70 justify-between rounded-xl border-2"
          >
            <li className="basis-5/12">
              {data.RoomPhoto !== "" ? (
                <img
                  src={data.RoomPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </li>
            <li className="flex basis-7/12 flex-col justify-between py-8 px-6">
              <div>
                <h3 className="mb-4 text-2xl font-bold">{data.RoomName}</h3>
                <p className="text-sm text-stone-400">{data.RoomInfo}</p>
              </div>
              <p className="text-xl font-bold tracking-wide text-gray-600">
                NTD&nbsp;&nbsp;{data.RoomPrice}&nbsp;/日
              </p>
            </li>
            <li className=" absolute right-6 top-6">
              <button
                type="button"
                onClick={async () => {
                  dispatchPending({ type: "IS_LOADING" });

                  try {
                    await deleteRoom(data.Id, authToken);
                    await queryClient.invalidateQueries(["RoomList"]);
                    dispatchPending({ type: "DONE" });
                  } catch (error) {
                    const err = assertIsError(error);
                    console.log(err)

                    dispatchPending({ type: "IS_ERROR" });
                    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
                  }
                }}
              >
                <img src={TrashPath} alt="delete" />
              </button>
              <button
                onClick={() => {
                  if (onClick === undefined) return;
                  onClick(data);
                }}
                type="button"
                className=" ml-4"
              >
                <img src={EditPath} alt="edit" />
              </button>
            </li>
          </ul>
        ))}
      </>
    </MotionFade>
  );
}

export default RoomCard;
