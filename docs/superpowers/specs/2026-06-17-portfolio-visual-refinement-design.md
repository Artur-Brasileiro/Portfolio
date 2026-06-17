# Portfolio — Refinamento Visual Profissional (Design Spec)

**Data:** 2026-06-17
**Autor:** Artur Brasileiro (com Claude)
**Tipo:** Refinar & elevar (evolução, não recomeço)

## 1. Visão geral

O portfólio já tem fundação forte: arquitetura de tokens HSL (shadcn-style), identidade
esmeralda (`158 78% 45%`) + ciano (`185 75% 48%`) sobre teal escuro (`192 40% 6%`), e um
sistema de motion sofisticado (parallax multi-camada de scroll+ponteiro, Aurora, magnetic
buttons, Reveal/Stagger). O problema não é a estética-base — é que **substância de conteúdo
e higiene de produção não acompanharam o nível da animação**, e há defeitos reais visíveis
(imagem de certificado quebrada, deploy mal configurado, imagens cruas de vários MB).

Este spec define uma passada de refinamento que: (a) corrige todos os defeitos, (b) eleva o
polimento (tipografia, profundidade, hero, micro-interações), (c) adiciona um **tema
light/dark funcional**, e (d) reduz dívida técnica de motion/navegação — **sem trocar a
marca**.

## 2. Objetivos

1. Tema **light/dark de verdade**, com botão na navbar e dark como padrão. Ambos polidos.
2. **Hero** com mais credibilidade: avatar/foto, ícones sociais (GitHub/LinkedIn), copy
   afiada, e decoração curada (sem poluição de glyphs).
3. **Corrigir defeitos de produção:** certificados quebrados, `homepage`/deploy, imagens
   pesadas, e-mail, código morto/comentários de dev.
4. **Reduzir dívida:** unificar navbars, scroll-spy via IntersectionObserver, deletar
   `ScrollReveal` duplicado, otimizar `ModelViewer`, remover/reabilitar `GhostCursor`.
5. **Elevar o design system:** escala de elevação, tipografia fluida, tokens de motion e
   z-index centralizados.

## 3. Não-objetivos (YAGNI)

- Não trocar a paleta/identidade da marca.
- Não migrar HashRouter → BrowserRouter (risco no GitHub Pages; mantém-se HashRouter).
- Não reescrever a lógica do formulário (Formspree) nem o conteúdo técnico real dos projetos.
- Não adicionar download de CV nem stats-chips (usuário optou por fora).
- Não internacionalização; o site permanece em pt-BR.

## 4. O que preservar (não mexer no que é bom)

- Arquitetura de tokens HSL + paleta esmeralda/ciano.
- `usePointerParallax` (um listener global rAF-throttled, spring-smoothed) e o parallax do hero.
- Disciplina de `prefers-reduced-motion` (Aurora, CountUp, MagneticButton, Parallax, Reveal,
  SmoothScroll, TiltCard, usePointerParallax).
- Primitivos `Reveal` / `StaggerContainer` / `StaggerItem` como reveal canônico.
- Conteúdo real específico (bio, repos, demo `playenglishup.com.br`, longDescriptions de hardware).
- Formulário Formspree com estados loading/success/error + modal de sucesso.
- Transição em onda hero→About (mata a "zona morta").

## 5. Design System (fundação)

### 5.1 Tema light/dark funcional
- Usar **`next-themes`** (já é dependência). `ThemeProvider` envolve a app em `App.tsx` com
  `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`, `disableTransitionOnChange`.
- **Reescrever a convenção invertida** em `src/index.css`:
  - `:root` passa a conter os tokens do **tema LIGHT** (novo, polido).
  - `.dark` passa a conter os tokens do **tema DARK** (o atual bom, movido pra cá).
  - `darkMode: ["class"]` no Tailwind permanece. Como `defaultTheme="dark"`, o `<html>` recebe
    `class="dark"` no load.
