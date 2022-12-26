import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAuth from "../../context/UserAuthContext";
import { customerMenu, hotelMemberMenu, accountMenuPath } from "./data";

function AccountMenu(): JSX.Element {
  const navigate = useNavigate();
  const { setAuthToken, identity } = useContext(UserAuth);

  // 用is .... 如果是 boolean
  const [toggleAccountMenu, toggleAccountMenuSet] = useState(false);

  const renderMenu = (): typeof hotelMemberMenu => {
    // 根據會員身分來顯示可用的功能列表
    switch (identity) {
      case "customer":
        return customerMenu;
      case "hotel":
        return hotelMemberMenu;
      default:
        return customerMenu;
    }
  };

  useEffect(() => {
    const handleClick = (): void => {
      document.addEventListener("click", () => toggleAccountMenuSet(false));
    };
    return handleClick;
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={(e) => e.stopPropagation()}
      className="relative"
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => toggleAccountMenuSet(!toggleAccountMenu)}
        className="outline-none"
      >
        <img src={accountMenuPath} alt="accountMenu" className="w-10" />
      </button>
      <AnimatePresence>
        {toggleAccountMenu && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
            className="absolute right-0 w-44 origin-top-right rounded-md border-2 border-black bg-white px-4 py-2"
          >
            {renderMenu().map((item) => (
              <li key={item.content} className="py-2">
                <button
                  onClick={() => {
                    if (item.navigatePath === null)
                      throw new Error("navigatePath is null");

                    toggleAccountMenuSet(false);
                    if (item.navigatePath === "/home") {
                      setAuthToken("");
                      localStorage.setItem("token", "");
                      navigate(item.navigatePath);
                      return;
                    }
                    navigate(item.navigatePath);
                  }}
                  type="button"
                  className="flex items-center"
                >
                  <img src={item.logo} alt="userInfo" />
                  <span className="ml-2">{item.content}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AccountMenu;
