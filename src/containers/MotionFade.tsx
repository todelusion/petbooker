import { motion } from "framer-motion";
import React from "react";

interface IMotionFadeProps {
  children: JSX.Element;
}

function MotionFade({ children }: IMotionFadeProps): JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-center absolute min-h-full w-full bg-slate-900/50"
    >
      {children}
    </motion.section>
  );
}

export default MotionFade;
