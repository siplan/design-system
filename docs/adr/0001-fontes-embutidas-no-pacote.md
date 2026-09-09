# ADR 0001 — Fontes embutidas no pacote

| Versão | Atualizado em |
|--------|---------------|
| 1      | 09/09/2026    |

**Status:** aceito

## Contexto

O Guia de Utilização da Marca (§03) define duas famílias: `Roboto` como
principal e `Lucida Sans Unicode` como apoio. Declarar as duas em `--font-sans`
e confiar que estejam instaladas na máquina do usuário não funciona — `Lucida
Sans Unicode` só existe por padrão em Windows, e o fallback silencioso descaracteriza
a tipografia da marca sem que ninguém perceba.

## Decisão

As duas famílias são **embutidas no pacote** como `@font-face` em
`src/fonts.css`, importado por `src/index.ts` antes de `tokens.css`. Quem
instala o pacote recebe a tipografia correta, sem passo de instalação.

- **Roboto** — subset latin, arquivo variável cobrindo o eixo `wght` 100–900,
  mais itálico 400. Baixado do Google Fonts, **licença Apache 2.0**
  (`src/fonts/roboto/LICENSE.txt`).
- **Lucida Sans Unicode** — convertida via `fonttools` de um `.ttf` de
  instalação Windows licenciada. **Fonte proprietária** de Bigelow & Holmes,
  distribuída por Microsoft/Monotype (`src/fonts/lucida-sans-unicode/NOTICE.md`).

O `@font-face` do Roboto declara `font-weight: 100 900` — a faixa completa do
arquivo variável, não `400 700`. Uma faixa curta faz o navegador **sintetizar**
Light e Black em vez de usar as instâncias reais do arquivo, e esses dois pesos
são autorizados pelo guia.

O `url()` do CSS é resolvido pelo esbuild dentro do `tsup`, que copia os
`.woff2` para `dist/` com hash no nome. O `onSuccess` do `tsup.config.ts` copia
os dois arquivos de licença junto.

## Consequências

**Restrição de distribuição.** O pacote carrega uma fonte proprietária. Uso
restrito a aplicações da própria Planejar. **Não publicar em registro público**
(npm público, CDN aberto) nem redistribuir o arquivo de fonte fora desse
contexto sem antes confirmar os termos da Monotype. É o motivo pelo qual
`package.json` lista os arquivos de licença em `files`.

**Peso do bundle.** ~194 KB de `.woff2` (Roboto variável 42 KB, itálico 23 KB,
Lucida Sans Unicode 129 KB). Aceito: são carregados uma vez e cacheados.

**A cursiva Vanilla Macchiato (§03.3) fica fora.** O guia restringe seu uso a
destaque editorial curto, ela não tem papel em interface, e não há licença para
embuti-la.
