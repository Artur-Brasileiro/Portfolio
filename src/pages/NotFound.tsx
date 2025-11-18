import { useLocation, Link } from "react-router-dom"; // Adicionando Link
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Importando Button

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background"> {/* Corrigindo bg-muted para bg-background */}
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1> {/* Dando mais destaque */}
        <p className="mb-8 text-xl text-muted-foreground">Oops! Página não encontrada.</p>
        
        {/* CORREÇÃO AQUI: Usando Button e Link */}
        <Button asChild variant="default">
          <Link to="/">
            Voltar para a Página Inicial
          </Link>
        </Button>
        
      </div>
    </div>
  );
};

export default NotFound;