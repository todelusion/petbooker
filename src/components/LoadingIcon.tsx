import { AnimatePresence } from "framer-motion";
import React from "react";
import MotionFade from "../containers/MotionFade";
import { LoadingPath, Loading } from "../img/icons";

interface ILoadingProps {
  className?: string;
}

function LoadingIcon({ className }: ILoadingProps): JSX.Element {
  return (
    <MotionFade className={className}>
      <div className="relative -mt-4">
        <img src={LoadingPath} alt="" className="w-28 " />
        <Loading className=" absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </MotionFade>
  );
}

export default LoadingIcon;
