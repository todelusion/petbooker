import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
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

  const hotel = data?.Hotel[0];

  if (hotel === undefined) return <p>loading</p>;

  return (
    <div className="px-20 pt-40">
      <div className="flex-col-center ">
        <SearchBar className="mb-12" />
        <Photo data={hotel.HotelPhoto} className="mb-12" />
        <Info hotel={hotel} className="mb-12" />
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
      <h2 className="mb-4 w-full text-left text-2xl font-bold">空房狀況</h2>

      <section className="flex flex-col">
        {hotel.Room.map((room) => (
          <Room key={room.Id} data={room} />
        ))}
      </section>
    </div>
  );
}

export default Hotel;
