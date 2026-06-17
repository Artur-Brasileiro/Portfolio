# Portfolio — Refinamento Visual Profissional (Plano de Implementação)

> **Para executores:** implementar fase a fase. Frontend visual → o "ciclo de teste" de
> cada tarefa é `npm run build` + `npm run lint` + verificação visual real via `npm run dev`
> (o preview do harness pausa rAF/JS — ver memória `preview-raf-hidden`). Commits frequentes.

**Goal:** Elevar o portfólio a nível profissional preservando a marca: tema light/dark
funcional, hero com avatar/sociais/copy, correção de defeitos de produção e limpeza de dívida.

**Architecture:** Evolução do design system shadcn/Tailwind existente. `next-themes` controla
`class` no `<html>` (`:root`=light, `.dark`=dark, default dark). Componentes consomem tokens
HSL via `hsl(var(--x))`. Motion existente (Reveal/Stagger/parallax) é preservado e centralizado.

**Tech Stack:** Vite, React 18, TS, Tailwind, shadcn/ui, framer-motion, next-themes, lenis,
react-three-fiber.

## Global Constraints

- Manter a paleta da marca: primary esmeralda `158 78% 45%` (dark), accent ciano `185 75% 48%`.
- Todas as cores em HSL via CSS vars; nada de `hsl()` literal novo em componentes.
- Todo movimento respeita `prefers-reduced-motion` e efeitos de ponteiro só em `pointer:fine`.
- Site em pt-BR. Manter HashRouter. `base` Vite = `/Portfolio/`.
- Default theme = dark.
- Não quebrar o build nem introduzir erros de lint/TS novos.

---

## Fase 1 — Fundação: tema light/dark + tokens

**Files:**
- Modify: `src/index.css` (reescrever `:root`/`.dark`, elevação, wave vars, dot-grid util)
- Modify: `tailwind.config.ts` (`boxShadow`, `fontSize` fluido)
- Modify: `src/App.tsx` (envolver com `ThemeProvider`; remover `GhostCursor`)
- Modify: `index.html` (`<meta name="color-scheme">`)
- Modify: `src/lib/motion.ts` (tokens de duração/spring)
- Create: `src/components/ThemeToggle.tsx`

**Decisões travadas:**

`src/index.css` — `:root` recebe o tema LIGHT novo; `.dark` recebe o tema DARK atual
(mover os valores hoje em `:root` para `.dark`). Light (ajustar p/ AA durante verificação):
```
:root {
  --background: 165 30% 97%; --foreground: 200 30% 12%;
  --card: 0 0% 100%; --card-foreground: 200 30% 12%;
  --popover: 0 0% 100%; --popover-foreground: 200 30% 12%;
  --primary: 158 72% 34%; --primary-foreground: 0 0% 100%;
  --secondary: 170 24% 93%; --secondary-foreground: 200 30% 14%;
  --muted: 170 22% 94%; --muted-foreground: 195 14% 38%;
  --accent: 188 72% 36%; --accent-foreground: 0 0% 100%;
  --destructive: 0 75% 50%; --destructive-foreground: 0 0% 100%;
  --border: 190 18% 87%; --input: 190 18% 87%; --ring: 158 72% 34%;
  --radius: 0.75rem;
  --gradient-primary: linear-gradient(135deg, hsl(158 72% 34%) 0%, hsl(188 72% 38%) 100%);
  --gradient-hero: linear-gradient(180deg, hsl(170 30% 98%) 0%, hsl(165 30% 96%) 100%);
  --shadow-glow: 0 0 40px hsl(158 72% 34% / 0.16);
  --hero-wave-from: 0 0% 100%; --hero-wave-to: 165 30% 97%;
  --shadow-sm: 0 1px 2px hsl(200 20% 20% / 0.06), 0 1px 3px hsl(200 20% 20% / 0.10);
  --shadow-md: 0 4px 12px hsl(200 20% 20% / 0.08), 0 2px 6px hsl(200 20% 20% / 0.06);
  --shadow-lg: 0 12px 32px hsl(200 20% 20% / 0.12), 0 6px 12px hsl(200 20% 20% / 0.08);
}
.dark {
  /* valores DARK atuais (migrados do :root antigo) + abaixo */
  --hero-wave-from: 193 32% 9%; --hero-wave-to: 192 40% 6%;
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.3);
  --shadow-md: 0 6px 18px hsl(0 0% 0% / 0.4);
  --shadow-lg: 0 16px 40px hsl(0 0% 0% / 0.5);
}
```
Re-tokenizar `--sidebar-*` para a paleta (ou remover se grep confirmar não-uso de `sidebar`).
Adicionar util do dot-grid e classes das stops da wave:
```
@layer utilities {
  .bg-dot-grid {
    background-image: radial-gradient(hsl(var(--primary) / 0.18) 1px, transparent 1px);
    background-size: 28px 28px;
  }
}
.hero-wave-from { stop-color: hsl(var(--hero-wave-from)); }
.hero-wave-to { stop-color: hsl(var(--hero-wave-to)); }
```

