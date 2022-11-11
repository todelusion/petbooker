import { Outlet } from "react-router-dom";

function Nav(): JSX.Element {
  return (
    <>
      <nav className="bg-black text-white">NAV</nav>
      <Outlet />
    </>
  );
}
export default Nav;
