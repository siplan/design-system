# Notas de sync — Integra Design System

## Ambiente

- Repo sem Storybook → shape `package`. Build via `npm run build` (tsup), entry
  `./dist/index.js`, css `dist/index.css`.
- Playwright: cache local já tinha chromium build 1228 (`~/.cache/ms-playwright/chromium-1228`).
  Instalado `playwright@1.61.1` em `.ds-sync/node_modules` para casar com esse build (evita
  re-download de ~200MB). Se o cache mudar, reconferir `playwright-core/browsers.json` da
  versão instalada contra o build cacheado antes de reinstalar.
  **Atualização (13/08/2026):** o cache da máquina migrou para o build `1234`
  (`chromium-1234`/`chromium_headless_shell-1234`; o `1228` não estava mais presente — cache é
  compartilhado com outras sessões/repos, não é exclusivo deste). `playwright@1.61.1` (pinado em
  `1228`) passou a falhar com `Executable doesn't exist`. Resolvido instalando
  `playwright@1.62.1`, cujo `browsers.json` pina `1234` — confirmado batendo a revisão contra
  `https://raw.githubusercontent.com/microsoft/playwright/v<X.Y.Z>/packages/playwright-core/browsers.json`
  antes de instalar. Reconferir de novo se o cache mudar outra vez.
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

## Re-sync (10/08/2026) — correção de contraste no tema escuro

Bug reportado pelo usuário via screenshots do claude.ai/design: `.ids-card` e os containers
do `AppShell` (`.ids-shell`, `.ids-shell__header`, `.ids-shell__sidebar`, `.ids-shell__main`)
definiam `background-color` a partir dos tokens de tema mas nunca `color` — conteúdo livre
(children/ReactNode sem classe própria, ex. `<strong>Integra</strong>` no slot do Header, ou
`<p>` dentro de Card/MetricCard/SectionCard) ficava sem cor de texto declarada e herdava o
preto padrão do host; no tema claro isso coincidia por acaso com o token certo, no escuro
virava texto escuro sobre fundo escuro. Corrigido adicionando `color: var(--color-text)`
nesses seletores em `Card.css` e `AppShell.css`. Resync rodado após o fix: os 10 componentes
saíram `unchanged` na verificação (API/render hash inalterados — é ajuste de CSS, não de
composição), só `upload.styling` foi true; nenhuma preview precisou ser re-autorada/re-gradeada.

## Re-sync (10/08/2026) — mesmo bug, agora em `Input`

Segundo round reportado pelo usuário: o label de `Input` (`.ids-field__label`) também ficava
sem contraste no escuro — mas causa raiz diferente da anterior. `.ids-field` nunca teve
`background-color` própria (correto: um campo de formulário não deveria virar uma caixa opaca
só por existir), então o label fica "nu" sobre o que estiver ao redor. O bug de fundo é mais
geral ainda: o design system nunca definia um par `background-color`/`color` de base para a
própria página — qualquer texto solto direto no `body` (fora de Card/AppShell, que já pareiam
os dois) herdava `--color-text` sem que o fundo da página tivesse acompanhado a troca de tema.
Corrigido em duas frentes:
- `tokens.css`: regra base em `body { background-color: var(--color-surface); color:
  var(--color-text); font-family: var(--font-sans); }` — cobre qualquer texto direto na página,
  não só o que está dentro dos nossos componentes de superfície.
- `.design-sync/previews/Input.tsx`: as 3 variantes passaram a compor `Input` dentro de `Card`
  (composição real mais comum — form dentro de card) em vez de `<div>` nu, então a preview
  também reflete um uso plausível. Isso mudou o `sourceKey` do `Input` (preview é fonte), então
  o resync marcou `Input` como `changed` e pediu regrade — as 3 células (`Padrao`, `ComErro`,
  `Desabilitado`) foram regradadas `good` a partir do sheet em claro (único modo que a captura
  local testa; ver nota "Conhecido/observado" no topo do arquivo sobre dark nunca ser
  exercitado nas previews).

