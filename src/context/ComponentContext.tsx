import React, { createContext, useMemo, useReducer } from "react";
import type { IDateRangePickerOutput } from "../components/DatePicker";

interface IComponentProviderProps {
  children: JSX.Element;
}

export interface IComponentContextProps extends IDateRangePickerOutput {
  dispatch: React.Dispatch<ComponentAction>;
}

type ComponentAction =
  | {
      type: "PICK_DATERANGE";
      payload: IDateRangePickerOutput;
    }
  | {
      type: "the other";
      payload: string;
    };

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
  // console.log(state);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
}
