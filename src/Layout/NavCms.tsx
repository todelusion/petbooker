import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

function NavCms({}: Props) {
  return (
    <div>
      <div className="pt-32">
        NavCms
        <Outlet />
      </div>
    </div>
  );
}

export default NavCms;
