import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getLenis } from "./motion/SmoothScroll";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Sobre", href: "#sobre", id: "sobre" },
  { name: "Projetos", href: "#projetos", id: "projetos" },
  { name: "Formação", href: "#educacao", id: "educacao" },
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

/** Monograma da marca — quadrado azul, o único bloco sólido de cor da barra. */
const Brand = ({ onClick }: { onClick?: () => void }) => (
  <HashLink
    smooth
    to="/#"
    scroll={scrollWithOffset}
    onClick={onClick}
    className="flex shrink-0 items-center gap-3"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold tracking-tight text-primary-foreground">
      {profile.initials}
    </span>
    <span className="text-[15px] font-semibold tracking-tight text-foreground">
      {profile.name}
    </span>
  </HashLink>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  // Sombra da barra ao sair do topo — listener leve com guard de rAF.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8);
        if (window.scrollY < 100) setActiveSection("");
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu mobile ao trocar de rota.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll-spy via IntersectionObserver, só na home (as seções só existem lá).
  // Re-tenta até as seções aparecerem no DOM (Index é lazy/Suspense).
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
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      els.forEach((el) => obs!.observe(el));
    };
    raf = requestAnimationFrame(setup);
    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-shadow duration-300",
        isScrolled && "shadow-soft-sm",
      )}
    >
      <div className="rail flex h-16 items-center justify-between">
        <Brand onClick={() => setIsMobileMenuOpen(false)} />

        {/* Navegação desktop — indicador ancorado na borda inferior da barra. */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <HashLink
                key={item.name}
                smooth
                to={`/${item.href}`}
                scroll={scrollWithOffset}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative flex h-16 items-center text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </HashLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <HashLink
            smooth
            to="/#contato"
            scroll={scrollWithOffset}
            className="hidden h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft-sm transition-colors hover:bg-primary-hover md:inline-flex"
          >
            Fale comigo
          </HashLink>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Painel mobile — ancorado na barra, largura total, sem flutuar. */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="rail flex flex-col py-2">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <HashLink
                  key={item.name}
                  smooth
                  to={`/${item.href}`}
                  scroll={scrollWithOffset}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "border-l-2 py-3 pl-4 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                </HashLink>
              );
            })}

            <HashLink
              smooth
              to="/#contato"
              scroll={scrollWithOffset}
              onClick={() => setIsMobileMenuOpen(false)}
              className="my-3 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Fale comigo
            </HashLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
