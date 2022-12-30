import React from 'react'
import { SiteLayout } from '/imports/layouts'
import './Login.style.scss'
import Form from 'react-bootstrap/Form'
import { OutlineButton, LinkText } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'

export function Login() {
  useDocumentTitle('BoardX - Log in')

  return (
    <SiteLayout>
      <div className='login-page'>
        <div className='title'>Log in</div>
        <div className='login-form'>
          <OutlineButton variant='secondary'>
            <img src='/images/google.svg' alt='google' />
            Continue with Google
          </OutlineButton>
          <OutlineButton variant='secondary'>
            <img src='/images/github.svg' alt='github' />
            Continue with Git
          </OutlineButton>
          <hr className='seperator' />
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label className='label'>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <OutlineButton className='login-button'>Continue with email</OutlineButton>
          </Form>
          <div className='links'>
            <LinkText>Forgot Password?</LinkText>
            <LinkText>Sign Up</LinkText>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
