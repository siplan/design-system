# Tema Escuro — Design System

| Versão | Atualizado em |
|--------|---------------|
| 6      | 30/09/2026    |

Guia de cor, contraste e uso do tema escuro do `@planejar/design-system`.
Ativado por `data-theme="dark"` no elemento raiz — os tokens de `src/tokens.css`
se sobrescrevem e todo componente `pds-*` acompanha, sem provider React nem
wrapper de tema.

Este documento é a contraparte, no pacote de origem, do guia mantido no SIPLAN-v2
(`docs/design/tema-escuro-design-system.md`). O SIPLAN-v2 vendoriza estes tokens
por não ter pipeline de build para consumir o pacote no CSS legado; foi lá que os
valores abaixo foram calibrados na prática, e daí voltaram para cá (§11).

> Toda cor abaixo é mostrada em `#hex` e `rgb()` lado a lado — em visualizadores
> que suportam amostra de cor (ex.: GitHub), um quadrado colorido aparece
> automaticamente ao lado de cada valor.

## 1. Paleta de marca

Rampa vermelho-institucional derivada do valor oficial do
[Guia de Utilização da Marca](../../../brand/Guia%20de%20Utilização%20da%20Marca.md)
(**Edição 2026 · v2.0** — `#B53437`, que substituiu o `#B51D22` da edição 2022).
É a mesma do tema claro — o escuro reaproveita a marca, não cria uma nova.

| Tom | Claro | Escuro | Uso |
|---|---|---|---|
| Marca 50 | `#fbf5f5` `rgb(251, 245, 245)` | `#321a1c` `rgb(50, 26, 28)` | Fundo de destaque discreto (item ativo de menu, hover de variante `outline`) |
| Marca 100 | `#f8ebeb` `rgb(248, 235, 235)` | `#481b1d` `rgb(72, 27, 29)` | Glow de foco do `Input` |
| Marca 200 | `#efd2d3` `rgb(239, 210, 211)` | — | Degrau intermediário claro |
| Marca 300 | `#e4b4b5` `rgb(228, 180, 181)` | *(mesmo valor)* | No escuro, texto de marca sobre a Marca 50 (`--color-primary-surface-text`) |
| Marca 400 | `#d4898b` `rgb(212, 137, 139)` | `#e7696e` `rgb(231, 105, 110)` | Texto/ícone/borda de destaque sobre fundo escuro (hover, foco, item selecionado) |
| **Marca 500** | `#b53437` `rgb(181, 52, 55)` | *(mesmo valor)* | Vermelho "oficial" da marca — preenchimento sólido de botão/ícone e faixa do topo. **Não usar como cor de texto no escuro** (ver §5) |
| Marca 600 | `#9b2d2f` `rgb(155, 45, 47)` | — | Hover do botão primário (claro) |
| Marca 700 | `#7f2426` `rgb(127, 36, 38)` | — | Degrau intermediário escuro |
| Marca 800 | `#641d1e` `rgb(100, 29, 30)` | — | Degrau intermediário escuro |
| Marca 900 | `#4a1516` `rgb(74, 21, 22)` | — | Degrau intermediário escuro |
| Marca 950 | `#2c0d0d` `rgb(44, 13, 13)` | — | Degrau mais escuro da rampa |

**A Marca 500 nunca muda entre temas.** É o mesmo vermelho institucional nos dois,
e continua sendo o fundo sólido do botão primário e da faixa de destaque do topo.
O que inverte de lado na rampa são os **tokens de papel**, não o valor de marca:

| Token de papel | Claro | Escuro | Papel |
|---|---|---|---|
| `--color-primary-text` | Marca 500 | Marca 400 | Vermelho legível como texto/ícone sobre a superfície |
| `--color-primary-surface-text` | Marca 600 | Marca 300 | Vermelho legível como texto sobre a Marca 50 |

