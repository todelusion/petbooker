import React from "react";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import SearchBar from "../components/SearchBar";

function Home(): JSX.Element {
  return (
    <div className="flex-col-center relative pt-40">
      <Link to="/contextTest">點此進行換頁，測試狀態是否保留</Link>
      <SearchBar />
      <p className=" py-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae labore
        placeat harum fuga pariatur distinctio culpa veritatis minima, nemo in,
        velit autem dolor ipsa fugit numquam eius? Facere, voluptates doloribus.
      </p>
    </div>
  );
}

export default Home;
