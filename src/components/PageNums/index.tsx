/* eslint-disable react/no-array-index-key */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface IPageNumsProps {
  total: number;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  onClick?: () => void;
  className?: string;
}
const renderNums = (
  total: number,
  current: number
): Array<number | undefined> => {
  const nums = Array.from({ length: total }, (v, i) => i + 1);
  return nums.map((num, index, arr) => {
    if (num === 1) return num;
    if (num >= current - 2 && num <= current + 1) return num;
    if (num === arr.length) {
      return num;
    }
    return undefined;
  });
};

function PageNums({
  total,
  current,
  className,
  onClick,
  setCurrent,
}: IPageNumsProps): JSX.Element {
  // console.log(current);
  // renderNums(total);
  return (
    <section className={className}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            if (current - 1 < 0) return;
            setCurrent(current - 1);
            if (onClick === undefined) return;
            onClick();
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="mr-2 cursor-pointer text-stone-300 duration-100 hover:scale-105 hover:text-accent"
          />
        </button>

        {renderNums(total, current).map((num, index) => {
          if (num === undefined) return <span key={index}>...</span>;
          return (
            <button
              key={index}
              onClick={() => {
                setCurrent(num);
                if (onClick === undefined) return;
                onClick();
              }}
              type="button"
              className={`${
                current === num ? "bg-accent" : ""
              } mx-1 rounded-full p-4 leading-[0.5rem] duration-75 hover:bg-accent hover:text-white active:bg-accent/50`}
            >
              {num}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            if (current >= total) return;
            setCurrent(current + 1);
            if (onClick === undefined) return;
            onClick();
          }}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="ml-2 cursor-pointer text-stone-300 duration-100 hover:scale-105 hover:text-accent"
          />
        </button>
      </div>
    </section>
  );
}

export default PageNums;
