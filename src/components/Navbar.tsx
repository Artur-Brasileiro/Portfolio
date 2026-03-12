import { useState, useEffect } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (href === "#") {
      if (location.pathname !== "/") {
         navigate("/");
      } else {
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 sm:pt-4 px-4 pointer-events-none">
        
        <motion.nav
          layout
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          // Adicionámos 'border-transparent' no estado topo para evitar pequenos saltos de 1px
          className={`pointer-events-auto flex items-center justify-between transition-colors duration-500 ${
            isScrolled
              ? "w-full md:w-auto bg-background/80 backdrop-blur-lg shadow-lg border border-border rounded-full px-6 py-3 md:gap-12"
              : "w-full max-w-7xl bg-transparent px-2 sm:px-4 py-4 rounded-none border border-transparent shadow-none md:gap-8"
          }`}
        >
          {/* Adicionámos motion.a e layout aqui */}
          <motion.a 
            layout
            href="#" 
            className="flex items-center gap-2 group mr-auto md:mr-0 shrink-0"
            onClick={(e) => handleNavClick(e, "#")}
          >
            <motion.div layout>
              <Code2 className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            </motion.div>
            <motion.span 
              layout
              // Removido o 'md:hidden' - manter sempre visível evita o teletransporte
              className="font-bold text-xl gradient-text block"
            >
              Artur
            </motion.span>
          </motion.a>

          {/* Desktop Menu - Adicionámos motion.div e layout a este agrupamento */}
          <motion.div layout className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                layout
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-muted-foreground hover:text-primary transition-colors relative group cursor-pointer font-medium text-sm whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button - Envolvido num motion.div com layout */}
          <motion.div layout className="md:hidden ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden bg-background/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl overflow-hidden p-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-4 px-6 text-center font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-xl transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;