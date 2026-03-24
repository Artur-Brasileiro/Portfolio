import { useState, useEffect, useCallback } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isPastHero, setIsPastHero] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      setIsScrolled(scrollY > 20);
      setIsPastHero(scrollY > (window.innerHeight - 100));

      // Scroll Spy
      const sections = ["sobre", "projetos", "educacao", "contato"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on section height
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }
      
      // If we are at the very top, unset active
      if (scrollY < 100) {
        current = "";
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  // Handle path changes returning to home
  useEffect(() => {
    if (location.pathname === "/") {
      const state = location.state as { targetId?: string };
      if (state && state.targetId) {
        setTimeout(() => {
          const element = document.getElementById(state.targetId as string);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        // Clear state
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const navItems = [
    { name: "Sobre", href: "#sobre", id: "sobre" },
    { name: "Projetos", href: "#projetos", id: "projetos" },
    { name: "Certificações", href: "#educacao", id: "educacao" },
    { name: "Contato", href: "#contato", id: "contato" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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

  // Determine visibility states
  // Mobile / Tablet: Top bar is normal, scrolled bar is HIDDEN entirely.
  // Desktop: Top bar = extremeties, Scrolled UP = pill, Scrolled DOWN = hidden pill.

  const isDesktopScrolledAndVisible = isScrolled && scrollDirection === "up";
  const isDesktopScrolledAndHidden = isScrolled && scrollDirection === "down";

  return (
    <>
      {/* 
        This wrapper holds the entire navbar logic. 
        We'll use separate elements for Desktop Top, Desktop Scrolled, and Mobile Top 
        to cleanly manage the complex layout shifts.
      */}

      {/* --- MOBILE / TABLET NAVBAR --- */}
      <nav 
        className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrollDirection === "down" && isPastHero 
            ? "-translate-y-full opacity-0" 
            : "translate-y-0 opacity-100"
        } ${
          isScrolled 
            ? "bg-black border-white/10" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => handleNavClick(e, "#")}>
            <Code2 className="w-8 h-8 text-primary" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* --- DESKTOP NAVBAR (Animated Single Container) --- */}
      <div 
        className={`hidden md:flex fixed w-full z-50 justify-center transition-all duration-700 ease-in-out pointer-events-none ${
          scrollDirection === "down" && isPastHero 
            ? "-translate-y-full opacity-0 top-0" 
            : "translate-y-0 opacity-100 top-0 pt-4"
        }`}
      >
        <nav 
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-in-out overflow-hidden
            ${!isScrolled 
              ? "w-full max-w-[100vw] px-12 py-4 bg-transparent border-transparent rounded-none" 
              : "w-[90%] max-w-3xl px-8 py-2 bg-black border border-white/10 shadow-[0_5px_20px_-10px_rgba(0,0,0,0.5)] rounded-[20px]"
            }
          `}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center shrink-0"
          >
            <Code2 className="w-7 h-7 text-primary" />
          </a>

          {/* Links */}
          <div className="flex items-center gap-8 shrink-0">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-[15px] text-white font-medium hover:text-primary transition-colors py-1"
              >
                {item.name}
                <span 
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left 
                    ${activeSection === item.id ? "scale-x-100" : "scale-x-0"}
                  `} 
                />
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 z-50 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 px-4 text-center font-medium text-white hover:text-primary hover:bg-white/5 rounded-xl transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
