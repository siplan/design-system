import type { HTMLAttributes } from 'react'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Realce adicional. `accent` reproduz o destaque de marca (borda vermelha
   * lateral) usado em itens ativos no Integra original. */
  elevation?: 'flat' | 'elevated' | 'accent'
}

/**
 * Card base do design system — substitui as 30+ classes `*-card`
 * (metric-card, hig-card, summary-card, news-card, ...) que existiam
 * duplicadas, cada uma com CSS levemente diferente, no Integra original.
 *
 * @example
 * <Card>Conteúdo livre</Card>
 * <Card elevation="elevated">Card com mais destaque</Card>
 */
export function Card({ elevation = 'flat', className, ...props }: CardProps) {
  const classes = ['ids-card', elevation !== 'flat' && `ids-card--${elevation}`, className]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...props} />
}
