import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  memberMenu,
  hotelMemberMenu,
  accountMenuPath,
} from "../img/icons/icons";

type Member = "member" | "hotel";

function AccountMenu(): JSX.Element {
  const [toggleAccountMenu, toggleAccountMenuSet] = useState(true);
  let member: Member;
  // eslint-disable-next-line prefer-const
  member = "member";

  const renderMenu = (): typeof memberMenu => {
    // 根據會員身分來顯示可用的功能列表
    switch (member) {
      case "member":
        return memberMenu;
      case "hotel":
        return hotelMemberMenu;
      default:
        return memberMenu;
    }
  };

  useEffect(() => {
    const handleClick = (): void => {
      document.addEventListener("click", () => toggleAccountMenuSet(false));
    };
    return handleClick;
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="relative"
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => toggleAccountMenuSet(!toggleAccountMenu)}
        className="outline-none"
      >
        <img src={accountMenuPath} alt="accountMenu" className="mb-2 w-10" />
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
                <button type="button" className="flex items-center">
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
