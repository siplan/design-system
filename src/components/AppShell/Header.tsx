import type { ReactNode } from 'react'
import './AppShell.css'

export interface HeaderProps {
  /** Ex.: botão de colapsar sidebar / breadcrumb. */
  left?: ReactNode
  /** Ex.: ações do usuário (tema, notificações, logout). */
  right?: ReactNode
}

/**
 * Cabeçalho do shell. Ao contrário do Integra original — onde os botões
 * do header (logout, alternância de tema) usavam `style="color: #B53437"`
 * inline — aqui as ações vêm como `ReactNode` e devem usar `Button`/`Badge`
 * do próprio design system.
 */
export function Header({ left, right }: HeaderProps) {
  return (
    <header className="ids-shell__header">
      <div>{left}</div>
      <div>{right}</div>
    </header>
  )
}
