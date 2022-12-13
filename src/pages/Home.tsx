import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";
import StatusModal from "../Layout/StatusModal";
import useModal from "../hooks/useModal";
import useFilter from "../hooks/useFilter";
import useSearchBar from "../hooks/useSearchBar";
import { ISearchBarContextProps } from "../context/SearchBarContext";
import { IFilterContextProps } from "../context/FilterContext";
import { useHotelList } from "../utils/api/home";
import { LoadingCustom } from "../img/icons";
import MotionFade from "../containers/MotionFade";

function Home(): JSX.Element {
  const { selection, area } = useSearchBar();
  const { Facilities, FoodTypes, PetType, RoomPrices, Services, Specials } =
    useFilter();

  const { data } = useHotelList({
    AreaId: Number(area.value),
    PetType,
    FoodTypes,
    ServiceTypes: [...Facilities, ...Services, ...Specials],
    CheckInDate: format(selection.startDate, "yyyy/M/d"),
    CheckOutDate: format(selection.endDate, "yyyy/M/d"),
    PriceRange: RoomPrices,
    Page: 1,
    PageSize: 5,
  });
  // console.log(data);

  return (
    <div className="relative flex w-full items-start justify-evenly px-20 pt-40">
      <section className=" basis-2/12 rounded-md border-2 border-black">
        <p className="bg-black py-2 text-center text-xl text-white">
          透過以下分類搜尋
        </p>
        <Filter />
      </section>
      <div className="flex max-w-2xl basis-10/12 flex-col items-center xl:max-w-4xl">
        <SearchBar className="mb-20" />
        <div className="relative w-full">
          <DropDownList className="absolute right-0 -top-12 mb-3" />
          <AnimatePresence>
            {data === undefined ? (
              <LoadingCustom
                key="Loading"
                className="absolute left-1/2"
                color="bg-second"
              />
            ) : (
              <MotionFade key="HotelCard">
                <HotelCard data={data.Data} />
              </MotionFade>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Home;
