# Migração do Integra para o Design System

| Versão | Atualizado em |
|--------|---------------|
| 1      | 09/09/2026    |

Registro do levantamento feito sobre o código-fonte do **Integra** (sistema de
gestão interna da Planejar, stack Laravel/Vue) durante a construção do
`@planejar/design-system`, e das decisões tomadas a partir dele.

Este documento é separado do `README.md` de propósito: o design system **não é**
uma migração do Integra, e o README descreve o pacote como ele é hoje. O material
abaixo, por outro lado, continua útil **para o próprio Integra** — é o inventário
do que existe lá, do que é dívida técnica de UI e do que precisa mudar caso o
Integra venha a adotar o design system.

> O design system é uma **reconstrução**: os valores estruturais (raios, sombras,
> layout) foram extraídos do código-fonte real do Integra, os componentes foram
> implementados do zero em React corrigindo os problemas identificados aqui, e a
> cor de marca, o cinza institucional e a tipografia seguem o
> [Guia de Utilização da Marca](../../../brand/Guia%20de%20Utilização%20da%20Marca.md)
> (**Edição 2026 · v2.0**) — não o que estava hardcoded no Integra original.

## 1. O que foi mantido (identidade visual herdada do Integra)

- **Raio de card padrão**: `8px` — era, disparado, o valor mais repetido no
  código-fonte.
- **Sombra de card**: o "preto azulado" `rgba(15, 23, 42, *)`, usado em todas as
  variações de sombra do sistema original, consolidado em 3 níveis.
- **Destaque de item ativo/marca**: sombra interna vermelha à esquerda
  (`inset 3px 0 0 #B53437`), usada em menus e linhas de destaque.
- **Estrutura do layout**: barra de destaque no topo, sidebar colapsável, header
  fixo — mesma composição visual do layout principal do Integra.
- **Realce semântico de linhas de tabela** (pendente / aprovado / erro),
  reproduzindo o padrão do `SiplanDataGrid`.

O que **não** foi herdado do Integra e veio do manual da marca: cor primária
(`#B53437`), cinza institucional (`#767778`, no lugar do slate-blue genérico
`#667085`/`#94a3b8`, que não tinha relação com a marca), paleta ampliada,
tipografia e escala tipográfica.

## 2. Vícios de implementação/UX encontrados e não reproduzidos

Cada linha é, ao mesmo tempo, o diagnóstico de uma dívida técnica **ainda
presente no Integra** e a decisão correspondente adotada no design system.

| Problema no Integra original | Decisão no design system |
|---|---|
| Zero tokens de design — ~1750 cores em `#hex` hardcoded, repetidas por tela | Tokens formais em `src/tokens.css` (`--color-*`, `--radius-*`, `--shadow-*`, etc.) |
| 3 sistemas de botão coexistindo (PrimeVue `Button`, `<button>` com `style=` inline, Bootstrap `btn btn-*` legado) — inclusive o botão de logout do header usando `style=` inline | Um único componente `Button` com variantes fixas |
| 30+ classes `*-card` duplicadas (`.metric-card`, `.hig-card`, `.summary-card`, ...), cada uma com CSS levemente diferente | `Card`, `SectionCard`, `MetricCard` — três componentes cobrem os casos de uso |
| ~120 usos de `!important` para vencer CSS de terceiros ou conflitos globais | Nenhum `!important` nos componentes — escopo de CSS por classe própria (`pds-*`) |
| Dark mode via extensão de terceiros (`darkreader`) + patches manuais brigando com as cores hardcoded | Tema real via `[data-theme="dark"]` sobrescrevendo os tokens |
| 18 valores de breakpoint diferentes, escolhidos "à mão" por tela, sem relação com os breakpoints do Tailwind | Um único breakpoint de referência (768px) resolvido via CSS (`AppShell.css`), documentado em `--breakpoint-*` |
| Comportamento "é mobile" recalculado em JavaScript (`windowWidth < 768`) a cada resize, duplicando o que o CSS já resolveria | Responsividade via CSS grid + media query, sem JS de layout |
| Árvore de navegação inteira do sistema hardcoded dentro do componente de layout | `AppShell`/`Sidebar` recebem `navItems` por prop |
| Duas linguagens visuais coexistindo sem ponte (legado AdminLTE/Bootstrap/azul vs. novo Vue/PrimeVue/vermelho) | Design system único, sem herdar o legado |
| `font-weight` fora de escala (750, 650, 800/900 usados livremente) | Escala fechada nos pesos autorizados pelo guia: 300/400/500/700/900 (SemiBold 600 não é autorizado — `--font-weight-semibold` fica como alias depreciado de Medium) |
| Vermelhos "primos" ad-hoc para estados de erro/alerta, sem relação com a escala de marca | Paleta semântica fixa (`--color-danger`, `--color-warning`, `--color-success`, `--color-info`), independente da escala de marca |

