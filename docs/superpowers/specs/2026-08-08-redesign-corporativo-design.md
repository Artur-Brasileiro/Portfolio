# Redesign corporativo — portfólio Artur Brasileiro

**Data:** 2026-08-08
**Base:** commit `5692338`
**Objetivo:** trocar por completo a estética do portfólio por uma linguagem corporativa
enterprise em tema claro, preservando 100% do conteúdo existente.

## Decisões

| Eixo | Decisão |
|---|---|
| Registro visual | Enterprise / consultoria — neutros frios, cards com borda, seções numeradas, densidade média |
| Cor de destaque | Azul corporativo `#1D4ED8` |
| Tipografia | Inter em toda a interface (Space Grotesk sai) |
| Movimento | Enxuto: reveals sutis e transição de página; tilt, parallax, aurora, marquee e magnetic saem |
| Currículo | Sem botão (não existe PDF no projeto) |
| Faixa de métricas | Entra, com números derivados dos dados já existentes |

## Sistema de design

### Cor

Neutros em **slate** (cinza frio). Cinza puro lê como wireframe; slate lê como
software corporativo.

```
--background          0 0% 100%       branco
--surface             210 40% 98%     faixas de seção alternadas
--card                0 0% 100%
--border              214 32% 91%     hairline padrão
--foreground          222 47% 11%     títulos
--muted-foreground    215 16% 47%     corpo
--primary             224 76% 48%     #1D4ED8
--primary-foreground  0 0% 100%
--ring                224 76% 48%
--radius              0.5rem
```

Contrastes verificados sobre `--background`:

- `--foreground` → 17.4:1 (AAA)
- `--muted-foreground` → 6.3:1 (AA em qualquer tamanho)
- `--primary` → 6.7:1 (AA em qualquer tamanho)

Sombras tingidas de slate, nunca preto puro — sombra preta suja tema claro:

```
--shadow-sm  0 1px 2px hsl(215 25% 27% / .06)
--shadow-md  0 4px 12px hsl(215 25% 27% / .08)
--shadow-lg  0 12px 32px hsl(215 25% 27% / .10)
```

O `tailwind.config.ts` atual referencia `--shadow-sm/md/lg`, `--shadow-glow`,
`--gradient-primary`, `--gradient-hero` e as sete variáveis de `sidebar` que
**nunca foram definidas** no CSS. `shadow-soft-md` e `hover:shadow-glow` são
no-ops silenciosos hoje. Todas passam a existir ou são removidas do config.

### Tipografia

Inter, quatro pesos (400/500/600/700). Escala fixa:

```
display   clamp(2.5rem, 5vw, 3.75rem)    700   tracking -0.03em
h2        clamp(1.75rem, 3vw, 2.5rem)    600   tracking -0.02em
h3        1.25rem                        600
eyebrow   0.75rem  600  UPPERCASE  tracking 0.14em  cor primary
body      1rem / 1.7                     400   muted-foreground
mono      períodos, fases e IDs (stack do sistema)
```

### Motivo estrutural: rails

1px vertical nas bordas do container em `lg+`, atravessando todas as seções.
Produz a leitura de documento técnico em vez de landing page — é o detalhe que
separa o resultado de um template Tailwind genérico.

## Arquitetura

### Dados (novo)

O conteúdo hoje vive hardcoded dentro do JSX. Extrair para módulos tipados
garante que o redesign não perca conteúdo por acidente e deixa os componentes
com responsabilidade única de apresentação.

- `src/data/profile.ts` — identidade, tagline, bio, localização, formação,
  stack agrupada por domínio, métricas, links sociais, e-mail
- `src/data/projects.ts` — projetos em destaque + catálogo completo
  (`programacao` com subseções, `hardware`) + timeline do Macropad
- `src/data/education.ts` — formação acadêmica e certificações

### Primitivos de layout (novo)

- `src/components/layout/Section.tsx` — `<section>` com `id`, variante de fundo
  (`white` | `muted`), padding vertical padrão e rails
- `src/components/layout/SectionHeader.tsx` — eyebrow numerada, `h2` e lead

### Estrutura da home

