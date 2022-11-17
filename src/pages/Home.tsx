import React from "react";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";

function Home(): JSX.Element {
  return (
    <div className="flex-col-center pt-40">
      <Link to="/contextTest">點此進行換頁，測試狀態是否保留</Link>
      <DatePicker />
    </div>
  );
}

export default Home;
