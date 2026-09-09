import type { HTMLAttributes } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'danger' | 'warning' | 'success' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

/**
 * Pill de status. As cores semânticas (pendente/assinado/erro) vêm dos
 * tokens `--color-warning` / `-success` / `-danger`, independentes da
 * escala de marca — não escolha um vermelho novo para indicar erro.
 *
 * @example
 * <Badge tone="warning">Assinatura pendente</Badge>
 * <Badge tone="success">Assinado</Badge>
 */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  const classes = ['pds-badge', `pds-badge--${tone}`, className].filter(Boolean).join(' ')
  return <span className={classes} {...props} />
}
