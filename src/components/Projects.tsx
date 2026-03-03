import { Code2, ExternalLink, ArrowRight, Microchip, Star, Github, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const Projects = () => {

  const projectCategories = [
    {
      icon: Code2,
      title: "Programação",
      description: "Aplicações web, APIs e softwares.",
      link: "/programacao",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGlow: "group-hover:border-cyan-500/50"
    },
    {
      icon: Microchip,
      title: "Hardware",
      description: "Sistemas embarcados, IoT e eletrônica.",
      link: "/hardware",
      gradient: "from-orange-500/20 to-red-500/20",
      borderGlow: "group-hover:border-orange-500/50"
    },
  ];

  // Dados dos projetos em destaque (Um de Software, Um de Hardware)
  const featuredProjects = [
    {
      title: "EnglishUp",
      category: "Software",
      description: "Plataforma web para aprendizado de inglês com recursos interativos e design moderno.",
      image: "englishup.png", 
      tags: ["React", "TypeScript", "Web"],
      demoLink: "https://playenglishup.com.br/",
      githubLink: "https://github.com/Artur-Brasileiro/English-Hub",
      accentColor: "group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10"
    },
    {
      title: "Deauther Didático (5GHz)",
      category: "Hardware",
      description: "Dispositivo para estudo de redes Wi-Fi e cibersegurança, com case impresso em 3D e PCB customizada.",
      image: "projeto_deauther.jpg", // Já está no seu repositório
      tags: ["C++", "BW-16", "Impressão 3D", "PCB"],
      demoLink: null, // Deixei null pois hardware geralmente não tem link de site
      githubLink: "https://github.com/Artur-Brasileiro/Deauther-5GHz",
      accentColor: "group-hover:border-orange-500/50 group-hover:shadow-orange-500/10"
    }
  ];

  return (
    <section id="projetos" className="py-20 relative overflow-hidden">
      {/* Luzes de fundo para dar profundidade */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Meus <span className="gradient-text drop-shadow-sm">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Da lógica do software à precisão do hardware.
          </p>
        </div>

        {/* Navegação por Categorias */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {projectCategories.map((category, index) => (
            <Card
              key={index}
              className={`p-1 relative overflow-hidden group rounded-2xl bg-gradient-to-br ${category.gradient} border border-white/5 ${category.borderGlow} transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="bg-card/90 backdrop-blur-sm h-full w-full rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors group-hover:bg-card/70">
                <category.icon className="w-16 h-16 text-foreground/80 mb-6 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-8">
                  {category.description}
                </p>
                
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto border-white/10">
                  <Link to={category.link} className="flex items-center gap-2">
                    Acessar Repositório <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* =============== SEÇÃO DE PROJETOS DESTAQUE =============== */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              Projetos Destaque
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className={`group flex flex-col overflow-hidden bg-card border-border/50 shadow-lg transition-all duration-500 ${project.accentColor}`}
              >
                {/* Imagem do Projeto */}
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img 
                    src={project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image}`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-white/10 text-foreground font-semibold">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="border-border/60 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.demoLink && (
                      <Button asChild variant="default" className="flex-1 min-w-[140px]">
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Ver Online
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button asChild variant="outline" className="flex-1 min-w-[140px] border-white/10 hover:bg-secondary">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Repositório
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;