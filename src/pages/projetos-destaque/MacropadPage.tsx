import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, Calendar, CheckCircle2, CircleDashed, Github, Box, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModelViewer from "@/components/ModelViewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const MacropadPage = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  const [maximizedMedia, setMaximizedMedia] = useState<{ type: 'image' | 'model', url: string } | null>(null);

  const timeline = [
    {
      status: "completed",
      date: "Fase 1",
      title: "Desenho da PCB no EasyEDA",
      description: "Elaboração do esquemático e roteamento completo da placa no EasyEDA. O layout foi cuidadosamente planejado para acomodar as 15 teclas mecânicas e o display OLED de forma ergonômica.",
      image: "macropadpage/etapa1.png"
    },
    {
      status: "current",
      date: "Fase 2",
      title: "Visualização 3D e Fabricação",
      description: "Os arquivos Gerber foram gerados e o pedido do protótipo foi feito na JLCPCB. Atualmente, a placa está em processo de fabricação e estamos aguardando o envio e a chegada ao Brasil.",
      modelUrl: "macropadpage/macropad.glb" 
    },
    {
      status: "planned",
      date: "Fase 3",
      title: "Montagem da Placa",
      description: "Assim que as placas chegarem, será feita a montagem física do projeto. Isso inclui a soldagem dos diodos, switches mecânicos, o microcontrolador e a conexão do display OLED na PCB." 
    },
    {
      status: "planned",
      date: "Fase 4",
      title: "Desenvolvimento C++ e Python",
      description: "Criação do código em C++ para o firmware (varredura da matriz e controle do display) e desenvolvimento do software em Python para o computador, responsável por detectar a janela ativa e enviar os contextos corretos ao Macropad."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl"> 
        <Button asChild variant="ghost" className="mb-8 hover:bg-transparent pl-0">
          <Link to="/#projetos" className="text-muted-foreground hover:text-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para Projetos
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              Hardware & PCB
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 animate-pulse">
              Em Desenvolvimento
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Macropad 15-Teclas com OLED
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Um teclado auxiliar customizado do zero, unindo design de circuito impresso, eletrônica embarcada e desenvolvimento de software multiplataforma.
          </p>
          
          <div className="pt-4">
            <Button asChild variant="outline" className="border-white/10 hover:bg-secondary">
              <a href="https://github.com/Artur-Brasileiro" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> Acompanhar no GitHub
              </a>
            </Button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-border/50 my-12" />

        {/* A Ideia Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            A Ideia do Projeto
          </h2>
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 text-lg text-muted-foreground leading-relaxed space-y-4 shadow-sm">
            <p>
              A motivação por trás deste projeto é criar uma ferramenta que realmente se adapte ao fluxo de trabalho do usuário, em vez de ser apenas um teclado genérico com atalhos fixos.
            </p>
            <p>
              Ao integrar um display OLED e desenvolver uma aplicação desktop inteligente, o Macropad saberá exatamente o que você está fazendo. Se você abrir o seu editor de código, as 15 teclas e a tela assumem funções de compilação, debug e formatação. Se você alternar para o navegador, os atalhos mudam instantaneamente.
            </p>
            <p>
              O grande desafio e diferencial deste projeto é construir a ponte completa: desenhar a própria placa, fabricar o protótipo, realizar a soldagem dos componentes e garantir que os códigos (C++ e Python) conversem perfeitamente com o sistema operacional.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-3 text-foreground">
            <Calendar className="w-8 h-8 text-primary" />
            Roadmap & Timeline
          </h2>
          
          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center md:odd:flex-row-reverse group gap-6 md:gap-0">
                
                {/* Ícone Central */}
                <div className={`absolute top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shadow z-10 ${
                  item.status === 'completed' ? 'bg-green-500 text-background' : 
                  item.status === 'current' ? 'bg-yellow-500 text-background animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 
                  'bg-secondary text-muted-foreground'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <CircleDashed className="w-5 h-5" />}
                </div>

                {/* Coluna 1: O Cartão de Texto */}
                <div className="w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-1/2 md:pr-12 group-odd:md:pr-0 group-odd:md:pl-12">
                  <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                    item.status === 'current' ? 'bg-card border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 
                    'bg-card/50 border-border/50 hover:bg-card'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold ${
                        item.status === 'completed' ? 'text-green-500' : 
                        item.status === 'current' ? 'text-yellow-500' : 
                        'text-muted-foreground'
                      }`}>
                        {item.date}
                      </span>
                      <Badge variant="outline" className="text-xs uppercase tracking-wider opacity-70">
                        {item.status === 'completed' ? 'Concluído' : item.status === 'current' ? 'Em Progresso' : 'Planejado'}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    
                    {/* ADIÇÃO: Frase dinâmica que muda no celular e no PC */}
                    {item.modelUrl && (
                      <p className="mt-4 text-xs font-semibold text-primary flex items-center gap-2">
                        <Box className="w-4 h-4 animate-bounce shrink-0" /> 
                        <span>Clique no ícone de expandir para interagir com o modelo em 3D!</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Coluna 2: A Imagem ou Modelo 3D */}
                {(item.image || item.modelUrl) && (
                    <div className="w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-1/2 md:pl-12 group-odd:md:pl-0 group-odd:md:pr-12">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-secondary/30 flex items-center justify-center group/media">
                        
                        {/* Miniatura não tem zoom habilitado para não travar a rolagem da página */}
                        {item.modelUrl ? (
                            <ModelViewer url={item.modelUrl} enableZoom={false} />
                        ) : (
                            <img 
                            src={`${import.meta.env.BASE_URL}${item.image}`} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105"
                            />
                        )}

                        {/* Botão de Maximizar */}
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-4 right-4 opacity-0 group-hover/media:opacity-100 transition-opacity z-20 shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={() => setMaximizedMedia(
                            item.modelUrl 
                                ? { type: 'model', url: item.modelUrl } 
                                : { type: 'image', url: item.image as string }
                            )}
                        >
                            <Maximize2 className="w-4 h-4" />
                        </Button>
                        
                        </div>
                    </div>
                    )}

              </div>
            ))}
          </div>
        </section>

        <Dialog open={!!maximizedMedia} onOpenChange={(open) => !open && setMaximizedMedia(null)}>
          <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-2 bg-black/95 border-border flex flex-col items-center justify-center overflow-hidden">
             <DialogHeader className="sr-only">
                <DialogTitle>Mídia Expandida</DialogTitle>
                <DialogDescription>Visualização em tela cheia da etapa do projeto.</DialogDescription>
             </DialogHeader>
             
             {maximizedMedia?.type === 'image' && (
                <img 
                  src={`${import.meta.env.BASE_URL}${maximizedMedia.url}`} 
                  className="w-full h-full object-contain" 
                  alt="Mídia Expandida" 
                />
             )}

             {maximizedMedia?.type === 'model' && (
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                   <ModelViewer url={maximizedMedia.url} enableZoom={true} />
                </div>
             )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default MacropadPage;