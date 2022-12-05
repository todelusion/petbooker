import React, { useState } from "react";
import DropDownList from "../components/DropDownList";
import Filter from "../containers/Filter";
import HotelCard from "../components/HotelCard";
import SearchBar from "../containers/SearchBar";
import StatusModal from "../Layout/StatusModal";
import useModal from "../hooks/useModal";
import useSearchBar from "../hooks/useSearchBar";

function Home(): JSX.Element {
  const { selection } = useSearchBar();
  const { dispatchPending } = useModal();

  return (
    <div className="relative flex w-full items-start justify-evenly px-20 pt-40">
      <section className="max-w-xs rounded-md border-2 border-black">
        <p className="bg-black py-2 text-center text-xl text-white">
          透過以下分類搜尋
        </p>
        <Filter onChange={(filter) => console.log(filter)} />
      </section>
      <div className="flex max-w-2xl flex-col items-center xl:max-w-4xl">
        <SearchBar
          onChange={(searchBarState) => searchBarState}
          className="mb-16"
        />
        <div className="flex flex-col items-end">
          <DropDownList className="mb-3" />
          <HotelCard
            onClick={() => {
              const click =
                selection.startDate.getTime() === selection.endDate.getTime();

              if (!click) return;
              dispatchPending({ type: "IS_ERROR", payload: "請至少選擇兩天" });
              setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
