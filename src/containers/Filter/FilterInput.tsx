import React from "react";
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
  horizontal?: boolean;
  checked: string | string[];
}

export const handleFilterValue = (
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

function FilterInput({
  action,
  filterList,
  checked,
  horizontal,
}: IFilterInputProps): JSX.Element {
  const FilterContextProps = useFilter();
  const { keyname, title, type, contents } = filterList;

  // renderUI
  const renderInput = (content: Content): JSX.Element => {
    switch (type) {
      case "radio":
        return (
          <input
            data-action={action}
            defaultChecked={checked === content.value}
            name={action}
            id={content.descript}
            value={content.value}
            onClick={(e) => handleFilterValue(e, FilterContextProps)}
            type={type}
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black duration-150 checked:border-4 checked:border-primary checked:ring-2 checked:ring-primary_Dark hover:border-primary"
          />
        );

      case "checkbox":
        return (
          <input
            data-action={action}
            defaultChecked={(checked as string[]).includes(content.value)}
            name={keyname}
            id={content.descript}
            value={content.value}
            onClick={(e) => handleFilterValue(e, FilterContextProps)}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );

      default:
        return (
          <input
            data-action={action}
            id={content.descript}
            value={content.value}
            defaultChecked={checked === content.value}
            onClick={(e) => handleFilterValue(e, FilterContextProps)}
            type={type}
            className="relative h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-black duration-150 before:absolute before:top-1/2 before:-translate-y-1/2 before:text-white checked:border-4 checked:border-primary checked:bg-primary checked:ring-2 checked:ring-primary_Dark before:checked:content-['✔'] hover:border-primary"
          />
        );
    }
  };

  return (
    <div className="p-4">
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
    </div>
  );
}

FilterInput.defaultProps = {
  horizontal: false,
};

export default FilterInput;
