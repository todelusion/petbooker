import React from "react";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists, serviceLists } from "./data";
import FilterInput from "./FilterInput";

function Filter({ className }: { className: string }): JSX.Element {
  const FilterContextProps = useFilter();
  const { PetType, FoodTypes, RoomPrices, ServiceTypes } = FilterContextProps;

  return (
    <ul className={`${className} rounded-md border-2 border-black`}>
      <li className="bg-black py-2 text-center text-xl text-white">
        透過以下分類搜尋
      </li>
      <FilterInput
        action="PICK-PetType"
        checked={PetType}
        filterList={petLists}
      />
      <FilterInput
        action="PICK-FoodTypes"
        filterList={foodLists}
        checked={FoodTypes}
      />
      <FilterInput
        action="PICK-RoomPrices"
        filterList={pricesLists}
        checked={RoomPrices}
      />
      {serviceLists.map((list) => {
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
            action="PICK-ServiceTypes"
            filterList={list}
            checked={checkArray}
            key={list.keyname}
          />
        );
      })}
    </ul>
  );
}

export default Filter;
