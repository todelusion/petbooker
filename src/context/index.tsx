import React from "react";
import { FilterProvider } from "./FilterContext";
import { SearchBarProvider } from "./SearchBarContext";

interface IComponentProvicerProps {
  children: JSX.Element;
}

function ComponentProvicer({ children }: IComponentProvicerProps): JSX.Element {
  return (
    <SearchBarProvider>
      <FilterProvider>{children}</FilterProvider>
    </SearchBarProvider>
  );
}

export default ComponentProvicer;