## Correção de extração — Pantone do vermelho ausente no MD (11/08/2026)

O `brand/manual-da-marca-2022.md` (conversão PDF→MD) omitia o código Pantone
do vermelho de marca — trazia só `PANTONE 418 U` (o do cinza), dando a
impressão de que a paleta tinha um único Pantone. Os valores HEXA/RGB/CMYK já
estavam corretos (batem com o PDF original e com `src/tokens.css`); o gap era
só a linha do Pantone do vermelho (`18-1553 TCX`, nome "Adrenaline Rush"), que
existe no PDF (slide "Paleta de cores") mas não tinha sido transcrita. MD
refeito do PDF (agora com a paleta em tabela, HEXA/CMYK/RGB/Pantone das duas
cores lado a lado) e a lacuna foi replicada em `README.md` (bullet da cor de
marca) e no comentário de `src/tokens.css` — nenhum dos dois citava o Pantone
do vermelho. Nenhum valor de token de cor mudou (hex/rgb/cmyk já estavam
certos); é correção de documentação, não de design.

## Correção da cor de marca — Guia de Utilização da Marca (13/08/2026)

O usuário trouxe um novo `brand/Guia de Utilização da Marca.pdf` (versão mais
recente do manual, indicada pela agência como correção de uma versão
anterior). A página "Paleta de cores" desse guia traz o vermelho como HEXA
`#B51D22` / RGB `181, 29, 34` / CMYK `20, 98, 90, 12` — **diferente** do
`#B41E23` que este design system vinha usando desde o rework de tokens
registrado acima ("Rework de tokens (Manual da Marca Planejar 2022)").

Isso inverte a decisão anterior: naquele rework, `#B51D22` tinha sido
descartado por ser "herdado do preset PrimeVue do Integra, não o valor
certificado", e `#B41E23` (de uma extração de PDF do manual 2022) foi
adotado como oficial. O guia atualizado mostra que essa leitura estava
errada — `#B51D22` é o valor correto, e por coincidência é exatamente o que
já estava hardcoded no Integra original.

Alterado:
- `src/tokens.css`: `--color-primary-500` de `#b41e23` para `#b51d22`; toda a
  escala 50–950 recalculada a partir do novo valor-base usando os mesmos
  percentuais de mistura com branco/preto do rework anterior (mesma
  metodologia, só a base mudou). `--shadow-brand` (claro e escuro) e os
  comentários de contraste WCAG também atualizados — os graus de contraste
  ficaram praticamente idênticos (a matiz nova é quase igual à antiga), então
  os mesmos tokens de papel (`--color-primary-text` = degrau 400,
  `--color-primary-surface-text` = degrau 300) continuam válidos no tema
  escuro.
- `brand/manual-da-marca-2022.md`: reescrito a partir do novo PDF — tabela de
  paleta corrigida, nota explícita sobre a inversão de valor, nota sobre
  Pantone (o guia atual não lista códigos Pantone; os antigos foram mantidos
  só como referência histórica não confirmada), e crédito final atualizado
  (o guia assina como "Institucional Comunicação", sem contato — a versão
  anterior citava "Maui Comunicação" com e-mail/telefone).
- `README.md`: mesmas referências de cor de marca corrigidas.

Cinza institucional (`#77787B`), tipografia (Roboto/Lucida Sans Unicode),
raios, sombras e cores semânticas **não mudaram** — o novo guia confirma os
mesmos valores para essas partes; a única correção de fato é o vermelho de
marca.

Nenhum componente tinha o hex antigo hardcoded fora de `tokens.css` (todos
consomem `var(--color-primary-*)`), então a correção não exigiu mudança em
nenhum `.tsx`/`.css` de componente. Rodar `npm run build` e um novo
`/design-sync` para propagar a cor corrigida às previews publicadas em
claude.ai/design, já que elas foram capturadas com o hex antigo.

## Renomeação do manual da marca (13/08/2026)

