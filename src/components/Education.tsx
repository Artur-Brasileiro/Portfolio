import { GraduationCap, Award, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

const Education = () => {
  const education = [
    {
      icon: GraduationCap,
      title: "Engenharia da Computação",
      institution: "UEMG",
      period: "2021 - 2026",
      description: "Bacharelado em Engenharia da Computação",
    },
    {
      icon: Award,
      title: "Certificação Python",
      institution: "Plataforma DIO",
      period: "2022",
      description: "Certificação em Python avançado",
    },
    {
      icon: Award,
      title: "Certificação C#",
      institution: "Plataforma DIO",
      period: "2023",
      description: "Certificação de desenvolvimento em C#",
    },
    {
      icon: Award,
      title: "Certificação JavaScript",
      institution: "Plataforma DIO",
      period: "2024",
      description: "Certificação avançada em JavaScript e frameworks modernos",
    },
    {
      icon: Award,
      title: "Certificação React",
      institution: "Alura",
      period: "2024",
      description: "Treinamento do básico ao avançado em React",
    },
    {
      icon: Award,
      title: "Certificação Angular",
      institution: "Plataforma DIO",
      period: "2024",
      description: "Treinamento avançado em Angular",
    },
  ];

  return (
    <section id="educacao" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Educação</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Minha formação acadêmica e certificações
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {education.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-primary font-semibold mb-1">{item.institution}</p>
                  <p className="text-sm text-muted-foreground mb-2">{item.period}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
