## Planejar Design System — como usar

Biblioteca de componentes React (`@planejar/design-system`) com identidade visual
própria (vermelho de marca `#B53437`, Guia de Utilização da Marca — Edição 2026 · v2.0).
Sem provider/wrapper de tema — os componentes
importam seu próprio CSS e funcionam standalone; basta `import '@planejar/design-system/styles.css'`
uma vez na raiz do app.

### Estilização — via props, não classes utilitárias

Este NÃO é um sistema de classes utilitárias (sem equivalente a `bg-primary`/`p-4`). Cada
componente já vem estilizado e se customiza por props de variante:

- `Button`: `variant` (`primary` | `secondary` | `outline` | `danger` | `ghost`), `size` (`sm` | `md` | `lg`)
- `Card` / `SectionCard` / `MetricCard`: `elevation` (`flat` | `elevated` | `accent`) — `accent` é o destaque de marca (borda vermelha à esquerda), use para item selecionado/ativo
- `Badge`: `tone` (`neutral` | `danger` | `warning` | `success` | `info`)
- `Table`: `getRowTone` por linha (`warning` | `success` | `danger`)

Nunca invente classes CSS novas (`pds-*` é o namespace interno dos componentes, não uma API
pública). Para layout próprio (grids, espaçamento entre componentes), use os tokens do
design system diretamente via `var(--*)` — nunca hardcode cor/espaçamento/raio:

```tsx
<div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: '1fr 1fr' }}>
  <MetricCard label="Tarefas em aberto" value={42} trend={{ direction: 'down', label: '-8% na semana' }} />
  <SectionCard title="Últimas atualizações">...</SectionCard>
</div>
```

Tokens mais usados: cor (`--color-surface`, `--color-border`, `--color-text`, `--color-text-muted`,
`--color-primary-500`, `--color-danger` / `-warning` / `-success` / `-info`), espaçamento
(`--space-xs` a `--space-2xl`), raio (`--radius-sm` / `-md` / `-lg` / `-pill`), sombra
(`--shadow-sm` / `-md` / `-brand`), tipografia (`--font-sans`, `--text-xs` a `--text-3xl`,
`--leading-title` / `-subtitle` / `-body` / `-caption`, `--tracking-label`,
`--font-weight-light` / `-regular` / `-medium` / `-bold` / `-black`).

Da paleta ampliada do manual (Edição 2026): `--color-accent-bordo` / `-azul-grafite` /
`-verde` / `-dourado` e `--color-surface-areia` / `-off-white` / `-branco-suave`. Regra do
manual: **no máximo duas cores de apoio por peça**, e o vermelho é acento (~20% da
composição), nunca plano de fundo padrão. Ícones seguem `--icon-size` (24px) com
`--icon-stroke` (2px) e são sempre monocromáticos.

`--font-weight-semibold` (600) está **depreciado** — não é um peso autorizado pelo manual;
hoje é alias de `--font-weight-medium`. Use `-medium` para rótulos/botões e `-bold` para
títulos e subtítulos.

### Onde está a verdade

Tokens completos em `tokens/*.css` (bind do `src/tokens.css` do repositório) e o CSS
compilado dos componentes em `_ds_bundle.css`, ambos importados via `styles.css`. A API de
cada componente está em `<Name>.d.ts`; exemplos de uso em `<Name>.prompt.md`.

### Layout de página — AppShell

Telas completas de aplicação usam `AppShell` (topbar de destaque + `Sidebar` colapsável +
`Header` + área de conteúdo), não recriação manual do grid:

```tsx
<AppShell
  navItems={[{ key: 'tarefas', label: 'Tarefas' }]}
  activeKey="tarefas"
  headerLeft={<strong>Planejar</strong>}
  headerRight={<Button size="sm" variant="ghost">Sair</Button>}
>
  <MetricCard label="Tarefas em aberto" value={42} />
</AppShell>
```

`Sidebar`/`Header` também existem como componentes standalone, mas só fazem sentido dentro
de um `AppShell` (eles não têm o grid de layout por conta própria).

### Diretrizes de UX (não são componentes — orientam a composição)

Ver a seção "Padrões de UX a evitar em novos designs" no README: cabeçalhos de modal devem
ficar em uma linha só e sem informação técnica exposta por padrão; abas de navegação interna
devem ficar fixas (sticky) e compactas; e conteúdo relevante só no momento de salvar (ex.:
histórico/comentário de confirmação) deve migrar para um modal de confirmação separado, não
ocupar espaço permanente causando rolagem vertical no corpo principal.
