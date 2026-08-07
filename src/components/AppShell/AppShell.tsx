import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { NavItem } from './Sidebar'
import { Header } from './Header'
import type { HeaderProps } from './Header'
import './AppShell.css'

export interface AppShellProps {
  navItems: NavItem[]
  activeKey?: string
  onNavigate?: (item: NavItem) => void
  collapsed?: boolean
  headerLeft?: HeaderProps['left']
  headerRight?: HeaderProps['right']
  children: ReactNode
}

/**
 * Layout principal (barra de destaque + sidebar + header + conteúdo).
 * Mantém a identidade visual do Integra original (barra vermelha no topo,
 * sidebar colapsável, destaque de item ativo), mas resolve o colapso e o
 * comportamento mobile via CSS (grid + media query) em vez de recalcular
 * larguras/breakpoint em JavaScript a cada resize.
 *
 * @example
 * <AppShell navItems={navItems} activeKey="tarefas" onNavigate={handleNav}>
 *   <SectionCard title="Tarefas do dia">...</SectionCard>
 * </AppShell>
 */
export function AppShell({ navItems, activeKey, onNavigate, collapsed, headerLeft, headerRight, children }: AppShellProps) {
  const classes = ['ids-shell', collapsed && 'ids-shell--collapsed'].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="ids-shell__topbar-accent" />
      <Sidebar items={navItems} activeKey={activeKey} onNavigate={onNavigate} />
      <Header left={headerLeft} right={headerRight} />
      <main className="ids-shell__main">{children}</main>
    </div>
  )
}
