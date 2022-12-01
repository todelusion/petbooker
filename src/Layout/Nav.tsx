import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import logoSubtitlePath from "../img/logo-subtitle.svg";
import Button from "../components/Button";
import AccountMenu from "../components/AccountMenu";
import Footer from "./Footer";
import UserAuth from "../context/UserAuthContext";
import usePending, { IPendingProps, PendingAction } from "../hooks/usePending";
import StatusModal from "./StatusModal";
import MotionFade from "../containers/MotionFade";

function Nav(): JSX.Element {
  // 根據有無 token 來顯示會員選單與否
  const { authToken } = useContext(UserAuth);

  const { pending, dispatchPending } = usePending();

  return (
    <>
      <StatusModal pending={pending} />
      <nav className="absolute top-0 z-10 flex w-full items-center justify-between border-b-2 border-gray-200 bg-white py-6 px-20">
        <Link to="/home">
          <img src={logoSubtitlePath} alt="logo" className=" w-60" />
        </Link>
        <button
          type="button"
          className="rounded-3xl bg-slate-800 p-2 text-white"
          onClick={() => {
            if (pending.status === "") {
              dispatchPending({ type: "IS_SUCCESS", payload: "成功" });
              return undefined;
            }

            return dispatchPending({ type: "CLOSE_ALL" });
          }}
        >
          toggle Modal
        </button>

        <Link to="/contextTest">
          <span className=" rounded-3xl bg-slate-800 p-2 text-white">
            Context Test
          </span>
        </Link>
        {authToken === "" ? (
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

      <div className="relative min-h-screen">
        <Outlet context={{ pending, dispatchPending }} />
      </div>
      <Footer />
    </>
  );
}

export default Nav;

export function useNavContext(): IPendingProps {
  return useOutletContext<IPendingProps>();
}
