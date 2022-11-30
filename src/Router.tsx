import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ComponentProvicer from "./context";

import Nav from "./Layout/Nav";
import ContextTest from "./pages/ContextTest";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage ";
import UserForgetPassword from "./pages/User/UserForgetPassword";
import UserLogin from "./pages/User/UserLogin";
import UserModifyPassword from "./pages/User/UserModifyPassword";
import UserRegist from "./pages/User/UserRegist";
import Hotel from "./pages/Hotel";
import NavBackend from "./Layout/NavBackend";
import CmsAccount from "./pages/Cms/CmsAccount";
import CmsInfo from "./pages/Cms/CmsInfo";

import { cmsMenu, memberMenu } from "./Layout/data";
import MemberInfo from "./pages/Member/MemberInfo";
import { FilterProvider } from "./context/FilterContext";

export default function Router(): JSX.Element {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ComponentProvicer>
                <Home />
              </ComponentProvicer>
            }
          />
          <Route
            path="/contextTest"
            element={
              <ComponentProvicer>
                <ContextTest />
              </ComponentProvicer>
            }
          />
          <Route
            path="/hotel/:id"
            element={
              <ComponentProvicer>
                <Hotel />
              </ComponentProvicer>
            }
          />
          <Route path="/member" element={<NavBackend menus={memberMenu} />}>
            <Route index element={<MemberInfo />} />
          </Route>
          <Route path="/accountinfo" element={<MemberInfo />} />
          <Route path="/login" element={<UserLogin />} />;
          <Route path="/regist" element={<UserRegist />} />;
          <Route path="/forgetPassword" element={<UserForgetPassword />} />;
          <Route path="/modifyPassword" element={<UserModifyPassword />} />;
          <Route path="/cms" element={<NavBackend menus={cmsMenu} />}>
            <Route
              path="/cms/info"
              element={
                <FilterProvider>
                  <CmsInfo />
                </FilterProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
