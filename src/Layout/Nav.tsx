import { Outlet } from "react-router-dom";
import logoSubtitlePath from "../assets/logo-subtitle.svg";
import Button from "../components/Button";

function Nav(): JSX.Element {
  const token = "fake token";

  return (
    <>
      <nav className="absolute top-0 flex w-full items-center justify-between border-b-2 border-gray-200 bg-white py-6 px-20">
        <img src={logoSubtitlePath} alt="logo" width="291" />
        <div className="flex-center">
          <Button type="Primary" text="登入" />
          <Button type="Secondary" text="註冊" className="ml-4" />
        </div>
      </nav>
      <Outlet />
    </>
  );
}
export default Nav;
