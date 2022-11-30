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
    <div className="flex min-h-screen justify-evenly px-20 pt-42">
      <ul className="w-full max-w-[200px] basis-3/12 ">
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
      <Outlet />
    </div>
  );
}

export default NavBackend;
