import type { HTMLAttributes } from 'react'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Realce adicional. `accent` aplica o destaque de marca (borda vermelha
   * lateral), o mesmo usado em item ativo de navegação. */
  elevation?: 'flat' | 'elevated' | 'accent'
}

/**
 * Card base do design system: container genérico de conteúdo. Para seção
 * com título use `SectionCard`; para indicador numérico, `MetricCard`.
 * Estes três papéis cobrem os casos de uso — não crie classes `*-card`.
 *
 * @example
 * <Card>Conteúdo livre</Card>
 * <Card elevation="elevated">Card com mais destaque</Card>
 */
export function Card({ elevation = 'flat', className, ...props }: CardProps) {
  const classes = ['pds-card', elevation !== 'flat' && `pds-card--${elevation}`, className]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...props} />
}