A pedido do usuário, `brand/manual-da-marca-2022.md` foi renomeado para
`brand/Guia de Utilização da Marca.md` (mesmo nome do PDF-fonte,
`brand/Guia de Utilização da Marca.pdf`) e reescrito sem nenhuma referência
à versão/nome antigos — o conteúdo é a transcrição atual do guia, sem notas
de "correção" ou histórico de versões anteriores (essas notas foram
descartadas a pedido do usuário; o histórico de por que a cor mudou continua
registrado só aqui no NOTES.md, na entrada "Correção da cor de marca" acima).
Referências atualizadas em `README.md`, `src/tokens.css` e `src/fonts.css`.

## Nova edição do manual da marca — Edição 2026 · v2.0 (25/08/2026)

O usuário entregou `brand/Guia de Utilização da Marca - 082026.pdf` (29 páginas,
produzido em PowerPoint pela Comunicação | Institucional da Planejar), que
**substitui** o manual de 2022 (`Manual da Marca.cdr`, agência Institucional
Comunicação). O PDF antigo foi removido do repositório e
`brand/Guia de Utilização da Marca.md` foi reescrito como transcrição integral
do novo — incluindo **descrição analisada de cada página ilustrada** (diagramas
de construção, grade da área de proteção, amostras de cor, exemplos de
aplicação), a pedido do usuário, para que as regras que só existem no desenho
continuem recuperáveis a partir do `.md`.

### O que a marca mudou

| Item | 2022 | 2026 · v2.0 |
|---|---|---|
| Vermelho | `#B51D22` (S 72%) | **`#B53437`** (S 55%) · Pantone 7628 UP |
| Cinza institucional | `#77787B` · Pantone 418 U | **`#767778`** · Pantone Cool Gray 9 C |
| Paleta | só as duas cores obrigatórias | + **13 cores nomeadas** (complementares, temáticas, apoio, textos) |
| Tipografia | 2 famílias, sem pesos | mesmas 2 famílias + **pesos autorizados** (Light→Black), hierarquia 40/44 · 24/29 · 16/26 · 13/20 · 12, e a cursiva **Vanilla Macchiato** para destaque editorial |
| Novidades | — | símbolo isolado, grafismos de apoio, iconografia (24px/2px), tom de voz, acessibilidade (WCAG), proporção de uso 40/20/10/30 |

A matiz do vermelho **não** mudou (358° nas duas edições) — só a saturação. Foi
isso que permitiu manter o tema escuro intacto.

### O que mudou no design system

- `src/tokens.css`: rampa da marca 50–950 recalculada do novo valor-base pelos
  mesmos fatores de mistura da rampa anterior; superfícies/bordas/textos do tema
  claro trocados pelos valores **nomeados** do guia (§02.2) em vez das
  aproximações que estavam lá; novos tokens `--color-accent-*`,
  `--color-surface-areia`/`-off-white`/`-branco-suave`, escala tipográfica
  (`--text-caption`, `--text-3xl`, `--leading-*`, `--tracking-label`), pesos
  (`--font-weight-light`/`-black`) e grade de ícone (`--icon-*`).
- `src/fonts.css`: `font-weight` do `@font-face` do Roboto de `400 700` para
  `100 900` — o arquivo variável sempre cobriu 100–900, e a declaração curta
  fazia o navegador **sintetizar** Light e Black em vez de usar as instâncias
  reais. Agora que o guia autoriza esses dois pesos, isso passou a importar.
- `--font-weight-semibold` (600) **depreciado**: não é peso autorizado. Virou
  alias de Medium; os três usos internos migraram para `-medium` (Button, Badge)
  e `-bold` (título de Card).
- Ganho colateral de acessibilidade no tema claro: texto secundário de 4,41:1
  para **8,83:1**, terciário de 2,40:1 (reprovado até para UI) para **4,49:1**.
- **Tema escuro: nenhum valor alterado**, conforme decisão do usuário — os
  degraus são definidos por papel e continuam atendendo os mínimos com a cor
  nova. Só um número se moveu: Marca 500 sobre a base, de 2,82:1 para 3,13:1
  (passou a atender o mínimo de 3:1 para UI; segue proibida como cor de texto).

