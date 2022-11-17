import { Routes, Route } from "react-router-dom";
import { ComponentProvider } from "./context/ComponentContext";
import Nav from "./Layout/Nav";
import ContextTest from "./pages/ContextTest";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage ";
import UserLogin from "./pages/UserLogin";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ComponentProvider>
              <Home />
            </ComponentProvider>
          }
        />
        <Route
          path="/contextTest"
          element={
            <ComponentProvider>
              <ContextTest />
            </ComponentProvider>
          }
        />
        <Route path="/login" element={<UserLogin />} />;
      </Route>
    </Routes>
  );
}
