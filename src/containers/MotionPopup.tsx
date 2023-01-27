import { motion } from "framer-motion";

interface IMotionPopup {
  children: JSX.Element;
  className?: string;
}

function MotionPopup({ children, className }: IMotionPopup): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MotionPopup;
