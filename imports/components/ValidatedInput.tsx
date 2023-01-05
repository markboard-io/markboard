import React, { memo, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import debounce from 'lodash/debounce'

interface IValidatedInputProps {
  id: string
  label: string
  type?: string
  placeholder: string
  error: string
  validator: (...args: any[]) => void
}

function ValidatedInputComponent({
  id,
  label,
  type,
  placeholder,
  error,
  validator
}: IValidatedInputProps) {
  const [isEdited, setIsEdited] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const onFocus = () => {
    const input = ref.current as HTMLInputElement
    setIsEdited(true)
    console.log('validate pass', input.value)
    validator(input.value)
  }
  const onChange = debounce(ev => validator(ev.target.value), 200)

  return (
    <Form.Group controlId={id}>
      <Form.Label className='label'>{label}</Form.Label>
      <Form.Control
        type={type ?? id}
        placeholder={placeholder}
        isValid={isEdited && !error}
        isInvalid={isEdited && !!error}
        onFocus={onFocus}
        onChange={onChange}
        ref={ref}
      />
      {error ? <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback> : null}
    </Form.Group>
  )
}

export const ValidatedInput = memo(ValidatedInputComponent, (prevProps, nextProps) => {
  if (prevProps.error !== nextProps.error) return false
  return true
})
