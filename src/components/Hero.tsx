import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { HashLink } from "react-router-hash-link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { wordContainer, wordItem, EASE_OUT_EXPO } from "@/lib/motion";
import Aurora from "./motion/Aurora";
import MagneticButton from "./motion/MagneticButton";
import { usePointerParallax } from "./motion/usePointerParallax";
import { getLenis } from "./motion/SmoothScroll";
import ProfileAvatar from "./ProfileAvatar";

const GITHUB_URL = "https://github.com/Artur-Brasileiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/artur-brasileiro/";

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

  // Conteúdo (foreground): sobe de leve e some ao rolar — mola pra desaceleração macia.
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Camadas decorativas — parallax de SCROLL em 3 profundidades, suavizado por mola.
  const deepScrollY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 70]), {
    stiffness: 70,
    damping: 20,
    mass: 0.9,
  });
  const midScrollY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), {
    stiffness: 75,
    damping: 20,
    mass: 0.7,
  });
  const nearScrollY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 280]), {
    stiffness: 80,
    damping: 20,
    mass: 0.55,
  });
  // Escala cinematográfica: o fundo "afunda" levemente ao rolar.
  const deepScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Parallax de PONTEIRO (desktop): o fundo desliza ao contrário do cursor ("olhar por uma janela");
  // planos mais próximos se deslocam mais. O conteúdo reage de leve, na mesma direção, pra ganhar vida.
  const { x: px, y: py } = usePointerParallax();
  const deepPointerX = useTransform(px, [-0.5, 0.5], [24, -24]);
  const deepPointerY = useTransform(py, [-0.5, 0.5], [18, -18]);
  const midPointerX = useTransform(px, [-0.5, 0.5], [44, -44]);
  const midPointerY = useTransform(py, [-0.5, 0.5], [32, -32]);
  const nearPointerX = useTransform(px, [-0.5, 0.5], [72, -72]);
  const nearPointerY = useTransform(py, [-0.5, 0.5], [52, -52]);
  const contentPointerX = useTransform(px, [-0.5, 0.5], [-12, 12]);
  const contentPointerY = useTransform(py, [-0.5, 0.5], [-8, 8]);

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
      className="min-h-screen flex flex-col relative bg-gradient-hero"
    >
      <Aurora />

      {/* Camadas de parallax decorativo (clipadas pra nunca vazar da tela) */}
      {!reduce && (
        <div
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* PLANO FUNDO — lento, levemente desfocado e com leve zoom ao rolar */}
          <motion.div
            style={{ y: deepScrollY, scale: deepScale }}
            className="absolute inset-0 will-change-transform"
          >
            <motion.div
              style={{ x: deepPointerX, y: deepPointerY }}
              className="absolute inset-[-6%] blur-[2px] will-change-transform"
            >
              {/* Grade de pontos sutil, desvanecendo nas bordas */}
              <div
                className="absolute inset-0 bg-dot-grid opacity-50"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 62% 52% at 50% 45%, black, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 62% 52% at 50% 45%, black, transparent 75%)",
                }}
              />
              <div className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-primary/[0.10] blur-3xl" />
              <div className="absolute right-[8%] bottom-[12%] h-80 w-80 rounded-full bg-accent/[0.08] blur-3xl" />
              <span className="absolute left-[7%] top-[20%] font-display text-6xl md:text-8xl font-bold text-primary/[0.12]">
                {"</>"}
              </span>
              <div className="absolute right-[14%] bottom-[22%] h-28 w-28 md:h-44 md:w-44 rounded-full border border-primary/[0.18]" />
            </motion.div>
          </motion.div>

          {/* PLANO MÉDIO — velocidade intermediária, nítido */}
          <motion.div
            style={{ y: midScrollY }}
            className="absolute inset-0 will-change-transform"
          >
            <motion.div
              style={{ x: midPointerX, y: midPointerY }}
              className="absolute inset-0 will-change-transform"
            >
              <div className="absolute right-[16%] top-[28%] h-56 w-56 rounded-full bg-accent/[0.10] blur-3xl" />
              <div className="absolute left-[10%] top-[42%] h-16 w-16 md:h-24 md:w-24 rotate-45 border border-accent/[0.22]" />
            </motion.div>
          </motion.div>

          {/* PLANO FRENTE — rápido, nítido, partículas com brilho */}
          <motion.div
            style={{ y: nearScrollY }}
            className="absolute inset-0 will-change-transform"
          >
            <motion.div
              style={{ x: nearPointerX, y: nearPointerY }}
              className="absolute inset-0 will-change-transform"
            >
              <div className="absolute right-[30%] top-[20%] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_2px_hsl(var(--primary)/0.7)]" />
              <div className="absolute left-[42%] bottom-[14%] h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_hsl(var(--accent)/0.7)]" />
              <div className="absolute right-[24%] bottom-[40%] h-1.5 w-1.5 rounded-full bg-primary/90 shadow-[0_0_10px_1px_hsl(var(--primary)/0.6)]" />
              <div className="absolute left-[14%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent/90 shadow-[0_0_10px_1px_hsl(var(--accent)/0.6)]" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Desvanecimento do fundo para --background chapado na base do hero: neutraliza
          o brilho da aurora antes da borda, para o preenchimento da onda (também
          --background) encostar sem degrau — a única fronteira fica sendo a ondulação. */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 z-[2] pointer-events-none bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity }}
        className="container mx-auto px-4 relative z-30 flex flex-1 items-center justify-center"
      >
        <motion.div
          style={reduce ? undefined : { x: contentPointerX, y: contentPointerY }}
          className="flex flex-col items-center text-center space-y-6 [@media(max-height:800px)]:space-y-4"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={reduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.1 }}
          >
            <ProfileAvatar src={`${import.meta.env.BASE_URL}avatar.jpg`} />
          </motion.div>

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
            Construo software web moderno e sistemas embarcados — da lógica do
            código à placa que executa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 [@media(max-height:800px)]:pt-1"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 1.05 }}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll (rolar para Sobre) — em fluxo, centralizado e
          abaixo do conteúdo, para nunca sobrepor os ícones sociais em telas baixas. */}
      <motion.div
        className="relative z-30 flex shrink-0 justify-center pb-8 max-md:hidden [@media(max-height:720px)]:hidden"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <HashLink
          smooth
          to="/#sobre"
          scroll={scrollWithOffset}
          aria-label="Rolar para a seção Sobre"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary cursor-pointer"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest">Rolar</span>
          <ArrowDown className="w-5 h-5" />
        </HashLink>
      </motion.div>

      {/* Borda ondulada para a próxima seção. O preenchimento usa a MESMA cor do
          fundo do hero (--background, onde o gradient-hero termina), então a única
          fronteira visível é a própria ondulação neon — sem linha reta separando
          as seções (mesma abordagem da onda de Projetos). */}
      <div
        className="absolute left-0 right-0 top-full -mt-[2px] w-full leading-none z-10 pointer-events-none"
        aria-hidden="true"
      >
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
