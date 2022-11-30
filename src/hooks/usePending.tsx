import { useReducer } from "react";

interface IPending {
  status: {
    isError: { status: boolean; message: string };
    isLoading: { status: boolean; message: string };
    isSuccess: { status: boolean; message: string };
  };
  dispatchPending: React.Dispatch<PendingAction>;
}
const initialStatus = {
  isLoading: {
    status: false,
    message: "",
  },
  isSuccess: {
    status: false,
    message: "",
  },
  isError: {
    status: false,
    message: "",
  },
};

export type InitialStatus = typeof initialStatus;

export type PendingAction =
  | {
      type: "IS_LOADING";
      payload: {
        status: boolean;
        message: string;
      };
    }
  | {
      type: "IS_SUCCESS";
      payload: {
        status: boolean;
        message: string;
      };
    }
  | {
      type: "IS_ERROR";
      payload: {
        status: boolean;
        message: string;
      };
    };
const pendingReducer = (
  state: InitialStatus,
  action: PendingAction
): InitialStatus => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case "IS_SUCCESS":
      return {
        ...state,
        isSuccess: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case "IS_ERROR":
      return {
        ...state,
        isError: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};

export default function usePendingStatus(): IPending {
  const [status, dispatchPending] = useReducer(pendingReducer, initialStatus);

  return { status, dispatchPending };
}
