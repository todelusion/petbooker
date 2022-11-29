import React from "react";
import FilterInput from "../../../containers/Filter/FilterInput";
import useFilter from "../../../hooks/useFilter";
import { foodLists } from "../../../containers/Filter/data";

function CmsInfo(): JSX.Element {
  const { FoodTypes } = useFilter();

  return (
    <div className="w-full max-w-3xl border-2">
      cms
      <FilterInput
        action="PICK-FoodTypes"
        filterList={foodLists}
        checked={FoodTypes}
      />
    </div>
  );
}

export default CmsInfo;
