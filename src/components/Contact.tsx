import { useState } from "react";
import { Mail, Github, Linkedin, Check, ArrowRight } from "lucide-react";
import { Reveal } from "./motion/Reveal";

const EMAIL = "arturbrasileiro00@gmail.com";
const GITHUB_URL = "https://github.com/Artur-Brasileiro";
const LINKEDIN_URL = "https://www.linkedin.com/in/artur-brasileiro/";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
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
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-20">
          
          {/* Informações (Esquerda) */}
          <div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                Vamos conversar.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou 
                oportunidades de fazer parte de suas visões.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Email</h3>
                  <button 
                    onClick={copyEmail}
                    className="group flex items-center gap-3 text-xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {EMAIL}
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Mail className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Redes</h3>
                  <div className="flex items-center gap-6">
                    <a 
                      href={LINKEDIN_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <a 
                      href={GITHUB_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Formulário (Direita) */}
          <div>
            <Reveal delay={0.2}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="João da Silva"
                    className="w-full bg-transparent border-b border-border/60 py-3 px-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">
                    Endereço de Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="joao@empresa.com"
                    className="w-full bg-transparent border-b border-border/60 py-3 px-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Conte-me sobre o seu projeto..."
                    className="w-full bg-transparent border-b border-border/60 py-3 px-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-muted-foreground transition-colors w-full sm:w-auto"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {status === "success" && (
                    <p className="text-sm font-medium text-green-600 mt-4 text-center sm:text-left">
                      Mensagem enviada com sucesso. Retornarei em breve!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm font-medium text-red-600 mt-4 text-center sm:text-left">
                      Houve um erro. Tente enviar diretamente para o email.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
