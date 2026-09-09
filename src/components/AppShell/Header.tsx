import type { ReactNode } from 'react'
import './AppShell.css'

export interface HeaderProps {
  /** Ex.: botão de colapsar sidebar / breadcrumb. */
  left?: ReactNode
  /** Ex.: ações do usuário (tema, notificações, logout). */
  right?: ReactNode
}

/**
 * Cabeçalho do shell. As ações entram como `ReactNode` nos slots `left` e
 * `right` e devem usar `Button`/`Badge` do próprio design system — nunca
 * estilo inline, que escapa dos tokens e do tema escuro.
 */
export function Header({ left, right }: HeaderProps) {
  return (
    <header className="pds-shell__header">
      <div>{left}</div>
      <div>{right}</div>
    </header>
  )
}
