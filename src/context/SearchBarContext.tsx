import React, { createContext, useMemo, useReducer } from "react";
import type { IDateRangePickerOutput } from "../containers/SearchBar/DatePicker";

interface ISearchBarProviderProps {
  children: JSX.Element;
}

const initSearchBarState = {
  area: {
    name: "",
    value: "",
  },
  pet: "",
  selection: {
    startDate: new Date(),
    endDate: new Date(),
    key: "",
  },
};

type InitSearchBarState = typeof initSearchBarState;

export interface ISearchBarContextProps extends InitSearchBarState {
  dispatch: React.Dispatch<SearchBarAction>;
}

type SearchBarAction =
  | {
      type: "PICK_DATERANGE";
      payload: IDateRangePickerOutput;
    }
  | {
      type: "PICK_COUNTRY";
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: "PICK_PET";
      payload: string;
    };

const searchBarReducer = (
  state: InitSearchBarState,
  action: SearchBarAction
): InitSearchBarState => {
  switch (action.type) {
    case "PICK_DATERANGE":
      return { ...state, selection: action.payload.selection };
    case "PICK_COUNTRY":
      return { ...state, area: action.payload };
    case "PICK_PET":
      return { ...state, pet: action.payload };
    default:
      return state;
  }
};

export const SearchBarContext = createContext<ISearchBarContextProps | null>(
  null
);

export function SearchBarProvider({
  children,
}: ISearchBarProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(searchBarReducer, initSearchBarState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  console.log(value);

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
}
