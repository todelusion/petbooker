import { Link, Outlet } from "react-router-dom";
import logoSubtitlePath from "../img/logo-subtitle.svg";
import Button from "../components/Button";
import AccountMenu from "../components/AccountMenu";
import Footer from "./Footer";

function Nav(): JSX.Element {
  // 根據有無 token 來顯示會員選單與否
  const token = undefined;

  return (
    <>
      <nav className="absolute top-0 z-10 flex w-full items-center justify-between border-b-2 border-gray-200 bg-white py-6 px-20">
        <Link to="/home">
          <img src={logoSubtitlePath} alt="logo" className=" w-60" />
        </Link>
        {token === undefined ? (
          <div className="flex-center pt-5">
            <Button
              type="Primary"
              text="登入"
              navigatePath="/login"
              className="px-4 py-2"
            />
            <Button
              type="Secondary"
              text="註冊"
              className="ml-4 px-4 py-2"
              navigatePath="/regist"
            />
          </div>
        ) : (
          <div className="pt-5">
            <AccountMenu />
          </div>
        )}
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
export default Nav;
