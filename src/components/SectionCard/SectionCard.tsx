import type { HTMLAttributes, ReactNode } from 'react'
import { Card } from '../Card/Card'
import '../Card/Card.css'

export interface SectionCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  /** Botões/ações exibidos à direita do título (ex.: "ver tudo", filtros). */
  actions?: ReactNode
}

/**
 * Card com cabeçalho — título + slot de ações — para seções de tela
 * (listas, gráficos, resumos). Substitui os componentes de card com
 * cabeçalho reimplementados por tela no Integra original.
 *
 * @example
 * <SectionCard title="Tarefas do dia" actions={<Button size="sm">Ver todas</Button>}>
 *   ...
 * </SectionCard>
 */
export function SectionCard({ title, actions, children, className, ...props }: SectionCardProps) {
  return (
    <Card className={className} {...props}>
      <div className="ids-card__header">
        <h3 className="ids-card__title">{title}</h3>
        {actions && <div className="ids-card__actions">{actions}</div>}
      </div>
      {children}
    </Card>
  )
}
