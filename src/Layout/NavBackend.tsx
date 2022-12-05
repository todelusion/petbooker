import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

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

function NavBackend({ menus }: INavBackendProps): JSX.Element {
  const navigate = useNavigate();

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
