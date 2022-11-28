import { addMonths, format, subMonths } from "date-fns";
import React, { useEffect } from "react";
// import * as locales from "react-date-range/dist/locale";
import { zhTW } from "date-fns/locale";
import { DateRangePicker, CalendarProps } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DatePicker.css"; // custom css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSearchBar from "../../hooks/useSearchBar";

export interface IDateRangePickerOutput {
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
  const { dispatch, selection } = useSearchBar();
  const onDateChange = (item: IDateRangePickerOutput): void => {
    dispatch({ type: "PICK_DATERANGE", payload: item });
  };
  console.log(selection);

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
      minDate={new Date()}
      months={2}
      /* 
      問題： React偵測到狀態改變而重新渲染套件，
      導致 上一次與下一次的selection 記憶體位置不同，而變undefined

      解決方案：
        1. ranges這邊不建議直接用 [selection] 帶入
        2. 將 selection物件值帶入新的物件即可，如下
      */
      ranges={[
        {
          startDate: selection.startDate,
          endDate: selection.endDate,
          key: "selection",
        },
      ]}
      monthDisplayFormat="yyyy / M"
      locale={zhTW}
      direction="horizontal"
      rangeColors={["#B9C850"]}
      className="rounded-sm border-2 border-black bg-white py-4"
    />
  );
}

export default DatePicker;
