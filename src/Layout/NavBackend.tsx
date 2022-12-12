import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserAuth from "../context/UserAuthContext";
import useModal from "../hooks/useModal";

interface INavBackendProps {
  menus: Array<
    | {
        logo: string;
        content: string;
        navigatePath: null;
      }
    | {
        logo: string;
        content: string;
        navigatePath: string;
      }
  >;
}

const useCheckIdentity = (): boolean => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const { authToken, identity } = useContext(UserAuth);
  const { dispatchPending } = useModal();
  if (authToken === "") {
    dispatchPending({ type: "IS_ERROR", payload: "請登入會員" });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
    navigate("/login");
    return false;
  }
  if (identity === "customer" && pathname.includes("/cms")) {
    dispatchPending({
      type: "IS_ERROR",
      payload: "您不是業主身分，請切換為業主帳號並繼續",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
    navigate("/home");
    return false;
  }
  return true;
};

function NavBackend({ menus }: INavBackendProps): JSX.Element {
  const navigate = useNavigate();
  if (!useCheckIdentity()) {
    return <p>重新導向</p>;
  }

  return (
    <div className="relative flex min-h-screen justify-end px-10 pt-42 pb-20">
      <ul className="w-full max-w-[200px] ">
        {menus.map((menu) => (
          <li key={menu.content}>
            <button
              type="button"
              onClick={() => {
                if (menu.navigatePath == null) return;
                navigate(menu.navigatePath);
              }}
              className="flex w-full items-center rounded-3xl py-3 pl-6 pr-18 duration-75 hover:bg-gray-200"
            >
              <img src={menu.logo} alt="" width="24" />
              <span className="ml-4 whitespace-nowrap">{menu.content}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex w-[calc(100%-200px)] justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBackend;
