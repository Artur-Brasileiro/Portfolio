# Portfólio Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan phase-by-phase. Steps use checkbox (`- [ ]`) syntax. **Verification for visual work = Playwright screenshots (desktop + mobile) + clean `npm run build` + zero console errors**, not unit tests.

**Goal:** Elevar o portfólio a nível premium com nova identidade (petróleo+esmeralda), tipografia profissional e movimento de scroll de alto nível, sem alterar conteúdo.

**Architecture:** Camada de movimento reutilizável (`src/components/motion/*`) sobre framer-motion (já instalado) + smooth scroll com Lenis. Componentes "fancy" copiados/adaptados (sem dependência externa em runtime). Mudanças de identidade centralizadas em CSS variables. Build estático para GitHub Pages.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind, shadcn/ui, framer-motion, lenis, react-parallax-tilt, react-three-fiber (existente).

---

## File Structure

**Modificar:**
- `index.html` — Google Fonts (Space Grotesk + Inter), `lang="pt-BR"`, meta tags
- `src/index.css` — tokens da nova paleta, utilitários, integração de fonte
- `tailwind.config.ts` — `fontFamily.display`/`sans`, keyframes extras
- `src/main.tsx` — envolver app com `<SmoothScroll>`
- `src/components/{Hero,About,Projects,Education,Contact,Navbar,Footer}.tsx` — refit visual + motion
- `src/components/ScrollReveal.tsx` — re-exporta a nova `Reveal` (compat)

**Criar:**
- `src/lib/motion.ts` — eases/variants compartilhados
- `src/components/motion/SmoothScroll.tsx` — provider Lenis (respeita reduced-motion)
- `src/components/motion/Reveal.tsx` — `Reveal`, `StaggerContainer`, `StaggerItem`
- `src/components/motion/Parallax.tsx` — wrapper scroll-linked
- `src/components/motion/MagneticButton.tsx`
- `src/components/motion/TiltCard.tsx` — tilt 3D + spotlight
- `src/components/motion/CountUp.tsx`
- `src/components/motion/Marquee.tsx`
- `src/components/motion/StickyShowcase.tsx`
- `src/components/motion/Aurora.tsx` — fundo reativo (desktop)

---

## Fase 0 — Fundação

### Task 0.1: Instalar Lenis
- [ ] **Step 1:** `npm install lenis`
- [ ] **Step 2:** Confirmar em `package.json` que `lenis` aparece em dependencies.

