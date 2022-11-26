import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Hotels } from "../components/HotelCard/data";

function Hotel(): JSX.Element {
  const { id } = useParams();
  const hotel = Hotels.find((_hotel) => _hotel.Id === id);
  console.log(hotel);

  return <div>Hotel</div>;
}

export default Hotel;
