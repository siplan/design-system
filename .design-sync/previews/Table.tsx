import { Table, Badge } from '@planejar/design-system'

interface Pessoa {
  id: number
  nome: string
  status: 'aprovado' | 'pendente' | 'erro'
}

const pessoas: Pessoa[] = [
  { id: 1, nome: 'Ana Souza', status: 'aprovado' },
  { id: 2, nome: 'Carlos Lima', status: 'pendente' },
  { id: 3, nome: 'Beatriz Rocha', status: 'erro' },
]

const toneByStatus = { aprovado: 'success', pendente: 'warning', erro: 'danger' } as const

export function ComDados() {
  return (
    <Table<Pessoa>
      columns={[
        { key: 'nome', header: 'Nome' },
        {
          key: 'status',
          header: 'Status',
          render: (p) => <Badge tone={toneByStatus[p.status]}>{p.status}</Badge>,
        },
      ]}
      data={pessoas}
      getRowKey={(p) => p.id}
      getRowTone={(p) => (p.status === 'pendente' ? 'warning' : p.status === 'erro' ? 'danger' : undefined)}
    />
  )
}

export function Vazia() {
  return (
    <Table<Pessoa>
      columns={[
        { key: 'nome', header: 'Nome' },
        { key: 'status', header: 'Status' },
      ]}
      data={[]}
      getRowKey={(p) => p.id}
      emptyLabel="Nenhum registro encontrado."
    />
  )
}
