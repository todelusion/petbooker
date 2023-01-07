import { Hotel } from "../../types/schema";
import { sortedServiceTypesLogos } from "../../utils/servicesTranslator";

interface IInfoProps {
  hotel: Hotel["Hotel"][0];
  className?: string;
}

function Info({ hotel, className }: IInfoProps): JSX.Element {
  return (
    <section className={className}>
      <ul className="mb-4 flex h-20">
        <li className="flex-center h-20 w-24 rounded-xl bg-primary p-4 text-4xl font-bold text-white">
          <span>{hotel.HotelScore}</span>
        </li>
        <li className="ml-6">
          <h2 className="mb-2 py-1 text-4xl font-bold">{hotel.HotelName}</h2>
          <div className="flex items-center pl-1 text-sm text-stone-400">
            <span>{hotel.HotelAddress}</span>
            <hr
              style={{ borderStyle: "solid" }}
              className="mx-4 block h-5 border-r-2"
            />
            <span>{hotel.HotelPhone}</span>
            <hr
              style={{ borderStyle: "solid" }}
              className="mx-4 block h-5 border-r-2"
            />
            <span>{`每日${hotel.HotelStartTime}－${hotel.HotelEndTime}`}</span>
          </div>
        </li>
      </ul>
      <p className="mb-4 pl-1 text-sm text-stone-600">{hotel.HotelInfo}</p>
      <ul className="flex flex-wrap">
        {sortedServiceTypesLogos(hotel.HotelService, "Services").map(
          (content) => (
            <li
              key={content.descript}
              className="mx-2 mb-1 flex items-center rounded-3xl border-2 border-black py-1 px-3"
            >
              <img src={content.logo} alt="" width="16" />
              <span className="ml-1 text-xs">{content.descript}</span>
            </li>
          )
        )}
        {sortedServiceTypesLogos(hotel.HotelService, "Facilities").map(
          (content) => (
            <li
              key={content.descript}
              className="mx-2 mb-1 flex items-center rounded-3xl border-2 border-black py-1 px-3"
            >
              <img src={content.logo} alt="" width="16" />
              <span className="ml-1 text-xs">{content.descript}</span>
            </li>
          )
        )}
        {sortedServiceTypesLogos(hotel.HotelService, "Specials").map(
          (content) => (
            <li
              key={content.descript}
              className="mx-2 mb-1 flex items-center rounded-3xl border-2 border-black py-1 px-3"
            >
              <img src={content.logo} alt="" width="16" />
              <span className="ml-1 text-xs">{content.descript}</span>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

Info.defaultProps = {
  className: "",
};

export default Info;