**Histórico da Marca 400 no escuro:** herdava o mesmo tom do degrau 400 do claro (hoje `#d4898b`; degrau
original da rampa, calibrado pro fundo claro). Usuário relatou que o tom lia como
"rosa/salmão" em vez de "vinho" nos pontos onde aparece no escuro (hover e item
ativo do menu, rótulos de formulário) — causa: saturação baixa (51%) daquele
degrau. Corrigido para `#e7696e`, mantendo o mesmo matiz (358°, igual à Marca 500)
e a mesma luminosidade perceptual, com saturação elevada a 72% — igual à saturação
da própria Marca 500. Só o escuro muda: o claro segue com `#d4898b`.

## 2. Superfícies

Camadas de profundidade, do fundo para a frente:

| Camada | Token | Claro | Escuro | Papel |
|---|---|---|---|---|
| Superfície base | `--color-surface` | `#ffffff` `rgb(255, 255, 255)` | `#121212` `rgb(18, 18, 18)` | Fundo padrão de página, card e diálogo |
| Superfície secundária | `--color-surface-muted` | `#f7f7f7` `rgb(247, 247, 247)` | `#1b1b1b` `rgb(27, 27, 27)` | Painéis, `thead` de tabela, fundo do `AppShell`, agrupadores |
| Superfície elevada | `--color-surface-alta` | `#eaecee` `rgb(234, 236, 238)` | `#252525` `rgb(37, 37, 37)` | Estado de hover, foco ou seleção |
| Borda | `--color-border` | `#c9cdd1` `rgb(201, 205, 209)` | `#3c3c3c` `rgb(60, 60, 60)` | Linha divisória entre campos e blocos |
| Borda discreta | `--color-border-muted` | `#eaecee` `rgb(234, 236, 238)` | `#252525` `rgb(37, 37, 37)` | Divisória ainda mais sutil que a borda padrão |

Luminância relativa dos degraus, no escuro: 0,60% → 1,10% → 1,85% → 4,52%.
No claro: 100% → 93,0% → 84,0%. As três superfícies e as duas linhas do tema
claro são cores nomeadas da paleta ampliada do guia (Cinza Muito Claro, Cinza
Claro e Cinza Médio Claro) — antes eram cinzas neutros aproximados por nós.

**Regra de composição:** um componente novo deve subir apenas um degrau de
superfície em relação ao pai — nunca pular direto da base para a camada elevada
sem passar pela secundária.

**`--color-surface-alta` é um token de superfície; `--color-border-muted` não é.**
Antes desta sincronização o hover do botão secundário usava `--color-border-muted`
como fundo — um token de *linha* fazendo trabalho de *superfície*, que só não
quebrava porque no claro os dois valores são próximos. Hover, foco e seleção usam
`--color-surface-alta`.

**Histórico da superfície base:** era `#19191b` `rgb(25, 25, 27)`, um cinza com
leve matiz frio. Trocada para `#121212` `rgb(18, 18, 18)`, cinza neutro puro, a
pedido do usuário — passa a ser a cor padrão principal do tema escuro. As demais
camadas foram recalculadas a partir do novo valor preservando os mesmos degraus de
luminância relativa, para manter a mesma sensação de profundidade.

## 3. Texto

| Nível | Token | Claro | Escuro | Papel |
|---|---|---|---|---|
| Texto principal | `--color-text` | `#242426` `rgb(36, 36, 38)` | `#d8d8db` `rgb(216, 216, 219)` | Título, valor, conteúdo lido ativamente |
| Texto secundário | `--color-text-muted` | `#4a4a4d` `rgb(74, 74, 77)` | `#a8a8ac` `rgb(168, 168, 172)` | Legenda, rótulo de apoio, `th` de tabela |
| **Texto terciário** | `--color-text-subtle` | `#767778` `rgb(118, 119, 120)` | `#737376` `rgb(115, 115, 118)` | Texto desabilitado/mínimo — **não usar para conteúdo ativo** (ver §5) |

Os três níveis do tema claro são exatamente as cores da seção **"Textos e
contrastes"** da paleta ampliada do guia (Edição 2026 · §02.2): Grafite Profundo
(`#242426`), Cinza Carvão (`#4a4a4d`) e o **cinza institucional oficial**
(`#767778`, Pantone Cool Gray 9 C) — nenhum cinza-azulado genérico, e nenhuma
aproximação nossa.

