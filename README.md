# Planejar Design System

`@planejar/design-system` — biblioteca de tokens e componentes React que
materializa a identidade visual da Planejar em código, para servir de base a
qualquer ferramenta nova, dentro ou fora da stack atual.

## O que é um design system (e o que não é)

Um design system não é uma biblioteca de componentes nem um manual de marca — é
a **camada intermediária entre os dois**. O manual define cor, tipografia e
proporção como intenção; o design system traduz isso em decisões fechadas,
nomeadas e versionadas, que o código consome sem reinterpretar.

Na prática, três camadas:

1. **Tokens** — as decisões de design como variáveis CSS (`--color-primary-500`,
   `--radius-card`, `--shadow-2`, `--text-lg`). São a fonte da verdade. 119
   tokens em `src/tokens.css`.
2. **Componentes** — as decisões aplicadas em unidades de interface prontas
   (`Button`, `Card`, `Table`). Nenhum valor literal: todo componente lê tokens.
3. **Diretrizes** — o que os componentes ainda não impõem, mas o time deve
   seguir (documentado em `docs/`).

O que ele **não** é: não é framework de UI, não substitui PrimeVue/Bootstrap
onde já existem, e não obriga adoção total. Consumir só a camada de tokens já é
uma adoção válida e é o caminho recomendado para bases legadas.

## Por que existe

Sem essa camada, a decisão visual não tem onde morar: cada tela reimplementa a
marca por conta própria, e o custo aparece depois — cor aproximada por captura
de tela, o mesmo componente escrito de novo com CSS ligeiramente diferente,
`!important` para vencer conflito, tema escuro impossível de aplicar.

Um levantamento interno sobre uma base existente mediu esse acúmulo e serviu de
ponto de partida para o desenho do pacote; está registrado em
[`docs/features/integra/migracao-para-o-design-system.md`](docs/features/integra/migracao-para-o-design-system.md),
separado desta referência de propósito — o design system se justifica sozinho e
não é uma migração de sistema nenhum.

## O que está aplicado no software

**Marca.** Cor primária `#B53437`, cinza institucional `#767778`, as 13 cores
nomeadas da paleta ampliada e a tipografia (`Roboto` + `Lucida Sans Unicode`,
embutidas em `src/fonts.css`) vêm do
[Guia de Utilização da Marca](brand/Guia%20de%20Utilização%20da%20Marca.md),
**Edição 2026 · v2.0** — não de aproximações.

| Capítulo do guia | Como aparece no código |
|---|---|
| §02.1 Cores institucionais | `--color-primary-500`, `--color-text-subtle` |
| §02.2 Paleta ampliada | `--color-accent-*`, `--color-surface-*`, neutros de superfície/borda/texto |
| §02.4 Contraste | todo par texto/fundo dos dois temas conferido pela fórmula do WCAG 2.1, com o valor comentado linha a linha em `src/tokens.css` |
| §03.1–03.4 Tipografia e hierarquia | `--font-sans`, pesos 300/400/500/700/900, `--text-xs`…`--text-3xl`, `--leading-*`, `--tracking-label` |
| §04.2 Iconografia | `--icon-size` (24px), `--icon-stroke` (2px), `--icon-padding` (2px) |

**Tema escuro.** Real, via `[data-theme="dark"]` no elemento raiz — os tokens se
sobrescrevem e todo componente acompanha. Sem provider React, sem wrapper, sem
extensão de terceiros. Guia de cor e contraste em
[`docs/features/design-system/tema-escuro.md`](docs/features/design-system/tema-escuro.md).

**Acessibilidade.** Contraste WCAG 2.1 verificado par a par nos dois temas.
Estado desabilitado não depende só de cor (hachura no tema escuro), e espera
transitória não se confunde com desabilitado (movimento, marcado por `aria-busy` —
[ADR 0003](docs/adr/0003-espera-transitoria-nao-usa-sinal-de-desabilitado.md)).

**Escopo de CSS.** Toda classe é prefixada `pds-*`. Nenhum `!important`, nenhum
seletor global — conviver com CSS legado é requisito, não acidente.

### Fora do escopo, e por quê

