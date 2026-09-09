import { AppShell, SectionCard, MetricCard, Button, Badge } from '@planejar/design-system'
import type { NavItem } from '@planejar/design-system'

const navItems: NavItem[] = [
  { key: 'inicio', label: 'Início' },
  { key: 'tarefas', label: 'Tarefas' },
  { key: 'relatorios', label: 'Relatórios' },
]

export function Padrao() {
  return (
    <div style={{ height: 560 }}>
      <AppShell
        navItems={navItems}
        activeKey="tarefas"
        headerLeft={<strong>Planejar</strong>}
        headerRight={
          <Button size="sm" variant="ghost">
            Sair
          </Button>
        }
      >
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
          <MetricCard label="Tarefas em aberto" value={42} trend={{ direction: 'down', label: '-8% na semana' }} />
          <SectionCard title="Últimas atualizações" actions={<Badge tone="info">novo</Badge>}>
            <p style={{ margin: 0 }}>Nenhuma atualização recente.</p>
          </SectionCard>
        </div>
      </AppShell>
    </div>
  )
}
