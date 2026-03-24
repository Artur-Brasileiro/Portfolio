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
    <div className="min-h-screen bg-transparent">
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