import React, { useState } from 'react'
import { SiteLayout } from '/imports/layouts'
import './Signup.style.scss'
import Form from 'react-bootstrap/Form'
import { LinkText, OutlineButton, ValidatedInput } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useUsernameValidator, useEmailValidator } from './hooks'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Toast } from '/imports/utils/toast'

function useFormValues() {
  const ref = useRef<HTMLFormElement | null>(null)

  const getFormValues = () => {
    const { elements } = ref.current as HTMLFormElement
    const email = (elements.namedItem('email') as HTMLInputElement).value
    const username = (elements.namedItem('username') as HTMLInputElement).value
    const password = (elements.namedItem('password') as HTMLInputElement).value
    const confirmPassword = (elements.namedItem('confirmPassword') as HTMLInputElement).value
    return { email, username, password, confirmPassword }
  }

  return [ref, getFormValues] as const
}

export function Signup() {
  const navigate = useNavigate()
  useDocumentTitle('BoardX - Sign Up')

  const [emailError, validateEmail] = useEmailValidator()
  const [usernameError, validateUsername] = useUsernameValidator()
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassError, setConfirmPassError] = useState('')
  const [ref, getFormValues] = useFormValues()

  const onFocus = () => {
    const { username, email, password } = getFormValues()
    validateEmail(email)
    validateUsername(username)
    validatePassword(password)
    validateConfirmPass()
  }

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const isValidationsPass = !emailError && !usernameError && !passwordError && !confirmPassError
    if (!isValidationsPass) return

    const { email, username, password } = getFormValues()
    Accounts.createUser({ username, email, password }, error => {
      if (error) return Toast.error(error.message)
      Toast.success('Sign Up Success!')
      setTimeout(() => navigate('/login'), 1500)
    })
  }

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

  const validateConfirmPass = async () => {
    const { password, confirmPassword } = getFormValues()
    if (!confirmPassword) return setConfirmPassError('Password cannot be left empty')
    if (password !== confirmPassword) {
      return setConfirmPassError('Passwords do not match')
    }
    return setConfirmPassError('')
  }

  return (
    <SiteLayout>
      <div className='signup-page'>
        <div className='title'>Sign Up</div>
        <div className='signup-form'>
          <Form onSubmit={onSubmit} ref={ref}>
            <ValidatedInput
              id='email'
              label='Email Address'
              placeholder='Enter Email'
              error={emailError}
              validator={validateEmail}
            />
            <ValidatedInput
              id='username'
              type='text'
              label='Username'
              placeholder='Enter Username'
              error={usernameError}
              validator={validateUsername}
            />
            <ValidatedInput
              id='password'
              label='Password'
              placeholder='Enter Password'
              error={passwordError}
              validator={validatePassword}
            />
            <ValidatedInput
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              placeholder='Enter Password'
              error={confirmPassError}
              validator={validateConfirmPass}
            />
            <OutlineButton className='signup-button' onFocus={onFocus}>
              Sign Up with email
            </OutlineButton>
          </Form>
          <div className='links'>
            <span className='login-link'>
              Aready have an account? <LinkText onClick={() => navigate('/login')}>Log in</LinkText>
            </span>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
