import { ArrowDown, Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { getLenis } from "./motion/SmoothScroll";
import ProfileAvatar from "./ProfileAvatar";

const GITHUB_URL = "https://github.com/Artur-Brasileiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/artur-brasileiro/";

const Hero = () => {
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
    <section className="min-h-screen flex flex-col relative bg-background border-b border-border/40">
      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-1 items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full max-w-6xl">
          
          {/* Texto à Esquerda */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1"
          >
            <div className="inline-flex items-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-3 animate-pulse"></span>
              Disponível para novas oportunidades
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05]">
                Construindo <br />
                <span className="text-muted-foreground">Soluções Sólidas.</span>
              </h1>
              
              <h2 className="font-display text-xl md:text-2xl text-foreground font-medium">
                Engenheiro da Computação
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Especialista em software web moderno e sistemas embarcados. 
              Transformo problemas complexos em produtos eficientes, escaláveis 
              e orientados a resultados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 font-medium" asChild>
                <HashLink smooth to="/#projetos" scroll={scrollWithOffset}>
                  Ver Projetos
                  <ArrowRight className="w-4 h-4" />
                </HashLink>
              </Button>

              <Button size="lg" variant="ghost" className="w-full sm:w-auto rounded-full font-medium" asChild>
                <HashLink smooth to="/#contato" scroll={scrollWithOffset}>
                  Entrar em Contato
                </HashLink>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Imagem à Direita - Limpo, sem cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <ProfileAvatar src={`${import.meta.env.BASE_URL}avatar.jpg`} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/30 hover:text-foreground transition-colors cursor-pointer hidden md:flex"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <HashLink
          smooth
          to="/#sobre"
          scroll={scrollWithOffset}
          aria-label="Rolar para a seção Sobre"
        >
          <ArrowDown className="w-5 h-5" />
        </HashLink>
      </motion.div>
    </section>
  );
};

export default Hero;
