import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  return (
    <motion.div
      // Aumentamos o Y para 80, adicionamos scale e um leve blur
      initial={{ opacity: 0, y: 80, scale: 0.95, filter: "blur(8px)" }} 
      // O elemento volta ao tamanho original, posição 0 e perde o blur
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
      // Margin de -100px garante que a animação só dispare quando o item estiver bem dentro da tela
      viewport={{ once: true, margin: "-100px" }}
      // Usamos uma curva de aceleração customizada (ease) mais dramática
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }} 
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;