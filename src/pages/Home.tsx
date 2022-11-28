import React from "react";
import { Link } from "react-router-dom";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";

function Home(): JSX.Element {
  return (
    <div className="relative flex w-full items-start justify-evenly px-20 pt-40">
      <Filter className="basis-3/12 xl:basis-2/12" />

      <div className="flex basis-6/12 flex-col items-center lg:basis-8/12">
        <SearchBar className="mb-16" />
        <div className="flex w-full flex-col items-end">
          <DropDownList className="mb-3" />
          <HotelCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
