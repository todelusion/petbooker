import React from "react";
import { Link } from "react-router-dom";
import FilterInput from "../containers/Filter/FilterInput";
import SearchBar from "../containers/SearchBar/SearchBar";
import useFilter from "../hooks/useFilter";
import { foodLists, petLists, serviceLists } from "../containers/Filter/data";
import { handleFilterValue } from "../containers/Filter/Filter";

function ContextTest(): JSX.Element {
  const { FoodTypes, PetType, ServiceTypes } = useFilter();
  return (
    <div className="flex-col-center pt-40">
      <Link to="/home">點此返回home頁</Link>
      <SearchBar />
      <FilterInput
        action="PICK-PetType"
        keyname={petLists.keyname}
        checked={PetType}
        title={petLists.title}
        contents={petLists.contents}
        type={petLists.type}
      />
      <FilterInput
        action="PICK-FoodTypes"
        keyname={foodLists.keyname}
        checked={FoodTypes}
        title={foodLists.title}
        contents={foodLists.contents}
        type={foodLists.type}
      />
      {serviceLists.map((item) => {
        let checkArray = [""];
        switch (item.keyname) {
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
            checked={checkArray}
            key={item.keyname}
            keyname={item.keyname}
            title={item.title}
            contents={item.contents}
            type={item.type}
          />
        );
      })}
    </div>
  );
}

export default ContextTest;
