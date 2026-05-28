import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** deslocamento total em px ao longo da passagem pela viewport */
  amount?: number;
  className?: string;
}

/**
 * Move o conteúdo em parallax conforme ele atravessa a viewport.
 * `amount` positivo = sobe ao rolar (camada mais "rápida"); negativo = desce.
 * Estático em reduced-motion.
 */
const Parallax = ({ children, amount = 80, className }: ParallaxProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
