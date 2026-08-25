import { Sidebar } from '@planejar/integra-design-system'
import type { NavItem } from '@planejar/integra-design-system'

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
