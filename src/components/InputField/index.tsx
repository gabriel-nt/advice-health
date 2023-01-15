import clsx from 'clsx'
import { Form, FormControlProps } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

interface InputFieldProps extends FormControlProps {
  name?: string
  label?: string
  maxLength?: number
  errorMessage?: string
  useInternalRegister?: boolean
}

export function InputField({
  label,
  name,
  errorMessage,
  useInternalRegister = true,
  ...rest
}: InputFieldProps) {
  const { register } = useFormContext()

  if (useInternalRegister) {
    Object.assign(rest, {
      ...register(name as any, {
        onChange: rest.onChange,
      }),
    })
  }

  return (
    <>
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <Form.Control
        className={clsx({
          'border-danger error': !!errorMessage,
        })}
        name={name}
        {...rest}
      />

      {errorMessage && <small className="text-danger">{errorMessage}</small>}
    </>
  )
}
