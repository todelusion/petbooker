import React from "react";
import { FilterProvider } from "./FilterContext";
import { SearchBarProvider } from "./SearchBarContext";

interface IComponentProvicerProps {
  children: JSX.Element;
}

function ComponentProvicer({ children }: IComponentProvicerProps): JSX.Element {
  return (
    <FilterProvider>
      <SearchBarProvider>{children}</SearchBarProvider>
    </FilterProvider>
  );
}

export default ComponentProvicer;
