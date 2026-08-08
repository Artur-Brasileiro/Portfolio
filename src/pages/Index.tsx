import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/components/motion/SmoothScroll";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const imagesToPreload = ["projeto_espectro.webp", "projeto_deauther.webp"];

    imagesToPreload.forEach((imageName) => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}${imageName}`;
    });
  }, []);

  // "Voltar para Projetos" navega para "/" com state.targetId. A transição de página já
  // rolou para o topo ANTES desta página montar, então fazemos o scroll até a seção aqui.
  // Esperamos a ALTURA da página estabilizar antes de rolar — senão o Lenis clampa o alvo
  // na altura ainda incompleta (a home renderiza progressivamente) e a rolagem fica curta.
  useEffect(() => {
    const targetId = (location.state as { targetId?: string } | null)?.targetId;
    if (!targetId) return;
    // Limpa o user-state (sem quebrar o react-router) p/ não repetir o scroll ao recarregar.
    window.history.replaceState({ ...window.history.state, usr: null }, "");

    const OFFSET = 80; // altura da navbar fixa
    let raf = 0;
    let tries = 0;
    // Tenta rolar e repete até o alvo realmente chegar ao topo (~OFFSET). A home renderiza
    // progressivamente e o Lenis pode clampar o alvo numa altura ainda incompleta; repetir
    // por alguns frames faz a posição convergir quando o layout assenta. Limite ~0.6s.
    const tick = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.scrollY - OFFSET;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(targetY, { immediate: true });
        else window.scrollTo(0, targetY);
        const landed = Math.abs(el.getBoundingClientRect().top - OFFSET) < 4;
        if (landed) return;
      }
      if (tries++ < 36) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
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
