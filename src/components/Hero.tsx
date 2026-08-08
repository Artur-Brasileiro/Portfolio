import { Github, Linkedin, ArrowRight } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { getLenis } from "./motion/SmoothScroll";
import CountUp from "./motion/CountUp";
import ProfileAvatar from "./ProfileAvatar";
import { profile, GITHUB_URL, LINKEDIN_URL } from "@/data/profile";
import { projectCount } from "@/data/projects";
import { certificationCount } from "@/data/education";
import { EASE_OUT_EXPO } from "@/lib/motion";

const scrollWithOffset = (el: HTMLElement) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate - 80, behavior: "smooth" });
  }
};

/** Números derivados dos dados — nada digitado à mão que possa ficar defasado. */
const metrics: { value?: number; suffix?: string; text?: string; label: string }[] = [
  { value: profile.currentSemester, suffix: "º", label: "Período do curso" },
  { value: projectCount, label: "Projetos catalogados" },
  { value: certificationCount, label: "Certificações" },
  { text: profile.graduationYear, label: "Conclusão prevista" },
];

const Hero = () => (
  <>
    <section className="border-b border-border bg-background pt-16">
      <div className="rail py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {/* Faixa de identidade — ocupa a largura toda, disponibilidade à direita. */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ProfileAvatar src={`${import.meta.env.BASE_URL}avatar1.jpg`} />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  {profile.name}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {profile.role}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-1 pl-2.5 pr-3.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              {profile.availability}
            </span>
          </div>

          {/*
           * Título à esquerda, texto de apoio e ações à direita. Sem a foto na
           * lateral, uma coluna única deixava metade da largura vazia.
           */}
          <div className="mt-12 grid gap-10 border-t border-border pt-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h1 className="font-display text-display-xl font-bold">
              {profile.headline.lead}
              <br />
              <span className="text-muted-foreground">{profile.headline.accent}</span>
            </h1>

            <div className="lg:pb-2">
              <p className="text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HashLink
                  smooth
                  to="/#projetos"
                  scroll={scrollWithOffset}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft-sm transition-colors hover:bg-primary-hover"
                >
                  Ver projetos
                  <ArrowRight className="h-4 w-4" />
                </HashLink>

                <HashLink
                  smooth
                  to="/#contato"
                  scroll={scrollWithOffset}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-soft-sm transition-colors hover:bg-surface"
                >
                  Entrar em contato
                </HashLink>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-6 border-t border-border pt-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Faixa de métricas */}
    <section className="border-b border-border bg-surface">
      <dl className="rail grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center sm:text-left">
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="font-display tabular block text-3xl font-semibold text-foreground md:text-4xl">
                {metric.text ?? (
                  <CountUp value={metric.value as number} suffix={metric.suffix} />
                )}
              </span>
              <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                {metric.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  </>
);

export default Hero;
