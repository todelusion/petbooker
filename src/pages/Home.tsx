import React from "react";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";
import StatusModal from "../Layout/StatusModal";
import useModal from "../hooks/useModal";

function Home(): JSX.Element {
  const { pending, dispatchPending } = useModal();
  console.log("render Home");

  return (
    <div className="relative flex w-full items-start justify-evenly px-20 pt-40">
      <button
        type="button"
        onClick={() => {
          if (pending.status === "") {
            dispatchPending({ type: "IS_SUCCESS", payload: "成功" });
            return undefined;
          }

          return dispatchPending({ type: "CLOSE_ALL" });
        }}
      >
        Toggle
      </button>
      <Filter className="max-w-xs" />
      <div className="flex max-w-2xl flex-col items-center xl:max-w-4xl">
        <SearchBar className="mb-16" />
        <div className="flex flex-col items-end">
          <DropDownList className="mb-3" />
          <HotelCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
