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
 * Card de métrica: label + valor + tendência opcional. Papel único para
 * indicador numérico em painel — resumo, contagem, indicador de saúde.
 *
 * @example
 * <MetricCard label="Tarefas em aberto" value={42} trend={{ direction: 'down', label: '-8% na semana' }} />
 */
export function MetricCard({ label, value, trend, className, ...props }: MetricCardProps) {
  return (
    <Card className={className} {...props}>
      <p className="pds-metric-card__label">{label}</p>
      <p className="pds-metric-card__value">{value}</p>
      {trend && (
        <span className={`pds-metric-card__trend pds-metric-card__trend--${trend.direction}`}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.label}
        </span>
      )}
    </Card>
  )
}