## 3. Padrões de UX a evitar em novos designs

Levantamento feito sobre a tela de detalhe de tarefa (modal `TAREFA #19688`).
Diferente da tabela anterior, estes **não têm componente que os resolva** no
design system — são diretrizes para orientar os próximos designs, tanto no
Integra quanto em ferramentas novas.

| Problema observado | Diretriz para novos designs |
|---|---|
| Cabeçalho do modal ocupa mais de uma linha e mistura informação de uso geral (título, abertura, criador) com informação técnica de interesse só do desenvolvedor (hash/comando git, ícones de plataforma) — tudo competindo pelo mesmo espaço fixo | Cabeçalho compacto, uma linha só, com apenas o que é útil para todos os perfis; informação técnica de desenvolvedor fica escondida atrás de uma ação explícita (menu, tooltip, ícone "copiar comando"), não exposta por padrão |
| As abas internas (Tarefa / Anexo / Checklist / Fluxograma / Atendimentos / Histórico) somem ao rolar a tela para baixo, porque não são solidárias ao cabeçalho | Abas fixas, ancoradas ao cabeçalho (sticky), sempre visíveis independente do scroll do conteúdo |
| As abas atuais são links em estilo pouco unificado e com altura maior que o necessário | Um único componente de abas, mais compacto (menor altura), com estilo consistente entre todos os itens |
| A tela é dividida em duas colunas (lado esquerdo / lado direito) dentro do modal, e o conjunto de conteúdo gera rolagem vertical na área principal — em especial o bloco de "Histórico da Alteração" (comentário + checklists de aviso), que ocupa espaço permanente mesmo sendo relevante só no momento de salvar | Modais de detalhe/edição não devem depender de rolagem vertical no corpo principal; conteúdo que só é relevante no momento de confirmar a ação (ex.: histórico/comentário de alteração) deve migrar para um modal de confirmação separado, aberto ao clicar em "Salvar" |

## 4. Implicações para o Integra

Se e quando o Integra adotar o design system, a ordem de menor risco é:

1. **Tokens primeiro.** Publicar `src/tokens.css` no Integra e substituir os
   `#hex` hardcoded por `var(--color-*)`, tela a tela. Isso já resolve tema
   escuro nativo e elimina a dependência do `darkreader`.
2. **Botão.** Convergir os três sistemas de botão para um só antes de mexer em
   qualquer outro componente — é o de maior repetição e menor risco de regressão
   visual.
3. **Cards.** Reduzir as 30+ classes `*-card` aos três papéis (`Card`,
   `SectionCard`, `MetricCard`).
4. **Layout.** `AppShell`/`Sidebar`/`Header` por último: exige extrair a árvore
   de navegação hardcoded para dados.

Os componentes deste pacote são React. Para o Integra (Vue), o caminho realista
de curto prazo é consumir **tokens e CSS**, não os componentes — foi o mesmo
caminho adotado no SIPLAN-v2, que vendoriza os tokens por não ter pipeline de
build para o CSS legado (ver [tema escuro](../design-system/tema-escuro.md), §11).
