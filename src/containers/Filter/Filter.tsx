import React, { useReducer, useState } from "react";
import { FilterAction } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { footLists, petLists } from "./data";
import FilterInput from "./FilterInput";

function Filter(): JSX.Element {
  const { filterDispatch, foodTypes, petType } = useFilter();

  const handleFilterValue = (e: React.FormEvent): void => {
    const { name, value, checked } = e.target as HTMLInputElement;
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
            payload: [...foodTypes, value],
          });
        } else {
          filterDispatch({
            type,
            payload: foodTypes.filter((foodType) => foodType !== value),
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
        filterList={footLists}
        handleInputValue={handleFilterValue}
        inputName="FOODTYPES"
        inputType="checkbox"
      />
    </ul>
  );
}

export default Filter;
