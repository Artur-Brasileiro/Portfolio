import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fundo "aurora": blobs de gradiente esmeralda/teal que flutuam lentamente,
 * + um spotlight que segue o cursor (apenas desktop / pointer fino).
 * Totalmente decorativo (aria-hidden) e desligado em reduced-motion.
 */
const Aurora = () => {
  const reduce = useReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = spotRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-1/4 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-aurora-1" />
      <div className="absolute bottom-0 right-1/4 h-[35rem] w-[35rem] translate-x-1/2 rounded-full bg-accent/20 blur-[120px] animate-aurora-2" />
      <div
        ref={spotRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), hsl(var(--primary) / 0.10), transparent 70%)",
        }}
      />
    </div>
  );
};

export default Aurora;
