import React from "react";
import { Link } from "react-router-dom";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";
import { useNavContext } from "../Layout/Nav";

function Home(): JSX.Element {
  const { status, dispatchPending } = useNavContext();
  const { isLoading } = status;

  return (
    <div className="relative flex w-full items-start justify-evenly px-20 pt-40">
      <Filter className="max-w-xs" />

      <div className="flex max-w-2xl flex-col items-center xl:max-w-4xl">
        <SearchBar className="mb-16" />
        <div className="flex flex-col items-end">
          <DropDownList className="mb-3" />
          <HotelCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
