import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Anima um número de 0 até `value` quando entra na viewport.
 * Em reduced-motion mostra o valor final direto.
 */
const CountUp = ({ value, suffix = "", duration = 1.6, className }: CountUpProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
