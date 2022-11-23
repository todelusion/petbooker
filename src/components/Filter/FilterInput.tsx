import React from "react";
import type { FilterAction } from "./Filter";

interface IFilterInputProps {
  filterList: Array<{
    type: string;
    descript: string;
  }>;
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
  const renderInputType = (): string => {
    switch (inputName) {
      case "PETTYPE":
        return "";
      case "FOODTYPES":
        return "relative rounded-sm before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:bg-primary";
      default:
        return "relative rounded-sm before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:bg-primary";
    }
  };

  return (
    <li className="p-4">
      <p className="font-bold">{filterTitle}</p>
      <form name={inputName}>
        {filterList.map((filter) => (
          <div key={filter.type} className="py-4">
            <label
              key={filter.type}
              htmlFor={filter.type}
              className="inline-flex w-full cursor-pointer items-center text-sm"
            >
              <input
                name={inputName}
                id={filter.type}
                value={filter.type}
                onClick={handleInputValue}
                type={inputType}
                className={`${renderInputType()} h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary`}
              />
              <span className="ml-2">{filter.descript}</span>
            </label>
          </div>
        ))}
      </form>
    </li>
  );
}

export default FilterInput;
