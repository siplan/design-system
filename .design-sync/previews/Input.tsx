import { Input } from '@planejar/integra-design-system'

export function Padrao() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Input label="Nome" placeholder="Digite o nome" />
    </div>
  )
}

export function ComErro() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Input label="E-mail" defaultValue="ana@exemplo" error="E-mail inválido" />
    </div>
  )
}

export function Desabilitado() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Input label="Código" defaultValue="INT-2026" disabled />
    </div>
  )
}
