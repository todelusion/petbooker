import React, { useReducer, useState } from "react";
import { FilterAction } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists } from "./data";
import FilterInput from "./FilterInput";

function Filter(): JSX.Element {
  const { filterDispatch, FoodTypes, PetType, RoomPrices } = useFilter();
  console.log({ FoodTypes, PetType, RoomPrices });

  const handleFilterValue = (e: React.FormEvent): void => {
    const { name, value, checked } = e.target as HTMLInputElement;
    // console.log({ name, value, checked });

    const type = name as unknown as FilterAction["type"];

    // 為了避免變數重複宣告，因此在 case 後加上{}花括號，來限制作用域
    switch (type) {
      case "PETTYPE":
        filterDispatch({ type, payload: value });
        break;
      case "FOODTYPES":
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
      case "ROOMPRICES":
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
        filterTitle="寵物類型"
        filterList={petLists}
        inputName="PETTYPE"
        handleInputValue={handleFilterValue}
        inputType="radio"
      />
      <FilterInput
        filterTitle="飲食偏好"
        filterList={foodLists}
        handleInputValue={handleFilterValue}
        inputName="FOODTYPES"
        inputType="checkbox"
      />
      <FilterInput
        filterTitle="房間價位"
        filterList={pricesLists}
        handleInputValue={handleFilterValue}
        inputName="ROOMPRICES"
        inputType="checkbox"
      />
    </ul>
  );
}

export default Filter;
