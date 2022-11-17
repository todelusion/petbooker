import React, { createContext, useReducer, useState } from "react";
import type { IDateRangePickerOutput } from "../components/DatePicker";

interface IComponentProviderProps {
  children: JSX.Element;
}
interface ComponentAction {
  type: "PICK_DATERANGE";
  payload: IDateRangePickerOutput;
}
export interface IComponentContextProps {
  // color: string;
  dispatch: React.Dispatch<ComponentAction>;
}

const initCompoentState = {
  selection: {
    startDate: new Date(),
    endDate: new Date(),
    key: "",
  },
};

const componentReducer = (
  state: typeof initCompoentState,
  action: ComponentAction
): typeof initCompoentState => {
  switch (action.type) {
    case "PICK_DATERANGE":
      return { ...state, selection: action.payload.selection };
    default:
      return state;
  }
};

export const ComponentContext = createContext<IComponentContextProps | null>(
  null
);

export function ComponentProvider({
  children,
}: IComponentProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(componentReducer, initCompoentState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ComponentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ComponentContext.Provider>
  );
}
