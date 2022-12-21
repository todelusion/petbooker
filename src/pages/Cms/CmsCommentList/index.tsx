import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import MotionFade from "../../../containers/MotionFade";
import UserAuth from "../../../context/UserAuthContext";
import useModal from "../../../hooks/useModal";
import { LoadingCustom, LoadingPath, PlusPath } from "../../../img/icons";
import { useRoomList } from "../../../utils/api/cmsRoom";
import { Room } from "../../../types/schema";
import { useCmsCommentList } from "../../../utils/api/cmsCommentList";

function CmsCommentList(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const { data } = useCmsCommentList(authToken);
  console.log(data);

  return (
    <div className="flex w-full max-w-5xl flex-col items-end ">
      <AnimatePresence />
      <ul className="w-full">
        {data?.map((item) => (
          <li className="relative mb-4 flex h-40  justify-between rounded-xl border-2 p-6">
            <div className="flex flex-col  justify-center ">
              {`入住日期 ${item.checkInDateOnly} - ${item.checkOutDateOnly}`}
              <p className=" mt-2 font-bold ">{item.RoomName}</p>
            </div>
            <div className=" w-[1px] border-2 " />
            <div className=" w-full max-w-[600px]">
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-black">
                  {item.UserThumbnail !== "" ? (
                    <img
                      src={item.UserThumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className=" h-full w-full bg-gray-200" />
                  )}
                </div>
                <p className="ml-4 font-bold">{item.UserName}</p>
              </div>
              <div className=" absolute top-2 right-2 flex w-10 justify-center rounded-lg bg-primary p-2 text-2xl font-bold text-white">
                {item.Score}
              </div>
              <p className="mt-3 line-clamp-2">{item.Comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CmsCommentList;
