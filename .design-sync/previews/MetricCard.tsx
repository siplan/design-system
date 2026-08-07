import { MetricCard } from '@planejar/integra-design-system'

export function TendenciaAlta() {
  return <MetricCard label="Tarefas concluídas" value={128} trend={{ direction: 'up', label: '+12% no mês' }} />
}

export function TendenciaBaixa() {
  return <MetricCard label="Tarefas em aberto" value={42} trend={{ direction: 'down', label: '-8% na semana' }} />
}

export function SemTendencia() {
  return <MetricCard label="Usuários ativos" value="1.204" />
}
