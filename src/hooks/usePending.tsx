import { useReducer } from "react";

const initialPending = {
  status: "DONE",
  message: "",
};

export interface InitialPending {
  status: "IS_LOADING" | "IS_SUCCESS" | "IS_ERROR" | "IS_ERROR_MULTI" | "DONE";
  message: string | string[];
}

export interface IModalProps {
  pending: InitialPending;
  dispatchPending: React.Dispatch<PendingAction>;
  closeModal: (time: number) => NodeJS.Timeout;
}

export type PendingAction =
  | {
      type: "IS_LOADING";
      payload?: string;
    }
  | {
      type: "IS_SUCCESS";
      payload?: string;
    }
  | {
      type: "IS_ERROR";
      payload?: string;
    }
  | {
      type: "IS_ERROR_MULTI";
      payload: string[];
    }
  | {
      type: "DONE";
      payload?: string;
    };
const pendingReducer = (
  pending: InitialPending,
  action: PendingAction
): InitialPending => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        status: "IS_LOADING",
        message: action.payload ?? "",
      };
    case "IS_SUCCESS":
      return {
        status: "IS_SUCCESS",
        message: action.payload ?? "",
      };
    case "IS_ERROR":
      return {
        status: "IS_ERROR",
        message: action.payload ?? "",
      };
    case "IS_ERROR_MULTI":
      return {
        status: "IS_ERROR_MULTI",
        message: action.payload ?? [],
      };
    case "DONE":
      return {
        status: "DONE",
        message: action.payload ?? "",
      };
    default:
      return pending;
  }
};

export default function usePending(): IModalProps {
  const [pending, dispatchPending] = useReducer(
    pendingReducer,
    initialPending as InitialPending
  );
  const closeModal = (time: number): NodeJS.Timeout =>
    setTimeout(() => dispatchPending({ type: "DONE" }), time);

  return { pending, dispatchPending, closeModal };
}