`tailwind.config.ts` — `theme.extend`:
```
boxShadow: { 'soft-sm':'var(--shadow-sm)', 'soft-md':'var(--shadow-md)', 'soft-lg':'var(--shadow-lg)', glow:'var(--shadow-glow)' },
fontSize: {
  'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'display-lg': ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
},
```

`src/App.tsx` — importar `{ ThemeProvider } from "next-themes"`, envolver tudo:
`<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>`.
Remover `import GhostCursor` e `<GhostCursor />`.

`index.html` — adicionar no `<head>`: `<meta name="color-scheme" content="dark light" />`.

`src/lib/motion.ts` — acrescentar (sem quebrar exports atuais):
```
export const DURATION = { fast: 0.3, base: 0.6, slow: 0.8 } as const;
export const SPRING_SOFT = { stiffness: 90, damping: 24, mass: 0.5 } as const;
```

`src/components/ThemeToggle.tsx` — **novo**:
```tsx
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";
  return (
    <Button
      variant="ghost" size="icon"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-muted-foreground hover:text-primary"
    >
      {mounted && isDark
        ? <Sun className="w-5 h-5" />
        : <Moon className="w-5 h-5" />}
    </Button>
  );
};
export default ThemeToggle;
```

- [ ] Reescrever `index.css` (`:root`=light novo, `.dark`=dark migrado, elevação, wave vars, dot-grid)
- [ ] Estender `tailwind.config.ts` (boxShadow + fontSize)
- [ ] Adicionar tokens em `motion.ts`; `<meta color-scheme>` no `index.html`
- [ ] Criar `ThemeToggle.tsx`; envolver `App.tsx` com `ThemeProvider`; remover `GhostCursor`
- [ ] **Verify:** `npm run build` passa; `npm run dev` → alternar `localStorage.theme` ou via toggle (após Fase 2) muda o tema; ambos legíveis
- [ ] **Commit:** `feat: tema light/dark funcional + escala de elevacao e tipografia`

## Fase 2 — Navbar unificada + toggle + scroll-spy IO

**Files:**
- Modify: `src/components/Navbar.tsx` (reescrita unificada)
- Delete: `src/components/NavLink.tsx` (código morto — grep confirmou)

**Decisões travadas:** uma fonte `navItems`; subcomponente interno `NavLinks` reusado por
desktop e mobile; `activeSection` via `IntersectionObserver` (rootMargin centrado, ex.
`-45% 0px -50% 0px`) sobre `#sobre/#projetos/#educacao/#contato`; `isScrolled` via listener de
scroll com guard de `rAF`; remover `handleNavClick`, o efeito `location.state.targetId` e o
`setTimeout(500)`; navegação 100% via `HashLink` + `scrollWithOffset`; incluir `<ThemeToggle/>`
nos dois layouts; manter o morph pill-on-scroll e o guard de rotas `/programacao|/hardware|/projeto/*`.

- [ ] Reescrever `Navbar.tsx` unificado (NavLinks + IO + ThemeToggle)
- [ ] Deletar `NavLink.tsx`
- [ ] **Verify:** `npm run build`/`lint`; `npm run dev` → spy correto ao rolar, pill no scroll, toggle funciona, menu mobile abre/fecha
- [ ] **Commit:** `refactor: navbar unica responsiva com scroll-spy IO e toggle de tema`

## Fase 3 — Hero: avatar, sociais, copy, decoração curada, wave theme-aware

**Files:**
- Create: `src/components/ProfileAvatar.tsx`
- Modify: `src/components/Hero.tsx`

**Decisões travadas:**

