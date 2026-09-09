import type { ReactNode } from 'react'
import './AppShell.css'

export interface NavItem {
  key: string
  label: string
  icon?: ReactNode
  children?: NavItem[]
}

export interface SidebarProps {
  /** Árvore de navegação, sempre recebida por prop: o menu é dado da
   * aplicação, não conteúdo do componente de layout. */
  items: NavItem[]
  activeKey?: string
  onNavigate?: (item: NavItem) => void
}

function NavList({ items, activeKey, onNavigate, depth = 0 }: SidebarProps & { depth?: number }) {
  return (
    <ul className={depth === 0 ? 'pds-nav' : 'pds-nav__children'}>
      {items.map((item) => (
        <li key={item.key}>
          <button
            type="button"
            className={`pds-nav__item${item.key === activeKey ? ' pds-nav__item--active' : ''}`}
            onClick={() => onNavigate?.(item)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
          {item.children && item.children.length > 0 && (
            <NavList items={item.children} activeKey={activeKey} onNavigate={onNavigate} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  )
}

/**
 * Navegação lateral. Suporta até 3 níveis (mesma profundidade do menu
 * original), mas como dado, não como estrutura fixa no componente.
 */
export function Sidebar({ items, activeKey, onNavigate }: SidebarProps) {
  return (
    <nav className="pds-shell__sidebar" aria-label="Navegação principal">
      <NavList items={items} activeKey={activeKey} onNavigate={onNavigate} />
    </nav>
  )
}
