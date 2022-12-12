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
import CmsInfo from "./pages/Cms/CmsInfo";

import { cmsMenu, customerMenu } from "./Layout/data";
import { FilterProvider } from "./context/FilterContext";
import CmsOrder from "./pages/Cms/CmsOrder";
import CustomerInfo from "./pages/Customer/CustomerInfo";
import CmsRoom from "./pages/Cms/CmsRoom";
import CustomerPet from "./pages/Customer/CustomerPet";

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
          <Route path="/customer" element={<NavBackend menus={customerMenu} />}>
            <Route path="/customer/info" element={<CustomerInfo />} />
            <Route path="/customer/pet" element={<CustomerPet />} />
          </Route>
          <Route path="/login" element={<UserLogin />} />;
          <Route path="/regist" element={<UserRegist />} />;
          <Route path="/forgetPassword" element={<UserForgetPassword />} />;
          <Route path="/modifyPassword/:id" element={<UserModifyPassword />} />;
          <Route path="/cms" element={<NavBackend menus={cmsMenu} />}>
            <Route
              path="/cms/info"
              element={
                <FilterProvider>
                  <CmsInfo />
                </FilterProvider>
              }
            />
            <Route path="/cms/order" element={<CmsOrder />} />
            <Route path="/cms/room" element={<CmsRoom />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
