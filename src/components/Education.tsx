import { useState } from "react";
import { Eye } from "lucide-react";
import Section from "./layout/Section";
import SectionHeader from "./layout/SectionHeader";
import CertificateModal from "./CertificateModal";
import { Reveal } from "./motion/Reveal";
import { education } from "@/data/education";

const Education = () => {
  const [selectedCert, setSelectedCert] = useState<{ imageUrl: string; title: string } | null>(
    null,
  );

  return (
    <Section id="educacao">
      <SectionHeader
        index="03"
        label="Formação"
        title="Trajetória Profissional"
        lead="Formação acadêmica e certificações que fundamentam meu conhecimento técnico e prático."
      />

      {/* Tabela-timeline: período em mono à esquerda, conteúdo à direita. */}
      <div className="border-b border-border">
        {education.map((item, index) => (
          <Reveal key={`${item.title}-${item.period}`} delay={0.05 * index}>
            <div className="grid gap-3 border-t border-border px-4 py-8 transition-colors hover:bg-surface md:grid-cols-[9rem_1fr] md:gap-10 md:px-6">
              <div className="tabular font-mono text-sm text-muted-foreground md:pt-1">
                {item.period}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{item.institution}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.imageUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCert({ imageUrl: item.imageUrl as string, title: item.title })
                    }
                    className="mt-5 inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                    Visualizar certificado
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <CertificateModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        image={selectedCert?.imageUrl || ""}
        title={selectedCert?.title || ""}
      />
    </Section>
  );
};

export default Education;
