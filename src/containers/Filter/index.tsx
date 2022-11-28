import React from "react";
import { FilterAction, IFilterContextProps } from "../../context/FilterContext";
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
        keyname={petLists.keyname}
        checked={PetType}
        title={petLists.title}
        contents={petLists.contents}
        type={petLists.type}
      />
      <FilterInput
        action="PICK-FoodTypes"
        keyname={foodLists.keyname}
        title={foodLists.title}
        contents={foodLists.contents}
        checked={FoodTypes}
        type={foodLists.type}
      />
      <FilterInput
        action="PICK-RoomPrices"
        keyname={pricesLists.keyname}
        title={pricesLists.title}
        checked={RoomPrices}
        contents={pricesLists.contents}
        type={pricesLists.type}
      />
      {serviceLists.map((item) => {
        let checkArray = [""];
        switch (item.keyname) {
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
            checked={checkArray}
            key={item.keyname}
            keyname={item.keyname}
            title={item.title}
            contents={item.contents}
            type={item.type}
          />
        );
      })}
    </ul>
  );
}

export default Filter;
