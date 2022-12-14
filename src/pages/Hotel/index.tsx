import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { Hotels } from "../../components/HotelCard/data";
import Comment from "./Comment";
import { Comments as comments, Rooms as rooms } from "./data";
import SearchBar from "../../containers/SearchBar";
import Photo from "./Photo";
import Info from "./Info";
import type {
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "../../containers/Filter/data";
import Room from "./Room";
import { useHotel } from "../../utils/api/home";
import { LoadingCustom } from "../../img/icons";
import MotionFade from "../../containers/MotionFade";

export interface IHotel {
  Id: string;
  HotelName: string;
  HotelPhone: string;
  HotelAddress: string;
  HotelStartTime: string;
  HotelEndTime: string;
  HotelInfo: string;
  HotelPhoto: string[];
  AreaId: string;
  price: number;
  HotelScore: number;
  serviceLists: typeof serviceLists;
  facilitiesLists: typeof facilitiesLists;
  specialsLists: typeof specialsLists;
}

function Hotel(): JSX.Element {
  const { id } = useParams();
  const { data } = useHotel(id ?? "");
  console.log(data);

  return (
    <div className="px-20 pt-40">
      <AnimatePresence>
        {data === undefined ? (
          <LoadingCustom
            key="Loading"
            className="absolute left-1/2 top-1/2"
            color="bg-second"
          />
        ) : (
          <MotionFade key="Hotel">
            <>
              <div className="flex-col-center ">
                <SearchBar className="mb-12" />
                <Photo data={data.Hotel[0].HotelPhoto} className="mb-12" />
                <Info hotel={data.Hotel[0]} className="mb-12" />
                <Swiper
                  slidesPerView={3}
                  navigation
                  modules={[Navigation]}
                  className="flex w-full"
                >
                  {comments.map((comment) => (
                    <SwiperSlide key={comment.UserName}>
                      <Comment data={comment} className="mx-auto" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <hr
                style={{ borderStyle: "solid" }}
                className="my-12 block border-b-[1px] border-stone-300"
              />
              <h2 className="mb-4 w-full text-left text-2xl font-bold">
                空房狀況
              </h2>

              <section className="flex flex-col">
                {data.Hotel[0].Room.map((room) => (
                  <Room key={room.Id} data={room} />
                ))}
              </section>
            </>
          </MotionFade>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Hotel;
