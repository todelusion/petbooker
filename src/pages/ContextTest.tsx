import React from "react";
import { Link } from "react-router-dom";
import FilterInput from "../containers/Filter/FilterInput";
import SearchBar from "../containers/SearchBar/SearchBar";
import useFilter from "../hooks/useFilter";
import { foodLists } from "../containers/Filter/data";

function ContextTest(): JSX.Element {
  const { FoodTypes } = useFilter();
  return (
    <div className="flex-col-center pt-40">
      <Link to="/home">點此返回home頁</Link>
      <SearchBar />
      <FilterInput
        action="PICK-FoodTypes"
        keyname={foodLists.keyname}
        title={foodLists.title}
        contents={foodLists.contents}
        type={foodLists.type}
        handleInputValue={function (e: React.FormEvent<Element>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default ContextTest;
