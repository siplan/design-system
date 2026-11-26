import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão. Este é o único sistema de botão do design
   * system: toda ação clicável passa por aqui, em uma destas variantes. */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Espera de duração desconhecida (requisição em curso): desabilita o botão
   * e marca `aria-busy`, que troca a hachura de desabilitado pelo brilho de
   * "aguardando" — ver docs/adr/0003. */
  loading?: boolean
}

/**
 * Botão padrão do design system.
 *
 * @example
 * <Button variant="primary">Salvar</Button>
 * <Button variant="danger" size="sm">Excluir</Button>
 * <Button variant="outline">Cancelar</Button>
 * <Button loading={salvando}>Salvar</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className, ...props }, ref) => {
    const classes = ['pds-button', `pds-button--${variant}`, `pds-button--${size}`, className]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
