import React from "react";
import DatePicker from "../components/DatePicker";
import useComponent from "../hooks/useComponent";

function Home(): JSX.Element {
  const { color, dispatch } = useComponent();
  console.log(color);
  return (
    <div className="flex-center pt-40">
      <DatePicker />
    </div>
  );
}

export default Home;
