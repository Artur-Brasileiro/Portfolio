import { useEffect, useRef, useState } from "react";

const GhostCursor = () => {
  // 1. Criamos a ref para acessar a div diretamente
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
        // setVisible continua aqui pois ele só é chamado uma única vez
        setVisible(true); 
      }
    };

    const animate = () => {
      const next = {
        x: lerp(posRef.current.x, targetRef.current.x, 0.12),
        y: lerp(posRef.current.y, targetRef.current.y, 0.12),
      };
      posRef.current = next;
      
      // 2. MÁGICA: Em vez de setPos(next) (que causa re-render no React), 
      // mudamos o estilo direto na tag HTML. Custo de performance quase zero.
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${next.x - 120}px, ${next.y - 120}px)`;
      }
      
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
      // 3. Conectamos a ref aqui
      ref={cursorRef} 
      // 4. Mantemos o seu z-[-1] e adicionamos will-change-transform para a Placa de Vídeo (GPU) processar o movimento
      className="fixed pointer-events-none z-[-1] will-change-transform" 
      style={{
        // Removemos o transform daqui, pois a função animate cuidará dele via ref
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