import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const imagesToPreload = ["projeto_espectro.jpg", "projeto_deauther.jpg"];

    imagesToPreload.forEach((imageName) => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}${imageName}`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
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
