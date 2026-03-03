import { useEffect, useRef, useState } from "react";

const GhostCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
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
        setPos(posRef.current);
        setVisible(true);
      }
    };

    const animate = () => {
      const next = {
        x: lerp(posRef.current.x, targetRef.current.x, 0.12),
        y: lerp(posRef.current.y, targetRef.current.y, 0.12),
      };
      posRef.current = next;
      setPos(next);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        transform: `translate(${pos.x - 120}px, ${pos.y - 120}px)`,
        width: 240,
        height: 240,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0, 255, 200, 0.45) 0%, rgba(0,255,200,0.08) 40%, transparent 70%)",
        filter: "blur(70px)",
        mixBlendMode: "screen", // deixa mais suave no fundo escuro
      }}
    />
  );
};

export default GhostCursor;
