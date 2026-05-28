import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { HashLink } from "react-router-hash-link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wordContainer, wordItem, EASE_OUT_EXPO } from "@/lib/motion";
import Aurora from "./motion/Aurora";
import MagneticButton from "./motion/MagneticButton";
import { getLenis } from "./motion/SmoothScroll";

const titleStart = ["Olá,", "eu", "sou"];
const titleName = ["Artur", "Brasileiro"];

const Word = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => (
  <motion.span variants={wordItem} className={`inline-block ${className}`}>
    {children}
  </motion.span>
);

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Parallax das camadas decorativas (profundidades diferentes)
  const yDeep = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const scrollWithOffset = (el: HTMLElement) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yCoordinate - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-hero"
    >
      <Aurora />

      {/* Camadas de parallax decorativo (clipadas pra nunca vazar da tela) */}
      {!reduce && (
        <div
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Profunda — movimento lento */}
          <motion.div style={{ y: yDeep }} className="absolute inset-0">
            <span className="absolute left-[7%] top-[20%] font-display text-6xl md:text-8xl font-bold text-primary/[0.06]">
              {"</>"}
            </span>
            <span className="absolute right-[9%] top-[26%] font-mono text-5xl md:text-7xl text-accent/[0.06]">
              {"{ }"}
            </span>
            <span className="absolute left-[16%] bottom-[18%] font-mono text-4xl md:text-6xl text-primary/[0.05]">
              {"010110"}
            </span>
            <div className="absolute right-[14%] bottom-[22%] h-28 w-28 md:h-40 md:w-40 rounded-full border border-primary/[0.07]" />
          </motion.div>

          {/* Próxima — movimento rápido */}
          <motion.div style={{ y: yNear }} className="absolute inset-0">
            <span className="absolute right-[19%] bottom-[28%] font-display text-7xl md:text-9xl font-bold text-accent/[0.07]">
              {"( )"}
            </span>
            <span className="absolute left-[21%] top-[14%] font-mono text-4xl md:text-6xl text-accent/[0.05]">
              {"=>"}
            </span>
            <div className="absolute left-[10%] top-[42%] h-16 w-16 md:h-24 md:w-24 rotate-45 border border-accent/[0.08]" />
            <div className="absolute right-[30%] top-[20%] h-2 w-2 rounded-full bg-primary/30" />
            <div className="absolute left-[42%] bottom-[14%] h-2 w-2 rounded-full bg-accent/30" />
            <div className="absolute right-[24%] bottom-[40%] h-1.5 w-1.5 rounded-full bg-primary/20" />
          </motion.div>
        </div>
      )}

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="container mx-auto px-4 relative z-30"
      >
        <div className="text-center space-y-6">
          {reduce ? (
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              Olá, eu sou <span className="gradient-text">Artur Brasileiro</span>
            </h1>
          ) : (
            <motion.h1
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="font-display text-5xl md:text-7xl font-bold tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
            >
              {titleStart.map((w) => (
                <Word key={w}>{w}</Word>
              ))}
              {titleName.map((w) => (
                <Word key={w} className="gradient-text">
                  {w}
                </Word>
              ))}
            </motion.h1>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.6 }}
            className="font-display text-2xl md:text-3xl text-muted-foreground"
          >
            Engenheiro da Computação
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.75 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Desenvolvedor de software e hardware, criando soluções web modernas e
            sistemas embarcados
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <MagneticButton className="inline-flex w-full sm:w-auto">
              <Button size="lg" className="shadow-glow w-full" asChild>
                <HashLink smooth to="/#projetos" scroll={scrollWithOffset}>
                  Ver Projetos
                </HashLink>
              </Button>
            </MagneticButton>

            <MagneticButton className="inline-flex w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <HashLink smooth to="/#contato" scroll={scrollWithOffset}>
                  Entrar em Contato
                </HashLink>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Seta para baixo */}
      <HashLink
        smooth
        to="/#sobre"
        scroll={scrollWithOffset}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </HashLink>

      {/* Borda ondulada (Wave SVG) com Neon */}
      <div className="absolute left-0 right-0 top-full -mt-[2px] w-full leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="block w-full h-[70px] md:h-[90px] -scale-y-100"
          preserveAspectRatio="none"
        >
          <path
            className="fill-background"
            d="M0,64 C30,88 60,88 90,64 C120,40 150,40 180,64 C210,88 240,88 270,64 C300,40 330,40 360,64 C390,88 420,88 450,64 C480,40 510,40 540,64 C570,88 600,88 630,64 C660,40 690,40 720,64 C750,88 780,88 810,64 C840,40 870,40 900,64 C930,88 960,88 990,64 C1020,40 1050,40 1080,64 C1110,88 1140,88 1170,64 C1200,40 1230,40 1260,64 C1290,88 1320,88 1350,64 C1380,40 1410,40 1440,64 L1440,120 L0,120 Z"
          />
          <path
            className="neon-wave"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            d="M0,64 C30,88 60,88 90,64 C120,40 150,40 180,64 C210,88 240,88 270,64 C300,40 330,40 360,64 C390,88 420,88 450,64 C480,40 510,40 540,64 C570,88 600,88 630,64 C660,40 690,40 720,64 C750,88 780,88 810,64 C840,40 870,40 900,64 C930,88 960,88 990,64 C1020,40 1050,40 1080,64 C1110,88 1140,88 1170,64 C1200,40 1230,40 1260,64 C1290,88 1320,88 1350,64 C1380,40 1410,40 1440,64"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
