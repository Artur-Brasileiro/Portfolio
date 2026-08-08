import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "./layout/Section";
import SectionHeader from "./layout/SectionHeader";
import { Reveal } from "./motion/Reveal";
import { featuredProjects, projectCategories } from "@/data/projects";

const Projects = () => (
  <Section id="projetos" tone="surface">
    <SectionHeader
      index="02"
      label="Projetos"
      title="Cases em Destaque"
      lead="Projetos selecionados que demonstram a intersecção entre design limpo, arquitetura de software robusta e inovação em engenharia."
    />

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((project, index) => (
        <Reveal key={project.id} delay={0.08 * index} className="h-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-soft-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-soft-md">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
              <img
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `${import.meta.env.BASE_URL}${project.image}`
                }
                alt={project.title}
                loading="lazy"
                className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                  project.logoCover ? "object-contain p-10" : "object-cover"
                }`}
              />
              <span className="absolute left-3 top-3 rounded-md border border-border bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>

              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                {project.demoLink &&
                  (project.isInternal ? (
                    <Link
                      to={project.demoLink}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      Ler estudo de caso
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  ) : (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      Acessar site
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Código de ${project.title} no GitHub`}
                    className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Código
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    {/* Acesso às duas categorias completas — antes só existia caminho para software. */}
    <Reveal delay={0.1} className="mt-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {projectCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.to}
              to={category.to}
              className="group flex items-center gap-4 rounded-lg border border-border bg-background p-5 shadow-soft-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-soft-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-primary">
                <Icon className="h-4 w-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  {category.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  <span className="tabular">{category.count}</span> projetos ·{" "}
                  {category.summary}
                </span>
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </Reveal>
  </Section>
);

export default Projects;
