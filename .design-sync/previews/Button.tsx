import { Button } from '@planejar/integra-design-system'

export function Variantes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary">Salvar</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="danger">Excluir</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}

export function Tamanhos() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  )
}

export function Desabilitado() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="primary" disabled>
        Salvar
      </Button>
      <Button variant="outline" disabled>
        Cancelar
      </Button>
    </div>
  )
}