`ProfileAvatar.tsx` — **novo**. Imagem circular com anel gradiente + status dot; fallback
monograma quando `src` ausente/erro:
```tsx
import { useState } from "react";

const ProfileAvatar = ({ src, alt = "Artur Brasileiro" }: { src?: string; alt?: string }) => {
  const [errored, setErrored] = useState(false);
  const showImg = src && !errored;
  return (
    <div className="relative inline-block">
      <div className="rounded-full p-[3px] bg-gradient-primary shadow-glow">
        <div className="rounded-full bg-background p-1">
          {showImg ? (
            <img src={src} alt={alt} onError={() => setErrored(true)}
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover" />
          ) : (
            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full grid place-items-center
              bg-secondary font-display text-4xl font-bold gradient-text">AB</div>
          )}
        </div>
      </div>
      <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
    </div>
  );
};
export default ProfileAvatar;
```

`Hero.tsx`:
- Renderizar `<ProfileAvatar src={`${import.meta.env.BASE_URL}avatar.jpg`} />` acima do H1
  (dentro do bloco animado; aparece também no fallback reduced-motion).
- Parágrafo novo: "Construo software web moderno e sistemas embarcados — da lógica do código
  à placa que executa."
- Após os CTAs, linha de ícones sociais (reusar `Github`,`Linkedin` lucide):
  GitHub `https://github.com/Artur-Brasileiro`, LinkedIn `https://www.linkedin.com/in/artur-brasileiro/`,
  `target="_blank" rel="noopener noreferrer"`, `aria-label`, hover `text-primary`.
- Decoração: **remover** os textos `{ }`, `=>`, `010110`, `( )`. Manter no máx. **um** `</>`
  (plano fundo). Adicionar uma camada `bg-dot-grid` sutil (com mask radial p/ desvanecer nas
  bordas) num dos planos de parallax. Manter partículas com glow e os contornos
  círculo/diamante (subir opacidade dos contornos p/ ~0.18–0.22).
- Scroll cue: trocar `animate-bounce` por motion sutil (y 0→6→0, `repeat: Infinity`, ease da
  casa) com `useReducedMotion` (estático se reduzido); manter HashLink p/ `#sobre`.
- Wave: trocar os `<stop stopColor="hsl(193 32% 9%)">` por
  `<stop offset="0" className="hero-wave-from"/>` … e o último por `className="hero-wave-to"`
  (remover `stopColor` literais) → fica theme-aware.

- [ ] Criar `ProfileAvatar.tsx`
- [ ] Editar `Hero.tsx` (avatar, copy, sociais, decoração curada, scroll cue, wave vars)
- [ ] **Verify:** `npm run build`; `npm run dev` → avatar (fallback "AB" sem imagem), sociais clicáveis, sem glyphs poluídos, wave correta nos 2 temas, parallax/reduced-motion ok
- [ ] **Commit:** `feat: hero com avatar, sociais, copy afiada e decoracao curada`

## Fase 4 — Seções: Education, Footer, Projects, About, Contact

**Files:**
- Modify: `src/components/Education.tsx`, `src/components/CertificateModal.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Contact.tsx`

**Decisões travadas:**
- **Education:** trocar os dois `"/placeholder-certificado.jpg"` por
  `"certificados/cert-python.jpg"` e `"certificados/cert-angular.jpg"`.
- **CertificateModal:** adicionar `onError` na `<img>` → estado de fallback que mostra
  "Imagem do certificado indisponível" (evita ícone de imagem quebrada se o arquivo faltar).
- **Footer:** reconstruir: marca + tagline curta; nav rápida (`#sobre/#projetos/#educacao/#contato`
  via HashLink+scrollWithOffset); ícones sociais (GitHub/LinkedIn); botão "voltar ao topo"
  (usa `scrollToTop` de SmoothScroll); copyright com ano dinâmico. Usar `shadow-soft-*`/borders.
- **Projects:** `"Acessar Repositório"` → `"Ver Projetos"`.
- **About:** descrição do card "Desenvolvimento Web" de "JavaScript, React, Node.js e
  frameworks modernos" → "JavaScript, React, TypeScript e frameworks modernos" (alinha à marquee).
- **Contact:** card de e-mail com botão **click-to-copy** (`navigator.clipboard.writeText`),
  ícone `Copy`→`Check` por ~1.5s, com `aria-label`. Verificar legibilidade do form no light.

- [ ] Education: caminhos dos certs; CertificateModal onError fallback
- [ ] Footer real; Projects label; About claim; Contact click-to-copy
- [ ] **Verify:** `npm run build`/`lint`; `npm run dev` → clicar "Ver Certificado" não quebra; footer com links/voltar-ao-topo; copy do e-mail funciona; seções legíveis nos 2 temas
- [ ] **Commit:** `feat: secoes refinadas (certs, footer, projects, about, contact)`