**Mudança na Edição 2026:** o cinza institucional era o texto **secundário** do
tema claro. Ele dá 4,49:1 sobre branco — limítrofe para leitura corrida —, e o
guia passou a nomear explicitamente uma cor para texto secundário (Cinza Carvão,
8,83:1). O institucional desceu um degrau, para o papel de texto terciário/
desabilitado, onde 4,49:1 é folgado.

**Histórico do texto principal no escuro:** era `#ececee` `rgb(236, 236, 238)`,
quase-branco puro. Quando a superfície base escureceu de `#19191b` para `#121212`
(§2), o contraste do texto subiu de 14,88:1 para 15,88:1 **sem o texto ter
mudado** — mais brilho percebido contra um fundo mais escuro, não menos, e
usuários relataram a combinação como cansativa em telas com muito texto (grids).
Trocado para `#d8d8db`, que reduz o contraste para 13,17:1 — ainda bem acima do
AAA (7:1), continua lido como "branco", só sem o excesso de glare.

## 4. Cores semânticas

Cada situação tem uma cor de texto/ícone de alto contraste e um fundo pastel para
usar atrás dela como "chip" (`Badge`) ou realce de linha (`Table`).

| Situação | Texto/ícone — claro | Texto/ícone — escuro | Fundo — claro | Fundo — escuro |
|---|---|---|---|---|
| Erro/perigo | `#b91c1c` `rgb(185, 28, 28)` | `#f87171` `rgb(248, 113, 113)` | `#fef2f2` `rgb(254, 242, 242)` | `#3a1414` `rgb(58, 20, 20)` |
| Alerta | `#b45309` `rgb(180, 83, 9)` | `#fbbf24` `rgb(251, 191, 36)` | `#ffedd5` `rgb(255, 237, 213)` | `#3a2a10` `rgb(58, 42, 16)` |
| Sucesso | `#15803d` `rgb(21, 128, 61)` | `#4ade80` `rgb(74, 222, 128)` | `#dcfce7` `rgb(220, 252, 231)` | `#12321d` `rgb(18, 50, 29)` |
| Informação | `#2563eb` `rgb(37, 99, 235)` | `#60a5fa` `rgb(96, 165, 250)` | `#eff6ff` `rgb(239, 246, 255)` | `#10233a` `rgb(16, 35, 58)` |

No escuro, cada família semântica usa seu degrau "400". Sem isso, um `600`/`700`
sobre fundo quase-preto fica em ~2,5:1 — o mesmo problema sistêmico do vermelho de
marca (§1).

### Erro sólido vs. erro como texto

Os dois papéis divergem no escuro e têm tokens separados:

| Token | Claro | Escuro | Papel |
|---|---|---|---|
| `--color-danger` | `#b91c1c` | `#f87171` | Cor de **texto/ícone** de erro sobre superfície, e cor de `Badge`/borda de campo inválido |
| `--color-danger-solid` | `#b91c1c` | `#b91c1c` | **Preenchimento sólido** com texto claro em cima (botão `danger`) |
| `--color-danger-solid-hover` | `#991b1b` | `#7f1d1d` | Hover do preenchimento sólido |

O escuro precisa dos dois porque `#f87171` com `color: #fff` em cima dá 1,9:1 —
ilegível. E o hover do sólido fica na **mesma família semântica**: antes caía em
`--color-primary-700` (o vinho da marca), o que escurecia mas trocava a cor de
"perigo" pela cor de "marca" no meio da interação.

## 5. Contraste e acessibilidade

Todas as combinações abaixo foram medidas pela fórmula de contraste da WCAG 2.1,
no tema escuro, com a superfície base `#121212`.

**Aprovadas sem ressalva** — atingem AA ou acima para texto de qualquer tamanho:

