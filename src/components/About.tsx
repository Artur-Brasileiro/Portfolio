import { Code2, Cpu, Zap } from "lucide-react";
import { Card } from "./ui/card";

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Desenvolvimento Web",
      description: "JavaScript, React, Node.js e frameworks modernos",
    },
    {
      icon: Cpu,
      title: "Hardware",
      description: "Arduino, Raspberry Pi e sistemas embarcados",
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Soluções criativas para problemas complexos",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estudante do 9º período de Engenharia da Computação, minha paixão é resolver problemas complexos usando tecnologia. Tenho experiência prática na concepção de soluções de software e no desenvolvimento de projetos de hardware. Estou em uma fase de exploração, buscando aprofundar meus conhecimentos e enfrentar novos desafios inovadores.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border"
            >
              <skill.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
