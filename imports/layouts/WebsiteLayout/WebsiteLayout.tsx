import React from 'react'
import './WebsiteLayout.style.scss'

export const WebsiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='website-layout'>{children}</div>
}
