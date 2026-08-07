import type { HTMLAttributes } from 'react'
import { Card } from '../Card/Card'
import '../Card/Card.css'

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  /** Variação percentual/textual (ex.: "+12% no mês"). Omitido = sem tendência. */
  trend?: { direction: 'up' | 'down'; label: string }
}

/**
 * Card de métrica (label + valor + tendência opcional) — era reimplementado
 * manualmente em pelo menos 4 lugares do Integra original (`.metric-card`,
 * `.summary-card`, `.health-card`, `.weekly-card`) com CSS quase idêntico.
 *
 * @example
 * <MetricCard label="Tarefas em aberto" value={42} trend={{ direction: 'down', label: '-8% na semana' }} />
 */
export function MetricCard({ label, value, trend, className, ...props }: MetricCardProps) {
  return (
    <Card className={className} {...props}>
      <p className="ids-metric-card__label">{label}</p>
      <p className="ids-metric-card__value">{value}</p>
      {trend && (
        <span className={`ids-metric-card__trend ids-metric-card__trend--${trend.direction}`}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.label}
        </span>
      )}
    </Card>
  )
}
