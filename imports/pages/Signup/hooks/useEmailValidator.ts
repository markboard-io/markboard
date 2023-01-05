import { useState } from 'react'
import { Services } from '/imports/services/client'

export function useEmailValidator() {
  const [emailError, setEmailError] = useState('')

  const validateEmail = async (email: string) => {
    if (!email) return setEmailError('Email cannot be left empty')
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return setEmailError('Invalid Email')
    }
    const MAX_EMAIL_LENGTH = 100
    if (email.length > MAX_EMAIL_LENGTH) {
      return setEmailError("Email's length cannot be over 100 characters")
    }
    const isEmailAvailable = await Services.get('account').checkEmailAvailability(email)
    if (!isEmailAvailable) {
      return setEmailError('Email has been used')
    }
    return setEmailError('')
  }

  return [emailError, validateEmail] as const
}
