import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./hooks/useScrollTop";
import { UserAuthContetxt } from "./context/UserAuthContext";
import "swiper/css";
import "swiper/css/navigation";

import "./tailwind.css";
import Router from "./Router";
import ModalProvider from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <UserAuthContetxt>
        <ModalProvider>
          <ScrollToTop>
            <Router />
          </ScrollToTop>
        </ModalProvider>
      </UserAuthContetxt>
    </HashRouter>
  </React.StrictMode>
);
