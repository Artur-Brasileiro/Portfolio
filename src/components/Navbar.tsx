import { useState, useEffect } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      setIsScrolled(scrollY > 20);

      // Scroll Spy - Verifica qual seção está na tela
      const sections = ["sobre", "projetos", "educacao", "contato"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }

      // Se estiver no topo, tira a marcação
      if (scrollY < 100) {
        current = "";
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lida com a mudança de rota voltando para a Home
  useEffect(() => {
    if (location.pathname === "/") {
      const state = location.state as { targetId?: string };
      if (state && state.targetId) {
        setTimeout(() => {
          const element = document.getElementById(state.targetId as string);
          if (element) {
            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
            const yOffset = -60;
            window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
          }
        }, 500);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const navItems = [
    { name: "Sobre", href: "#sobre", id: "sobre" },
    { name: "Projetos", href: "#projetos", id: "projetos" },
    { name: "Educação", href: "#educacao", id: "educacao" },
    { name: "Contato", href: "#contato", id: "contato" },
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

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  if (location.pathname === "/programacao" || location.pathname === "/hardware" || location.pathname.startsWith("/projeto/")) {
    return null;
  }

  return (
    <>
      {/* --- NAVBAR MOBILE / TABLET --- */}
      <nav
        className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 border-b translate-y-0 opacity-100 ${isScrolled
            ? "bg-background/90 backdrop-blur-lg border-border"
            : "bg-transparent border-transparent"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavHashLink smooth to="/#" scroll={scrollWithOffset} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl gradient-text">Artur</span>
          </NavHashLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* --- NAVBAR DESKTOP (Com animação de pílula e Scroll Spy) --- */}
      <div
        className={`hidden md:flex fixed w-full z-50 justify-center transition-all duration-700 ease-in-out pointer-events-none translate-y-0 opacity-100 top-0 pt-4`}
      >
        <nav
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-in-out overflow-hidden
            ${!isScrolled
              ? "w-full max-w-[100vw] px-12 py-4 bg-transparent border-transparent rounded-none"
              : "w-[90%] max-w-3xl px-8 py-3 bg-background/80 backdrop-blur-lg border border-border shadow-[0_5px_20px_-10px_rgba(0,0,0,0.5)] rounded-full"
            }
          `}
        >
          {/* Logo */}
          <NavHashLink
            smooth to="/#"
            scroll={scrollWithOffset}
            className="flex items-center gap-2 shrink-0 group"
          >
            <Code2 className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl gradient-text block">Artur</span>
          </NavHashLink>

          {/* Links com Scroll Spy */}
          <div className="flex items-center gap-8 shrink-0">
            {navItems.map((item) => (
              <NavHashLink
                key={item.name}
                smooth to={`/${item.href}`}
                scroll={scrollWithOffset}
                className={`relative text-[15px] font-medium transition-colors py-1
                  ${activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"}
                `}
              >
                {item.name}
                {/* Linha que aparece quando ativo */}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left 
                    ${activeSection === item.id ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </NavHashLink>
            ))}
          </div>
        </nav>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavHashLink
                key={item.name}
                smooth to={`/${item.href}`}
                scroll={scrollWithOffset}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 text-center font-medium rounded-xl transition-colors
                  ${activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                  }
                `}
              >
                {item.name}
              </NavHashLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;