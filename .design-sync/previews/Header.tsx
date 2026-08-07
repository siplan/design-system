import { Header, Button, Badge } from '@planejar/integra-design-system'

export function Padrao() {
  return (
    <Header
      left={<strong>Integra</strong>}
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
