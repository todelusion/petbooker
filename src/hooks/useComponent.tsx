import React, { useContext } from "react";
import {
  SearchBarContext,
  ISearchBarContextProps,
} from "../context/SearchBarContext";

const useSearchBar = (): ISearchBarContextProps => {
  const context = useContext(SearchBarContext);

  if (context === null) {
    throw new Error("useSearchBar() muse be used inside a BlogContext");
  }
  return context;
};

export default useSearchBar;