| Combinação | Sobre base | Sobre secundária | Sobre elevada |
|---|---|---|---|
| Texto principal `#d8d8db` | 13,17:1 | 12,11:1 | 10,78:1 |
| Texto secundário `#a8a8ac` | 7,91:1 | — | 6,47:1 |
| Marca 400 `#e7696e` | 5,93:1 | 5,45:1 | 4,85:1 |
| Erro `#f87171` | 6,77:1 | — | 5,88:1 (sobre o próprio fundo pastel) |
| Alerta `#fbbf24` | 11,22:1 | — | 8,28:1 (idem) |
| Sucesso `#4ade80` | 10,75:1 | — | 8,04:1 (idem) |
| Informação `#60a5fa` | 7,37:1 | — | 6,24:1 (idem) |
| `#fff` sobre Marca 500 (botão primário) | 5,98:1 | — | — |
| `#fff` sobre erro sólido `#b91c1c` | 6,47:1 | — | — |
| Marca 300 sobre Marca 50 | 8,84:1 | — | — |

**Duas ressalvas a respeitar:**

1. **Texto terciário** (`#737376`, 3,96:1) tem contraste reduzido — aprovado
   apenas para texto grande ou elementos de interface, **não para texto normal de
   leitura**. É o nível certo para "desabilitado", errado para qualquer conteúdo
   que o usuário precise ler ativamente.
2. **Marca 500** (`#b53437`, 3,13:1 sobre a base) passa o mínimo de 3:1 para
   elemento gráfico/UI, mas fica **muito abaixo dos 4,5:1 de texto** sobre fundo
   escuro. Fica restrita a preenchimento sólido (com texto claro em cima), borda
   ou detalhe decorativo — **nunca como cor de letra**. Quando o efeito desejado é
   "vermelho de destaque legível", o tom correto é a Marca 400
   (`--color-primary-text` resolve isso automaticamente por tema).

   *(Na edição 2022 da marca esse número era 2,82:1 — o vermelho novo, menos
   saturado, subiu para 3,13:1 e passou a atender o mínimo de UI. A regra de uso
   não muda: segue proibido como cor de texto no escuro.)*

A borda entre campos (`#3c3c3c`, 1,70:1) tem contraste propositalmente baixo — é
só uma linha divisória decorativa. Nenhum estado importante (erro, foco, seleção)
depende só da cor da borda para ser percebido: sempre há também uma mudança de
fundo ou de cor de texto/ícone junto.

## 6. Sombras

`--shadow-sm/md/lg` do claro usam o "preto azulado" `rgba(15, 23, 42, *)`. No
escuro, `--shadow-lg` passa a `rgba(0, 0, 0, 0.45)`: sobre fundo quase-preto, uma
sombra a 12% de opacidade simplesmente some e a camada elevada não se separa mais
do fundo. Elevação no escuro se comunica principalmente por **degrau de
superfície** (§2), com a sombra como reforço, não como sinal único.

`--shadow-brand` (o destaque vermelho à esquerda de item ativo, `inset 3px 0 0`)
troca a Marca 500 pela Marca 400 no escuro, junto do glow correspondente — mesmo
motivo da §1.

## 7. Ícones

Ícones desenhados como parte do próprio conteúdo (SVG que herda `currentColor`)
se adaptam automaticamente ao tema escuro. Ícones tratados como imagem fixa
(arquivo de imagem independente) **não** se adaptam sozinhos — precisam de ajuste
por caso ao entrar no escuro, ou continuam com a cor fixa do arquivo, o que pode
deixá-los invisíveis ou destoantes sobre fundo escuro. Para qualquer ícone novo,
preferir sempre o primeiro formato.

## 8. Estados desabilitados

Botão, campo ou widget desabilitado **nunca** deve usar redução de opacidade sobre
a mesma superfície do estado ativo — sobre fundo já escuro, opacidade baixa lava o
conteúdo quase até o invisível, porque uma cor clara a 35–50% sobre um fundo
quase-preto se aproxima do próprio fundo.

### 8.1 O que foi tentado no escuro, e por que saiu

