import React from "react";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import useComponent from "../hooks/useComponent";

function ContextTest(): JSX.Element {
  return (
    <div className="flex-col-center pt-40">
      <Link to="/home">點此返回home頁</Link>
      <DatePicker />
    </div>
  );
}

export default ContextTest;
