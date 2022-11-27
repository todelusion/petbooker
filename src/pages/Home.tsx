import React from "react";
import { Link } from "react-router-dom";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter/Filter";
import HotelCard from "../components/HotelCard/HotelCard";
import SearchBar from "../containers/SearchBar/SearchBar";

function Home(): JSX.Element {
  return (
    <div className="relative flex items-start justify-evenly pt-40">
      <Filter />

      <div className="flex-col-center">
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
