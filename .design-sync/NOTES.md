# Notas de sync — Integra Design System

## Ambiente

- Repo sem Storybook → shape `package`. Build via `npm run build` (tsup), entry
  `./dist/index.js`, css `dist/index.css`.
- Playwright: cache local já tinha chromium build 1228 (`~/.cache/ms-playwright/chromium-1228`).
  Instalado `playwright@1.61.1` em `.ds-sync/node_modules` para casar com esse build (evita
  re-download de ~200MB). Se o cache mudar, reconferir `playwright-core/browsers.json` da
  versão instalada contra o build cacheado antes de reinstalar.
- Todos os 10 componentes exportados em `src/index.ts` foram mapeados 1:1 pelo conversor
  (`componentSrcMap` não precisou de override).

## Escopo de preview

Autoria completa (opção "todos os 10") na primeira sincronização — sem floor cards. Render
check limpo (`bad: 0`) e todas as 10 previews graduadas `good` já na primeira rodada; nenhuma
iteração de correção foi necessária.

## Grupos

O conversor agrupou `Header`/`Sidebar` em `appshell` e os outros 8 (incl. `AppShell`) em
`general`, a partir da estrutura de pastas (`src/components/AppShell/*`). Não há `docsDir`
no repo — nenhum `.md`/`.mdx` por componente — os `.prompt.md` foram sintetizados a partir do
JSDoc + `.d.ts` + preview autorada.

## Conhecido / observado

- `Card`/`SectionCard`/`MetricCard`: diferença visual entre `elevation="flat"` e `"elevated"`
  (`--shadow-sm` vs `--shadow-md`) é sutil no screenshot a este tamanho de render — os tokens
  estão corretamente aplicados, é só um floor de renderização. Não é um bug de preview.
- Sem provider/tema — nenhum componente lê contexto React; nenhuma entrada `cfg.provider`
  foi necessária.
- `tokens/`, `fonts/`, `guidelines/` ficaram vazios no bundle (tokens já vêm embutidos no CSS
  compilado via `_ds_bundle.css`/`styles.css`; repo não tem `docs/guides/**` nem fontes
  próprias) — normal para este repo, não é uma lacuna a preencher.
- **[FONT_MISSING] resolvido**: as duas fontes citadas em `--font-sans` agora estão embutidas
  como `@font-face` em `src/fonts.css` (importado por `src/index.ts` antes de `tokens.css`).
  `Roboto` (subset latin, variável 400–700 + itálico 400) foi baixada oficialmente do Google
  Fonts — licença Apache 2.0, arquivo em `src/fonts/roboto/LICENSE.txt`, copiado para
  `dist/Roboto-LICENSE.txt` no build. `Lucida Sans Unicode` veio de um `.ttf` licenciado
  fornecido pelo usuário (extraído de instalação Windows), convertido para `.woff2` via
  `fonttools`; é fonte **proprietária** — ver restrições de uso em
  `src/fonts/lucida-sans-unicode/NOTICE.md` (copiado para `dist/LucidaSansUnicode-NOTICE.md`).
  O tsup/esbuild já resolve os `url()` do CSS automaticamente (copia os `.woff2` para `dist/`
  com hash no nome, sem config extra além do `onSuccess` em `tsup.config.ts` que copia as
  licenças). `cfg.extraFonts` não foi necessário.

## Rework de tokens (Manual da Marca Planejar 2022)

Depois da sincronização inicial, os tokens de cor e a tipografia foram refeitos com base no
`brand/manual-da-marca-2022.md` (copiado para o repo a pedido do usuário):

- Cor de marca oficial `#B41E23` (era `#B51D22`, herdada do preset PrimeVue do Integra —
  praticamente igual, mas não o valor certificado). Escala 50–950 recalculada a partir desse
  hex.
- Cinza institucional `#77787B` (Pantone 418 U) substituiu o slate-blue genérico em texto/
  borda/superfície neutra.
- Tipografia: `--font-sans` passou a citar `Roboto` (principal) e `Lucida Sans Unicode`
  (apoio), as duas famílias do manual — ver nota de `[FONT_MISSING]` acima.
- Tema escuro **refeito do zero** (a pedido explícito do usuário — o anterior era arbitrário):
  cada par texto/fundo foi calculado pela fórmula de contraste do WCAG 2.1 (luminância
  relativa), não por "achismo visual". A cor de marca (`--color-primary-500`) continua
  idêntica nos dois temas — o que muda é *qual degrau da própria rampa* faz o papel de texto
  sobre fundo escuro (500 direto dava só 2.6:1; o tema escuro usa 400/300 pra esse papel,
  ≥5.9:1). Dois tokens novos foram introduzidos por isso — `--color-primary-text` e
  `--color-primary-surface-text` — e usados em `Button.css` (`.ids-button--outline`) e
  `AppShell.css` (`.ids-nav__item--active`) no lugar dos degraus fixos que estavam
  hardcoded ali. As cores semânticas (danger/warning/success/info) tinham o mesmo problema
  de contraste no fundo escuro (~2.5:1) e foram corrigidas do mesmo jeito (degrau mais claro
  da família, ≥5.9:1) mesmo sem terem sido pedidas explicitamente — é o mesmo bug sistêmico.
- Validado renderizando via Chromium headless com `data-theme="dark"` fora do fluxo do
  design-sync (script descartável em `/tmp`, não faz parte do pipeline) antes deste sync —
  os números de contraste acima já vêm de lá, não é só teoria.

Nenhum desses tokens está exercitado nas previews atuais especificamente em modo escuro — o
design-sync não tem hoje um jeito de capturar `data-theme="dark"` nas previews (elas sempre
renderizam claro). Se o pane do claude.ai/design expuser alternância de tema no futuro, vale
reconferir visualmente lá.

## Re-sync risks

- Se novos componentes forem adicionados a `src/index.ts`, a próxima sync os pega
  automaticamente (nenhum `componentSrcMap` manual em uso) — mas vão entrar sem preview
  autorada (floor card) até serem autorados em `.design-sync/previews/<Name>.tsx`.
- `AppShell` tem override `cardMode: column` + `viewport: 960x600` em `cfg.overrides` porque é
  um layout de página inteira (grid `min-height: 100vh`) — se o layout do componente mudar
  de estrutura, reconferir se o viewport ainda é adequado.
- README.md do repo (raiz) tem uma seção "Padrões de UX a evitar em novos designs" adicionada
  a pedido do usuário, documentando problemas de UX observados no Integra original (fora do
  escopo dos componentes deste pacote) — é conteúdo vivo, mantê-lo ao expandir o design system.
- `.design-sync/conventions.md` documenta a API por props (não é sistema de classes
  utilitárias) — se um componente futuro introduzir classes CSS públicas, atualizar a seção
  de estilização.
- Qualquer novo componente que use `var(--color-primary-500)` (ou outro degrau fixo da
  escala) diretamente como cor de *texto* ou *borda de estado* deve, em vez disso, usar
  `--color-primary-text`/`--color-primary-surface-text` (ou criar um par análogo) — senão o
  tema escuro herda o mesmo problema de contraste (~2.6:1) que motivou a introdução desses
  tokens em `Button.css`/`AppShell.css`.
