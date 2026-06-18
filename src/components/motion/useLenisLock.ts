import { useEffect } from "react";
import { getLenis } from "./SmoothScroll";

/**
 * Pausa o Lenis (smooth scroll) enquanto `locked` for true.
 *
 * O Lenis intercepta a roda do mouse globalmente e rola a página por conta própria,
 * então o `overflow: hidden` que o Radix Dialog aplica no body NÃO basta — sem parar
 * o Lenis, o fundo continua subindo/descendo atrás de um modal/lightbox aberto.
 * Parar o Lenis também libera o wheel para o conteúdo do modal (ex.: zoom do modelo 3D).
 */
export function useLenisLock(locked: boolean) {
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return; // reduced-motion: Lenis desativado, nada a fazer
    if (locked) lenis.stop();
    else lenis.start();
    // Garante que o scroll volte ao sair (ex.: desmontar com modal aberto).
    return () => {
      getLenis()?.start();
    };
  }, [locked]);
}
