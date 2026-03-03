import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Zap, MapPin, GraduationCap } from "lucide-react";
import { Card } from "./ui/card";

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

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="sobre" className="py-24 bg-secondary/30 relative overflow-hidden" ref={ref}>
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            /* Vai mover exatamente metade do container (2 listas inteiras) */
            100% { transform: translateX(-50%); } 
          }
          .animate-infinite-scroll {
            /* Aumentei para 40s para compensar o tamanho maior da lista */
            animation: infinite-scroll 40s linear infinite;
            width: max-content;
          }
        `}
      </style>

      {/* Luzes de fundo */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center space-y-10"
        >
          {/* Cabeçalho */}
          <div className="space-y-4">
            <p className="font-mono text-sm text-primary uppercase tracking-wider">Conheça um pouco</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Sobre <span className="gradient-text">Mim</span>
            </h2>
          </div>

          {/* Tags de Localização e Formação */}
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

          {/* Texto Principal Expandido */}
          <p className="text-muted-foreground leading-relaxed text-xl max-w-4xl mx-auto">
            Estudante do 9º período de Engenharia da Computação, minha paixão é resolver problemas complexos usando tecnologia. 
            Tenho experiência prática na concepção de soluções de software e no desenvolvimento de projetos de hardware. 
            Estou em uma fase de exploração, buscando aprofundar meus conhecimentos e enfrentar novos desafios inovadores.
          </p>

          {/* Cards de Habilidades */}
          <div className="grid sm:grid-cols-3 gap-6 w-full mt-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="p-8 bg-card/40 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow flex flex-col items-center group"
              >
                <div className="p-4 bg-primary/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CARROSSEL INFINITO */}
      <div className="mt-32 relative w-full">
        <div className="text-center mb-10">
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Tecnologias que utilizo</h3>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-infinite-scroll py-4">
            {/* AGORA SIM: 4 cópias perfeitas para o loop encaixar sem pular */}
            {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-32 flex flex-col items-center gap-4 cursor-default"
              >
                <div className="w-16 h-16 p-3.5 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;