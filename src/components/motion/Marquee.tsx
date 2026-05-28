import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** duração de um ciclo em segundos (maior = mais lento) */
  speed?: number;
  className?: string;
}

/**
 * Faixa de rolagem horizontal infinita. Duplica o conteúdo para o loop ser
 * contínuo (translateX -50%) e pausa quando o mouse está sobre ela.
 * Passe UMA cópia dos itens como children — o componente duplica sozinho.
 */
const Marquee = ({ children, speed = 40, className }: MarqueeProps) => {
  return (
    <div className={cn("group relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
