import React, { useRef, useState } from 'react'
import { SiteLayout } from '/imports/layouts'
import './ForgotPassword.style.scss'
import Form from 'react-bootstrap/Form'
import { OutlineButton, LinkText, ValidatedInput } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useNavigate } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import { Toast } from '/imports/utils'
import { Services } from '/imports/services/client'

function useFormValues() {
  const ref = useRef<HTMLFormElement | null>(null)

  const getFormValues = () => {
    const { elements } = ref.current as HTMLFormElement
    const email = (elements.namedItem('email') as HTMLInputElement).value
    return { email }
  }

  return [ref, getFormValues] as const
}

function useEmailValidator() {
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
    const isEmailNotExists = await Services.get('account').checkEmailAvailability(email)
    if (isEmailNotExists) {
      return setEmailError('This email is not registered, please sign up first')
    }
    return setEmailError('')
  }

  return [emailError, validateEmail] as const
}

export function ForgotPassword() {
  const navigate = useNavigate()
  const [ref, getFormValues] = useFormValues()
  const [emailError, validateEmail] = useEmailValidator()

  useDocumentTitle('markboard - Forgot Password')

  const sendPasswordResetLink = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (emailError) return
    const { email } = getFormValues()
    Accounts.forgotPassword({ email }, error => {
      if (error) return Toast.error(error.message)
      Toast.success('Password reset link has been sent, please check your email inbox')
    })
  }

  return (
    <SiteLayout>
      <div className='forgot-password-page'>
        <div className='title'>Forgot Password</div>
        <div className='form'>
          <Form ref={ref} onSubmit={sendPasswordResetLink}>
            <ValidatedInput
              id='email'
              label='Email Address'
              placeholder='Enter Email'
              error={emailError}
              validator={validateEmail}
            />
            <OutlineButton className='reset-button'>Send password reset link</OutlineButton>
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
