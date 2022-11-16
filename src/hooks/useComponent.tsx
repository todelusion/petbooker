import React, { useContext } from "react";
import {
  ComponentContext,
  IComponentContextProps,
} from "../context/ComponentContext";

const useComponent = (): IComponentContextProps => {
  const context = useContext(ComponentContext);

  if (context === null) {
    throw new Error("useComponent() muse be used inside a BlogContext");
  }
  return context;
};

export default useComponent;
