import { Code2, Github, Linkedin, ArrowUp } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { getLenis, scrollToTop } from "./motion/SmoothScroll";

const GITHUB_URL = "https://github.com/Artur-Brasileiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/artur-brasileiro/";

const footerNav = [
  { name: "Sobre", href: "#sobre" },
  { name: "Projetos", href: "#projetos" },
  { name: "Educação", href: "#educacao" },
  { name: "Contato", href: "#contato" },
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

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Marca + tagline */}
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold gradient-text">Artur Brasileiro</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Engenheiro da Computação · software web e sistemas embarcados.
            </p>
          </div>

          {/* Navegação rápida */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <HashLink
                key={item.name}
                smooth
                to={`/${item.href}`}
                scroll={scrollWithOffset}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </HashLink>
            ))}
          </nav>

          {/* Sociais + voltar ao topo */}
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              aria-label="Voltar ao topo"
              title="Voltar ao topo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Artur Brasileiro · Feito com React, Tailwind & café ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
