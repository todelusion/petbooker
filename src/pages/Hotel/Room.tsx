import React from "react";
import type { IRoom } from "./data";

interface IRoomProps {
  data: IRoom;
}

function Room({ data }: IRoomProps): JSX.Element {
  return (
    <ul className="h-120 border-2">
      <li className=" max-w-md">
        {data.RoomPhoto !== "" ? (
          <img
            src={data.RoomName}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className=" h-full w-full bg-gray-200" />
        )}
      </li>
      <li />
      <li />
    </ul>
  );
}

export default Room;
