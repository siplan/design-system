import { Sidebar } from '@planejar/design-system'
import type { NavItem } from '@planejar/design-system'

const items: NavItem[] = [
  { key: 'inicio', label: 'Início' },
  {
    key: 'tarefas',
    label: 'Tarefas',
    children: [
      { key: 'tarefas-abertas', label: 'Em aberto' },
      { key: 'tarefas-concluidas', label: 'Concluídas' },
    ],
  },
  { key: 'relatorios', label: 'Relatórios' },
]

export function ComItemAtivo() {
  return (
    <div style={{ width: 260, border: '1px solid var(--color-border)' }}>
      <Sidebar items={items} activeKey="tarefas-abertas" />
    </div>
  )
}
