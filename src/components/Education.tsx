import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import CertificateModal from "./CertificateModal";
import { Reveal } from "./motion/Reveal";

const education = [
  {
    title: "Engenharia da Computação",
    institution: "UEMG",
    period: "2021 — 2026",
    description:
      "Bacharelado em Engenharia da Computação com foco em desenvolvimento de software e sistemas embarcados.",
    imageUrl: null as string | null,
  },
  {
    title: "Certificação Python",
    institution: "Udemy",
    period: "2022",
    description: "Certificação em Python avançado, abordando estruturas de dados e automação.",
    imageUrl: "certificados/cert-python.jpg",
  },
  {
    title: "Certificação C#",
    institution: "Plataforma DIO",
    period: "2025",
    description: "Certificação de desenvolvimento em C# e ecossistema .NET.",
    imageUrl: "certificados/cert-csharp.jpg",
  },
  {
    title: "Certificação JavaScript",
    institution: "Plataforma DIO",
    period: "2025",
    description: "Certificação avançada em JavaScript e frameworks modernos.",
    imageUrl: "certificados/cert-js.jpg",
  },
  {
    title: "Certificação React",
    institution: "Udemy",
    period: "2025",
    description: "Treinamento do básico ao avançado em React, hooks e roteamento.",
    imageUrl: "certificados/cert-react.jpg",
  },
  {
    title: "Certificação Angular",
    institution: "Udemy",
    period: "2024",
    description: "Treinamento avançado em Angular e arquitetura de front-end.",
    imageUrl: "certificados/cert-angular.jpg",
  },
];

const Education = () => {
  const [selectedCert, setSelectedCert] = useState<{ imageUrl: string; title: string } | null>(
    null
  );

  return (
    <section id="educacao" className="py-32 bg-background border-b border-border/40">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <div className="mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Trajetória Profissional
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Formação acadêmica e certificações que fundamentam meu conhecimento técnico e prático.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {education.map((item, index) => (
            <Reveal key={index} delay={0.1 * index}>
              <div className="group relative grid md:grid-cols-[1fr_3fr] gap-8 md:gap-12 py-10 border-t border-border/60 transition-colors hover:bg-secondary/20 -mx-4 px-4 sm:mx-0 sm:px-0">
                {/* Ano / Período (Esquerda) */}
                <div className="text-muted-foreground font-mono text-sm pt-1">
                  {item.period}
                </div>

                {/* Conteúdo (Direita) */}
                <div className="flex flex-col">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 font-medium mb-4">{item.institution}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.imageUrl && (
                    <div className="mt-auto">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-muted-foreground hover:text-foreground font-medium flex items-center gap-2 group-hover:text-foreground transition-colors"
                        onClick={() =>
                          setSelectedCert({ imageUrl: item.imageUrl as string, title: item.title })
                        }
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar Certificado
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-border/60"></div>
        </div>
      </div>

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
