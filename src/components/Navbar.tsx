import { useState, useEffect } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom"; // <--- Importações adicionadas

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hooks para controlar a navegação
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Sobre", href: "#sobre" },
    { name: "Projetos", href: "#projetos" },
    { name: "Educação", href: "#educacao" },
    { name: "Contato", href: "#contato" },
  ];

  // Função inteligente para lidar com os cliques
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Evita que o navegador tente navegar sozinho pelo href
    const targetId = href.replace("#", "");

    // Se for o link do logo ("#"), queremos ir para o topo
    if (href === "#") {
      if (location.pathname !== "/") {
         navigate("/");
      } else {
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (location.pathname !== "/") {
      // Se NÃO estiver na Home (está em /programacao, por exemplo), vai para a Home e leva o ID do alvo
      navigate("/", { state: { targetId } });
    } else {
      // Se JÁ estiver na Home, apenas rola suavemente até a seção
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false); // Fecha o menu mobile se estiver aberto
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a 
            href="#" 
            className="flex items-center gap-2 group"
            onClick={(e) => handleNavClick(e, "#")} // Adicionado click no Logo
          >
            <Code2 className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl gradient-text">Artur</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)} // Adicionado click nos itens
                className="text-muted-foreground hover:text-primary transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 bg-background/95 backdrop-blur-md rounded-b-lg border-b border-border">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)} // Adicionado click no mobile
                className="block py-3 px-4 text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;