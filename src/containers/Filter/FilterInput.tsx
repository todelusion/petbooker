import React from "react";
import type { FilterAction } from "../../context/FilterContext";
import type { pricesLists } from "./data";

type Filter =
  | {
      value: string;
      descript: string;
    }
  | {
      value: string[];
      descript: string;
    };

interface IFilterInputProps {
  filterList:
    | Array<{
        value: string;
        descript: string;
      }>
    | typeof pricesLists;

  filterTitle: string;
  inputType: React.HTMLInputTypeAttribute;
  inputName: FilterAction["type"];
  handleInputValue: (e: React.FormEvent) => void;
}

function FilterInput({
  filterList,
  filterTitle,
  inputType,
  inputName,
  handleInputValue,
}: IFilterInputProps): JSX.Element {
  const renderInput = (filter: Filter): JSX.Element => {
    switch (inputType) {
      case "radio":
        return (
          <input
            name={inputName}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={inputType}
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
          />
        );

      case "checkbox":
        return (
          <input
            name={inputName}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={inputType}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );

      default:
        return (
          <input
            name={inputName}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={inputType}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
    }
  };

  return (
    <li className="p-4">
      <p className="font-bold">{filterTitle}</p>
      <form name={inputName}>
        {filterList.map((filter) => (
          <div key={filter.descript} className="py-4">
            <label
              key={filter.descript}
              htmlFor={filter.descript}
              className="inline-flex w-full cursor-pointer items-center text-sm"
            >
              {renderInput(filter)}
              <span className="ml-2">{filter.descript}</span>
            </label>
          </div>
        ))}
      </form>
    </li>
  );
}

export default FilterInput;