```
Navbar          branca sólida, border-b, sempre visível (inclusive nas rotas
                internas). Monograma AB + nome | links | CTA "Fale comigo"

Hero            2 colunas. Esquerda: chip de status, h1, lead, 2 CTAs, sociais.
                Direita: retrato emoldurado 4/5 com borda e sombra

Faixa métrica   4 colunas sobre surface, border-y, CountUp discreto

01 SOBRE        narrativa + ficha técnica chave-valor; stack em 3 cards por
                domínio no lugar de 10 pílulas soltas

02 PROJETOS     3 cards com borda, imagem no topo, badge, tags, rodapé de links

03 FORMAÇÃO     tabela-timeline: período em mono à esquerda, conteúdo à direita,
                hairlines separando

04 CONTATO      canais em lista com borda + formulário de campos encaixotados

Footer          4 colunas + barra inferior com copyright e voltar-ao-topo
```

Campo com sublinhado é linguagem editorial; corporativo usa campo encaixotado
com borda e fundo branco.

### Páginas internas

- `/programacao` e `/hardware` — breadcrumb, cabeçalho com eyebrow, mesma
  linguagem de card da home
- `/projeto/macropad` — sai a paleta neon (`bg-purple-500/10`,
  `text-yellow-400/500`, `border-yellow-500/50`, `shadow-[0_0_15px_rgba(234,179,8,.4)]`,
  `text-green-500`). Entra um par semântico único: **azul** = concluído/em
  progresso, **slate** = planejado. O `ModelViewer` 3D permanece, com moldura nova
- `NotFound` — hoje usa a classe `gradient-text`, que não existe em lugar nenhum

## Escopo de arquivos

**Criados (5)**
`src/data/profile.ts`, `src/data/projects.ts`, `src/data/education.ts`,
`src/components/layout/Section.tsx`, `src/components/layout/SectionHeader.tsx`

**Reescritos (17)**
`index.html`, `src/index.css`, `tailwind.config.ts`, `src/App.tsx`,
`src/components/{Navbar,Hero,About,Projects,Education,Contact,Footer,ProfileAvatar,CertificateModal}.tsx`,
`src/components/motion/Reveal.tsx`,
`src/pages/{Index,ProjectsPage,NotFound}.tsx`,
`src/pages/projetos-destaque/MacropadPage.tsx`

**Apagados (7)** — código morto confirmado por grep, sem uso externo
`src/components/ThemeToggle.tsx`,
`src/components/motion/{Aurora,TiltCard,Parallax,MagneticButton,Marquee}.tsx`,
`src/components/motion/usePointerParallax.ts`

**Mantidos**
`Reveal`, `SmoothScroll`, `PageWrapper`, `CountUp`, `ModelViewer`,
`useLenisLock`, todo o `src/components/ui/` (shadcn).

`App.tsx` mantém o `ThemeProvider` com `forcedTheme="light"` — removê-lo
quebraria `ui/sonner.tsx`, que consome `useTheme()`.

## Conteúdo a preservar (checklist de verificação)

- Bio: os três parágrafos da seção Sobre
- Formação: UEMG, Engenharia da Computação, 2021—2026; Ituiutaba, MG
- Stack: JavaScript, TypeScript, React, Next.js, Python, C++, Linux, Git,
  Arduino, Raspberry Pi
- Destaques: ViewCongresso, EnglishUp, Macropad Inteligente
- Catálogo software: Introdução IA, Perceptron Reconhecedor, Algoritmo KNN,
  ViewCongresso, EnglishUp, Portfólio Professor de Inglês, Chatbot com React,
  Gerenciamento Familiar, Análise de Dados PRF, Web Scraping Simples,
  Relação Idade x Pressão
- Catálogo hardware: Analisador de Espectro de Áudio, Deauther Didático,
  Monitor de Luminosidade, Macropad Inteligente — com vídeos do YouTube
  (`9tUq1hGooeE`, `kmqZ7n9kF94`, `rBSG0NzcMFI`) e descrições longas
- Certificações: Python/Udemy 2022, C#/DIO 2025, JavaScript/DIO 2025,
  React/Udemy 2025, Angular/Udemy 2024 — com as imagens em `public/certificados/`
- Macropad: as 5 fases da timeline, o `.glb` e as fotos
- Contato: `arturbrasileiro00@gmail.com`, endpoint Formspree `xyzokkee`,
  GitHub e LinkedIn

## Verificação

`npm run lint` e `npm run build` limpos; conferência item a item do checklist
acima contra o commit `5692338`; contrastes calculados na tabela de cor.
