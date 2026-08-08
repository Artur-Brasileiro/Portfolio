import type { Variants } from "framer-motion";

/** Easing "ease-out-expo" — base de quase todo o movimento premium do site. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Escala de durações (segundos) compartilhada pelo motion do site. */
export const DURATION = { fast: 0.3, base: 0.6, slow: 0.8 } as const;

/** Mola suave padrão para desaceleração macia (parallax/conteúdo). */
export const SPRING_SOFT = { stiffness: 90, damping: 24, mass: 0.5 } as const;

/** Container que escalona a entrada dos filhos (use com StaggerItem). */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Item individual de um StaggerContainer. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

/** Variantes para revelar título palavra por palavra. */
export const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
