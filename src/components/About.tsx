import { MapPin, GraduationCap } from "lucide-react";
import { Reveal } from "./motion/Reveal";

const techs = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "C++",
  "Linux",
  "Git",
  "Arduino",
  "Raspberry Pi",
];

const About = () => {
  return (
    <section id="sobre" className="py-32 bg-secondary/20 border-b border-border/40">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          
          {/* Esquerda: Título */}
          <div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground sticky top-32">
                Sobre Mim
              </h2>
            </Reveal>
          </div>

          {/* Direita: Texto Principal */}
          <div className="space-y-10">
            <Reveal delay={0.1}>
              <div className="prose prose-lg text-muted-foreground leading-relaxed">
                <p>
                  Sou estudante do 9º período de Engenharia da Computação, movido pelo desafio de 
                  transformar problemas complexos em soluções elegantes. Minha trajetória é marcada 
                  pela intersecção entre o software de alto nível e as raízes da computação no hardware.
                </p>
                <p className="mt-6">
                  Tenho sólida experiência prática na concepção de sistemas embarcados e no desenvolvimento 
                  de aplicações web modernas. Acredito que um bom produto nasce da atenção meticulosa 
                  aos detalhes, desde a arquitetura da informação até o último pixel renderizado na tela.
                </p>
                <p className="mt-6">
                  Atualmente, busco aplicar boas práticas de engenharia de software para entregar 
                  produtos com alto padrão de qualidade corporativa, garantindo não apenas que o código 
                  funcione, mas que seja escalável, legível e seguro.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  <span>UEMG (Universidade do Estado de Minas Gerais)</span>
                </div>
                <div className="flex items-center gap-3 text-foreground font-medium">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>Ituiutaba, MG - Brasil</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-10">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  Stack Tecnológica Principal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-background border border-border text-sm font-medium text-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
