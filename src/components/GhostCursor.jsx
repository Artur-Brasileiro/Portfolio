// Em src/components/GhostCursor.jsx
import { useEffect, useRef, useState } from "react";

const GhostCursor = () => {
  const cursorRef = useRef(null); 
  const [visible, setVisible] = useState(false);
  
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const shownRef = useRef(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return undefined;

    const lerp = (a, b, t) => a + (b - a) * t;

    const move = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!shownRef.current) {
        shownRef.current = true;
        posRef.current = { x: e.clientX, y: e.clientY };
        setVisible(true); 
      }
    };

    const animate = () => {
      const next = {
        x: lerp(posRef.current.x, targetRef.current.x, 0.12),
        y: lerp(posRef.current.y, targetRef.current.y, 0.12),
      };
      posRef.current = next;
      
      if (cursorRef.current) {
        // Usando translate3d em vez de translate para forçar o uso da GPU (Aceleração de Hardware)
        cursorRef.current.style.transform = `translate3d(${next.x - 120}px, ${next.y - 120}px, 0)`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    // ADICIONADO { passive: true } para não bloquear a thread principal
    window.addEventListener("mousemove", move, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef} 
      className="fixed pointer-events-none z-20 will-change-transform" 
      style={{
        width: "240px", // Adicionado "px" para evitar recálculo
        height: "240px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 255, 200, 0.45) 0%, rgba(0,255,200,0.08) 40%, transparent 70%)",
        filter: "blur(70px)",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default GhostCursor;