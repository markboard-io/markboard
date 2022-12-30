import React from 'react'
import { Link } from 'react-router-dom'
import './WebsiteLayout.style.scss'

export const WebsiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='website-layout'>
      <div className='nav'>
        <Link to='/'>
          <img className='logo' src='/images/logo.svg' alt='logo' />
        </Link>
      </div>
      <div className='container'>{children}</div>
    </div>
  )
}
