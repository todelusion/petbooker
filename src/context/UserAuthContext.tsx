import React, {
  useMemo,
  useState,
  createContext,
  SetStateAction,
  useEffect,
} from "react";

interface UserAuthProps {
  children: JSX.Element;
}
const UserAuth = createContext({
  authToken: "",
  identity: "" as "customer" | "Hotel",
  setAuthToken: (() => {}) as React.Dispatch<SetStateAction<string>>,
  setIdentity: (() => {}) as React.Dispatch<SetStateAction<string>>,
});

export default UserAuth;

export function UserAuthContetxt({ children }: UserAuthProps): JSX.Element {
  const initToken = localStorage.getItem("token") ?? "";
  const initIdentity = localStorage.getItem("identity") ?? "";

  const [authToken, setAuthToken] = useState(initToken);
  const [identity, setIdentity] = useState(initIdentity);
  const value = useMemo(
    () => ({
      authToken,
      setAuthToken,
      identity,
      setIdentity,
    }),
    [authToken, identity]
  );
  console.log({ authToken, identity });

  useEffect(() => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("identity", identity);
  });

  return <UserAuth.Provider value={value}>{children}</UserAuth.Provider>;
}
