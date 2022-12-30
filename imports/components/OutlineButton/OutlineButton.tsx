import React from 'react'
import './OutlineButton.style.scss'
import cx from 'clsx'

export interface IOutlineButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export const OutlineButton: React.FC<IOutlineButtonProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  let style = {} as React.CSSProperties
  if (variant === 'secondary') {
    style = {
      border: '1px solid rgba(15, 15, 15, 0.15)',
      color: 'var(--button-text-color)',
      background: 'white',
      boxShadow: '0px 1px 2px rgba(15, 15, 15, 0.05)'
    }
  }
  return (
    <button style={style} className={cx('boardx-outline-btn', className)}>
      {children}
    </button>
  )
}
