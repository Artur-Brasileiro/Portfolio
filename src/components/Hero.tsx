import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  // Função para interceptar o clique e rolar suavemente
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); // Impede que o HashRouter tente navegar para uma rota inexistente
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold">
            Olá, eu sou{" "}
            <span className="gradient-text">Artur Brasileiro</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground">
            Engenheiro da Computação
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor de software e hardware, criando soluções web modernas e sistemas embarcados
          </p>
          <div className="flex gap-4 justify-center pt-4">
            
            {/* Botão Ver Projetos corrigido */}
            <Button size="lg" className="shadow-glow" asChild>
              <a 
                href="#projetos" 
                onClick={(e) => handleScroll(e, "projetos")}
              >
                Ver Projetos
              </a>
            </Button>

            {/* Botão Entrar em Contato corrigido */}
            <Button size="lg" variant="secondary" asChild>
              <a 
                href="#contato" 
                onClick={(e) => handleScroll(e, "contato")}
              >
                Entrar em Contato
              </a>
            </Button>
            
          </div>
        </div>
      </div>

      {/* Seta para baixo corrigida */}
      <a
        href="#sobre"
        onClick={(e) => handleScroll(e, "sobre")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;