## Fase 5 — Higiene: ScrollReveal, ModelViewer, deploy, limpeza

**Files:**
- Delete: `src/components/GhostCursor.jsx`, `src/components/ScrollReveal.tsx`
- Modify: `src/components/ModelViewer.tsx`
- Modify: `src/pages/Index.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/NotFound.tsx`
- Modify: `package.json`

**Decisões travadas:**
- Deletar `GhostCursor.jsx` (já removido do App na Fase 1) e `ScrollReveal.tsx` (código morto).
- `Index.tsx`: remover import/comentário do GhostCursor e TODOs.
- `ModelViewer.tsx`: `import { useReducedMotion } from "framer-motion"`; `autoRotate={enableRotate && !reduce && visible}`;
  `frameloop={autoRotate ? "always" : "demand"}`; pausar via `IntersectionObserver` (`visible`)
  quando fora da viewport; trocar `Math.min(2, window.devicePixelRatio)` por leitura defensiva.
- `package.json`: `homepage` → `https://Artur-Brasileiro.github.io/Portfolio`.
- Limpeza de comentários de dev (`ProjectsPage.tsx`, `NotFound.tsx`) e do comentário obsoleto
  "Macropad como primeiro item".

- [ ] Deletar GhostCursor/ScrollReveal; limpar Index.tsx
- [ ] Otimizar ModelViewer (reduced-motion + frameloop + visibilidade)
- [ ] `homepage` no package.json; limpar comentários
- [ ] **Verify:** `npm run build`/`lint`; `npm run dev` → macropad renderiza, para de girar em reduced-motion; sem refs mortas
- [ ] **Commit:** `chore: remove codigo morto, otimiza ModelViewer e corrige deploy`

## Fase 6 — Otimização de imagens (risco de tooling)

**Files:**
- Modify (assets em `public/`): `projeto_deauther.jpg`, `projeto_espectro.jpg`,
  `projeto_sensorluz.jpg` (+ auditar outras multi-MB) → `.webp`
- Modify: referências (`grep` por `projeto_deauther|projeto_espectro|projeto_sensorluz`,
  provavelmente `ProjectsPage.tsx` e `Index.tsx`)

**Decisões travadas:** converter para WebP (qualidade ~80) com `sharp`
(`npx -y sharp-cli` ou script Node). Adicionar `width`/`height` onde fizer sentido; `loading=lazy`
já existe. **Se o tooling não rodar no ambiente:** reportar claramente, manter os JPGs e deixar
as referências prontas — não silenciar a limitação (critério de honestidade).

- [ ] Converter as imagens pesadas → WebP; atualizar referências
- [ ] **Verify:** `npm run build`; imagens < ~500KB; detail page carrega; **ou** relatório se bloqueado
- [ ] **Commit:** `perf: imagens de projeto em WebP` (ou nota da limitação)

## Fase 7 — Verificação final + revisão adversarial

- [ ] `npm run build` e `npm run lint` limpos (sem novos erros)
- [ ] Revisão do diff completo (workflow de review) buscando regressões de contraste no light,
  z-index, reduced-motion e tokens hardcoded remanescentes
- [ ] `npm run dev` real: percorrer hero/seções/navbar nos dois temas (memória `preview-raf-hidden`)
- [ ] **Commit** de quaisquer correções da revisão

---

## Self-Review (cobertura do spec)

- §5.1 tema → Fase 1 ✓ · §5.2 wave/aurora theme-aware → Fase 1+3 ✓ · §5.3 elevação → Fase 1 ✓
- §5.4 tipografia → Fase 1 ✓ · §5.5 motion/z-index → Fase 1 (z-index aplicado onde tocar) ✓
- §6 hero → Fase 3 ✓ · §7 navbar → Fase 2 ✓ · §8 seções → Fase 4 ✓
- §9 higiene (homepage/imagens/GhostCursor/ScrollReveal/ModelViewer/limpeza) → Fases 1,5,6 ✓
- §10 assets do usuário → fallbacks em ProfileAvatar (Fase 3) e CertificateModal (Fase 4) ✓
- §11 critérios → Fase 7 ✓
- Tipos consistentes: `ProfileAvatar({src,alt})`, `ThemeToggle()`, `DURATION/SPRING_SOFT`,
  classes `hero-wave-from/to`, `bg-dot-grid`, `shadow-soft-*` referenciadas de forma uniforme.
