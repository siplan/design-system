import { SectionCard, Button, Badge } from '@planejar/design-system'

export function ComAcoes() {
  return (
    <SectionCard title="Tarefas do dia" actions={<Button size="sm">Ver todas</Button>} style={{ maxWidth: 420 }}>
      <p style={{ margin: 0 }}>
        3 tarefas pendentes <Badge tone="warning">atenção</Badge>
      </p>
    </SectionCard>
  )
}

export function SemAcoes() {
  return (
    <SectionCard title="Resumo" style={{ maxWidth: 420 }}>
      <p style={{ margin: 0 }}>Nenhuma ação disponível para esta seção.</p>
    </SectionCard>
  )
}
