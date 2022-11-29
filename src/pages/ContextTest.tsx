import React from "react";
import { Link } from "react-router-dom";
import FilterInput from "../containers/Filter/FilterInput";
import SearchBar from "../containers/SearchBar";
import useFilter from "../hooks/useFilter";
import { foodLists, petLists, serviceLists } from "../containers/Filter/data";

function ContextTest(): JSX.Element {
  const { PetType, FoodTypes, ServiceTypes } = useFilter();

  return (
    <div className="flex-col-center pt-40">
      <Link to="/home">點此返回home頁</Link>
      <SearchBar />
      <FilterInput
        action="PICK-PetType"
        filterList={petLists}
        checked={PetType}
      />
      <FilterInput
        action="PICK-FoodTypes"
        filterList={foodLists}
        checked={FoodTypes}
      />
      {serviceLists.map((list) => {
        let checkArray = [""];
        switch (list.keyname) {
          case "services":
            checkArray = ServiceTypes.services;
            break;
          case "facilities":
            checkArray = ServiceTypes.facilities;
            break;
          case "specials":
            checkArray = ServiceTypes.specials;
            break;
          default:
            break;
        }
        return (
          <FilterInput
            action="PICK-ServiceTypes"
            filterList={list}
            checked={checkArray}
            key={list.keyname}
          />
        );
      })}
    </div>
  );
}

export default ContextTest;
