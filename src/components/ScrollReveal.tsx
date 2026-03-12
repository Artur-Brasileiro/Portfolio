// Em src/components/ScrollReveal.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95, filter: "blur(8px)" }} 
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ willChange: "transform, opacity, filter" }} 
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;