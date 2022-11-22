import React from "react";
import Button from "./Button";

const hotelList = [
  {
    HotelName: "小室照護",
    HotelInfo:
      "杜莉德寵物旅館，給毛寶貝們最棒的度假體驗，也給主人最放心的安親空間",
    price: 1000,
    score: 9.6,
    thumbnail: undefined,
  },
  {
    HotelName: "寵 hostel",
    HotelInfo:
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
          key={hotel.HotelName}
          className="mb-6 flex h-96 w-[960px] border-2"
        >
          <div className="relative w-1/2 max-w-md ">
            {hotel.thumbnail !== undefined ? (
              <img src="" alt="thumbnail" className="h-full w-full" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <div className="absolute left-6 top-6 rounded-3xl bg-primary p-4 text-4xl font-bold text-white">
              {hotel.score}
            </div>
          </div>
          <ul className="flex w-1/2 flex-col justify-between p-6 ">
            <li className="text-2xl font-bold">{hotel.HotelName}</li>
            <li className="text-overflow mb-4 w-96 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              alias quisquam dolorem atque modi reprehenderit pariatur rem eius,
              consectetur, placeat nulla dolore ducimus, illo odit porro quas
              possimus neque. Aspernatur cum ab quidem, deleniti consectetur
              vitae perferendis recusandae dolore nobis debitis accusamus
              corporis maiores, cumque ducimus delectus nihil repudiandae unde
              ex consequuntur maxime dolor itaque doloribus! Aspernatur error
              fugit sequi maxime esse unde et, veritatis vitae enim. Quod, quis
              optio! Beatae nulla eius temporibus pariatur impedit accusantium
              ab est aspernatur distinctio optio eveniet totam suscipit tenetur
              repudiandae dolorum nemo alias perferendis quaerat asperiores,
              laudantium officiis mollitia. Consequatur modi natus dolorem quo
              fuga rem obcaecati beatae minima officiis expedita quam, sed
              dolores adipisci quos suscipit tempora consectetur delectus?
              Architecto consectetur reiciendis, ipsum omnis, repellendus dicta
              ex laboriosam sequi rerum perferendis facilis, quas voluptates!
              Velit, quos optio soluta iusto corporis aut rem molestias, itaque,
              temporibus consectetur quia nemo quod nihil nobis. Officia labore
              ab voluptate commodi repellendus a impedit. Accusamus assumenda
              corporis, aperiam cum architecto molestiae laudantium consequatur
              beatae rerum dolores ipsam cupiditate hic recusandae natus
              dignissimos culpa deleniti amet nam minus repudiandae cumque! Quia
              sed illum est magnam perspiciatis provident, possimus veritatis
              facere, dolor eaque minus atque commodi eos saepe perferendis!
            </li>
            <li className="inline-flex items-center justify-between">
              <p className="text-xl font-bold tracking-wide text-gray-600">
                NTD&nbsp;&nbsp;{hotel.price}
                &nbsp;起&nbsp;/日
              </p>
              <Button
                type="Secondary"
                text="選擇房間"
                className="py-2 px-5 text-sm"
              />
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default HotelCard;
