import type { Variants } from "framer-motion";

/** Easing "ease-out-expo" — base de quase todo o movimento premium do site. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Container que escalona a entrada dos filhos (use com StaggerItem). */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Item individual de um StaggerContainer. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
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
