import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useLayoutEffect } from "react";
import { format } from "date-fns";
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
import useSearchBar from "../../hooks/useSearchBar";
import useModal from "../../hooks/useModal";

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
const useRedirect = (startDate: Date, endDate: Date): void => {
  const navigate = useNavigate();
  const { dispatchPending } = useModal();
  useEffect(() => {
    if (startDate.getTime() !== endDate.getTime()) return undefined;

    navigate("/home");
    dispatchPending({
      type: "IS_ERROR",
      payload: "必須入住日與退房日不得為空且不能相同",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);

    return clearInterval(
      setTimeout(() => dispatchPending({ type: "DONE" }), 1000)
    );
  }, [dispatchPending, endDate, navigate, startDate]);
};

function Hotel(): JSX.Element {
  const { id } = useParams();
  const { selection } = useSearchBar();
  useRedirect(selection.startDate, selection.endDate);
  const { data } = useHotel(id ?? "", selection.startDate, selection.endDate);
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
