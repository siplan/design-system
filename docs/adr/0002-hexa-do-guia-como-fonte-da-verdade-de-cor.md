# ADR 0002 — O HEXA do guia vigente é a fonte da verdade de cor

| Versão | Atualizado em |
|--------|---------------|
| 1      | 09/09/2026    |

**Status:** aceito

## Contexto

A cor de marca deste design system mudou três vezes antes de estabilizar, e
nenhuma das mudanças foi decisão de design — todas foram correção de **qual
fonte consultar**:

1. `#B51D22` — valor inicial, herdado de um preset PrimeVue de aplicação
   existente. Descartado por não ser valor certificado.
2. `#B41E23` — adotado a partir de uma conversão PDF→MD do manual de 2022.
3. `#B51D22` de volta — o PDF do guia oficial trazia esse valor. A extração que
   gerou o `#B41E23` estava errada, e o valor "não certificado" do passo 1 era,
   por coincidência, o correto.
4. `#B53437` — Edição 2026 · v2.0 do guia, que substitui a de 2022. Mudança real
   de marca (mesma matiz, 358°; saturação de 72% para 55%).

No caminho apareceu um segundo tipo de conflito: o próprio PDF declarando
valores incoerentes entre si. A Edição 2026 declarava o cinza institucional como
HEXA `#767778` e RGB `119, 120, 123` — mas esse RGB é o de `#77787B`, o cinza da
edição anterior. Também há divergência entre os contrastes declarados no manual
e o recálculo WCAG 2.1 sobre os hexadecimais dele.

## Decisão

**Ordem de precedência para qualquer valor de cor:**

1. O **HEXA** declarado no PDF do guia vigente. É o único valor que entra em
   `src/tokens.css`.
2. RGB, CMYK e Pantone declarados são **secundários**. Servem para peça gráfica
   e para conferência; quando divergem do HEXA, o HEXA prevalece.
3. Contraste declarado no manual **não** é aceito como dado. Todo par
   texto/fundo é recalculado pela fórmula do WCAG 2.1 sobre os hexadecimais
   reais, e o valor recalculado é o que fica comentado linha a linha em
   `tokens.css`.

**Nenhum valor de cor entra por extração automática de PDF sem conferência
contra a página original.** Foi uma extração PDF→MD malfeita que produziu o
`#B41E23` e custou dois ciclos de correção.

**A rampa 50–950 é derivada, não escolhida.** Ela se obtém do valor-base por
mistura com branco/preto usando fatores fixos. Quando o valor-base muda, a rampa
é recalculada com os mesmos fatores — o que preserva as relações de contraste e
permitiu que a troca de 2022 para 2026 não exigisse retocar o tema escuro.

**Divergência encontrada no PDF-fonte é registrada, não corrigida em silêncio.**
Vai para o Apêndice A de `brand/Guia de Utilização da Marca.md`, com o veredito
adotado. Foi assim que as duas divergências de conteúdo da Edição 2026 chegaram
à Planejar e foram corrigidas no PDF-fonte em 25/08/2026.

## Consequências

- Nenhum componente contém `#hex` de cor: todos consomem `var(--color-*)`. Uma
  troca de valor-base é editada em um arquivo só (`tokens.css`) — foi o que
  tornou as correções acima baratas.
- Trocar de edição do guia exige: recalcular a rampa, recalcular todos os
  contrastes, e reconferir os tokens de papel do tema escuro
  (`--color-primary-text`, `--color-primary-surface-text` — ver
  [tema escuro](../features/design-system/tema-escuro.md), §3 e §10).
- Um valor de cor que apareça apenas em desenho/ilustração do PDF, sem HEXA
  declarado, não vira token.
