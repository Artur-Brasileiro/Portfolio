import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useState, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** quão forte o elemento é atraído pelo cursor (0–1) */
  strength?: number;
}

/**
 * Envolve um botão/elemento e o "atrai" suavemente em direção ao cursor no hover.
 * Desligado em reduced-motion e em telas de toque (onMouseMove não dispara).
 */
const MagneticButton = ({
  children,
  className = "inline-flex",
  strength = 0.4,
}: MagneticButtonProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * strength, y: y * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
