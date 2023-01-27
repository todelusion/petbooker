import { useContext } from "react";
import { FilterContext, IFilterContextProps } from "../context/FilterContext";

const useFilter = (): IFilterContextProps => {
  const context = useContext(FilterContext);

  if (context === null) {
    throw new Error("useFilter() muse be used inside a FilterContext");
  }
  return context;
};

export default useFilter;
