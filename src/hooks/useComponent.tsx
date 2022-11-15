import React, { useContext } from "react";
import {
  ComponentContext,
  IComponentContextProps,
} from "../context/ComponentContext";

const useComponent = (): IComponentContextProps => {
  const context = useContext(ComponentContext);

  if (context === undefined) {
    throw new Error("usePost() muse be used inside a BlogContext");
  }
  return context;
};

export default useComponent;
