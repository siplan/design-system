import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão. Único sistema de botão do design system —
   * substitui os três padrões conflitantes do Integra original
   * (PrimeVue Button, `<button>` com estilo inline, `btn btn-*` do Bootstrap legado). */
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * Botão padrão do design system.
 *
 * @example
 * <Button variant="primary">Salvar</Button>
 * <Button variant="danger" size="sm">Excluir</Button>
 * <Button variant="outline">Cancelar</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const classes = ['ids-button', `ids-button--${variant}`, `ids-button--${size}`, className]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} className={classes} {...props} />
  },
)

Button.displayName = 'Button'
