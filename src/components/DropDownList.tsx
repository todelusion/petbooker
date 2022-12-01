import React from "react";

interface IDropDownListProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

const DropDownList = React.memo(
  ({ className }: IDropDownListProps): JSX.Element => {
    console.log("render DropDownList");
    return (
      <select
        name="sort"
        id="sort_select"
        className={`rounded-md border-2 border-black py-1 px-4 outline-none ${
          className ?? ""
        }`}
      >
        <option value="recommended" className="py-2 px-4">
          排序依：推薦給您
        </option>
      </select>
    );
  }
);

export default DropDownList;
