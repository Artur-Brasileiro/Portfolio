import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Se o GhostCursor não for ser usado, pode remover a linha abaixo
import GhostCursor from "@/components/GhostCursor";

const Index = () => {
  const location = useLocation();

  // Força rolagem para o topo ao carregar a página inicialmente (refresh)
  useEffect(() => {
    // Se não tiver hash e não tiver state, significa que é um load simples
    if (!location.hash && !location.state) {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.state]);

  useEffect(() => {
    const stateTarget = location.state && (location.state as { targetId?: string }).targetId;
    const hashTarget = location.hash ? location.hash.replace("#", "") : null;
    
    const targetId = stateTarget || hashTarget;

    if (location.pathname !== "/") return;

    // Use a small timeout to allow AnimatePresence to finish its job before scrolling
    setTimeout(() => {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 100);
  }, [location]);

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
    <div className="min-h-screen relative z-10 bg-transparent">
      {/* <GhostCursor /> - Descomente se for usar o cursor dele */}
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