import { useEffect } from "react";
import {
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export interface PointerParallax {
  /** Posição do ponteiro normalizada (-0.5 a 0.5) a partir do centro da tela, suavizada por mola. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface PointerParallaxOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

/**
 * Sinal de parallax de ponteiro, compartilhado entre as camadas de profundidade.
 *
 * Um único listener global de `mousemove` (throttled por requestAnimationFrame),
 * suavizado por mola pra um movimento fluido estilo Apple. Cada camada deriva seu
 * próprio deslocamento a partir destes valores via `useTransform`.
 *
 * Inativo em `prefers-reduced-motion` e em dispositivos sem ponteiro fino (toque):
 * os valores ficam em 0, ou seja, sem movimento.
 */
export function usePointerParallax({
  stiffness = 55,
  damping = 18,
  mass = 0.7,
}: PointerParallaxOptions = {}): PointerParallax {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(e.clientX / window.innerWidth - 0.5);
        rawY.set(e.clientY / window.innerHeight - 0.5);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, rawX, rawY]);

  return { x, y };
}
