import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function ContextTest(): JSX.Element {
  return (
    <div className="flex-col-center pt-40">
      <Link to="/home">點此返回home頁</Link>
      <SearchBar />
    </div>
  );
}

export default ContextTest;
