import React, { createContext, useMemo, useReducer } from "react";

interface IFilterProviderProps {
  children: JSX.Element;
}

interface IinitFilter {
  petType: string;
  foodTypes: string[];
}

export type FilterAction =
  | {
      type: "PETTYPE";
      payload: string;
    }
  | {
      type: "FOODTYPES";
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
      return { ...state, petType: action.payload };
    case "FOODTYPES":
      return { ...state, foodTypes: action.payload };
    default:
      return state;
  }
};

export function FilterProvider({
  children,
}: IFilterProviderProps): JSX.Element {
  const [filter, filterDispatch] = useReducer(filterReducer, {
    petType: "",
    foodTypes: [],
  });

  const value = useMemo(() => ({ ...filter, filterDispatch }), [filter]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
