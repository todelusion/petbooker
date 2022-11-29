import React, { useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

import { useLocation } from "react-router-dom";
import {
  searchPath,
  mapPinPath,
  calendarPath,
  creditCardPath,
} from "../../img/icons";
import Button from "../../components/Button";
import DatePicker from "./DatePicker";
import CountryList from "./CountryList";
import PetCardSmall from "./PetCardSmall";
import useSearchBar from "../../hooks/useSearchBar";
import getCountry from "../../utils/getCountry";

export type SearchBarAction =
  | {
      type: "TOGGLE_LOCATION";
      payload: boolean;
    }
  | {
      type: "TOGGLE_CALENDAR";
      payload: boolean;
    }
  | {
      type: "TOGGLE_PETCARD-SMALL";
      payload: boolean;
    }
  | {
      type: "TOGGLE_ALL";
    };

const initSearchBarState = {
  showLocation: false,
  showCalendar: false,
  showPetCardSmall: false,
};

const searchBarReducer = (
  state: typeof initSearchBarState,
  action: SearchBarAction
): typeof initSearchBarState => {
  switch (action.type) {
    case "TOGGLE_LOCATION":
      return {
        showLocation: action.payload,
        showCalendar: false,
        showPetCardSmall: false,
      };
    case "TOGGLE_CALENDAR":
      return {
        showCalendar: action.payload,
        showLocation: false,
        showPetCardSmall: false,
      };
    case "TOGGLE_PETCARD-SMALL":
      return {
        showPetCardSmall: action.payload,
        showCalendar: false,
        showLocation: false,
      };
    case "TOGGLE_ALL":
      return {
        showCalendar: false,
        showLocation: false,
        showPetCardSmall: false,
      };
    default:
      return state;
  }
};

function SearchBar({ className }: { className?: string }): JSX.Element {
  const { pathname } = useLocation();
  const countryList = getCountry();

  const { area, selection, pet, dispatch } = useSearchBar();
  const [{ showLocation, showCalendar, showPetCardSmall }, dispatchSearchBar] =
    useReducer(searchBarReducer, initSearchBarState);

  const renderDateRange = (): JSX.Element => {
    const { startDate, endDate, key } = selection;
    const week = ["日", "一", "二", "三", "四", "五", "六"];

    if (key === "")
      return (
        <p className="text-sm xl:text-base">
          <span>選擇入住</span>
          <span>－</span>
          <span>退房日期</span>
        </p>
      );

    return (
      <>
        <span>
          {`${startDate.getMonth() + 1}月 ${startDate.getDate()}
          日（${week[startDate.getDay()]}）`}
        </span>
        <span>－</span>
        <span>{`${endDate.getMonth() + 1}月 ${endDate.getDate()}日（${
          week[endDate.getDay()]
        }）`}</span>
      </>
    );
  };

  // UI render
  const renderBorder = (): string => {
    if (pathname.includes("/hotel")) return "border-2 border-black";

    return "border-4 border-primary";
  };

  // close all modal
  useEffect(() => {
    const handleClose = (): void => {
      document.addEventListener("click", () => {
        dispatchSearchBar({ type: "TOGGLE_ALL" });
      });
    };

    return handleClose;
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className={`relative cursor-default ${className as string} w-max`}
    >
      <div className={`flex-center mb-2 rounded-full px-4 ${renderBorder()}`}>
        {!pathname.includes("/hotel") && (
          <>
            <button
              onClick={() =>
                dispatchSearchBar({
                  type: "TOGGLE_LOCATION",
                  payload: !showLocation,
                })
              }
              type="button"
              className="flex-center"
            >
              <img src={mapPinPath} alt="map" />
              <span className="px-3 text-sm xl:text-base">
                {area === "" ? "選擇地點" : area}
              </span>
              <FontAwesomeIcon
                icon={showLocation ? faChevronUp : faChevronDown}
              />
            </button>

            <hr
              style={{ borderStyle: "solid" }}
              className="my-3 mx-4 block h-10 border-r-2"
            />
          </>
        )}
        <button
          type="button"
          className="flex-center outline-none"
          onClick={() =>
            dispatchSearchBar({
              type: "TOGGLE_CALENDAR",
              payload: !showCalendar,
            })
          }
        >
          <img src={calendarPath} alt="calendar" />
          <span className="px-3">{renderDateRange()}</span>
          <FontAwesomeIcon icon={showCalendar ? faChevronUp : faChevronDown} />
        </button>
        <hr
          style={{ borderStyle: "solid" }}
          className="my-3 mx-4 block h-10 border-r-2"
        />
        <button
          onClick={() =>
            dispatchSearchBar({
              type: "TOGGLE_PETCARD-SMALL",
              payload: !showPetCardSmall,
            })
          }
          type="button"
          className="flex-center"
        >
          <img src={creditCardPath} alt="creditCard" />
          <span className="px-3 text-sm xl:text-base">
            {pet === "" ? "選擇寵物名片" : pet}
          </span>
          <FontAwesomeIcon
            icon={showPetCardSmall ? faChevronUp : faChevronDown}
          />
        </button>
        <Button
          text="搜尋"
          type="Secondary"
          icon={searchPath}
          className="ml-4 px-2 py-2"
        />
      </div>

      <section className="absolute left-2 z-10">
        <AnimatePresence>
          {showLocation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              key="DatePicker"
              transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
              className="origin-top"
            >
              {countryList !== undefined && (
                <CountryList
                  onClick={(e) => {
                    dispatchSearchBar({
                      type: "TOGGLE_LOCATION",
                      payload: false,
                    });
                    dispatch({
                      type: "PICK_COUNTRY",
                      payload: (e.target as HTMLSelectElement).value,
                    });
                  }}
                  countryList={countryList}
                  key="CountryList"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="absolute left-1/2 z-10 -translate-x-1/2">
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              key="DatePicker"
              transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
              className="origin-top"
            >
              <DatePicker />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="absolute right-2 z-10">
        <AnimatePresence>
          {showPetCardSmall && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              key="DatePicker"
              transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
              className="origin-top"
            >
              <PetCardSmall dispatchSearchBar={dispatchSearchBar} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

SearchBar.defaultProps = {
  className: "",
};

export default SearchBar;
