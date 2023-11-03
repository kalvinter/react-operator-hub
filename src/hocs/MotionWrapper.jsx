import { motion } from "framer-motion";

/* This motionwrapper can be used to wrap the content of routes so that they 
transition with a fade-in / fade-out effect  */
export const MotionWrapper = ({ skipAnimation, children }) => {
    const pageVariants = {
      initial: { opacity: skipAnimation ? 1 : 0 },
      in: { opacity: 1 },
      out: { opacity: 0 },
    };
  
    const pageTransition = {
      type: "tween",
      ease: "easeOut",
      duration: 0.3
    };
  
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    );
  };

  
  
  
  
  