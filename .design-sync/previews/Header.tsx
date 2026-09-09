import { Header, Button, Badge } from '@planejar/design-system'

export function Padrao() {
  return (
    <Header
      left={<strong>Planejar</strong>}
      right={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge tone="info">Ana Souza</Badge>
          <Button size="sm" variant="ghost">
            Sair
          </Button>
        </div>
      }
    />
  )
}
