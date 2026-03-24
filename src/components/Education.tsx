import { useState } from "react";
import { GraduationCap, Award, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
// Importe o modal que acabamos de ajustar (ajuste o caminho se ele estiver em outra pasta)
import CertificateModal from "./CertificateModal"; 

const Education = () => {
  // Agora o estado guarda um objeto com a imagem e o título, ou null se estiver fechado
  const [selectedCert, setSelectedCert] = useState<{ imageUrl: string; title: string } | null>(null);

  const education = [
    {
      icon: GraduationCap,
      title: "Engenharia da Computação",
      institution: "UEMG",
      period: "2021 - 2026",
      description: "Bacharelado em Engenharia da Computação com foco em desenvolvimento de software e sistemas embarcados.",
      imageUrl: null, 
    },
    {
      icon: Award,
      title: "Certificação Python",
      institution: "Udemy",
      period: "2022",
      description: "Certificação em Python avançado, abordando estruturas de dados e automação.",
      imageUrl: "/placeholder-certificado.jpg",
    },
    {
      icon: Award,
      title: "Certificação C#",
      institution: "Plataforma DIO",
      period: "2025",
      description: "Certificação de desenvolvimento em C# e ecossistema .NET.",
      imageUrl: "certificados/cert-csharp.jpg",
    },
    {
      icon: Award,
      title: "Certificação JavaScript",
      institution: "Plataforma DIO",
      period: "2025",
      description: "Certificação avançada em JavaScript e frameworks modernos.",
      imageUrl: "certificados/cert-js.jpg",
    },
    {
      icon: Award,
      title: "Certificação React",
      institution: "Udemy",
      period: "2025",
      description: "Treinamento do básico ao avançado em React, hooks e roteamento.",
      imageUrl: "certificados/cert-react.jpg",
    },
    {
      icon: Award,
      title: "Certificação Angular",
      institution: "Udemy",
      period: "2024",
      description: "Treinamento avançado em Angular e arquitetura de front-end.",
      imageUrl: "/placeholder-certificado.jpg",
    },
  ];

  return (
    <section id="educacao" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Efeitos de luz no fundo para dar um toque futurista */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Minha <span className="gradient-text">Trajetória</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Formação acadêmica e certificações que fundamentam meu conhecimento técnico.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {education.map((item, index) => (
            <Card
              key={index}
              className="group relative p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)] flex flex-col h-full overflow-hidden"
            >
              {/* Gradiente sutil no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 bg-secondary rounded-full text-muted-foreground border border-border">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground/80 font-medium mb-3">
                  {item.institution}
                </p>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Botão de Ver Certificado */}
                {item.imageUrl && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-auto border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300 group-hover:border-primary/50"
                    // Passamos tanto a URL quanto o Título para o estado!
                    onClick={() => setSelectedCert({ imageUrl: item.imageUrl, title: item.title })}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Renderiza o novo componente Modal */}
      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)}
        image={selectedCert?.imageUrl || ""}
        title={selectedCert?.title || ""}
      />
    </section>
  );
};

export default Education;