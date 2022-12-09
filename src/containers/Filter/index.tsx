/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useState } from "react";
import { FilterAction, IinitFilter } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import {
  foodLists,
  petLists,
  pricesLists,
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "./data";
import FilterInput from "./FilterInput";

interface IFilterProps {
  data?: {
    PetType?: string;
    FoodTypes?: string[];
    RoomPrices?: string[];
    ServiceTypes?: string[];
  };
  className?: string;
  horizontal?: true;
  closeFood?: true;
  closeService?: true;
  closeFacility?: true;
  closeSpecial?: true;
  closeRoomPrices?: true;
  closePet?: true;
}

const useFilterDefault = (
  data: {
    PetType?: string;
    FoodTypes?: string[];
    RoomPrices?: string[];
    ServiceTypes?: string[];
  },

  filterDispatch: React.Dispatch<FilterAction>,
  setInitPetType: React.Dispatch<React.SetStateAction<string | undefined>>,
  setInitRoomPrices: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitFoodTypes: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitServices: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitFacilities: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setInitSpecials: React.Dispatch<React.SetStateAction<string[] | undefined>>
): void => {
  const foodInputValue = [...foodLists.contents].map((obj) => obj.value);
  const petInputValue = [...petLists.contents].map((obj) => obj.value);
  const servicesInputValue = [...serviceLists.contents].map((obj) => obj.value);
  const facilitiesInputValue = [...facilitiesLists.contents].map(
    (obj) => obj.value
  );
  const specialsInputValue = [...specialsLists.contents].map(
    (obj) => obj.value
  );

  const initFood = data?.FoodTypes?.filter((item) =>
    foodInputValue.includes(item)
  );
  const initPet = data?.PetType;
  const initServices = data?.ServiceTypes?.filter((item) =>
    servicesInputValue.includes(item)
  );

  const initFacilities = data?.ServiceTypes?.filter((item) =>
    facilitiesInputValue.includes(item)
  );

  const initSpecials = data?.ServiceTypes?.filter((item) =>
    specialsInputValue.includes(item)
  );

  useEffect(() => {
    console.log("in useFilterDefault useEffect");

    // setInitPetType(PetType);
    // setInitRoomPrices(RoomPrices);

    if (initFood !== undefined) {
      filterDispatch({ type: "PICK-FoodTypes", payload: initFood });
      setInitFood