import { useLayoutEffect } from "react"; // <-- Troque useEffect por useLayoutEffect
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

  // useLayoutEffect roda ANTES do navegador "pintar" a tela
  useLayoutEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Rola instantaneamente para o elemento, evitando o "pulo" visual
        element.scrollIntoView({ behavior: "instant", block: "start" });
      }
    } else {
      // Se não tiver hash, garante que comece no topo
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