import { useLayoutEffect, useState } from "react";
import { ArrowLeft, Code2, Cpu, ExternalLink, PlayCircle, Globe } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const projectData = {
  programacao: {
    title: "Projetos de Programação (Software)",
    icon: Code2,
    subsections: [
      {
        title: "Inteligência Artificial",
        projects: [
          { 
            id: 9, 
            name: "Introdução IA", 
            description: "Projeto onde registro meu aprendizado e evolução no estudo de Inteligência Artificial.",
            githubLink: "https://github.com/Artur-Brasileiro/Introducao-IA" 
          },
          { 
            id: 5, 
            name: "Perceptron Reconhecedor", 
            description: "Desenvolvimento e treinamento de uma IA simples (Perceptron) para classificar a letra \"A\".",
            githubLink: "https://github.com/Artur-Brasileiro/Perceptron-Reconhecedor" 
          },
          { 
            id: 10, 
            name: "Algoritmo KNN", 
            description: "Implementação do algoritmo KNN para classificar dados com base nos vizinhos mais próximos.",
            githubLink: "https://github.com/Artur-Brasileiro/Algoritmo-KNN" 
          },
        ]
      },
      {
        title: "Desenvolvimento Web",
        projects: [
          {
            id: 11,
            name: "EnglishUp",
            description: "Plataforma web para aprendizado de inglês com recursos interativos.",
            githubLink: "https://github.com/Artur-Brasileiro/English-Hub",
            siteLink: "https://playenglishup.com.br/"
          },
          {
            id: 12,
            name: "Portfólio - Professor de Inglês",
            description: "Site portfólio para professor de inglês, destacando serviços e depoimentos.",
            githubLink: "https://github.com/Artur-Brasileiro/Portfolio-Professor",
            siteLink: "https://rodrigoalmeida.vercel.app/"
          },
          { 
            id: 1, 
            name: "Chatbot com React", 
            description: "Desenvolvimento em React de um chatbot integrado com uma IA simples.",
            githubLink: "https://github.com/Artur-Brasileiro/Chatbot-React" 
          },
          { 
            id: 2, 
            name: "Gerenciamento Familiar", 
            description: "Criação de aplicação web feito com C# e Angular para fazer o controle financeiro de uma família.",
            githubLink: "https://github.com/Artur-Brasileiro/Gerenciamento-Familiar" 
          }
        ]
      },
      {
        title: "Ciência de Dados & Automação",
        projects: [
          { 
            id: 6, 
            name: "Análise de Dados PRF", 
            description: "Ciência de Dados aplicada em uma planilha do Excel da PRF para visualizarmos quais munícipios brasileiros tem o maior índice de acidentes em rodovias.",
            githubLink: "https://github.com/Artur-Brasileiro/Analise-PRF" 
          },
          { 
            id: 7, 
            name: "Web Scraping Simples", 
            description: "Web Scraping no site da CEMIG utilizando Python para comparar dados anuais.",
            githubLink: "https://github.com/Artur-Brasileiro/Web-Scraping" 
          },
          { 
            id: 8, 
            name: "Relação Idade x Pressão", 
            description: "Plotagem de um gráfico simples para visualizar a relação de Idade x Pressão Sistólica.",
            githubLink: "https://github.com/Artur-Brasileiro/Grafico-Dispersao" 
          },
        ]
      }
    ],
  },
  hardware: {
    title: "Projetos de Hardware e Embarcados",
    icon: Cpu,
    projects: [
      { 
        id: 3, 
        name: "Analisador de Espectro de Áudio", 
        description: "Visualização de espectro em tempo real.",
        image: "projeto_espectro.jpg",
        youtubeId: "9tUq1hGooeE", 
        longDescription: "Um analisador de áudio compacto que usa um ESP32-S3 para capturar sons, processar as frequências e exibir o espectro em uma pequena tela OLED. Mostra a forma “visual” do som em tempo real.",
        technicalLink: "https://github.com/Artur-Brasileiro/Analisador-Espectro",
        tags: ["ESP32-S3", "OLED", "C++", "Processamento de Áudio"] // <-- ADICIONADO
      },
      { 
        id: 4, 
        name: "Deauther Didático (2.4 e 5GHz)", 
        description: "Desautenticação de redes em ambiente controlado.",
        image: "projeto_deauther.jpg",
        youtubeId: "kmqZ7n9kF94",
        longDescription: "Dispositivo didático baseado no BW-16 com tela OLED de 0,96\", usado para estudar o funcionamento de redes Wi-Fi e entender, em ambiente controlado, como pacotes de desautenticação afetam a conexão. O projeto inclui case em impressão 3D e uma placa de circuito impresso feita manualmente, tornando o dispositivo compacto e ideal para aprendizado prático.",
        technicalLink: "https://github.com/Artur-Brasileiro/Deauther-5GHz",
        tags: ["BW-16", "Redes Wi-Fi", "PCB Customizada", "Impressão 3D"]
      },
    ],
  },
};

