import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

let lenisInstance: Lenis | null = null;

/** Acesso à instância ativa do Lenis (null quando reduced-motion). */
export const getLenis = () => lenisInstance;

/** Rola até o topo respeitando o Lenis (com fallback nativo). */
export const scrollToTop = (immediate = true) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
};

/**
 * Provider de smooth scroll com inércia (Lenis).
 * Desativado automaticamente quando o usuário prefere menos movimento.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduce]);

  return <>{children}</>;
};

export default SmoothScroll;
