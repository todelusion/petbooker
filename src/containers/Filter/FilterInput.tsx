/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useQueryClient } from "@tanstack/react-query";
import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import type {
  FilterAction,
  IFilterContextProps,
} from "../../context/FilterContext";
import useFilter from "../../hooks/useFilter";
import { tryCatch } from "../../utils";

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
  filterList: IFilterList;
  noContext: boolean;
  action?: FilterAction["type"];
  labelWidth?: string;
  onChange?: (e: React.MouseEvent<HTMLInputElement>) => void;
  required?: true;
  horizontal?: true;
  checked?: string | string[];
  className?: string;
  classNames?: {
    p: string;
  };
}

const dispatchContext = (
  element: HTMLInputElement,
  filterContextProps: IFilterContextProps
): void => {
  const { value, checked, name } = element;
  // console.log({ value, checked, name });
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

function FilterInput({
  onChange,
  labelWidth,
  required,
  noContext,
  action,
  filterList,
  checked,
  horizontal,
  className,
  classNames,
}: IFilterInputProps): JSX.Element {
  const isUseContext = (): IFilterContextProps | undefined => {
    // 如果 props-action 未傳進來代表不想使用 Context

    if (noContext) return undefined;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFilter();
  };
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const FilterContextProps = isUseContext();

  const { keyname, title, type, contents } = filterList;

  // renderUI
  const renderInput = (content: Content): JSX.Element => {
    switch (type) {
      case "radio": {
        return (
          <input
            key={content.value}
            data-action={action}
            defaultChecked={content.value === checked}
            name={keyname}
            id={content.descript}
            value={content.value}
            onClick={async (e) => {
              if (FilterContextProps !== undefined)
                dispatchContext(
                  e.target as HTMLInputElement,
                  FilterContextProps
                );
              await tryCatch(async () =>
                queryClient.removeQueries(["HotelList"])
              );
              // await tryCatch(async () =>
              //   queryClient.invalidateQueries(["HotelList"])
              // );
              if (onChange !== undefined) onChange(e);
            }}
            type={type}
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
          />
        );
      }

      case "checkbox": {
        return (
          <input
            key={content.value}
            // ref={inputRef}
            data-action={action}
            defaultChecked={checked?.includes(content.value)}
            name={keyname}
            id={content.descript}
            value={content.value}
            onClick={async (e: React.MouseEvent<HTMLInputElement>) => {
              if (FilterContextProps !== undefined)
                dispatchContext(
                  e.target as HTMLInputElement,
                  FilterContextProps
                );
              await tryCatch(async () =>
                queryClient.removeQueries(["HotelList"])
              );
              // await tryCatch(async () =>
              //   queryClient.invalidateQueries(["HotelList"])
              // );

              if (onChange !== undefined) onChange(e);
            }}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
      }

      default: {
        return (
          <input
            key={content.value}
            data-action={action}
            id={content.descript}
            value={content.value}
            defaultChecked={checked?.includes(content.value)}
            onClick={async (e) => {
              if (FilterContextProps !== undefined)
                dispatchContext(
                  e.target as HTMLInputElement,
                  FilterContextProps
                );
              await tryCatch(async () =>
                queryClient.removeQueries(["HotelList"])
              );
              // await tryCatch(async () =>
              //   queryClient.invalidateQueries(["HotelList"])
              // );
              if (onChange !== undefined) onChange(e);
            }}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
      }
    }
  };

  return (
    <div className={`${horizontal ? "" : "p-4"}${className}`}>
      {!horizontal && <p className="relative font-bold">{title}</p>}
      <form
        ref={formRef}
        name={keyname}
        className={horizontal === true ? "flex items-center" : ""}
      >
        {horizontal && (
          <p
            className={`relative ${classNames?.p ?? "font-bold"} ${
              labelWidth === undefined ? "mr-5" : labelWidth
            }`}
          >
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
