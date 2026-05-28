import { Code2, ArrowRight, Microchip, Star, Github, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Reveal, StaggerContainer, StaggerItem } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

const projectCategories = [
  {
    icon: Code2,
    title: "Programação",
    description: "Aplicações web, APIs e softwares.",
    link: "/programacao",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    icon: Microchip,
    title: "Hardware",
    description: "Sistemas embarcados, IoT e eletrônica.",
    link: "/hardware",
    gradient: "from-amber-500/20 to-orange-600/20",
  },
];

const featuredProjects = [
  {
    id: "englishup",
    title: "EnglishUp",
    category: "Software",
    description:
      "Plataforma web para aprendizado de inglês com recursos interativos e design moderno.",
    image: "englishup.png",
    tags: ["React", "TypeScript", "Web"],
    demoLink: "https://playenglishup.com.br/",
    githubLink: "https://github.com/Artur-Brasileiro/English-Hub",
    isInternal: false,
  },
  {
    id: "macropad-oled",
    title: "Macropad Inteligente",
    category: "Hardware & PCB",
    description:
      "Teclado auxiliar com display integrado e app multiplataforma que detecta programas ativos para mudar o contexto.",
    image: "projeto_macropad.png",
    tags: ["C++", "EasyEDA", "PCB", "Python"],
    demoLink: "/projeto/macropad",
    githubLink: "https://github.com/Artur-Brasileiro/Macropad-TCC",
    isInternal: true,
  },
];

const Projects = () => {
  return (
    <section id="projetos" className="py-20 relative">
      {/* Luzes de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-30">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Meus <span className="gradient-text drop-shadow-sm">Projetos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Da lógica do software à precisão do hardware.
            </p>
          </div>
        </Reveal>

        {/* Navegação por Categorias */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {projectCategories.map((category) => (
            <StaggerItem key={category.title} className="h-full">
              <TiltCard className="rounded-2xl h-full">
                <Card
                  className={`p-1 relative h-full overflow-hidden group rounded-2xl bg-gradient-to-br ${category.gradient} border border-white/5 transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="bg-card/90 backdrop-blur-sm h-full w-full rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors group-hover:bg-card/70">
                    <category.icon className="w-16 h-16 text-foreground/80 mb-6 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
                    <h3 className="font-display text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground mb-8">{category.description}</p>

                    <Button
                      asChild
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto border-white/10"
                    >
                      <Link to={category.link} className="flex items-center gap-2">
                        Acessar Repositório
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* =============== PROJETOS DESTAQUE =============== */}
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <h3 className="font-display text-3xl font-bold flex items-center gap-3">
                Projetos Destaque
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
              </h3>
            </div>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 pt-4">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <TiltCard className="rounded-xl h-full">
                  <Card className="group flex h-full flex-col overflow-hidden bg-card border-border/50 shadow-lg transition-all duration-500 hover:border-primary/40 hover:shadow-glow">
                    {/* Imagem */}
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <img
                        src={
                          project.image.startsWith("http")
                            ? project.image
                            : `${import.meta.env.BASE_URL}${project.image}`
                        }
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-md border-white/10 text-foreground font-semibold"
                        >
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="font-display text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-muted-foreground mb-6 flex-1 text-sm">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-border/60 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                        {project.demoLink && (
                          <Button asChild variant="default" className="flex-1">
                            {project.isInternal ? (
                              <Link to={project.demoLink}>
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </Link>
                            ) : (
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <Globe className="w-4 h-4 mr-2" />
                                Ver Online
                              </a>
                            )}
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 border-white/10 hover:bg-secondary"
                          >
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Repositório
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

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

export default Projects;
