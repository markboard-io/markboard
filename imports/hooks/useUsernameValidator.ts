import { useState } from 'react'
import { Services } from '/imports/services/client'

export function useUsernameValidator() {
  const [usernameError, setUsernameError] = useState('')

  const validateUsername = async (username: string) => {
    if (!username) return setUsernameError('Username cannot be left empty')
    if (!/^[a-z][a-z0-9.]*$/.test(username)) {
      return setUsernameError(
        'Invalid Username. ' +
          'Usernames can contain letters (a-z), numbers (0-9), and periods (.) ' +
          'and should start with letters(a-z)'
      )
    }
    const MAX_USERNAME_LENGTH = 20
    if (username.length > MAX_USERNAME_LENGTH) {
      return setUsernameError("Username's length cannot be over 20 characters")
    }
    const isUsernameAvailable = await Services.get('account').checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      return setUsernameError('Username has been used')
    }
    return setUsernameError('')
  }

  return [usernameError, validateUsername] as const
}