O escuro nasceu reaproveitando o sinal do claro — "afundar, não clarear". Os
dois canais desse sinal foram descartados **por medição**, não por gosto:

| Canal | Contraste real | Por que falha no escuro |
|---|---|---|
| Fundo cai um degrau de superfície | **1,10:1** (`--color-surface-muted` → `--color-surface`) | Abaixo do limiar de percepção humana (~1,2:1 em área grande). E quando o controle fica direto sobre a superfície base, ele perde a **forma**: deixa de parecer botão. |
| Borda vira tracejada | **1,70:1** sobre `--color-surface` (campo) e **1,54:1** sobre `--color-surface-muted` (botão) | O estilo do traço é informação, mas está desenhado num traço que não aparece. A WCAG 1.4.11 pede 3:1 para elemento não-textual que carrega informação — um padrão só é legível se o traço que o forma for legível. |

A causa é estrutural e vale registrar como regra: **no escuro, luminância de
fundo não é um canal viável para comunicar "desabilitado".** A rampa neutra é
curta demais — para chegar a 2:1 contra `--color-surface-muted` o fundo teria
que ir a ~`#4a4a4a`, mais claro que o controle **ativo**, invertendo a
hierarquia e fazendo o desabilitado atrair o olho.

No **claro** os mesmos dois canais são fracos (o tracejado rende 1,27:1 sobre o
branco), mas ali eles somam com um degrau de superfície que é de fato visível.
Por isso **o claro continua com afundar + tracejar**, sem hachura — ver §8.5.

### 8.2 O padrão vigente no escuro: hachura

Descartada a luminância, sobra **textura** — canal exclusivo desse estado, que
cobre a área inteira do controle em vez de 1 px de contorno. As listras têm
contraste local modesto (~1,59:1 na densidade forte), mas um padrão de alta
frequência em área grande é detectável nesse patamar, ao contrário de um bloco
de cor uniforme.

- **Hachura diagonal a 135°**, em dois níveis de branco translúcido:
  `--disabled-hachura` (14%, forte) para controle acionável, e
  `--disabled-hachura-leve` (9%) para campo, que tem valor digitado por trás.
- **Campo permanece na superfície do estado ativo** (`--disabled-surface-field`
  → `--color-surface`) — preserva a forma do controle. **Botão** usa a
  superfície neutra de controle (`--color-surface-muted`), que sobrescreve o
  fundo de todas as variantes: o botão desabilitado deliberadamente deixa de ter
  cor de variante, para não ser confundido com botão de ação primária.
- **Borda perde realce** (`--color-border-muted`) em vez de trocar de estilo.
  Tracejado não é sinal de desabilitado no escuro — e também não sinaliza
  espera transitória, que tem canal próprio (movimento, §8.6).
- **Texto cai para o nível terciário** (`--color-text-subtle`, §3), nunca para o
  principal com opacidade reduzida.
- `cursor: not-allowed` (ou `default`, onde "not-allowed" não faz sentido).
- `opacity: 1` **explícito**: o app consumidor pode embutir o componente num
  contexto (Bootstrap, jQuery UI) que aplicaria opacidade reduzida, e o próprio
  UA aplica `opacity: 0.7` em `<select>:disabled` — os dois lavariam a textura.
- **`background-color` e `background-image` sempre separados**, nunca o shorthand
  `background`, que limparia a hachura. `background-repeat: repeat` também vai
  explícito, apesar de ser o default: um reset ou uma classe de "loading" do
  consumidor com `no-repeat` deixaria a hachura só num canto do controle.

