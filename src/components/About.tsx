import Section from "./layout/Section";
import SectionHeader from "./layout/SectionHeader";
import { Reveal } from "./motion/Reveal";
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

    {/* Stack agrupada por domínio */}
    <Reveal delay={0.15} className="mt-16 border-t border-border pt-12 md:mt-20">
      <h3 className="eyebrow">Stack tecnológica</h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.stack.map((group) => (
          <div
            key={group.domain}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <h4 className="text-sm font-semibold text-foreground">{group.domain}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  </Section>
);

export default About;
