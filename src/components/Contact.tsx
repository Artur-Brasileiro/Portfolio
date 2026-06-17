import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Reveal, StaggerContainer, StaggerItem } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
import MagneticButton from "./motion/MagneticButton";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "arturbrasileiro00@gmail.com",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=arturbrasileiro00@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Artur-Brasileiro",
    link: "https://github.com/Artur-Brasileiro",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/artur-brasileiro",
    link: "https://www.linkedin.com/in/artur-brasileiro/",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Ituiutaba (MG), Brasil",
    link: undefined as string | undefined,
  },
];

const EMAIL = "arturbrasileiro00@gmail.com";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard indisponível — ignora silenciosamente */
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xyzokkee", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setShowModal(true);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4 relative z-30">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              Entre em <span className="gradient-text">Contato</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tem algum projeto em mente? Vamos conversar!
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Coluna de informações */}
          <div className="space-y-6">
            <Reveal>
              <h3 className="font-display text-2xl font-bold mb-6">Informações de Contato</h3>
            </Reveal>

            <StaggerContainer className="space-y-6">
              {contactInfo.map((info) => (
                <StaggerItem key={info.label}>
                  <TiltCard className="rounded-lg">
                    <Card className="p-4 transition-all duration-300 bg-card border-border hover:border-primary/40 hover:shadow-glow">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-primary transition-colors break-all"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{info.value}</p>
                          )}
                        </div>
                        {info.label === "Email" && (
                          <button
                            type="button"
                            onClick={copyEmail}
                            aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
                            title={copied ? "Copiado!" : "Copiar e-mail"}
                            className="ml-auto shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-primary" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </Card>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Coluna do formulário */}
          <Reveal delay={0.15}>
            <div className="animated-border-card p-[2px] h-full">
              <Card className="p-8 bg-card border-border relative z-10 w-full h-full">
                <h3 className="font-display text-2xl font-bold mb-6">Envie uma Mensagem</h3>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome"
                      className="bg-secondary border-border focus-visible:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      className="bg-secondary border-border focus-visible:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Sua mensagem..."
                      rows={5}
                      className="bg-secondary border-border resize-none overflow-hidden focus-visible:ring-primary"
                      required
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                    />
                  </div>

                  <MagneticButton className="block w-full" strength={0.15}>
                    <Button
                      type="submit"
                      className="w-full shadow-glow"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </MagneticButton>

                  {status === "error" && (
                    <p className="text-red-500 text-center mt-2">
                      Ocorreu um erro. Tente novamente mais tarde.
                    </p>
                  )}
                </form>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Modal de sucesso */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 bg-card p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-border"
          >
            <h4 className="font-display text-lg font-semibold mb-2">Mensagem enviada</h4>
            <p className="text-muted-foreground mb-4">Obrigado! Vou responder em breve.</p>
            <div className="flex justify-end">
              <Button onClick={() => setShowModal(false)}>OK</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
