import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** `surface` pinta o fundo com a faixa clara alternada. */
  tone?: "default" | "surface";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/**
 * Bloco padrão de seção. Aplica o container `rail` — cujas bordas laterais de
 * 1px correm continuamente de uma seção à outra, emoldurando a página como um
 * documento técnico — mais o ritmo vertical e a hairline de separação.
 */
const Section = ({
  id,
  tone = "default",
  className,
  containerClassName,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={cn(
      "border-b border-border",
      tone === "surface" ? "bg-surface" : "bg-background",
      className,
    )}
  >
    <div className={cn("rail py-20 md:py-28", containerClassName)}>{children}</div>
  </section>
);

export default Section;
