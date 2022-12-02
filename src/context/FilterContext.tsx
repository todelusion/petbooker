import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";

interface IFilterProviderProps {
  children: JSX.Element;
}

const initFilter = {
  PetType: "",
  FoodTypes: [] as string[],
  RoomPrices: [] as string[],
  ServiceTypes: {
    services: [] as string[],
    facilities: [] as string[],
    specials: [] as string[],
  },
};

export type IinitFilter = typeof initFilter;

export type FilterAction =
  | {
      type: "CLEAR";
    }
  | {
      type: "PICK-PetType";
      payload: string;
    }
  | {
      type: "PICK-FoodTypes";
      payload: string[];
    }
  | {
      type: "PICK-RoomPrices";
      payload: string[];
    }
  | {
      type: "PICK-ServiceTypes";
      payload: {
        keyname: "services" | "facilities" | "specials";
        contents: string[];
      };
    };

export interface IFilterContextProps extends IinitFilter {
  filterDispatch: React.Dispatch<FilterAction>;
}

export const FilterContext = createContext<IFilterContextProps | null>(null);

const filterReducer = (
  state: IinitFilter,
  action: FilterAction
): IinitFilter => {
  switch (action.type) {
    case "CLEAR":
      return initFilter;
    case "PICK-PetType":
      return { ...state, PetType: action.payload };
    case "PICK-FoodTypes":
      return { ...state, FoodTypes: action.payload };
    case "PICK-RoomPrices":
      return { ...state, RoomPrices: action.payload };
    case "PICK-ServiceTypes": {
      const { keyname, contents } = action.payload;
      const newServiceTypes = {
        services: [""],
        facilities: [""],
        specials: [""],
      };
      newServiceTypes[keyname] = contents;
      return {
        ...state,
        ServiceTypes: newServiceTypes,
      };
    }
    default:
      return state;
  }
};

export function FilterProvider({
  children,
}: IFilterProviderProps): JSX.Element {
  const { pathname } = useLocation();
  const [filter, filterDispatch] = useReducer(filterReducer, initFilter);

  const value = useMemo(() => ({ ...filter, filterDispatch }), [filter]);
  // const { FoodTypes, PetType, RoomPrices, ServiceTypes } = value;
  // console.log({ FoodTypes, PetType, RoomPrices, ServiceTypes });

  // useEffect(() => {
  //   if (!pathname.includes("/cms")) return;
  //   console.log("in FilterContext");
  //   filterDispatch({ type: "CLEAR" });
  // }, [pathname, value]);

  console.log(value);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
