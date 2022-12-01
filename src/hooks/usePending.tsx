import { useReducer } from "react";

const initialPending = {
  status: "",
  message: "",
};

export type InitialPending = {
  status: "isLoading" | "isSuccess" | "isError" | "";
  message: string;
};

export interface IPendingProps {
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
      type: "CLOSE_ALL";
      payload?: string;
    };
const pendingReducer = (
  state: InitialPending,
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
    case "CLOSE_ALL":
      return {
        status: "",
        message: action.payload ?? "",
      };
    default:
      return state;
  }
};

export default function usePendingStatus(): IPendingProps {
  const [pending, dispatchPending] = useReducer(
    pendingReducer,
    initialPending as InitialPending
  );

  return { pending, dispatchPending };
}