- **Tema DARK (manter atual):** os valores hoje em `:root` migram integralmente para `.dark`.
- **Tema LIGHT (novo, polido)** — valores iniciais (ajustar p/ contraste AA na implementação):
  - `--background: 165 30% 97%` (off-white quente com leve tom teal)
  - `--foreground: 200 30% 12%` (tinta teal profunda)
  - `--card: 0 0% 100%` · `--card-foreground: 200 30% 12%`
  - `--popover: 0 0% 100%` · `--popover-foreground: 200 30% 12%`
  - `--primary: 158 72% 34%` (esmeralda escurecida p/ AA sobre branco) · `--primary-foreground: 0 0% 100%`
  - `--secondary: 170 24% 93%` · `--secondary-foreground: 200 30% 14%`
  - `--muted: 170 22% 94%` · `--muted-foreground: 195 14% 38%`
  - `--accent: 188 72% 36%` · `--accent-foreground: 0 0% 100%`
  - `--border: 190 18% 87%` · `--input: 190 18% 87%` · `--ring: 158 72% 34%`
  - `--gradient-hero: linear-gradient(180deg, hsl(170 30% 98%) 0%, hsl(165 30% 96%) 100%)`
  - `--shadow-glow: 0 0 40px hsl(158 72% 34% / 0.18)`
- **Sidebar tokens:** re-tokenizar para a paleta (ou remover se nenhum `sidebar` é usado;
  verificar uso na implementação). Hoje são defaults shadcn com `--sidebar-ring` azul off-brand.

### 5.2 Tokens theme-aware que hoje têm cor hardcoded
- **Onda do hero** (`Hero.tsx`): o `linearGradient#heroWaveFill` usa `hsl(193 32% 9%)` e
  `hsl(192 40% 6%)` literais. Trocar por stop-colors via CSS referenciando `var(--card)` /
  `var(--background)` (classes CSS nos `<stop>`, já que atributos SVG não leem `var()`
  diretamente). A onda deve ler corretamente em ambos os temas.
- **Aurora / spotlight:** já usam `var(--primary)`/`var(--accent)` — confirmar e manter.
- Qualquer `hsl(...)` literal restante em componentes deve virar token.

### 5.3 Escala de elevação
- Adicionar tokens `--shadow-sm/md/lg/xl` (sombras suaves, neutras) e expor em
  `tailwind.config.ts` (`theme.extend.boxShadow`). Aplicar em cards p/ profundidade real,
  sobretudo no light (onde o glow sozinho não cria hierarquia).

### 5.4 Tipografia
- Escala de títulos **fluida com `clamp()`** (display) e tracking ajustado; hierarquia e
  ritmo de seção consistentes (ex.: tokens de espaçamento de seção). Manter par Space Grotesk
  (display) + Inter (body). Avaliar carregar pesos adicionais se necessário p/ hierarquia.

### 5.5 Centralização de motion e z-index
- `src/lib/motion.ts`: consolidar escala de **durações/eases/springs**; `PageTransition` e
  outros passam a importar `EASE_OUT_EXPO` em vez de curvas inline duplicadas.
- Introduzir uma **escala de z-index** (CSS vars ou tokens Tailwind: base/decor/content/nav)
  e aplicar no hero, navbar e overlays, eliminando os z-index ad hoc (`z-[1]`, `z-30`, `z-50`).

## 6. Hero

- **Composição centralizada mantida** (preserva o parallax centrado). De cima p/ baixo:
  avatar → H1 (nome) → H2 (cargo) → parágrafo (value prop) → CTAs → ícones sociais → scroll cue.
- **Avatar/foto:** componente com imagem circular, **anel de brilho** (gradient-primary) e
  **status dot**. Fallback gracioso: monograma "AB" em círculo gradiente quando a imagem não
  existir. Fonte: `${import.meta.env.BASE_URL}avatar.jpg` (usuário fornecerá `public/avatar.jpg`).
- **Ícones sociais:** linha com GitHub (`https://github.com/Artur-Brasileiro`) e LinkedIn
  (`https://www.linkedin.com/in/artur-brasileiro/`), `target=_blank rel=noopener noreferrer`,
  com hover token-based. Reaproveitar ícones lucide já usados no Contact.
- **Copy afiada (proposta, ajustável pelo usuário):**
  - H1: "Olá, eu sou **Artur Brasileiro**" (mantém, com nome em gradient).
  - H2: "Engenheiro da Computação" (mantém).
  - Parágrafo (novo): "Construo software web moderno e sistemas embarcados — da lógica do
    código à placa que executa." (substitui a frase vaga atual).
