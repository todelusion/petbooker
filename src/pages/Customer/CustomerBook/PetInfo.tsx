import React from "react";

interface IPetInfoProps {
  label: string;
  require?: true;
  content?: string;
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
      <span>{content}</span>
    </li>
  );
}

export default PetInfo;
