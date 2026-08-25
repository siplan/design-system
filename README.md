# Integra Design System

Biblioteca de componentes React que consolida a identidade visual do
**Integra** (sistema de gestão interna da Planejar) em tokens e componentes
reutilizáveis — para servir de base a novas ferramentas, inclusive fora da
stack Laravel/Vue do Integra.

Este pacote **não é uma migração do código do Integra**. É uma reconstrução:
os valores estruturais (raios, sombras, layout) foram extraídos do
código-fonte real do Integra, os componentes foram implementados do zero
em React corrigindo os problemas de implementação e de UX identificados no
levantamento, e a cor de marca, o cinza institucional e a tipografia seguem
o [Guia de Utilização da Marca](brand/Guia%20de%20Utilização%20da%20Marca.md)
(**Edição 2026 · v2.0**) — não o que estava hardcoded no Integra original.

## O que foi mantido (identidade visual)

- **Cor de marca**: vermelho `#B53437` (HEXA/RGB/CMYK/Pantone oficiais do Guia
  de Utilização da Marca, edição 2026), escala 50–950 derivada desse
  valor-base por mistura com branco/preto.
- **Cinza institucional**: `#767778` (edição 2026, Pantone Cool Gray 9 C) —
  no lugar do slate-blue genérico (`#667085`/`#94a3b8`) que não tinha relação
  com a marca.
- **Paleta ampliada**: as 13 cores nomeadas do guia (complementares,
  temáticas, de apoio e de texto) viraram tokens — os neutros de superfície,
  borda e texto do design system agora **são** os valores do manual, não
  aproximações.
- **Tipografia**: `Roboto` como fonte principal e `Lucida Sans Unicode` como
  apoio, ambas embutidas no pacote (`src/fonts.css`), com os cinco pesos
  autorizados pelo guia (Light 300 → Black 900) e a escala de texto/entrelinha
  da hierarquia tipográfica (§03.4).
- **Raio de card padrão**: `8px` (era, disparado, o valor mais repetido no
  código-fonte).
- **Sombra de card**: o "preto azulado" `rgba(15, 23, 42, *)` usado em todas
  as variações de sombra do sistema original, consolidado em 3 níveis.
- **Destaque de item ativo/marca**: sombra interna vermelha à esquerda
  (`inset 3px 0 0 #B53437`), usada em menus e linhas de destaque.
- **Estrutura do layout**: barra de destaque no topo, sidebar colapsável,
  header fixo — mesma composição visual do layout principal do Integra.
- **Realce semântico de linhas de tabela** (pendente / aprovado / erro),
  reproduzindo o padrão do `SiplanDataGrid`.

## O que foi corrigido (vícios de implementação/UX, não reproduzidos)

| Problema no Integra original | Decisão aqui |
|---|---|
| Zero tokens de design — ~1750 cores em `#hex` hardcoded, repetidas por tela | Tokens formais em `src/tokens.css` (`--color-*`, `--radius-*`, `--shadow-*`, etc.) |
| 3 sistemas de botão coexistindo (PrimeVue `Button`, `<button>` com `style=` inline, Bootstrap `btn btn-*` legado) — inclusive o botão de logout do header usando `style=` inline | Um único componente `Button` com variantes fixas |
| 30+ classes `*-card` duplicadas (`.metric-card`, `.hig-card`, `.summary-card`, ...), cada uma com CSS levemente diferente | `Card`, `SectionCard`, `MetricCard` — três componentes cobrem os casos de uso |
| ~120 usos de `!important` para vencer CSS de terceiros ou conflitos globais | Nenhum `!important` nos componentes — escopo de CSS por classe própria (`ids-*`) |
| Dark mode via extensão de terceiros (`darkreader`) + patches manuais brigando com as cores hardcoded | Tema real via `[data-theme="dark"]` sobrescrevendo os tokens |
| 18 valores de breakpoint diferentes, escolhidos "à mão" por tela, sem relação com os breakpoints do Tailwind | Um único breakpoint de referência (768px) resolvido via CSS (`AppShell.css`), documentado em `--breakpoint-*` |
| Comportamento "é mobile" recalculado em JavaScript (`windowWidth < 768`) a cada resize, duplicando o que o CSS já resolveria | Responsividade via CSS grid + media query, sem JS de layout |
| Árvore de navegação inteira do sistema hardcoded dentro do componente de layout | `AppShell`/`Sidebar` recebem `navItems` por prop |
| Duas linguagens visuais coexistindo sem ponte (legado AdminLTE/Bootstrap/azul vs. novo Vue/PrimeVue/vermelho) | Design system único, sem herdar o legado |
| `font-weight` fora de escala (750, 650, 800/900 usados livremente) | Escala fechada nos pesos autorizados pelo guia: 300/400/500/700/900 (SemiBold 600 não é autorizado — `--font-weight-semibold` fica como alias depreciado de Medium) |
| Vermelhos "primos" ad-hoc para estados de erro/alerta, sem relação com a escala de marca | Paleta semântica fixa (`--color-danger`, `--color-warning`, `--color-success`, `--color-info`), independente da escala de marca |

## Padrões de UX a evitar em novos designs (identificados no Integra original)

Levantamento feito sobre a tela de detalhe de tarefa (modal `TAREFA #19688`).
Diferente da tabela anterior, estes ainda não têm componente que os resolva
neste design system — são diretrizes para orientar os próximos designs
construídos com estes componentes.

