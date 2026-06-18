import { Code2, Cpu, Zap, MapPin, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";
import { Reveal, StaggerContainer, StaggerItem } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
import Marquee from "./motion/Marquee";

const techs = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
  { name: "EasyEDA", icon: "easyeda.png" },
];

const skills = [
  {
    icon: Code2,
    title: "Desenvolvimento Web",
    description: "JavaScript, React, TypeScript e frameworks modernos",
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

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Luz de fundo */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-30">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Cabeçalho */}
          <Reveal>
            <div className="space-y-4">
              <p className="font-mono text-sm text-primary uppercase tracking-wider">
                Conheça um pouco
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Sobre <span className="gradient-text">Mim</span>
              </h2>
            </div>
          </Reveal>

          {/* Tags de Localização e Formação */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground bg-card/50 px-5 py-2.5 rounded-full border border-border shadow-sm">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">UEMG</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground bg-card/50 px-5 py-2.5 rounded-full border border-border shadow-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Ituiutaba, MG</span>
              </div>
            </div>
          </Reveal>

          {/* Texto Principal */}
          <Reveal delay={0.15}>
            <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-4xl mx-auto">
              Estudante do 9º período de Engenharia da Computação, minha paixão é
              resolver problemas complexos usando tecnologia. Tenho experiência
              prática na concepção de soluções de software e no desenvolvimento de
              projetos de hardware. Estou em uma fase de exploração, buscando
              aprofundar meus conhecimentos e enfrentar novos desafios inovadores.
            </p>
          </Reveal>

          {/* Cards de Habilidades */}
          <StaggerContainer className="grid sm:grid-cols-3 gap-6 w-full mt-8">
            {skills.map((skill) => (
              <StaggerItem key={skill.title} className="h-full">
                <TiltCard className="rounded-lg">
                  <Card className="p-8 bg-card/40 backdrop-blur-sm border-border h-full flex flex-col items-center group transition-colors duration-300 hover:border-primary/50">
                    <div className="p-4 bg-primary/10 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <skill.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Marquee de Tecnologias */}
      <div className="mt-32 relative w-full z-30">
        <Reveal>
          <div className="text-center mb-10">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              Tecnologias que utilizo
            </h3>
          </div>
        </Reveal>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <Marquee speed={40} className="py-4">
            {techs.map((tech, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-28 md:w-32 flex flex-col items-center gap-4 cursor-default"
              >
                <div className="w-16 h-16 p-3.5 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    loading="lazy"
                    className="w-full h-full object-contain transition duration-300 hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default About;
