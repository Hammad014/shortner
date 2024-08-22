// components/Animate.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimateProps {
  children: ReactNode;  
}

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 2, ease: "easeInOut" } }
  };

const Animate: React.FC<AnimateProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants} 
      className="animated-component"
    >
      {children}
    </motion.div>
  );
};

export default Animate;
