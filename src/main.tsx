import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./hooks/useScrollTop";

import "./tailwind.css";
import Router from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop>
        <Router />
      </ScrollToTop>
    </HashRouter>
  </React.StrictMode>
);
