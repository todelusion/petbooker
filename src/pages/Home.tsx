import React from "react";
import useComponent from "../hooks/useComponent";

function Home(): JSX.Element {
  const { color, dispatch } = useComponent();
  console.log(color);
  return <div className="pt-40 text-5.5xl">Home</div>;
}

export default Home;
