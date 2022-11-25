import React from "react";
import { FilterAction, IFilterContextProps } from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { foodLists, petLists, pricesLists, serviceLists } from "./data";
import FilterInput from "./FilterInput";

const handleFilterValue = (
  e: React.FormEvent,
  filterContextProps: IFilterContextProps
): void => {
  const { filterDispatch, FoodTypes, PetType, RoomPrices, ServiceTypes } =
    filterContextProps;
  const element = e.target as HTMLInputElement;
  const { value, checked, name } = element;
  const action = element.getAttribute("data-action") as FilterAction["type"];
  // console.log({ value, checked, action, name });

  // 為了避免變數重複宣告，因此在 case 後加上{}花括號，來限制作用域
  if (action === "PICK-PetType") {
    filterDispatch({ type: action, payload: value });
  }

  if (checked) {
    switch (action) {
      case "PICK-FoodTypes":
        filterDispatch({
          type: action,
          payload: [...FoodTypes, value],
        });
        break;
      case "PICK-RoomPrices":
        filterDispatch({
          type: action,
          payload: [...RoomPrices, value],
        });
        break;
      case "PICK-ServiceTypes": {
        const keyname = name as "services" | "facilities" | "specials";
        const { services, facilities, specials } = ServiceTypes;

        switch (keyname) {
          case "services":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: { keyname, contents: [...services, value] },
            });
            break;
          case "facilities":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: { keyname, contents: [...facilities, value] },
            });
            break;
          case "specials":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: { keyname, contents: [...specials, value] },
            });
            break;
          default:
            break;
        }
        break;
      }

      default:
        break;
    }
  }
  if (!checked) {
    switch (action) {
      case "PICK-FoodTypes":
        filterDispatch({
          type: action,
          payload: FoodTypes.filter((FoodType) => FoodType !== value),
        });
        break;
      case "PICK-RoomPrices":
        filterDispatch({
          type: action,
          payload: RoomPrices.filter((RoomPrice) => RoomPrice !== value),
        });
        break;
      case "PICK-ServiceTypes": {
        const keyname = name as "services" | "facilities" | "specials";
        const { services, facilities, specials } = ServiceTypes;

        switch (keyname) {
          case "services":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: {
                keyname,
                contents: services.filter((item) => item !== value),
              },
            });
            break;
          case "facilities":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: {
                keyname,
                contents: facilities.filter((facility) => facility !== value),
              },
            });
            break;
          case "specials":
            filterDispatch({
              type: "PICK-ServiceTypes",
              payload: {
                keyname,
                contents: specials.filter((special) => special !== value),
              },
            });
            break;
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }
};
function Filter(): JSX.Element {
  const FilterContextProps = useFilter();

  return (
    <ul className="w-60 rounded-md border-2 border-black">
      <li className="bg-black py-2 text-center text-xl text-white">
        透過以下分類搜尋
      </li>
      <FilterInput
        action="PICK-PetType"
        keyname={petLists.keyname}
        title={petLists.title}
        contents={petLists.contents}
        handleInputValue={handleFilterValue}
        type={petLists.type}
      />
      <FilterInput
        action="PICK-FoodTypes"
        keyname={foodLists.keyname}
        title={foodLists.title}
        contents={foodLists.contents}
        handleInputValue={handleFilterValue}
        type={foodLists.type}
      />
      <FilterInput
        action="PICK-RoomPrices"
        keyname={petLists.keyname}
        title={petLists.title}
        contents={pricesLists.contents}
        handleInputValue={handleFilterValue}
        type={pricesLists.type}
      />
      {serviceLists.map((item) => (
        <FilterInput
          key={item.keyname}
          keyname={item.keyname}
          action="PICK-ServiceTypes"
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
