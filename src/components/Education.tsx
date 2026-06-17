import { useRef, useState } from "react";
import { GraduationCap, Award, Eye } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import CertificateModal from "./CertificateModal";
import { Reveal } from "./motion/Reveal";
import CountUp from "./motion/CountUp";

const education = [
  {
    icon: GraduationCap,
    title: "Engenharia da Computação",
    institution: "UEMG",
    period: "2021 - 2026",
    description:
      "Bacharelado em Engenharia da Computação com foco em desenvolvimento de software e sistemas embarcados.",
    imageUrl: null as string | null,
  },
  {
    icon: Award,
    title: "Certificação Python",
    institution: "Udemy",
    period: "2022",
    description: "Certificação em Python avançado, abordando estruturas de dados e automação.",
    imageUrl: "certificados/cert-python.jpg",
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
    imageUrl: "certificados/cert-angular.jpg",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Anos de formação" },
  { value: 5, suffix: "", label: "Certificações" },
  { value: 6, suffix: "", label: "Marcos na trajetória" },
];

const Education = () => {
  const reduce = useReducedMotion();
  const [selectedCert, setSelectedCert] = useState<{ imageUrl: string; title: string } | null>(
    null
  );

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="educacao" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-30">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Minha <span className="gradient-text">Trajetória</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Formação acadêmica e certificações que fundamentam meu conhecimento técnico.
            </p>
          </div>
        </Reveal>

        {/* Strip de estatísticas com count-up */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto pl-10 md:pl-12">
          {/* Trilho base */}
          <div className="absolute left-[18px] md:left-5 top-2 bottom-2 w-px bg-border" />
          {/* Trilho que se desenha no scroll */}
          <motion.div
            className="absolute left-[18px] md:left-5 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary to-accent"
            style={reduce ? { scaleY: 1 } : { scaleY: lineScaleY }}
          />

          <div className="space-y-8">
            {education.map((item) => (
              <Reveal key={item.title} y={30}>
                <div className="relative">
                  {/* Ponto na linha */}
                  <span className="absolute -left-[31.5px] md:-left-[37.5px] top-5 flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />

                  <Card className="group relative p-6 bg-card/50 backdrop-blur-sm border-border transition-all duration-500 hover:border-primary/40 hover:shadow-glow overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                          <item.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-xs font-mono px-3 py-1 bg-secondary rounded-full text-muted-foreground border border-border">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-foreground/80 font-medium mb-3">{item.institution}</p>
                      <p className="text-sm text-muted-foreground mb-6">{item.description}</p>

                      {item.imageUrl && (
                        <Button
                          variant="outline"
                          className="w-full mt-auto border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300 group-hover:border-primary/50"
                          onClick={() =>
                            setSelectedCert({ imageUrl: item.imageUrl as string, title: item.title })
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Certificado
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
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
