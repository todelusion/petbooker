import { Routes, Route } from "react-router-dom";
import Nav from "./Layout/Nav";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />} />
    </Routes>
  );
}
