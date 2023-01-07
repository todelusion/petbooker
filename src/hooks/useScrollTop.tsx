import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

function useScrollTop({ children }: Props): JSX.Element {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    return window.scrollTo(0, 0);
  }, [pathname]);

  return <div>{children}</div>;
}

export default useScrollTop;
