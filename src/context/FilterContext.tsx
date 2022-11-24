import React, { createContext, useMemo, useReducer } from "react";

interface IFilterProviderProps {
  children: JSX.Element;
}

const initFilter = {
  PetType: "",
  FoodTypes: [] as string[],
  RoomPrices: [] as string[],
};

type IinitFilter = typeof initFilter;

export type FilterAction =
  | {
      type: "PETTYPE";
      payload: string;
    }
  | {
      type: "FOODTYPES";
      payload: string[];
    }
  | {
      type: "ROOMPRICES";
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
    case "PETTYPE":
      return { ...state, PetType: action.payload };
    case "FOODTYPES":
      return { ...state, FoodTypes: action.payload };
    case "ROOMPRICES":
      return { ...state, RoomPrices: action.payload };
    default:
      return state;
  }
};

export function FilterProvider({
  children,
}: IFilterProviderProps): JSX.Element {
  const [filter, filterDispatch] = useReducer(filterReducer, initFilter);

  const value = useMemo(() => ({ ...filter, filterDispatch }), [filter]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
