import { ArrowRight, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./motion/Reveal";

const featuredProjects = [
  {
    id: "viewcongresso",
    title: "ViewCongresso",
    category: "Software",
    description:
      "Plataforma corporativa para organização e participação em congressos e simpósios, oferecendo gestão de submissão de trabalhos, inscrições e avaliação por pares.",
    image: "viewcongresso.svg",
    logoCover: true,
    tags: ["Next.js", "React", "TypeScript"],
    demoLink: "https://viewcongresso.com.br",
    githubLink: "",
    isInternal: false,
  },
  {
    id: "englishup",
    title: "EnglishUp",
    category: "Software",
    description:
      "Sistema de e-learning interativo para aprendizado de inglês, projetado com uma interface moderna e foco em retenção de alunos.",
    image: "englishup.webp",
    logoCover: false,
    tags: ["React", "TypeScript", "Tailwind CSS"],
    demoLink: "https://playenglishup.com.br/",
    githubLink: "https://github.com/Artur-Brasileiro/English-Hub",
    isInternal: false,
  },
  {
    id: "macropad-oled",
    title: "Macropad Inteligente",
    category: "Hardware",
    description:
      "Dispositivo IoT auxiliar com display OLED. Possui software desktop que se adapta dinamicamente ao contexto dos aplicativos em uso.",
    image: "capa_macropad.jpg",
    logoCover: false,
    tags: ["C++", "Python", "Integração de Hardware"],
    demoLink: "/projeto/macropad",
    githubLink: "https://github.com/Artur-Brasileiro/Macropad-TCC",
    isInternal: true,
  },
];

const Projects = () => {
  return (
    <section id="projetos" className="py-32 bg-background border-b border-border/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Cases em Destaque
              </h2>
              <p className="text-muted-foreground text-lg">
                Projetos selecionados que demonstram a intersecção entre design limpo, 
                arquitetura de software robusta e inovação em engenharia.
              </p>
            </div>
            <Link 
              to="/programacao" 
              className="inline-flex items-center gap-2 font-medium text-foreground hover:text-muted-foreground transition-colors group"
            >
              Ver todos os projetos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={0.1 * (index + 1)}>
              <div className="flex flex-col h-full group">
                <div
                  className={`relative aspect-[4/3] overflow-hidden mb-6 bg-secondary/50 rounded-lg ${
                    project.logoCover ? "border border-border/50" : ""
                  }`}
                >
                  <img
                    src={
                      project.image.startsWith("http")
                        ? project.image
                        : `${import.meta.env.BASE_URL}${project.image}`
                    }
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                      project.logoCover ? "object-contain p-12" : "object-cover"
                    }`}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1 text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {tag} {tag !== project.tags[project.tags.length - 1] && "•"}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto border-t border-border/60 pt-4">
                    {project.demoLink && (
                      project.isInternal ? (
                        <Link to={project.demoLink} className="text-sm font-medium flex items-center gap-2 hover:text-muted-foreground transition-colors">
                          Ler Estudo de Caso
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-muted-foreground transition-colors">
                          Acessar <Globe className="w-4 h-4" />
                        </a>
                      )
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-muted-foreground transition-colors ml-auto">
                        Código <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
