import { createContext, useMemo } from "react";
import usePending, { IModalProps } from "../hooks/usePending";

export const ModalContext = createContext<IModalProps | null>(null);

function ModalProvider({ children }: { children: JSX.Element }): JSX.Element {
  const { pending, dispatchPending, closeModal } = usePending();
  const value = useMemo(
    () => ({ pending, dispatchPending, closeModal }),
    [dispatchPending, pending, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalProvider;
