/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect } from "react";
import { IinitFilter } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists, serviceLists } from "./data";
import FilterInput from "./FilterInput";

interface IFilterProps {
  className?: string;
  horizontal?: true;
  closeFood?: true;
  closeService?: true;
  closeRoomPrices?: true;
  closePet?: true;
  onChange: (filter: IinitFilter) => void;
}

function Filter({
  className,
  onChange,
  horizontal,
  closePet,
  closeFood,
  closeService,
  closeRoomPrices,
}: IFilterProps): JSX.Element {
  // console.log("render Filter");
  const { FoodTypes, ServiceTypes, RoomPrices, PetType } = useFilter();

  const handleChange = useCallback((): void => {
    const filter = {
      FoodTypes,
      ServiceTypes,
      RoomPrices,
      PetType,
    };
    onChange(filter);
  }, [FoodTypes, PetType, RoomPrices, ServiceTypes, onChange]);

  handleChange();

  return (
    <>
      {!closePet && (
        <FilterInput
          horizontal={horizontal}
          action="PICK-PetType"
          checked={PetType}
          filterList={petLists}
          className={className ?? ""}
        />
      )}
      {!closeFood && (
        <FilterInput
          horizontal={horizontal}
          action="PICK-FoodTypes"
          filterList={foodLists}
          checked={FoodTypes}
          className={className ?? ""}
        />
      )}
      {!closeRoomPrices && (
        <FilterInput
          horizontal={horizontal}
          action="PICK-RoomPrices"
          filterList={pricesLists}
          checked={RoomPrices}
          className={className ?? ""}
        />
      )}
      {!closeService &&
        serviceLists.map((list) => {
          let checkArray = [""];
          switch (list.keyname) {
            case "services":
              checkArray = ServiceTypes.services;
              break;
            case "facilities":
              checkArray = ServiceTypes.facilities;
              break;
            case "specials":
              checkArray = ServiceTypes.specials;
              break;
            default:
              break;
          }
          return (
            <FilterInput
              horizontal={horizontal}
              action="PICK-ServiceTypes"
              filterList={list}
              checked={checkArray}
              key={list.keyname}
              className={className ?? ""}
            />
          );
        })}
    </>
  );
}

export default Filter;
