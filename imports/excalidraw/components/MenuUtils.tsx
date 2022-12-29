import React from 'react'
import { GithubIcon, DiscordIcon, TwitterIcon } from './icons'

export const MenuLinks = () => (
  <>
    <a
      className='menu-item'
      href='https://github.com/boardx/boardx-core'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='menu-item__icon'>{GithubIcon}</div>
      <div className='menu-item__text'>GitHub</div>
    </a>
    <a
      className='menu-item'
      target='_blank'
      href='https://discord.gg/RBs5kHC8cS'
      rel='noopener noreferrer'
    >
      <div className='menu-item__icon'>{DiscordIcon}</div>
      <div className='menu-item__text'>Discord</div>
    </a>
    <a
      className='menu-item'
      target='_blank'
      href='https://twitter.com/BoardXUs'
      rel='noopener noreferrer'
    >
      <div className='menu-item__icon'>{TwitterIcon}</div>
      <div className='menu-item__text'>Twitter</div>
    </a>
  </>
)

export const Separator = () => (
  <div
    style={{
      height: '1px',
      backgroundColor: 'var(--default-border-color)',
      margin: '.5rem 0'
    }}
  />
)
