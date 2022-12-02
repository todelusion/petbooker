import { useReducer, useMemo } from "react";

const initialPending = {
  status: "",
  message: "",
};

export interface InitialPending {
  status: "isLoading" | "isSuccess" | "isError" | "";
  message: string;
}

export interface IModalProps {
  pending: InitialPending;
  dispatchPending: React.Dispatch<PendingAction>;
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
        status: "isLoading",
        message: action.payload ?? "",
      };
    case "IS_SUCCESS":
      return {
        status: "isSuccess",
        message: action.payload ?? "",
      };
    case "IS_ERROR":
      return {
        status: "isError",
        message: action.payload ?? "",
      };
    case "DONE":
      return {
        status: "",
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

  return { pending, dispatchPending };
}
