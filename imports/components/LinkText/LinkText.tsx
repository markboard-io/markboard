import React from 'react'
import './LinkText.style.scss'

interface ILinkTextProps {
  children: React.ReactNode
  onClick?: () => void
}

export const LinkText: React.FC<ILinkTextProps> = ({ children, onClick = () => {} }) => {
  return (
    <span className='markboard-link' onClick={onClick}>
      {children}
    </span>
  )
}
