import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { NavHashLink } from 'react-router-hash-link';

const Hero = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -90;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  return (
    <section className="min-h-[calc(100vh-0px)] flex items-center justify-center relative bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold">
            Olá, eu sou{" "}
            <span className="gradient-text">Artur Brasileiro</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground">
            Engenheiro da Computação
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor de software e hardware, criando soluções web modernas e sistemas embarcados
          </p>
          <div className="flex gap-4 justify-center pt-4">

            {/* Botão Ver Projetos corrigido */}
            <Button size="lg" className="shadow-glow" asChild>
              <NavHashLink smooth to="/#projetos" scroll={scrollWithOffset}>
                Ver Projetos
              </NavHashLink>
            </Button>

            {/* Botão Entrar em Contato corrigido */}
            <Button size="lg" variant="secondary" asChild>
              <NavHashLink smooth to="/#contato" scroll={scrollWithOffset}>
                Entrar em Contato
              </NavHashLink>
            </Button>

          </div>
        </div>
      </div>

      {/* Seta para baixo corrigida */}
      <NavHashLink
        smooth to="/#sobre"
        scroll={scrollWithOffset}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </NavHashLink>

      {/* Borda ondulada (Wave SVG) com Neon de cabeça para baixo */}
      <div className="absolute left-0 right-0 top-full -mt-[2px] w-full leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="block w-full h-[70px] md:h-[90px] -scale-y-100"
          preserveAspectRatio="none"
        >
          {/* Path base sólido (mesma cor da base do Hero) */}
          <path
            className="fill-card"
            d="M0,64 C30,88 60,88 90,64 C120,40 150,40 180,64 C210,88 240,88 270,64 C300,40 330,40 360,64 C390,88 420,88 450,64 C480,40 510,40 540,64 C570,88 600,88 630,64 C660,40 690,40 720,64 C750,88 780,88 810,64 C840,40 870,40 900,64 C930,88 960,88 990,64 C1020,40 1050,40 1080,64 C1110,88 1140,88 1170,64 C1200,40 1230,40 1260,64 C1290,88 1320,88 1350,64 C1380,40 1410,40 1440,64 L1440,120 L0,120 Z"
          />
          {/* Path Neon animado aprimorado (sem fechar embaixo) */}
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