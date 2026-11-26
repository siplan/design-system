# ADR 0003 — Espera transitória não usa o sinal de desabilitado

| Versão | Atualizado em |
|--------|---------------|
| 1      | 30/09/2026    |

**Status:** aceito

## Contexto

No tema escuro o sinal de desabilitado é a hachura (ver
[tema escuro](../features/design-system/tema-escuro.md), §8.2): uma textura
diagonal estática, calibrada para dizer "este controle está bloqueado".

Nem todo controle desabilitado está bloqueado. Muitas telas desabilitam
controles só **enquanto esperam algo**:

- **uma requisição em curso**: o login trava CPF, senha e botão enquanto
  verifica as credenciais, e o formulário trava os campos enquanto salva;
- **um intervalo fixo**: o diálogo de confirmação só libera o "Sim" depois de
  alguns segundos, para evitar clique por reflexo.

Para o CSS os dois casos são o mesmo `:disabled` de um bloqueio por regra de
negócio, e caíam na hachura. Na tela de login do SIPLAN-v2, onde o problema foi
notado, o formulário inteiro virava textura parada durante a verificação: parecia
quebrado, não ocupado. A hachura dizia "você não pode mexer aqui" quando a
mensagem real era "espere, já volta". Por ser estática, também não mostrava que
algo estava progredindo nem quanto faltava.

## Decisão

**A espera transitória tem sinal próprio e nunca usa a hachura nem o tracejado
de desabilitado.** O canal é **movimento**, que nenhum estado estático do tema
usa:

- **Duração desconhecida** (requisição): o controle, ou um container ancestral,
  recebe `aria-busy="true"`, e um brilho translúcido varre o controle em loop.
- **Duração conhecida** (intervalo fixo): o botão recebe a classe
  `pds-button--aguardando` e a duração em `--aguardando-duracao`. Um
  preenchimento avança e completa exatamente quando o botão libera.

A marcação é **`aria-busy`**, e não uma classe criada para isso: é o atributo de
acessibilidade para "conteúdo em atualização", então serve ao leitor de tela e ao
tema ao mesmo tempo. O estado é **opt-in**: controle desabilitado fora de
`[aria-busy="true"]` continua com a hachura, e é a tela que declara que o
bloqueio é transitório.

Durante a espera o texto sobe para `--color-text-muted` (o valor digitado precisa
continuar legível), a borda fica sólida e o cursor vira `progress`. Com
`prefers-reduced-motion: reduce` o movimento some e ficam só o texto e o cursor.

## Consequências

- Tokens novos em `src/tokens.css`: `--aguardando-brilho`,
  `--aguardando-brilho-leve`, `--aguardando-progresso` e `--aguardando-animacao`,
  mais os keyframes `pds-aguardando-brilho` e `pds-aguardando-progresso`. Como a
  hachura, as imagens são redefinição do escuro e valem `none` no claro.
- `Button` ganha a prop `loading`, que desabilita o botão e marca `aria-busy`.
  `Input` reconhece `[aria-busy="true"]` num ancestral.
- O consumidor passa a ter uma responsabilidade: pôr e tirar `aria-busy` junto
  com o `disabled` da espera. Quem não fizer isso continua com a hachura, que é o
  comportamento de antes; nada quebra.
- Aplicado nos três consumidores: SIPLAN-v2 (tela de login e
  `siplan.msgConfirmacao`), Integra (`IdsButton` com `loading`) e este pacote.
- Levar o movimento ao tema claro fica em aberto, pelo mesmo motivo da hachura
  (§8.5 do tema escuro): seria mudança de aparência em toda a base consumidora.
