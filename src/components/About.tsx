import Section from "./layout/Section";
import SectionHeader from "./layout/SectionHeader";
import { Reveal } from "./motion/Reveal";
import Marquee from "./motion/Marquee";
import { profile } from "@/data/profile";

const About = () => (
  <Section id="sobre">
    <SectionHeader index="01" label="Sobre" title="Sobre Mim" />

    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      {/* Narrativa */}
      <Reveal className="space-y-6">
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </Reveal>

      {/* Ficha técnica — pares chave/valor, a linguagem de documento corporativo */}
      <Reveal delay={0.1}>
        <div className="rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Ficha técnica
          </h3>

          <dl className="mt-5 divide-y divide-border">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="py-3.5 first:pt-0 last:pb-0">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>

    {/* Stack em faixa rolante contínua */}
    <Reveal delay={0.15} className="mt-16 border-t border-border pt-12 md:mt-20">
      <h3 className="eyebrow">Stack tecnológica</h3>

      <div className="relative mt-8">
        {/* Máscaras de borda: os itens surgem e somem em vez de serem cortados. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

        <Marquee speed={45} className="py-2">
          {profile.technologies.map((tech) => (
            <div
              key={tech.name}
              className="mr-5 flex w-24 shrink-0 flex-col items-center gap-3 md:mr-6 md:w-28"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-surface p-3.5">
                <img
                  src={tech.icon}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </Reveal>
  </Section>
);

export default About;