| Problema observado | Diretriz para novos designs |
|---|---|
| Cabeçalho do modal ocupa mais de uma linha e mistura informação de uso geral (título, abertura, criador) com informação técnica de interesse só do desenvolvedor (hash/comando git, ícones de plataforma) — tudo competindo pelo mesmo espaço fixo | Cabeçalho compacto, uma linha só, com apenas o que é útil para todos os perfis; informação técnica de desenvolvedor fica escondida atrás de uma ação explícita (menu, tooltip, ícone "copiar comando"), não exposta por padrão |
| As abas internas (Tarefa / Anexo / Checklist / Fluxograma / Atendimentos / Histórico) somem ao rolar a tela para baixo, porque não são solidárias ao cabeçalho | Abas fixas, ancoradas ao cabeçalho (sticky), sempre visíveis independente do scroll do conteúdo |
| As abas atuais são links em estilo pouco unificado e com altura maior que o necessário | Um único componente de abas, mais compacto (menor altura), com estilo consistente entre todos os itens |
| A tela é dividida em duas colunas (lado esquerdo / lado direito) dentro do modal, e o conjunto de conteúdo gera rolagem vertical na área principal — em especial o bloco de "Histórico da Alteração" (comentário + checklists de aviso), que ocupa espaço permanente mesmo sendo relevante só no momento de salvar | Modais de detalhe/edição não devem depender de rolagem vertical no corpo principal; conteúdo que só é relevante no momento de confirmar a ação (ex.: histórico/comentário de alteração) deve migrar para um modal de confirmação separado, aberto ao clicar em "Salvar" |

## Conformidade com o manual da marca (Edição 2026 · v2.0)

O que do guia **está** nos tokens:

| Capítulo do guia | Como aparece aqui |
|---|---|
| §02.1 Cores institucionais | `--color-primary-500` (`#B53437`) e `--color-text-subtle` (`#767778`) |
| §02.2 Paleta ampliada | `--color-accent-*` (bordô, azul-grafite, verde, dourado), `--color-surface-areia` / `-off-white` / `-branco-suave`, e os neutros de superfície/borda/texto |
| §02.4 Contraste | todo par texto/fundo dos dois temas conferido pela fórmula do WCAG 2.1; os valores estão comentados linha a linha em `src/tokens.css` |
| §03.1–03.2 Tipografia | `--font-sans` + `src/fonts.css` (Roboto variável 100–900, Lucida Sans Unicode, Arial como substituta de sistema) |
| §03.4 Hierarquia | `--text-xs` a `--text-3xl`, `--leading-title` / `-subtitle` / `-body` / `-caption`, `--tracking-label` |
| §04.2 Iconografia | `--icon-size` (24px), `--icon-stroke` (2px), `--icon-padding` (2px) |

O que do guia **não** entra no design system, e por quê:

- **Cursiva Vanilla Macchiato (§03.3)** — o guia restringe o uso a destaque
  editorial curto (kicker de capa, chamada de seção). Não tem papel em
  interface, e a fonte não está licenciada/embutida neste pacote.
- **Grafismos de apoio (§04.1)** — faixa de eixo, elipse inclinada, trama e
  barras de ritmo são elementos de peça gráfica, não de UI. Se um app quiser
  usá-los, deve fazê-lo com os `--color-accent-*`, respeitando a área de
  proteção da marca.
- **Proporção de uso 40/20/10/30 (§02.3)** — é diretriz de composição de
  peça, não algo que um token possa impor. Vale como orientação: **o vermelho
  é acento, não plano de fundo padrão**.
- **Assinaturas, área de proteção e redução mínima (§01)** — regras sobre os
  arquivos da marca. O pacote não embute o logotipo; use sempre os arquivos
  originais fornecidos pela Planejar.

Duas divergências do próprio PDF foram identificadas e estão registradas no
[Apêndice A do guia](brand/Guia%20de%20Utilização%20da%20Marca.md#apêndice-a--divergências-e-erros-do-pdf-original):
o RGB declarado para o cinza institucional não corresponde ao HEXA (prevalece
o HEXA) e alguns contrastes declarados divergem do recálculo WCAG (sem mudar
nenhum veredicto, exceto vermelho sobre areia, que só passa em texto grande).

## Componentes

- `Button` — variantes `primary` / `secondary` / `outline` / `danger` / `ghost`; tamanhos `sm` / `md` / `lg`.
- `Card`, `SectionCard`, `MetricCard` — blocos de conteúdo.
- `Badge` — pills de status semânticas.
- `Table` — tabela com realce de linha semântico.
- `Input` — campo de formulário com label e erro.
- `AppShell`, `Sidebar`, `Header` — layout principal da aplicação.

## Uso

```bash
npm install
npm run build
```

```tsx
import { Button, Card, AppShell } from '@planejar/integra-design-system'
import '@planejar/integra-design-system/styles.css'
```

## Próximos passos possíveis

- Rodar a skill `/design-sync` sobre este pacote para publicar os
  componentes no `claude.ai/design` e prototipar telas da nova ferramenta
  já usando essa identidade visual.
- Ampliar a cobertura de componentes conforme a nova ferramenta precisar
  (ex.: modais, seletor de data, upload de arquivo).