- **Decoração curada (substitui glyphs poluídos):** remover os textos `010110`, `{ }`, `=>`,
  `( )`. Substituir por: (a) **grid de pontos** sutil (radial-gradient) numa camada de parallax,
  (b) manter as 4–6 **partículas com glow** existentes, (c) 1–2 contornos geométricos
  (círculo/diamante) com **contraste levemente maior** que hoje, (d) opcionalmente **um** acento
  `</>` tasteful. Manter as camadas de profundidade e o parallax de scroll+ponteiro.
- **Scroll cue refinado:** indicador maior/legível com easing da casa (não `animate-bounce`
  genérico); respeitar reduced-motion.
- Tudo continua atrás dos guards de `reduced-motion` e `pointer:fine` já existentes.

## 7. Navegação (Navbar)

- **Unificar as duas árvores** (mobile e desktop) em um componente responsivo único:
  - Uma fonte de verdade `navItems` (Sobre/Projetos/Educação/Contato) + subcomponente
    `NavLinks` compartilhado por mobile e desktop.
  - Manter o morph: barra transparente full-width → pill flutuante com backdrop-blur no scroll.
- **Botão de tema** (sol/lua animado) na navbar, em mobile e desktop, usando `next-themes`.
- **Scroll-spy via `IntersectionObserver`** (substitui o listener `scroll` cru com
  `getBoundingClientRect` por evento). Remover o hack `setTimeout(500)` de scroll-on-route-change;
  consolidar navegação no `HashLink` + helper `scrollWithOffset`/Lenis.
- **Deletar `src/components/NavLink.tsx`** (compat wrapper não usado — confirmar via grep antes).

## 8. Seções de conteúdo

- **Education (`Education.tsx`):** corrigir os certificados Python e Angular — hoje apontam
  para `/placeholder-certificado.jpg` (inexistente + leading slash quebra em subpath). Usuário
  fornecerá as imagens; ligar em caminho **relativo** `certificados/cert-python.jpg` e
  `certificados/cert-angular.jpg` (padrão dos demais). Polir a timeline (dots/linha/cards).
