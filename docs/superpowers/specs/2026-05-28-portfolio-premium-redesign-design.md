# Portfólio — Redesign Premium (Nível B)

**Data:** 2026-05-28
**Branch:** `feature/premium-redesign`
**Autor:** Artur Brasileiro (com Claude)

## Objetivo

Elevar o portfólio a um nível "premium/Awwwards" através de **movimento de scroll de alto nível** e um **retrabalho visual cirúrgico** das seções de maior impacto — sem jogar fora a base atual, que já é sólida. Foco em parecer **caro e profissional** via *coesão + poucos momentos de impacto bem executados*, não acúmulo de efeitos.

## Escopo

**Dentro:** nova paleta de cores, nova tipografia, sistema de movimento (smooth scroll + scroll-linked + parallax + stagger + micro-interações), retrabalho visual de Hero, Sobre/Tech, Projetos, Educação e Contato.

**Fora (não muda):** conteúdo textual, lista de projetos/certificados, rotas/páginas existentes (`ProjectsPage`, `MacropadPage`), lógica do formulário de contato (segue front-only), internacionalização.

## Restrições

- **GitHub Pages:** site permanece estático e rápido. Componentes "fancy" (Aceternity/Magic UI/21st.dev) entram como **código copiado e adaptado**, não como dependência externa em runtime.
- **Performance mobile:** efeitos pesados (aurora reativa, parallax intenso, tilt 3D) ficam restritos ao desktop; mobile recebe versões leves.
- **Acessibilidade:** todo movimento respeita `prefers-reduced-motion` (desliga/reduz). Contraste de texto mantém AA.
- **Segurança:** nenhuma nova dependência de terceiro carregando em produção além do necessário (apenas `lenis`).
- **Stack:** Vite + React 18 + TS + Tailwind + shadcn/ui + framer-motion (já instalado).

## Sistema de Design

### Paleta — "Petróleo + Esmeralda" (tema escuro, padrão)

Tokens HSL em `src/index.css` (`:root`):

```
--background: 192 40% 6%
--foreground: 165 25% 96%
--card: 193 32% 9%
--card-foreground: 165 25% 96%
--popover: 193 32% 9%
--popover-foreground: 165 25% 96%
--primary: 158 78% 45%          /* esmeralda */
--primary-foreground: 192 40% 6%
--secondary: 193 25% 15%
--secondary-foreground: 165 25% 96%
--muted: 193 25% 15%
--muted-foreground: 178 12% 62%
--accent: 185 75% 48%           /* teal */
--accent-foreground: 192 40% 6%
--border: 190 22% 16%
--input: 190 22% 16%
--ring: 158 78% 45%
--gradient-primary: linear-gradient(135deg, hsl(158 78% 45%) 0%, hsl(185 75% 52%) 100%)
--gradient-hero: linear-gradient(180deg, hsl(192 40% 6%) 0%, hsl(193 32% 9%) 100%)
--shadow-glow: 0 0 40px hsl(158 78% 45% / 0.22)
```

A variante clara (`.dark` no esquema atual invertido) é harmonizada com a nova identidade, mas o **tema escuro é a experiência principal/showcase**.

### Tipografia

- **Display (títulos):** Space Grotesk
- **Corpo:** Inter
- Carregadas via `<link>` Google Fonts no `index.html`.
- Tokens no `tailwind.config.ts`: `fontFamily.display` e `fontFamily.sans`.

## Sistema de Movimento

- **Smooth scroll:** `lenis` (única nova dependência) via provider `SmoothScroll` envolvendo a app.
- **Engine de animação:** framer-motion (já presente).
- **Estratégia reduced-motion:** hook central (`useReducedMotion` do framer-motion) que neutraliza variantes e desliga Lenis/parallax quando o usuário pede menos movimento.
- **Primitivas reutilizáveis** em `src/components/motion/`:
  - `Reveal` (substitui/estende o `ScrollReveal` atual) + `StaggerContainer`/`StaggerItem`
  - `Parallax` (scroll-linked via `useScroll`/`useTransform`)
  - `MagneticButton`
  - `TiltCard` (tilt 3D + spotlight; usa `react-parallax-tilt` já instalado)
  - `CountUp` (números animados ao entrar na viewport)
  - `Marquee` (scroller infinito)
  - `StickyShowcase` (texto fixo + visuais trocando ao rolar)
  - `Aurora` / `BackgroundGrid` (fundo reativo ao mouse, só desktop)

## Plano por Seção

1. **Hero** — fundo aurora/grid reativo ao mouse (desktop) + título com reveal palavra-a-palavra (blur-in escalonado) + botões magnéticos com brilho seguindo o cursor + parallax do conteúdo ao rolar.
2. **Sobre + Tecnologias** — cards com tilt 3D + spotlight, entrando escalonados; marquee de logos (cinza → cor no hover).
3. **Projetos + Projetos Destaque** — `StickyShowcase` (texto fixo, visuais trocam conforme o scroll); cards com parallax interno; macropad 3D em destaque. Corrigir typo "EngishUp" → "EnglishUp".
4. **Educação** — timeline que se "desenha" conforme o scroll + anos com `CountUp`.
5. **Contato** — micro-interações de foco refinadas no formulário (evolução do glow existente).

## Abordagem Técnica

- Sintaxe atual de framer-motion/Lenis confirmada via **context7** antes de implementar.
- Componentes de bibliotecas fancy: copiar + adaptar à paleta e trocar ícones para `lucide-react`.
- Mudanças concentradas em: `index.css`, `tailwind.config.ts`, `index.html`, `src/components/motion/*` (novos), e refit dos componentes de seção existentes.

## Sequência de Build (fases revisáveis)

- **Fase 0 — Fundação:** paleta + fontes + Lenis (`SmoothScroll`) + primitivas de motion. Critério: site abre com nova cor/fonte, scroll suave, sem regressão.
- **Fase 1 — Hero**
- **Fase 2 — Sobre/Tecnologias**
- **Fase 3 — Projetos (sticky showcase + 3D)**
- **Fase 4 — Educação (timeline + count-up)**
- **Fase 5 — Contato (polish)**
- **Fase 6 — QA/Performance**

## Verificação

- **Playwright** em cada fase: screenshot desktop (~1440px) e mobile (~390px); zero erros de console.
- Checagem de `prefers-reduced-motion` (emulado) na Fase 6.
- `npm run build` sem erros + verificação visual do `preview`.
- Avaliação qualitativa de fluidez do scroll (sem travadas).

## Critérios de Sucesso

- Identidade petróleo+esmeralda aplicada de forma coesa em todo o site.
- Pelo menos 3 "momentos premium" funcionando (hero animado, sticky showcase de projetos, timeline de educação).
- Mobile fluido; reduced-motion respeitado; build de produção íntegro.
