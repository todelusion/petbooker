import { useParams } from "react-router-dom";
import { Hotels } from "../../components/HotelCard/data";
import SearchBar from "../../containers/SearchBar";
import Image from "./Image";
import Info from "./Info";

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
}

function Hotel(): JSX.Element {
  const { id } = useParams();
  const hotel = Hotels.find((_hotel) => _hotel.Id === id);

  if (hotel === undefined) return <p>系統錯誤</p>;
  return (
    <div className="flex-col-center px-20 pt-40">
      <SearchBar className="mb-12" />
      <Image hotel={hotel} className="mb-12" />
      <Info hotel={hotel} />
    </div>
  );
}

export default Hotel;