- **Footer (`Footer.tsx`):** de linha de agradecimento → footer real: marca + tagline curta,
  **nav rápida** (#sobre/#projetos/#educacao/#contato), **ícones sociais** (reusar GitHub/LinkedIn),
  botão **voltar ao topo**, copyright com ano dinâmico.
- **Projects (`Projects.tsx`):** renomear CTA "Acessar Repositório" → **"Ver Projetos"** (rota
  interna, não repo). Refino visual dos cards destaque.
- **About (`About.tsx`):** alinhar o claim "Node.js" com a marquee real de techs; refinar
  espaçamento. Avatar/contexto reaproveitável se fizer sentido.
- **Contact (`Contact.tsx`):** garantir o form bonito no light; adicionar **click-to-copy** no
  e-mail. E-mail público: manter `arturbrasileiro00@gmail.com` (salvo correção do usuário).

## 9. Higiene de produção (defeitos)

- **`package.json` `homepage`:** trocar o placeholder por
  `https://Artur-Brasileiro.github.io/Portfolio` (consistente com `base: "/Portfolio/"` do Vite).
- **Imagens pesadas:** converter `projeto_deauther.jpg` (~4.5MB), `projeto_espectro.jpg`
  (~3.2MB), `projeto_sensorluz.jpg` (~2.9MB) — e auditar outras multi-MB — para **WebP**
  otimizado, com `width`/`height` e `loading=lazy`. Método: script Node com `sharp`
  (via `npx`). **Risco de tooling externo:** se `sharp`/conversor não rodar no ambiente, o
  passo é reportado e os caminhos ficam prontos p/ troca manual (não silenciar).
- **`GhostCursor`:** **remover** (rAF perpétuo sem `reduced-motion`, cor hardcoded
  `rgba(0,255,200)`, `.jsx` num codebase TS; lê como datado). O spotlight da Aurora já segue o
  cursor com elegância. Remover import/mount em `App.tsx`, deletar o arquivo e limpar referências
  comentadas em `Index.tsx`. (Reversível se o usuário pedir p/ manter.)
- **`ScrollReveal.tsx`:** deletar (duplicata pesada do `Reveal`, sem `reduced-motion`, com
  `willChange` permanente). Migrar usos para `Reveal` (localizar via grep).
- **`ModelViewer.tsx`:** parar `autoRotate` sob `prefers-reduced-motion`; pausar render quando
  fora do viewport (IntersectionObserver → `frameloop="demand"` quando invisível) p/ poupar GPU.
- **Limpeza:** remover comentários de dev committados (`ProjectsPage.tsx`, `NotFound.tsx`),
  o comentário obsoleto "Macropad como primeiro item" (é o último), e código morto.

## 10. Assets que o usuário fornece (build não bloqueia — há fallback)

1. `public/avatar.jpg` — foto/avatar do hero (fallback: monograma "AB").
2. `public/certificados/cert-python.jpg` e `public/certificados/cert-angular.jpg`.
3. Confirmação do e-mail público (default mantido: `arturbrasileiro00@gmail.com`).

## 11. Critérios de sucesso

- Toggle de tema funciona, persiste, sem flash; **ambos** os temas legíveis (contraste ≥ AA)
  e visualmente polidos (cards com profundidade, onda do hero correta nos dois).
- Hero exibe avatar (ou fallback), ícones sociais e copy nova; sem glyphs poluídos; parallax e
  reduced-motion intactos.
- Nenhuma imagem quebrada em nenhum clique (certificados corrigidos).
- `npm run build` passa; `npm run lint` sem novos erros; sem regressão de TypeScript.
- Imagens de projeto < ~500KB cada (ou reportado se o tooling falhar).
- `GhostCursor`, `ScrollReveal`, `NavLink` removidos; navbar unificada; scroll-spy via IO.
- Sem comentários de dev/código morto; `homepage` correta.
- Verificação visual real via `npm run dev` (não só build), conforme limitação conhecida do
  preview do harness.

## 12. Mapa de mudanças por arquivo (referência)

- `src/index.css` — reescrever `:root`/`.dark` (inverter), light polido, elevação, dot-grid util,
  tokens de onda theme-aware, z-index util.
- `tailwind.config.ts` — `boxShadow` (elevação), eventuais utilidades de tipografia/z-index.
- `src/App.tsx` — `ThemeProvider` (next-themes); remover `GhostCursor`.
- `src/components/Navbar.tsx` — unificar; `navItems`+`NavLinks`; IO scroll-spy; botão de tema.
- `src/components/ThemeToggle.tsx` — **novo** (sol/lua).
- `src/components/Hero.tsx` — avatar, sociais, copy, decoração curada, scroll cue, onda token.
- `src/components/Avatar*` — **novo** componente de avatar com fallback monograma.
- `src/components/Education.tsx` — certificados Python/Angular.
- `src/components/Footer.tsx` — footer real.
- `src/components/Projects.tsx` — label CTA, refino de cards.
- `src/components/About.tsx` — claim Node.js, espaçamento.
- `src/components/Contact.tsx` — light, click-to-copy.
- `src/components/ModelViewer.tsx` — reduced-motion + frameloop/IO.
- `src/lib/motion.ts` — tokens de duração/ease/spring.
- `src/pages/Index.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/NotFound.tsx` — limpeza.
- **Deletar:** `src/components/GhostCursor.jsx`, `src/components/ScrollReveal.tsx`,
  `src/components/NavLink.tsx`.
- `package.json` — `homepage`.
- `public/` — imagens WebP otimizadas; `avatar.jpg`, `certificados/cert-python.jpg`,
  `certificados/cert-angular.jpg` (fornecidos pelo usuário).

## 13. Riscos

- **Tooling de imagem** (`sharp`) pode não rodar no ambiente Windows; mitigação: reportar e
  deixar caminhos prontos (não silenciar).
- **Light mode** exige cuidado de contraste em superfícies vidro/blur que foram desenhadas p/
  dark; revisar cada seção no light.
- **Onda do hero theme-aware** via CSS em `<stop>` precisa de teste nos dois temas.
- **Verificação:** preview do harness pausa rAF/JS; validar via `npm run dev` real + estilos
  computados (memória `preview-raf-hidden`).
