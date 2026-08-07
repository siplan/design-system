import { Card } from '@planejar/integra-design-system'

export function Flat() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <p style={{ margin: 0 }}>Conteúdo livre dentro do card.</p>
    </Card>
  )
}

export function Elevated() {
  return (
    <Card elevation="elevated" style={{ maxWidth: 320 }}>
      <p style={{ margin: 0 }}>Card com mais destaque visual.</p>
    </Card>
  )
}

export function Accent() {
  return (
    <Card elevation="accent" style={{ maxWidth: 320 }}>
      <p style={{ margin: 0 }}>Item em destaque (ex.: selecionado ou ativo).</p>
    </Card>
  )
}
