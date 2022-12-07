import React from "react";
import { RoomList } from "../../../types/schema";

interface IRoomProps {
  data: RoomList;
  className?: string;
}

function Room({ data, className }: IRoomProps): JSX.Element {
  return (
    <div className={className}>
      <ul>
        {data.map((item) => (
          <li key={item.Id} className=" border-2">
            <p>{item.RoomName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Room;
