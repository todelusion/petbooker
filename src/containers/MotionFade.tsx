import { motion } from "framer-motion";
import React from "react";

interface IMotionFadeProps {
  children: JSX.Element;
  className?: string;
}

function MotionFade({ children, className }: IMotionFadeProps): JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default MotionFade;
