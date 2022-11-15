import React, { createContext, useReducer, useState } from "react";

interface IComponentProviderProps {
  children: JSX.Element;
}
interface IComponentAction {
  type: "CHANGE_COLOR";
  payload: string;
}
export interface IComponentContextProps {
  color: string;
  dispatch: React.Dispatch<IComponentAction>;
}

const initCompoentState = {
  color: "blue",
};

const componentReducer = (
  state: typeof initCompoentState,
  action: IComponentAction
): typeof initCompoentState => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

export const ComponentContext = createContext<IComponentContextProps>({
  ...initCompoentState,
  dispatch: () => {},
});

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
