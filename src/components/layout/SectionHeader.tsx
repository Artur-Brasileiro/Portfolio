import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeaderProps = {
  /** Numeração de dois dígitos, ex.: "01". */
  index: string;
  /** Rótulo curto do eyebrow, ex.: "SOBRE". */
  label: string;
  title: string;
  lead?: string;
  /** Ação opcional alinhada à direita no desktop (ex.: "Ver todos"). */
  action?: ReactNode;
  className?: string;
};

const SectionHeader = ({
  index,
  label,
  title,
  lead,
  action,
  className,
}: SectionHeaderProps) => (
  <Reveal className={cn("mb-14 md:mb-16", className)}>
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3">
          <span className="tabular">{index}</span>
          <span aria-hidden className="h-px w-6 bg-primary/40" />
          <span>{label}</span>
        </p>

        <h2 className="font-display mt-5 text-display-lg font-semibold">{title}</h2>

        {lead && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  </Reveal>
);

export default SectionHeader;
