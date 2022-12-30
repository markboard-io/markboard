import React from 'react'
import './LinkText.style.scss'

export const LinkText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className='boardx-link'>{children}</span>
}
