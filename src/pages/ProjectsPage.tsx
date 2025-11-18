import { useLayoutEffect, useState } from "react"; // 1. Adicione useState
import { ArrowLeft, Code2, Cpu, ExternalLink, PlayCircle } from "lucide-react"; // Troquei Youtube por PlayCircle
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// 2. Importe os componentes do Dialog (Modal)
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
    projects: [
      { id: 1, name: "Sistema de Gerenciamento Web", description: "Aplicação full-stack com React e Node.js." },
      { id: 2, name: "Algoritmos de Cibersegurança", description: "Implementação de criptografia e hashing." },
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
        image: "/projeto_espectro.jpg",
        // 3. Alterei para caminho local (Coloque seu arquivo em public/videos/)
        videoSrc: "/videos/arduino.mp4", 
        longDescription: "Um analisador de áudio compacto que usa um ESP32-S3 para capturar sons, processar as frequências e exibir o espectro em uma pequena tela OLED. Mostra a forma “visual” do som em tempo real."
      },
      { 
        id: 4, 
        name: "Deauther Didático (BW-16)", 
        description: "Desautenticação de redes em ambiente controlado.",
        image: "/projeto_deauther.jpg",
        // 3. Alterei para caminho local
        videoSrc: "/videos/raspberry.mp4", 
        longDescription: "Dispositivo didático baseado no BW-16 com tela OLED de 0,96, usado para estudar o funcionamento de redes Wi-Fi e entender, em ambiente controlado, como pacotes de desautenticação afetam a conexão. O projeto inclui case em impressão 3D e uma placa de circuito impresso feita manualmente, tornando o dispositivo compacto e ideal para aprendizado prático."
      },
    ],
  },
};

const ProjectsPage = () => {
  const { category } = useParams<{ category: keyof typeof projectData }>();
  const categoryData = category && projectData[category as keyof typeof projectData];
  
  // 4. Estado para controlar o vídeo selecionado e se o modal está aberto
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const handleOpenVideo = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
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
          <div className="space-y-12">
            {(categoryData.projects as typeof projectData['hardware']['projects']).map((project) => (
              <Card key={project.id} className="p-6 md:p-8 bg-card border-border shadow-lg">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  
                  <div className="md:col-span-1">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border/50 bg-secondary">
                        <img 
                            src={project.image} 
                            alt={`Imagem do Projeto: ${project.name}`} 
                            className="w-full h-full object-cover"
                        />
                    </AspectRatio>
                    
                    {/* O botão continua funcionando normalmente */}
                    <Button 
                      className="mt-4 w-full shadow-glow" 
                      onClick={() => handleOpenVideo(project.videoSrc || "")}
                    >
                        <PlayCircle className="w-4 h-4 mr-2" /> 
                        Ver Demonstração
                    </Button>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-3xl font-bold text-foreground">{project.name}</h3>
                    <p className="text-lg font-medium text-primary">{project.description}</p>
                    
                    <p className="text-muted-foreground whitespace-pre-wrap">
                        {project.longDescription}
                    </p>
                    
                    <div className="pt-4">
                        <Button variant="default">
                            Detalhes Técnicos
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.projects.map((project) => (
              <Card key={project.id} className="p-4 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Detalhes do Projeto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 6. Componente do Modal de Vídeo */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-4xl p-0 bg-black border-border overflow-hidden">
             {/* Header oculto para acessibilidade ou visível se preferir */}
             <DialogHeader className="sr-only"> 
                <DialogTitle>Demonstração do Projeto</DialogTitle>
                <DialogDescription>Vídeo demonstrativo do hardware funcionando.</DialogDescription>
             </DialogHeader>
             
             {selectedVideo && (
               <div className="relative w-full aspect-video bg-black">
                 <video 
                   src={selectedVideo} 
                   controls 
                   autoPlay 
                   className="w-full h-full"
                 >
                   Seu navegador não suporta a tag de vídeo.
                 </video>
               </div>
             )}
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
};

export default ProjectsPage;