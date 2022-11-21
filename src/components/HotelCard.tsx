import React from "react";

const hotelList = [
  {
    title: "小室照護",
    descript:
      "杜莉德寵物旅館，給毛寶貝們最棒的度假體驗，也給主人最放心的安親空間",
    price: 1000,
    score: 9.6,
    thumbnail: undefined,
  },
  {
    title: "寵 hostel",
    descript:
      "杜莉德寵物旅館，給毛寶貝們最棒的度假體驗，也給主人最放心的安親空間",
    price: 500,
    score: 9.1,
    thumbnail: undefined,
  },
];

const favList = ["寵 hostel", "繽紛旅店"];

function HotelCard(): JSX.Element {
  return (
    <>
      {hotelList.map((hotel) => (
        <div
          key={hotel.title}
          className="mb-6 inline-flex h-[360px] w-[960px] border-2"
        >
          <div className="w-1/2">
            {hotel.thumbnail !== undefined ? (
              <img src="" alt="thumbnail" className="h-full w-full" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
          </div>
          <ul className="w-1/2">
            <li className="mb-4 text-2xl font-bold">{hotel.title}</li>
            <li className="mb-4 h-52 text-clip">{hotel.descript}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default HotelCard;
