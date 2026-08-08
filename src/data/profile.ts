/**
 * Identidade, narrativa e stack. Fonte única de verdade para tudo que descreve
 * a pessoa — os componentes só apresentam.
 */

export const GITHUB_URL = "https://github.com/Artur-Brasileiro";
export const LINKEDIN_URL = "https://www.linkedin.com/in/artur-brasileiro/";
export const EMAIL = "arturbrasileiro00@gmail.com";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyzokkee";

export const profile = {
  name: "Artur Brasileiro",
  initials: "AB",
  role: "Engenheiro da Computação",
  availability: "Disponível para novas oportunidades",

  headline: {
    lead: "Construindo",
    accent: "Soluções Sólidas.",
  },

  summary:
    "Especialista em software web moderno e sistemas embarcados. Transformo " +
    "problemas complexos em produtos eficientes, escaláveis e orientados a resultados.",

  /** Período atual do curso — alimenta a bio, a ficha técnica e a faixa de métricas. */
  currentSemester: 10,
  totalSemesters: 10,
  graduationYear: "2026",

  bio: [
    "Sou estudante do 10º período de Engenharia da Computação, movido pelo desafio de " +
      "transformar problemas complexos em soluções elegantes. Minha trajetória é marcada " +
      "pela intersecção entre o software de alto nível e as raízes da computação no hardware.",
    "Tenho sólida experiência prática na concepção de sistemas embarcados e no desenvolvimento " +
      "de aplicações web modernas. Acredito que um bom produto nasce da atenção meticulosa " +
      "aos detalhes, desde a arquitetura da informação até o último pixel renderizado na tela.",
    "Atualmente, busco aplicar boas práticas de engenharia de software para entregar " +
      "produtos com alto padrão de qualidade corporativa, garantindo não apenas que o código " +
      "funcione, mas que seja escalável, legível e seguro.",
  ],

  /** Ficha técnica — pares chave/valor da seção Sobre. */
  facts: [
    { label: "Formação", value: "Engenharia da Computação" },
    { label: "Instituição", value: "UEMG — Universidade do Estado de Minas Gerais" },
    { label: "Período", value: "10º de 10 · conclusão em 2026" },
    { label: "Localização", value: "Ituiutaba, MG — Brasil" },
  ],

  location: "Ituiutaba, MG - Brasil",
  university: "UEMG (Universidade do Estado de Minas Gerais)",

  /**
   * Stack agrupada por domínio. Agrupar comunica profundidade; uma lista plana
   * de dez pílulas comunica apenas quantidade.
   */
  stack: [
    {
      domain: "Web & Front-end",
      items: ["JavaScript", "TypeScript", "React", "Next.js"],
    },
    {
      domain: "Linguagens & Dados",
      items: ["Python", "C++"],
    },
    {
      domain: "Sistemas & Ferramentas",
      items: ["Linux", "Git", "Arduino", "Raspberry Pi"],
    },
  ],
} as const;

export const socialLinks = [
  { name: "GitHub", href: GITHUB_URL },
  { name: "LinkedIn", href: LINKEDIN_URL },
] as const;
