import React from "react";

interface IDropDownListProps {
  className?: string;
}

function DropDownList({ className }: IDropDownListProps): JSX.Element {
  return (
    <select
      name="sort"
      id="sort_select"
      className={`rounded-md border-2 border-black py-1 px-4 outline-none ${
        className as string
      }`}
    >
      <option value="recommended" className="py-2 px-4">
        排序依：推薦給您
      </option>
    </select>
  );
}

DropDownList.defaultProps = {
  className: "",
};
export default DropDownList;
