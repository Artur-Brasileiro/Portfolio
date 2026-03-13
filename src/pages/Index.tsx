import { useEffect } from "react";
// O import do useLocation e da Navbar foram removidos
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {

  useEffect(() => {
    const imagesToPreload = [
      "projeto_espectro.jpg",
      "projeto_deauther.jpg"
    ];

    imagesToPreload.forEach((imageName) => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}${imageName}`;
    });
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* O Hero fica no topo, geralmente não precisa de ID para o menu */}
      <Hero />
      
      {/* Aqui está o segredo: o id="sobre" conecta com o href="#sobre" da Navbar */}
      <section id="sobre" className="scroll-mt-24">
        <ScrollReveal>
          <About />
        </ScrollReveal>
      </section>

      <section id="projetos" className="scroll-mt-24">
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
      </section>

      <section id="educacao" className="scroll-mt-24">
        <ScrollReveal>
          <Education />
        </ScrollReveal>
      </section>

      <section id="contato" className="scroll-mt-24">
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Index;