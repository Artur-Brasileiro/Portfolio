import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold">
              Obrigado por visitar meu portfólio!
            </span>
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Artur Brasileiro · Feito com React, Tailwind & café ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
