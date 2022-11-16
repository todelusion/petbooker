import { addDays, addMonths, format, subMonths } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import * as locales from "react-date-range/dist/locale";
import { DateRangePicker, CalendarProps } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../assets/DatePicker.css"; // custom css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface IDateRangePickerOutput {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
}

type NavigatorRenderer = (
  currFocusedDate: Date,
  changeShownDate: (
    value: string | number | Date,
    mode?: "set" | "setYear" | "setMonth" | "monthOffset" | undefined
  ) => void,
  props: CalendarProps
) => JSX.Element;

function DatePicker(): JSX.Element {
  const [dateRange, dateRangeSet] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const onDateChange = (item: IDateRangePickerOutput): void => {
    console.log(item.selection);
    dateRangeSet([item.selection]);
  };

  const onNavigatorRenderer: NavigatorRenderer = (
    currFocusedDate,
    changeShownDate
  ) => (
    <div className="mb-2 flex justify-between px-6">
      <button
        type="button"
        onClick={() => changeShownDate(subMonths(currFocusedDate, 1), "set")}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <p className="font-bold">
        <span>{format(currFocusedDate, "yyyy / M")}</span>
        <span className=" px-40" />
        <span>{format(addMonths(currFocusedDate, 1), "yyyy / M")}</span>
      </p>
      <button
        type="button"
        onClick={() => changeShownDate(addMonths(currFocusedDate, 1), "set")}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );

  useEffect(() => {
    (
      document.getElementsByClassName(
        "rdrDefinedRangesWrapper"
      )[0] as HTMLElement
    ).style.display = "none";
    (
      document.getElementsByClassName("rdrDateDisplayWrapper")[0] as HTMLElement
    ).style.display = "none";
    [
      ...(document.getElementsByClassName(
        "rdrMonthName"
      ) as unknown as NodeList),
    ].forEach((div) => {
      // eslint-disable-next-line no-param-reassign
      (div as HTMLElement).style.display = "none";
    });
  }, []);

  return (
    <DateRangePicker
      onChange={(item) =>
        onDateChange(item as unknown as IDateRangePickerOutput)
      }
      navigatorRenderer={onNavigatorRenderer}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={dateRange}
      monthDisplayFormat="yyyy / M"
      locale={locales.zhTW}
      direction="horizontal"
    />
  );
}

export default DatePicker;
