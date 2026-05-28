import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO, containerVariants, itemVariants } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** atraso em segundos */
  delay?: number;
  /** deslocamento vertical inicial em px */
  y?: number;
  className?: string;
}

/**
 * Revela o conteúdo ao entrar na viewport (fade + blur + subida).
 * Respeita prefers-reduced-motion (apenas fade, sem deslocamento).
 */
export const Reveal = ({ children, delay = 0, y = 40, className }: RevealProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/** Agrupa filhos para entrada escalonada. Use StaggerItem em cada filho. */
export const StaggerContainer = ({ children, className }: StaggerProps) => {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: {}, show: {} }
    : containerVariants;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};

/** Item individual dentro de um StaggerContainer. */
export const StaggerItem = ({ children, className }: StaggerProps) => {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : itemVariants;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

export default Reveal;
