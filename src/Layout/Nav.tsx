import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";

import logoSubtitlePath from "../img/logo-subtitle.svg";
import Button from "../components/Button";
import AccountMenu from "../components/AccountMenu";
import Footer from "./Footer";
import UserAuth from "../context/UserAuthContext";
import StatusModal from "./StatusModal";

function Nav(): JSX.Element {
  // 根據有無 token 來顯示會員選單與否
  const { authToken } = useContext(UserAuth);

  return (
    <StatusModal>
      <>
        <nav className="absolute top-0 z-10 flex w-full items-center justify-between bg-white py-4 px-20 shadow-md">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
            <Link to="/home">
              <img src={logoSubtitlePath} alt="logo" className=" w-48" />
            </Link>

            {authToken === "" ? (
              <div className="flex-center">
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
              <AccountMenu />
            )}
          </div>
        </nav>

        <div className="relative min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </>
    </StatusModal>
  );
}

export default Nav;
