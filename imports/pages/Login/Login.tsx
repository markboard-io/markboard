import React, { useRef } from 'react'
import { SiteLayout } from '/imports/layouts'
import './Login.style.scss'
import Form from 'react-bootstrap/Form'
import { OutlineButton, LinkText } from '/imports/components'
import { useDocumentTitle } from '/imports/hooks'
import { useNavigate } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Toast } from '/imports/utils'

function useFormValues() {
  const ref = useRef<HTMLFormElement | null>(null)

  const getFormValues = () => {
    const { elements } = ref.current as HTMLFormElement
    const username = (elements.namedItem('username') as HTMLInputElement).value
    const password = (elements.namedItem('password') as HTMLInputElement).value
    return { username, password }
  }

  return [ref, getFormValues] as const
}

export function Login() {
  const navigate = useNavigate()
  const [ref, getFormValues] = useFormValues()
  const query = new URLSearchParams(location.search)
  const isDemo = query.get('demo')

  useDocumentTitle('Markboard - Log in')

  const loginWithGoogle = () => {
    Meteor.loginWithGoogle({}, error => {
      if (error) return Toast.error(error.message)
      Toast.success('Log In Success')
    })
  }

  const loginWithGitHub = () => {
    Meteor.loginWithGithub({}, error => {
      if (error) return Toast.error(error.message)
      Toast.success('Log In Success')
    })
  }

  const loginWithPassword = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const { username, password } = getFormValues()
    Meteor.loginWithPassword(username, password, error => {
      if (error) return Toast.error(error.message)
      return navigate('/')
    })
  }

  return (
    <SiteLayout>
      <div className='login-page'>
        <div className='title'>Log in</div>
        <div className='login-form'>
          <OutlineButton variant='secondary' onClick={loginWithGoogle}>
            <img src='/images/google.svg' alt='google' />
            Continue with Google
          </OutlineButton>
          <OutlineButton variant='secondary' onClick={loginWithGitHub}>
            <img src='/images/github.svg' alt='github' />
            Continue with GitHub
          </OutlineButton>
          <hr className='seperator' />
          <Form ref={ref} onSubmit={loginWithPassword}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label className='label'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Username'
                defaultValue={isDemo != null ? 'demo' : ''}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                defaultValue={isDemo != null ? 'demodemo' : ''}
              />
            </Form.Group>
            <OutlineButton className='login-button'>
              {isDemo ? 'Try with demo acccount' : 'Continue with email'}
            </OutlineButton>
          </Form>
          <div className='links'>
            <LinkText onClick={() => navigate('/forgot-password')}>Forgot Password?</LinkText>
            <LinkText onClick={() => navigate('/signup')}>Sign Up</LinkText>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
