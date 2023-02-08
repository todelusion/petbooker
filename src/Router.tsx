import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ComponentProvicer from "./context";

import Nav from "./Layout/Nav";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage/index";
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
import CustomerBook from "./pages/Customer/CustomerBook/intex";
import Success from "./pages/Customer/CustomerBook/Success/Success";
import CustomerOrder from "./pages/Customer/CustomerOrder";
import CustomerComment from "./pages/Customer/CustomerComment";
import Fail from "./pages/Customer/CustomerBook/Fail/Fail";
import CmsCommentList from "./pages/Cms/CmsCommentList";

export default function Router(): JSX.Element {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route
          path="/"
          element={
            <ComponentProvicer>
              <Nav />
            </ComponentProvicer>
          }
        >
          <Route path="/" element={<LandingPage />} />
          <Route
            path="*"
            element={
              <Fail
                title="伺服器施工中"
                text="伺服器施工中，如有造成不便敬請見諒"
                button
              />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route
            path="/hotel/book/:roomid/:roomname/:price"
            element={<CustomerBook />}
          />
          <Route path="/hotel/book/success" element={<Success />} />
          <Route path="/hotel/book/fail" element={<Fail />} />
          <Route path="/customer" element={<NavBackend menus={customerMenu} />}>
            <Route path="/customer/info" element={<CustomerInfo />} />
            <Route path="/customer/pet" element={<CustomerPet />} />
            <Route path="/customer/order" element={<CustomerOrder />} />
            <Route path="/customer/comment" element={<CustomerComment />} />
            <Route path="/customer/OrderSuccess" element={<Success />} />
            {/* <Route path="/customer/OrderFail" element={<Fail />} /> */}
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
            <Route path="/cms/commentList" element={<CmsCommentList />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
