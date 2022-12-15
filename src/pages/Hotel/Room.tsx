import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import type { IRoom } from "./data";

interface IRoomProps {
  data: IRoom;
  onClick: () => void;
}

function Room({ data, onClick }: IRoomProps): JSX.Element {
  return (
    <ul className="mb-6 flex h-70 justify-between border-2">
      <li className="h-full basis-4/12">
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
      <li className="flex w-full py-8 px-6">
        <div className="basis-2/3">
          <h3 className="mb-4 text-2xl font-bold">{data.RoomName}</h3>
          <p className="text-sm text-stone-400">{data.RoomInfo}</p>
        </div>
        <hr
          style={{ borderStyle: "solid" }}
          className="mx-8 block h-full border-r-2 border-stone-300"
        />
        <div className="flex-col-center basis-1/3">
          <h4 className="mb-4 whitespace-nowrap text-xl font-bold text-stone-700 lg:text-2xl">
            NTD&nbsp;&nbsp;{data.RoomPrice}
            &nbsp;起&nbsp;/日
          </h4>
          <Button
            text="立即預定"
            className="px-5 py-2"
            type="Secondary"
            textSize="text-sm lg:text-base"
            onClick={onClick}
          />
        </div>
      </li>
    </ul>
  );
}

export default Room;
