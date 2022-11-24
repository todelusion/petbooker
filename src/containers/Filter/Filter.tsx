import React, { useReducer, useState } from "react";
import { FilterAction } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists, serviceLists } from "./data";
import FilterInput from "./FilterInput";

interface IFilterInput extends React.HTMLAttributes<HTMLInputElement> {
  "data-action"?: string;
}

function Filter(): JSX.Element {
  const { filterDispatch, FoodTypes, PetType, RoomPrices } = useFilter();
  console.log({ FoodTypes, PetType, RoomPrices });

  const handleFilterValue = (e: React.FormEvent): void => {
    console.log(e.target);
    const { name, value, checked } = e.target as HTMLInputElement;
    console.log(test);
    // console.log({ name, value, checked });
    return;
    const type = name as unknown as FilterAction["type"];

    // 為了避免變數重複宣告，因此在 case 後加上{}花括號，來限制作用域
    switch (type) {
      case "PICK-PetType":
        filterDispatch({ type, payload: value });
        break;
      case "PICK-FoodTypes":
        if (checked) {
          filterDispatch({
            type,
            payload: [...FoodTypes, value],
          });
        } else {
          filterDispatch({
            type,
            payload: FoodTypes.filter((FoodType) => FoodType !== value),
          });
        }
        break;
      case "PICK-RoomPrices":
        if (checked) {
          filterDispatch({
            type,
            payload: [...RoomPrices, value],
          });
        } else {
          filterDispatch({
            type,
            payload: RoomPrices.filter((RoomPrice) => RoomPrice !== value),
          });
        }
        break;

      default:
    }
  };

  return (
    <ul className="w-60 rounded-md border-2 border-black">
      <li className="bg-black py-2 text-center text-xl text-white">
        透過以下分類搜尋
      </li>
      <FilterInput
        action="PICK-PetType"
        title={petLists.title}
        contents={petLists.contents}
        handleInputValue={handleFilterValue}
        type={petLists.type}
      />
      <FilterInput
        action="PICK-FoodTypes"
        title={foodLists.title}
        contents={foodLists.contents}
        handleInputValue={handleFilterValue}
        type={foodLists.type}
      />
      <FilterInput
        action="PICK-RoomPrices"
        title={petLists.title}
        contents={pricesLists.contents}
        handleInputValue={handleFilterValue}
        type={pricesLists.type}
      />
      {serviceLists.map((item) => (
        <FilterInput
          action="ServiceTypes"
          title={petLists.title}
          contents={pricesLists.contents}
          handleInputValue={handleFilterValue}
          type={pricesLists.type}
        />
      ))}
    </ul>
  );
}

export default Filter;
