import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { memberMenu, accountMenuPath } from "../img/icons/icons";

function AccountMenu(): JSX.Element {
  const [toggleAccountMenu, toggleAccountMenuSet] = useState(true);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>): void => {
      const element = e.target as HTMLElement;
      if (element.contains(accountMenuRef.current)) {
        toggleAccountMenuSet(false);
      }
    };
    const handleClick = (): void => {
      document.addEventListener("click", (e) =>
        handleOutsideClick(e as unknown as React.MouseEvent<HTMLElement>)
      );
    };

    return handleClick;
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => toggleAccountMenuSet(!toggleAccountMenu)}
        className="outline-none"
      >
        <img src={accountMenuPath} alt="accountMenu" className="mb-2 w-10" />
      </button>
      <div ref={accountMenuRef}>
        <AnimatePresence>
          {toggleAccountMenu && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
              className="absolute right-0 w-44 origin-top-right rounded-md border-2 border-black bg-white px-4 py-2"
            >
              {memberMenu.map((item) => (
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
    </div>
  );
}

export default AccountMenu;
