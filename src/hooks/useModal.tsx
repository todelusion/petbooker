import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { IModalProps } from "./usePending";

const useModal = (): IModalProps => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal() muse be used inside a ModalContext");
  }
  return context;
};

export default useModal;
