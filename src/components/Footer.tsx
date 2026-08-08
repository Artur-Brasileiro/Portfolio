import { Github, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getLenis, scrollToTop } from "./motion/SmoothScroll";
import { profile, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/profile";

const scrollWithOffset = (el: HTMLElement) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate - 80, behavior: "smooth" });
  }
};

const sectionLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "Projetos", href: "#projetos" },
  { name: "Formação", href: "#educacao" },
  { name: "Contato", href: "#contato" },
];

const projectLinks = [
  { name: "Programação", to: "/programacao" },
  { name: "Hardware e embarcados", to: "/hardware" },
  { name: "Case: Macropad", to: "/projeto/macropad" },
];

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-primary";

const Footer = () => (
  <footer className="bg-background">
    <div className="rail py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="lg:pr-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold tracking-tight text-primary-foreground">
              {profile.initials}
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              {profile.name}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {profile.role} · software web e sistemas embarcados.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navegação */}
        <nav aria-label="Seções">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
            Navegação
          </h3>
          <ul className="mt-4 space-y-3">
            {sectionLinks.map((item) => (
              <li key={item.name}>
                <HashLink smooth to={`/${item.href}`} scroll={scrollWithOffset} className={linkClass}>
                  {item.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Projetos */}
        <nav aria-label="Projetos">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
            Projetos
          </h3>
          <ul className="mt-4 space-y-3">
            {projectLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.to} className={linkClass}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contato */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
            Contato
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                {EMAIL}
              </a>
            </li>
            <li className="text-sm text-muted-foreground">{profile.location}</li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · Feito com React, Tailwind &amp; café ☕
        </p>

        <button
          type="button"
          onClick={() => scrollToTop(false)}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Voltar ao topo
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
