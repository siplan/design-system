import type { HTMLAttributes } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'danger' | 'warning' | 'success' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

/**
 * Pill de status. Formaliza as cores semânticas (pendente/assinado/erro)
 * que no Integra original eram escolhidas "à mão" a cada tela — inclusive
 * com variações de vermelho não relacionadas à cor de marca.
 *
 * @example
 * <Badge tone="warning">Assinatura pendente</Badge>
 * <Badge tone="success">Assinado</Badge>
 */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  const classes = ['ids-badge', `ids-badge--${tone}`, className].filter(Boolean).join(' ')
  return <span className={classes} {...props} />
}
