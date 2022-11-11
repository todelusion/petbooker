import { Routes, Route } from "react-router-dom";
import Nav from "./Layout/Nav";
import Home from "./pages/Home";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
