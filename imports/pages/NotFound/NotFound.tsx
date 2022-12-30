import React from 'react'
import './NotFound.style.scss'
import { SiteLayout } from '/imports/layouts'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <SiteLayout>
      <div className='error-page'>
        <div className='title'>Oops! We can't find that page.</div>
        <div className='description'>Please verify you have the right link.</div>
        <Button className='back-to-home' variant='primary' onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </SiteLayout>
  )
}
