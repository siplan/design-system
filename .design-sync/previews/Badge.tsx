import { Badge } from '@planejar/design-system'

export function Tons() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge tone="neutral">Rascunho</Badge>
      <Badge tone="warning">Assinatura pendente</Badge>
      <Badge tone="success">Assinado</Badge>
      <Badge tone="danger">Erro na importação</Badge>
      <Badge tone="info">Em análise</Badge>
    </div>
  )
}
