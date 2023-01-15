import React from 'react'
import { HelpIcon } from '/imports/components/icons'
import './HelpButton.style.scss'

type HelpButtonProps = {
  title?: string
  name?: string
  id?: string
  onClick?(): void
}

export const HelpButton = (props: HelpButtonProps) => (
  <button
    data-prevent-outside-click
    className='help-icon'
    onClick={props.onClick}
    type='button'
    title={`${props.title} — ?`}
    aria-label={props.title}
  >
    {HelpIcon}
  </button>
)
