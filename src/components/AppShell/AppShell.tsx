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
 * Barra vermelha no topo, sidebar colapsável e destaque de item ativo. O
 * colapso e o comportamento mobile são resolvidos em CSS (grid + media
 * query) — sem recalcular larguras ou breakpoint em JavaScript a cada
 * resize.
 *
 * @example
 * <AppShell navItems={navItems} activeKey="tarefas" onNavigate={handleNav}>
 *   <SectionCard title="Tarefas do dia">...</SectionCard>
 * </AppShell>
 */
export function AppShell({ navItems, activeKey, onNavigate, collapsed, headerLeft, headerRight, children }: AppShellProps) {
  const classes = ['pds-shell', collapsed && 'pds-shell--collapsed'].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="pds-shell__topbar-accent" />
      <Sidebar items={navItems} activeKey={activeKey} onNavigate={onNavigate} />
      <Header left={headerLeft} right={headerRight} />
      <main className="pds-shell__main">{children}</main>
    </div>
  )
}
