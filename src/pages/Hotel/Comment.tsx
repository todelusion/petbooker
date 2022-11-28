import React from "react";
import { IComment } from "./data";

interface ICommentProps {
  data: IComment;
  className?: string;
}

function Comment({ data, className }: ICommentProps): JSX.Element {
  return (
    <div
      className={`h-40 w-100 rounded-xl border-2 p-6 ${className as string} `}
    >
      <ul>
        <li className="mb-4 flex justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-black">
              {data.UserPhoto !== "" ? (
                <img
                  src={data.UserPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className=" h-full w-full bg-gray-200" />
              )}
            </div>
            <p className="ml-4 font-bold">{data.UserName}</p>
          </div>
          <div className=" rounded-lg bg-primary p-2 text-2xl font-bold text-white">
            {data.Score}
          </div>
        </li>
        <p className="line-clamp-2 ">{data.descript}</p>
      </ul>
    </div>
  );
}

Comment.defaultProps = {
  className: "",
};

export default Comment;
