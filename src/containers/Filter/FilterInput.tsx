/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { LegacyRef, MutableRefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import type {
  FilterAction,
  IFilterContextProps,
} from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";

interface Content {
  value: string;
  descript: string;
}

interface IFilterList {
  keyname: string;
  title: string;
  contents: Array<{
    value: string;
    descript: string;
  }>;
  type: React.HTMLInputTypeAttribute;
}

interface IFilterInputProps {
  action: FilterAction["type"];
  filterList: IFilterList;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  noContext?: boolean;
  horizontal?: true;
  checked?: string | string[];
  className?: string;
}

export const handleFilterValue = (
  e: React.FormEvent,
  filterContextProps?: IFilterContextProps
): void => {
  const element = e.target as HTMLInputElement;
  const { value, checked, name } = element;
  console.log({ value, checked, name });

  const dispatchContex = (): void => {
    if (filterContextProps === undefined) return;
    const {
      filterDispatch,
      FoodTypes,
      PetType,
      RoomPrices,
      Services,
      Facilities,
      Specials,
    } = filterContextProps;

    const action = element.getAttribute("data-action") as FilterAction["type"];
    // console.log({ value, checked, action, name });
    // console.log(action);

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
        case "PICK-Services":
          filterDispatch({
            type: action,
            payload: [...Services, value],
          });
          break;
        case "PICK-Facilities":
          filterDispatch({
            type: action,
            payload: [...Facilities, value],
          });
          break;
        case "PICK-Specials":
          filterDispatch({
            type: action,
            payload: [...Specials, value],
          });
          break;

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
        case "PICK-Services":
          filterDispatch({
            type: action,
            payload: Services.filter((Service) => Service !== value),
          });
          break;
        case "PICK-Facilities":
          filterDispatch({
            type: action,
            payload: Facilities.filter((Facility) => Facility !== value),
          });
          break;
        case "PICK-Specials":
          filterDispatch({
            type: action,
            payload: Specials.filter((Special) => Special !== value),
          });
          break;
        default:
          break;
      }
    }
  };

  dispatchContex();
};

const useInputRef = (ref: React.MutableRefObject<null>): void => {
  useEffect(() => {
    if (ref.current == null) return;
    const input = ref.current as HTMLInputElement;
    // console.log(input);
    input.addEventListener("input", (e) => {
      console.log(e);
    });
    // console.log({ value, checked, name });
  });
};

function FilterInput({
  onChange,
  required,
  noContext,
  action,
  filterList,
  checked,
  horizontal,
  className,
}: IFilterInputProps): JSX.Element {
  const isUseContext = (): IFilterContextProps | undefined => {
    // 如果 props-action 未傳進來代表不想使用 Context

    if (noContext) return undefined;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFilter();
  };
  const inputRef = useRef(null);
  useInputRef(inputRef);
  const FilterContextProps = isUseContext();
  const { keyname, title, type, contents } = filterList;

  // renderUI
  const renderInput = (content: Content): JSX.Element => {
    // 使用 state改變 Dom元素背後的value

    switch (type) {
      case "radio":
        return (
          <input
            ref={inputRef}
            data-action={action}
            defaultChecked={content.value === checked}
            name={action}
            id={content.descript}
            value={content.value}
            onChange={(e) => {
              handleFilterValue(e, FilterContextProps);
              if (onChange === undefined) return;
              onChange(e);
            }}
            type={type}
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
          />
        );

      case "checkbox":
        return (
          <input
            ref={inputRef}
            data-action={action}
            defaultChecked={(checked as string[]).includes(content.value)}
            name={keyname}
            id={content.descript}
            value={content.value}
            onChange={(e) => {
              handleFilterValue(e, FilterContextProps);
              if (onChange === undefined) return;
              onChange(e);
            }}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );

      default:
        return (
          <input
            ref={inputRef}
            data-action={action}
            id={content.descript}
            value={content.value}
            defaultChecked={checked === content.value}
            onChange={(e) => {
              handleFilterValue(e, FilterContextProps);
              if (onChange === undefined) return;
              onChange(e);
            }}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
    }
  };

  return (
    <div className={`${horizontal ? "" : "p-4"}${className}`}>
      {!horizontal && <p className="relative font-bold">{title}</p>}
      <form
        name={action}
        className={horizontal === true ? "flex items-center" : ""}
      >
        {horizontal && (
          <p className="relative mr-5 font-bold">
            {title}
            {required && (
              <span className=" absolute -top-1 -left-3 text-lg text-[#ff4d4f]">
                *
              </span>
            )}
          </p>
        )}
        {contents.map((content) => (
          <div key={content.descript} className={`${horizontal ? "" : "p-4"}`}>
            <label
              key={content.descript}
              htmlFor={content.descript}
              className="flex w-full cursor-pointer items-center text-sm"
            >
              {renderInput(content)}
              <span className={`ml-2 ${horizontal === true ? "mx-5" : ""}`}>
                {content.descript}
              </span>
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

FilterInput.defaultProps = {
  horizontal: false,
  className: "",
};

export default FilterInput;
