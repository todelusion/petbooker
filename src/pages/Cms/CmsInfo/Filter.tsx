import React from "react"
import FilterInput from "../../../containers/Filter/FilterInput"
import { foodLists } from "../../../containers/Filter/data"
import useFilter from "../../../hooks/useFilter"

function Filter(): JSX.Element {
  const { FoodTypes } = useFilter()
  return (
    <div>
      <FilterInput
        action="PICK-FoodTypes"
        filterList={foodLists}
        checked={FoodTypes}
      />
    </div>
  )
}

export default Filter