### Task 0.2: Tipografia
**Files:** Modify `index.html`, `tailwind.config.ts`, `src/index.css`
- [ ] **Step 1:** No `<head>` do `index.html`, adicionar (e trocar `lang="en"`→`lang="pt-BR"`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
```
- [ ] **Step 2:** Em `tailwind.config.ts` → `theme.extend.fontFamily`:
```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
},
```
- [ ] **Step 3:** Em `src/index.css`, no `@layer base`, aplicar `body { @apply font-sans; }` e criar utilitário `.font-display { font-family: theme('fontFamily.display'); }` (ou usar `font-display` nas classes dos títulos).
- [ ] **Verify:** dev server abre, títulos em Space Grotesk, corpo em Inter.

### Task 0.3: Nova paleta
**Files:** Modify `src/index.css` (`:root`)
- [ ] **Step 1:** Substituir os tokens HSL do `:root` pelos da paleta petróleo+esmeralda (ver spec). Manter nomes de variáveis (não quebra Tailwind/shadcn):
```css
--background: 192 40% 6%;
--foreground: 165 25% 96%;
--card: 193 32% 9%;
--card-foreground: 165 25% 96%;
--popover: 193 32% 9%;
--popover-foreground: 165 25% 96%;
--primary: 158 78% 45%;
--primary-foreground: 192 40% 6%;
--secondary: 193 25% 15%;
--secondary-foreground: 165 25% 96%;
--muted: 193 25% 15%;
--muted-foreground: 178 12% 62%;
--accent: 185 75% 48%;
--accent-foreground: 192 40% 6%;
--border: 190 22% 16%;
--input: 190 22% 16%;
--ring: 158 78% 45%;
--gradient-primary: linear-gradient(135deg, hsl(158 78% 45%) 0%, hsl(185 75% 52%) 100%);
--gradient-hero: linear-gradient(180deg, hsl(192 40% 6%) 0%, hsl(193 32% 9%) 100%);
--shadow-glow: 0 0 40px hsl(158 78% 45% / 0.22);
```
- [ ] **Step 2:** Ajustar a variante clara (`.dark`) para tons harmonizados (fundo claro levemente esverdeado, mesma primária/acento).
- [ ] **Verify (Playwright):** screenshot do hero → fundo petróleo, gradiente esmeralda→teal no nome.

### Task 0.4: Biblioteca de motion + primitivas de reveal
**Files:** Create `src/lib/motion.ts`, `src/components/motion/Reveal.tsx`; Modify `src/components/ScrollReveal.tsx`
- [ ] **Step 1:** `src/lib/motion.ts`:
```ts
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
export const itemVariants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } };
```
- [ ] **Step 2:** `src/components/motion/Reveal.tsx` com `Reveal` (fade+blur+y, `whileInView`, `once`), `StaggerContainer` (usa `containerVariants`) e `StaggerItem` (usa `itemVariants`). Todos respeitam `useReducedMotion()` (sem deslocamento/blur quando ativo).
- [ ] **Step 3:** `src/components/ScrollReveal.tsx` passa a re-exportar `Reveal` (mantém compatibilidade com usos atuais).
- [ ] **Verify:** build sem erros de tipo.

### Task 0.5: SmoothScroll (Lenis) + reduced-motion
**Files:** Create `src/components/motion/SmoothScroll.tsx`; Modify `src/main.tsx`, `src/index.css`
- [ ] **Step 1:** `SmoothScroll.tsx`: inicia Lenis num `requestAnimationFrame` loop; **não ativa** se `useReducedMotion()` for true; `destroy()` no cleanup.
- [ ] **Step 2:** Remover `scroll-behavior: smooth` do `html` em `index.css` (conflita com Lenis); o fallback de reduced-motion volta a usar scroll nativo.
- [ ] **Step 3:** Garantir que âncoras (`react-router-hash-link`/navbar) rolem suave — usar `lenis.scrollTo` exposto via contexto OU manter offset `scroll-padding-top`.
- [ ] **Step 4:** Envolver a árvore em `src/main.tsx` com `<SmoothScroll>`.
- [ ] **Verify (Playwright):** rolar a página e confirmar movimento suave/inércia; navbar vira pílula; sem erros no console.

**Checkpoint Fase 0:** screenshot desktop do hero com nova cor+fonte e scroll suave. Commit: `feat(fase0): nova paleta, tipografia e smooth scroll`.

---

## Fase 1 — Hero

**Files:** Create `src/components/motion/Aurora.tsx`, `MagneticButton.tsx`, `Parallax.tsx`; Modify `src/components/Hero.tsx`
- [ ] **Aurora.tsx:** fundo com blobs de gradiente esmeralda/teal animados + leve reação ao mouse (`mousemove`); desativado no mobile (`useMediaQuery`/CSS) e em reduced-motion. Posição `absolute`, `pointer-events:none`, atrás do conteúdo.
- [ ] **MagneticButton.tsx:** envolve um botão; translada levemente o conteúdo em direção ao cursor no hover; brilho radial seguindo o mouse; desliga em touch/reduced-motion.
- [ ] **Parallax.tsx:** `useScroll` + `useTransform` para mover children em `y` conforme o scroll (intensidade via prop `speed`).
- [ ] **Hero.tsx:** título com reveal palavra-a-palavra (split + stagger, blur-in); subtítulo/descrição em stagger; botões "Ver Projetos"/"Entrar em Contato" usando `MagneticButton`; `Aurora` no fundo; conteúdo com leve `Parallax` ao rolar.
- [ ] **Verify (Playwright):** screenshot desktop + mobile; sem layout quebrado; sem erro de console.
- [ ] **Commit:** `feat(fase1): hero premium (aurora, reveal por palavra, botoes magneticos)`

---

## Fase 2 — Sobre + Tecnologias

**Files:** Create `src/components/motion/TiltCard.tsx`, `Marquee.tsx`; Modify `src/components/About.tsx`
- [ ] **TiltCard.tsx:** usa `react-parallax-tilt` (já instalado); adiciona spotlight radial que segue o mouse (CSS var `--mx/--my` atualizadas no `mousemove`); desliga em touch/reduced-motion.
- [ ] **Marquee.tsx:** faixa de logos com rolagem infinita (duplicação + animação CSS/framer); pausa no hover; logos em grayscale → cor no hover.
- [ ] **About.tsx:** título "Sobre Mim" com `Reveal`; os 3 cards (Web/Hardware/Inovação) viram `TiltCard` entrando em `StaggerContainer`; a faixa de tecnologias usa `Marquee`.
- [ ] **Verify (Playwright):** screenshot desktop + mobile (marquee não estoura largura no mobile).
- [ ] **Commit:** `feat(fase2): sobre com tilt 3d e marquee de tecnologias`

---

## Fase 3 — Projetos + Projetos Destaque

**Files:** Create `src/components/motion/StickyShowcase.tsx`; Modify `src/components/Projects.tsx`
- [ ] **StickyShowcase.tsx:** layout 2 colunas no desktop — coluna de texto `sticky` e coluna de mídia que troca o item ativo conforme o scroll (índice derivado de `useScroll`/`whileInView`); no mobile vira stack vertical simples (cards empilhados).
- [ ] **Projects.tsx:** "Projetos Destaque" usa `StickyShowcase` (EnglishUp + Macropad 3D em destaque); cards normais com `TiltCard`/`Reveal` e parallax interno na imagem. **Corrigir typo "EngishUp" → "EnglishUp"**.
- [ ] **Verify (Playwright):** rolar a seção e capturar 2-3 estados do sticky; checar mobile (stack).
- [ ] **Commit:** `feat(fase3): showcase sticky de projetos + correcao typo EnglishUp`

---

## Fase 4 — Educação

**Files:** Create `src/components/motion/CountUp.tsx`; Modify `src/components/Education.tsx`
- [ ] **CountUp.tsx:** anima número de 0→alvo quando entra na viewport (`useInView` + `animate`); estático em reduced-motion.
- [ ] **Education.tsx:** linha vertical que se "desenha" conforme o scroll (`scaleY` via `useScroll` da seção); cards de certificação revelando em `StaggerContainer`; anos exibidos com `CountUp`.
- [ ] **Verify (Playwright):** screenshot da timeline em 2 posições de scroll; mobile.
- [ ] **Commit:** `feat(fase4): timeline animada de educacao + count-up`

---

## Fase 5 — Contato

**Files:** Modify `src/components/Contact.tsx`, `src/components/Footer.tsx`
- [ ] **Contact.tsx:** inputs com glow/borda animada ao focar; cards de contato com `TiltCard` leve; botão "Enviar" com `MagneticButton`. Cards e form entram com `Reveal`/stagger.
- [ ] **Footer.tsx:** refit de cor; micro-reveal.
- [ ] **Verify (Playwright):** focar inputs e capturar estado; mobile.
- [ ] **Commit:** `feat(fase5): polish de contato e footer`

---

## Fase 6 — QA / Performance

- [ ] **Reduced-motion:** Playwright com `prefers-reduced-motion: reduce` → confirmar que Lenis desliga e reveals não deslocam (página utilizável e sem animação intrusiva).
- [ ] **Responsivo:** screenshots em 1440px, 768px e 390px de todas as seções; corrigir overflow/quebras.
- [ ] **Console:** zero erros em todas as rotas (`/`, `/projetos`, página do macropad).
- [ ] **Build:** `npm run build` sem erros; `npm run preview` e smoke test visual via Playwright.
- [ ] **Commit:** `chore(fase6): ajustes de qa, responsivo e acessibilidade`

---

## Self-Review

**Spec coverage:** paleta (T0.3) ✅ · tipografia (T0.2) ✅ · smooth scroll (T0.5) ✅ · reduced-motion (T0.5/0.4/F6) ✅ · hero animado (F1) ✅ · tilt+marquee (F2) ✅ · sticky showcase + typo (F3) ✅ · timeline+countup (F4) ✅ · contato (F5) ✅ · mobile leve + QA (F6) ✅ · conteúdo inalterado (escopo respeitado) ✅.

**Placeholders:** verificação é Playwright/build (declarado no header); componentes visuais são afinados contra feedback do navegador a cada fase — sem "TODO" pendente.

**Consistência:** nomes `Reveal`/`StaggerContainer`/`StaggerItem`/`TiltCard`/`MagneticButton`/`Parallax`/`Marquee`/`StickyShowcase`/`CountUp`/`Aurora`/`SmoothScroll` usados de forma consistente entre fases; tokens de cor mantêm os nomes de variáveis existentes.
