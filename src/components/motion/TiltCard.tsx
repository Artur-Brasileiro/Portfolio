import Tilt from "react-parallax-tilt";
import { useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card com leve tilt 3D ao mover o mouse + spotlight que segue o cursor.
 * Passe a MESMA borda arredondada do card no className (ex: "rounded-lg")
 * para o spotlight ser recortado no formato certo.
 * Em reduced-motion vira um container estático (sem tilt).
 */
const TiltCard = ({ children, className }: TiltCardProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group/tilt relative h-full overflow-hidden", className)}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.15), transparent 70%)",
        }}
      />
    </div>
  );

  if (reduce) return inner;

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      scale={1.02}
      transitionSpeed={1500}
      glareEnable={false}
      className="h-full"
    >
      {inner}
    </Tilt>
  );
};

export default TiltCard;
