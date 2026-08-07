import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

/**
 * Campo de formulário padrão (label + input + erro), com foco visível
 * e mensagem de erro semântica — o Integra original não tinha um
 * componente de input reutilizável, cada tela estilizava o seu.
 *
 * @example
 * <Input label="Nome" placeholder="Digite o nome" />
 * <Input label="E-mail" error="E-mail inválido" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, className, ...props }, ref) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const classes = ['ids-input', error && 'ids-input--error', className].filter(Boolean).join(' ')

  return (
    <div className="ids-field">
      {label && (
        <label className="ids-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input ref={ref} id={inputId} className={classes} aria-invalid={Boolean(error)} {...props} />
      {error && <span className="ids-field__error">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'
