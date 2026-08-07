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
- Sem fontes customizadas — `--font-sans` é stack de sistema (`ui-sans-serif, system-ui, ...`).
  Nenhum `[FONT_MISSING]` no validate.
- `tokens/`, `fonts/`, `guidelines/` ficaram vazios no bundle (tokens já vêm embutidos no CSS
  compilado via `_ds_bundle.css`/`styles.css`; repo não tem `docs/guides/**` nem fontes
  próprias) — normal para este repo, não é uma lacuna a preencher.

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
