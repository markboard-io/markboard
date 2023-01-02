import React from 'react'
import { SiteLayout } from '/imports/layouts'
import './Signup.style.scss'
import Form from 'react-bootstrap/Form'
import { LinkText, OutlineButton } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useNavigate } from 'react-router-dom'

export function Signup() {
  const navigate = useNavigate()
  useDocumentTitle('BoardX - Sign Up')

  return (
    <SiteLayout>
      <div className='signup-page'>
        <div className='title'>Sign Up</div>
        <div className='signup-form'>
          <Form>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label className='label'>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label className='label'>Confirm password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <OutlineButton className='login-button'>Sign Up with email</OutlineButton>
          </Form>
          <div className='links'>
            <LinkText onClick={() => navigate('/login')}>Aready have an account?</LinkText>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
