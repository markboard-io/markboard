import { useState } from 'react'

export function usePasswordValidator() {
  const [passwordError, setPasswordError] = useState('')
  const validatePassword = async (password: string) => {
    if (!password) return setPasswordError('Password cannot be left empty')
    if (!/^[A-Za-z0-9._-]*$/.test(password)) {
      return setPasswordError(
        'Invalid Password. ' +
          'Password can contain letters (A-Z, a-z), numbers (0-9), periods (.), hyphen (-) ' +
          'and underscore (_)'
      )
    }
    const MIN_PASSWORD_LENGTH = 6
    const MAX_PASSWORD_LENGTH = 20
    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      return setPasswordError(
        "Password's length doesn't meet requirements " +
          `should be over ${MIN_PASSWORD_LENGTH} and below ${MAX_PASSWORD_LENGTH} ` +
          'characters'
      )
    }
    return setPasswordError('')
  }

  return [passwordError, validatePassword] as const
}
