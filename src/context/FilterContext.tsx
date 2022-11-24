import React, { createContext, useMemo, useReducer } from "react";

interface IFilterProviderProps {
  children: JSX.Element;
}

// const ServiceTypes: { [index: string]: string[] } = {
//   services: [] as string[],
//   facilities: [] as string[],
//   specials: [] as string[],
// };

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

type IinitFilter = typeof initFilter;

export type FilterAction =
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
    case "PICK-PetType":
      return { ...state, PetType: action.payload };
    case "PICK-FoodTypes":
      return { ...state, FoodTypes: action.payload };
    case "PICK-RoomPrices":
      return { ...state, RoomPrices: action.payload };
    case "PICK-ServiceTypes": {
      const { ServiceTypes } = state;
      const { keyname, contents } = action.payload;
      ServiceTypes[keyname] = contents;
      return {
        ...state,
        ServiceTypes,
      };
    }
    default:
      return state;
  }
};

export function FilterProvider({
  children,
}: IFilterProviderProps): JSX.Element {
  const [filter, filterDispatch] = useReducer(filterReducer, initFilter);

  const value = useMemo(() => ({ ...filter, filterDispatch }), [filter]);
  console.log({ filter: value });

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
