import React from "react";
import { translateFood } from "../../../containers/Filter/data";

interface IPetInfoProps {
  label: string;
  require?: true;
  content?: string | string[];
}

function PetInfo({ label, require, content }: IPetInfoProps): JSX.Element {
  return (
    <li>
      <span className="relative">
        {label}：
        {require && (
          <span className=" absolute -left-2 -top-1 font-medium text-red-600">
            *
          </span>
        )}
      </span>
      {Array.isArray(content) ? (
        content.map((item, index, arr) => (
          <>
            <span>{translateFood[item]}</span>{" "}
            {index + 1 < arr.length && <span>、</span>}
          </>
        ))
      ) : (
        <span>{content}</span>
      )}
    </li>
  );
}

export default PetInfo;
