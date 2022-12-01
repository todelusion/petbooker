import React, { createContext, useMemo } from "react";
import usePending, { IModalProps } from "../hooks/usePending";

export const ModalContext = createContext<IModalProps | null>(null);

function ModalProvider({ children }: { children: JSX.Element }): JSX.Element {
  const { pending, dispatchPending } = usePending();
  const value = useMemo(
    () => ({ pending, dispatchPending }),
    [dispatchPending, pending]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalProvider;
