// axios狀態管理鉤子，用在handlePromiseResult()

import { useReducer, useState } from "react";
// import { PendingType } from "../types/Enum";

const initialState = {
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

type InitialState = typeof initialState;

type PendingAction =
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
  state: InitialState,
  action: PendingAction
): InitialState => {
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

export default function usePendingStatus(): void {
  const [{ isError, isLoading, isSuccess }, dispatchPending] = useReducer(
    pendingReducer,
    initialState
  );

  // const [Result, setResult] = useState(initialState);

  return { isError, isLoading, isSuccess, dispatchPending };
}