- **Cursiva Vanilla Macchiato (§03.3)** — restrita a destaque editorial no guia;
  não tem papel em interface e a fonte não está licenciada neste pacote.
- **Grafismos de apoio (§04.1)** — elementos de peça gráfica. Quem quiser usá-los
  deve fazê-lo com os `--color-accent-*`, respeitando a área de proteção.
- **Proporção 40/20/10/30 (§02.3)** — diretriz de composição, não algo que um
  token imponha. Vale a regra: **o vermelho é acento, não plano de fundo**.
- **Logotipo** — o pacote não embute assinaturas; use sempre os arquivos
  originais fornecidos pela Planejar.

## Componentes

| Componente | Papel |
|---|---|
| `Button` | variantes `primary` / `secondary` / `outline` / `danger` / `ghost`; tamanhos `sm` / `md` / `lg`; `loading` para espera de requisição |
| `Card`, `SectionCard`, `MetricCard` | blocos de conteúdo — genérico, seção com título, indicador numérico |
| `Badge` | pills de status semânticas |
| `Table` | tabela com realce de linha semântico (pendente / aprovado / erro) |
| `Input` | campo de formulário com label e mensagem de erro |
| `AppShell`, `Sidebar`, `Header` | layout principal; navegação recebida por prop (`navItems`), não hardcoded |

Todos exportam seus tipos TypeScript (`ButtonProps`, `TableColumn`, `NavItem`, …).

## Uso

```bash
npm install
npm run build   # tsup → dist/ (ESM + CJS + .d.ts + index.css)
```

```tsx
import { Button, Card, AppShell } from '@planejar/design-system'
import '@planejar/design-system/styles.css'

<AppShell navItems={items}>
  <Card>
    <Button variant="primary" size="md">Salvar</Button>
  </Card>
</AppShell>
```

Tema escuro — basta o atributo no `<html>`:

```html
<html data-theme="dark">
```

### Adoção parcial (projeto legado, sem build de pacote)

Se o projeto não consegue consumir o pacote npm (CSS legado, Blade/Vue sem
bundler que alcance `node_modules`), importe só os tokens:

```css
@import 'src/tokens.css';
```

Foi o caminho adotado no SIPLAN-v2, que vendoriza os tokens. Você ganha marca,
escala tipográfica e tema escuro sem tocar em componente nenhum.

## Como contribuir / ampliar

O pacote é intencionalmente pequeno — cobre o que já foi necessário. Ampliar é
esperado, não excepcional. Casos já mapeados como próximos: modal, abas,
seletor de data, upload de arquivo.

Regras para não corromper a base:

- **Nenhum valor literal em componente.** Se não existe token para o que você
  precisa, o passo é criar o token, não escrever o `#hex`.
- **Token novo justifica-se pelo guia da marca** ou por um papel semântico
  ausente — não por preferência de tela.
- **Sem `!important` e sem seletor global.** Toda classe sob o prefixo `pds-*`.
- **Contraste conferido** nos dois temas antes de propor a cor.
- **Documentação em `docs/`** segue a estrutura `adr/ features/ runbooks/
  integrations/`, com cabeçalho de versão em todo arquivo.

## Documentação

- [Visão geral](docs/features/design-system/visao-geral.md) — o que é, o que se ganha e como adotar; é o documento para compartilhar com o time
- [Guia de Utilização da Marca](brand/Guia%20de%20Utilização%20da%20Marca.md) — Edição 2026 · v2.0, com apêndice de divergências do PDF original
- [Tema escuro](docs/features/design-system/tema-escuro.md) — paleta, contraste e uso
- [ADR 0001](docs/adr/0001-fontes-embutidas-no-pacote.md) — fontes embutidas no pacote e a restrição de distribuição que isso impõe
- [ADR 0002](docs/adr/0002-hexa-do-guia-como-fonte-da-verdade-de-cor.md) — precedência de valores de cor e derivação da rampa
- [Runbook de sync](docs/runbooks/sincronizar-com-claude-design.md) — publicar os componentes no claude.ai/design
- [Migração do Integra](docs/features/integra/migracao-para-o-design-system.md) — levantamento, dívidas de UI e caminho de adoção
