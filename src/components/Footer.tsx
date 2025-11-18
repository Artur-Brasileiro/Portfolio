import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-semibold">Obrigado por visitar meu portfólio!</span>
            <Code2 className="w-5 h-5 text-primary" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