### Erros do PDF novo (registrados, não corrigidos em silêncio)

O Apêndice A do `.md` lista tudo. Os dois que importam para quem consome o
manual:

1. **Uso incorreto nº 03** diz "NÃO usar a Marca na posição **vertical**", o que
   contradiz a pág. 05 ("a versão vertical é a assinatura preferencial"). A
   edição 2022 trazia a regra certa: a restrição é sobre a **horizontal**.
2. **RGB do cinza institucional** declarado como `119, 120, 123`, que é o RGB de
   `#77787B` (edição anterior), não de `#767778` (`118, 119, 120`). **Prevalece
   o HEXA** — foi o que entrou nos tokens.

Também há divergência entre os contrastes declarados no manual e o recálculo
WCAG 2.1 sobre os próprios hexadecimais dele. Nenhum veredicto muda, exceto
**vermelho sobre areia**: o manual agrupa em 5,7:1, mas o par real dá 4,39:1 —
abaixo do mínimo para texto corrido. Em digital, só texto grande.

### Sync concluído (25/08/2026)

`/design-sync` rodado: driver de re-sync (`resync.mjs`) com âncora
`_ds_sync.json` remota — 9 componentes carried-forward (`unchanged`), só
`Sidebar` mudou (preview `.tsx` trocou `border: '1px solid #e5e7eb'` hardcoded
por `var(--color-border)`, cotejando com a nova rampa neutra §02.2). Render
check 10/10 limpo, célula `ComItemAtivo` regradada `good` (item ativo já
mostra o vermelho `#b53437`). Caminho atômico (projeto já tinha conteúdo de
sync anterior): plano com writes completos e `deletePaths: []`, 60 arquivos
enviados + sentinel + `_ds_sync.json` por último. `list_files` pós-upload
confere. Projeto: `https://claude.ai/design/p/f8284aab-f114-4911-9806-95569d12e899`.

### Amaury corrigiu o PDF-fonte (25/08/2026, mesmo dia)

O Amaury atualizou `brand/Guia de Utilização da Marca - 082026.pdf` depois do
sync acima — comparei texto extraído (`pdftotext`) da versão anterior (staged
no git) contra a nova; só duas linhas mudaram, exatamente as duas
contradições de conteúdo que o Apêndice A do `.md` tinha sinalizado:

1. **Uso incorreto nº 03 (pág. 28)** — corrigido de "NÃO usar a Marca na
   posição vertical" para "Usar a Marca na posição horizontal apenas em
   condições especiais". Coerente com o resto do manual agora.
2. **RGB do cinza institucional (pág. 14)** — corrigido de `119, 120, 123`
   (RGB da edição 2022) para `118, 119 120` (RGB correto de `#767778`, só que
   sem a vírgula entre o 2º e o 3º número — typo cosmético, não vale reportar
   de volta).

Nenhuma imagem/diagrama mudou (conferido visualmente na pág. 28 — as 4
miniaturas de violação continuam as mesmas). `Guia de Utilização da
Marca.md` foi atualizado: as duas divergências saíram de "erro pendente" para
uma seção "Corrigidos pela Planejar em 25/08/2026" no Apêndice A, com o texto
do corpo já refletindo a versão nova. README.md também ajustado. **Não** foi
necessário nenhum novo `/design-sync` — nada nos tokens/cores/tipografia
mudou, só prosa do manual.

Ainda pendente no PDF (não urgente, é rótulo de diagrama): a legenda "N = a
Full hiltura de P" na pág. 08 segue dizendo "altura de P" em vez de "n".

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
  tema escuro herda o mesmo problema de contraste (3,13:1 com a cor da edição 2026 — passa
  o mínimo de UI, mas fica longe dos 4,5:1 de texto) que motivou a introdução desses
  tokens em `Button.css`/`AppShell.css`.
