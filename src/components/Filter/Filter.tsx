import React, { useReducer, useState } from "react";
import { footLists, petLists } from "./data";
import FilterInput from "./FilterInput";

interface IinitFilterData {
  petType: string;
  foodTypes: string[];
}

export type FilterAction =
  | {
      type: "PETTYPE";
      payload: string;
    }
  | {
      type: "FOODTYPES";
      payload: string[];
    };

const filterDataReducer = (
  state: IinitFilterData,
  action: FilterAction
): IinitFilterData => {
  switch (action.type) {
    case "PETTYPE":
      return { ...state, petType: action.payload };
    case "FOODTYPES":
      return { ...state, foodTypes: action.payload };
    default:
      return state;
  }
};

function Filter(): JSX.Element {
  const [filterData, filterDataDispatch] = useReducer(filterDataReducer, {
    petType: "",
    foodTypes: [],
  });

  const foodTypes: string[] = [];
  const handleFilterValue = (e: React.FormEvent): void => {
    const { name, value, checked } = e.target as HTMLInputElement;
    const type = name as unknown as FilterAction["type"];

    // 為了避免變數重複宣告，因此在 case 後加上{}花括號，來限制作用域
    switch (type) {
      case "PETTYPE":
        filterDataDispatch({ type, payload: value });
        break;
      case "FOODTYPES":
        if (checked) {
          filterDataDispatch({
            type,
            payload: [...filterData.foodTypes, value],
          });
        } else {
          filterDataDispatch({
            type,
            payload: filterData.foodTypes.filter(
              (foodType) => foodType !== value
            ),
          });
        }
        break;

      default:
    }
    console.log(foodTypes);
  };
  console.log(filterData);

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
