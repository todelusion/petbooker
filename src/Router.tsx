import { Routes, Route } from "react-router-dom";
import Nav from "./Layout/Nav";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage ";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
      <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
