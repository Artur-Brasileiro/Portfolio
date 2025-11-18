import { Code2, Cpu, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const Projects = () => {
  const projectCategories = [
    {
      icon: Code2,
      title: "Programação",
      color: "primary",
      link: "/programacao",
    },
    {
      icon: Cpu,
      title: "Hardware",
      color: "accent",
      link: "/hardware",
    },
  ];

  return (
    <section id="projetos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore meus projetos em desenvolvimento de software e hardware
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projectCategories.map((category, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border group cursor-pointer"
            >
              <category.icon className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
              <p className="text-muted-foreground mb-4">
                Veja todos os projetos de {category.title.toLowerCase()}
              </p>
              <Button className="w-full group-hover:shadow-glow">
                Ver Projetos <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
