import React, { useReducer, useState } from "react";
import { FilterAction } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists, serviceLists } from "./data";
import FilterInput from "./FilterInput";

function Filter(): JSX.Element {
  const { filterDispatch, FoodTypes, PetType, RoomPrices } = useFilter();
  // console.log({ FoodTypes, PetType, RoomPrices });

  const handleFilterValue = (e: React.FormEvent): void => {
    const element = e.target as HTMLInputElement;
    const { value, checked } = element;
    const action = element.getAttribute("data-action");
    console.log({ value, checked, action });

    // 為了避免變數重複宣告，因此在 case 後加上{}花括號，來限制作用域
    switch (action) {
      case "PICK-PetType":
        filterDispatch({ type: action, payload: value });
        break;
      case "PICK-FoodTypes":
        if (checked) {
          filterDispatch({
            type: action,
            payload: [...FoodTypes, value],
          });
        } else {
          filterDispatch({
            type: action,
            payload: FoodTypes.filter((FoodType) => FoodType !== value),
          });
        }
        break;
      case "PICK-RoomPrices":
        if (checked) {
          filterDispatch({
            type: action,
            payload: [...RoomPrices, value],
          });
        } else {
          filterDispatch({
            type: action,
            payload: RoomPrices.filter((RoomPrice) => RoomPrice !== value),
          });
        }
        break;

      default:
        break;
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
          key={item.keyname}
          action="ServiceTypes"
          title={item.title}
          contents={item.contents}
          handleInputValue={handleFilterValue}
          type={item.type}
        />
      ))}
    </ul>
  );
}

export default Filter;
