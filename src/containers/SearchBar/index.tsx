import React, { useCallback, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { mapPinPath, calendarPath, creditCardPath } from "../../img/icons";
import DatePicker from "./DatePicker";
import CountryList from "./CountryList";
import PetCardSmall from "./PetCardSmall";
import useSearchBar from "../../hooks/useSearchBar";
import getCountry from "../../utils/getCountry";
import { tryCatch } from "../../utils";

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

const SearchBar = React.memo(
  ({ className }: { className?: string }): JSX.Element => {
    const { pathname } = useLocation();
    const countryList = getCountry();

    const queryClient = useQueryClient();

    const { area, selection, pet, dispatch } = useSearchBar();
    const [
      { showLocation, showCalendar, showPetCardSmall },
      dispatchSearchBar,
    ] = useReducer(searchBarReducer, initSearchBarState);

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
    const closeAllModal = useCallback(() => {
      if (showLocation || showCalendar || showPetCardSmall) {
        dispatchSearchBar({ type: "TOGGLE_ALL" });
      }
    }, [showCalendar, showLocation, showPetCardSmall]);

    useEffect(() => {
      document.addEventListener("click", () => closeAllModal());

      return document.removeEventListener("click", () => closeAllModal());
    }, [closeAllModal]);

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={`relative cursor-default ${className ?? ""} w-max`}
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
                  {area.name === "" ? "選擇地點" : area.name}
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
            className={`flex-center outline-none ${
              !pathname.includes("/hotel") ? "" : "my-4 h-10"
            }`}
            onClick={() =>
              dispatchSearchBar({
                type: "TOGGLE_CALENDAR",
                payload: !showCalendar,
              })
            }
          >
            <img src={calendarPath} alt="calendar" />
            <span className="px-3">{renderDateRange()}</span>
            <FontAwesomeIcon
              icon={showCalendar ? faChevronUp : faChevronDown}
            />
          </button>
          {!pathname.includes("/hotel") && (
            <>
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
                  {pet.name === "" ? "選擇寵物名片" : pet.name}
                </span>
                <FontAwesomeIcon
                  icon={showPetCardSmall ? faChevronUp : faChevronDown}
                />
              </button>
            </>
          )}
          {/* <Button
            text="搜尋"
            type="Secondary"
            icon={searchPath}
            className="ml-4 px-2 py-2"
          /> */}
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
                    onClick={async (e) => {
                      const { textContent, value } =
                        e.target as HTMLSelectElement;
                      dispatchSearchBar({
                        type: "TOGGLE_LOCATION",
                        payload: false,
                      });
                      dispatch({
                        type: "PICK_COUNTRY",
                        payload: {
                          name: textContent ?? "",
                          value,
                        },
                      });
                      await tryCatch(async () =>
                        queryClient.removeQueries(["HotelList"])
                      );
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
                <DatePicker
                  onChange={async () => {
                    queryClient.removeQueries(["HotelList"]);
                    if (selection.startDate !== selection.endDate) return;
                    queryClient.removeQueries(["Hotel"]);
                    // await queryClient.invalidateQueries(["Hotel"]);
                  }}
                />
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
);

export default SearchBar;
