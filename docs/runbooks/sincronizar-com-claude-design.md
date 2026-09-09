# Sincronizar o pacote com o claude.ai/design

| Versão | Atualizado em |
|--------|---------------|
| 2      | 09/09/2026    |

Configurações e armadilhas do projeto remoto de design system em
`claude.ai/design`, alimentado por este pacote através da skill `/design-sync`.

Cobre só o que é fato **deste repositório e deste projeto remoto**. O ambiente de
execução da skill (browser headless para captura de preview, diretório de
trabalho `.ds-sync/`) não é dependência do pacote e não é documentado aqui — a
skill responde por isso.

**Projeto remoto:** `f8284aab-f114-4911-9806-95569d12e899`
**Configuração:** `.design-sync/config.json`

## Configuração vigente

| Campo | Valor | Por quê |
|---|---|---|
| `shape` | `package` | o repo não tem Storybook; o sync usa o build do pacote |
| `buildCmd` | `npm run build` | `tsup` |
| `cssEntry` | `dist/index.css` | tokens já vêm compilados aqui |
| `readmeHeader` | `.design-sync/conventions.md` | vai como cabeçalho no projeto remoto |
| `overrides.AppShell` | `cardMode: column`, `viewport: 960x600` | é layout de página inteira (`min-height: 100vh`); o card padrão não o acomoda |

Não há `componentSrcMap`: os componentes exportados em `src/index.ts` são
mapeados 1:1 automaticamente.

## Antes de rodar

1. `npm run build` — o sync lê `dist/`.
2. Conferir se `.design-sync/conventions.md` ainda descreve a API real
   (componentes, props e tokens que ele enumera). É o arquivo que o time vê no
   projeto remoto; drift silencioso ali é pior que arquivo desatualizado no repo.

## Armadilha 1 — não deletar os arquivos remotos que não vêm do bundle

O projeto remoto contém arquivos gerados pelo próprio claude.ai/design
(self-check e canvas), que **não** existem neste repositório:

```
templates/style-guide/**   Canvas.dc.html   CanvasDemo.jsx   support.js
_ds_manifest.json          _adherence.oxlintrc.json          .thumbnail
fonts/l_10646.ttf
```

Não são órfãos de sync anterior. Com a âncora `_ds_sync.json` remota saudável, o
`deletePaths` do plano vem vazio — e isso está certo. Se algum dia vier
populado com esses caminhos, a âncora quebrou; investigar antes de aprovar o
plano.

## Armadilha 2 — as previews só renderizam o tema claro

A captura local não tem como aplicar `data-theme="dark"`. Toda contact sheet e
todo render check exercitam **apenas o tema claro**.

Consequência prática: nenhuma regressão de tema escuro é detectada pelo sync.
Quando a mudança mexe no escuro, validar por fora — renderizar a página com
`data-theme="dark"` e conferir os pares de contraste — antes de sincronizar. Foi
assim que os números do tema escuro foram levantados.

O contrário também vale: conferir na contact sheet que uma mudança feita **para**
o escuro não vazou para o claro (foi o caso da hachura de desabilitado).

## Depois de rodar

- Mudança só de CSS costuma sair `unchanged` nos 10 componentes — API e
  composição não mudaram, só `upload.styling` fica true. Nenhuma preview
  precisa ser re-autorada.
- Mudança em um arquivo de preview altera o `sourceKey` daquele componente (a
  preview é fonte), marca ele como `changed` e pede regrade das células.
- Conferir `list_files` pós-upload.

## Componente novo

Um componente adicionado a `src/index.ts` é pego automaticamente na próxima
sincronização, mas entra **sem preview autorada** (floor card) até que exista
`.design-sync/previews/<Nome>.tsx`. Autorar a preview compondo o componente em
uso plausível — `Input` dentro de `Card`, por exemplo, não em `<div>` nu — e
usando `var(--color-*)`, nunca `#hex`, no CSS da própria preview.
