# Design System da Planejar

| Versão | Atualizado em |
|--------|---------------|
| 2      | 09/09/2026    |

## Em uma frase

Existe um pacote — `@planejar/design-system` — que traduz o Guia de
Utilização da Marca (Edição 2026 · v2.0) em variáveis CSS e componentes React
prontos, para que nenhuma tela precise decidir de novo qual vermelho, qual
fonte, qual raio ou qual sombra usar.

## O problema que ele resolve

A decisão visual não tinha onde morar. Sem um lugar canônico, cada tela
reimplementa a marca por conta própria — e o levantamento feito sobre o Integra
mostra o resultado acumulado:

| O que foi encontrado | Escala |
|---|---|
| Cores em `#hex` escritas direto no código | ~1750 ocorrências |
| Sistemas de botão coexistindo na mesma aplicação | 3 (PrimeVue, `style=` inline, Bootstrap legado) |
| Classes `*-card` duplicadas, cada uma com CSS ligeiramente diferente | 30+ |
| `!important` para vencer conflito de CSS | ~120 |
| Valores de breakpoint distintos, escolhidos tela a tela | 18 |
| Tema escuro | via extensão de terceiros (`darkreader`) + patches manuais |

Nenhum desses itens é errado isoladamente. Somados, são o custo de não ter uma
camada onde a decisão fique.

## O que é um design system

Não é uma biblioteca de componentes, nem um manual de marca — é a camada entre
os dois. O manual define cor, tipografia e proporção como **intenção**; o design
system as fecha como **decisões nomeadas e versionadas** que o código consome
sem reinterpretar.

Três camadas, e você pode parar em qualquer uma:

1. **Tokens** — 119 variáveis CSS (`--color-primary-500`, `--radius-card`,
   `--shadow-2`, `--text-lg`). São a fonte da verdade.
2. **Componentes** — React, sem nenhum valor literal: todo componente lê tokens.
3. **Diretrizes** — o que os componentes ainda não impõem, mas o time segue.

## O que você ganha ao adotar

- **Marca correta por construção.** Cor primária `#B53437`, cinza institucional
  `#767778`, paleta ampliada e tipografia (`Roboto` + `Lucida Sans Unicode`,
  embutidas) vêm do guia oficial — não de aproximação por captura de tela.
- **Tema escuro de graça.** Um atributo no `<html>` (`data-theme="dark"`) e
  pronto. Sem provider, sem wrapper, sem extensão de terceiros.
- **Acessibilidade já conferida.** Todo par texto/fundo dos dois temas foi
  verificado pela fórmula do WCAG 2.1, com o valor comentado linha a linha nos
  tokens. Estado desabilitado não depende só de cor.
- **Convivência com CSS legado.** Toda classe é prefixada `pds-*`. Nenhum
  `!important`, nenhum seletor global — o pacote não briga com o que já existe
  na sua tela.
- **TypeScript.** Todos os componentes exportam seus tipos.

## Componentes disponíveis hoje

`Button` (5 variantes, 3 tamanhos) · `Card`, `SectionCard`, `MetricCard` ·
`Badge` · `Table` (com realce semântico de linha) · `Input` ·
`AppShell`, `Sidebar`, `Header`.

O conjunto é intencionalmente pequeno: cobre o que já foi necessário. Ampliar é
esperado — modal, abas, seletor de data e upload de arquivo já estão mapeados
como próximos.

## Como adotar — três níveis

**1. Só os tokens (recomendado para base legada).** Se o projeto não consegue
consumir o pacote npm — CSS legado, Blade/Vue sem bundler que alcance
`node_modules` —, importe apenas o arquivo de tokens:

```css
@import 'src/tokens.css';
```

Você já ganha marca, escala tipográfica e tema escuro sem tocar em componente
nenhum. Foi o caminho do SIPLAN-v2, que vendoriza os tokens.

**2. Tokens + componentes (projeto React novo).**

```bash
npm install
npm run build
```

```tsx
import { Button, Card, AppShell } from '@planejar/design-system'
import '@planejar/design-system/styles.css'
```

**3. Migração gradual de sistema existente.** A ordem de menor risco está
documentada: tokens primeiro, depois botão, depois cards, layout por último. O
caminho específico do Integra está em
[`docs/features/integra/migracao-para-o-design-system.md`](../integra/migracao-para-o-design-system.md).

## Regras para quem for contribuir

- **Nenhum valor literal em componente.** Faltou token? Cria o token — não
  escreve o `#hex`.
- **Token novo se justifica pelo guia da marca** ou por um papel semântico
  ausente, nunca por preferência de uma tela.
- **Sem `!important`, sem seletor global.** Tudo sob o prefixo `pds-*`.
- **Contraste conferido nos dois temas** antes de propor cor nova.
- **Documentação em `docs/`**, com cabeçalho de versão.

## Onde olhar

| Documento | Para quê |
|---|---|
| `README.md` do repositório | referência técnica do pacote: tokens, componentes, uso, escopo |
| [Tema escuro](tema-escuro.md) | paleta, contraste e regras de uso do `data-theme="dark"` |
| [Guia de Utilização da Marca](../../../brand/Guia%20de%20Utilização%20da%20Marca.md) | manual oficial, Edição 2026 · v2.0 |
| [`docs/adr/`](../../adr/) | decisões de arquitetura: fontes embutidas, precedência de valores de cor |
| [Migração do Integra](../integra/migracao-para-o-design-system.md) | levantamento, dívidas de UI e ordem de adoção |

## O que pedimos do time

1. **Projeto novo:** usar o pacote desde o primeiro commit.
2. **Projeto existente:** avaliar a adoção só de tokens — é barata e reversível.
3. **Faltou componente:** abrir a demanda em vez de recriar localmente. O
   objetivo é que a segunda tela que precisar dele já o encontre pronto.
