import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";
import useFilter from "../hooks/useFilter";
import useSearchBar from "../hooks/useSearchBar";
import { useHotelList } from "../utils/api/home";

import MotionFade from "../containers/MotionFade";
import PageNums from "../components/PageNums";
import LoadingScreen from "../components/LoadingModal";
import Fail from "./Customer/CustomerBook/Fail/Fail";
import errorNavigate from "../hooks/errorNavigate";

function Home(): JSX.Element {
  const [current, setCurrent] = useState(1);
  const navigae = useNavigate();
  const queryClient = useQueryClient();
  const { selection, area } = useSearchBar();
  const { Facilities, FoodTypes, PetType, RoomPrices, Services, Specials } =
    useFilter();

  const { data, isError } = useHotelList({
    AreaId: Number(area.value),
    PetType,
    FoodTypes,
    ServiceTypes: [...Facilities, ...Services, ...Specials],
    CheckInDate: format(selection.startDate, "yyyy/M/d"),
    CheckOutDate: format(selection.endDate, "yyyy/M/d"),
    PriceRange: RoomPrices,
    Page: current,
    PageSize: 5,
  });

  if (isError) {
    navigae("/404");
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[1440px] items-start justify-evenly px-20 pt-40 pb-28">
      <section className=" rounded-md border-2 border-black">
        <p className="bg-black py-2 text-center text-xl text-white">
          透過以下分類搜尋
        </p>
        <Filter />
      </section>
      <div className="flex max-w-2xl basis-10/12 flex-col items-center xl:max-w-4xl">
        <SearchBar className="mb-20" />
        <div className="relative pt-10">
          {/* <DropDownList className="absolute right-0 -top-12" /> */}
          <AnimatePresence>
            {data === undefined ? (
              <AnimatePresence>
                <LoadingScreen />
              </AnimatePresence>
            ) : (
              <MotionFade key="HotelCard">
                <>
                  <PageNums
                    onClick={async () => {
                      queryClient.removeQueries(["HotelList"]);
                    }}
                    setCurrent={setCurrent}
                    current={current}
                    total={data.Totalpage}
                    className="flex-center absolute -top-12 mb-10 w-full"
                  />
                  <HotelCard data={data.hotelInfo} />
                </>
              </MotionFade>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Home;
