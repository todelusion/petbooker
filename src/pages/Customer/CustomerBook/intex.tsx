import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import UserAuth from "../../../context/UserAuthContext";
import useFilter from "../../../hooks/useFilter";
import useSearchBar from "../../../hooks/useSearchBar";
import { Hotel } from "../../../types/schema";
import { useUserInfo } from "../../../utils/api/user";
import petCard from "../CustomerPet/data";

function CustomerBook(): JSX.Element {
  const { id, room, price } = useParams();
  const { authToken } = useContext(UserAuth);
  const { data: user } = useUserInfo(authToken);
  const queryClient = useQueryClient();
  const { selection } = useSearchBar();
  const hotel = queryClient.getQueryData<Hotel>(["Hotel"])?.Hotel[0];
  console.log(user);
  console.log(hotel);
  const { PetType, FoodTypes, Facilities, Services, Specials } = useFilter();
  console.log({ id, room });
  return (
    <div className="flex-center pt-32 pb-28">
      <div className="w-full max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold">預約資料確認</h2>
        <p className=" mb-4 text-2xl font-bold text-gray-500">寵物名片</p>
        <section className="mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
          <ul className="mr-5 basis-2/12">
            <li className=" mb-6 h-40">
              {petCard.PetPhoto === null ? (
                <div className="h-full w-full bg-gray-200" />
              ) : (
                <img
                  src={petCard.PetPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </li>
            <li className="text-xl font-bold">{petCard.PetName}</li>
          </ul>

          <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-1 border-r-2">
            <li className="mb-2 font-bold">寵物資訊</li>
            <li>
              <span>寵物類型：</span>
              <span>{PetType}</span>
            </li>
            <li>
              <span>年齡：</span>
              <span>{petCard.PetAge}</span>
            </li>
            <li>
              <span>性別：</span>
              <span>{petCard.PetSex}</span>
            </li>
            <li>
              <span>飲食偏好：</span>
              {FoodTypes.map((food, index, arr) => (
                <React.Fragment key={food}>
                  <span>{food}</span>
                  {index < arr.length - 1 && <span>、</span>}
                </React.Fragment>
              ))}
            </li>
            <li>
              <span>個性：</span>
              <span>{petCard.PetPersonality}</span>
            </li>
            <li>
              <span>服用藥物</span>
              <span>{petCard.PetMedicine}</span>
            </li>
            <li>
              <span>備註</span>
              <span>{petCard.PetNote}</span>
            </li>
          </ul>
          <ul className="basis-6/12">
            <li className="mb-1 font-bold">旅館需求</li>
            {Services.length < 1 &&
              Facilities.length < 1 &&
              Specials.length < 1 && <p>無</p>}
            {Services.length > 0 && (
              <li className="mb-4 ">
                <p className="mb-4">服務內容：</p>
                <p className="-ml-1">
                  {Services.map((service) => (
                    <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                      {service}
                    </span>
                  ))}
                </p>
              </li>
            )}
            {Facilities.length > 0 && (
              <li className="mb-4">
                <p className="mb-4">設施條件：</p>
                <p className="-ml-1">
                  {Facilities.map((facility) => (
                    <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                      {facility}
                    </span>
                  ))}
                </p>
              </li>
            )}
            {Specials.length > 0 && (
              <li>
                <p className="mb-4">特殊需求：</p>
                <p className="-ml-1">
                  {Specials.map((special) => (
                    <span className="mr-2 rounded-full border-2 border-black px-4 py-2">
                      {special}
                    </span>
                  ))}
                </p>
              </li>
            )}
          </ul>
        </section>
        <p className=" mb-4 text-2xl font-bold text-gray-500">預約資訊</p>
        {hotel === undefined ? (
          <p>無訂單資訊，請重新選擇房型</p>
        ) : (
          <section className="mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
            <ul className="mr-5 basis-2/12">
              <li className=" mb-6 h-40">
                {hotel.HotelPhoto.length < 0 ? (
                  <div className="h-full w-full bg-gray-200" />
                ) : (
                  <img
                    src={hotel?.HotelPhoto[2]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </li>
              <li className="text-xl font-bold">{hotel.HotelName}</li>
            </ul>

            <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-1 border-r-2">
              <li className="mb-2 font-bold">訂房資訊</li>
              <li>
                <span>房型：</span>
                <span>{room}</span>
              </li>
              <li>
                <span>入住日期：</span>
                <span>{format(selection.startDate, "yyyy/MM/dd")}</span>
              </li>
              <li>
                <span>退房日期：</span>
                <span>{format(selection.endDate, "yyyy/MM/dd")}</span>
              </li>
              <li>
                <span>總計入住：</span>
                <span>
                  {(selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                    86400000}
                  天
                </span>
              </li>
              <li>
                <span>訂單價格：</span>
                <span>
                  NTD
                  {((selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                    86400000) *
                    Number(price)}
                </span>
              </li>
            </ul>
            <ul className="basis-6/12">
              <li className="mb-1 font-bold">飼主資訊</li>
            </ul>
          </section>
        )}
        <Button type="Secondary" text="確認訂房" className="py-2 px-4" />
      </div>
    </div>
  );
}

export default CustomerBook;
