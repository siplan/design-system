import { Card, Input } from '@planejar/integra-design-system'

export function Padrao() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <Input label="Nome" placeholder="Digite o nome" />
    </Card>
  )
}

export function ComErro() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <Input label="E-mail" defaultValue="ana@exemplo" error="E-mail inválido" />
    </Card>
  )
}

export function Desabilitado() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <Input label="Código" defaultValue="INT-2026" disabled />
    </Card>
  )
}
