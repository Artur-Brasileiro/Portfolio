import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // 1. Tenta pegar o ID do alvo vindo do Navbar (via state)
    // 2. Se não tiver, tenta pegar via Hash (via URL, ex: /#projetos)
    const stateTarget = location.state && (location.state as { targetId?: string }).targetId;
    const hashTarget = location.hash ? location.hash.replace("#", "") : null;
    
    const targetId = stateTarget || hashTarget;

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Rola instantaneamente para não "piscar" o topo da página
        element.scrollIntoView({ behavior: "instant", block: "start" });
      }
    } else {
      // Se não tiver alvo nenhum, garante que comece no topo
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;