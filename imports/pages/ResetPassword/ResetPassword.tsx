import React, { useRef, useState } from 'react'
import { SiteLayout } from '/imports/layouts'
import './ResetPassword.style.scss'
import Form from 'react-bootstrap/Form'
import { OutlineButton, LinkText, ValidatedInput } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import { Toast } from '/imports/utils'
import { usePasswordValidator } from '/imports/pages/Signup/hooks'
import { UNKNOWN_ERROR } from '/imports/utils/constants'

function useFormValues() {
  const ref = useRef<HTMLFormElement | null>(null)

  const getFormValues = () => {
    const { elements } = ref.current as HTMLFormElement
    const password = (elements.namedItem('password') as HTMLInputElement).value
    const confirmPassword = (elements.namedItem('confirmPassword') as HTMLInputElement).value
    return { password, confirmPassword }
  }

  return [ref, getFormValues] as const
}

interface IResetPasswordParams {
  token: string
}

export function ResetPassword() {
  const navigate = useNavigate()
  const [ref, getFormValues] = useFormValues()
  const [passwordError, validatePassword] = usePasswordValidator()
  const [confirmPassError, setConfirmPassError] = useState('')
  const params = useParams() as unknown as IResetPasswordParams

  useDocumentTitle('markboard - Reset Password')

  const onFocus = () => {
    const { password } = getFormValues()
    validatePassword(password)
    validateConfirmPass()
  }

  const resetPassword = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const isValidationsPass = !passwordError && !confirmPassError
    if (!isValidationsPass) return
    const { token } = params
    const { password } = getFormValues()

    Accounts.resetPassword(token, password, error => {
      const msg = error?.message.replace(/\[.+\]/, '') ?? UNKNOWN_ERROR
      if (error) return Toast.error(msg)
      Toast.success('Reset Password Successfully!')
      setTimeout(() => navigate('/login'), 500)
    })
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
      <div className='reset-password-page'>
        <div className='title'>Reset Password</div>
        <div className='form'>
          <Form ref={ref} onSubmit={resetPassword}>
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
            <OutlineButton className='reset-button' onClick={onFocus}>
              Reset password
            </OutlineButton>
          </Form>
          <div className='links'>
            <span className='login-link' onClick={() => navigate('/login')}>
              Aready have an account? <LinkText>Log in</LinkText>
            </span>
            <LinkText onClick={() => navigate('/signup')}>Sign Up</LinkText>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