**A hachura é o único sinal do estado no escuro** — assumir isso explicitamente.
Com o fundo igual ao do ativo (campo) e a borda em `--color-border-muted`
(#252525 sobre #121212 ≈ **1,3:1**, mais fraca ainda que o tracejado rejeitado),
a borda não é reforço, é só contorno. Qualquer coisa que apague a textura —
shorthand `background`, opacidade herdada, `filter` — apaga o estado inteiro.

### 8.3 `readonly` não é `disabled`

Campo readonly costuma exibir **valor calculado que o usuário precisa ler**
(total, saldo, código gerado); apagá-lo para o terciário sob hachura forte
trabalha contra a função do campo. O readonly usa a mesma família de sinal, em
intensidade menor: densidade leve, borda sem realce, valor em
`--color-text-muted` (7,91:1 sobre a superfície do campo, contra 3,96:1 do
terciário) e `cursor: default` — o conteúdo continua selecionável.

Duas consequências que valem regra, porque readonly (diferente de disabled)
**recebe foco** e é tabulável:

- O campo readonly precisa manter a borda de foco. A regra de estado tem a mesma
  especificidade da de `:focus` e vem depois no arquivo, então sem um
  `[readonly]:focus` explícito o anel de foco fica pela metade (só o
  `box-shadow`).
- Estado semântico vence estado de edição: `.pds-input--error` mantém a borda de
  perigo mesmo desabilitado, readonly ou em foco. Isso é questão de
  **especificidade**, não de ordem — `.pds-input--error` (0,1,0) perde de
  `[readonly]`/`:disabled`/`:focus` (0,2,0) onde estiver no arquivo.

### 8.4 Onde está aplicado

`Button` (`.pds-button:disabled`, densidade forte) e `Input`
(`.pds-input:disabled` e `.pds-input[readonly]`, densidade leve). Os componentes
não sabem em que tema estão: leem os tokens `--disabled-hachura`,
`--disabled-hachura-leve`, `--disabled-surface-field`, `--disabled-border-color`
e `--disabled-border-style`, que trocam de valor no bloco `[data-theme="dark"]`.

Regras que ainda **não** têm componente neste repositório, e valem para quando
tiver ou para o consumidor:

- **Controles pequenos** (checkbox, radio) são a exceção: em ~13 px não há área
  para o padrão ser lido, e ali o sinal é `filter: grayscale(1)` com a opacidade
  apenas complementando. Implementado hoje só em SIPLAN-v2.
- **Só controle acionável recebe hachura.** Textura em conteúdo que apenas
  *herda* uma classe de estado (célula de cabeçalho de grade, item de lista, nó
  de árvore) enche a tela de ruído. Por isso o consumidor SIPLAN-v2 restringe a
  regra a `button`/`a`/`.ui-button` e deixa o `.ui-state-disabled` genérico do
  jqGrid de fora.
- **Espera transitória não recebe hachura** — `Button` com `loading` ou dentro
  de `[aria-busy="true"]`, `.pds-button--aguardando` e `.pds-input:disabled`
  dentro de `[aria-busy="true"]` têm sinal próprio (§8.6).

### 8.5 Por que o claro não usa hachura (ainda)

Decisão em aberto, registrada de propósito: **a hachura é hoje redefinição
exclusiva do escuro**, e no `:root` claro os tokens `--disabled-hachura*` valem
`none`. Motivo: no claro os canais tradicionais ainda funcionam de forma
aceitável, e mudar o sinal de desabilitado do tema padrão é mudança de aparência
em toda a base consumidora — não é subproduto de uma correção de contraste do
escuro.

Detalhe de implementação que não deve ser "limpado": o valor `none` é
deliberado, e **não** equivale a deixar o token indefinido. Um `var()` sem
fallback que não resolve invalida a propriedade inteira no cálculo do valor
computado, o que zeraria também qualquer `background-image` que o consumidor
tenha posto no controle.

### 8.6 "Aguardando" não é "desabilitado"

Decisão registrada em [ADR 0003](../../adr/0003-espera-transitoria-nao-usa-sinal-de-desabilitado.md).

Muitas telas desabilitam controles só **enquanto esperam algo**: uma requisição
em curso (login trava CPF, senha e botão enquanto verifica as credenciais; um
formulário trava os campos enquanto salva) ou um intervalo fixo (diálogo de
confirmação que só libera o "Sim" depois de alguns segundos, contra clique por
reflexo). Para o CSS isso é o mesmo `:disabled` de um bloqueio por regra de
negócio — e caía na hachura. Errado nos dois sentidos: a hachura diz "você não
pode mexer aqui" quando a mensagem é "espere, já volta", e sendo estática não dá
nenhum sinal de progresso. Um formulário inteiro sob hachura durante o login
parece quebrado, não ocupado.

O canal da espera é **movimento**, que nenhum estado estático do tema usa:

| Espera | Marcação | Sinal |
|---|---|---|
| Duração desconhecida (requisição) | `aria-busy="true"` no controle ou num container ancestral. `Button` faz isso sozinho com a prop `loading` | Brilho translúcido que varre o controle em loop (1,4 s): `--aguardando-brilho` (12%) no botão, `--aguardando-brilho-leve` (7%) no campo |
| Duração conhecida (intervalo fixo) | Classe `pds-button--aguardando` + `--aguardando-duracao` (ex.: `3500ms`) no `style` do botão | Preenchimento (`--aguardando-progresso`, 12%) que avança da esquerda e completa exatamente quando o botão libera — o usuário vê quanto falta |

Nos dois casos: **sem hachura e sem tracejado**, borda sólida em
`--color-border`, texto em `--color-text-muted` (no campo é o valor que o
usuário acabou de digitar e precisa continuar legível) e `cursor: progress`.
O campo volta à superfície do **ativo** (nada está bloqueado); o botão mantém o
fundo neutro do desabilitado, porque a cor da variante de volta o faria parecer
clicável.

- **`aria-busy` é a marcação, não uma classe inventada**: é o atributo de
  acessibilidade para "conteúdo em atualização" — serve ao leitor de tela e ao
  tema ao mesmo tempo. O consumidor põe e tira junto com o `disabled`.
- **Opt-in.** Controle desabilitado fora de `[aria-busy="true"]` continua com a
  hachura — a tela é quem declara que o bloqueio é transitório.
- **`prefers-reduced-motion: reduce`**: as imagens voltam a `none` e a animação
  pausa (`--aguardando-animacao: paused`); ficam o texto secundário e o cursor.
- **No claro** as imagens valem `none`, como a hachura (§8.5): o controle
  aguardando perde o tracejado de desabilitado e fica com borda sólida e texto
  secundário, sem textura. Levar o movimento ao claro é a mesma decisão em
  aberto da §8.5.
- **Keyframes** (`pds-aguardando-brilho`, `pds-aguardando-progresso`) moram em
  `tokens.css`, não no CSS de cada componente: são compartilhados, e
  `tokens.css` é o único arquivo que todo consumidor carrega.
- Duas armadilhas de implementação já pagas no SIPLAN-v2: `animation-play-state`
  precisa vir **depois** do shorthand `animation` (que o reseta); e uma variável
  cujo valor contém `var(--aguardando-duracao)` declarada na raiz resolve **na
  raiz**, não no botão — por isso a duração é lida direto na regra do botão.

## 9. Diretrizes gerais de uso

- Qualquer cor nova em uma tela deve vir da paleta de tokens acima — nunca um tom
  "solto" pensado só para aquela tela.
- Ao propor um ajuste de cor, teste em pelo menos três contextos: fundo de página,
  um painel/bloco secundário, e um estado interativo (hover/foco/seleção). Um
  ajuste que parece certo num só contexto pode falhar nos outros dois.
- Erro, alerta, sucesso e informação nunca devem se misturar — a cor de texto de
  uma situação não deve aparecer sobre o fundo pastel de outra.
- Um problema de cor encontrado em uma tela normalmente se repete em outras — a
  correção ideal é no nível do token ou do componente, não só na tela onde foi
  notado.
- Um componente de UI usado por mais de uma tela deve ter seu CSS num único lugar
  compartilhado, nunca duplicado por tela. Duplicar estilo por view é a forma mais
  comum de uma correção de tema escuro chegar em só uma das telas e nunca ser
  propagada para as outras.
- Onde uma tela precisa de um "chip"/selo de status com mais matizes distinguíveis
  do que as quatro cores semânticas oferecem, é aceitável definir um par
  fundo/texto específico só para o tema escuro daquele componente — desde que
  documentado no próprio arquivo do componente, não espalhado tela por tela.

## 10. Distinguir token de valor: onde mexer

| Você quer mudar… | Mexa em | Não mexa em |
|---|---|---|
| A cor institucional da marca | Nada aqui — é decisão do guia da marca | `--color-primary-500` |
| Qual degrau de vermelho é legível como texto no escuro | `--color-primary-text` no bloco `[data-theme="dark"]` | A rampa 50–950 |
| O quão escuro é o tema escuro | `--color-surface` + recalcular os degraus dependentes (§2) | Componentes |
| A cor de um estado num componente | O token semântico correspondente | `#hex` dentro do CSS do componente |

Nenhum componente `pds-*` contém `#hex` de cor, com uma exceção deliberada:
`color: #fff` sobre os preenchimentos sólidos (`--color-primary-500`,
`--color-danger-solid`), que são escuros nos dois temas e por isso pedem texto
branco fixo — não um token que inverteria com o tema.

## 11. Sincronização com o SIPLAN-v2

O SIPLAN-v2 é o consumidor onde estes valores são exercitados em telas reais e,
na prática, onde a calibragem do escuro aconteceu. O fluxo é de **volta pra cá**:
ajuste validado lá → replicado neste pacote → propagado aos demais consumidores.

- Origem dos valores lá: `public/assets/css/design-system/tokens.css` (vendorizado
  — o SIPLAN-v2 não tem build para consumir o pacote no CSS legado jQuery).
- Escopo lá: somente o tema "Planejar 3.0"
  (`body[data-temasiplan="siplan3.0"][data-theme="dark"]`); os temas legados
  seguem com DarkReader como fallback.
- Guia correspondente lá: `docs/design/tema-escuro-design-system.md`.

Ao sincronizar, comparar os dois arquivos de token e trazer os valores de cor. Dois
cuidados: (a) o SIPLAN-v2 escopa por `body[data-temasiplan=...]`, aqui é
`:root[data-theme="dark"]`; (b) tokens que só existem aqui
(`--color-primary-surface-text`, `--color-primary-100` do escuro, `--shadow-sm/md`,
tipografia, espaçamento, layout, breakpoints) não têm contraparte lá e não devem
ser removidos por ausência.

## 12. Referências

- Tokens de cor (fonte da verdade): `src/tokens.css`
- Aplicação aos componentes: `src/components/*/*.css`
- Guia da marca: [`brand/Guia de Utilização da Marca.md`](../../../brand/Guia%20de%20Utilização%20da%20Marca.md)
- Consumidor e origem da calibragem: SIPLAN-v2 (§11)

## 13. Atualização para a Edição 2026 da marca (25/08/2026)

A nova edição do manual trocou a cor de marca (`#B51D22` → `#B53437`), o cinza
institucional (`#77787B` → `#767778`) e passou a especificar uma **paleta
ampliada** com as cores de superfície, linha e texto.

O que mudou aqui:

- **Rampa da marca** recalculada inteira a partir do novo valor-base, pelos
  mesmos fatores de mistura da rampa anterior — a matiz oficial (358°) é a mesma
  nas duas edições, então só a saturação (72% → 55%) e a luminância dos degraus
  mudaram.
- **Superfícies, bordas e textos do tema claro** passaram a ser os valores
  nomeados do guia (§02.2) em vez de aproximações. Efeito colateral positivo: o
  texto secundário do claro subiu de 4,41:1 para 8,83:1 e o terciário, de 2,40:1
  (reprovado até para UI) para 4,49:1.
- **Tema escuro: nenhum valor alterado.** Todos os degraus daqui são definidos
  por papel e continuam atendendo os mínimos com a cor nova — a Marca 400
  (`#e7696e`) segue coerente porque foi calibrada pela matiz da marca, que não
  mudou. O único número que se moveu é o da Marca 500 sobre a base (2,82:1 →
  3,13:1), e a regra de uso dela não mudou.
