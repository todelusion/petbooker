import React from "react";
import type { FilterAction } from "../../context/FilterContext";
import type { pricesLists, serviceLists } from "./data";

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
  action: FilterAction["type"];
  title: string;
  contents:
    | Array<{
        value: string;
        descript: string;
      }>
    | Array<{
        value: string[];
        descript: string;
      }>;

  type: React.HTMLInputTypeAttribute;
  handleInputValue: (e: React.FormEvent) => void;
}

function FilterInput({
  title,
  action,
  type,
  contents,
  handleInputValue,
}: IFilterInputProps): JSX.Element {
  const renderInput = (filter: Filter): JSX.Element => {
    switch (type) {
      case "radio":
        return (
          <input
            data-action={action}
            name={action}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={type}
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
          />
        );

      case "checkbox":
        return (
          <input
            data-action={action}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );

      default:
        return (
          <input
            data-action={action}
            id={filter.descript}
            value={filter.value}
            onClick={handleInputValue}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
    }
  };

  return (
    <li className="p-4">
      <p className="font-bold">{title}</p>
      <form name={action}>
        {contents.map((content) => (
          <div key={content.descript} className="py-4">
            <label
              key={content.descript}
              htmlFor={content.descript}
              className="inline-flex w-full cursor-pointer items-center text-sm"
            >
              {renderInput(content)}
              <span className="ml-2">{content.descript}</span>
            </label>
          </div>
        ))}
      </form>
    </li>
  );
}

export default FilterInput;
