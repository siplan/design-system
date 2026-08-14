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
o [Guia de Utilização da Marca](brand/Guia%20de%20Utilização%20da%20Marca.md) —
não o que estava hardcoded no Integra original.

## O que foi mantido (identidade visual)

- **Cor de marca**: vermelho `#B51D22` (HEXA/RGB/CMYK oficiais do Guia de
  Utilização da Marca), escala 50–950 derivada desse valor-base por mistura
  com branco/preto.
- **Cinza institucional**: `#77787B` (Guia de Utilização da Marca) — usado
  como base para texto secundário, bordas e superfícies neutras, no lugar do
  slate-blue genérico (`#667085`/`#94a3b8`) que não tinha relação com a
  marca.
- **Tipografia**: `Roboto` como fonte principal e `Lucida Sans Unicode` como
  apoio, ambas do Guia de Utilização da Marca — o app consumidor deve carregar
  "Roboto" (Google Fonts ou self-hosted) para que a pilha resolva a família
  correta.
- **Raio de card padrão**: `8px` (era, disparado, o valor mais repetido no
  código-fonte).
- **Sombra de card**: o "preto azulado" `rgba(15, 23, 42, *)` usado em todas
  as variações de sombra do sistema original, consolidado em 3 níveis.
- **Destaque de item ativo/marca**: sombra interna vermelha à esquerda
  (`inset 3px 0 0 #B51D22`), usada em menus e linhas de destaque.
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
| `font-weight` fora de escala (750, 650, 800/900 usados livremente) | Escala fechada: 400/500/600/700 |
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
