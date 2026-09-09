import type { ReactNode } from 'react'
import './Table.css'

export type TableRowTone = 'warning' | 'success' | 'danger'

export interface TableColumn<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => string | number
  /** Realce semântico da linha (ex.: pendência de assinatura), substitui
   * a lógica de zebra por contexto de negócio espalhada em CSS por tela. */
  getRowTone?: (row: T) => TableRowTone | undefined
  emptyLabel?: string
}

/**
 * Tabela padrão do design system. Sem `!important` e sem dependência de
 * lib de grid de terceiros — o realce de linha é semântico, via
 * `getRowTone`, não uma cor escolhida na tela.
 *
 * @example
 * <Table
 *   columns={[{ key: 'nome', header: 'Nome' }, { key: 'status', header: 'Status' }]}
 *   data={pessoas}
 *   getRowKey={(p) => p.id}
 *   getRowTone={(p) => (p.pendente ? 'warning' : undefined)}
 * />
 */
export function Table<T>({ columns, data, getRowKey, getRowTone, emptyLabel = 'Nenhum registro encontrado.' }: TableProps<T>) {
  return (
    <div className="pds-table-container">
      <table className="pds-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="pds-table__empty" colSpan={columns.length}>
                {emptyLabel}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const tone = getRowTone?.(row)
              const className = tone ? `pds-table__row--${tone}` : undefined
              return (
                <tr key={getRowKey(row, index)} className={className}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}</td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
