/** Formação acadêmica e certificações. */

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
  description: string;
  /** Caminho relativo em /public. `null` na formação acadêmica (sem diploma anexo). */
  imageUrl: string | null;
};

export const education: EducationItem[] = [
  {
    title: "Engenharia da Computação",
    institution: "UEMG",
    period: "2021 — 2026",
    description:
      "Bacharelado em Engenharia da Computação com foco em desenvolvimento de software e sistemas embarcados.",
    imageUrl: null,
  },
  {
    title: "Certificação React",
    institution: "Udemy",
    period: "2025",
    description: "Treinamento do básico ao avançado em React, hooks e roteamento.",
    imageUrl: "certificados/cert-react.jpg",
  },
  {
    title: "Certificação JavaScript",
    institution: "Plataforma DIO",
    period: "2025",
    description: "Certificação avançada em JavaScript e frameworks modernos.",
    imageUrl: "certificados/cert-js.jpg",
  },
  {
    title: "Certificação C#",
    institution: "Plataforma DIO",
    period: "2025",
    description: "Certificação de desenvolvimento em C# e ecossistema .NET.",
    imageUrl: "certificados/cert-csharp.jpg",
  },
  {
    title: "Certificação Angular",
    institution: "Udemy",
    period: "2024",
    description: "Treinamento avançado em Angular e arquitetura de front-end.",
    imageUrl: "certificados/cert-angular.jpg",
  },
  {
    title: "Certificação Python",
    institution: "Udemy",
    period: "2022",
    description: "Certificação em Python avançado, abordando estruturas de dados e automação.",
    imageUrl: "certificados/cert-python.jpg",
  },
];

/** Quantas certificações (exclui a graduação, que não tem certificado anexo). */
export const certificationCount = education.filter((item) => item.imageUrl !== null).length;
