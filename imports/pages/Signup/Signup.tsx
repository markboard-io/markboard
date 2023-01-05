import React, { useState } from 'react'
import { SiteLayout } from '/imports/layouts'
import './Signup.style.scss'
import Form from 'react-bootstrap/Form'
import { LinkText, OutlineButton } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useNavigate } from 'react-router-dom'
import { Services } from '/imports/services/client'

interface IValidation {
  errorMsg: string
}

export function Signup() {
  const navigate = useNavigate()
  useDocumentTitle('BoardX - Sign Up')

  const [emailValidation, setEmailValidation] = useState<IValidation>({ errorMsg: '' })
  const [usernameValidation, setUsernameValidation] = useState<IValidation>({ errorMsg: '' })
  const [confirmPassValidation, setConfirmPassValidation] = useState<IValidation>({ errorMsg: '' })

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const isValidationPass =
      !emailValidation.errorMsg && !usernameValidation.errorMsg && !confirmPassValidation.errorMsg
    if (!isValidationPass) return

    const { elements } = ev.currentTarget
    const email = (elements.namedItem('email') as HTMLInputElement).value
    const username = (elements.namedItem('username') as HTMLInputElement).value
    const password = (elements.namedItem('password') as HTMLInputElement).value
    const confirmPassword = (elements.namedItem('confirmPassword') as HTMLInputElement).value
    console.log({
      email,
      username,
      password,
      confirmPassword
    })
    const isUsernameAvailable = await Services.get('account').checkUsernameAvailability(username)
    console.log({ isUsernameAvailable })
  }

  const validateUsername = (username: string) => {
    if (!username) return setUsernameValidation({ errorMsg: 'Username cannot be left empty' })
    if (!/^[a-z][a-z0-9.]*$/.test(username)) {
      return setUsernameValidation({
        errorMsg:
          'Invalid Username. ' +
          'Usernames can contain letters (a-z), numbers (0-9), and periods (.) ' +
          'and should start with letters(a-z)'
      })
    }
    const MAX_USERNAME_LENGTH = 20
    if (username.length > MAX_USERNAME_LENGTH) {
      return setUsernameValidation({
        errorMsg: "Username's length cannot be over 20 characters"
      })
    }
    return setUsernameValidation({ errorMsg: '' })
  }

  return (
    <SiteLayout>
      <div className='signup-page'>
        <div className='title'>Sign Up</div>
        <div className='signup-form'>
          <Form validated={false} onSubmit={onSubmit}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label className='label'>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' isValid={true} />
              <Form.Control.Feedback type='invalid'>invalid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label className='label'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                isValid={!usernameValidation.errorMsg}
                isInvalid={!!usernameValidation.errorMsg}
                onChange={ev => validateUsername(ev.target.value)}
              />
              {usernameValidation.errorMsg ? (
                <Form.Control.Feedback type='invalid'>
                  {usernameValidation.errorMsg}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label className='label'>Confirm password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <OutlineButton className='signup-button'>Sign Up with email</OutlineButton>
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