const ProjectsPage = () => {
  const { category } = useParams<{ category: keyof typeof projectData }>();
  const categoryData = category && projectData[category as keyof typeof projectData];
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const handleOpenVideo = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsDialogOpen(true);
  };

  if (!categoryData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Categoria Não Encontrada</h1>
          <p className="mb-4 text-xl text-muted-foreground">Opa! A categoria de projetos solicitada não existe.</p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            <Button variant="link">Voltar para a Página Inicial</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = categoryData.icon;
  const isHardware = category === 'hardware';

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        
        <Button asChild variant="ghost" className="p-0 h-auto mb-12 hover:bg-transparent">
          <Link to="/#projetos" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-max">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Projetos
          </Link>
        </Button>
        
        <div className="flex items-center gap-4 mb-10">
            <Icon className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold gradient-text">{categoryData.title}</h2>
        </div>

        {isHardware ? (
          // ================= SEÇÃO DE HARDWARE =================
          <div className="space-y-12">
            {(categoryData as typeof projectData['hardware']).projects.map((project) => (
              <Card 
                key={project.id} 
                className="group relative p-6 md:p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-lg transition-all duration-500 hover:shadow-orange-500/10 hover:border-orange-500/30 overflow-hidden"
              >
                {/* Efeito de brilho de fundo no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 grid md:grid-cols-3 gap-8 md:gap-10">
                  
                  {/* Coluna da Imagem / Vídeo */}
                  <div className="md:col-span-1 flex flex-col gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-orange-500/40 transition-colors duration-500">
                      <AspectRatio ratio={16 / 9} className="bg-secondary">
                          <img 
                              src={`${import.meta.env.BASE_URL}${project.image}`} 
                              alt={`Imagem do Projeto: ${project.name}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                      </AspectRatio>
                      {/* Overlay sutil na imagem */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <Button 
                      className="w-full bg-primary/90 hover:bg-primary shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all" 
                      onClick={() => handleOpenVideo((project as any).youtubeId || "")} // <-- Atualizado aqui
                    >
                        <PlayCircle className="w-5 h-5 mr-2" /> 
                        Ver Demonstração
                    </Button>
                  </div>

                  {/* Coluna das Informações */}
                  <div className="md:col-span-2 flex flex-col h-full justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                          {project.name}
                        </h3>
                        <p className="text-lg font-medium text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>

                      {/* Renderização das Tags */}
                      {project.tags && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-secondary/50 hover:bg-secondary border-white/5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="h-[1px] w-full bg-border/40 my-4" />

                      <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {project.longDescription}
                      </p>
                    </div>
                    
                    <div className="pt-6 mt-auto">
                        {(project as any).technicalLink && (
                            <Button asChild variant="outline" className="group/btn border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10">
                                <a 
                                    href={(project as any).technicalLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Detalhes Técnicos no GitHub
                                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                </a>
                            </Button>
                        )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // ================= SEÇÃO DE SOFTWARE (COM SUBSEÇÕES) =================
          <div className="space-y-16">
            {(categoryData as typeof projectData['programacao']).subsections.map((subsection, index) => (
              <div key={index} className="space-y-6">
                
                {/* Cabeçalho da Subseção */}
                <div className="flex items-center gap-4">
                   <h3 className="text-2xl font-bold text-foreground">{subsection.title}</h3>
                   <div className="h-[1px] flex-1 bg-border/60"></div>
                </div>

                {/* Grid de Projetos da Subseção */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subsection.projects.map((project) => (
                    <Card key={project.id} className="p-4 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-3">
                            {/* VERIFICAÇÃO: Se existir siteLink, mostra o botão de Acessar Site */}
                            {(project as any).siteLink && (
                              <Button asChild variant="default" className="w-full group shadow-sm">
                                <a 
                                  href={(project as any).siteLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center"
                                >
                                  <Globe className="w-4 h-4 mr-2" />
                                  Acessar Site
                                </a>
                              </Button>
                            )}

                            {/* Botão do GitHub (que já existia) */}
                            <Button asChild variant="outline" className="w-full group">
                              <a 
                                href={project.githubLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                              >
                                Detalhes no GitHub
                                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-4xl p-0 bg-black border-border overflow-hidden">
             <DialogHeader className="sr-only"> 
                <DialogTitle>Demonstração do Projeto</DialogTitle>
                <DialogDescription>Vídeo demonstrativo do hardware funcionando.</DialogDescription>
             </DialogHeader>
             
             {selectedVideo && (
               <div className="relative w-full aspect-video bg-black">
                 <iframe 
                   className="w-full h-full"
                   src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`} 
                   title="Demonstração do Projeto" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
             )}
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
};

export default ProjectsPage;