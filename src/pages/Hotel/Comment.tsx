import { Hotel } from "../../types/schema";

interface ICommentProps {
  data: Hotel["Hotel"][0]["HotelComment"][0];
  className?: string;
}

function Comment({ data, className }: ICommentProps): JSX.Element {
  return (
    <div
      className={`h-40 max-w-[400px] rounded-xl border-2 p-6 ${
        className as string
      } `}
    >
      <ul>
        <li className="mb-4 flex justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-black">
              {data.UserPhoto !== null ? (
                <img
                  src={data.UserPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className=" h-full w-full bg-gray-200" />
              )}

              <div className=" h-full w-full bg-gray-200" />
            </div>
            <p className="ml-4 font-bold">{data.UserName}</p>
          </div>
          <div className=" rounded-lg bg-primary p-2 text-2xl font-bold text-white">
            {Number(data.Score).toFixed(1)}
          </div>
        </li>
        <p className="line-clamp-2 ">{data.Comment}</p>
      </ul>
    </div>
  );
}

Comment.defaultProps = {
  className: "",
};

export default Comment;
