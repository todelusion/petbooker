import React, { useReducer, useState } from "react";
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

const petLists = [
  {
    type: "smallDog",
    descript: "小型犬 ( 體重 < 8 公斤 )",
  },
  {
    type: "mediumDog",
    descript: "中型犬 ( 體重 8 - 20 公斤 )",
  },
  {
    type: "largeDog",
    descript: "大型犬 ( 體重 > 20 公斤 )",
  },
  {
    type: "cat",
    descript: "貓",
  },
];

const footLists = [
  {
    type: "wetFood",
    descript: "濕食",
  },
  {
    type: "freshFood",
    descript: "鮮食",
  },
  {
    type: "dryFood",
    descript: "濕食",
  },
  {
    type: "myOwnFood",
    descript: "自行攜帶",
  },
];

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

      {/* <li className="p-4">
        <p className="font-bold">寵物類型</p>
        <form name="FoodTypes">
          {footLists.map((food) => (
            <div className="py-4">
              <label
                htmlFor={food.footType}
                className="inline-flex w-full cursor-pointer items-center text-sm"
              >
                <input
                  type="checkbox"
                  value={food.footType}
                  onClick={handleCheckBox}
                  id={food.footType}
                  className="h-5 w-5 cursor-pointer appearance-none border-2 border-black duration-100 checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark   hover:border-primary"
                />
                <span className="ml-2">{food.descript}</span>
              </label>
            </div>
          ))}
        </form>
      </li> */}
    </ul>
  );
}

export default Filter;
