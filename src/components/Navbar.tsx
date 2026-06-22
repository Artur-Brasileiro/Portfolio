import { useState, useEffect } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getLenis } from "./motion/SmoothScroll";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Sobre", href: "#sobre", id: "sobre" },
  { name: "Projetos", href: "#projetos", id: "projetos" },
  { name: "Educação", href: "#educacao", id: "educacao" },
  { name: "Contato", href: "#contato", id: "contato" },
];

const scrollWithOffset = (el: HTMLElement) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate - 80, behavior: "smooth" });
  }
};

type NavLinksProps = {
  variant: "desktop" | "mobile";
  activeSection: string;
  onNavigate?: () => void;
};

/** Fonte única dos links — reusada por desktop e mobile (sem duplicação). */
const NavLinks = ({ variant, activeSection, onNavigate }: NavLinksProps) => (
  <>
    {navItems.map((item) => {
      const active = activeSection === item.id;
      if (variant === "mobile") {
        return (
          <HashLink
            key={item.name}
            smooth
            to={`/${item.href}`}
            scroll={scrollWithOffset}
            onClick={onNavigate}
            className={`block py-3 px-4 text-center font-medium rounded-xl transition-colors ${
              active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
            }`}
          >
            {item.name}
          </HashLink>
        );
      }
      return (
        <HashLink
          key={item.name}
          smooth
          to={`/${item.href}`}
          scroll={scrollWithOffset}
          onClick={onNavigate}
          className={`relative text-[15px] font-medium transition-colors py-1 ${
            active ? "text-primary" : "text-muted-foreground hover:text-primary"
          }`}
        >
          {item.name}
          <span
            className={`absolute left-0 bottom-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left ${
              active ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </HashLink>
      );
    })}
  </>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  // isScrolled (morph da pílula) — listener leve com guard de rAF.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        if (window.scrollY < 100) setActiveSection("");
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver (sem getBoundingClientRect por evento).
  // Re-tenta até as seções existirem no DOM (Index é lazy/Suspense).
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    let obs: IntersectionObserver | null = null;
    let raf = 0;
    const setup = () => {
      const els = navItems
        .map((i) => document.getElementById(i.id))
        .filter((el): el is HTMLElement => el !== null);
      if (els.length === 0) {
        raf = requestAnimationFrame(setup);
        return;
      }
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveSection((e.target as HTMLElement).id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      els.forEach((el) => obs!.observe(el));
    };
    raf = requestAnimationFrame(setup);
    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [location.pathname]);

  if (
    location.pathname === "/programacao" ||
    location.pathname === "/hardware" ||
    location.pathname.startsWith("/projeto/")
  ) {
    return null;
  }

  return (
    <>
      {/* --- NAVBAR MOBILE / TABLET --- */}
      <nav
        className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <HashLink
            smooth
            to="/#"
            scroll={scrollWithOffset}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Code2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl gradient-text">Artur</span>
          </HashLink>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- NAVBAR DESKTOP (pílula + scroll spy) --- */}
      <div className="hidden md:flex fixed w-full z-50 justify-center transition-all duration-700 ease-in-out pointer-events-none top-0 pt-4">
        <nav
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-in-out overflow-hidden ${
            !isScrolled
              ? "w-full max-w-full px-12 py-4 bg-transparent border-transparent rounded-none"
              : "w-[90%] max-w-3xl px-8 py-3 bg-background/80 backdrop-blur-lg border border-border shadow-soft-lg rounded-full"
          }`}
        >
          {/* Logo */}
          <HashLink
            smooth
            to="/#"
            scroll={scrollWithOffset}
            className="flex items-center gap-2 shrink-0 group"
          >
            <Code2 className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl gradient-text block">Artur</span>
          </HashLink>

          {/* Links + toggle */}
          <div className="flex items-center gap-6 shrink-0">
            <NavLinks variant="desktop" activeSection={activeSection} />
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-soft-lg">
          <div className="flex flex-col gap-2">
            <NavLinks
              variant="mobile"
              activeSection={activeSection}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
