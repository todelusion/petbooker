/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect } from "react";
import { IinitFilter } from "../../context/FilterContext";
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
const Filter = React.memo(
  ({
    className,
    data,
    horizontal,
    closePet,
    closeFood,
    closeService,
    closeFacility,
    closeSpecial,
    closeRoomPrices,
  }: IFilterProps): JSX.Element => {
    // console.log("render Filter");
    const { FoodTypes, RoomPrices, PetType, Services, Specials, Facilities } =
      useFilter();

    console.log({
      FoodTypes,
      RoomPrices,
      PetType,
      Services,
      Specials,
      Facilities,
    });

    return (
      <>
        {!closePet && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-PetType"
            checked={data?.PetType ?? PetType}
            filterList={petLists}
            className={className ?? ""}
          />
        )}
        {!closeFood && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-FoodTypes"
            filterList={foodLists}
            checked={data?.FoodTypes ?? FoodTypes}
            className={className ?? ""}
          />
        )}
        {!closeRoomPrices && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-RoomPrices"
            filterList={pricesLists}
            checked={data?.RoomPrices ?? RoomPrices}
            className={className ?? ""}
          />
        )}
        {!closeService && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-Services"
            filterList={serviceLists}
            checked={data?.ServiceTypes ?? Services}
            className={className ?? ""}
          />
        )}
        {!closeFacility && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-Facilities"
            filterList={facilitiesLists}
            checked={data?.ServiceTypes ?? Facilities}
            className={className ?? ""}
          />
        )}
        {!closeSpecial && (
          <FilterInput
            horizontal={horizontal}
            action="PICK-Specials"
            filterList={specialsLists}
            checked={data?.ServiceTypes ?? Specials}
            className={className ?? ""}
          />
        )}
      </>
    );
  }
);

export default Filter;
