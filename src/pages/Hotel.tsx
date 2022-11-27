import axios from "axios";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Hotels } from "../components/HotelCard/data";
import SearchBar from "../containers/SearchBar/SearchBar";
import useSearchBar from "../hooks/useSearchBar";

function Hotel(): JSX.Element {
  const { id } = useParams();
  const value = useSearchBar();
  console.log(value);

  const hotel = Hotels.find((_hotel) => _hotel.Id === id);
  console.log(hotel);

  if (hotel === undefined) return <p>系統錯誤</p>;

  return (
    <div className="flex-col-center pt-40">
      <SearchBar className="mb-12" />
      <div className="h-14 w-14">
        {hotel.HotelPhoto[0] !== "" ? (
          <img
            src={hotel.HotelPhoto[0]}
            alt="thumbnail"
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full bg-primary" />
        )}
      </div>
    </div>
  );
}

export default Hotel;
