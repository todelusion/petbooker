import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";

interface IFilterProviderProps {
  children: JSX.Element;
}

const initFilter = {
  PetType: "",
  FoodTypes: [] as string[] | [],
  RoomPrices: [] as string[] | [],
  Services: [] as string[] | [],
  Facilities: [] as string[] | [],
  Specials: [] as string[] | [],
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
      type: "PICK-Services";
      payload: string[];
    }
  | {
      type: "PICK-Facilities";
      payload: string[];
    }
  | {
      type: "PICK-Specials";
      payload: string[];
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
    case "PICK-Services":
      return { ...state, Services: action.payload };
    case "PICK-Facilities":
      return { ...state, Facilities: action.payload };
    case "PICK-Specials":
      return { ...state, Specials: action.payload };
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

  // console.log(value);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
