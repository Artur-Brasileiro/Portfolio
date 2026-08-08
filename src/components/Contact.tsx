import { useState } from "react";
import { Mail, Github, Linkedin, Check, Copy, ArrowRight } from "lucide-react";
import Section from "./layout/Section";
import SectionHeader from "./layout/SectionHeader";
import { Reveal } from "./motion/Reveal";
import { profile, EMAIL, GITHUB_URL, LINKEDIN_URL, FORMSPREE_ENDPOINT } from "@/data/profile";

const fieldClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus-visible:outline-none";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Área de transferência indisponível — o endereço segue visível na tela.
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contato" tone="surface">
      <SectionHeader
        index="04"
        label="Contato"
        title="Vamos conversar."
        lead="Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Canais */}
        <Reveal>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Canais diretos
          </h3>

          <ul className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
            <li>
              <button
                type="button"
                onClick={copyEmail}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </span>
                  <span className="block truncate text-sm font-medium text-foreground">
                    {EMAIL}
                  </span>
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-success" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </span>
              </button>
            </li>

            {[
              { name: "LinkedIn", handle: "in/artur-brasileiro", href: LINKEDIN_URL, Icon: Linkedin },
              { name: "GitHub", handle: "Artur-Brasileiro", href: GITHUB_URL, Icon: Github },
            ].map(({ name, handle, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-surface"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {name}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {handle}
                    </span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>

          {/* Equilibra a altura da coluna ao lado do formulário, sem inventar conteúdo. */}
          <div className="mt-5 rounded-lg border border-border bg-background p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Disponibilidade
            </h3>
            <p className="mt-4 flex items-center gap-2.5 text-sm font-medium text-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden />
              {profile.availability}
            </p>
            <p className="mt-2 pl-4 text-sm text-muted-foreground">{profile.location}</p>
          </div>
        </Reveal>

        {/* Formulário */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-lg border border-border bg-background p-6 shadow-soft-sm md:p-8"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Envie uma mensagem
            </h3>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="João da Silva"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Endereço de email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="joao@empresa.com"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Conte-me sobre o seu projeto..."
                  className={`${fieldClass} h-auto resize-none py-2.5 leading-relaxed`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft-sm transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensagem"}
              {status !== "loading" && <ArrowRight className="h-4 w-4" />}
            </button>

            <p aria-live="polite" className="mt-4 min-h-5 text-sm font-medium">
              {status === "success" && (
                <span className="text-success">
                  Mensagem enviada com sucesso. Retornarei em breve.
                </span>
              )}
              {status === "error" && (
                <span className="text-destructive">
                  Houve um erro no envio. Tente novamente ou escreva direto para {EMAIL}.
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
