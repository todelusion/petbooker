import { Outlet } from "react-router-dom";
import logoSubtitlePath from "../img/logo-subtitle.svg";
import Button from "../components/Button";
import AccountMenu from "../components/AccountMenu";

function Nav(): JSX.Element {
  const token = "fake token";

  return (
    <>
      <nav className="absolute top-0 z-10 flex w-full items-center justify-between border-b-2 border-gray-200 bg-white py-6 px-20">
        <img src={logoSubtitlePath} alt="logo" width="291" />
        {token === undefined ? (
          <div className="flex-center">
            <Button type="Primary" text="登入" />
            <Button type="Secondary" text="註冊" className="ml-4" />
          </div>
        ) : (
          <AccountMenu />
        )}
      </nav>
      <Outlet />
    </>
  );
}
export default Nav;
